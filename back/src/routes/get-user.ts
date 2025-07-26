import { getUserService } from "../services/get-user"

export async function getUserRoute(req, res) {
  try {
    const user = await getUserService()

    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
}
