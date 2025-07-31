import { NextRequest, NextResponse } from 'next/server';

// A basic type for the expected data structure from the WAQI API.
// You can make this more detailed based on the actual API response.
interface AqiData {
  aqi: number;
  station: {
    name: string;
    url: string;
  };
  // Add other fields as needed
}

export async function GET(request: NextRequest) {
  const token = process.env.WAQI_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'API token is missing' }, { status: 500 });
  }

  // Suggestion: Read stationId from query params for flexibility.
  // Fallback to a default ID if none is provided.
  const searchParams = request.nextUrl.searchParams;
  const stationId = searchParams.get('stationId') || '1442'; // Default to 'Mandir Marg, Delhi'

  const url = `https://api.waqi.info/feed/@${stationId}/?token=${token}`;

  try {
    const response = await fetch(url, {
      cache: 'no-store', // Ensures fresh data on every request
    });

    if (!response.ok) {
      // The API returned an error status (e.g., 404, 500)
      const errorData = await response.json();
      console.error('API request failed:', errorData.data);
      return NextResponse.json({ error: errorData.data || 'Failed to fetch data' }, { status: response.status });
    }
    
    const apiResponse = await response.json();

    if (apiResponse.status !== 'ok') {
      // The API request was successful, but the API itself reports an error
      console.error('API returned an error status:', apiResponse.data);
      return NextResponse.json({ error: apiResponse.data || 'API returned an error' }, { status: 400 });
    }

    // Explicitly type the data being returned
    const data: AqiData = apiResponse.data;

    return NextResponse.json(data);

  } catch (error) {
    console.error('An unexpected error occurred:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}