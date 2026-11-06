import type { Metadata, Viewport } from 'next';
import './globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'CareCentriq — Modern Care Operations',
  description: 'Operating system for modern IDD & behavioral care providers.',
  icons: {
    icon: "data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='3' y='3' width='8' height='8' rx='2.5' fill='%2300342f'/%3E%3Crect x='13' y='3' width='8' height='8' rx='2.5' fill='%232ee05a'/%3E%3Crect x='3' y='13' width='8' height='8' rx='2.5' fill='%232ee05a'/%3E%3Crect x='13' y='13' width='8' height='8' rx='2.5' fill='%2300342f'/%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-canvas text-grey-900 font-sans antialiased selection:bg-brand-100 selection:text-brand-1200 overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}

