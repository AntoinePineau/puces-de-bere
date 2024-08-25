import { getAccessToken, getAvailableTickets } from '../../utils/helloasso';

export default async function handler(req, res) {
  const token = await getAccessToken();
  const tickets = await getAvailableTickets(token);
  
  res.status(200).json(tickets);
}
