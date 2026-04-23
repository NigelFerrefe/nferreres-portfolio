import { Cinzel_Decorative, Cormorant_Garamond, Libertinus_Serif } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/providers";
import LocaleSync from "@/components/LocaleSync";

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
          <LocaleSync />
          {children}
        </Providers>
      </body>
    </html>
  );
}