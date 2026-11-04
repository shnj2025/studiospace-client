import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Turns a valid BetterAuth session into a JWT stored in an HTTPOnly cookie.
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  const res = NextResponse.json({ ok: !!session });
  if (!session) {
    res.cookies.delete("token");
    return res;
  }
  const token = jwt.sign({ email: session.user.email, name: session.user.name }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("token");
  return res;
}
