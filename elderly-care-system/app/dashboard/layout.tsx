"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { Activity, Heart, Shield, Calendar, Users, MessageSquare, Bell, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access the dashboard",
        variant: "destructive",
      })
      router.push("/signin")
    }
  }, [user, loading, router, toast])

  const handleLogout = () => {
    logout()
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account",
    })
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-10 w-10 text-purple-500 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-gray-900 border-r border-gray-800 min-h-screen p-4">
          <div className="flex items-center mb-8">
            <h1 className="text-xl font-bold text-white">SevaSahayak</h1>
          </div>

          <nav className="space-y-1 flex-1">
            <Link
              href="/dashboard"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${pathname === "/dashboard" ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
            >
              <Activity className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/health"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${pathname === "/dashboard/health" ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
            >
              <Heart className="h-5 w-5" />
              <span>Health</span>
            </Link>
            <Link
              href="/dashboard/safety"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${pathname === "/dashboard/safety" ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
            >
              <Shield className="h-5 w-5" />
              <span>Safety</span>
            </Link>
            <Link
              href="/dashboard/schedule"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${pathname === "/dashboard/schedule" ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
            >
              <Calendar className="h-5 w-5" />
              <span>Schedule</span>
            </Link>
            <Link
              href="/dashboard/messages"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${pathname === "/dashboard/messages" ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
            </Link>
            <Link
              href="/dashboard/social"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${pathname === "/dashboard/social" ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
            >
              <Users className="h-5 w-5" />
              <span>Social</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${pathname === "/dashboard/settings" ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </nav>

          <div className="mt-auto pt-4 border-t border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={user.avatar || "/placeholder.svg?height=32&width=32"} />
                  <AvatarFallback className="bg-gray-700">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <header className="bg-gray-900 border-b border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div className="md:hidden">
                <h1 className="text-xl font-bold text-white">SevaSahayak</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <Bell className="h-4 w-4" />
                </Button>
                <Avatar className="md:hidden">
                  <AvatarImage src={user.avatar || "/placeholder.svg?height=32&width=32"} />
                  <AvatarFallback className="bg-gray-700">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          <Suspense fallback={<div className="flex items-center justify-center h-[calc(100vh-64px)]">Loading...</div>}>
            {children}
          </Suspense>
        </div>
      </div>
    </div>
  )
}

