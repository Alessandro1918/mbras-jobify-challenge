import express from "express"
import cors from "cors"
import { getJobsRoute } from "./routes/get-jobs"
import { signUpRoute } from "./routes/sign-up"
import { loginRoute } from "./routes/login"
import { getUserRoute } from "./routes/get-user"
import { auth } from "./middlewares/auth"

const PORT = Number(process.env.PORT)

//Deploy @ Vercel: export this here, to import inside ”/api”:
export const app = express()

app.use(express.json())
app.use(cors({
  origin: process.env.FRONT_URL,
}))

app.get("/", (req, res) => {res.send("Hello, world!")})
app.get("/api/v1/jobs", getJobsRoute)
app.post("/api/v1/sign-up", signUpRoute)
app.post("/api/v1/login", loginRoute)
app.get("/api/v1/me", auth, getUserRoute)

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})
