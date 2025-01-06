import React from 'react';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Puces de Béré 2025 | Exposants",
  description: "liste des exposants pour la journée du 19 janvier 2025"
};

export default function Reservation() {
  const HalleDeBere = dynamic(() => import('@/components/HalleDeBere'), { 
    ssr: false 
  });
  return (
    <HalleDeBere exposantsMode={true}/>
  );
}
