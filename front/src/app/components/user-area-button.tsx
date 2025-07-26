"use client"
import { useRouter } from "next/navigation"

export function UserAreaButton() {

  const router = useRouter()

  function handleUserAreaClick() {
    router.push("/perfil")
  }

  return (
    <button 
      onClick={handleUserAreaClick}
      className="text-xl cursor-pointer"
    >
      Área do Usuário
    </button>
  )
}
