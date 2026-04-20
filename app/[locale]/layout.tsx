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

  return {
    title:
      locale === "es"
        ? "Mi portfolio"
        : "My portfolio",
    description:
      locale === "es"
        ? "Portfolio de desarrollo frontend y fullstack"
        : "Frontend and fullstack developer portfolio",
  };
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}