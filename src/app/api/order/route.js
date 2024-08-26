import { NextResponse } from 'next/server';
import { getAccessToken, initCheckout } from '../../utils/helloasso';

export async function POST(req, res) {
  const token = await getAccessToken();
  const tickets = await initCheckout(token, req.body);
  return NextResponse.json(tickets);
}
