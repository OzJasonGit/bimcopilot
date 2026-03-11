import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/utils/mongodb";
import { fetchNotionPageAndMapToStory } from "@/app/lib/notion-to-story";
import { getPostNumberNumeric } from "@/app/utils/postNumber";
import { ObjectId } from "mongodb";

const STORIES_COLLECTION = "stories";

/**
 * Verify webhook secret. Caller (Zapier, Make, n8n, etc.) should send the same secret
 * in header x-notion-webhook-secret or Authorization: Bearer <secret>.
 */
function verifyWebhookSecret(req) {
  const secret = process.env.NOTION_WEBHOOK_SECRET;
  if (!secret) {
    console.warn("NOTION_WEBHOOK_SECRET is not set; webhook verification is disabled.");
    return true;
  }
  const headerSecret = req.headers.get("x-notion-webhook-secret");
  const authHeader = req.headers.get("authorization");
  const bearerSecret = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  return headerSecret === secret || bearerSecret === secret;
}

export async function POST(req) {
  if (!verifyWebhookSecret(req)) {
    return NextResponse.json(
      { success: false, error: "Invalid or missing webhook secret" },
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const integrationSecret = process.env.NOTION_INTEGRATION_SECRET;
  if (!integrationSecret) {
    return NextResponse.json(
      { success: false, error: "NOTION_INTEGRATION_SECRET is not configured" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const pageId = body.page_id ?? body.pageId;
  if (!pageId || typeof pageId !== "string") {
    return NextResponse.json(
      { success: false, error: "Missing or invalid page_id" },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const published = body.published ?? false;
  const overrides = {
    published,
    post_number: body.post_number,
    author: body.author,
    slug: body.slug,
    image: body.image,
    subtitle: body.subtitle,
    conclusion: body.conclusion,
    video: body.video,
  };
  Object.keys(overrides).forEach((k) => {
    if (overrides[k] === undefined) delete overrides[k];
  });

  let storyPayload;
  try {
    storyPayload = await fetchNotionPageAndMapToStory(
      pageId.trim(),
      integrationSecret,
      overrides
    );
  } catch (err) {
    console.error("Notion fetch/map error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to fetch or map Notion page",
      },
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection(STORIES_COLLECTION);

    const existingByNotion = storyPayload.notion_page_id
      ? await collection.findOne({ notion_page_id: storyPayload.notion_page_id })
      : null;
    const existingBySlug =
      !existingByNotion && storyPayload.slug
        ? await collection.findOne({ slug: storyPayload.slug })
        : null;
    const existing = existingByNotion ?? existingBySlug;

    if (existing) {
      const updateData = { ...storyPayload };
      if (updateData.post_number !== undefined) {
        updateData.sortOrder = getPostNumberNumeric(updateData.post_number);
      }
      await collection.updateOne(
        { _id: existing._id },
        { $set: updateData }
      );
      return NextResponse.json(
        {
          success: true,
          action: "updated",
          _id: String(existing._id),
          slug: storyPayload.slug,
        },
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const top = await collection.findOne(
      {},
      { sort: { sortOrder: -1 }, projection: { sortOrder: 1 } }
    );
    const nextSortOrder = (top?.sortOrder ?? 9999) + 1;
    const insertDoc = {
      ...storyPayload,
      sortOrder:
        storyPayload.post_number !== undefined && storyPayload.post_number !== ""
          ? getPostNumberNumeric(storyPayload.post_number)
          : nextSortOrder,
    };
    const result = await collection.insertOne(insertDoc);
    return NextResponse.json(
      {
        success: true,
        action: "created",
        _id: String(result.insertedId),
        slug: storyPayload.slug,
      },
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Webhook notion DB error:", err);
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: "Notion webhook endpoint. POST with page_id and x-notion-webhook-secret.",
      docs: "Set NOTION_INTEGRATION_SECRET and NOTION_WEBHOOK_SECRET in .env. Use Zapier/Make to trigger on Notion page updates and POST to this URL.",
    },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
