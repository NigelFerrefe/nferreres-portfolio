import { revalidateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { CreateProjectInput, UpdateProjectInput } from "@/types/projects";

const PROJECTS_TAG = "projects";

export async function createProject(payload: CreateProjectInput) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw error;

  revalidateTag(PROJECTS_TAG, "max");

  return data;
}

export async function updateProject(payload: UpdateProjectInput) {
  const supabase = await createClient();

  const { id, ...values } = payload;

  const { data, error } = await supabase
    .from("projects")
    .update(values)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  revalidateTag(PROJECTS_TAG, "max");

  return data;
}

export async function deleteProject(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) throw error;

  revalidateTag(PROJECTS_TAG, "max");

  return true;
}
