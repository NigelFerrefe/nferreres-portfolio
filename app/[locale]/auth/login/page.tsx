import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { createClient } from "@/lib/supabase/server";
import { Locale } from "@/types/localeProps";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

interface PageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

async function LoginContent({ locale }: { locale: Locale }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect(`/${locale}/admin`);
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  return (
    <Suspense fallback={null}>
      <LoginContent locale={locale} />
    </Suspense>
  );
}