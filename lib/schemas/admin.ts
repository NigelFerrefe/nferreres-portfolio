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

export const createCertificactionSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  issuer: z.string().min(1, "La empresa expeditora es obligatoria"),
  issue_date: z.string().nullable(),
  description_es: z.string().min(1, "La descripción en español es obligatoria"),
  description_en: z.string().min(1, "La descripción en inglés es obligatoria"),
});

export const updateCertificationSchema = createCertificactionSchema
  .partial()
  .extend({ id: z.string().min(1, "El id es obligatorio") });

export type CreateCertificationFormValues = z.infer<
  typeof createCertificactionSchema
>;
export type UpdateCertificationFormValues = z.infer<
  typeof updateCertificationSchema
>;

const skillCategoryBaseSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  slug: z.string().min(1, "El slug es obligatorio"),
});

export const createSkillCategorySchema = skillCategoryBaseSchema;

export const updateSkillCategorySchema = skillCategoryBaseSchema
  .partial()
  .extend({ id: z.string().min(1, "El id es obligatorio") });

export type CreateSkillCategoryFormValues = z.infer<
  typeof createSkillCategorySchema
>;
export type UpdateSkillCategoryFormValues = z.infer<
  typeof updateSkillCategorySchema
>;

const skillBaseSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  category_id: z.string().min(1, "La categoría es obligatoria"),
  icon_slug: z.string().min(1, "El icono es obligatorio"),
});

export const createSkillSchema = skillBaseSchema;

export const updateSkillSchema = skillBaseSchema
  .partial()
  .extend({ id: z.string().min(1, "El id es obligatorio") });

export type CreateSkillFormValues = z.infer<typeof createSkillSchema>;
export type UpdateSkillFormValues = z.infer<typeof updateSkillSchema>;

const projectBaseSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  slug: z.string().min(1, "El slug es obligatorio"),

  short_description_es: z
    .string()
    .min(1, "La descripción corta en español es obligatoria"),
  short_description_en: z
    .string()
    .min(1, "La descripción corta en inglés es obligatoria"),

  full_description_es: z
    .string()
    .min(1, "La descripción completa en español es obligatoria"),
  full_description_en: z
    .string()
    .min(1, "La descripción completa en inglés es obligatoria"),

  bullet_points_es: z.array(z.string().min(1, "El punto no puede estar vacío")),
  bullet_points_en: z.array(z.string().min(1, "El punto no puede estar vacío")),

  main_technologies: z
    .array(z.string().min(1, "La tecnología no puede estar vacía"))
    .min(1, "Debe haber al menos una tecnología"),

  libraries: z
    .array(z.string().min(1, "La librería no puede estar vacía"))
    .min(1, "Debe haber al menos una librería"),

  github_url: z.url("La URL de GitHub no es válida").nullable(),
  githubback_url: z.url("La URL de GitHub backend no es válida").nullable(),
  deploy_url: z.url("La URL del deploy no es válida").nullable(),

  cover_image_url: z.string().min(1, "La imagen de portada es obligatoria"),

  end_date: z.string().nullable(),

  published: z.boolean(),
});

export const createProjectSchema = projectBaseSchema;

export const updateProjectSchema = projectBaseSchema.partial().extend({
  id: z.string().min(1, "El id es obligatorio"),
});

export type CreateProjectFormValues = z.infer<typeof createProjectSchema>;
export type UpdateProjectFormValues = z.infer<typeof updateProjectSchema>;
