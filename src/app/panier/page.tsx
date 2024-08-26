'use client'
import Panier from '@/components/Panier';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

export default function PanierPage() {
  var checkoutUrl = 'https://www.helloasso.com/associations/rotary-club-chateaubriant/evenements/puces-de-bere';
  useEffect(() => {
    var item = localStorage.getItem('checkoutUrl');
    if(item) {
      checkoutUrl = item;
    }
  })
  
  return (
    <div>
      <h1>Mon Panier</h1>
      <Panier />
      <Link href={checkoutUrl}>
        <Image 
            src="https://files.readme.io/6337955-payer-avec-helloasso.svg" 
            alt="Payer avec HelloAsso" 
            width={285}
            height={85}
            priority
          />
        </Link>
    </div>
  );
}
