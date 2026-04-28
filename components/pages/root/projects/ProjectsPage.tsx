import SectionHeader from "@/components/SectionHeader";
import { getProjects } from "@/lib/services/projects";
import { Locale } from "@/types/localeProps";
import ProjectCard from "./ProjectCard";
import ScrollToTopButton from "@/components/ScrollToTop";

const ProjectsPage = async ({ locale }: { locale: Locale }) => {
  const isEs = locale === "es";
  const projects = await getProjects()
  return (
    <div className="flex flex-col items-center pt-4 px-4 md:px-6">
      <SectionHeader chapter="II" label={isEs ? "PROYECTOS" : "PROJECTS"} />
      <ProjectCard projects={projects} isEs={isEs} />
      <ScrollToTopButton isEs={isEs} />
    </div>
  );
};

export default ProjectsPage;
