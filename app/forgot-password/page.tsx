"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to send a reset email
      // For demo purposes, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitted(true)

      toast({
        title: "Reset link sent",
        description: "Check your email for password reset instructions",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Failed to send reset link",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-xl font-bold text-white">
            SevaSahayak<span className="text-purple-400">AI</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 shadow-xl">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-white">Reset Password</h1>
                  <p className="text-gray-400 mt-2">
                    Enter your email and we'll send you a link to reset your password
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-700 hover:bg-purple-600 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Send Reset Link <ArrowRight className="ml-2 h-5 w-5" />
                      </div>
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-6">
                <div className="bg-green-900/20 text-green-400 p-4 rounded-lg mb-6">
                  <h2 className="text-xl font-semibold mb-2">Check Your Email</h2>
                  <p>
                    We've sent a password reset link to <span className="font-medium">{email}</span>
                  </p>
                </div>

                <p className="text-gray-400">Didn't receive the email? Check your spam folder or try again.</p>

                <Button type="button" variant="outline" className="mt-4" onClick={() => setIsSubmitted(false)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Try Again
                </Button>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Remember your password?{" "}
                <Link href="/signin" className="text-purple-400 hover:text-purple-300">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 py-6 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} SevaSahayak AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

