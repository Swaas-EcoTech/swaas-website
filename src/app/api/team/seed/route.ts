import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";
import { defaultPeople } from "@/lib/teamDefaults";

export async function POST() {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get("isAdmin")?.value !== "true") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    await dbConnect();
    const existingCount = await TeamMember.countDocuments({ membershipType: "team" });
    if (existingCount > 0) {
      return NextResponse.json(
        { error: "Current team data already exists. Seed skipped." },
        { status: 409 }
      );
    }

    await TeamMember.insertMany(defaultPeople.filter((person) => person.membershipType === "team"));
    return NextResponse.json({ message: "Default team data imported successfully." });
  } catch (error) {
    console.error("Error seeding team members:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to seed people";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
