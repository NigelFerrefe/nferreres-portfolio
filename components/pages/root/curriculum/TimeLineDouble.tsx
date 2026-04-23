"use client";

import { WorkExperience, Education, Certification } from "@/types/cv";
import { formatDateTime } from "@/utils";
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
        <div className="grid grid-cols-[1fr_40px_1fr] mb-8">
          <h2 className="text-base font-semibold uppercase tracking-widest text-muted-foreground text-right pr-6">
            {isEs ? "Experiencia" : "Experience"}
          </h2>
          <div />
          <h2 className="text-base font-semibold uppercase tracking-widest text-muted-foreground pl-6">
            {isEs ? "Formación" : "Education & Certifications"}
          </h2>
        </div>

        <div className="relative flex flex-col">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          {events.map((event, i) => {
            const isWork = event.type === "work";

            return (
              <div
                key={i}
                className="grid grid-cols-[1fr_40px_1fr] items-start mb-10"
              >
                {/*  Work */}
                <div className={isWork ? "text-right pr-6" : ""}>
                  {isWork && <WorkItem work={event.data} isEs={isEs} />}
                </div>

                <div className="flex justify-center pt-1">
                  <div className="h-3 w-3 rounded-full  ring-background shrink-0 z-10 bg-primary" />
                </div>

                {/*  Education / Certification */}
                <div className={!isWork ? "pl-6" : ""}>
                  {event.type === "education" && (
                    <EducationItem edu={event.data} isEs={isEs} />
                  )}
                  {event.type === "certification" && (
                    <CertificationItem cert={event.data} isEs={isEs} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function WorkItem({ work, isEs }: { work: WorkExperience; isEs: boolean }) {
  return (
    <>
      <p className="text-xs font-medium text-muted-foreground mb-1">
        {formatDateTime(work.start_date).dateMonthYear}
        {" — "}
        {work.is_current
          ? isEs
            ? "Actualidad"
            : "Present"
          : formatDateTime(work.end_date!).dateMonthYear}
      </p>
      <h3 className="text-base font-semibold text-foreground">{work.title}</h3>
      <p className="text-sm text-muted-foreground mb-2">
        {work.company} · {work.location}
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
                className="mt-2 space-y-1 overflow-hidden
                           data-[closed]:opacity-0 data-[closed]:-translate-y-1
                           transition-all duration-200 ease-out"
              >
                {(isEs ? work.bullet_points_es : work.bullet_points_en).map(
                  (point, i) => (
                    <div
                      key={i}
                      className="text-sm text-muted-foreground flex gap-2 justify-end"
                    >
                      {point}
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    </div>
                  ),
                )}
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
        {formatDateTime(edu.start_date).dateMonthYear}
        {edu.end_date ? ` — ${formatDateTime(edu.end_date).dateMonthYear}` : ""}
      </p>
      <h3 className="text-base font-semibold text-foreground">
        {isEs ? edu.title_es : edu.title_en}
      </h3>
      <p className="text-sm text-muted-foreground mb-2">
        {edu.institution} · {edu.location}
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
          {formatDateTime(cert.issue_date).dateMonthYear}
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
