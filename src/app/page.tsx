'use client'
import React from 'react';

export default function Home() {
  const book = async (event: React.FormEvent) => {
    window.location.href="/reservation/";
  };
  return (
    <div className="mx-2 max-w-[1024px] pb-4">
      <br/>
      Bienvenue sur le site de réservation des emplacements des Puces de Béré du 19 janvier 2025 de 9h à 18h à la Halle de Béré à Châteaubriant. 
      <br/><br/>
      Cet événement est réalisé par le Rotary Club de Châteaubriant et ce site est réservé aux exposants des Puces de Béré.
      <br/><br/>
      Une tombola avec de beaux lots à gagner est organisée via la roue du Rotary.
      <br/><br/>
      Par votre participation, vous contribuez au succès de cette journée et vous apportez votre soutien aux actions internationales, nationales et locales menées par le Rotary. La plus emblématique étant l’éradication de la polio dans le monde (<a href="https://www.rotary.org/fr/our-causes/ending-polio" target="_blank">Polio Plus</a>).
      <br/><br/>
      Venez nombreux ; l’entrée et le parking sont gratuits. Une restauration rapide et une buvette sont à votre disposition.
      <br/><br/>
      <button onClick={book} className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center justify-center">Je veux réserver mes emplacements</button>
    </div>
  );
}
