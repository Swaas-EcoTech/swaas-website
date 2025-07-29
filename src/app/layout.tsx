import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout"; // Add this import

// Import Lora
import { Lora } from 'next/font/google';

// Configure Lora font
export const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'], // Make sure you're importing the weights you plan to use (e.g., 700 for bold titles)
  display: 'swap',
  variable: '--font-lora', // This defines the CSS variable name
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SWAAS",
  description: "GTBIT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lora.variable}> {/* Add lora.variable here */}
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}