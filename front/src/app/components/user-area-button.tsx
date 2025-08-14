"use client"
import { useRouter } from "next/navigation"

type Props = {
  username: string | null
}

export function UserAreaButton({ username }: Props) {

  const router = useRouter()

  function handleUserAreaClick() {
    router.push("/perfil")
  }

  function handleLoginClick() {
    router.push("/login")
  }

  return (
    username
    ?
      <button 
        onClick={handleUserAreaClick}
        className="text-xl cursor-pointer"
      >
        Olá, {username}!
      </button>
    :    
      <button 
        onClick={handleLoginClick}
        className="text-xl cursor-pointer"
      >
        Login
      </button>
  )
}
