"use client";

import { useLangStore } from "@/store/useLangStore";
import { usePathname, useRouter } from "next/navigation";

type Locale = "es" | "en";

export function LangButtons() {
  const locale = useLangStore((state) => state.locale);
  const setLocale = useLangStore((state) => state.setLocale);

  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
    document.cookie = `lang=${nextLocale}; path=/; max-age=31536000`;

    const segments = pathname.split("/").filter(Boolean);

    if (segments[0] === "es" || segments[0] === "en") {
      segments[0] = nextLocale;
    } else {
      segments.unshift(nextLocale);
    }

    router.replace("/" + segments.join("/"));
  };

  return (
    <div
      role="group"
      aria-label="Selección de idioma"
      className="flex items-center gap-1 text-sm font-medium"
    >
      <button
        onClick={() => changeLocale("es")}
        aria-label="Cambiar idioma a español"
        aria-pressed={locale === "es"}
        className={
          locale === "es"
            ? "text-ring"
            : "text-neutral-500 hover:text-ring transition-colors"
        }
      >
        ES
      </button>
      <span aria-hidden="true" className="text-neutral-400">|</span>
      <button
        onClick={() => changeLocale("en")}
        aria-label="Switch language to English"
        aria-pressed={locale === "en"}
        className={
          locale === "en"
            ? "text-ring"
            : "text-neutral-500 hover:text-ring transition-colors"
        }
      >
        EN
      </button>
    </div>
  );
}