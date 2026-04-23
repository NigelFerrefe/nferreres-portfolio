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

  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.[0] ?? "",
  );

  const activeSkills = skillsByCategory[activeCategory] ?? [];
  const desktopPanelRef = useRef<HTMLDivElement | null>(null);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    requestAnimationFrame(() => {
      desktopPanelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <section id="skills" className="w-full scroll-mt-6 py-10">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="mb-6 ml-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground md:text-base ">
          Skills
        </h2>

        <Card className="rounded-2xl border border-accent/60 bg-card shadow-sm">
          {/* Mobile */}
          <div className="md:hidden">
            <CardHeader className="pb-4">
              <div className="-mx-6 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex min-w-max items-center px-6">
                  {categories.map(([category], index) => {
                    const isActive = activeCategory === category;
                    return (
                      <div key={category} className="flex items-center">
                        <button
                          type="button"
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
                          <span className="mx-3 h-4 w-px bg-border/80" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="max-h-[330px] overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="grid grid-cols-1 gap-2">
                  {activeSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="group relative overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-primary/[0.07] via-background/95 to-background px-3 py-3 transition-all duration-300"
                    >
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.14),transparent_45%)]" />
                      <div className="relative flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/10">
                          <SkillIcon slug={skill.icon_slug} />
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </div>

          {/* Desktop */}
          <div className="hidden md:grid md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="border-r border-border/60 p-4 lg:p-5">
              <div className="flex flex-col gap-2">
                {categories.map(([category]) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
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

            <div ref={desktopPanelRef} className="p-4 lg:p-5">


              <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
                {activeSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="group relative overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-primary/[0.07] via-background/95 to-background px-3 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30"
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.14),transparent_45%)]" />
                    <div className="relative flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/10">
                        <SkillIcon slug={skill.icon_slug} />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}