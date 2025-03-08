"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/auth-context"
import { type Role, roleConfigs } from "@/types/role"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<Role>("mahasiswa")
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState("")
  const { login, isLoading, error } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")
    if (!username || !password) {
      setFormError("Username and password are required.")
      return
    }
    const success = await login(username, password, selectedRole)
    if (success) {
      router.push("/dashboard")
    } else {
      setFormError("Invalid username or password.")
    }
  }

  return (
    <div className="flex flex-col min-h-screen md:flex-row bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Login Form Section */}
      <div className="flex items-center justify-center w-full p-6 md:w-1/2">
        <Card className="w-full max-w-md border-none shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center rounded-full shadow-md h-14 w-14 bg-primary">
                <span className="text-2xl font-bold text-primary-foreground">S</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Welcome to SAKTI</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the academic information system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    placeholder="your.username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <div className="absolute -translate-y-1/2 left-3 top-1/2 text-muted-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <div className="absolute -translate-y-1/2 left-3 top-1/2 text-muted-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute -translate-y-1/2 right-3 top-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as Role)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(roleConfigs).map(([role, config]) => (
                      <SelectItem key={role} value={role}>
                        {config.displayName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="mt-1 text-xs text-muted-foreground">
                  For demo purposes, any username and password will work
                </p>
              </div>
              {formError && <p className="text-sm text-center text-destructive">{formError}</p>}
              {error && <p className="text-sm text-center text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              <Link href="/" className="transition-colors text-primary hover:underline underline-offset-4">
                Back to home
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Illustration Section */}
      <div className="relative items-center justify-center hidden w-full overflow-hidden md:w-1/2 bg-primary/10 md:flex">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/20 to-primary/5"></div>
        <div className="relative z-10 max-w-lg p-8">
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold text-primary">Universitas Muhammadiyah Makassar</h2>
            <p className="text-muted-foreground">
              Access your academic information system to manage courses, view grades, and stay connected with your
              university community.
            </p>
          </div>
          <div className="overflow-hidden shadow-2xl rounded-xl">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ilustrtasi%20login.JPG-AStvbOfJ5MWIe5OVmLNlQjGmwSO6Zn.jpeg"
              alt="Universitas Muhammadiyah Makassar Campus"
              width={600}
              height={400}
              className="object-cover"
            />
          </div>
          <div className="flex items-center justify-center mt-6 space-x-4">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="w-2 h-2 rounded-full bg-primary/60"></div>
            <div className="w-2 h-2 rounded-full bg-primary/40"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

