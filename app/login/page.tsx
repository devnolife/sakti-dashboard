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
import { Loader2, Eye, EyeOff } from "lucide-react"
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
      image: "/login/1.jpg",
      title: "Sistem Informasi Terintegrasi",
      subtitle: "Fakultas Teknik Unismuh Makassar",
      description: "Platform digital terpadu untuk mengelola aktivitas akademik Anda"
    },
    {
      image: "/login/2.jpg",
      title: "Manajemen Akademik Modern",
      subtitle: "Akses Dimana Saja, Kapan Saja",
      description: "Kelola mata kuliah, tugas, dan jadwal dengan mudah"
    },
    {
      image: "/login/3.jpg",
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
        <div className="relative lg:w-3/5 min-h-[300px] lg:min-h-screen bg-gray-900">
          {/* Slider Images */}
          <div className="relative w-full h-full overflow-hidden">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Background Image */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover brightness-75"
                  priority={index === 0}
                />

                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/30 z-10" />

                {/* Content */}
                <div className="relative z-30 flex flex-col justify-center h-full p-8 lg:p-16">
                  {/* Logo */}
                  <div className="mb-12">
                    <div className="flex items-center gap-4 mb-8 backdrop-blur-md bg-white/10 p-4 rounded-2xl border border-white/20 w-fit">
                      <div className="relative flex items-center justify-center rounded-xl h-14 w-14 bg-white p-2">
                        <Image
                          src="/logo/logo.png"
                          alt="SintekMu Logo"
                          width={56}
                          height={56}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                          SINTEK<span className="text-blue-200">Mu</span>
                        </h1>
                        <p className="text-sm text-white font-semibold drop-shadow">Portal Akademik</p>
                      </div>
                    </div>
                  </div>

                  {/* Slide Content */}
                  <div className="max-w-xl">
                    <h2 className="mb-4 text-5xl font-black leading-tight text-white lg:text-6xl drop-shadow-lg">
                      {slide.title}
                    </h2>
                    <p className="mb-3 text-2xl font-bold text-white drop-shadow">
                      {slide.subtitle}
                    </p>
                    <p className="text-lg leading-relaxed text-white drop-shadow">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center p-6 lg:w-2/5 lg:p-12 bg-gradient-to-br from-gray-50 to-blue-50/30">
          <div className="w-full max-w-md">
            {/* Logos Section */}
            <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <div className="transition-transform hover:scale-110 duration-300">
                  <Image
                    src="/login/teknik.png"
                    alt="Fakultas Teknik"
                    width={55}
                    height={55}
                    className="object-contain"
                  />
                </div>
                <div className="transition-transform hover:scale-110 duration-300">
                  <Image
                    src="/login/universitas.png"
                    alt="Universitas Muhammadiyah Makassar"
                    width={55}
                    height={55}
                    className="object-contain"
                  />
                </div>
                <div className="transition-transform hover:scale-110 duration-300">
                  <Image
                    src="/login/unggul.png"
                    alt="Unggul"
                    width={55}
                    height={55}
                    className="object-contain"
                  />
                </div>
                <div className="transition-transform hover:scale-110 duration-300">
                  <Image
                    src="/login/GIFt.png"
                    alt="GIFT"
                    width={55}
                    height={55}
                    className="object-contain"
                  />
                </div>
                <div className="transition-transform hover:scale-110 duration-300">
                  <Image
                    src="/login/logo.png"
                    alt="SintekMu"
                    width={55}
                    height={55}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Login Form Card */}
            <Card className="bg-white border-0 shadow-2xl rounded-2xl overflow-hidden">
              <CardHeader className="space-y-3 pb-6 bg-gradient-to-br from-white to-gray-50">
                <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
                  Selamat Datang
                </CardTitle>
                <CardDescription className="text-center text-gray-600 text-base">
                  Masukkan kredensial Anda untuk melanjutkan
                </CardDescription>
              </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="font-semibold text-gray-800 text-sm">Username</Label>
                  <div className="relative group">
                    <Input
                      id="username"
                      type="text"
                      placeholder="Masukkan username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="h-12 text-gray-900 transition-all border-gray-300 pl-12 bg-white placeholder:text-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 rounded-xl"
                      required
                    />
                    <div className="absolute text-gray-400 transition-colors -translate-y-1/2 left-4 top-1/2 group-focus-within:text-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
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
                  <Label htmlFor="password" className="font-semibold text-gray-800 text-sm">Password</Label>
                  <div className="relative group">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 text-gray-900 transition-all border-gray-300 pl-12 pr-12 bg-white placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl"
                      required
                    />
                    <div className="absolute text-gray-400 transition-colors -translate-y-1/2 left-4 top-1/2 group-focus-within:text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
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
                      className="absolute text-gray-400 transition-colors -translate-y-1/2 right-4 top-1/2 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="font-semibold text-gray-800 text-sm">Peran</Label>
                  <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as Role)}>
                    <SelectTrigger className="h-12 w-full text-gray-900 transition-all border-gray-300 bg-white focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 rounded-xl">
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
                  <div className="p-4 border rounded-xl bg-red-50 border-red-200">
                    <p className="text-sm font-medium text-center text-red-600">{formError}</p>
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full h-13 text-base font-bold text-white transition-all shadow-lg bg-gradient-to-r from-red-600 via-red-500 to-blue-600 hover:shadow-2xl hover:scale-[1.02] rounded-xl"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      Masuk Sekarang
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pb-8 bg-gradient-to-br from-gray-50 to-white">
              <div className="text-sm text-center text-gray-600">
                <Link href="/" className="transition-colors underline-offset-4 text-red-600 hover:text-blue-600 hover:underline font-semibold inline-flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Kembali ke beranda
                </Link>
              </div>
            </CardFooter>
          </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
