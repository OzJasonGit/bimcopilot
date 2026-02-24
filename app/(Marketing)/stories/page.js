import Bloghomemain from "../../../Modules/Bloghome/bloghomemain";
import { getStories } from "../../lib/blog-data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Stories | BIM, AI & Architecture",
  description: "Explore stories on BIM, AI, and architecture—guides, workflows, and insights for architects and BIM managers.",
};

export default async function StoriesIndex() {
  let stories = [];
  let error = null;
  try {
    stories = await getStories();
  } catch (err) {
    console.error("Stories getStories error:", err);
    error = err.message || "Stories unavailable";
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", minHeight: "40vh" }}>
        <p style={{ color: "#ef4444", marginBottom: "0.5rem" }}>Stories could not be loaded.</p>
        <p style={{ color: "#888", fontSize: "0.9rem" }}>{error}</p>
      </div>
    );
  }

  return <Bloghomemain stories={Array.isArray(stories) ? stories : []} />;
}
