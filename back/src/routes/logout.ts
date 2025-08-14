import { logoutService } from "../services/logout"

export async function logoutRoute(req, res) {
  try {
    await logoutService()
    return res.status(204).json()
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
}
