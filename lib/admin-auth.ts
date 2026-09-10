import { env } from "cloudflare:workers";

const COOKIE_NAME = "sidekick_admin";
const encoder = new TextEncoder();
const decoder = new TextDecoder();

type RuntimeEnv = {
  ADMIN_EMAIL?: string;
  ADMIN_PASSWORD?: string;
  SESSION_SECRET?: string;
};

function settings() {
  const runtime = { ADMIN_EMAIL: env.ADMIN_EMAIL ?? process.env.ADMIN_EMAIL, ADMIN_PASSWORD: env.ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD, SESSION_SECRET: env.SESSION_SECRET ?? process.env.SESSION_SECRET } as RuntimeEnv;
  if (!runtime.ADMIN_EMAIL || !runtime.ADMIN_PASSWORD || !runtime.SESSION_SECRET) {
    throw new Error("Login admin belum dikonfigurasi.");
  }
  return runtime as Required<RuntimeEnv>;
}

function base64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function bytesFromBase64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (value.length % 4)) % 4);
  return Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
}

async function signature(value: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return base64Url(new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value))));
}

async function equal(left: string, right: string) {
  const [leftHash, rightHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(left)),
    crypto.subtle.digest("SHA-256", encoder.encode(right)),
  ]);
  const a = new Uint8Array(leftHash);
  const b = new Uint8Array(rightHash);
  let difference = a.length ^ b.length;
  for (let index = 0; index < Math.max(a.length, b.length); index += 1) difference |= (a[index] ?? 0) ^ (b[index] ?? 0);
  return difference === 0;
}

export async function validCredentials(email: string, password: string) {
  const config = settings();
  const [emailMatches, passwordMatches] = await Promise.all([equal(email.trim().toLowerCase(), config.ADMIN_EMAIL.trim().toLowerCase()), equal(password, config.ADMIN_PASSWORD)]);
  return emailMatches && passwordMatches;
}

export async function createSession() {
  const config = settings();
  const payload = base64Url(encoder.encode(JSON.stringify({ email: config.ADMIN_EMAIL, expires: Date.now() + 1000 * 60 * 60 * 12 })));
  return `${payload}.${await signature(payload, config.SESSION_SECRET)}`;
}

export async function validSession(token?: string) {
  if (!token) return false;
  const [payload, suppliedSignature] = token.split(".");
  if (!payload || !suppliedSignature) return false;
  const config = settings();
  if (!(await equal(suppliedSignature, await signature(payload, config.SESSION_SECRET)))) return false;
  try {
    const decoded = JSON.parse(decoder.decode(bytesFromBase64Url(payload))) as { email?: string; expires?: number };
    return decoded.email === config.ADMIN_EMAIL && typeof decoded.expires === "number" && decoded.expires > Date.now();
  } catch {
    return false;
  }
}

export function sessionCookie(value: string) {
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=43200`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

export function sessionFromCookie(cookieHeader: string | null) {
  return cookieHeader?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
}
