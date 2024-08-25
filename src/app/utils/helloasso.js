export async function getAccessToken() {
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

export async function getAvailableTickets(accessToken) {
  const response = await fetch(`https://api.helloasso.com/v5/organizations/${process.env.HELLOASSO_ORGANIZATION_ID}/forms/${process.env.HELLOASSO_FORM_ID}/items`, {
      headers: {
          Authorization: `Bearer ${accessToken}`,
      },
  });

  const data = await response.json();
  return data.data; //.filter(item => item.availableQuantity > 0); // Filtrez pour les emplacements disponibles
};

export async function createOrder(token, orderDetails) {
  const response = await fetch(`https://api.helloasso.com/v5/organizations/${process.env.HELLOASSO_ORGANIZATION_ID}/forms/${process.env.HELLOASSO_FORM_ID}/orders`, {
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


export async function createReservation(accessToken, itemId, buyerInfo) {
  const response = await fetch(`https://api.helloasso.com/v5/organizations/${process.env.HELLOASSO_ORGANIZATION_ID}/forms/${process.env.HELLOASSO_FORM_ID}/transactions`, {
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