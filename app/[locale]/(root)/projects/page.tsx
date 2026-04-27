import type { Metadata } from "next";
import ProjectsPage from "@/components/pages/root/projects/ProjectsPage";
import { LocalePageProps } from "@/types/localeProps";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs ? "Proyectos" : "Projects",
    description: isEs
      ? "Proyectos de Nigel Ferreres: aplicaciones web desarrolladas con React, Next.js, Node.js y más."
      : "Projects by Nigel Ferreres: web applications built with React, Next.js, Node.js and more.",
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        es: "/es/projects",
        en: "/en/projects",
      },
    },
    openGraph: {
      title: isEs ? "Proyectos | Nigel Ferreres" : "Projects | Nigel Ferreres",
      description: isEs
        ? "Explora los proyectos de desarrollo web de Nigel Ferreres."
        : "Explore Nigel Ferreres' web development projects.",
      url: `/${locale}/projects`,
    },
  };
}

export default async function Page({ params }: LocalePageProps) {
  const { locale } = await params;
  return <ProjectsPage locale={locale} />;
}