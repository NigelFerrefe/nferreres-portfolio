import type { Metadata } from "next";
import CurriculumPage from "@/components/pages/root/curriculum/CurriculumPage";
import { LocalePageProps } from "@/types/localeProps";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs ? "Curriculum" : "Resume",
    description: isEs
      ? "Curriculum de Nigel Ferreres: experiencia profesional, educación, certificaciones y habilidades técnicas."
      : "Resume of Nigel Ferreres: professional experience, education, certifications and technical skills.",
    alternates: {
      canonical: `/${locale}/curriculum`,
      languages: {
        es: "/es/curriculum",
        en: "/en/curriculum",
      },
    },
    openGraph: {
      title: isEs ? "Curriculum | Nigel Ferreres" : "Resume | Nigel Ferreres",
      description: isEs
        ? "Experiencia profesional, educación, certificaciones y habilidades técnicas de Nigel Ferreres."
        : "Professional experience, education, certifications and technical skills of Nigel Ferreres.",
      url: `/${locale}/curriculum`,
    },
  };
}

export default async function Page({ params }: LocalePageProps) {
  const { locale } = await params;

  return <CurriculumPage locale={locale} />;
}