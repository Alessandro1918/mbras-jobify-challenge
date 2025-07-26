import { signUpService } from "../services/sign-up"

export async function signUpRoute(req, res) {
  try {
    const { email, password, username } = req.body

    const data = await signUpService(email, password, username)
  
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
}
