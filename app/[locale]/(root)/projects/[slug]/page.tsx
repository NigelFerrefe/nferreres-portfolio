import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getProjectBySlug } from "@/lib/services/projects";
import ProjectDetail from "@/components/pages/root/projects/ProjectDetail";
import ProjectDetailSkeleton from "@/components/pages/root/projects/Skeleton";
import { Locale } from "@/types/localeProps";

interface PageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return {};

  const isEs = locale === "es";

  const title = project.title;

  const description = (
    isEs ? project.short_description_es : project.short_description_en
  );

  const url = `/${locale}/projects/${slug}`;

  const keywords = [
    project.title,
    "Nigel Ferreres",
    "portfolio",
    "project",
    "frontend developer",
    "fullstack developer",
    "React",
    "Next.js",
    ...project.main_technologies,
    ...project.libraries,
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        es: `/es/projects/${slug}`,
        en: `/en/projects/${slug}`,
      },
    },
    openGraph: {
      title: `${title} | Nigel Ferreres`,
      description,
      url,
      siteName: "Nigel Ferreres Portfolio",
      images: [
        {
          url: project.cover_image_url,
          width: 1200,
          height: 630,
          alt: `${title} project preview`,
        },
      ],
      locale: isEs ? "es_ES" : "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Nigel Ferreres`,
      description,
      images: [project.cover_image_url],
    },
    robots: {
      index: project.published,
      follow: project.published,
    },
  };
}

async function DetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectDetail project={project} locale={locale} />;
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<ProjectDetailSkeleton />}>
      <DetailPage params={params} />
    </Suspense>
  );
}