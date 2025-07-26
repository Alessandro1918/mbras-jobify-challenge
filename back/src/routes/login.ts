import { loginService } from "../services/login"

export async function loginRoute(req, res) {
  try {
    const { email, password } = req.body

    const data = await loginService(email, password)
  
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
}
