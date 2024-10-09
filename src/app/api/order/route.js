import { NextResponse } from 'next/server';
import { getAccessToken, initCheckout } from '../../utils/helloasso';

export async function POST(req, res) {
  const token = await getAccessToken();
  const checkout = await initCheckout(token, JSON.parse(req.body));
  return NextResponse.json(checkout);
}
