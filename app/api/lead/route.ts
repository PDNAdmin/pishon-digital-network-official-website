import { NextResponse } from "next/server";

/**
 * Lead capture endpoint: the only place the public can send data to this site.
 *
 * Security:
 *  - only our own pages may post here (Origin check), JSON only, body capped at 8 KB
 *  - only known fields are kept; every value is trimmed, length-capped and stripped of
 *    control characters and angle brackets (so nothing can smuggle HTML/links into the
 *    emails or CRM entries this will feed later)
 *  - spam bots: a hidden "website" field (honeypot) and a minimum fill time
 *  - rate limit: 5 submissions per 10 minutes per IP
 *    NOTE: in-memory, so per server instance. On serverless hosting (e.g. Vercel) also turn on
 *    the platform's firewall/rate limiting, or move this counter to a shared store.
 *
 * TODO: send each lead somewhere real (email via Resend, a CRM, Google Sheets or a WhatsApp alert).
 * When you do: keep secrets in environment variables (never in code) and send email as plain text,
 * or HTML-escape every value.
 */

const MAX_BODY = 8 * 1024;
const LIMITS = { name: 80, business: 120, contact: 120, notes: 1000, need: 20, channel: 20, variant: 20, page: 120 } as const;
const NEEDS = ["website", "assistant", "both", "unsure"];
const CHANNELS = ["whatsapp", "phone", "email"];
const MIN_FILL_MS = 2500;

const hits = new Map<string, { n: number; reset: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  // keep the map small
  if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
  const h = hits.get(ip);
  if (!h || h.reset < now) {
    hits.set(ip, { n: 1, reset: now + WINDOW_MS });
    return false;
  }
  h.n++;
  return h.n > MAX_HITS;
}

/** Plain, safe text: no control characters, no angle brackets, collapsed whitespace, capped. */
function clean(v: unknown, max: number) {
  return String(v ?? "")
    .replace(/[\u0000-\u001f\u007f<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

const reject = (status: number, error: string) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  // 1. only our own site may post here
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!origin || !host || new URL(origin).host !== host) return reject(403, "Forbidden");

  // 2. JSON only, small bodies only
  if (!req.headers.get("content-type")?.includes("application/json")) return reject(415, "Unsupported content type");
  const raw = await req.text();
  if (raw.length > MAX_BODY) return reject(413, "Too large");

  // 3. rate limit per IP
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return reject(429, "Too many requests. Please try again in a few minutes.");

  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed;
  } catch {
    return reject(400, "Invalid JSON");
  }

  // 4. bots: honeypot filled, or submitted faster than a person could type.
  //    Pretend success so they don't learn to adapt.
  const filledFast = typeof body.startedAt === "number" && Date.now() - body.startedAt < MIN_FILL_MS;
  if (clean(body.website, 200) || filledFast) return NextResponse.json({ ok: true });

  // 5. keep known fields only, cleaned
  // names never need links; email apps auto-link raw URLs, so drop them (phishing guard)
  const noLinks = (s: string) => s.replace(/\b(?:https?:\/\/|www\.)\S+/gi, "").replace(/\s+/g, " ").trim();
  const lead = {
    name: noLinks(clean(body.name, LIMITS.name)),
    business: noLinks(clean(body.business, LIMITS.business)),
    contact: clean(body.contact, LIMITS.contact),
    notes: clean(body.notes, LIMITS.notes),
    need: NEEDS.includes(String(body.need)) ? String(body.need) : "unsure",
    channel: CHANNELS.includes(String(body.channel)) ? String(body.channel) : "unknown",
    variant: clean(body.variant, LIMITS.variant),
    page: clean(body.page, LIMITS.page),
    utm: Object.fromEntries(
      Object.entries(body.utm && typeof body.utm === "object" ? (body.utm as Record<string, unknown>) : {})
        .filter(([k]) => /^utm_[a-z]{1,20}$/.test(k))
        .slice(0, 6)
        .map(([k, v]) => [k, clean(v, 80)]),
    ),
  };
  if (!lead.name || !lead.business || !lead.contact) return reject(422, "Missing fields");
  if (lead.channel === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.contact)) return reject(422, "Invalid email");
  if (lead.channel !== "email" && lead.contact.replace(/\D/g, "").length < 7) return reject(422, "Invalid number");

  console.log("[lead]", JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }));
  return NextResponse.json({ ok: true });
}

// anything other than POST
export function GET() {
  return reject(405, "Method not allowed");
}
