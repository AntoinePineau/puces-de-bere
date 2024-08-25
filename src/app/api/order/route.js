import { NextResponse } from 'next/server';
import { getAccessToken, initCheckout } from '../../utils/helloasso';

export async function POST(req, res) {
  const token = await getAccessToken();
  const tickets = await initCheckout(token, req.body);
  /*
  {
      "containsDonation": false,
      "payer": {
        "firstName": "Antoine",
        "lastName": "PINEAU",
        "email": "antoine@pineau.pm",
        "dateOfBirth": null,
        "address": "54, rue des Déportés Résistants",
        "city": "Châteaubriant",
        "zipCode": "44110",
        "country": "FRA"
      },
      "totalAmount": 2400,
      "initialAmount": 2400,
      "itemName": "Inscription en tant qu'exposant aux Puces de Béré 2025",
      "backUrl": "https://puces-de-bere.vercel.app/",
      "errorUrl": "https://puces-de-bere.vercel.app/error/",
      "returnUrl": "https://puces-de-bere.vercel.app/confirmation/"
    }
  */
  return NextResponse.json(tickets);
}
