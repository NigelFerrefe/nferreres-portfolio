import { Suspense } from "react";
import HomePage from "@/components/root/home/HomePage";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <HomePage />
    </Suspense>
  );
}