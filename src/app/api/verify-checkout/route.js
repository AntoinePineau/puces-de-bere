import { NextResponse } from 'next/server';
import { getAccessToken, initCheckout } from '../../utils/helloasso';

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const checkoutIntentId = searchParams.get('checkoutIntentId');
  const code = searchParams.get('code');
  console.log(`type:${type} | checkoutIntentId:${checkoutIntentId} | code:${code}`);

  const token = await getAccessToken();
  console.log('Token:', token);
  const checkout = await verifyCheckout(token, checkoutIntentId);
  console.log('checkout:', checkout);  
  return NextResponse.json(checkout);
}
