import { getJobsService } from "../services/get-jobs"

export async function getJobsRoute(req, res) {
  const page = Number(req.query.page) || 1

  const data = await getJobsService(page)

  return res.status(200).json(data)
}
