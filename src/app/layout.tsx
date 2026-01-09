import type { Metadata } from "next";
import {Toaster} from '@/components/ui/sonner'
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: 'Mini',
  description: 'A semantic data ingestion engine',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <Script src="/tableau.extensions.1.latest.js" />
      </body>
    </html>
  );
}

