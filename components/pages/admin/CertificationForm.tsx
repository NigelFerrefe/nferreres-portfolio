"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    createCertificactionSchema,
    CreateCertificationFormValues,
} from "@/lib/schemas/admin";
import { CreateCertificationInput } from "@/types/cv";

const EMPTY_VALUES: CreateCertificationInput = {
  title: "",
  issuer: "",
  issue_date: null,
  description_es: "",
  description_en: "",
};

interface Props {
  defaultValues?: CreateCertificationFormValues;
  submitLabel?: string;
  onSubmit: (values: CreateCertificationFormValues) => Promise<void>;
  isSubmitting?: boolean;
}

export function CertificationForm({
  defaultValues,
  submitLabel = "Guardar certificado",
  onSubmit,
  isSubmitting,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCertificationFormValues>({
    resolver: zodResolver(createCertificactionSchema),
    defaultValues: defaultValues ?? EMPTY_VALUES,
  });



 

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Título" error={errors.title?.message}>
          <input {...register("title")} className="input" />
        </Field>

        <Field label="Centro expeditor" error={errors.issuer?.message}>
          <input {...register("issuer")} className="input" />
        </Field>





        <Field label="Fecha fin" error={errors.issue_date?.message}>
          <input
            type="date"
            {...register("issue_date", {
              setValueAs: (value) => (value === "" ? null : value),
            })}
            
            className="input disabled:opacity-50"
          />
        </Field>


      </div>

      <Field label="Descripción ES" error={errors.description_es?.message}>
        <textarea {...register("description_es")} className="input min-h-24" />
      </Field>

      <Field label="Descripción EN" error={errors.description_en?.message}>
        <textarea {...register("description_en")} className="input min-h-24" />
      </Field>



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