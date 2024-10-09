import React from 'react';
import dynamic from 'next/dynamic';
import Panier from '@/components/Panier';

export default function Home() {
  const HalleDeBere = dynamic(() => import('@/components/HalleDeBere'), { 
    ssr: false 
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <h1>Les Puces de Béré</h1>
      <HalleDeBere/>
      <aside>
        <Panier />
      </aside>
    </main>
  );
}
