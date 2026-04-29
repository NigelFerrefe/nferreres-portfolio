"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/useProjects";
import { ProjectForm } from "./ProjectForm";

const ProjectContentSection = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  const {
    projects,
    isLoading,
    createProjects,
    updateProjects,
    deleteProjects,
  } = useProjects();
  console.log(projects);

  const editingProject = projects.find(
    (project) => project.id === editingProjectId,
  );

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Cargando...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setEditingProjectId(null);
            setIsCreateOpen(true);
          }}
        >
          Añadir
        </Button>
      </div>

      {isCreateOpen && (
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Nuevo proyecto</h3>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsCreateOpen(false)}
            >
              Cerrar
            </Button>
          </div>

          <ProjectForm
            onSubmit={async (values) => {
              await createProjects(values);
              setIsCreateOpen(false);
            }}
          />
        </div>
      )}

      {editingProject && (
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Editar proyecto</h3>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setEditingProjectId(null)}
            >
              Cerrar
            </Button>
          </div>

          <ProjectForm
            submitLabel="Actualizar proyecto"
            defaultValues={{
              title: editingProject.title,
              slug: editingProject.slug,
              short_description_es: editingProject.short_description_es,
              short_description_en: editingProject.short_description_en,
              full_description_es: editingProject.full_description_es,
              full_description_en: editingProject.full_description_en,
              bullet_points_es: editingProject.bullet_points_es.length
                ? editingProject.bullet_points_es
                : [""],
              bullet_points_en: editingProject.bullet_points_en.length
                ? editingProject.bullet_points_en
                : [""],
              main_technologies: editingProject.main_technologies.length
                ? editingProject.main_technologies
                : [""],
              libraries: editingProject.libraries.length
                ? editingProject.libraries
                : [""],
              github_url: editingProject.github_url,
              githubback_url: editingProject.githubback_url,
              deploy_url: editingProject.deploy_url,
              cover_image_url: editingProject.cover_image_url,
              end_date: editingProject.end_date,
              published: editingProject.published,
            }}
            onSubmit={async (values) => {
              await updateProjects({
                id: editingProject.id,
                ...values,
              });

              setEditingProjectId(null);
            }}
          />
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border">
        <div className="grid grid-cols-4 bg-muted px-4 py-3 text-sm font-medium">
          <span>Proyecto</span>
          <span>Slug</span>
          <span className="text-center">Editar</span>
          <span className="text-center">Eliminar</span>
        </div>

        {projects.map((project) => (
          <div
            key={project.id}
            className="grid grid-cols-4 items-center border-t border-border px-4 py-3 text-sm"
          >
            <span className="font-medium">{project.title}</span>
            <span className="text-muted-foreground">{project.slug}</span>

            <div className="flex justify-center">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsCreateOpen(false);
                  setEditingProjectId(project.id);
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
                    `¿Eliminar "${project.title}"? Esta acción no se puede deshacer.`,
                  );

                  if (!confirmed) return;

                  await deleteProjects(project.id);

                  if (editingProjectId === project.id) {
                    setEditingProjectId(null);
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

export default ProjectContentSection;
