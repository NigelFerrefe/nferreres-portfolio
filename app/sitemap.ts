import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/services/projects";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nferrefe.vercel.app";

const locales = ["es", "en"] as const;

const staticRoutes = ["", "/curriculum", "/projects", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  const staticUrls = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
  );

  const projectUrls = locales.flatMap((locale) =>
    projects
      .filter((project) => project.published)
      .map((project) => ({
        url: `${siteUrl}/${locale}/projects/${project.slug}`,
        lastModified: project.created_at
          ? new Date(project.created_at)
          : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  );

  return [...staticUrls, ...projectUrls];
}