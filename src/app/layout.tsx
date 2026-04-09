import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kivo - Herramientas para Freelancers",
  description: "Herramientas útiles para freelancers en América Latina. Calcula comisiones de plataformas de pago, crea cotizaciones y más.",
  keywords: "freelancer, herramientas, calculadora, paypal, stripe, wise, mercado pago",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/assets/LOGO.svg" />
      </head>
      <body className="min-h-screen flex flex-col bg-white">{children}</body>
    </html>
  );
}
