import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';


export const metadata: Metadata = {
  title: "Puces de Béré 2026 | Règlement intérieur",
  description: "Réservez vos places en ligne pour la journée du 18 janvier 2026"
};

export default function ReglementInterieur() {
  return (
    <div className="mx-2 max-w-[1024px] pb-4">
      <h2>Règlement intérieur des Puces de Béré</h2>
      <br/>
      <h3>EXPOSANTS</h3>
      <p>La manifestation LES PUCES DE BERE est ouverte aux particuliers et aux brocanteurs professionnels.</p>
      <p>Chaque exposant définira librement les prix de vente des objets présentés à la vente. Il fera son affaire de la surveillance de ceux–ci et de leur assurance. Les organisateurs ne seront en aucun cas tenus responsables en cas de vol ou de détérioration.</p>
      <p>Les exposants devront prévoir le matériel d&apos;exposition (tables, chaises, etc...). Les tables devront êtres nues, sans tapis ni protection. Néanmoins les organisateurs pourront éventuellement fournir des tables, dans la mesure des stocks disponibles, à des conditions qui seront précisées dans les bulletins de réservation.</p>
      <p>Les emplacements ne comportent pas d&apos;installation électrique.</p>
      <p>Les exposants devront se conformer, immédiatement, aux injonctions du responsable de sécurité, en particulier lors de sa visite du service de sécurité, avant l&apos;ouverture au public.</p>
      <p>Le badge fourni lors de la confirmation d&apos;inscription, doit être collé sur le pare brise du véhicule pour avoir accès au parking exposants.</p>
      <p>Les exposants sont tenus de nettoyer leurs emplacements avant de les quitter.</p>
      <p>Les exposants non inscrits au registre du commerce ou des métiers, attestent sur l’honneur, sur le bulletin de réservation, qu’ils respectent la législation en vigueur, qui stipule qu’ils n’ont pas participé à 2 autres ventes ou brocantes ou vides-greniers depuis moins d’un an.</p>
      <br/>
      <h3>COMMENT EXPOSER VOS ARTICLES ?</h3>
      <p>Vous avez 3 OPTIONS au choix :<br/>
         1️⃣ Vous amenez votre PROPRE TABLE → Réservez uniquement le stand<br/>
         2️⃣ Vous exposez sur PORTANTS ou AU SOL → Réservez uniquement le stand<br/>
         3️⃣ Vous louez nos TABLES → Réservez le stand + ajoutez la location de tables (1€/table)<br/><br/>
         ⚠️ Le prix du stand = uniquement l'EMPLACEMENT AU SOL<br/>
         ⚠️ Les tables de location ne sont PAS incluses dans ce tarif</p>
      <br/>
      <h3>MARCHANDISES</h3>
      <p>Les objets vendus doivent être anciens ou d&apos;occasion, en bon état, sans vice caché.</p>
      <p>La garantie éventuelle accordée par l&apos;exposant, le sera sous la responsabilité exclusive de ce dernier.</p>
      <p>Aucun essai de moteurs à explosion n&apos;est autorisé à l&apos;intérieur de la Halle de Béré. Les réservoirs devront impérativement être vidés.</p>
      <br/>
      <h3>CONDITIONS SANITAIRES</h3>
      <p>Les règles sanitaires, seront celles décidées par le gouvernement et valables le jour de la manifestation.</p>
      <p>Le Rotary de Châteaubriant se réserve la possibilité d’adapter l’organisation des Puces de Béré, en respect de ces règles ; dans ce cas nous vous informerons par email ou SMS exclusivement.</p>
      <p>Les règles de circulation, éventuellement mises en place, devront impérativement être respectées. Dans ce cas, les règles seront remises à chaque exposant.</p>
      <p>L’exposant devra prendre sur son stand toutes les mesures d’hygiène nécessaires ou obligatoires.</p>
      <br/>
      <h3>HORAIRES</h3>
      <p><b>Mise en place des objets sur les emplacements désignés: de 6 h 30 à 8 h 45</b></p>
      <p><b>Tous les véhicules devront être stationnés sur le parking exposant après 8h45.</b></p>
      <p><b>Ouverture au public de 9 h 00 à 17 h 00</b></p>
      <p><b>Début des rangements 17 h 00</b></p>
      <p><b>Fermeture de la salle à 19 h 00</b></p>
      <br/>
      <hr/>
      <br/>
      <p><b><i>
        L&apos;accès autour des bâtiments est strictement limité au temps de déchargement (badge véhicule obligatoire).<br/>
        Pour des raisons de sécurité, aucun véhicule ne peut rester autour du bâtiment aux heures d&apos;ouverture au public. <br/>
        Merci de rejoindre le parking exposants dès que votre véhicule est déchargé. <br/>
        Les exposants devront prendre leurs dispositions pour ne pas gêner les autres participants.<br/><br/>
        Les organisateurs disposeront des emplacements non occupés à 8 h 00, aucun remboursement ne sera possible.
      </i></b></p>
      <Link href="javascript:window.close()" className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center justify-center">J&apos;ai bien lu et accepte le règlement intérieur</Link>
    </div>
  );
}
