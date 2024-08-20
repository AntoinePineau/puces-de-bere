// pages/api/reserve-seat.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { seatId, user } = req.body;
  
      // Logique de réservation (par exemple, appeler l'API HelloAsso ou gérer une base de données)
      // const response = await fetch('API_URL', { method: 'POST', ... });
  
      res.status(200).json({ message: 'Reservation successful', seatId, user });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  