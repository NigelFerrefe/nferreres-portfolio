"use client";

import SectionHeader from "@/components/SectionHeader";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { SkillIcon } from "@/components/SkillIcon";
import { Button } from "@/components/ui/button";
import { techToSlugMap } from "@/lib/icons/skill-icon";
import { Locale } from "@/types/localeProps";
import { Project } from "@/types/projects";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Link from "next/link";

interface ProjectDetailProps {
  project: Project;
  locale: Locale;
}

const normalizeTech = (tech: string) =>
  tech.toLowerCase().replace(/\s|\./g, "");

const ProjectDetail = ({ project, locale }: ProjectDetailProps) => {
  const isEs = locale === "es";
  const router = useRouter();

  return (
    <div className="flex flex-col items-center pt-4 px-4 md:px-6">

      {/* Cabecera con botón volver */}
      <div className="w-full md:max-w-2xl lg:max-w-4xl flex flex-col md:flex-row md:justify-center md:items-center relative">
        <Button
          variant="link"
          size="lg"
          onClick={() => router.back()}
          aria-label={isEs ? "Volver a proyectos" : "Back to projects"}
          className="self-start px-0 md:absolute md:left-0 md:top-1/2 md:-translate-y-1/4"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span aria-hidden="true">{isEs ? "Volver" : "Back"}</span>
        </Button>

        <SectionHeader label={isEs ? "Detalle proyecto" : "Project Detail"} />
      </div>

      {/* Card principal */}
      <article
        aria-labelledby="project-title"
        className="w-full mx-2 mt-5 md:mt-10 md:mx-0 max-w-lg md:max-w-2xl lg:max-w-4xl rounded-lg border border-primary/40 bg-card shadow-[0_0_25px_hsl(var(--primary)/0.25),0_0_60px_hsl(var(--primary)/0.15)] dark:shadow-[0_0_15px_hsl(var(--primary)/0.15),0_0_30px_hsl(var(--primary)/0.08)] transition-all duration-300"
      >

        {/* Título */}
        <div className="border-b border-border p-4 py-2 md:p-6 md:py-4">
          <h2
            id="project-title"
            className="text-2xl md:text-3xl tracking-wider font-display text-primary"
          >
            {project.title}
          </h2>
        </div>

        {/* Descripción */}
        <div className="p-4 md:p-6 flex flex-col gap-4">
          <p>
            {isEs ? project.full_description_es : project.full_description_en}
          </p>

          {(isEs ? project.bullet_points_es : project.bullet_points_en).length > 0 && (
            <Disclosure>
              <DisclosureButton className="group flex items-center gap-1.5 text-xs font-medium text-primary hover:text-accent transition-colors duration-150 outline-none">
                <svg
                  className="h-3 w-3 transition-transform duration-200 group-data-[open]:rotate-90"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span className="group-data-[open]:hidden">
                  {isEs ? "Ver detalle" : "See detail"}
                </span>
                <span className="hidden group-data-[open]:inline">
                  {isEs ? "Ocultar detalle" : "Hide detail"}
                </span>
              </DisclosureButton>

              <DisclosurePanel
                transition
                className="mt-2 overflow-hidden
                           data-[closed]:opacity-0 data-[closed]:-translate-y-1
                           transition-all duration-200 ease-out"
              >
                <ul
                  aria-label={isEs ? "Detalles del proyecto" : "Project details"}
                  className="space-y-1 list-none p-0 m-0"
                >
                  {(isEs ? project.bullet_points_es : project.bullet_points_en).map((point, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      {point}
                    </li>
                  ))}
                </ul>
              </DisclosurePanel>
            </Disclosure>
          )}

          <div aria-hidden="true" className="border-b border-border" />
        </div>

        {/* Tech stack */}
        <div className="p-4 md:p-6 flex flex-col gap-4">
          <p className="uppercase font-semibold text-sm text-muted-foreground tracking-widest">
            Tech stack
          </p>

          {/* Iconos principales — decorativos, las etiquetas ya los nombran */}
          <div aria-hidden="true" className="flex space-x-3">
            {project.main_technologies.map((tech) => (
              <div key={tech} className="text-primary">
                <SkillIcon slug={techToSlugMap[normalizeTech(tech)]} size={8} />
              </div>
            ))}
          </div>

          {/* Tecnologías principales como lista */}
          <ul
            aria-label={isEs ? "Tecnologías principales" : "Main technologies"}
            className="flex flex-wrap gap-2 list-none p-0 m-0"
          >
            {project.main_technologies.map((tech) => (
              <li
                key={tech}
                className="inline-flex items-center rounded-lg border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>

          {/* Librerías */}
          {project.libraries.length > 0 && (
            <ul
              aria-label={isEs ? "Librerías y herramientas" : "Libraries and tools"}
              className="flex flex-wrap gap-2 list-none p-0 m-0"
            >
              {project.libraries.map((tech) => (
                <li
                  key={tech}
                  className="inline-flex items-center rounded-lg border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
          )}

          <div aria-hidden="true" className="border-b border-border" />
        </div>

        {/* Links */}
        <div className="p-4 md:p-6 flex flex-col gap-4">
          <p className="uppercase font-semibold text-sm text-muted-foreground tracking-widest">
            Links
          </p>

          <div className="flex flex-wrap gap-3">
            {project.github_url && (
              <Button variant="outline" asChild>
                <Link
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    isEs
                      ? `Ver código frontend de ${project.title} en GitHub (abre en nueva pestaña)`
                      : `View ${project.title} frontend code on GitHub (opens in new tab)`
                  }
                >
                  <FaGithub aria-hidden="true" />
                  Frontend
                </Link>
              </Button>
            )}

            {project.githubback_url && (
              <Button variant="outline" asChild>
                <Link
                  href={project.githubback_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    isEs
                      ? `Ver código backend de ${project.title} en GitHub (abre en nueva pestaña)`
                      : `View ${project.title} backend code on GitHub (opens in new tab)`
                  }
                >
                  <FaGithub aria-hidden="true" />
                  Backend
                </Link>
              </Button>
            )}

            {project.deploy_url && (
              <Button asChild>
                <Link
                  href={project.deploy_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    isEs
                      ? `Visitar sitio web de ${project.title} (abre en nueva pestaña)`
                      : `Visit ${project.title} website (opens in new tab)`
                  }
                >
                  {isEs ? "Visitar sitio web" : "Visit Website"}
                </Link>
              </Button>
            )}
          </div>

          <div aria-hidden="true" className="border-b border-border" />
        </div>
      </article>
    </div>
  );
};

export default ProjectDetail;