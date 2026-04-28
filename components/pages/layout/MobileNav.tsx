"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import NavLink from "@/components/ui/navLink";
import { Profile } from "@/types/profile";
import { linkOptions } from "@/lib/constants";
import { Locale } from "@/types/localeProps";
import { DownloadResumeButton } from "@/components/downloadResumeButton";

export default function MobileNavbar({ profile }: { profile: Profile }) {
  const [isOpen, setIsOpen] = useState(false);
  const profileImg = profile?.profile_image_url;
  const params = useParams();
  const rawLocale = (params?.locale as string) || "es";
  const locale: Locale =
    rawLocale === "es" || rawLocale === "en" ? rawLocale : "es";
  const options = linkOptions[locale];
  const fullName = profile?.full_name ?? "Inicio";

  return (
    <div className="py-4 px-6">
      <div className="flex w-full items-center justify-between px-6 py-3">

        {/* Avatar — enlace al inicio */}
        <div className="relative inline-flex">
          <div className="absolute inset-0 rounded-full border-2 border-ring animate-breathing opacity-70" />
          <div className="border-1 border-border dark:border-accent rounded-full p-1 relative bg-background">
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
                width={40}
                height={40}
                alt=""
                aria-hidden="true"
                className="rounded-full"
                sizes="40px"
              />
            </NavLink>
          </div>
        </div>

        {/* Botón hamburguesa */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl
                     bg-muted hover:bg-muted border border-border
                     transition-colors duration-200 outline-none"
          aria-label={locale === "es" ? "Abrir menú de navegación" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-haspopup="dialog"
        >
          <svg
            className="h-5 w-5 text-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>
      </div>

      {/* Drawer */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          onClose={() => setIsOpen(false)}
          className="relative z-50"
          id="mobile-menu"
          aria-label={locale === "es" ? "Menú de navegación" : "Navigation menu"}
        >
          {/* Overlay */}
          <TransitionChild
            as={Fragment}
            enter="transition duration-300 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-200 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-foreground/15 backdrop-blur-[2px]" aria-hidden="true" />
          </TransitionChild>

          {/* Panel lateral */}
          <TransitionChild
            as={Fragment}
            enter="transition duration-300 ease-out"
            enterFrom="opacity-0 translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="transition duration-200 ease-in"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-full"
          >
            <DialogPanel
              className="fixed top-0 right-0 h-full w-72
                         bg-card border-l border-border
                         flex flex-col shadow-2xl"
            >
              {/* Header del drawer */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <span
                  className="text-md font-bold text-muted-foreground"
                  aria-hidden="true"
                >
                  {locale === "es" ? "Menú" : "Menu"}
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg
                             text-muted-foreground hover:text-foreground
                             hover:bg-secondary transition-colors duration-150"
                  aria-label={locale === "es" ? "Cerrar menú de navegación" : "Close navigation menu"}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Links */}
              <nav
                aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}
                className="flex flex-col gap-1 px-3 py-3"
              >
                {options.map((option) => (
                  <NavLink
                    key={option.href}
                    href={option.href}
                    showActiveState={false}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center gap-3 px-3 py-3 rounded-xl
                               text-foreground hover:bg-secondary
                               transition-colors duration-150"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-6 min-w-6 items-center justify-center rounded-md
                                 bg-muted text-xs font-medium text-muted-foreground
                                 group-hover:bg-primary group-hover:text-primary-foreground
                                 transition-colors duration-150 px-1.5"
                    >
                      {option.chapter}
                    </span>
                    <span className="text-sm font-medium">{option.label}</span>
                  </NavLink>
                ))}
              </nav>

              <div className="p-3 border-t border-border">
                <DownloadResumeButton profile={profile} showIcon={true} className="w-full" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </div>
  );
}