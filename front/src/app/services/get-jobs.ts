export type JobProps = {
  id: number                            // 123
  url: string,                          // "https://remotive.com/remote-jobs/product/lead-developer-123"
  title: string,                        // "Lead Developer"
  company_name: string,                 // "Remotive"
  company_logo: string,                 // "https://remotive.com/job/123/logo"
  category: string,                     // "Software Development"
  tags: String[],                       // ["android", "apple"]
  job_type: string,                     // "full_time"
  publication_date:  string,            // "2020-02-15T10:23:26",
  candidate_required_location: string,  // "Worldwide", 
  salary: string,                       // "$40,000 - $50,000", 
  description: string                   // "The full HTML job description here", 
}

export async function getJobs(page: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/jobs?page=${page}`,
    {
      next: {
        revalidate: 60 * 60 // sec * 60s/min = 1h. Obs: cache will not work on dev mode. Run with "npm run build && npm run start" 
      },
    }
  )
  const data = await response.json()
  const jobs: JobProps[] = data.jobs
  return jobs
}
