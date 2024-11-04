import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/context/CartContext';
import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Puces de Béré 2025",
  description: "Réservez vos places en ligne pour la journée du 19 janvier 2025"
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const branchName = process.env.BRANCH_NAME; // Récupérer le nom de la branche depuis les variables d'environnement
  const mode = branchName ? ` (${branchName})` : '';
  return (
    <html lang="fr">
      <head>
        <Analytics siteId="G-KDDWEFRK2B"/>
        <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Puces de Béré" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <main className="flex flex-col items-center justify-between">
            <h1>Les Puces de Béré 2025{mode}</h1>
            <div className="inline-flex" style={{ margin: '0 1em 1em 1em' }}>
              <img src="/logo-rotary-chateaubriant.png" alt="Logo du Rotary Club de Châteaubriant" title="Rotary Club de Châteaubriant" className="max-h-16" />
              <div className="border-r border-[rgb(190,196,201)] h-16 mx-2" /> {/* Vertical line */}
              <img src="/la-magie-du-rotary.png" alt="Thème de l'année 2024-2025" title="La Magie du Rotary" className="max-h-16" />
            </div>
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
