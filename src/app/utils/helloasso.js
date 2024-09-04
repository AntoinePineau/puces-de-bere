/** 
 * curl -X POST https://api.helloasso.com/oauth2/token -H 'content-type: application/x-www-form-urlencoded' -d 'grant_type=client_credentials&client_id=b7c71585559547c99f2bbd7a4b1155cd&client_secret=z8rI5UVEZcxzRBIbZ83yPN82x5AKxnu4'
 *
 */

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
          scope: 'AccessPublicData AccessTransactions FormAdmin OrganizationAdmin'
      }),
  });

  const data = await response.json();
  return data.access_token;
};

export async function getSoldTickets(accessToken) {
  const response = await fetch(`https://api.helloasso.com/v5/organizations/${process.env.HELLOASSO_ORGANIZATION_ID}/forms/event/${process.env.HELLOASSO_FORM_ID}/items`, {
      headers: {
          Authorization: `Bearer ${accessToken}`,
      },
  });

  const data = await response.json();
  return data.data; 
};

export async function getAllTickets(accessToken) {
  const response = await fetch(`https://api.helloasso.com/v5/organizations/${process.env.HELLOASSO_ORGANIZATION_ID}/forms/event/${process.env.HELLOASSO_FORM_ID}/public`, {
      headers: {
          Authorization: `Bearer ${accessToken}`,
      },
  });

  const data = await response.json();
  return data.tiers; 
};

export async function addToCart(accessToken, cartDetails) {
  const body = transformCartItems(JSON.parse(cartDetails));
  const response = await fetch(`https://www.helloasso.com/ha-api/carts`, {
      headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
      },
      body: body
  });
  const data = await response.json();
  console.log(data);
  return data; 
};

function transformCartItems(cart) {
  return {
      "items": cart.map(item => ({
          "tierId": item.tierId, 
          "tierType": "Registration", // Static value
          "paymentFrequency": "Single", // Static value
          "price": item.price,
          "isEligibleTaxReceipt": false, // Static value
          "vatRate": 0, // Static value
          "customFields": [], // Static value
          "extraOptions": [] // Static value
      })),
      "organizationSlug": "rotary-club-chateaubriant", // Static value
      "formSlug": "puces-de-bere", // Static value
      "formType": "EVENT" // Static value
  };
}

export async function initCheckout(token, orderDetails) {
  const response = await fetch(`https://api.helloasso.com/v5/organizations/${process.env.HELLOASSO_ORGANIZATION_ID}/checkout-intents`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderDetails)
  });

  const data = await response.json();
  return data;
};

export async function createOrder(token, orderDetails) {
  const response = await fetch(`https://api.helloasso.com/v5/organizations/${process.env.HELLOASSO_ORGANIZATION_ID}/forms/event/${process.env.HELLOASSO_FORM_ID}/orders`, {
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