import { listAdminArticles } from "@/lib/articles";
import { requireAdminPage } from "@/lib/admin-page";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdminPage();
  const articles = await listAdminArticles();
  return <main className="admin-shell"><section className="admin-panel"><header className="admin-top"><div><Link className="admin-brand" href="/">← Lihat website</Link><p className="eyebrow">Admin artikel</p><h1>Artikel Sidekick Inspector</h1><p>Tambah tulisan baru, simpan draft, atau terbitkan untuk pengunjung.</p></div><div className="admin-actions"><Link className="btn" href="/admin/new">+ Artikel baru</Link><form action="/api/admin/logout" method="post"><button className="logout" type="submit">Keluar</button></form></div></header>{articles.length === 0 ? <div className="empty-state"><h2>Belum ada artikel</h2><p>Mulai dari artikel pertama untuk memperkuat SEO Sidekick Inspector.</p><Link className="btn" href="/admin/new">Tulis artikel pertama</Link></div> : <div className="article-table">{articles.map((article) => <article key={article.id}><div><span className={`status ${article.status}`}>{article.status === "published" ? "Terbit" : "Draft"}</span><h2>{article.title}</h2><p>/artikel/{article.slug}</p></div><Link className="edit-link" href={`/admin/edit/${article.id}`}>Edit</Link></article>)}</div>}</section></main>;
}
