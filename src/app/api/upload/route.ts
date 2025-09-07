// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import { verifyFirebaseToken } from "@/lib/firebaseAdmin";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized - No token provided' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    
    // Verify the Firebase token
    const decodedToken = await verifyFirebaseToken(token);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized - Invalid token' }, { status: 401 });
    }

    const data = await req.formData();
    const file = data.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${uuid()}.webp`;
    const tmpPath = path.join("/tmp", filename);
    await writeFile(tmpPath, buffer);

    const result = await cloudinary.uploader.upload(tmpPath, {
      folder: 'swaas-community',
      public_id: `${decodedToken.uid}_${Date.now()}`,
      resource_type: 'auto'
    });
    
    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}