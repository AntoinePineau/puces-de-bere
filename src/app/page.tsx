import React from 'react';
import dynamic from 'next/dynamic';
import Panier from '@/components/Panier';

export default function Home() {
  const HalleDeBere = dynamic(() => import('@/components/HalleDeBere'), { 
    ssr: false 
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <HalleDeBere/>
      <aside>
        <Panier />
      </aside>
      <section>
      <iframe id="haWidget" allowtransparency="true" src="https://www.helloasso.com/associations/rotary-club-chateaubriant/evenements/puces-de-bere/widget-bouton" style="width: 100%; height: 70px; border: none;"></iframe>
      </section>
    </main>
  );
}
