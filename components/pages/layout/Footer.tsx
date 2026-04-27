import { ThemeSwitcher } from "@/components/theme-switcher";
import { LangButtons } from "@/components/LangButton";
import { getProfile } from "@/lib/services/profile";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import Link from "next/link";

const Footer = async () => {
  const profile = await getProfile();

  return (
    <footer className="px-6 py-4">
      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-3 md:items-center">
        {/* LEFT vacío */}
        <div />

        {/* CENTER iconos */}
        <div className="flex items-center justify-center gap-5 lg:gap-10">
          {profile?.github_url && (
            <Link
              href={profile.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-150"
              aria-label="GitHub"
            >
              <FaGithub className="h-4 w-4 md:h-6 md:w-6" />
            </Link>
          )}

          {profile?.linkedin_url && (
            <Link
              href={profile.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-150"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-4 w-4 md:h-6 md:w-6" />
            </Link>
          )}
        </div>

        {/* RIGHT texto */}
        <p className="text-right text-xs text-muted-foreground">
          © 2026 Nigel Ferreres · All rights reserved
        </p>
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-center gap-5 md:hidden">
        {profile?.github_url && (
          <Link
            href={profile.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-150"
            aria-label="GitHub"
          >
            <FaGithub className="h-4 w-4" />
          </Link>
        )}

        {profile?.linkedin_url && (
          <Link
            href={profile.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-150"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="h-4 w-4" />
          </Link>
        )}

        {profile && <span className="h-4 w-px bg-border" />}
        <ThemeSwitcher />
        {profile && <span className="h-4 w-px bg-border" />}
        <LangButtons />
      </div>
    </footer>
  );
};

export default Footer;