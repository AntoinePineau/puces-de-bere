import { NextResponse } from 'next/server';
import { getAccessToken, getAvailableTickets } from '../../utils/helloasso';

export async function GET(req) {
  try {
    const token = await getAccessToken();
    const tickets = await getAvailableTickets(token);

    // Check the structure of tickets
    console.log('Tickets:', tickets);

    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
  }
}
