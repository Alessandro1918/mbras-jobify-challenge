"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FaStar, FaRegStar } from "react-icons/fa"
import { setFavoriteService } from "../services/set-favorite"

type Props = {
  jobId: string,
  favorites: string[]
}

export function Star({ jobId, favorites }: Props) {

  const router = useRouter()

  const [ isFavorite, setIsFavorite ] = useState(favorites.includes(jobId))

  async function handleClick() {
    setIsFavorite(!isFavorite)
    try {
      await setFavoriteService(jobId)
    } catch (err) {
      router.push("/login")
    }
  }

  return (
    <button 
      onClick={handleClick}
      className="cursor-pointer"
    >
      {
        isFavorite 
        ? <FaStar className="text-amber-500 size-6"/> 
        : <FaRegStar className="text-gray-500 size-6"/>
      }
    </button>
  )
}
