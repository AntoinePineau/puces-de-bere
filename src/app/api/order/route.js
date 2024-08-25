import { getAccessToken, createOrder } from '../../utils/helloasso';

export default async function GET(req, res) {
  const token = await getAccessToken();
  const tickets = await createOrder(token, req.body);
  
  res.status(200).json(tickets);
}
