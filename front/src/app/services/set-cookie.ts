"use server"

import { cookies } from "next/headers"

export async function setCookie(name: string, value: string) {
  (await cookies()).set({
    name,
    value,
    httpOnly: true, // Prevents client-side JavaScript access
    secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
    sameSite: "strict", // Prevents CSRF attacks
    path: "/", // Available across the entire domain
  })
}
