import { create } from "zustand";
import { persist } from "zustand/middleware";

type Locale = "es" | "en";

interface LangStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLangStore = create<LangStore>()(
  persist(
    (set) => ({
      locale: "es",
      setLocale: (locale) => set({ locale }),
    }),
    { name: "lang" }
  )
);