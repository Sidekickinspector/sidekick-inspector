import type { Metadata } from "next";
import { listPublishedArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Artikel & Panduan Mobil Bekas | Sidekick Inspector Bandung",
  description: "Panduan cek mobil bekas, tips membeli mobil bekas, dan informasi inspeksi mobil di Bandung dari Sidekick Inspector.",
  alternates: { canonical: `${SITE_URL}/artikel` },
};

function formatDate(timestamp: number | null) {
  if (!timestamp) return "Baru diterbitkan";
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(timestamp));
}

export default async function ArticlesPage() {
  const articles = await listPublishedArticles();
  return <main className="article-page"><header className="article-header"><Link className="brand" href="/"><img src="/images/sidekick-inspector-logo.png" alt="Logo Sidekick Inspector Bandung" width="54" height="54"/><span><strong>Sidekick Inspector</strong><small>Bandung</small></span></Link><Link className="btn small" href="/">Kembali ke website</Link></header><section className="article-hero"><p className="eyebrow">Panduan mobil bekas</p><h1>Artikel & informasi sebelum membeli mobil bekas.</h1><p>Tips praktis dari sudut pandang inspeksi kendaraan agar keputusan Anda lebih terukur.</p></section><section className="article-shell">{articles.length === 0 ? <div className="empty-state"><h2>Artikel sedang disiapkan</h2><p>Panduan cek dan inspeksi mobil bekas akan hadir di halaman ini.</p></div> : <div className="article-list">{articles.map((article) => <article className="article-card" key={article.id}><p className="article-meta">{formatDate(article.publishedAt)}</p><h2><Link href={`/artikel/${article.slug}`}>{article.title}</Link></h2><p>{article.excerpt || article.body.slice(0, 180)}{article.body.length > 180 ? "…" : ""}</p><Link className="text-link" href={`/artikel/${article.slug}`}>Baca artikel →</Link></article>)}</div>}</section></main>;
}
