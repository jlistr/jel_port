import { NextResponse } from "next/server";

const MAX_BODY_BYTES = 8_000;
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 4_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const UNAVAILABLE =
  "The contact form is not available right now. Please reach out on Instagram instead.";

type Bucket = { timestamps: number[] };

const buckets = new Map<string, Bucket>();

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  return request.headers.get("x-real-ip")?.trim().slice(0, 64) || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(ip) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((stamp) => now - stamp < WINDOW_MS);
  if (bucket.timestamps.length >= MAX_REQUESTS) {
    buckets.set(ip, bucket);
    return true;
  }
  bucket.timestamps.push(now);
  buckets.set(ip, bucket);

  if (buckets.size > 5_000) {
    for (const [key, value] of buckets) {
      value.timestamps = value.timestamps.filter((stamp) => now - stamp < WINDOW_MS);
      if (value.timestamps.length === 0) buckets.delete(key);
    }
  }
  return false;
}

function isEmail(value: string): boolean {
  return value.length <= MAX_EMAIL && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function fromAddressIsUsable(value: string): boolean {
  if (value.length > 200 || /[\r\n]/.test(value)) return false;
  const match = value.match(/<([^>]+)>\s*$/);
  return isEmail(match ? match[1].trim() : value.trim());
}

function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

export async function POST(request: Request) {
  const lengthHeader = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(lengthHeader) && lengthHeader > MAX_BODY_BYTES) {
    return jsonError("That message is too long. Please shorten it and try again.", 413);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !to || !from || !isEmail(to) || !fromAddressIsUsable(from)) {
    console.error("Contact form is missing RESEND_API_KEY, CONTACT_TO_EMAIL, or CONTACT_FROM_EMAIL.");
    return jsonError(UNAVAILABLE, 503);
  }

  if (isRateLimited(clientIp(request))) {
    return jsonError("Please wait a few minutes before sending another message.", 429);
  }

  let payload: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return jsonError("That message is too long. Please shorten it and try again.", 413);
    }
    payload = JSON.parse(text);
  } catch {
    return jsonError("The form could not be read. Please try again.", 400);
  }

  if (!payload || typeof payload !== "object") {
    return jsonError("The form could not be read. Please try again.", 400);
  }

  const data = payload as Record<string, unknown>;
  const honeypot = typeof data.company === "string" ? data.company.trim() : "";
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (!name || name.length > MAX_NAME || /[\r\n\u0000-\u001F]/.test(name)) {
    return jsonError("Please enter your name (100 characters or fewer).", 400);
  }
  if (!isEmail(email) || /[\r\n]/.test(email)) {
    return jsonError("Please enter a valid email address.", 400);
  }
  if (!message || message.length > MAX_MESSAGE) {
    return jsonError("Please enter a message (4,000 characters or fewer).", 400);
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Portfolio inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    console.error("Resend request failed", response.status);
    return jsonError("The message could not be sent. Please try again in a little while.", 502);
  }

  return NextResponse.json({ ok: true });
}
