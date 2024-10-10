import React from 'react';
import dynamic from 'next/dynamic';
import Panier from '@/components/Panier';

export default function Home() {
  const HalleDeBere = dynamic(() => import('@/components/HalleDeBere'), { 
    ssr: false 
  });

  return (
    <>
      <HalleDeBere/>
      <aside>
        <Panier />
      </aside>
    </>
  );
}
