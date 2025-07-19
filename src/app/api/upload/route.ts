import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get("file") as File;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${uuid()}.webp`;
  const tmpPath = path.join("/tmp", filename);
  await writeFile(tmpPath, buffer);

  const result = await cloudinary.uploader.upload(tmpPath);
  return NextResponse.json({ url: result.secure_url });
}
