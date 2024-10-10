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
  return (
    <html lang="fr">
      <body className={inter.className}>
        <CartProvider>
          <main className="flex min-h-screen flex-col items-center justify-between p-4">
            <h1>Les Puces de Béré</h1>
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
