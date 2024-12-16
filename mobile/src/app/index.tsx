import { useEffect, useState } from 'react'
import { UserSessionProps, getUserSession } from '../storages/auth'
import Login from './auth/login'
import Welcome from './welcome'
import { Loading } from '../components/loading'

export default function Home() {
  const [userSession, setUserSession] = useState<UserSessionProps | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  async function fetchSession() {
    const userSession = await getUserSession()
    setUserSession(userSession)

    setIsLoading(false)
  }

  useEffect(() => {
    fetchSession()
  }, [])

  if (isLoading) return <Loading />

  if (userSession) return <Welcome />

  return <Login />
}
