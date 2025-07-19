// app/api/admin/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { password } = body;

  if (password === process.env.ADMIN_SECRET) {
    const res = NextResponse.json({ message: "Login success" });
    res.cookies.set("isAdmin", "true", {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return res;
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
