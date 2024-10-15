import React from 'react';
import dynamic from 'next/dynamic';
import Panier from '@/components/Panier';

export default function Home() {
  const HalleDeBere = dynamic(() => import('@/components/HalleDeBere'), { 
    ssr: false 
  });

  const htmlContent = `
  <p>
      Une fois que votre choix est fait vous pouvez valider votre panier et régler par Carte Bancaire en ligne de manière totalement sécurisée: nous n'enregistrons pas vos coordonnées bancaires, ni la plateforme HelloAsso par laquelle nous passons pour le paiement. <br/>
      HelloAsso vous proposera par défaut une contribution pour eux mais que vous pouvez modifier et même passer à 0. En effet, HelloAsso ne prend pas de frais de transaction et se rémunère uniquement par une contribution volontaire.
  </p>
`;
  return (
    <div className="mx-2">
      <HalleDeBere/>
      <aside style={{ margin: '0 1em 1em 1em' }}>
        <div className="mx-2 max-w-[1024px] pb-4">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
        <Panier />
      </aside>
    </div>
  );
}
