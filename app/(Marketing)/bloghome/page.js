import Bloghomemain from "../../../Modules/Bloghome/bloghomemain";
import { getStories } from "../../lib/blog-data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog | BIM, AI & Architecture",
  description: "Stories and guides on BIM, AI, and architecture for architects and BIM managers.",
};

const PER_PAGE = 9;

export default async function Bloghome({ searchParams }) {
  let stories = [];
  let error = null;

  try {
    stories = await getStories();
  } catch (err) {
    console.error("Bloghome getStories error:", err);
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

  const storiesArray = Array.isArray(stories) ? stories : [];
  const totalPages = Math.max(1, Math.ceil(storiesArray.length / PER_PAGE));

  const rawPage =
    typeof searchParams?.page === "string"
      ? parseInt(searchParams.page, 10)
      : Array.isArray(searchParams?.page)
      ? parseInt(searchParams.page[0], 10)
      : NaN;

  const requestedPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const currentPage = Math.min(requestedPage, totalPages);

  const startIndex = (currentPage - 1) * PER_PAGE;
  const paginatedStories = storiesArray.slice(startIndex, startIndex + PER_PAGE);

  return (
    <Bloghomemain
      stories={paginatedStories}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
