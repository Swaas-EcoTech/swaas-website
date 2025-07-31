import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.WAQI_TOKEN;

  if (!token) {
    return NextResponse.json({ error: 'API token is missing' }, { status: 500 });
  }

  // The URL uses 'here' to automatically detect location.
  const url = `https://api.waqi.info/feed/here/?token=${token}`;

  try {
    const response = await fetch(url, {
      // This tells Next.js to cache the result for 1 hour.
      next: { revalidate: 3600 }, 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.data || 'Failed to fetch data from WAQI');
    }
    
    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error(data.data || 'API returned an error');
    }

    return NextResponse.json(data.data); // Return the 'data' object from the response

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}