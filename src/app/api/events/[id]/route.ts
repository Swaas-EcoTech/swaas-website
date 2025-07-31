import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';
import { cookies } from 'next/headers';
import mongoose from 'mongoose';

// GET /api/events/[id] - Get single event
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 });
    }

    const event = await Event.findById(params.id).lean();
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json(event);
  } catch (error) {
    // ✅ Fix: Check if error is an instance of Error before accessing message
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch event';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// PUT /api/events/[id] - Update event
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get('isAdmin')?.value !== 'true') {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await dbConnect();
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 });
    }

    const body = await request.json();
    const { date, month, year, title, description, imageUrl, projectImages, instagramLink, category } = body;

    if (!date || !month || !year || !title || !description || !imageUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedEvent = await Event.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!updatedEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Event updated successfully', event: updatedEvent });

  } catch (error) { // ✅ Fix: Removed ": any" from catch block
    console.error('Error updating event:', error);

    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError' && 'errors' in error) {
      const errorMessages = Object.values(error.errors as Record<string, { message: string }>).map(err => err.message);
      return NextResponse.json({ error: 'Validation failed', details: errorMessages }, { status: 400 });
    }

    const errorMessage = error instanceof Error ? error.message : 'Failed to update event';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE /api/events/[id] - Delete event
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get('isAdmin')?.value !== 'true') {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await dbConnect();
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 });
    }

    const deletedEvent = await Event.findByIdAndDelete(params.id);
    if (!deletedEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    // ✅ Fix: Check if error is an instance of Error before accessing message
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete event';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}