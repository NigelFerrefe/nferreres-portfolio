import NavLink from "@/components/ui/navLink";
import { linkOptions } from "@/lib/constants";

import { Locale } from "@/types/localeProps";




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