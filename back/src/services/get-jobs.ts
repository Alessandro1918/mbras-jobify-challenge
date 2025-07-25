export async function getJobsService(page: number) {
  const limit = 5
  const offset = limit * (page - 1)

  const response = await fetch(`https://remotive.com/api/remote-jobs?limit=${limit}&offset=${offset}`)
  const result = await response.json()

  return result
}
