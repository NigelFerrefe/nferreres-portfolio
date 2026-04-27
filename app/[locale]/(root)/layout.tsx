import Footer from "@/components/pages/layout/Footer";
import Navbar from "@/components/pages/layout/Navbar";
import { Suspense } from "react";

export default function RootSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <main className="flex-1">{children}</main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
