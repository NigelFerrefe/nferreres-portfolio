"use client";

import NavLink from "@/components/ui/navLink";
import { linkOptions } from "@/lib/constants";
import { Locale } from "@/types/localeProps";
import { Profile } from "@/types/profile";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LangButtons } from "@/components/LangButton";
import { DownloadResumeButton } from "@/components/downloadResumeButton";

export default function DesktopNavbar({ profile }: { profile: Profile }) {
  const profileImg = profile?.profile_image_url;
  const params = useParams();
  const rawLocale = (params?.locale as string) || "es";
  const locale: Locale =
    rawLocale === "es" || rawLocale === "en" ? rawLocale : "es";
  const options = linkOptions[locale];
  const fullName = profile?.full_name ?? "Inicio";

  return (
    <div className="py-4 px-6">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">

        {/* Avatar — enlace al inicio */}
        <div className="relative inline-flex shrink-0">
          <div className="absolute inset-0 rounded-full border-2 border-ring animate-breathing opacity-70" />
          <div className="relative rounded-full border-2 border-border bg-background p-1 dark:border-accent">
            <NavLink
              href="/"
              aria-label={
                locale === "es"
                  ? `Ir a la página de inicio de ${fullName}`
                  : `Go to ${fullName}'s homepage`
              }
            >
              <Image
                src={profileImg}
                width={56}
                height={56}
                alt=""
                aria-hidden="true"
                className="rounded-full"
                sizes="56px"
              />
            </NavLink>
          </div>
        </div>

        {/* Navegación */}
        <nav
          aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}
          className="flex items-center gap-4 xl:gap-5"
        >
          {options.map((option) => (
            <NavLink
              key={option.href}
              href={option.href}
              size="sm"
              showActiveState={false}
              className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-secondary"
            >
              <span
                aria-hidden="true"
                className="rounded bg-muted px-1 py-0.5 text-[10px] text-muted-foreground"
              >
                {option.chapter}
              </span>
              <span>{option.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Controles */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex-row hidden lg:flex">
            <ThemeSwitcher />
            <LangButtons />
          </div>
          <DownloadResumeButton profile={profile} showIcon variant="outline" />
        </div>
      </div>
    </div>
  );
}