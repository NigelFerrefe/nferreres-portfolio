"use client";

import { WorkExperience, Education, Certification } from "@/types/cv";
import { formatDateTime } from "@/lib/utils/index";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

type TimelineEvent =
  | { type: "work"; date: Date; data: WorkExperience }
  | { type: "education"; date: Date; data: Education }
  | { type: "certification"; date: Date; data: Certification };

interface Props {
  workExperience: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  isEs: boolean;
}

export default function TimelineDouble({
  workExperience,
  education,
  certifications,
  isEs,
}: Props) {
  const events: TimelineEvent[] = [
    ...workExperience.map((w) => ({
      type: "work" as const,
      date: new Date(w.start_date),
      data: w,
    })),
    ...education.map((e) => ({
      type: "education" as const,
      date: new Date(e.start_date),
      data: e,
    })),
    ...certifications.map((c) => ({
      type: "certification" as const,
      date: new Date(c.issue_date ?? ""),
      data: c,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="hidden md:block w-full py-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* Headers */}
        <div className="grid grid-cols-[1fr_40px_1fr] mb-8" aria-hidden="true">
          <p className="text-base font-semibold uppercase tracking-widest text-muted-foreground text-right pr-6">
            {isEs ? "Experiencia" : "Experience"}
          </p>
          <div />
          <p className="text-base font-semibold uppercase tracking-widest text-muted-foreground pl-6">
            {isEs ? "Formación" : "Education & Certifications"}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea central decorativa */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2"
          />

          <ul
            aria-label={isEs ? "Línea de tiempo" : "Timeline"}
            className="flex flex-col list-none p-0 m-0"
          >
            {events.map((event, i) => {
              const isWork = event.type === "work";
              return (
                <li
                  key={i}
                  className="grid grid-cols-[1fr_40px_1fr] items-start mb-10"
                >
                  <div className={isWork ? "text-right pr-6" : ""}>
                    {isWork && <WorkItem work={event.data} isEs={isEs} />}
                  </div>
                  <div className="flex justify-center pt-1">
                    <div
                      aria-hidden="true"
                      className="h-3 w-3 rounded-full ring-background shrink-0 z-10 bg-primary"
                    />
                  </div>
                  <div className={!isWork ? "pl-6" : ""}>
                    {event.type === "education" && (
                      <EducationItem edu={event.data} isEs={isEs} />
                    )}
                    {event.type === "certification" && (
                      <CertificationItem cert={event.data} isEs={isEs} />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function WorkItem({ work, isEs }: { work: WorkExperience; isEs: boolean }) {
  return (
    <>
      <p className="text-xs font-medium text-muted-foreground mb-1">
        <time dateTime={work.start_date}>
          {formatDateTime(work.start_date).dateMonthYear}
        </time>
        {" — "}
        {work.is_current ? (
          <span>{isEs ? "Actualidad" : "Present"}</span>
        ) : (
          <time dateTime={work.end_date!}>
            {formatDateTime(work.end_date!).dateMonthYear}
          </time>
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
              <DisclosureButton className="mt-3 flex items-center justify-end gap-1.5 w-full text-xs font-medium text-primary hover:text-accent transition-colors duration-150 outline-none">
                {open
                  ? isEs
                    ? "Ocultar detalle"
                    : "Hide detail"
                  : isEs
                    ? "Ver detalle"
                    : "See detail"}
                <svg
                  className={`h-3 w-3 transition-transform duration-200 ${open ? "-rotate-90" : "rotate-90"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </DisclosureButton>
              <DisclosurePanel
                transition
                className="mt-2 overflow-hidden
                           data-[closed]:opacity-0 data-[closed]:-translate-y-1
                           transition-all duration-200 ease-out"
              >
                <ul
                  aria-label={isEs ? "Detalles del puesto" : "Role details"}
                  className="space-y-1"
                >
                  {(isEs ? work.bullet_points_es : work.bullet_points_en).map(
                    (point, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex gap-2 justify-end"
                      >
                        {point}
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60"
                        />
                      </li>
                    ),
                  )}
                </ul>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      )}
    </>
  );
}

function EducationItem({ edu, isEs }: { edu: Education; isEs: boolean }) {
  return (
    <>
      <p className="text-xs font-medium text-muted-foreground mb-1">
        <time dateTime={edu.start_date}>
          {formatDateTime(edu.start_date).dateMonthYear}
        </time>
        {edu.end_date && (
          <>
            {" "}
            —{" "}
            <time dateTime={edu.end_date}>
              {formatDateTime(edu.end_date).dateMonthYear}
            </time>
          </>
        )}
      </p>
      <h3 className="text-base font-semibold text-foreground">
        {isEs ? edu.title_es : edu.title_en}
      </h3>
      <p className="text-sm text-muted-foreground mb-2">
        {edu.institution}
        <span aria-hidden="true"> · </span>
        <span className="sr-only">, </span>
        {edu.location}
      </p>
      <p className="text-sm text-muted-foreground">
        {isEs ? edu.description_es : edu.description_en}
      </p>
    </>
  );
}

function CertificationItem({
  cert,
  isEs,
}: {
  cert: Certification;
  isEs: boolean;
}) {
  return (
    <>
      {cert.issue_date && (
        <p className="text-xs font-medium text-muted-foreground mb-1">
          <time dateTime={cert.issue_date}>
            {formatDateTime(cert.issue_date).dateMonthYear}
          </time>
        </p>
      )}
      <h3 className="text-base font-semibold text-foreground">{cert.title}</h3>
      <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
      <p className="text-sm text-muted-foreground">
        {isEs ? cert.description_es : cert.description_en}
      </p>
    </>
  );
}
