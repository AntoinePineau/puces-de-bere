import { NextResponse } from 'next/server';
import { getAccessToken, createOrder } from '../../utils/helloasso';

export async function POST(req, res) {
  const token = await getAccessToken();
  const tickets = await createOrder(token, req.body);
  
  return NextResponse.json(tickets);
}
