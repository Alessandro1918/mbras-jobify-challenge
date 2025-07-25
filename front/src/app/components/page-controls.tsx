"use client"
import { useState, useEffect } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"

export function PageControls() {

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [ page, setPage ] = useState(1)

  // If URL has the "?page=" search param, update state value;
  // If not, set "?page=1".
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (params.has("page")) {
      setPage(Number(params.get("page")))
    } 
    else {
      params.set("page", "1")
      replace(`${pathname}?${params.toString()}`)
    }
  }, [])

  function handleDec() {
    if (page > 1) {
      updateURL(page - 1)
      setPage(page - 1)
    }
  }

  function handleInc() {
    if (page < 100) {
      updateURL(page + 1)
      setPage(page + 1)
    } 
  }

  // Saves the "page" state value in the URL
  function updateURL(page: number) {
    const params = new URLSearchParams(searchParams)
    params.set("page", String(page))
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-row gap-4">
      <button onClick={handleDec}>{"<"}</button>
      <h1>{page}</h1>
      <button onClick={handleInc}>{">"}</button>
    </div>
  )
}
