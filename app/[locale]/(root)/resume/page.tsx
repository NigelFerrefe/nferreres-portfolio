import CurriculumPage from "@/components/pages/root/curriculum/CurriculumPage";
import { LocalePageProps } from "@/types/localeProps";


export default async function Page({ params }: LocalePageProps) {
  const { locale } = await params;

  return <CurriculumPage locale={locale} />;
}
