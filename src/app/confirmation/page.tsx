'use client'
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const checkoutIntentId = searchParams.get('checkoutIntentId');
  const orderId = searchParams.get('orderId');
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
    <div className="mx-2 max-w-[1024px] pb-4">
      <h2>Confirmation de commande</h2>
      {data ? data['order'] && data['order']['id'] == orderId ? (
        <>
          <span>Merci pour votre {data['order']['items'][0]['name']}.<br/>Vous recevrez prochainement votre confirmation par email avec votre QR code, qui vous permettra de bénéficier d&apos;une boisson chaude et d&apos;une viennoiserie.</span>
          <Link href="/" className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center justify-center">Revenir à la page d&apos;accueil</Link>
        </>
      ) :(
        <span>Paiement échoué: <Link href={data['redirectUrl']}>recommencer ici</Link></span>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
}

export default function Confirmation() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ConfirmationContent />
    </Suspense>
  );
}
