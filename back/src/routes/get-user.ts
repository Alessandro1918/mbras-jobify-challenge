import { getFavorites } from "../services/get-favorites"

export async function getUserRoute(req, res) {
  try {
    const userId = req.user.sub
    const favorites = await getFavorites(userId)

    return res.status(200).json({
      id: userId,
      email: req.user.user_metadata.email,
      user_name: req.user.user_metadata.user_name,
      favorite_jobs: favorites
    })
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
}
