import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import { verifyFirebaseToken } from "@/lib/firebaseAdmin";

const isAdminUser = (uid: string): boolean => {
  const adminUids = process.env.FIREBASE_ADMIN_UIDS?.split(",") || [];
  return adminUids.includes(uid);
};

async function handleAdminRequest(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { error: "Authentication required for this action", status: 401 };
  }

  const token = authHeader.split("Bearer ")[1];
  const decodedToken = await verifyFirebaseToken(token);

  if (!decodedToken) {
    return { error: "Invalid authentication token", status: 401 };
  }

  if (!isAdminUser(decodedToken.uid)) {
    return { error: "Unauthorized: Admin privileges required", status: 403 };
  }

  return { decodedToken };
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
