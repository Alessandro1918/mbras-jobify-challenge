export async function login(email: string, password: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email, password
        })
      }
    )

    const data = await response.json()

    if (response.status !== 200) {
      throw new Error(data.message)
    }

    return data
  } catch (err: any) {
    throw new Error(err.message)
  }
}
