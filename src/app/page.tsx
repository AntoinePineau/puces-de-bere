import Image from "next/image";
import React from 'react';
import HalleDeBere from '@/components/HalleDeBere';

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <HalleDeBere/>
      <Image 
          src="https://files.readme.io/6337955-payer-avec-helloasso.svg" 
          alt="Payer avec HelloAsso" 
          width={285}
          height={85}
          priority
        />
    </main>
  );
}
