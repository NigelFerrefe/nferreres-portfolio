"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ContactFormData, getContactSchema } from "@/lib/schemas/contact";
import { sendContactEmail } from "@/lib/actions/contact";
import { Mail, Phone } from "lucide-react";

const MAX_MESSAGE = 2500;

const ContactForm = ({ isEs }: { isEs: boolean }) => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

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
  };

  const messageLength = watch("message")?.length ?? 0;

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

  const formError =
    errors.name?.message || errors.email?.message || errors.message?.message;

  return (
    <section className="w-full py-10 md:w-3/4 lg:max-w-5xl">
      <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
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
                : "I’m open to new opportunities and collaborations. Feel free to reach out if you’d like to work together."}
            </p>
            <p className="text-xs text-muted-foreground/80">
              {isEs
                ? "Te responderé lo antes posible."
                : "I’ll get back to you as soon as possible."}
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10">
                <Mail className="h-4 w-4" />
              </span>
              <p>nferrefe@gmail.com</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10">
                <Phone className="h-4 w-4" />
              </span>
              <p>(+34) 649 222 511</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              {...register("name")}
              placeholder={t.name}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <input
              {...register("email")}
              placeholder={t.email}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="relative">
            <textarea
              {...register("message")}
              placeholder={t.message}
              rows={6}
              maxLength={MAX_MESSAGE}
              className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 pr-16 text-sm outline-none focus:border-primary"
            />
            <span className="pointer-events-none absolute bottom-2 right-3 text-xs text-muted-foreground">
              {messageLength}/{MAX_MESSAGE}
            </span>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? t.sending : t.send}
          </button>
          {isSubmitted && formError && (
            <p className="text-sm text-destructive">{formError}</p>
          )}
          {status === "success" && (
            <p className="text-sm text-primary">{t.success}</p>
          )}
          {status === "error" && (
            <p className="text-sm text-destructive">{t.error}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
