import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: "Puces de Béré 2026 | Accueil",
  description: "Réservez vos places en ligne pour la journée du 18 janvier 2026"
};

export default function Home() {
  const book = async (event: React.FormEvent) => {
    window.location.href="/reservation/";
  };
  return (
    <div className="mx-2 max-w-[1024px] pb-4">
      <br/>
      Bienvenue sur le site de réservation des emplacements des Puces de Béré du 18 janvier 2026 de 9h à 17h à la Halle de Béré à Châteaubriant. 
      <br/><br/>
      Cet événement est réalisé par le Rotary Club de Châteaubriant et ce site est réservé aux exposants des Puces de Béré.
      <br/><br/>
      Une tombola avec de beaux lots à gagner est organisée via la roue du Rotary.
      <br/><br/>
      Par votre participation, vous contribuez au succès de cette journée et vous apportez votre soutien aux actions internationales, nationales et locales menées par le Rotary. La plus emblématique étant l’éradication de la polio dans le monde (<a href="https://www.rotary.org/fr/our-causes/ending-polio" target="_blank">Polio Plus</a>).
      <br/><br/>
      Venez nombreux ; l’entrée et le parking sont gratuits. Une restauration rapide et une buvette sont à votre disposition.
      <br/><br/>
      Vous avez 2 options pour vous inscrire en tant qu’exposant:
      <ul>
        <li>Soit directement en ligne via ce site: <Link href="/reservation" className="block sm:inline text-center sm:text-left bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors items-center justify-center">Je veux réserver mes emplacements</Link></li>
        <li>Soit par courrier :
          <ol>
            <li>télécharger les documents suivants (<Link target="_blank" href="/bulletin-d-inscription-puces-de-bere.pdf">Bulletin d’inscription</Link>, <Link target="_blank" href="/reglement-interieur-puces-de-bere.pdf">Règlement intérieur</Link>, <Link target="_blank" href="/plan-de-circulation-puces-de-bere.png">Plan de circulation</Link>)</li>
            <li>les remplir et les signer</li>
            <li>envoyer le tout dans une enveloppe avec votre chèque de réservation et une copie de votre carte d’identité (ou carte professionnelle si vous êtes un professionnel) à l’adresse suivante:<br/>
            <pre className='items-center'>Rotary Club de Châteaubriant<br/>46 Rue Annie Gautier Grosdoy<br/>44110 CHÂTEAUBRIANT</pre>
            </li>
          </ol>
        </li>
      </ul>
      
    </div>
  );
}
