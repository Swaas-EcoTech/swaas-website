import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Collab from "@/models/Collab";

function normalizePayload(body: Record<string, unknown>) {
  return {
    title: String(body.title || "").trim(),
    coverImage: String(body.coverImage || "").trim(),
    description: String(body.description || "").trim(),
    impact: String(body.impact || "").trim(),
    collaborators: String(body.collaborators || "").trim(),
    galleryImages: Array.isArray(body.galleryImages)
      ? body.galleryImages.map((image) => String(image || "").trim()).filter(Boolean)
      : [],
    instagramLink: String(body.instagramLink || "").trim(),
    date: String(body.date || "").trim(),
    sortOrder: Number(body.sortOrder ?? 0) || 0,
  };
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get("isAdmin")?.value !== "true") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid collab ID" }, { status: 400 });
    }

    const payload = normalizePayload(await request.json());
    if (!payload.title || !payload.coverImage) {
      return NextResponse.json(
        { error: "Missing required fields: title, coverImage" },
        { status: 400 }
      );
    }

    await dbConnect();
    const updated = await Collab.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Collab not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Collab updated successfully", collab: updated });
  } catch (error) {
    console.error("Error updating collab:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update collab";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get("isAdmin")?.value !== "true") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid collab ID" }, { status: 400 });
    }

    await dbConnect();
    const deleted = await Collab.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Collab not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Collab deleted successfully" });
  } catch (error) {
    console.error("Error deleting collab:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to delete collab";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
