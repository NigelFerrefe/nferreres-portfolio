export type Locale = "es" | "en";

export type LocalePageProps = {
  params: Promise<{ locale: Locale }>;
};