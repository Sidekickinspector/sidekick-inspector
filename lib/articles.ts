import { env } from "cloudflare:workers";

export type ArticleStatus = "draft" | "published";

export type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  metaDescription: string;
  status: ArticleStatus;
  publishedAt: number | null;
  createdAt: number;
  updatedAt: number;
};

export type ArticleInput = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  metaDescription: string;
  status: ArticleStatus;
};

type RuntimeEnv = { ARTICLES_DB?: D1Database };

function database() {
  const db = (env as unknown as RuntimeEnv).ARTICLES_DB;
  if (!db) throw new Error("Database artikel belum terhubung.");
  return db;
}

function rowToArticle(row: Record<string, unknown>): Article {
  return {
    id: Number(row.id),
    title: String(row.title),
    slug: String(row.slug),
    excerpt: String(row.excerpt ?? ""),
    body: String(row.body),
    metaDescription: String(row.meta_description ?? ""),
    status: row.status === "published" ? "published" : "draft",
    publishedAt: row.published_at === null ? null : Number(row.published_at),
    createdAt: Number(row.created_at),
    updatedAt: Number(row.updated_at),
  };
}

function text(value: FormDataEntryValue | null, limit: number) {
  return String(value ?? "").trim().slice(0, limit);
}

export function makeSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

export function readArticleInput(formData: FormData): ArticleInput {
  const title = text(formData.get("title"), 150);
  const body = text(formData.get("body"), 30000);
  const slug = makeSlug(text(formData.get("slug"), 120) || title);
  const status: ArticleStatus = formData.get("status") === "draft" ? "draft" : "published";

  if (title.length < 5) throw new Error("Judul artikel minimal 5 karakter.");
  if (body.length < 80) throw new Error("Isi artikel minimal 80 karakter.");
  if (!slug) throw new Error("Slug artikel belum valid.");

  return {
    title,
    slug,
    body,
    status,
    excerpt: text(formData.get("excerpt"), 300),
    metaDescription: text(formData.get("metaDescription"), 160),
  };
}

export async function listPublishedArticles() {
  const result = await database()
    .prepare("SELECT * FROM articles WHERE status = ? ORDER BY published_at DESC, id DESC")
    .bind("published")
    .all<Record<string, unknown>>();
  return result.results.map(rowToArticle);
}

export async function listAdminArticles() {
  const result = await database()
    .prepare("SELECT * FROM articles ORDER BY updated_at DESC, id DESC")
    .all<Record<string, unknown>>();
  return result.results.map(rowToArticle);
}

export async function getPublishedArticle(slug: string) {
  const row = await database()
    .prepare("SELECT * FROM articles WHERE slug = ? AND status = ? LIMIT 1")
    .bind(slug, "published")
    .first<Record<string, unknown>>();
  return row ? rowToArticle(row) : null;
}

export async function getAdminArticle(id: number) {
  const row = await database().prepare("SELECT * FROM articles WHERE id = ? LIMIT 1").bind(id).first<Record<string, unknown>>();
  return row ? rowToArticle(row) : null;
}

export async function createArticle(input: ArticleInput) {
  const now = Date.now();
  await database()
    .prepare("INSERT INTO articles (title, slug, excerpt, body, meta_description, status, published_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(input.title, input.slug, input.excerpt, input.body, input.metaDescription, input.status, input.status === "published" ? now : null, now, now)
    .run();
}

export async function updateArticle(id: number, input: ArticleInput) {
  const current = await getAdminArticle(id);
  if (!current) throw new Error("Artikel tidak ditemukan.");
  const now = Date.now();
  const publishedAt = input.status === "published" ? current.publishedAt ?? now : null;
  await database()
    .prepare("UPDATE articles SET title = ?, slug = ?, excerpt = ?, body = ?, meta_description = ?, status = ?, published_at = ?, updated_at = ? WHERE id = ?")
    .bind(input.title, input.slug, input.excerpt, input.body, input.metaDescription, input.status, publishedAt, now, id)
    .run();
}

export async function deleteArticle(id: number) {
  await database().prepare("DELETE FROM articles WHERE id = ?").bind(id).run();
}
