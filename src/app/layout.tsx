import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Puces de Béré 2025",
  description: "Réservez vos places en ligne pour la journée du 19 janvier 2025",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const htmlContent = `
  <p>
      Bienvenue sur le site de réservation des emplacements des Puces de Béré du 19 janvier 2025. Cet événement est réalisé pour le Rotary Club de Châteaubriant et ce site est réservé aux exposants des Puces de Béré.
      <br/>
      Veuillez sélectionner vos places souhaitées parmi celles disponibles en cliquant dessus, 
      elles changeront de couleur et s'ajouteront dans votre panier tout en bas de la page. 
  </p>
`;
  return (
    <html lang="fr">
      <body className={inter.className}>
        <CartProvider>
          <main className="flex flex-col items-center justify-between">
            <h1>Les Puces de Béré 2025</h1>
            <div className="inline-flex" style={{ margin: '0 1em 1em 1em' }}>
              <img src="/logo-rotary-chateaubriant.png" alt="Logo du Rotary Club de Châteaubriant" title="Rotary Club de Châteaubriant" className="max-h-16" />
              <div className="border-r border-[rgb(190,196,201)] h-16 mx-2" /> {/* Vertical line */}
              <img src="/la-magie-du-rotary.png" alt="Thème de l'année 2024-2025" title="La Magie du Rotary" className="max-h-16" />
            </div>
            <div className="mx-2 max-w-[1024px] pb-4">
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
