import { createArticle, readArticleInput } from "@/lib/articles";
import { sessionFromCookie, validSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!(await validSession(sessionFromCookie(request.headers.get("cookie"))))) return Response.redirect(new URL("/admin/login", request.url), 303);
  try {
    await createArticle(readArticleInput(await request.formData()));
    return Response.redirect(new URL("/admin?success=created", request.url), 303);
  } catch (error) {
    const target = new URL("/admin/new", request.url);
    target.searchParams.set("error", error instanceof Error ? error.message : "Artikel belum tersimpan.");
    return Response.redirect(target, 303);
  }
}
