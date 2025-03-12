
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Puces de Béré 2026 | Erreur",
  description: "Réservez vos places en ligne pour la journée du 18 janvier 2026"
};

export default function Error() {
  return (
    <div className="mx-2 max-w-[1024px] pb-4">
      <h2>Une erreur s&apos;est produite</h2>
    </div>
  );
}
