import jwt from "jsonwebtoken"
import { supabase } from "../utils/supabase/client"

export async function auth(req, res, next) {

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    return res.status(401).json({ error: error.message })
  }
  if (!data?.user) {
    return res.status(404).json({ error: "User not found" })
  }

  const authHeader = req.headers["authorization"]
  const refreshToken = req.headers["x-refresh-token"]
  // console.log("authHeader:", authHeader)
  // console.log("refreshToken:", refreshToken)

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No access token provided" })
  }

  const accessToken = authHeader.split(" ")[1]

  try {
    const payload = jwt.verify(accessToken, process.env.SUPABASE_JWT_SECRET)
    req.user = payload
    return next()
  } catch (err) {
    // Check if expired
    if (err.name === "TokenExpiredError" && refreshToken) {
      try {
        // Use Supabase Auth API to refresh the session
        const response = await fetch(
          `${process.env.SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
            method: "POST",
            headers: {
              apikey: process.env.SUPABASE_ANON_KEY!,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              refresh_token: refreshToken 
            })
          }
        )
        const data = await response.json()

        // New access token and refresh token from Supabase
        const newAccessToken = data.access_token
        const newRefreshToken = data.refresh_token

        // Attach user info and new tokens to req
        const newPayload = jwt.verify(newAccessToken, process.env.SUPABASE_JWT_SECRET)
        req.user = newPayload
        req.newAccessToken = newAccessToken
        req.newRefreshToken = newRefreshToken

        console.log("Tokens refreshed!")
        return next()
      } catch (refreshErr) {
        return res.status(403).json({ error: "Refresh failed", details: refreshErr.message })
      }
    }
    return res.status(403).json({ error: "Invalid or expired token", details: err.message })
  }
}
