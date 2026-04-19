import TemplatePage from "@/components/pages/root/template/TemplatePage";
import { LocalePageProps } from "@/types/localeProps";


export default async function Page({ params }: LocalePageProps) {
  const { locale } = await params;

  return <TemplatePage locale={locale} />;
}
