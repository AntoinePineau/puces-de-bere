'use client';

import React from 'react';
import dynamic from 'next/dynamic';

export default function Reservation() {
  const HalleDeBere = dynamic(() => import('@/components/HalleDeBere'), {
    ssr: false
  });
  return (
    <HalleDeBere exposantsMode={true}/>
  );
}
