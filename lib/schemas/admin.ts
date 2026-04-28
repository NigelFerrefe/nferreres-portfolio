import { z } from "zod";

const workExperienceBaseSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  company: z.string().min(1, "La empresa es obligatoria"),
  location: z.string().min(1, "La ubicación es obligatoria"),

  start_date: z.string().min(1, "La fecha de inicio es obligatoria"),
  end_date: z.string().nullable(),

  is_current: z.boolean(),

  description_es: z.string().min(1, "La descripción en español es obligatoria"),
  description_en: z.string().min(1, "La descripción en inglés es obligatoria"),

  bullet_points_es: z.array(z.string().min(1, "El punto no puede estar vacío")),
  bullet_points_en: z.array(z.string().min(1, "El punto no puede estar vacío")),
});

export const createWorkExperienceSchema = workExperienceBaseSchema.refine(
  (data) => data.is_current || Boolean(data.end_date),
  {
    message: "La fecha de fin es obligatoria si no es el trabajo actual",
    path: ["end_date"],
  },
);

export const updateWorkExperienceSchema = workExperienceBaseSchema
  .partial()
  .extend({
    id: z.string().min(1, "El id es obligatorio"),
  });

export type CreateWorkExperienceFormValues = z.infer<
  typeof createWorkExperienceSchema
>;

export type UpdateWorkExperienceFormValues = z.infer<
  typeof updateWorkExperienceSchema
>;