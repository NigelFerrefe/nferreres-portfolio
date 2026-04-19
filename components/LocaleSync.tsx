"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLangStore } from "@/store/useLangStore";

type Locale = "es" | "en";

export default function LocaleSync() {
  const pathname = usePathname();
  const setLocale = useLangStore((s) => s.setLocale);

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const urlLocale = segments[0] as Locale;

    if (urlLocale === "es" || urlLocale === "en") {
      setLocale(urlLocale);
    }
  }, [pathname, setLocale]);

  return null;
}