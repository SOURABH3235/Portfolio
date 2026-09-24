/**
 * Optional API stub for future real chat / contact backend.
 * POST JSON { subject, message, optionId } and persist / email from here.
 */
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.message || typeof body.message !== "string") {
    return NextResponse.json(
      { ok: false, error: "message is required" },
      { status: 400 },
    );
  }

  // TODO: connect email provider, database, or webhook
  return NextResponse.json({
    ok: true,
    queued: false,
    note: "Stub endpoint — wire a provider before relying on this in production.",
  });
}
