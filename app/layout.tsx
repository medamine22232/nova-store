import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nova Store - Boutique en Ligne",
  description: "Nova Store - Votre destination shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
