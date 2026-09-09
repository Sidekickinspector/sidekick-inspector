import { clearSessionCookie } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const response = Response.redirect(new URL("/admin/login", request.url), 303);
  response.headers.set("Set-Cookie", clearSessionCookie());
  return response;
}
