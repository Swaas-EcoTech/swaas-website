import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/mongodb";
import Collab from "@/models/Collab";
import { defaultCollabs } from "@/lib/collabDefaults";

export async function POST() {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get("isAdmin")?.value !== "true") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    await dbConnect();
    const existingCount = await Collab.countDocuments();
    if (existingCount > 0) {
      return NextResponse.json(
        { error: "Collab data already exists. Seed skipped." },
        { status: 409 }
      );
    }

    await Collab.insertMany(defaultCollabs);
    return NextResponse.json({ message: "Default collab data imported successfully." });
  } catch (error) {
    console.error("Error seeding collabs:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to seed collabs";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
