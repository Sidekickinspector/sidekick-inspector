import Link from "next/link";

export const dynamic = "force-dynamic";

type LoginPageProps = { searchParams: Promise<{ error?: string }> };

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;
  return <main className="admin-shell"><section className="login-card"><Link className="admin-brand" href="/">← Sidekick Inspector</Link><p className="eyebrow">Admin artikel</p><h1>Masuk ke dashboard</h1><p>Gunakan email dan password admin khusus website ini.</p>{error && <p className="form-error">Email atau password belum sesuai.</p>}<form className="admin-form" action="/api/admin/login" method="post"><label>Email<input name="email" type="email" autoComplete="username" required /></label><label>Password<input name="password" type="password" autoComplete="current-password" required /></label><button className="btn" type="submit">Masuk</button></form></section></main>;
}
