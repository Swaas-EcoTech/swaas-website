// File Path: src/app/api/aqi/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.WAQI_TOKEN;

  if (!token) {
    return NextResponse.json({ error: 'API token is missing' }, { status: 500 });
  }

  const url = `https://api.waqi.info/feed/here/?token=${token}`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.data || 'Failed to fetch data from WAQI');
    }
    
    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error(data.data || 'API returned an error');
    }

    return NextResponse.json(data.data);

  } catch (error) {
    // === THIS IS THE FIX ===
    // We first check if the error is a standard Error object
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // Fallback for other types of errors
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}