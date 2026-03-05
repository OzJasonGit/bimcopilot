// Dev-only: test Kit integration without doing a full signup.
// Only works when NODE_ENV === "development".
// POST /api/test-kit with body: { email?, firstName?, lastName? }

import { NextResponse } from "next/server";
import { addSignupSubscriberToKit } from "../../utils/convertkit";

export async function POST(req) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Test endpoint only available in development" },
      { status: 404 }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const email = body.email || `test-kit-${Date.now()}@example.com`;
    const firstName = body.firstName ?? "Test";
    const lastName = body.lastName ?? "User";

    const result = await addSignupSubscriberToKit({
      email,
      firstName,
      lastName,
    });

    return NextResponse.json({
      ok: result.success,
      ...(result.success
        ? { message: "Subscriber created and tagged. Check Kit dashboard." }
        : { error: result.error }),
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err.message || "Request failed" },
      { status: 500 }
    );
  }
}
