import type { Metadata } from "next";
import { Comic_Neue, Baloo_2 } from "next/font/google";
import "./globals.css";

const comicNeue = Comic_Neue({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-handwriting',
});

const baloo2 = Baloo_2({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: "Will You Be My Valentine?",
  description: "A playful, interactive digital love letter.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${comicNeue.variable} ${baloo2.variable}`}>
      <body className="min-h-screen bg-cream-50 text-lilac-900 font-handwriting">
        {children}
      </body>
    </html>
  );
}

