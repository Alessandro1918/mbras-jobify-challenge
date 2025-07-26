"use server"
import { cookies } from "next/headers"

export async function getUser() {
  try {

    const accessToken = (await cookies()).get("accessToken")?.value
    const refreshToken = (await cookies()).get("refreshToken")?.value

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/me`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
          "X-Refresh-Token": `${refreshToken}`
        }
      }
    )

    const data = await response.json()

    return data
  } catch (err: any) {
    return {}
  }
}
