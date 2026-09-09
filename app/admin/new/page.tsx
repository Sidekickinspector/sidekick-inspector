import { ArticleForm } from "@/components/article-form";
import { requireAdminPage } from "@/lib/admin-page";

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  await requireAdminPage();
  return <main className="admin-shell"><section className="admin-panel narrow"><a className="admin-brand" href="/admin">← Kembali ke artikel</a><p className="eyebrow">Artikel baru</p><h1>Tulis artikel</h1><p>Gunakan jawaban yang bermanfaat untuk calon pembeli, bukan pengulangan keyword.</p><ArticleForm action="/api/admin/articles" submitLabel="Simpan artikel" /></section></main>;
}
