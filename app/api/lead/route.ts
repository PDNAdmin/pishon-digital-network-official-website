import { NextResponse } from "next/server";

/**
 * Lead capture endpoint.
 * TODO: send each lead somewhere real, e.g. email (Resend), a CRM, Google Sheets or a WhatsApp alert.
 * For now it validates and logs on the server so the form flow works end to end.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const name = String(body.name ?? "").trim();
  const business = String(body.business ?? "").trim();
  const contact = String(body.contact ?? "").trim();
  if (!name || !business || !contact) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 422 });
  }
  console.log("[lead]", { ...body, receivedAt: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
