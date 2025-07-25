import express from "express"
import cors from "cors"
import { getJobsRoute } from "./routes/get-jobs"

const PORT = Number(process.env.PORT)

//Deploy @ Vercel: export this here, to import inside ”/api”:
export const app = express()

app.use(cors({
  origin: process.env.FRONT_URL,
}))

app.get("/", (req, res) => {res.send("Hello, world!")})
app.get("/api/v1/jobs", getJobsRoute)

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})
