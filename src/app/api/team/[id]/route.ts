import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";

function normalizePayload(body: Record<string, unknown>) {
  return {
    name: String(body.name || "").trim(),
    role: String(body.role || "").trim(),
    category: String(body.category || "").trim(),
    description: String(body.description || "").trim(),
    imageUrl: String(body.imageUrl || "").trim(),
    linkedInLink: String(body.linkedInLink || "").trim(),
    membershipType: body.membershipType === "alumni" ? "alumni" : "team",
    academicYear: String(body.academicYear || "").trim(),
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
      return NextResponse.json({ error: "Invalid person ID" }, { status: 400 });
    }

    const payload = normalizePayload(await request.json());
    if (!payload.name || !payload.category || !payload.imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields: name, category, imageUrl" },
        { status: 400 }
      );
    }

    await dbConnect();
    const updated = await TeamMember.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Person not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Person updated successfully", person: updated });
  } catch (error) {
    console.error("Error updating team member:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update person";
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
      return NextResponse.json({ error: "Invalid person ID" }, { status: 400 });
    }

    await dbConnect();
    const deleted = await TeamMember.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Person not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Person deleted successfully" });
  } catch (error) {
    console.error("Error deleting team member:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to delete person";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
