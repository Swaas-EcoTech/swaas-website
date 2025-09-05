import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Collab from '@/models/Collab';
import { cookies } from 'next/headers';


export async function GET() {
  try {
    await dbConnect();
    const collabs = await Collab.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(collabs);
  } catch (error) {
    console.error('Error fetching collaborations:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch collaborations';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    if (cookieStore.get('isAdmin')?.value !== 'true') {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const { src, alt, impact, collaborators, images, instagramLink } = body;

    if (!src || !alt || !impact || !collaborators) {
      return NextResponse.json(
        { error: 'Missing required fields: src, alt, impact, collaborators' },
        { status: 400 }
      );
    }

    const newCollab = new Collab({
      src,
      alt,
      impact,
      collaborators,
      images: images || [],
      instagramLink: instagramLink || ''
    });

    const savedCollab = await newCollab.save();
    return NextResponse.json({ message: 'Collaboration created successfully', collab: savedCollab }, { status: 201 });

  } catch (error) {
    console.error('Error creating collaboration:', error);
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError' && 'errors' in error) {
      const errorMessages = Object.values(error.errors as Record<string, { message: string }>).map(err => err.message);
      return NextResponse.json({ error: 'Validation failed', details: errorMessages }, { status: 400 });
    }
    const errorMessage = error instanceof Error ? error.message : 'Failed to create collaboration';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}