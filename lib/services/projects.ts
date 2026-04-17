import { Project } from "@/types/projects";
import { createClient } from "../supabase/server";

export const getProjects = async (): Promise<Project[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("end_date", { ascending: false, nullsFirst: true });

  if (error) throw error;
  return data;
};