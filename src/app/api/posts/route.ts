import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import { verifyFirebaseToken } from "@/lib/firebaseAdmin";

/**
 * GET - Fetches all posts, sorted by most recent.
 * This endpoint is public and does not require authentication.
 */
export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find({}).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

/**
 * POST - Creates a new post.
 * Requires a valid Firebase Bearer token for authentication.
 * User details are extracted securely from the verified token on the server.
 */
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await verifyFirebaseToken(token);

    if (!decodedToken) {
      return NextResponse.json({ error: 'Invalid authentication token' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();

    // Securely construct post data:
    // User identity (UID, email, name) is sourced from the verified token.
    // The photo URL is taken from the token if present, otherwise it falls back
    // to the URL provided in the request body from the authenticated client.
    const postData = {
      content: body.content,
      imageUrl: body.imageUrl,
      userId: decodedToken.uid,
      userEmail: decodedToken.email,
      name: decodedToken.name || decodedToken.email?.split('@')[0] || 'Anonymous',
      userPhotoURL: decodedToken.picture || body.userPhotoURL || null,
    };

    const newPost = await Post.create(postData);
    return NextResponse.json(newPost, { status: 201 });

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

