import { getStoryBySlug, getRelatedStories } from "../../../lib/blog-data";
import BlogPostClient from "./BlogPostClient";
import BlogPostSchema from "./BlogPostSchema";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

function serialize(doc) {
  if (!doc) return null;
  const o = { ...doc };
  if (o._id && typeof o._id === "object" && o._id.toString) o._id = o._id.toString();
  return o;
}

export async function generateMetadata({ params }) {
  const slug = params?.slug;
  if (!slug) return { title: "Blog" };
  const story = await getStoryBySlug(slug);
  if (!story) return { title: "Blog" };
  const title = typeof story.title === "string" ? story.title.replace(/<[^>]*>/g, "").trim() : "Blog post";
  const description = typeof story.subtitle === "string" ? story.subtitle.replace(/<[^>]*>/g, "").trim().slice(0, 160) : undefined;
  return {
    title: title || "Blog post",
    description: description || undefined,
    openGraph: { title: title || "Blog post", description: description || undefined },
  };
}

export default async function BlogPost({ params }) {
  const slug = params?.slug;
  if (!slug) notFound();

  const [story, relatedList] = await Promise.all([
    getStoryBySlug(slug),
    getRelatedStories(slug, 3),
  ]);

  if (!story) notFound();

  const serializedStory = serialize(story);

  return (
    <>
      <BlogPostSchema story={serializedStory} />
      <BlogPostClient
        story={serializedStory}
        relatedStories={relatedList.map(serialize)}
      />
    </>
  );
}
