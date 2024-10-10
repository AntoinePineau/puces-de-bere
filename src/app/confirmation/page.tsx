'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Confirmation() {
  const router = useRouter();
  const { type, checkoutIntentId, code } = router.query;
  const [data, setData] = useState(null);
  const [isRouterReady, setIsRouterReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setIsRouterReady(true);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (isRouterReady) {
      const { checkoutIntentId } = router.query; // Access query only when router is ready
      if (checkoutIntentId) {
        fetch(`/api/verify-checkout/?checkoutIntentId=${checkoutIntentId}`)
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error fetching data:', error));
      }
    }
  }, [isRouterReady, router.query]); // Add router.query to dependencies

  if (!isRouterReady) {
    return <p>Chargement...</p>; // Fallback UI while waiting for router
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
