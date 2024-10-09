import { NextResponse } from 'next/server';
import { getAccessToken, initCheckout } from '../../utils/helloasso';

export async function POST(req, res) {
  const body = await req.text();
  console.log('Body:', body);
  const token = await getAccessToken();
  console.log('Token:', token);
  const checkout = await initCheckout(token, JSON.parse(body));
  console.log('checkout:', checkout);  
  return NextResponse.json(checkout);
}
