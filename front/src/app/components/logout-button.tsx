"use client"
import { useRouter } from "next/navigation"
import { logout } from "../services/logout"
import { deleteCookie } from "../services/delete-cookie"

export function LogoutButton() {

  const router = useRouter()

  async function handleLogout() {  
    try {

      await logout()

      await deleteCookie("accessToken")
      await deleteCookie("refreshToken")

      router.push("/")
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <button onClick={handleLogout}>Logout</button>
  )
}
