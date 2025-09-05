import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Collab from '@/models/Collab';
import { cookies } from 'next/headers';
import mongoose from 'mongoose';


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cookieStore = cookies();
    if (cookieStore.get('isAdmin')?.value !== 'true') {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await dbConnect();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid collaboration ID' }, { status: 400 });
    }

    const body = await request.json();
    const { src, alt, impact, collaborators, images, instagramLink } = body;

    if (!src || !alt || !impact || !collaborators) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updateData = { src, alt, impact, collaborators, images, instagramLink };

    const updatedCollab = await Collab.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCollab) {
      return NextResponse.json({ error: 'Collaboration not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Collaboration updated successfully', collab: updatedCollab });

  } catch (error) {
    console.error('Error updating collaboration:', error);
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError' && 'errors' in error) {
      const errorMessages = Object.values(error.errors as Record<string, { message: string }>).map(err => err.message);
      return NextResponse.json({ error: 'Validation failed', details: errorMessages }, { status: 400 });
    }
    const errorMessage = error instanceof Error ? error.message : 'Failed to update collaboration';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE /api/collabs/[id] - Delete a collaboration
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cookieStore = cookies();
    if (cookieStore.get('isAdmin')?.value !== 'true') {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await dbConnect();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid collaboration ID' }, { status: 400 });
    }

    const deletedCollab = await Collab.findByIdAndDelete(id);

    if (!deletedCollab) {
      return NextResponse.json({ error: 'Collaboration not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Collaboration deleted successfully' });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete collaboration';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}