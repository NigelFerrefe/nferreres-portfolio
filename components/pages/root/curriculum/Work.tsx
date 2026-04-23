"use client";

import { WorkExperience } from "@/types/cv";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";


interface WorkExperienceProps {
  workExperience: WorkExperience[];
  isEs: boolean;
}

const WorkExperienceSection = ({
  workExperience,
  isEs,
}: WorkExperienceProps) => {
  return (
    <section id="experiencia" className="w-full py-10 scroll-mt-6">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6 ml-3">
        {isEs ? "Experiencia" : "Experience"}
      </h2>
      <ol className="relative border-l border-border ml-3">
        {workExperience.map((work) => (
          <li key={work.id} className="mb-10 ml-6">
            <span className="absolute -left-[7px] flex h-3 w-3 rounded-full bg-primary ring-2 ring-background" />
            <p className="text-xs font-medium text-muted-foreground mb-1">
              {work.start_date}
              {" — "}
              {work.is_current
                ? isEs
                  ? "Actualidad"
                  : "Present"
                : work.end_date}
            </p>
            <h3 className="text-base font-semibold text-foreground">
              {work.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {work.company} · {work.location}
            </p>
            <p className="text-sm text-muted-foreground">
              {isEs ? work.description_es : work.description_en}
            </p>

            {/* Bullets colapsables */}
            {(isEs ? work.bullet_points_es : work.bullet_points_en).length >
              0 && (
              <Disclosure>
                {({ open }) => (
                  <>
                    <DisclosureButton className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary hover:text-accent transition-colors duration-150 outline-none">
                      <svg
                        className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      {open
                        ? isEs
                          ? "Ocultar detalle"
                          : "Hide detail"
                        : isEs
                          ? "Ver detalle"
                          : "See detail"}
                    </DisclosureButton>

                    <DisclosurePanel
                      transition
                      className="mt-2 space-y-1 overflow-hidden
                                   data-[closed]:opacity-0 data-[closed]:-translate-y-1
                                   transition-all duration-200 ease-out"
                    >
                      {(isEs
                        ? work.bullet_points_es
                        : work.bullet_points_en
                      ).map((point, i) => (
                        <div
                          key={i}
                          className="text-sm text-muted-foreground flex gap-2"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                          {point}
                        </div>
                      ))}
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
};

export default WorkExperienceSection;
