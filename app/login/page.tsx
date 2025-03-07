"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { type Role, roleConfigs } from "@/types/role"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<Role>("mahasiswa")
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState("")
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")
    if (!username || !password) {
      setFormError("Username and password are required.")
      return
    }
    try {
      await login(username, password, selectedRole)
      router.push("/dashboard")
    } catch {
      setFormError("Invalid username or password.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary">
              <span className="text-2xl font-bold text-primary-foreground">S</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Sign in to SAKTI</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="your.username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="relative space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute -translate-y-1/2 right-4 top-1/2"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.707l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 10.586l2.293-2.293a1 1 0 111.414 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as Role)}>
                <SelectTrigger>
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
            {formError && <p className="text-center text-red-500">{formError}</p>}
            {/* Error display removed because property 'error' does not exist in AuthContext */}
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
            <Link href="/" className="underline underline-offset-4 hover:text-primary">
              Back to home
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

