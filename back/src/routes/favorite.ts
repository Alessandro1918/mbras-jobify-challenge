import { getFavorites } from "../services/get-favorites"
import { addFavorite } from "../services/add-favorite"
import { removeFavorite } from "../services/remove-favorite"

export async function favoriteRoute(req, res) {
  try {
    const userId = req.user.sub
    const favorites = await getFavorites(userId)

    const { jobId } = req.body

    if (favorites.includes(jobId)) {
      await removeFavorite(userId, jobId)
      return res.status(204).json({})
    } else {
      const data = await addFavorite(userId, jobId)
      return res.status(201).json(data)
    }
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
}
