import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { getProfile } from "@/lib/services/profile";
import { LangButtons } from "@/components/LangButton";
import NavLink from "@/components/ui/navLink";

import { Locale } from "@/types/localeProps";

const TemplatePage = async ({ locale }: { locale: Locale }) => {
  const profile = await getProfile();
  if (!profile) return null;
  const title =
    locale === "es"
      ? "Portfolio vista previa theme"
      : "Portfolio theme preview";
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>

            {/* H1 con Cinzel */}
            <h1 className="font-display text-5xl md:text-6xl uppercase tracking-[0.08em] text-foreground">
              {profile.full_name}
            </h1>

            <p className="mt-2 text-lg text-primary"> {locale === "es" ? profile.job_title_es : profile.job_title_en}</p>
          </div>

          <ThemeSwitcher />
          <NavLink href="/">Home</NavLink>
          <LangButtons />
        </div>

        {/* NAV / LINKS con Cinzel */}
        <nav className="flex gap-6 border-b border-border pb-4">
          <Link
            href="#"
            className="font-display text-sm uppercase tracking-[0.15em] text-foreground transition hover:text-primary"
          >
            About
          </Link>
          <Link
            href="#"
            className="font-display text-sm uppercase tracking-[0.15em] text-foreground transition hover:text-primary"
          >
            Projects
          </Link>
          <Link
            href="#"
            className="font-display text-sm uppercase tracking-[0.15em] text-foreground transition hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
            <p className="mb-2 text-sm text-muted-foreground">Card</p>
            <h2 className="text-xl font-semibold text-foreground">Sobre mí</h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Este bloque prueba{" "}
              <span className="text-foreground">foreground</span>,{" "}
              <span className="text-primary">primary</span>,{" "}
              <span className="text-muted-foreground">muted-foreground</span> y
              el{" "}
              <span className="rounded bg-secondary px-1 py-0.5 text-secondary-foreground">
                secondary
              </span>
              .
            </p>

            <div className="mt-4 flex gap-3">
              <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-accent hover:text-accent-foreground">
                Primary button
              </button>

              <button className="rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition hover:bg-accent hover:text-accent-foreground">
                Secondary button
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-popover p-6 text-popover-foreground shadow-sm">
            <p className="mb-2 text-sm text-muted-foreground">
              Popover / Surface
            </p>
            <h2 className="text-xl font-semibold text-foreground">
              Estados y tokens
            </h2>

            <div className="mt-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground">
                Primary
              </span>
              <span className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                Secondary
              </span>
              <span className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
                Muted
              </span>
              <span className="rounded-full bg-accent px-3 py-1 text-sm text-accent-foreground">
                Accent
              </span>
              <span className="rounded-full bg-destructive px-3 py-1 text-sm text-destructive-foreground">
                Destructive
              </span>
            </div>

            <div className="mt-5 rounded-md border border-input bg-background p-3">
              <p className="text-sm text-foreground">Input preview</p>
              <p className="text-sm text-muted-foreground">
                Aquí verías cómo quedan{" "}
                <code className="text-primary">border</code>,{" "}
                <code className="text-primary">input</code> y{" "}
                <code className="text-primary">background</code>.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-card p-6">
          <p className="mb-4 text-sm text-muted-foreground">Formulario real</p>
          <LoginForm />
        </section>
      </div>
    </main>
  );
};

export default TemplatePage;
