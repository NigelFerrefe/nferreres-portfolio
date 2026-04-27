import type { Metadata } from "next";
import ContactPage from "@/components/pages/root/contact/ContactPage";
import { LocalePageProps } from "@/types/localeProps";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs ? "Contacto" : "Contact",
    description: isEs
      ? "Contacta con Nigel Ferreres para oportunidades, colaboraciones o proyectos de desarrollo frontend y fullstack."
      : "Contact Nigel Ferreres for opportunities, collaborations or frontend and fullstack development projects.",
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        es: "/es/contact",
        en: "/en/contact",
      },
    },
    openGraph: {
      title: isEs ? "Contacto | Nigel Ferreres" : "Contact | Nigel Ferreres",
      description: isEs
        ? "Contacta con Nigel Ferreres para oportunidades, colaboraciones o proyectos."
        : "Contact Nigel Ferreres for opportunities, collaborations or projects.",
      url: `/${locale}/contact`,
    },
  };
}

export default async function Page({ params }: LocalePageProps) {
  const { locale } = await params;

  return <ContactPage locale={locale} />;
}