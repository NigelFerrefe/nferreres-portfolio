import { Profile } from "@/types/profle"
import { createClient } from "../supabase/server"

export const getProfile = async ():Promise<Profile> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .single()

  if (error) throw error
  return data
}