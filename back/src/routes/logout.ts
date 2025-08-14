import { logoutService } from "../services/logout"

export async function logoutRoute(req, res) {
  try {
    const { authorization } = req.headers
    const access_token = String(authorization).split("Bearer ")[1]
    await logoutService(access_token)
    return res.status(204).json()
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
}
