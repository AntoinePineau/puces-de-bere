'use client'
import React from 'react';
import dynamic from 'next/dynamic';
import Panier from '@/components/Panier';
import { useRouter } from 'next/router';

export default function Home() {
  const HalleDeBere = dynamic(() => import('@/components/HalleDeBere'), { 
    ssr: false 
  });
  const router = useRouter();
  const handleValidate = async () => {
    fetch('/api/order', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "containsDonation": false,
          "payer": {
            "firstName": "Antoine",
            "lastName": "PINEAU",
            "email": "antoine@pineau.pm"
          },
          "totalAmount": 2400,
          "initialAmount": 2400,
          "itemName": "Inscription en tant qu'exposant aux Puces de Béré 2025",
          "backUrl": "https://puces-de-bere.vercel.app/",
          "errorUrl": "https://puces-de-bere.vercel.app/erreur/",
          "returnUrl": "https://puces-de-bere.vercel.app/confirmation/"
        })
    })
    .then(response => response.json()) // Parse the JSON response
    .then(data => localStorage.setItem('checkoutUrl', data.redirectUrl)) // Handle the response data
    .catch(error => console.error('Error:', error)); // Handle errors
    
    router.push('/panier');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <HalleDeBere/>
      <aside>
        <Panier />
        <button onClick={handleValidate}>Valider mon panier</button>
      </aside>
    </main>
  );
}
