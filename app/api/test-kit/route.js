// Dev-only: test Kit integration without doing a full signup.
// Only works when NODE_ENV === "development".
// GET /api/test-kit → list your tags (id + name) so you can set CONVERTKIT_TAG_ID correctly.
// POST /api/test-kit with body: { email?, firstName?, lastName? }

import { NextResponse } from "next/server";
import { addSignupSubscriberToKit } from "../../utils/convertkit";

const KIT_API_BASE = "https://api.kit.com/v4";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Test endpoint only available in development" },
      { status: 404 }
    );
  }
  const apiKey = process.env.CONVERTKIT_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "CONVERTKIT_API_KEY is not set in .env" },
      { status: 400 }
    );
  }
  try {
    const res = await fetch(`${KIT_API_BASE}/tags`, {
      headers: { "X-Kit-Api-Key": apiKey },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return NextResponse.json(
        { error: data?.errors?.[0] || data?.message || "Failed to list tags" },
        { status: res.status }
      );
    }
    const tags = data?.tags ?? [];
    return NextResponse.json({
      message: "Use the 'id' (number) as CONVERTKIT_TAG_ID in .env",
      tags: tags.map((t) => ({ id: t.id, name: t.name })),
    });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Request failed" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Test endpoint only available in development" },
      { status: 404 }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const email = body.email || `test-kit-${Date.now()}@example.com`;
    const firstName = body.firstName ?? "Test";
    const lastName = body.lastName ?? "User";

    const result = await addSignupSubscriberToKit({
      email,
      firstName,
      lastName,
    });

    return NextResponse.json({
      ok: result.success,
      ...(result.success
        ? { message: "Subscriber created and tagged. Check Kit dashboard." }
        : { error: result.error }),
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err.message || "Request failed" },
      { status: 500 }
    );
  }
}
