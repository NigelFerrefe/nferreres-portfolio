"use client";

import { useEffect, useState } from "react";
import {
  Certification,
  CreateCertificationInput,
  UpdateCertificationInput,
} from "@/types/cv";

export function useCertification() {
  const [certification, setCertification] = useState<Certification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCertification = async () => {
    try {
      setIsLoading(true);

      const res = await fetch("/api/admin/certification");

      if (!res.ok) {
        throw new Error("Error loading work experience");
      }

      const data: Certification[] = await res.json();
      setCertification(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createCertification = async (payload: CreateCertificationInput) => {
    const res = await fetch("/api/admin/certification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Error creating work experience");
    }

    const created: Certification = await res.json();

    setCertification((prev) => [created, ...prev]);

    return created;
  };

  const updateCertification = async (payload: UpdateCertificationInput) => {
    const res = await fetch("/api/admin/certification", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Error updating work experience");
    }

    const updated: Certification = await res.json();

    setCertification((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item)),
    );

    return updated;
  };

  const deleteCertification = async (id: string) => {
    const res = await fetch("/api/admin/certification", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      throw new Error("Error deleting work experience");
    }

    setCertification((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    loadCertification();
  }, []);

  return {
    certification,
    isLoading,
    loadCertification,
    createCertification,
    updateCertification,
    deleteCertification,
  };
}
