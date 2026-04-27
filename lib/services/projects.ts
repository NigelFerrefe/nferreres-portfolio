import "server-only";

import { cacheLife } from "next/cache";
import { Project } from "@/types/projects";
import { createPublicClient } from "../supabase/public-server";

export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("days");

  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("end_date", { ascending: false, nullsFirst: true });

  if (error) throw error;
  return data;
}


export async function getProjectBySlug(
  slug: string
): Promise<Project | null> {
  "use cache";
  cacheLife("days");

  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // not found
    throw error;
  }

  return data;
}