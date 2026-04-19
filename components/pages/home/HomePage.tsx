import { ThemeSwitcher } from "@/components/theme-switcher";
import Header from "./Header";
import Navigation from "./Navigation";
import { LangButtons } from "@/components/LangButton";
import { getProfile } from "@/lib/services/profile";
import { Locale } from "@/types/localeProps";


const HomePage = async ({ locale }: { locale: Locale }) => {
  const profile = await getProfile();
  if (!profile) return null;

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-8 w-full max-w-sm md:max-w-md">
        <Header profile={profile} locale={locale} />
        <div className="border-t w-full border-border" />
        <Navigation locale={locale} />
        <div className="flex flex-row gap-5 items-center">
          <ThemeSwitcher />
          <LangButtons />
        </div>
      </div>
    </main>
  );
};

export default HomePage;