"use client"
import { useRouter } from "next/navigation"
import { deleteCookie } from "../services/delete-cookie"

export function LogoutButton() {

  const router = useRouter()

  async function logout() {  
    await deleteCookie("accessToken")
    await deleteCookie("refreshToken")
  
    router.push("/")
  }

  return (
    <button onClick={logout}>Logout</button>
  )
}
