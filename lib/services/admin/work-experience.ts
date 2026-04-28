import { revalidateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  CreateWorkExperienceInput,
  UpdateWorkExperienceInput,
} from "@/types/cv";

const WORK_EXPERIENCE_TAG = "work-experience";

export async function createWorkExperience(
  payload: CreateWorkExperienceInput
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("work_experience")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw error;

  revalidateTag(WORK_EXPERIENCE_TAG, "max");

  return data;
}

export async function updateWorkExperience(
  payload: UpdateWorkExperienceInput
) {
  const supabase = await createClient();

  const { id, ...values } = payload;

  const { data, error } = await supabase
    .from("work_experience")
    .update(values)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  revalidateTag(WORK_EXPERIENCE_TAG, "max");

  return data;
}

export async function deleteWorkExperience(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("work_experience")
    .delete()
    .eq("id", id);

  if (error) throw error;

  revalidateTag(WORK_EXPERIENCE_TAG, "max");

  return true;
}