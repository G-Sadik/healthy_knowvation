"use client"
import { useEffect, useState } from "react"
import type React from "react"

import { useRouter, usePathname } from "next/navigation"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem("userData")
      if (userData) {
        const user = JSON.parse(userData)
        if (user.isLoggedIn) {
          setIsAuthenticated(true)
        } else {
          if (pathname !== "/login") {
            router.push("/login")
          }
        }
      } else {
        if (pathname !== "/login") {
          router.push("/login")
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router, pathname])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (pathname === "/login") {
    return <>{children}</>
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
