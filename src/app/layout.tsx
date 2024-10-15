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
      Veuillez sélectionner vos places souhaitées parmi celles disponibles en cliquant dessus, 
      elles changeront de couleur et s'ajouteront dans votre panier tout en bas de la page. 
      <br/>
      Une fois que votre choix est fait vous pouvez valider votre panier et régler par Carte Bancaire en ligne de manière totalement sécurisée: nous n'enregistrons pas vos coordonnées bancaires, ni la plateforme HelloAsso par laquelle nous passons pour le paiement. <br/>
      HelloAsso vous proposera par défaut une contribution pour eux mais que vous pouvez modifier et même passer à 0. En effet, HelloAsso ne prend pas de frais de transaction et se rémunère uniquement par une contribution volontaire.
  </p>
`;
  return (
    <html lang="fr">
      <body className={inter.className}>
        <CartProvider>
          <main className="flex flex-col items-center justify-between">
            <h1>Les Puces de Béré 2025</h1>
            <div className="inline-flex" style={{ margin: '0 1em 1em' }}>
              <img src="/logo-rotary-chateaubriant.png" alt="Logo du Rotary Club de Châteaubriant" title="Rotary Club de Châteaubriant" className="max-h-16" />
              <div className="border-r border-[rgb(190,196,201)] h-16 mx-2" /> {/* Vertical line */}
              <img src="/la-magie-du-rotary.png" alt="Thème de l'année 2024-2025" title="La Magie du Rotary" className="max-h-16" />
            </div>
            <div className="mx-auto max-w-[1024px] pb-4">
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
