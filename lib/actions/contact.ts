"use server";

import { Resend } from "resend";
import { getContactSchema } from "@/lib/schemas/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: unknown) {
  const parsed = getContactSchema(false).safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Invalid data" };
  }

  const { name, email, message } = parsed.data;

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "nferrefe@gmail.com",
      subject: `Nuevo mensaje de ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    return { success: true };
  } catch {
    return { success: false, error: "Error sending email" };
  }
}