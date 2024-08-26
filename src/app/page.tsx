import Image from "next/image";
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
        <Image 
            src="https://files.readme.io/6337955-payer-avec-helloasso.svg" 
            alt="Payer avec HelloAsso" 
            width={285}
            height={85}
            priority
          />
      </aside>
    </main>
  );
}
