"use client";

import { useMemo, useState } from "react";
import { LogoutButton } from "../../logout-button";
import { Card, CardContent } from "@/components/ui/card";
import WorkContentSection from "./WorkContent";

const ADMIN_SECTIONS = [
  { key: "experience", label: "Experiencia Laboral" },
  { key: "certifications", label: "Certificaciones" },
  { key: "skills", label: "Habilidades" },
  { key: "projects", label: "Proyectos" },
] as const;

type AdminSectionKey = (typeof ADMIN_SECTIONS)[number]["key"];

const AdminDashboard = () => {
  const [activeSection, setActiveSection] =
    useState<AdminSectionKey>("experience");

  const activeLabel = useMemo(() => {
    return ADMIN_SECTIONS.find((s) => s.key === activeSection)?.label;
  }, [activeSection]);

  return (
    <div className="flex min-h-screen flex-col px-4 py-4 md:px-6">
      <div className="flex justify-end p-4">
        <LogoutButton />
      </div>

      <Card className="mx-auto flex w-full max-w-7xl flex-1 flex-col rounded-2xl border border-accent/60 bg-card shadow-sm">
        <div className="border-b border-border/60 md:hidden">
          <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max items-center px-4">
              {ADMIN_SECTIONS.map((section) => {
                const isActive = activeSection === section.key;

                return (
                  <button
                    key={section.key}
                    type="button"
                    onClick={() => setActiveSection(section.key)}
                    className={`whitespace-nowrap border-b-2 px-3 py-4 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground"
                    }`}
                  >
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1 md:grid md:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden border-r border-border/60 p-4 md:block">
            <nav className="flex flex-col gap-2">
              {ADMIN_SECTIONS.map((section) => {
                const isActive = activeSection === section.key;

                return (
                  <button
                    key={section.key}
                    type="button"
                    onClick={() => setActiveSection(section.key)}
                    className={`flex w-full rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-all ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border bg-background text-muted-foreground hover:border-primary/20 hover:text-foreground"
                    }`}
                  >
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          <CardContent className="flex-1 overflow-y-auto p-4 md:p-6">
            <h2 className="mb-6 text-lg font-semibold">{activeLabel}</h2>

            {activeSection === "experience" && (
              <WorkContentSection />
            )}

            {activeSection === "certifications" && (
              <div>Formulario de certificaciones</div>
            )}

            {activeSection === "skills" && <div>Formulario de habilidades</div>}

            {activeSection === "projects" && <div>Formulario de proyectos</div>}
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
