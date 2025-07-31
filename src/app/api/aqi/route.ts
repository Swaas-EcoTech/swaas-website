import { NextResponse } from 'next/server';

export async function GET(request) {
  const token = process.env.WAQI_TOKEN;
  
  // Station ID for 'Mandir Marg, Delhi' which provides reliable data.
  const stationId = '1442'; 

  if (!token) {
    return NextResponse.json({ error: 'API token is missing' }, { status: 500 });
  }

  // Updated URL to query by specific station ID for consistency.
  const url = `https://api.waqi.info/feed/@${stationId}/?token=${token}`;

  try {
    // Force a fresh data fetch on every request to avoid caching issues.
    const response = await fetch(url, { cache: 'no-store' }); 

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.data || 'Failed to fetch data');
    }
    
    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error(data.data || 'API returned an error');
    }

    return NextResponse.json(data.data);

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}