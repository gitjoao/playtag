'use client'

import { notFound } from 'next/navigation'
import { use, useEffect, useState } from 'react'

export default function UserPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params)

  const [user, setUser] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/users/${username}`)
        if (!res.ok) return notFound()
        const data = await res.json()
        setUser(data)
      } catch (err) {
        console.error(err)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [username])

  if (loading) return <p>Carregando...</p>
  if (!user) return notFound()

  return (
    <div>
      <h1>Usuário: {user.username}</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
