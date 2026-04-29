"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { createSkillSchema, CreateSkillFormValues } from "@/lib/schemas/admin";
import { SkillCategory } from "@/types/cv";

const EMPTY_VALUES: CreateSkillFormValues = {
  name: "",
  category_id: "",
  icon_slug: "",
};

interface Props {
  categories: SkillCategory[];
  defaultValues?: CreateSkillFormValues;
  submitLabel?: string;
  onSubmit: (values: CreateSkillFormValues) => Promise<void>;
}

export function SkillForm({
  categories,
  defaultValues,
  submitLabel = "Guardar skill",
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateSkillFormValues>({
    resolver: zodResolver(createSkillSchema),
    defaultValues: defaultValues ?? EMPTY_VALUES,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nombre" error={errors.name?.message}>
          <input {...register("name")} className="input" />
        </Field>

        <Field label="Categoría" error={errors.category_id?.message}>
          <select {...register("category_id")} className="input">
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Icon slug" error={errors.icon_slug?.message}>
          <input {...register("icon_slug")} className="input" />
        </Field>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : submitLabel}
      </Button>
    </form>
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