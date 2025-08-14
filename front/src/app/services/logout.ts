"use server"
import { cookies } from "next/headers"

export async function logout() {

  try {

    const accessToken = (await cookies()).get("accessToken")?.value
    const refreshToken = (await cookies()).get("refreshToken")?.value

    await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
          "X-Refresh-Token": `${refreshToken}`
        }
      }
    )

    return
  } catch (err: any) {
    throw new Error(err.message)
  }
}
