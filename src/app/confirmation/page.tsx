'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Import useSearchParams

export default function Confirmation() {
  const searchParams = useSearchParams(); // Get search parameters
  const checkoutIntentId = searchParams.get('checkoutIntentId'); // Access checkoutIntentId from search params
  const [data, setData] = useState(null);
  const [isRouterReady, setIsRouterReady] = useState(false);
  useEffect(() => {
    setIsRouterReady(true);
  }, []);

  useEffect(() => {
    if (isRouterReady && checkoutIntentId) {
      fetch(`/api/verify-checkout/?checkoutIntentId=${checkoutIntentId}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [isRouterReady, checkoutIntentId]);

  if (!isRouterReady) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h2>Confirmation de commande</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
}
