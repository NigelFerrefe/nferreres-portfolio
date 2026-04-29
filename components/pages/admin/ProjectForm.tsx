"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  CreateProjectFormValues,
  createProjectSchema,
} from "@/lib/schemas/admin";

const EMPTY_VALUES: CreateProjectFormValues = {
  title: "",
  slug: "",
  short_description_es: "",
  short_description_en: "",
  full_description_es: "",
  full_description_en: "",
  bullet_points_es: [""],
  bullet_points_en: [""],
  main_technologies: [""],
  libraries: [""],
  github_url: null,
  githubback_url: null,
  deploy_url: null,
  cover_image_url: "",
  end_date: null,
  published: false,
};

interface Props {
  defaultValues?: CreateProjectFormValues;
  submitLabel?: string;
  onSubmit: (values: CreateProjectFormValues) => Promise<void>;
  isSubmitting?: boolean;
}

export function ProjectForm({
  defaultValues,
  submitLabel = "Guardar proyecto",
  onSubmit,
  isSubmitting,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateProjectFormValues>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: defaultValues ?? EMPTY_VALUES,
  });

  const bulletPointsEs = watch("bullet_points_es");
  const bulletPointsEn = watch("bullet_points_en");
  const mainTechnologies = watch("main_technologies");
  const libraries = watch("libraries");

  const addItem = (field: keyof Pick<CreateProjectFormValues, "bullet_points_es" | "bullet_points_en" | "main_technologies" | "libraries">) => {
    setValue(field, [...watch(field), ""]);
  };

  const removeItem = (
    field: keyof Pick<CreateProjectFormValues, "bullet_points_es" | "bullet_points_en" | "main_technologies" | "libraries">,
    index: number,
  ) => {
    setValue(
      field,
      watch(field).filter((_, i) => i !== index),
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Título" error={errors.title?.message}>
          <input {...register("title")} className="input" />
        </Field>

        <Field label="Slug" error={errors.slug?.message}>
          <input {...register("slug")} className="input" />
        </Field>

        <Field label="URL GitHub Frontend" error={errors.github_url?.message}>
          <input
            {...register("github_url", {
              setValueAs: (value) => (value === "" ? null : value),
            })}
            className="input"
          />
        </Field>

        <Field label="URL GitHub Backend" error={errors.githubback_url?.message}>
          <input
            {...register("githubback_url", {
              setValueAs: (value) => (value === "" ? null : value),
            })}
            className="input"
          />
        </Field>

        <Field label="URL Deploy" error={errors.deploy_url?.message}>
          <input
            {...register("deploy_url", {
              setValueAs: (value) => (value === "" ? null : value),
            })}
            className="input"
          />
        </Field>

        <Field label="Imagen portada" error={errors.cover_image_url?.message}>
          <input {...register("cover_image_url")} className="input" />
        </Field>

        <Field label="Fecha fin" error={errors.end_date?.message}>
          <input
            type="date"
            {...register("end_date", {
              setValueAs: (value) => (value === "" ? null : value),
            })}
            className="input"
          />
        </Field>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("published")} />
          Publicado
        </label>
      </div>

      <Field label="Descripción corta ES" error={errors.short_description_es?.message}>
        <textarea {...register("short_description_es")} className="input min-h-20" />
      </Field>

      <Field label="Descripción corta EN" error={errors.short_description_en?.message}>
        <textarea {...register("short_description_en")} className="input min-h-20" />
      </Field>

      <Field label="Descripción completa ES" error={errors.full_description_es?.message}>
        <textarea {...register("full_description_es")} className="input min-h-32" />
      </Field>

      <Field label="Descripción completa EN" error={errors.full_description_en?.message}>
        <textarea {...register("full_description_en")} className="input min-h-32" />
      </Field>

      <ArrayList
        title="Bullet points ES"
        values={bulletPointsEs}
        fieldName="bullet_points_es"
        register={register}
        onAdd={() => addItem("bullet_points_es")}
        onRemove={(index) => removeItem("bullet_points_es", index)}
        error={errors.bullet_points_es ? "Revisa los puntos en español" : undefined}
      />

      <ArrayList
        title="Bullet points EN"
        values={bulletPointsEn}
        fieldName="bullet_points_en"
        register={register}
        onAdd={() => addItem("bullet_points_en")}
        onRemove={(index) => removeItem("bullet_points_en", index)}
        error={errors.bullet_points_en ? "Revisa los puntos en inglés" : undefined}
      />

      <ArrayList
        title="Tecnologías principales"
        values={mainTechnologies}
        fieldName="main_technologies"
        register={register}
        onAdd={() => addItem("main_technologies")}
        onRemove={(index) => removeItem("main_technologies", index)}
        error={errors.main_technologies ? "Debe haber al menos una tecnología" : undefined}
      />

      <ArrayList
        title="Librerías"
        values={libraries}
        fieldName="libraries"
        register={register}
        onAdd={() => addItem("libraries")}
        onRemove={(index) => removeItem("libraries", index)}
        error={errors.libraries ? "Debe haber al menos una librería" : undefined}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : submitLabel}
      </Button>
    </form>
  );
}

function ArrayList({
  title,
  values,
  fieldName,
  register,
  onAdd,
  onRemove,
  error,
}: {
  title: string;
  values: string[];
  fieldName:
    | "bullet_points_es"
    | "bullet_points_en"
    | "main_technologies"
    | "libraries";
  register: ReturnType<typeof useForm<CreateProjectFormValues>>["register"];
  onAdd: () => void;
  onRemove: (index: number) => void;
  error?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{title}</span>

        <Button type="button" size="sm" variant="outline" onClick={onAdd}>
          Añadir
        </Button>
      </div>

      {values.map((_, index) => (
        <div key={index} className="flex gap-2">
          <textarea
            {...register(`${fieldName}.${index}`)}
            className="input min-h-16 flex-1"
          />

          <Button
            type="button"
            size="sm"
            variant="destructive"
            onClick={() => onRemove(index)}
          >
            Eliminar
          </Button>
        </div>
      ))}

      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium">{label}</span>
      {children}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
  );
}