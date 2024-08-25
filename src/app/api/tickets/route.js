import { NextResponse } from 'next/server';
import { getAccessToken, getAvailableTickets } from '../../utils/helloasso';

export async function GET(req, res) {
  const token = await getAccessToken();
  const tickets = await getAvailableTickets(token);
  
  return NextResponse.json(tickets);
}
