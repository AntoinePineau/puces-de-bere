import { NextResponse } from 'next/server';
import { getAccessTokenWithoutAPI, addToCart } from '@/app/utils/helloasso';

export async function POST(req, res) {
  const token = await getAccessTokenWithoutAPI();
  console.log(`token: ${token}`);
  const response = await addToCart(token, req.body);
  return NextResponse.json(response);
}

