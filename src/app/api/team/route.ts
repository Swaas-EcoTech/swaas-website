import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
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

export async function GET() {
  try {
    await dbConnect();
    const people = await TeamMember.find({}).sort({ sortOrder: 1, createdAt: -1 }).lean();

    const currentTeam = people
      .filter((person) => person.membershipType === "team")
      .reduce<Record<string, typeof people>>((acc, person) => {
        const key = person.category || "General";
        if (!acc[key]) acc[key] = [];
        acc[key].push(person);
        return acc;
      }, {});

    const alumni = people
      .filter((person) => person.membershipType === "alumni")
      .sort((a, b) => {
        const yearCompare = String(b.academicYear || "").localeCompare(String(a.academicYear || ""));
        if (yearCompare !== 0) return yearCompare;
        return (a.sortOrder || 0) - (b.sortOrder || 0);
      });

    return NextResponse.json({ currentTeam, alumni, allPeople: people });
  } catch (error) {
    console.error("Error fetching team members:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch people";
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
    const body = await request.json();
    const payload = normalizePayload(body);

    if (!payload.name || !payload.category || !payload.imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields: name, category, imageUrl" },
        { status: 400 }
      );
    }

    const created = await TeamMember.create(payload);
    return NextResponse.json({ message: "Person created successfully", person: created }, { status: 201 });
  } catch (error) {
    console.error("Error creating team member:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create person";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
