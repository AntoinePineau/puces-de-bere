import { getAccessToken, createOrder } from '@/utils/helloasso';

export default async function handler(req, res) {
  const token = await getAccessToken();
  const tickets = await createOrder(token, 'rotary-club-chateaubriant', 'puces-de-bere', req.body);
  
  res.status(200).json(tickets);
}
