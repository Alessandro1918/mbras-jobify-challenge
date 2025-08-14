import { supabase } from "../utils/supabase/client"
import jwt from "jsonwebtoken"

export async function logoutService(token: string) {

  //const { error } = await supabase.auth.signOut()

  const payload = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
  const userId = payload.sub
  await supabase.auth.admin.signOut(userId)

  return
}
