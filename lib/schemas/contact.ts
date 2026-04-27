import { z } from "zod";

export const getContactSchema = (isEs: boolean) =>
  z.object({
    name: z
      .string()
      .min(2, isEs ? "Nombre demasiado corto" : "Name too short"),
    email: z.email(isEs ? "Email inválido" : "Invalid email"),
    message: z
      .string()
      .min(10, isEs ? "Mensaje demasiado corto" : "Message too short")
      .max(2500, isEs ? "Mensaje demasiado largo" : "Message too long"),
  });

export type ContactFormData = z.infer<ReturnType<typeof getContactSchema>>;