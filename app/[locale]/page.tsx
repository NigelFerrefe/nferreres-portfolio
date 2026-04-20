import HomePage from "@/components/pages/home/HomePage";
import { LocalePageProps } from "@/types/localeProps";


export default async function Page({ params }: LocalePageProps) {
  const { locale } = await params;

  return <HomePage locale={locale} />;
}