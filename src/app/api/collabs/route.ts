import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
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

export async function GET() {
  try {
    await dbConnect();
    const collabs = await Collab.find({}).sort({ sortOrder: 1, createdAt: -1 }).lean();
    return NextResponse.json({ collabs });
  } catch (error) {
    console.error("Error fetching collabs:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch collabs";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get("isAdmin")?.value !== "true") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    await dbConnect();
    const payload = normalizePayload(await request.json());
    if (!payload.title || !payload.coverImage) {
      return NextResponse.json(
        { error: "Missing required fields: title, coverImage" },
        { status: 400 }
      );
    }

    const created = await Collab.create(payload);
    return NextResponse.json({ message: "Collab created successfully", collab: created }, { status: 201 });
  } catch (error) {
    console.error("Error creating collab:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create collab";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
