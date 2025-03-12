import React from 'react';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Puces de Béré 2026 | Exposants",
  description: "liste des exposants pour la journée du 18 janvier 2026"
};

export default function Reservation() {
  const HalleDeBere = dynamic(() => import('@/components/HalleDeBere'), { 
    ssr: false 
  });
  return (
    <HalleDeBere exposantsMode={true}/>
  );
}
