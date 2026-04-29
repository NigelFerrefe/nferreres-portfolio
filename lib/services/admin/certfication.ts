import { revalidateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
    CreateCertificationInput,
    UpdateCertificationInput
} from "@/types/cv";


const CERTIFICATION_TAG = "certifications";


export async function createCertification(payload: CreateCertificationInput) {
    const supabase = await createClient()

    const {data, error } = await supabase
        .from("certifications")
        .insert(payload)
        .select("*")
        .single();

    if (error) throw error;

    revalidateTag(CERTIFICATION_TAG, "max")

    return data
}

export async function updateCertification(
  payload: UpdateCertificationInput
) {
  const supabase = await createClient();

  const { id, ...values } = payload;

  const { data, error } = await supabase
    .from("certifications")
    .update(values)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  revalidateTag(CERTIFICATION_TAG, "max");

  return data;
}

export async function deleteCertification(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("certifications")
    .delete()
    .eq("id", id);

  if (error) throw error;

  revalidateTag(CERTIFICATION_TAG, "max");

  return true;
}

