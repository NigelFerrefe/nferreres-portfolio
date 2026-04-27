import type { Metadata } from "next";
import { Locale } from "@/types/localeProps";

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: {
      default: isEs
        ? "Nigel Ferreres | Desarrollador Frontend & Fullstack"
        : "Nigel Ferreres | Frontend & Fullstack Developer",
      template: "%s | Nigel Ferreres",
    },
    description: isEs
      ? "Portfolio de Nigel Ferreres, desarrollador frontend y fullstack especializado en React, Next.js, Node.js y Python."
      : "Portfolio of Nigel Ferreres, frontend and fullstack developer specialized in React, Next.js, Node.js and Python.",
    keywords: [
      "Nigel Ferreres",
      "frontend developer",
      "fullstack developer",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "portfolio developer",
      "desarrollador frontend",
      "desarrollador fullstack",
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: "/es",
        en: "/en",
      },
    },
    openGraph: {
      title: isEs
        ? "Nigel Ferreres | Desarrollador Frontend & Fullstack"
        : "Nigel Ferreres | Frontend & Fullstack Developer",
      description: isEs
        ? "Portfolio de Nigel Ferreres, desarrollador frontend y fullstack especializado en React, Next.js, Node.js y Python."
        : "Portfolio of Nigel Ferreres, frontend and fullstack developer specialized in React, Next.js, Node.js and Python.",
      url: `/${locale}`,
      siteName: "Nigel Ferreres Portfolio",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Nigel Ferreres Portfolio",
        },
      ],
      locale: isEs ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isEs
        ? "Nigel Ferreres | Desarrollador Frontend & Fullstack"
        : "Nigel Ferreres | Frontend & Fullstack Developer",
      description: isEs
        ? "Portfolio de Nigel Ferreres, desarrollador frontend y fullstack especializado en React, Next.js, Node.js y Python."
        : "Portfolio of Nigel Ferreres, frontend and fullstack developer specialized in React, Next.js, Node.js and Python.",
      images: ["/og-image.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}