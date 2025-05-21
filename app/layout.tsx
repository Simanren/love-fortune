import React from 'react';
import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel'
});

export const metadata: Metadata = {
  title: "Love Fortune Oracle | Your Personal Love Guide",
  description: "Discover your love destiny through MBTI and Astrology readings",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${cinzel.variable} font-serif bg-[#0a0118] text-white relative min-h-screen`}>
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.18)_0%,rgba(10,1,24,0.95)_80%,#0a0118_100%)] pointer-events-none z-0" style={{minHeight:'120vh'}} />
        {children}
      </body>
    </html>
  );
}
