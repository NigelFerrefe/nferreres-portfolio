"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";
import { Profile } from "@/types/profile";
import { Locale } from "@/types/localeProps";
import { Download } from "lucide-react";

interface DownloadResumeButtonProps extends Omit<ButtonProps, "onClick"> {
  profile: Profile;
  showIcon?: boolean;
  children?: React.ReactNode;
}

export function DownloadResumeButton({
  profile,
  showIcon = true,
  children,
  ...buttonProps
}: DownloadResumeButtonProps) {
  const params = useParams();
  const rawLocale = (params?.locale as string) || "es";
  const locale: Locale =
    rawLocale === "es" || rawLocale === "en" ? rawLocale : "es";

  const cvSpanish = profile?.cv_file_url_es;
  const cvEnglish = profile?.cv_file_url_en;

  const handleDownloadResume = () => {
    const cvUrl = locale === "es" ? cvSpanish : cvEnglish;

    if (!cvUrl) {
      console.warn("CV URL missing for locale:", locale);
      return;
    }

    window.open(cvUrl, "_blank", "noopener,noreferrer");
  };

  const defaultText =
    locale === "es" ? "Descargar currículum" : "Download Resume";
  const newTabNotice =
    locale === "es" ? "(abre en nueva pestaña)" : "(opens in new tab)";

  return (
    <Button onClick={handleDownloadResume} {...buttonProps}>
      {showIcon && <Download className="h-4 w-4" aria-hidden="true" />}
      {children || defaultText}
      <span className="sr-only">{newTabNotice}</span>
    </Button>
  );
}