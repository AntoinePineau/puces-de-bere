'use client'
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams

export default function Confirmation() {
  const searchParams = useSearchParams(); // Get search parameters
  const checkoutIntentId = searchParams.get('checkoutIntentId');
  const orderId = searchParams.get('orderId'); 
  const code = searchParams.get('code'); 
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
    <Suspense fallback={<p>Loading...</p>}>
      <div>
        <h2>Confirmation de commande</h2>
        {data ? data['order'] ? data['order']['id'] == orderId ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) :(
          <span>Paiement échoué: recommencer ici {data['redirectURL']}</span>
        ) : (
          <span>Pas le bon ID de commande {data['order']['id']}</span>
        ) : (
          <p>Chargement des données...</p>
        )}
      </div>
    </Suspense>
  );
}
