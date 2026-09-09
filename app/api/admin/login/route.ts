import { createSession, sessionCookie, validCredentials } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const target = new URL("/admin/login", request.url);
  if (!(await validCredentials(email, password))) {
    target.searchParams.set("error", "1");
    return Response.redirect(target, 303);
  }
  const response = Response.redirect(new URL("/admin", request.url), 303);
  response.headers.set("Set-Cookie", sessionCookie(await createSession()));
  return response;
}
