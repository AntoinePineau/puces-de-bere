'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Confirmation() {
  const router = useRouter();
  const { type, checkoutIntentId, code } = router.query;
  const [existingSeats, setExistingSeats] = useState(null);

  useEffect(() => {
    if (checkoutIntentId) {
      fetch(`/api/verify-checkout/?checkoutIntentId=${checkoutIntentId}`)
        .then(response => response.json())
        .then(data => setExistingSeats(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [checkoutIntentId]);

  return (
    <div>
      <h2>Confirmation de commande</h2>
      {existingSeats ? (
        <pre>{JSON.stringify(existingSeats, null, 2)}</pre>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
}
