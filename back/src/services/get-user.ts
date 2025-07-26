import { supabase } from "../utils/supabase/client"

export async function getUserService() {

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error("Error while getting user:", error.message)
    throw new Error(error.message)
  }
  if (!data?.user) {
    console.error("Error: User not found")
    throw new Error("Error: User not found")
  }

  return data.user
}
