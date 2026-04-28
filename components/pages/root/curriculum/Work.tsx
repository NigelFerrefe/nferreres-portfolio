"use client";

import { WorkExperience } from "@/types/cv";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { formatDateTime } from "@/lib/utils/index";

interface WorkExperienceProps {
  workExperience: WorkExperience[];
  isEs: boolean;
}

const WorkExperienceSection = ({ workExperience, isEs }: WorkExperienceProps) => {
  return (
    <section id="experiencia" className="w-full py-10 scroll-mt-6">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6 ml-3">
        {isEs ? "Experiencia" : "Experience"}
      </h2>
      <ol className="relative border-l border-border ml-3" aria-label={isEs ? "Lista de experiencia laboral" : "Work experience list"}>
        {workExperience.map((work) => (
          <li key={work.id} className="mb-10 ml-6">
            <span aria-hidden="true" className="absolute -left-[7px] flex h-3 w-3 rounded-full bg-primary ring-2 ring-background" />
            <p className="text-xs font-medium text-muted-foreground mb-1">
              <time dateTime={work.start_date}>{formatDateTime(work.start_date).dateMonthYear}</time>
              {" — "}
              {work.is_current ? (
                <span>{isEs ? "Actualidad" : "Present"}</span>
              ) : (
                <time dateTime={work.end_date!}>{formatDateTime(work.end_date!).dateMonthYear}</time>
              )}
            </p>
            <h3 className="text-base font-semibold text-foreground">{work.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {work.company}
              <span aria-hidden="true"> · </span>
              <span className="sr-only">, </span>
              {work.location}
            </p>
            <p className="text-sm text-muted-foreground">
              {isEs ? work.description_es : work.description_en}
            </p>

            {(isEs ? work.bullet_points_es : work.bullet_points_en).length > 0 && (
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
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                      {open
                        ? isEs ? "Ocultar detalle" : "Hide detail"
                        : isEs ? "Ver detalle" : "See detail"}
                    </DisclosureButton>

                    <DisclosurePanel
                      transition
                      className="mt-2 space-y-1 overflow-hidden
                                 data-[closed]:opacity-0 data-[closed]:-translate-y-1
                                 transition-all duration-200 ease-out"
                    >
                      <ul aria-label={isEs ? "Detalles del puesto" : "Role details"}>
                        {(isEs ? work.bullet_points_es : work.bullet_points_en).map((point, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex gap-2">
                            <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                            {point}
                          </li>
                        ))}
                      </ul>
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