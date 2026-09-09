import type { Metadata } from "next";
import { getPublishedArticle } from "@/lib/articles";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) return {};
  const description = article.metaDescription || article.excerpt || article.body.slice(0, 160);
  return { title: `${article.title} | ${SITE_NAME}`, description, alternates: { canonical: `${SITE_URL}/artikel/${article.slug}` }, openGraph: { title: article.title, description, type: "article", url: `${SITE_URL}/artikel/${article.slug}` } };
}

function formatDate(timestamp: number | null) {
  if (!timestamp) return "";
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(timestamp));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) notFound();
  const paragraphs = article.body.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.metaDescription || article.excerpt, datePublished: article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined, dateModified: new Date(article.updatedAt).toISOString(), author: { "@type": "Organization", name: SITE_NAME }, publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/images/sidekick-inspector-logo.png` } } };
  return <main className="article-page">
    <header className="article-header"><Link className="brand" href="/"><img src="/images/sidekick-inspector-logo.png" alt="Logo Sidekick Inspector Bandung" width="54" height="54"/><span><strong>Sidekick Inspector</strong><small>Bandung</small></span></Link><Link className="btn small" href="/artikel">Semua artikel</Link></header>
    <article className="article-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/>
      <p className="eyebrow">Panduan Sidekick Inspector</p><h1>{article.title}</h1><p className="article-meta">Diterbitkan {formatDate(article.publishedAt)}</p>
      {article.excerpt && <p className="article-lead">{article.excerpt}</p>}
      <div className="article-body">{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
      <a className="btn" href="https://wa.me/628118616666?text=Halo%20Sidekick%20Inspector%2C%20saya%20ingin%20booking%20inspeksi%20mobil%20bekas." target="_blank" rel="noreferrer">Booking inspeksi via WhatsApp</a>
    </article>
  </main>;
}
