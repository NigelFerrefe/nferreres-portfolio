"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SkillForm } from "./SkillForm";
import { useSkills } from "@/hooks/useSkill";

const SkillSection = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);

  const {
    skills,
    isLoading,
    createSkill,
    updateSkill,
    deleteSkill,
  } = useSkills();

  const categories = [...new Map(
    skills.map((s) => [s.skill_categories.id, s.skill_categories])
  ).values()];

  const editingSkill = skills.find((s) => s.id === editingSkillId);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Cargando...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setEditingSkillId(null);
            setIsCreateOpen(true);
          }}
        >
          Añadir
        </Button>
      </div>

      {isCreateOpen && (
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Nueva skill</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsCreateOpen(false)}
            >
              Cerrar
            </Button>
          </div>

          <SkillForm
            categories={categories}
            onSubmit={async (values) => {
              await createSkill(values);
              setIsCreateOpen(false);
            }}
          />
        </div>
      )}

      {editingSkill && (
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Editar skill</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setEditingSkillId(null)}
            >
              Cerrar
            </Button>
          </div>

          <SkillForm
            categories={categories}
            submitLabel="Actualizar skill"
            defaultValues={{
              name: editingSkill.name,
              category_id: editingSkill.category_id,
              icon_slug: editingSkill.icon_slug,
            }}
            onSubmit={async (values) => {
              await updateSkill({ id: editingSkill.id, ...values });
              setEditingSkillId(null);
            }}
          />
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border">
        <div className="grid grid-cols-4 bg-muted px-4 py-3 text-sm font-medium">
          <span>Nombre</span>
          <span>Categoría</span>
          <span className="text-center">Editar</span>
          <span className="text-center">Eliminar</span>
        </div>

        {skills.map((skill) => (
          <div
            key={skill.id}
            className="grid grid-cols-4 items-center border-t border-border px-4 py-3 text-sm"
          >
            <span className="font-medium">{skill.name}</span>
            <span className="text-muted-foreground">{skill.skill_categories.name}</span>

            <div className="flex justify-center">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsCreateOpen(false);
                  setEditingSkillId(skill.id);
                }}
              >
                Editar
              </Button>
            </div>

            <div className="flex justify-center">
              <Button
                size="sm"
                variant="destructive"
                onClick={async () => {
                  const confirmed = window.confirm(
                    `¿Eliminar "${skill.name}"? Esta acción no se puede deshacer.`,
                  );

                  if (!confirmed) return;

                  await deleteSkill(skill.id);

                  if (editingSkillId === skill.id) {
                    setEditingSkillId(null);
                  }
                }}
              >
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillSection;