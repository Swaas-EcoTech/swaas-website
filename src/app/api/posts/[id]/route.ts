import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

// This function checks for the secret password in the request
async function handleAdminRequest(req: Request) {
  const secret = req.headers.get("x-admin-secret");

  // It compares the secret from the frontend against the server's ADMIN_SECRET
  if (secret !== process.env.ADMIN_SECRET) {
    return { error: "Unauthorized: Invalid secret key", status: 403 };
  }

  return { success: true };
}

export async function DELETE(req: Request, context: any) {
  const authResult = await handleAdminRequest(req);
  if (authResult.error) {
    return NextResponse.json(
      { error: authResult.error },
      { status: authResult.status }
    );
  }

  await dbConnect();
  try {
    const id = context.params.id as string;
    const deleted = await Post.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, context: any) {
  const authResult = await handleAdminRequest(req);
  if (authResult.error) {
    return NextResponse.json(
      { error: authResult.error },
      { status: authResult.status }
    );
  }

  await dbConnect();
  try {
    const id = context.params.id as string;
    const body = await req.json();
    const updated = await Post.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT Error:", err);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}