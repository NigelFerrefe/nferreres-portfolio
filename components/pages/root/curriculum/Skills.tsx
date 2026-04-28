"use client";

import { useMemo, useRef, useState } from "react";
import { SkillIcon } from "@/components/SkillIcon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SkillWithCategory } from "@/types/cv";

interface Props {
  skillsByCategory: Record<string, SkillWithCategory[]>;
  isEs: boolean;
}

const CATEGORY_ORDER = [
  "Lenguajes",
  "Frontend",
  "Backend",
  "databases_storage",
  "devops_tools",
];

function getCategoryLabel(category: string, isEs: boolean) {
  const labels: Record<string, { es: string; en: string }> = {
    Lenguajes: { es: "Lenguajes", en: "Languages" },
    Frontend: { es: "Frontend", en: "Frontend" },
    Backend: { es: "Backend", en: "Backend" },
    databases_storage: { es: "DB & Storage", en: "DB & Storage" },
    devops_tools: { es: "DevOps", en: "DevOps" },
  };
  const match = labels[category];
  if (!match) return category;
  return isEs ? match.es : match.en;
}

export default function SkillsSection({ skillsByCategory, isEs }: Props) {
  const categories = useMemo(() => {
    return CATEGORY_ORDER.filter(
      (category) => skillsByCategory[category]?.length,
    ).map((category) => [category, skillsByCategory[category]] as const);
  }, [skillsByCategory]);

  const [activeCategory, setActiveCategory] = useState(categories[0]?.[0] ?? "");
  const activeSkills = skillsByCategory[activeCategory] ?? [];
  const desktopPanelRef = useRef<HTMLDivElement | null>(null);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    requestAnimationFrame(() => {
      desktopPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section id="skills" className="w-full scroll-mt-6 py-10" aria-labelledby="skills-heading">
      <div className="mx-auto w-full max-w-7xl">
        <h2
          id="skills-heading"
          className="mb-6 ml-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground md:text-base"
        >
          Skills
        </h2>

        <Card className="rounded-2xl border border-accent/60 bg-card shadow-sm">
          {/* Mobile */}
          <div className="md:hidden">
            <CardHeader className="pb-4">
              <div
                role="tablist"
                aria-label={isEs ? "Categorías de skills" : "Skill categories"}
                className="-mx-6 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                <div className="flex min-w-max items-center px-6">
                  {categories.map(([category], index) => {
                    const isActive = activeCategory === category;
                    return (
                      <div key={category} className="flex items-center">
                        <button
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          aria-controls="skills-panel-mobile"
                          id={`tab-mobile-${category}`}
                          onClick={() => setActiveCategory(category)}
                          className={`whitespace-nowrap border-b-2 px-1 pb-2 pt-1 text-sm font-medium transition-colors duration-200 ${
                            isActive
                              ? "border-primary text-foreground"
                              : "border-transparent text-muted-foreground"
                          }`}
                        >
                          {getCategoryLabel(category, isEs)}
                        </button>
                        {index < categories.length - 1 && (
                          <span aria-hidden="true" className="mx-3 h-4 w-px bg-border/80" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div
                id="skills-panel-mobile"
                role="tabpanel"
                aria-labelledby={`tab-mobile-${activeCategory}`}
                className="max-h-[330px] overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                <ul className="grid grid-cols-1 gap-2 list-none p-0 m-0">
                  {activeSkills.map((skill) => (
                    <li
                      key={skill.id}
                      className="group relative overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-primary/[0.07] via-background/95 to-background px-3 py-3 transition-all duration-300"
                    >
                      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.14),transparent_45%)]" />
                      <div className="relative flex items-center gap-3">
                        <div aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/10">
                          <SkillIcon slug={skill.icon_slug} />
                        </div>
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </div>

          {/* Desktop */}
          <div className="hidden md:grid md:grid-cols-[220px_minmax(0,1fr)]">
            <div
              role="tablist"
              aria-label={isEs ? "Categorías de skills" : "Skill categories"}
              aria-orientation="vertical"
              className="border-r border-border/60 p-4 lg:p-5"
            >
              <div className="flex flex-col gap-2">
                {categories.map(([category]) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="skills-panel-desktop"
                      id={`tab-desktop-${category}`}
                      onClick={() => handleCategoryChange(category)}
                      className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-background text-muted-foreground hover:border-primary/20 hover:text-foreground"
                      }`}
                    >
                      <span>{getCategoryLabel(category, isEs)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              ref={desktopPanelRef}
              id="skills-panel-desktop"
              role="tabpanel"
              aria-labelledby={`tab-desktop-${activeCategory}`}
              className="p-4 lg:p-5"
            >
              <ul className="grid grid-cols-1 gap-2 xl:grid-cols-2 list-none p-0 m-0">
                {activeSkills.map((skill) => (
                  <li
                    key={skill.id}
                    className="group relative overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-primary/[0.07] via-background/95 to-background px-3 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30"
                  >
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.14),transparent_45%)]" />
                    <div className="relative flex items-center gap-3">
                      <div aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/10">
                        <SkillIcon slug={skill.icon_slug} />
                      </div>
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}