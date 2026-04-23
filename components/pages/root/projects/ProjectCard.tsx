import { SkillIcon } from "@/components/SkillIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { techToSlugMap } from "@/lib/icons/skill-icon";
import { Project } from "@/types/projects";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  projects: Project[];
  isEs: boolean;
}

const normalizeTech = (tech: string) =>
  tech.toLowerCase().replace(/\s|\./g, "");

const ProjectCard = ({ projects, isEs }: ProjectCardProps) => {
  return (
    <section className="w-full md:w-3/4 py-10 space-y-10">
      {projects.map((project) => (
        <div key={project.id} className="mb-10">
          <Card
            className="
    group relative overflow-hidden rounded-2xl border border-border/60
    bg-gradient-to-br from-primary/[0.08] to-background
    shadow-sm
  "
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.14),transparent_45%)]" />{" "}
            <div className="absolute bottom-12 right-4 translate-y-[-4.5rem] z-20 flex w-12 flex-col items-center gap-7 rounded-full border border-accent/60 bg-card px-2 py-5 shadow-md md:translate-y-[-2rem]">
              {project.main_technologies.map((tech) => (
                <div key={tech} className="text-primary">
                  <SkillIcon
                    slug={techToSlugMap[normalizeTech(tech)]}
                    size={6}
                  />
                </div>
              ))}
            </div>
            <CardHeader className="p-4 pb-0">
<div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-background/60">
  <Image
    src={project.cover_image_url}
    alt={project.title}
    width={1000}
    height={600}
    className="h-full w-full object-cover object-top"
  />
</div>
            </CardHeader>
            <CardContent className="space-y-4 p-5 pt-4">
              <div className="max-w-[85%] md:max-w-[80%]">
                <h3 className=" text-2xl uppercase text-primary">
                  {project.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {isEs
                    ? project.short_description_es
                    : project.short_description_en}
                </p>
              </div>
              <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-2">
                  {project.main_technologies.map((tech) => (
                    <span
                      key={tech}
                      className="
          inline-flex items-center
          rounded-lg border border-border/60
          bg-background px-3 py-1.5
          text-xs font-medium text-muted-foreground
        "
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link href={`/projects/${project.slug}`}>
                  <Button
                    variant="link"
                    size="sm"
                    className="px-0 md:px-2 md:text-base"
                  >
                    {isEs ? "Ver Proyecto" : "View Project"}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </section>
  );
};

export default ProjectCard;
