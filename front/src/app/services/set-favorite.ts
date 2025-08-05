"use server"
import { cookies } from "next/headers"

export async function setFavoriteService(jobId: string) {

  try {

    const accessToken = (await cookies()).get("accessToken")?.value
    const refreshToken = (await cookies()).get("refreshToken")?.value

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
          "X-Refresh-Token": `${refreshToken}`
        },
        body: JSON.stringify({ 
          jobId
        })
      }
    )

    if (response.status == 201) {
      const data = await response.json()
      return data
    }

    if (response.status == 204) {
      return
    }

    if (response.status != 201 && response.status != 204) {
      throw new Error(String(response.status))  // and front component using this service will decide what to do (redirect to "login", probably)
    }

  } catch (err: any) {
    throw new Error(err.message)
  }
}
