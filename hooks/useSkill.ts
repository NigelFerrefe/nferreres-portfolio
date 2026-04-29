"use client";

import { useEffect, useState } from "react";
import { CreateSkillInput, SkillWithCategory, UpdateSkillInput } from "@/types/cv";

export function useSkills() {
  const [skills, setSkill] = useState<SkillWithCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadSkill = async () => {
    try {
      setIsLoading(true);

      const res = await fetch("/api/admin/skill");

      if (!res.ok) {
        throw new Error("Error loading work experience");
      }

      const data: SkillWithCategory[] = await res.json();
      setSkill(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createSkill = async (payload: CreateSkillInput) => {
    const res = await fetch("/api/admin/skill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Error creating work experience");
    }

    const created: SkillWithCategory = await res.json();

    setSkill((prev) => [created, ...prev]);

    return created;
  };

  const updateSkill = async (payload: UpdateSkillInput) => {
    const res = await fetch("/api/admin/skill", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Error updating work experience");
    }

    const updated: SkillWithCategory = await res.json();

    setSkill((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item)),
    );

    return updated;
  };

  const deleteSkill = async (id: string) => {
    const res = await fetch("/api/admin/skill", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      throw new Error("Error deleting work experience");
    }

    setSkill((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    loadSkill();
  }, []);

  return {
    skills,
    isLoading,
    loadSkill,
    createSkill,
    updateSkill,
    deleteSkill,
  };
}
