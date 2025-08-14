"use client"
import { useRouter } from "next/navigation"
import { login } from "../services/login"
import { setCookie } from "../services/set-cookie"

export default function LoginPage() {

  const router = useRouter()
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const email = formData.get("email")
      const password = formData.get("password")

      const data = await login(email!.toString(), password!.toString())

      await setCookie("accessToken", data.session.access_token)
      await setCookie("refreshToken", data.session.refresh_token)

      router.push("/")
    } catch (err: any) {
      alert(err.message)
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Login
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
              <input type="email" name="email" id="email" placeholder="name@company.com" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 placeholder-gray-400"/>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
              <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 placeholder-gray-400"/>
            </div>
            <button type="submit" className="w-full text-gray-900 border border-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  )
}
