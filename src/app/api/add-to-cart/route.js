import { NextResponse } from 'next/server';
import { getAccessToken, addToCart } from '@/app/utils/helloasso';

export async function POST(req, res) {
  const token = await getAccessToken();
  const tickets = await addToCart(token, req.body);
  return NextResponse.json(tickets);
}

