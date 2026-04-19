import NavLink from "@/components/ui/navLink";

import { Locale } from "@/types/localeProps";


const linkOptions = {
  es: [
    { label: "currículum", chapter: "I", href: "/resume" },
    { label: "proyectos", chapter: "II", href: "/projects" },
    { label: "contacto", chapter: "III", href: "/contact" },
    { label: "template", chapter: "IV", href: "/template" },
  ],
  en: [
    { label: "resume", chapter: "I", href: "/resume" },
    { label: "projects", chapter: "II", href: "/projects" },
    { label: "contact", chapter: "III", href: "/contact" },
    { label: "template", chapter: "IV", href: "/template" },
  ],
};

const Navigation = ({ locale }: { locale: Locale }) => {
  const options = linkOptions[locale];

  return (
    <nav className="flex flex-col items-center gap-8">
      {options.map((option) => {
        return (
          <NavLink
            key={option.href}
            href={option.href}
            showActiveState={false}
            className="w-full"
          >
            <span className="flex items-center justify-between">
              <span>{option.chapter}</span>
              <span className="mx-3">·</span>
              <span>{option.label}</span>
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Navigation;