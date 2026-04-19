import "server-only";

import { cacheLife } from "next/cache";
import { Profile } from "@/types/profile";
import { createPublicClient } from "../supabase/public-server";

export async function getProfile(): Promise<Profile> {
  "use cache";
  cacheLife("days");

  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .single();

  if (error) throw error;
  return data;
}