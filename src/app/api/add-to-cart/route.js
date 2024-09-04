import { NextResponse } from 'next/server';
import { getAccessTokenWithoutAPI, addToCart } from '@/app/utils/helloasso';

export async function POST(req, res) {
  const token = await getAccessTokenWithoutAPI();
  const cartDetails = await req.json();
  const response = await addToCart(token, cartDetails);
  return NextResponse.json({response:response, token:token});
}

