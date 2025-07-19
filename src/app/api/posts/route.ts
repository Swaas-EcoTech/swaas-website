import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const posts = await Post.find().sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const newPost = await Post.create(body);
  return NextResponse.json(newPost);
}
