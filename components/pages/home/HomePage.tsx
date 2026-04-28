import { ThemeSwitcher } from "@/components/theme-switcher";
import Header from "./Header";
import Navigation from "./Navigation";
import { LangButtons } from "@/components/LangButton";
import { getProfile } from "@/lib/services/profile";
import { Locale } from "@/types/localeProps";
import { DownloadResumeButton } from "@/components/downloadResumeButton";

const HomePage = async ({ locale }: { locale: Locale }) => {
  const profile = await getProfile();
  if (!profile) return null;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 md:max-w-md md:gap-8">
        <Header profile={profile} locale={locale} />
        <div className="border-t w-full border-border" />
        <Navigation locale={locale} />
        <div className="flex flex-col items-center py-2 space-y-6  md:flex-row  md:space-x-6 md:space-y-0">
          <div className="flex flex-row gap-5 items-center">
            <ThemeSwitcher />
            <LangButtons />
          </div>
          <DownloadResumeButton
            profile={profile}
            showIcon={true}
            variant={"outline"}
          />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
