import ProjectsPage from "@/components/pages/root/projects/ProjectsPage";
import { LocalePageProps } from "@/types/localeProps";


export default async function Page({ params }: LocalePageProps) {
  const { locale } = await params;

  return <ProjectsPage locale={locale} />;
}
