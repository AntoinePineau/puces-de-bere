import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div>
      Bienvenue sur le site de réservation des emplacements des Puces de Béré du 19 janvier 2025 de 9h à 18h à la Halle de Béré à Châteaubriant. 
      <br/>
      Cet événement est réalisé par le Rotary Club de Châteaubriant et ce site est réservé aux exposants des Puces de Béré.
      <br/>
      Une tombola avec de beaux lots à gagner est organisée via la roue du Rotary.
      <br/>
      Par votre participation, vous contribuez au succès de cette journée et vous apportez votre soutien aux actions internationales, nationales et locales menées par le Rotary. La plus emblématique étant l’éradication de la polio dans le monde (<a href="https://www.rotary.org/fr/our-causes/ending-polio" target="_blank">Polio Plus</a>).
      <br/>
      Venez nombreux ; l’entrée et le parking sont gratuits. Une restauration rapide et une buvette sont à votre disposition.
      <br/>
      <Link href="/reservation/">Je veux réserver mes emplacements</Link>
    </div>
  );
}
