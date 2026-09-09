import { deleteArticle, readArticleInput, updateArticle } from "@/lib/articles";
import { sessionFromCookie, validSession } from "@/lib/admin-auth";

type ArticleRouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: ArticleRouteContext) {
  if (!(await validSession(sessionFromCookie(request.headers.get("cookie"))))) return Response.redirect(new URL("/admin/login", request.url), 303);
  const { id } = await context.params;
  const articleId = Number(id);
  if (!Number.isInteger(articleId)) return new Response("Artikel tidak ditemukan.", { status: 404 });
  const formData = await request.formData();
  if (formData.get("intent") === "delete") {
    await deleteArticle(articleId);
    return Response.redirect(new URL("/admin", request.url), 303);
  }
  try {
    await updateArticle(articleId, readArticleInput(formData));
    return Response.redirect(new URL("/admin", request.url), 303);
  } catch (error) {
    const target = new URL(`/admin/edit/${articleId}`, request.url);
    target.searchParams.set("error", error instanceof Error ? error.message : "Artikel belum tersimpan.");
    return Response.redirect(target, 303);
  }
}
