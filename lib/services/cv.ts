import { createClient } from "../supabase/server";
import { Certification, Education, SkillWithCategory, WorkExperience } from "@/types/cv";

export const getWorkExperience = async (): Promise<WorkExperience[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("work_experience")
    .select("*")
    .order("is_current", { ascending: false })
    .order("end_date", { ascending: false, nullsFirst: true });

  if (error) throw error;
  return data;
};

export const getEducation = async (): Promise<Education[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("end_date", { ascending: false, nullsFirst: true });

  if (error) throw error;
  return data;
};

export const getCertification = async (): Promise<Certification[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("issue_date", { ascending: false, nullsFirst: true });

  if (error) throw error;
  return data;
};

export const getSkills = async (): Promise<SkillWithCategory[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("skills")
    .select(`
      *,
      skill_categories (*)
    `)

  if (error) throw error;
  return data;
};