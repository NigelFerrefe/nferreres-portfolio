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