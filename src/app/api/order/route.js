import { NextResponse } from 'next/server';
import { getAccessToken, initCheckout } from '../../utils/helloasso';

export async function POST(req, res) {
  console.log('Body:', req.body);
  const token = await getAccessToken();
  console.log('Token:', token);
  const checkout = await initCheckout(token, req.body);
  console.log('checkout:', checkout);  
  return NextResponse.json(checkout);
}
