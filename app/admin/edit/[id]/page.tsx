import { ArticleForm } from "@/components/article-form";
import { getAdminArticle } from "@/lib/articles";
import { requireAdminPage } from "@/lib/admin-page";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type EditArticlePageProps = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  await requireAdminPage();
  const { id } = await params;
  const article = await getAdminArticle(Number(id));
  if (!article) notFound();
  return <main className="admin-shell"><section className="admin-panel narrow"><a className="admin-brand" href="/admin">← Kembali ke artikel</a><p className="eyebrow">Edit artikel</p><h1>{article.title}</h1><ArticleForm article={article} action={`/api/admin/articles/${article.id}`} submitLabel="Simpan perubahan" /><form className="delete-form" action={`/api/admin/articles/${article.id}`} method="post"><input type="hidden" name="intent" value="delete" /><button type="submit">Hapus artikel</button></form></section></main>;
}
