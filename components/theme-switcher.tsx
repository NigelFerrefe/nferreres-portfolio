"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const handleThemeChange = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    document.cookie = `theme=${newTheme};path=/;max-age=31536000`;
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleThemeChange}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-pressed={isDark}
    >
      {isDark ? (
        <Sun size={16} className="text-ring" aria-hidden="true" />
      ) : (
        <Moon size={16} className="text-ring" aria-hidden="true" />
      )}
    </Button>
  );
};

export { ThemeSwitcher };