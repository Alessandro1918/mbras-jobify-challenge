import Image from "next/image"
import { FaDollarSign, FaRegClock, FaGlobe } from "react-icons/fa"
import { PageControls } from "./components/page-controls"
import { getJobs } from "./service/get-jobs"

type Props = {
  searchParams?: Promise<{
    page?: string
  }>
}

export default async function Home(props: Props) {

  const searchParams  = await props.searchParams
  const currentPage = Number(searchParams?.page) || 1

  const jobs = await getJobs(currentPage)

  return (
    <div className="font-sans flex flex-col gap-4 p-4 items-center justify-center">      
      <div className="flex flex-col w-full h-full p-4 gap-4 border-2 border-zinc-400 rounded-xl">
        {
          jobs.map(job => {
            return (
              <div 
                key={job.id}
                className="flex flex-col w-full p-2 border-2 border-zinc-400 rounded-xl"
              >
                <div className="flex flex-row items-center gap-2">
                  <Image
                    width={48} height={48}
                    src={job.company_logo}
                    alt={`Company logo: ${job.company_name}`}
                    title={`Company logo: ${job.company_name}`}
                  />
                  <h1>{job.company_name}</h1>
                </div>

                <h1 className="capitalize">{job.title}</h1>

                <div className="flex flex-wrap gap-2">
                  {job.tags.map(tag => {
                    return (
                      <h3 key={tag as string} className="text-xs px-[2px] border-2 border-zinc-400 rounded-lg">{tag}</h3>
                    )
                  })}
                </div>

                <div className="flex flex-row items-center gap-1">
                  <FaRegClock />
                  <h2>{job.publication_date}</h2>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <FaDollarSign />
                  <h2>{job.salary}</h2>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <FaGlobe />
                  <h2>{job.candidate_required_location}</h2>
                </div>
              </div>
            )
          })
        }
      </div>

      <PageControls />
    </div>
  )
}
