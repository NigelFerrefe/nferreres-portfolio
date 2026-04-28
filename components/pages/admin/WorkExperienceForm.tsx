"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  CreateWorkExperienceFormValues,
  createWorkExperienceSchema,
} from "@/lib/schemas/admin";

const EMPTY_VALUES: CreateWorkExperienceFormValues = {
  title: "",
  company: "",
  location: "",
  start_date: "",
  end_date: null,
  is_current: false,
  description_es: "",
  description_en: "",
  bullet_points_es: [""],
  bullet_points_en: [""],
};

interface Props {
  defaultValues?: CreateWorkExperienceFormValues;
  submitLabel?: string;
  onSubmit: (values: CreateWorkExperienceFormValues) => Promise<void>;
  isSubmitting?: boolean;
}

export function WorkExperienceForm({
  defaultValues,
  submitLabel = "Guardar experiencia",
  onSubmit,
  isSubmitting,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateWorkExperienceFormValues>({
    resolver: zodResolver(createWorkExperienceSchema),
    defaultValues: defaultValues ?? EMPTY_VALUES,
  });

  const isCurrent = watch("is_current");
  const bulletPointsEs = watch("bullet_points_es");
  const bulletPointsEn = watch("bullet_points_en");

  const addBulletEs = () => {
    setValue("bullet_points_es", [...bulletPointsEs, ""]);
  };

  const removeBulletEs = (index: number) => {
    setValue(
      "bullet_points_es",
      bulletPointsEs.filter((_, i) => i !== index),
    );
  };

  const addBulletEn = () => {
    setValue("bullet_points_en", [...bulletPointsEn, ""]);
  };

  const removeBulletEn = (index: number) => {
    setValue(
      "bullet_points_en",
      bulletPointsEn.filter((_, i) => i !== index),
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Título" error={errors.title?.message}>
          <input {...register("title")} className="input" />
        </Field>

        <Field label="Empresa" error={errors.company?.message}>
          <input {...register("company")} className="input" />
        </Field>

        <Field label="Ubicación" error={errors.location?.message}>
          <input {...register("location")} className="input" />
        </Field>

        <Field label="Fecha inicio" error={errors.start_date?.message}>
          <input type="date" {...register("start_date")} className="input" />
        </Field>

        <Field label="Fecha fin" error={errors.end_date?.message}>
          <input
            type="date"
            {...register("end_date", {
              setValueAs: (value) => (value === "" ? null : value),
            })}
            disabled={isCurrent}
            className="input disabled:opacity-50"
          />
        </Field>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("is_current")} />
          Trabajo actual
        </label>
      </div>

      <Field label="Descripción ES" error={errors.description_es?.message}>
        <textarea {...register("description_es")} className="input min-h-24" />
      </Field>

      <Field label="Descripción EN" error={errors.description_en?.message}>
        <textarea {...register("description_en")} className="input min-h-24" />
      </Field>

      <BulletList
        title="Bullet points ES"
        values={bulletPointsEs}
        fieldName="bullet_points_es"
        register={register}
        onAdd={addBulletEs}
        onRemove={removeBulletEs}
        error={errors.bullet_points_es ? "Revisa los puntos en español" : undefined}
      />

      <BulletList
        title="Bullet points EN"
        values={bulletPointsEn}
        fieldName="bullet_points_en"
        register={register}
        onAdd={addBulletEn}
        onRemove={removeBulletEn}
        error={errors.bullet_points_en ? "Revisa los puntos en inglés" : undefined}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : submitLabel}
      </Button>
    </form>
  );
}

function BulletList({
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
  fieldName: "bullet_points_es" | "bullet_points_en";
  register: ReturnType<typeof useForm<CreateWorkExperienceFormValues>>["register"];
  onAdd: () => void;
  onRemove: (index: number) => void;
  error?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{title}</span>

        <Button type="button" size="sm" variant="outline" onClick={onAdd}>
          Añadir punto
        </Button>
      </div>

      {values.map((_, index) => (
        <div key={index} className="flex gap-2">
          <textarea
            {...register(`${fieldName}.${index}`)}
            className="input min-h-20 flex-1"
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