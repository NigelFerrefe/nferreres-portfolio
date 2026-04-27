import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/services/projects";
import ProjectDetail from "@/components/pages/root/projects/ProjectDetail";
import { Locale } from "@/types/localeProps";
import ProjectDetailSkeleton from "@/components/pages/root/projects/Skeleton";

interface PageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

async function DetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectDetail project={project } locale={locale} />;
  
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<ProjectDetailSkeleton />}>
      <DetailPage params={params} />
    </Suspense>
  );
}