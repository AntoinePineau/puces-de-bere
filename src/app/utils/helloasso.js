const getAccessToken = async () => {
  const response = await fetch('https://api.helloasso.com/oauth2/token', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: process.env.HELLOASSO_CLIENT_ID,
          client_secret: process.env.HELLOASSO_CLIENT_SECRET,
      }),
  });

  const data = await response.json();
  return data.access_token;
};

const getAvailableTickets = async (accessToken, organizationId, formId) => {
  const response = await fetch(`https://api.helloasso.com/v5/organizations/${organizationId}/forms/${formId}/items`, {
      headers: {
          Authorization: `Bearer ${accessToken}`,
      },
  });

  const data = await response.json();
  return data.data.filter(item => item.availableQuantity > 0); // Filtrez pour les emplacements disponibles
};

const createOrder = async (token, organizationId, formId, orderDetails) => {
  const response = await fetch(`https://api.helloasso.com/v5/organizations/${organizationId}/forms/${formId}/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderDetails),
  });

  const data = await response.json();
  return data;
};


const createReservation = async (accessToken, organizationId, formId, itemId, buyerInfo) => {
  const response = await fetch(`https://api.helloasso.com/v5/organizations/${organizationId}/forms/${formId}/transactions`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
          items: [{
              id: itemId, // ID de l'emplacement ou de la table à réserver
              quantity: 1,
          }],
          buyer: {
              firstName: buyerInfo.firstName,
              lastName: buyerInfo.lastName,
              email: buyerInfo.email,
          },
          payment: {
              amount: 0, // Définissez le montant pour finaliser la réservation
              method: 'card', // Exemple de méthode de paiement
          },
      }),
  });

  const data = await response.json();
  return data;
};



export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { seatId, user } = req.body;
  
      // Logique de réservation (par exemple, appeler l'API HelloAsso ou gérer une base de données)
      // const response = await fetch('API_URL', { method: 'POST', ... });
  
      const apiResponse = await fetch('https://api.helloasso.com/v5/organizations/YOUR_ORGANIZATION_ID/forms/YOUR_FORM_ID/transactions', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const data = await apiResponse.json();

    res.status(200).json(data);
      res.status(200).json({ message: 'Reservation successful', seatId, user });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  