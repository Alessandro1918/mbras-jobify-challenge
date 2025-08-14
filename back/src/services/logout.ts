import { supabase } from "../utils/supabase/client"

export async function logoutService() {
  /*const { error } = */await supabase.auth.signOut()

  return
}
