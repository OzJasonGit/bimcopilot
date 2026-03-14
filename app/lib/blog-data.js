import { connectToDatabase } from "../utils/mongodb";
import { getPostNumberNumeric } from "../utils/postNumber";

function toPlain(value) {
  if (value == null) return value;
  return JSON.parse(JSON.stringify(value));
}

/**
 * Server-only: fetch all stories for blog index (SSR/crawlable).
 * Sorted by latest post number first so new stories show without reindex.
 */
export async function getStories() {
  const db = await connectToDatabase();
  const collection = db.collection("stories");
  const raw = await collection.find({ published: true }).toArray();
  const data = raw.sort(
    (a, b) => getPostNumberNumeric(b.post_number) - getPostNumberNumeric(a.post_number)
  );
  return toPlain(data || []);
}

/**
 * Server-only: fetch one story by slug.
 */
export async function getStoryBySlug(slug) {
  if (!slug) return null;
  const db = await connectToDatabase();
  const story = await db.collection("stories").findOne({ slug, published: true });
  return toPlain(story);
}

/**
 * Server-only: fetch other stories (for related posts), excluding the given slug.
 * Sorted by latest post number first.
 */
export async function getRelatedStories(currentSlug, limit = 3) {
  const db = await connectToDatabase();
  const raw = await db
    .collection("stories")
    .find({ slug: { $ne: currentSlug }, published: true })
    .toArray();
  const sorted = raw.sort(
    (a, b) => getPostNumberNumeric(b.post_number) - getPostNumberNumeric(a.post_number)
  );
  const list = sorted.slice(0, limit);
  return toPlain(list || []);
}
