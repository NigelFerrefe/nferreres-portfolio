import { revalidateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
CreateSkillInput,
UpdateSkillInput,
} from "@/types/cv";

const SKILLS_TAG = "skills";

export async function createSkill(
  payload: CreateSkillInput
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("skills")
    .insert(payload)
    .select("*, skill_categories(*)")
    .single();

  if (error) throw error;

  revalidateTag(SKILLS_TAG, "max");

  return data;
}

export async function updateSkill(
  payload: UpdateSkillInput
) {
  const supabase = await createClient();

  const { id, ...values } = payload;

  const { data, error } = await supabase
    .from("skills")
    .update(values)
    .eq("id", id)
    .select("*, skill_categories(*)")
    .single();

  if (error) throw error;

  revalidateTag(SKILLS_TAG, "max");

  return data;
}

export async function deleteSkill(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("skills")
    .delete()
    .eq("id", id);

  if (error) throw error;

  revalidateTag(SKILLS_TAG, "max");

  return true;
}

