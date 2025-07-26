import { supabase } from "../utils/supabase/client"

export async function signUpService(email: string, password: string, username: string) {

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        user_name: username,
      },
    },
  })

  if (error) {
    console.error("Error signing up:", error.message)
    throw new Error(error.message)
  }

  return data
}
