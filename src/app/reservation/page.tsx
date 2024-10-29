import React from 'react';
import dynamic from 'next/dynamic';
import Panier from '@/components/Panier';

export default function Reservation() {
  const HalleDeBere = dynamic(() => import('@/components/HalleDeBere'), { 
    ssr: false 
  });
  return (
    <>
    <div className="mx-2 max-w-[1024px] pb-4">
      <p>
        Veuillez sélectionner vos places souhaitées parmi celles disponibles en cliquant dessus, 
        elles changeront de couleur et s'ajouteront dans votre panier tout en bas de la page. 
      </p>
    </div>
      <HalleDeBere/>
      <aside className="mx-2" style={{ margin: '1em' }}>
        <div className="mx-2 max-w-[1024px] pb-4">
          <p>
            Une fois que votre choix est fait vous pouvez valider votre panier et régler par Carte Bancaire en ligne de manière totalement sécurisée: nous n'enregistrons pas vos coordonnées bancaires, ni la plateforme HelloAsso par laquelle nous passons pour le paiement. <br/>
            HelloAsso vous proposera par défaut une contribution pour eux mais que vous pouvez modifier et même passer à 0. En effet, HelloAsso ne prend pas de frais de transaction et se rémunère uniquement par une contribution volontaire.
          </p>
        </div>
        <Panier />
      </aside>
    </>
  );
}
