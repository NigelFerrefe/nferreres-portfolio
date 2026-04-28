"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWorkExperience } from "@/hooks/useWorkExperience";
import { WorkExperienceForm } from "./WorkExperienceForm";

const WorkContentSection = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingWorkId, setEditingWorkId] = useState<string | null>(null);

  const {
    workExperience,
    isLoading,
    createWorkExperience,
    updateWorkExperience,
    deleteWorkExperience,
  } = useWorkExperience();

  const editingWork = workExperience.find((work) => work.id === editingWorkId);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Cargando...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setEditingWorkId(null);
            setIsCreateOpen(true);
          }}
        >
          Añadir
        </Button>
      </div>

      {isCreateOpen && (
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Nueva experiencia laboral</h3>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsCreateOpen(false)}
            >
              Cerrar
            </Button>
          </div>

          <WorkExperienceForm
            onSubmit={async (values) => {
              await createWorkExperience(values);
              setIsCreateOpen(false);
            }}
          />
        </div>
      )}

      {editingWork && (
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Editar experiencia laboral</h3>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setEditingWorkId(null)}
            >
              Cerrar
            </Button>
          </div>

          <WorkExperienceForm
            submitLabel="Actualizar experiencia"
            defaultValues={{
              title: editingWork.title,
              company: editingWork.company,
              location: editingWork.location,
              start_date: editingWork.start_date,
              end_date: editingWork.end_date,
              is_current: editingWork.is_current,
              description_es: editingWork.description_es,
              description_en: editingWork.description_en,
              bullet_points_es: editingWork.bullet_points_es.length
                ? editingWork.bullet_points_es
                : [""],
              bullet_points_en: editingWork.bullet_points_en.length
                ? editingWork.bullet_points_en
                : [""],
            }}
            onSubmit={async (values) => {
              await updateWorkExperience({
                id: editingWork.id,
                ...values,
              });

              setEditingWorkId(null);
            }}
          />
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border">
        <div className="grid grid-cols-4 bg-muted px-4 py-3 text-sm font-medium">
          <span>Trabajo</span>
          <span>Empresa</span>
          <span className="text-center">Editar</span>
          <span className="text-center">Eliminar</span>
        </div>

        {workExperience.map((work) => (
          <div
            key={work.id}
            className="grid grid-cols-4 items-center border-t border-border px-4 py-3 text-sm"
          >
            <span className="font-medium">{work.title}</span>
            <span className="text-muted-foreground">{work.company}</span>

            <div className="flex justify-center">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsCreateOpen(false);
                  setEditingWorkId(work.id);
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
                    `¿Eliminar "${work.title}"? Esta acción no se puede deshacer.`,
                  );

                  if (!confirmed) return;

                  await deleteWorkExperience(work.id);

                  if (editingWorkId === work.id) {
                    setEditingWorkId(null);
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

export default WorkContentSection;