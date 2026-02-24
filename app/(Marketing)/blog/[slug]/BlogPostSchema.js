function stripHtml(html) {
  if (!html || typeof html !== "string") return "";
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

export default function BlogPostSchema({ story, baseUrl = "https://www.bimcopilot.com" }) {
  const title = stripHtml(story.title);
  const description = stripHtml(story.subtitle);
  const slug = story.slug;
  const datePublished = story.publishDate || story.createdAt || story.datePublished;
  const dateModified = story.updatedAt || datePublished;
  const author = story.author || "BIM Copilot";
  const image = story.image || `${baseUrl}/og-default.png`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description?.slice(0, 200),
    url: `${baseUrl}/blog/${slug}`,
    datePublished: datePublished ? new Date(datePublished).toISOString() : undefined,
    dateModified: dateModified ? new Date(dateModified).toISOString() : undefined,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "BIM Copilot",
      url: baseUrl,
    },
    image: image,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}`,
    },
  };

  const faq = Array.isArray(story.faq) && story.faq.length > 0
    ? story.faq
        .filter((item) => item && (item.question || item.q))
        .map((item) => ({
          "@type": "Question",
          name: stripHtml(item.question || item.q),
          acceptedAnswer: {
            "@type": "Answer",
            text: stripHtml(item.answer || item.a || ""),
          },
        }))
    : [];

  const faqSchema =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq,
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
