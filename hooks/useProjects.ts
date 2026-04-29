"use client";

import { useEffect, useState } from "react";
import { CreateProjectInput, Project, UpdateProjectInput } from "@/types/projects";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProjects = async () => {
    try {
      setIsLoading(true);

      const res = await fetch("/api/admin/projects");

      if (!res.ok) {
        throw new Error("Error loading work experience");
      }

      const data: Project[] = await res.json();
      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createProjects = async (payload: CreateProjectInput) => {
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Error creating work experience");
    }

    const created: Project = await res.json();

    setProjects((prev) => [created, ...prev]);

    return created;
  };

  const updateProjects = async (payload: UpdateProjectInput) => {
    const res = await fetch("/api/admin/projects", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Error updating work experience");
    }

    const updated: Project = await res.json();

    setProjects((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item)),
    );

    return updated;
  };

  const deleteProjects = async (id: string) => {
    const res = await fetch("/api/admin/projects", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      throw new Error("Error deleting work experience");
    }

    setProjects((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return {
    projects,
    isLoading,
    loadProjects,
    createProjects,
    updateProjects,
    deleteProjects,
  };
}