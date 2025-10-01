"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/auth-context"
import { type Role, roleConfigs } from "@/types/role"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Loader2, Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<Role>("mahasiswa")
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)

  const { login, isLoading } = useAuth()
  const router = useRouter()

  // Slider images and content
  const slides = [
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "Sistem Informasi Terintegrasi",
      subtitle: "Fakultas Teknik Unismuh Makassar",
      description: "Platform digital terpadu untuk mengelola aktivitas akademik Anda"
    },
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "Manajemen Akademik Modern",
      subtitle: "Akses Dimana Saja, Kapan Saja",
      description: "Kelola mata kuliah, tugas, dan jadwal dengan mudah"
    },
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "Komunitas Akademik Digital",
      subtitle: "Terhubung dengan Mahasiswa & Dosen",
      description: "Berkolaborasi dan berkomunikasi dalam satu platform"
    }
  ]

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")
    if (!username || !password) {
      setFormError("Username and password are required.")
      return
    }
    await login(username, password, selectedRole)
      .then(() => {
        router.push("/dashboard")
      })
      .catch(() => {
        setFormError("Invalid username or password.")
      })
  }

  return (
    <div className="flex min-h-screen overflow-hidden bg-white">
      <div className="flex flex-col w-full lg:flex-row">
        {/* Left Side - Image Slider */}
        <div className="relative lg:w-3/5 min-h-[300px] lg:min-h-screen bg-gradient-to-br from-red-600 via-purple-600 to-blue-600">
          {/* Slider Images */}
          <div className="relative w-full h-full overflow-hidden">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/90 via-purple-600/90 to-blue-600/90 z-10" />

                {/* Pattern Overlay */}
                <div className="absolute inset-0 z-20 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:64px_64px]" />

                {/* Content */}
                <div className="relative z-30 flex flex-col justify-center h-full p-8 lg:p-16">
                  {/* Logo */}
                  <div className="mb-12">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="relative flex items-center justify-center rounded-2xl shadow-2xl h-16 w-16 bg-white/20 backdrop-blur-sm">
                        <span className="text-3xl font-bold text-white">S</span>
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold text-white">
                          SINTEK<span className="text-blue-200">Mu</span>
                        </h1>
                        <p className="text-sm text-white/80 font-semibold">Portal Akademik</p>
                      </div>
                    </div>
                  </div>

                  {/* Slide Content */}
                  <div className="max-w-xl">
                    <h2 className="mb-4 text-5xl font-black leading-tight text-white lg:text-6xl">
                      {slide.title}
                    </h2>
                    <p className="mb-3 text-2xl font-bold text-blue-100">
                      {slide.subtitle}
                    </p>
                    <p className="text-lg leading-relaxed text-white/90">
                      {slide.description}
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                  <div className="absolute top-20 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
                </div>
              </div>
            ))}
          </div>

          {/* Slider Controls */}
          <div className="absolute z-40 flex items-center justify-between w-full px-8 transform -translate-y-1/2 bottom-16 lg:bottom-1/4">
            <button
              onClick={prevSlide}
              className="p-3 transition-all rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "w-8 bg-white"
                      : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="p-3 transition-all rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center p-6 lg:w-2/5 lg:p-12 bg-gray-50">
          <Card className="w-full max-w-md border-0 shadow-none bg-transparent">
            <CardHeader className="space-y-2">
              <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-600">Masuk</CardTitle>
              <CardDescription className="text-center text-gray-600">
                Masukkan kredensial Anda untuk mengakses akun
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-700 font-semibold">Username</Label>
                  <div className="relative group">
                    <Input
                      id="username"
                      type="text"
                      placeholder="username.anda"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-11 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-red-400 transition-all"
                      required
                    />
                    <div className="absolute -translate-y-1/2 left-3 top-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
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
                  <Label htmlFor="password" className="text-gray-700 font-semibold">Password</Label>
                  <div className="relative group">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-11 pr-11 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-blue-400 transition-all"
                      required
                    />
                    <div className="absolute -translate-y-1/2 left-3 top-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
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
                      className="absolute -translate-y-1/2 right-3 top-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-gray-700 font-semibold">Peran</Label>
                  <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as Role)}>
                    <SelectTrigger className="w-full bg-gray-50 border-gray-200 text-gray-900 focus:bg-white focus:border-purple-400">
                      <SelectValue placeholder="Pilih peran Anda" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      {Object.entries(roleConfigs).map(([role, config]) => (
                        <SelectItem key={role} value={role} className="text-gray-900 focus:bg-gradient-to-r focus:from-red-500 focus:to-blue-500 focus:text-white">
                          {config.displayName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="mt-2 text-xs text-gray-500">
                    Untuk demo, username dan password apapun akan berfungsi dengan peran yang dipilih
                  </p>
                </div>
                {formError && (
                  <div className="p-3 border rounded-lg bg-red-50 border-red-200">
                    <p className="text-sm text-center text-red-600 font-medium">{formError}</p>
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-bold text-white transition-all shadow-lg bg-gradient-to-r from-red-600 to-blue-600 hover:shadow-xl hover:scale-[1.02]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Masuk...
                    </>
                  ) : (
                    <>
                      Masuk
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-gray-600">
                <Link href="/" className="transition-colors text-red-600 hover:text-blue-600 hover:underline underline-offset-4 font-semibold">
                  ← Kembali ke beranda
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

