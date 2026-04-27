import type { Metadata } from "next";
import {
  Cinzel_Decorative,
  Cormorant_Garamond,
  Libertinus_Serif,
} from "next/font/google";
import "./globals.css";
import Providers from "@/providers/providers";
import LocaleSync from "@/components/LocaleSync";
import { Suspense } from "react";

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const libertinus = Libertinus_Serif({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-libertinus",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  authors: [{ name: "Nigel Ferreres" }],
  creator: "Nigel Ferreres",
  publisher: "Nigel Ferreres",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${cinzel.variable} ${libertinus.variable} ${cormorant.variable}`}
    >
      <body className="font-body antialiased flex min-h-dvh flex-col">
        <Providers>
          <Suspense fallback={null}>
            <LocaleSync />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
