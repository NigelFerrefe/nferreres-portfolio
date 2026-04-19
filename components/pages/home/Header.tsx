"use client";

import { Profile } from "@/types/profile";

import { Locale } from "@/types/localeProps";

export default function Header({
  profile,
  locale,
}: {
  profile: Profile;
  locale: Locale;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-6">
      <h1 className="font-display text-5xl md:text-6xl uppercase tracking-[0.08em] text-foreground">
        {profile.full_name}
      </h1>
      <p className="text-lg font-semibold text-primary md:text-2xl">
        {locale === "es" ? profile.job_title_es : profile.job_title_en}
      </p>
      <p className="max-w-xl text-secondary-foreground text-md md:text-lg">
        {locale === "es" ? profile.bio_es : profile.bio_en}
      </p>
    </div>
  );
}
