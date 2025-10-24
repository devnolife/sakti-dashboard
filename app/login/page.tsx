"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Eye, EyeOff, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
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
      description: "Platform digital terpadu untuk mengelola seluruh aktivitas akademik dan administrasi kampus"
    },
    {
      image: "/login/2.jpg",
      title: "Manajemen Akademik Modern",
      subtitle: "Akses Fleksibel, Kapan Saja & Dimana Saja",
      description: "Kelola perkuliahan, tugas, dan jadwal akademik dengan efisien dalam satu dashboard"
    },
    {
      image: "/login/3.jpg",
      title: "Ekosistem Digital Kampus",
      subtitle: "Terhubung dengan Civitas Akademika",
      description: "Kolaborasi dan komunikasi seamless antara mahasiswa, dosen, dan staff dalam satu platform"
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
      setFormError("Username dan password harus diisi.")
      return
    }

    try {
      // Role akan ditentukan otomatis dari backend
      await login(username, password)
      router.push("/dashboard")
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Login gagal. Periksa username dan password Anda.")
    }
  }

  return (
    <div className="flex overflow-hidden min-h-screen bg-white">
      <div className="flex flex-col w-full lg:flex-row">
        {/* Left Side - Image Slider */}
        <div className="relative lg:w-3/5 min-h-[300px] lg:min-h-screen bg-gray-900">
          {/* Slider Images */}
          <div className="overflow-hidden relative w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
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
                <div className="absolute inset-0 z-10 bg-black/30" />

                {/* Content */}
                <div className="flex relative z-30 flex-col justify-center p-8 h-full lg:p-16">
                  {/* Slide Content */}
                  <div className="max-w-xl">
                    <h2 className="mb-4 text-5xl font-black leading-tight text-white drop-shadow-lg lg:text-6xl">
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
        <div className="flex justify-center items-center p-6 bg-gradient-to-br from-gray-50 lg:w-2/5 lg:p-12 to-blue-50/30">
          <div className="w-full max-w-md">
            {/* Logos Section */}
            <div className="p-6 mb-8">
              <div className="flex flex-wrap gap-6 justify-center items-center">
                <div className="transition-transform duration-300 hover:scale-110">
                  <Image
                    src="/login/teknik.png"
                    alt="Fakultas Teknik"
                    width={55}
                    height={55}
                    className="object-contain"
                  />
                </div>
                <div className="transition-transform duration-300 hover:scale-110">
                  <Image
                    src="/login/universitas.png"
                    alt="Universitas Muhammadiyah Makassar"
                    width={55}
                    height={55}
                    className="object-contain"
                  />
                </div>
                <div className="transition-transform duration-300 hover:scale-110">
                  <Image
                    src="/login/unggul.png"
                    alt="Unggul"
                    width={55}
                    height={55}
                    className="object-contain"
                  />
                </div>
                <div className="transition-transform duration-300 hover:scale-110">
                  <Image
                    src="/login/GIFt.png"
                    alt="GIFT"
                    width={55}
                    height={55}
                    className="object-contain"
                  />
                </div>
                <div className="transition-transform duration-300 hover:scale-110">
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

            {/* Login Form */}
            <div className="space-y-6">
              <div className="space-y-3 text-center">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
                  Selamat Datang di SINTEKMu
                </h2>
                <p className="text-base text-gray-600">
                  Silakan login untuk mengakses dashboard Anda
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-semibold text-gray-800">
                    Username (NIM/NIDN)
                  </Label>
                  <div className="relative group">
                    <Input
                      id="username"
                      type="text"
                      placeholder="Masukkan NIM atau NIDN"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-12 h-12 text-gray-900 bg-white rounded-xl border-none transition-all placeholder:text-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      required
                    />
                    <div className="absolute left-4 top-1/2 text-gray-400 transition-colors -translate-y-1/2 group-focus-within:text-red-500">
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
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-800">Password</Label>
                  <div className="relative group">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password Anda"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-12 pl-12 h-12 text-gray-900 bg-white rounded-xl border-none transition-all placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      required
                    />
                    <div className="absolute left-4 top-1/2 text-gray-400 transition-colors -translate-y-1/2 group-focus-within:text-blue-500">
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
                      className="absolute right-4 top-1/2 text-gray-400 transition-colors -translate-y-1/2 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                {formError && (
                  <div className="flex gap-3 items-start p-4 bg-red-50 rounded-xl border border-red-200">
                    <AlertCircle className="w-5 h-5 mt-0.5 text-red-600 flex-shrink-0" />
                    <p className="text-sm font-medium text-red-600">{formError}</p>
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full h-13 text-base font-bold text-white transition-all shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-2xl hover:scale-[1.02] rounded-xl"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Memproses Login...
                    </>
                  ) : (
                    <>
                      Masuk ke Dashboard
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </Button>
              </form>
              <div className="pt-4 space-y-3">
                <div className="text-sm text-center text-gray-600">
                  <Link href="/" className="inline-flex gap-1 items-center font-semibold text-red-600 transition-colors underline-offset-4 hover:text-blue-600 hover:underline">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Beranda
                  </Link>
                </div>
                <p className="text-xs text-center text-gray-500">
                  Butuh bantuan? Hubungi admin kampus atau IT support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
