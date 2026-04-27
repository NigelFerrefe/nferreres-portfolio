import ContactPage from "@/components/pages/root/contact/ContactPage";
import { LocalePageProps } from "@/types/localeProps";


export default async function Page({ params }: LocalePageProps) {
  const { locale } = await params;

  return <ContactPage locale={locale} />;
}
