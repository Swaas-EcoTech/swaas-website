import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import { cookies } from "next/headers";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(
  req: NextRequest,
  context: RouteContext
) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("isAdmin")?.value;

  if (isAdmin !== "true") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const params = await context.params;
    const deleted = await Post.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: RouteContext
) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("isAdmin")?.value;

  if (isAdmin !== "true") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const body = await req.json();
    const params = await context.params;
    const updated = await Post.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
