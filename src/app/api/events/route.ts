import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    await dbConnect();
    
    const events = await Event.find({}).sort({ createdAt: -1 }).lean();
    
    const groupedEvents = {
      'Past Events': [],
      'Upcoming Events': [],
      'Signature Events': []
    } as Record<string, typeof events>;
    
    events.forEach(event => {
      // Ensure the category exists before pushing
      if (event.category && groupedEvents[event.category]) {
        groupedEvents[event.category].push(event);
      }
    });
    
    return NextResponse.json(groupedEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch events';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get('isAdmin')?.value !== 'true') {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const { date, month, year, title, description, imageUrl, projectImages, instagramLink, category } = body;

    if (!date || !month || !year || !title || !description || !imageUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: date, month, year, title, description, imageUrl' },
        { status: 400 }
      );
    }

    const newEvent = new Event({
      date, month, year, title, description, imageUrl, 
      projectImages: projectImages || [],
      instagramLink: instagramLink || '',
      category: category || 'Upcoming Events'
    });

    const savedEvent = await newEvent.save();
    return NextResponse.json({ message: 'Event created successfully', event: savedEvent }, { status: 201 });

  } catch (error) {
    console.error('Error creating event:', error);
    
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError' && 'errors' in error) {
      const errorMessages = Object.values(error.errors as Record<string, { message: string }>).map(err => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: errorMessages },
        { status: 400 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : 'Failed to create event';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}