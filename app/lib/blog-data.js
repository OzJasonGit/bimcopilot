import { connectToDatabase } from "../utils/mongodb";

/**
 * Server-only: fetch all stories for blog index (SSR/crawlable).
 */
export async function getStories() {
  const db = await connectToDatabase();
  const collection = db.collection("stories");
  const data = await collection
    .find({})
    .sort({ post_number: -1 })
    .toArray();
  return data || [];
}

/**
 * Server-only: fetch one story by slug.
 */
export async function getStoryBySlug(slug) {
  if (!slug) return null;
  const db = await connectToDatabase();
  const story = await db.collection("stories").findOne({ slug });
  return story;
}

/**
 * Server-only: fetch other stories (for related posts), excluding the given slug.
 */
export async function getRelatedStories(currentSlug, limit = 3) {
  const db = await connectToDatabase();
  const list = await db
    .collection("stories")
    .find({ slug: { $ne: currentSlug } })
    .sort({ post_number: -1 })
    .limit(limit)
    .toArray();
  return list || [];
}
