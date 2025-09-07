import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import { verifyFirebaseToken } from "@/lib/firebaseAdmin";

interface RouteContext {
  params: { id: string };
}

// A simple function to check for admin privileges.
// !! IMPORTANT: Replace this with your actual admin-checking logic.
// For example, check against a list of admin UIDs stored securely.
const isAdminUser = (uid: string): boolean => {
  const adminUids = process.env.FIREBASE_ADMIN_UIDS?.split(',') || [];
  return adminUids.includes(uid);
};

async function handleAdminRequest(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return { error: "Authentication required for this action", status: 401 };
  }
  
  const token = authHeader.split('Bearer ')[1];
  const decodedToken = await verifyFirebaseToken(token);
  
  if (!decodedToken) {
    return { error: "Invalid authentication token", status: 401 };
  }

  // Check if the verified user is an admin
  if (!isAdminUser(decodedToken.uid)) {
    return { error: "Unauthorized: Admin privileges required", status: 403 };
  }

  return { decodedToken };
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const authResult = await handleAdminRequest(req);
  if (authResult.error) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }
  
  await dbConnect();
  try {
    const { id } = context.params;
    const deleted = await Post.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}


export async function PUT(req: NextRequest, context: RouteContext) {
  const authResult = await handleAdminRequest(req);
  if (authResult.error) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  await dbConnect();
  try {
    const { id } = context.params;
    const body = await req.json();
    const updated = await Post.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!updated) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT Error:", err);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}