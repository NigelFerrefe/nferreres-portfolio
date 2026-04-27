"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      aria-label="Scroll to top"
      className="
        fixed bottom-12 right-6 z-50
        flex h-11 w-11 items-center justify-center
        rounded-full border border-border
        bg-card text-primary shadow-lg
        transition-all duration-200
        active:scale-95
        md:hidden
      "
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}