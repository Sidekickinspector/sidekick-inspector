import type { MetadataRoute } from "next";
import { listPublishedArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = [{
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }];
  try {
    const articles = await listPublishedArticles();
    pages.push(...articles.map((article) => ({
      url: `${SITE_URL}/artikel/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })));
  } catch {
    // Halaman utama tetap dapat dipetakan bila database belum diikat saat pengembangan.
  }
  return pages;
}
