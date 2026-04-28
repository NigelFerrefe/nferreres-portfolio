import SectionHeader from "@/components/SectionHeader";
import { Locale } from "@/types/localeProps";
import ContactForm from "./ContactForm";

const ContactPage = async ({ locale }: { locale: Locale }) => {
  const isEs = locale === "es";
  return (
    <div className="flex flex-col items-center pt-4 px-4 md:px-6">
      <SectionHeader chapter="III" label={isEs ? "Contacto" : "Contact"} />
      <ContactForm isEs={isEs} />
    </div>
  );
};

export default ContactPage;
