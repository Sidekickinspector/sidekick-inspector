import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validSession } from "@/lib/admin-auth";

export async function requireAdminPage() {
  const jar = await cookies();
  if (!(await validSession(jar.get("sidekick_admin")?.value))) redirect("/admin/login");
}
