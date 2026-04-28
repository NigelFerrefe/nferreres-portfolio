"use client";

import { useEffect, useState } from "react";
import {
  CreateWorkExperienceInput,
  UpdateWorkExperienceInput,
  WorkExperience,
} from "@/types/cv";

export function useWorkExperience() {
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadWorkExperience = async () => {
    try {
      setIsLoading(true);

      const res = await fetch("/api/admin/work-experience");

      if (!res.ok) {
        throw new Error("Error loading work experience");
      }

      const data: WorkExperience[] = await res.json();
      setWorkExperience(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createWorkExperience = async (payload: CreateWorkExperienceInput) => {
    const res = await fetch("/api/admin/work-experience", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Error creating work experience");
    }

    const created: WorkExperience = await res.json();

    setWorkExperience((prev) => [created, ...prev]);

    return created;
  };

  const updateWorkExperience = async (payload: UpdateWorkExperienceInput) => {
    const res = await fetch("/api/admin/work-experience", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Error updating work experience");
    }

    const updated: WorkExperience = await res.json();

    setWorkExperience((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item)),
    );

    return updated;
  };

  const deleteWorkExperience = async (id: string) => {
    const res = await fetch("/api/admin/work-experience", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      throw new Error("Error deleting work experience");
    }

    setWorkExperience((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    loadWorkExperience();
  }, []);

  return {
    workExperience,
    isLoading,
    loadWorkExperience,
    createWorkExperience,
    updateWorkExperience,
    deleteWorkExperience,
  };
}