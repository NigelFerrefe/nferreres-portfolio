import "server-only";

import { cacheLife } from "next/cache";
import {
  Certification,
  Education,
  SkillWithCategory,
  WorkExperience
} from "@/types/cv";
import { createPublicClient } from "../supabase/public-server";

export async function getWorkExperience(): Promise<WorkExperience[]> {
  "use cache";
  cacheLife("days");

  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("work_experience")
    .select("*")
    .order("is_current", { ascending: false })
    .order("end_date", { ascending: false, nullsFirst: true });

  if (error) throw error;
  return data;
}

export async function getEducation(): Promise<Education[]> {
  "use cache";
  cacheLife("days");

  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("end_date", { ascending: false, nullsFirst: true });

  if (error) throw error;
  return data;
}

export async function getCertification(): Promise<Certification[]> {
  "use cache";
  cacheLife("days");

  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("issue_date", { ascending: false, nullsFirst: true });

  if (error) throw error;
  return data;
}

export async function getSkills(): Promise<SkillWithCategory[]> {
  "use cache";
  cacheLife("days");

  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("skills")
    .select(`
      *,
      skill_categories (*)
    `);

  if (error) throw error;
  return data;
}