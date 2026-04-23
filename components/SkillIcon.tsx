import { skillIconMap } from "@/lib/icons/skill-icon";
import { Code2 } from "lucide-react";

interface SkillIconProps {
  slug?: string | null;
  size?: number; 
}

export function SkillIcon({ slug, size = 4 }: SkillIconProps) {
  const Icon = slug ? skillIconMap[slug as keyof typeof skillIconMap] : null;

  const sizeClass = `h-${size} w-${size}`;

  if (!Icon) {
    return <Code2 className={sizeClass} />;
  }

  return <Icon className={sizeClass} />;
}