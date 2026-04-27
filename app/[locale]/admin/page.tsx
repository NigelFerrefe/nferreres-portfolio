import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminDashboard from "@/components/pages/admin/AdminDhasboard";
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

async function AdminContent({ locale }: { locale: Locale }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect(`/${locale}/auth/login`);
  }

  return <AdminDashboard />;
}

export default async function AdminPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <Suspense fallback={null}>
      <AdminContent locale={locale} />
    </Suspense>
  );
}