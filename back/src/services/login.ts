import { supabase } from "../utils/supabase/client"

export async function loginService(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.error("Error logging in:", error.message)
    throw new Error(error.message)
  }

  return data
}