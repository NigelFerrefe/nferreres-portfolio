"use client";

import { useMemo, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ContactFormData, getContactSchema } from "@/lib/schemas/contact";
import { sendContactEmail } from "@/lib/actions/contact";
import { Mail, Phone } from "lucide-react";

const MAX_MESSAGE = 2500;

const ContactForm = ({ isEs }: { isEs: boolean }) => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const id = useId();

  const schema = useMemo(() => getContactSchema(isEs), [isEs]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const t = {
    name: isEs ? "Nombre completo" : "Full name",
    email: "Email",
    message: isEs ? "Mensaje" : "Message",
    send: isEs ? "Enviar mensaje" : "Send message",
    sending: isEs ? "Enviando..." : "Sending...",
    success: isEs
      ? "Mensaje enviado correctamente."
      : "Message sent successfully.",
    error: isEs
      ? "Algo ha fallado. Inténtalo de nuevo."
      : "Something went wrong. Try again.",
    charsRemaining: isEs ? "caracteres restantes" : "characters remaining",
  };

  const messageLength = watch("message")?.length ?? 0;
  const charsRemaining = MAX_MESSAGE - messageLength;

  const nameId = `${id}-name`;
  const emailId = `${id}-email`;
  const messageId = `${id}-message`;
  const nameErrorId = `${id}-name-error`;
  const emailErrorId = `${id}-email-error`;
  const messageErrorId = `${id}-message-error`;
  const statusId = `${id}-status`;
  const charsId = `${id}-chars`;

  const onSubmit = async (data: ContactFormData) => {
    setStatus("idle");
    const result = await sendContactEmail(data);
    if (result.success) {
      setStatus("success");
      reset();
      return;
    }
    setStatus("error");
  };

  return (
    <section className="w-full py-10 md:w-3/4 lg:max-w-5xl">
      <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">

        {/* Info de contacto */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {isEs
                ? "¿Tienes un proyecto en mente?"
                : "Have a project in mind?"}
            </h2>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              {isEs
                ? "Estoy abierto a nuevas oportunidades y colaboraciones. Si quieres trabajar conmigo, no dudes en escribirme."
                : "I'm open to new opportunities and collaborations. Feel free to reach out if you'd like to work together."}
            </p>
            <p className="text-xs text-muted-foreground/80">
              {isEs
                ? "Te responderé lo antes posible."
                : "I'll get back to you as soon as possible."}
            </p>
          </div>

          <address className="not-italic space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10"
              >
                <Mail className="h-4 w-4" />
              </span>
              <a
                href="mailto:nferrefe@gmail.com"
                className="hover:text-foreground transition-colors"
              >
                nferrefe@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10"
              >
                <Phone className="h-4 w-4" />
              </span>
              <a
                href="tel:+34649222511"
                className="hover:text-foreground transition-colors"
              >
                (+34) 649 222 511
              </a>
            </div>
          </address>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          aria-label={isEs ? "Formulario de contacto" : "Contact form"}
          noValidate
        >
          {/* Nombre */}
          <div className="flex flex-col gap-1">
            <label htmlFor={nameId} className="text-sm font-medium text-foreground">
              {t.name}
            </label>
            <input
              {...register("name")}
              id={nameId}
              type="text"
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? nameErrorId : undefined}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary aria-[invalid=true]:border-destructive"
            />
            {isSubmitted && errors.name && (
              <p id={nameErrorId} role="alert" className="text-xs text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor={emailId} className="text-sm font-medium text-foreground">
              {t.email}
            </label>
            <input
              {...register("email")}
              id={emailId}
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? emailErrorId : undefined}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary aria-[invalid=true]:border-destructive"
            />
            {isSubmitted && errors.email && (
              <p id={emailErrorId} role="alert" className="text-xs text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Mensaje */}
          <div className="flex flex-col gap-1">
            <label htmlFor={messageId} className="text-sm font-medium text-foreground">
              {t.message}
            </label>
            <div className="relative">
              <textarea
                {...register("message")}
                id={messageId}
                rows={6}
                maxLength={MAX_MESSAGE}
                aria-invalid={!!errors.message}
                aria-describedby={[
                  errors.message ? messageErrorId : null,
                  charsId,
                ]
                  .filter(Boolean)
                  .join(" ")}
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 pr-16 text-sm outline-none focus:border-primary aria-[invalid=true]:border-destructive"
              />

              <span className="pointer-events-none absolute bottom-2 right-3 text-xs text-muted-foreground">
                {messageLength}/{MAX_MESSAGE}
              </span>

              <span
                id={charsId}
                className="sr-only"
                aria-live="polite"
                aria-atomic="true"
              >
                {charsRemaining % 100 === 0 || charsRemaining <= 50
                  ? `${charsRemaining} ${t.charsRemaining}`
                  : ""}
              </span>
            </div>

            {isSubmitted && errors.message && (
              <p id={messageErrorId} role="alert" className="text-xs text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? t.sending : t.send}
          </button>

          {/* Estado */}
          <div id={statusId} role="status" aria-live="polite" aria-atomic="true">
            {status === "success" && (
              <p className="text-sm text-primary">{t.success}</p>
            )}
            {status === "error" && (
              <p className="text-sm text-destructive">{t.error}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;