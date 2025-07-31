import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';
import { cookies } from 'next/headers';

// GET /api/events - Fetch all events or events by category
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query = {};
    if (category && category !== 'all') {
      query = { category };
    }
    
    const events = await Event.find(query)
      .sort({ createdAt: -1 })
      .lean();
    
    // Group events by category for the frontend
    const groupedEvents = {
      'Past Events': [],
      'Upcoming Events': [],
      'Signature Events': []
    };
    
    events.forEach(event => {
      if (groupedEvents[event.category as keyof typeof groupedEvents]) {
        groupedEvents[event.category as keyof typeof groupedEvents].push(event);
      }
    });
    
    return NextResponse.json(groupedEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get('isAdmin')?.value;
    
    if (isAdmin !== 'true') {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const body = await request.json();
    const {
      date,
      month,
      year,
      title,
      description,
      imageUrl,
      projectImages = [],
      instagramLink,
      category = 'Upcoming Events'
    } = body;

    // Validation
    if (!date || !month || !year || !title || !description || !imageUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: date, month, year, title, description, imageUrl' },
        { status: 400 }
      );
    }

    // Create new event
    const newEvent = new Event({
      date: date.trim(),
      month: month.trim(),
      year: year.trim(),
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      projectImages: projectImages.filter((img: string) => img.trim()),
      instagramLink: instagramLink?.trim() || '',
      category
    });

    const savedEvent = await newEvent.save();
    
    return NextResponse.json({
      message: 'Event created successfully',
      event: savedEvent
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating event:', error);
    
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: errorMessages },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}