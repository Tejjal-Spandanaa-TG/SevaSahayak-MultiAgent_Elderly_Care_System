"use client"

// This is a simplified auth utility for demo purposes
// In a real app, you would use a proper auth solution like NextAuth.js or Clerk

import { useEffect, useState } from "react"

export type User = {
  name: string
  email: string
  role: "caregiver" | "family" | "healthcare"
  avatar?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage", error)
      }
    }
    setLoading(false)
  }, [])

  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }
}

