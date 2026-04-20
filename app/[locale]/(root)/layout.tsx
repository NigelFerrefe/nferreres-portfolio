import Footer from "@/components/pages/layout/Footer";
import Navbar from "@/components/pages/layout/Navbar";

export default function RootSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />
    </>
  );
}