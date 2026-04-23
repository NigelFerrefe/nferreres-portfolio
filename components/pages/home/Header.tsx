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
    <div className="flex w-full flex-col items-center gap-6 px-4 md:px-0">
      <h1 className="text-center font-display text-5xl uppercase tracking-[0.08em] text-foreground md:text-6xl">
        {profile.full_name}
      </h1>

      <p className="text-center text-lg font-semibold text-primary md:text-2xl">
        {locale === "es" ? profile.job_title_es : profile.job_title_en}
      </p>

      <p
        className="
          w-full max-w-xl text-left text-md text-secondary-foreground
          leading-7 md:text-lg md:leading-8
          first-letter:float-left
          first-letter:mr-2
          first-letter:-mt-1
          first-letter:text-7xl
          first-letter:font-display
          first-letter:font-bold
          first-letter:leading-[0.8]
          first-letter:tracking-tight
          first-letter:opacity-90
          first-letter:text-primary
        "
      >
        {locale === "es" ? profile.bio_es : profile.bio_en}
      </p>
    </div>
  );
}