import { ThemeSwitcher } from "@/components/theme-switcher";
import { LangButtons } from "@/components/LangButton";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center gap-5 px-6 py-4 lg:hidden">
      <ThemeSwitcher />
      <LangButtons />
    </footer>
  );
};

export default Footer;