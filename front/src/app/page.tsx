import { PageControls } from "./components/page-controls"
import { UserAreaButton } from "./components/user-area-button"
import { JobCard } from "./components/job-card"
import { getJobs } from "./services/get-jobs"
import { getUser } from "./services/get-user"

type Props = {
  searchParams?: Promise<{
    page?: string
  }>
}

export default async function Home(props: Props) {

  const searchParams  = await props.searchParams
  const currentPage = Number(searchParams?.page) || 1

  const jobs = await getJobs(currentPage)

  const user = await getUser()
  const favorites = user.favorite_jobs || []

  return (
    <div className="font-sans flex flex-col gap-4 p-4 items-center justify-center">      
      <div className="flex flex-row w-full items-center justify-between">
        <h1 className="text-6xl">Jobify</h1>
        <UserAreaButton />
      </div>      

      <div className="flex flex-col w-full h-full p-4 gap-4 border-2 border-zinc-300 rounded-xl">
        {
          jobs.map(job => {
            return (
              <JobCard
                key={job.id}
                id={job.id}
                url={job.url}
                title={job.title}
                company_name={job.company_name}
                company_logo={job.company_logo}
                category={job.category}
                tags={job.tags}
                job_type={job.job_type}
                publication_date={job.publication_date}
                candidate_required_location={job.candidate_required_location}
                salary={job.salary}
                description={job.description}
                favorites={favorites}
              />
            )
          })
        }
      </div>

      <PageControls />
    </div>
  )
}
