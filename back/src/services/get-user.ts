import { supabase } from "../utils/supabase/client"
import { getFavorites } from "../services/get-favorites"

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

  const userId = data.user.id
  const favorites = await getFavorites(userId)

  return { 
    ...data.user, 
    favorite_jobs: favorites
  }
}
