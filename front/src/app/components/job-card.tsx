"use client"
import { useState } from "react"
import Image from "next/image"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsable"
import { FaDollarSign, FaRegClock, FaGlobe, FaChevronUp, FaChevronDown } from "react-icons/fa"
import { JobProps } from "../services/get-jobs"
import { Star } from "../components/star-button"

type CardProps = JobProps & {
  favorites: string[]
}

export function JobCard({ 
  id, 
  url,
  title,
  company_name,
  company_logo, 
  category,
  tags,
  job_type,
  publication_date,
  candidate_required_location,
  salary,
  description, 
  favorites
}: CardProps) {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col w-full p-3 border-2 border-zinc-200 shadow-lg rounded-xl"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Image
            width={48} height={48}
            src={company_logo}
            alt={`Company logo: ${company_name}`}
            title={`Company logo: ${company_name}`}
          />
          <h1 className="text-xl">{company_name}</h1>
        </div>
        <Star 
          jobId={String(id)} 
          favorites={favorites} 
        />
      </div>

      <h1 className="capitalize text-lg my-2">{title}</h1>

      <div className="mb-2 flex flex-wrap gap-2">
        {tags.map(tag => {
          return (
            <h3 key={tag as string} className="text-xs px-[2px] border-2 border-zinc-300 rounded-lg">{tag}</h3>
          )
        })}
      </div>

      <div className="flex flex-row items-center gap-1">
        <FaRegClock />
        <h2 className="text-sm">{new Date(publication_date).toLocaleDateString("pt-br")}</h2>
      </div>
      <div className="flex flex-row items-center gap-1">
        <FaDollarSign />
        <h2 className="text-sm">{salary}</h2>
      </div>
      <div className="flex flex-row items-center gap-1">
        <FaGlobe />
        <h2 className="text-sm">{candidate_required_location}</h2>
      </div>

      <CollapsibleContent className="m-3 p-3 border border-zinc-300 rounded-xl">
      <div dangerouslySetInnerHTML={{ __html: description }} />
      </CollapsibleContent>

      <CollapsibleTrigger asChild className="mt-2 cursor-pointer">
        <div className="flex flex-row items-center gap-1">
          <h1>{isOpen ? "Ver menos" : "Ver mais"}</h1>
          {
            isOpen 
            ? <FaChevronUp />
            : <FaChevronDown />
          }
        </div>
      </CollapsibleTrigger>
    </Collapsible>
  )
}