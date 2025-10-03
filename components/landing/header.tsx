"use client"

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [active, setActive] = useState('home')

  // Scroll tracking for smooth transitions
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Section observer to highlight nav
  useEffect(() => {
    const ids = ['home', 'about', 'features', 'courses', 'news', 'testimonials']
    const obs: IntersectionObserver[] = []
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const o = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(id) })
      }, { threshold: 0.45 })
      o.observe(el)
      obs.push(o)
    })
    return () => obs.forEach(o => o.disconnect())
  }, [])

  // Prevent body scroll on mobile menu open
  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
    }
    return () => { document.documentElement.style.overflow = '' }
  }, [isMenuOpen])

  const handleNavClick = useCallback((href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 110
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActive(id)
      setIsMenuOpen(false)
    }
  }, [])

  // Navigation labels - Bahasa Indonesia
  const navigation = [
    { name: 'Beranda', href: '#home' },
    { name: 'Tentang', href: '#about' },
    { name: 'Fitur', href: '#features' },
    { name: 'Program Studi', href: '#courses' },
    { name: 'Berita', href: '#news' },
    { name: 'Testimoni', href: '#testimonials' }
  ]

  const headerBase = 'fixed top-0 left-0 right-0 z-50 transition-all duration-500'
  const scrolled = scrollY > 50
  const headerClasses = scrolled
    ? 'backdrop-blur-xl bg-white/95 shadow-[0_4px_24px_-4px_rgba(54,116,181,0.15)] border-b border-gray-200'
    : 'bg-white/80 backdrop-blur-md border-b border-gray-100'

  return (
    <header className={`${headerBase} ${headerClasses}`}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between ${scrolled ? 'h-16' : 'h-20'} transition-all`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-12 h-12 transition-transform duration-500 group-hover:scale-110">
              <Image
                src="/logo/logo.png"
                alt="SintekMu Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <span className="text-[26px] font-bold leading-none tracking-tight select-none">
              <span className="text-red-600">SINTEK</span>
              <span className="text-blue-600">Mu</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-[55px]" aria-label="Primary">
            {navigation.map(item => {
              const isActive = active === item.href.replace('#', '')
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative text-[17px] font-medium tracking-wide transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                  {isActive && <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[6px] w-[6px] rounded-full bg-primary shadow-[0_0_0_4px_rgba(54,116,181,0.25)]" />}
                </button>
              )
            })}
          </nav>

          {/* Login Button */}
          <div className="items-center hidden md:flex">
            <Button
              asChild
              className="rounded-full px-8 py-2.5 text-[15px] font-bold transition-all duration-300 bg-red-500 hover:bg-red-600 text-white hover:shadow-lg shadow-md shadow-red-500/30 hover:scale-105"
            >
              <Link href="/login">Masuk</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(v => !v)}
            aria-label="Toggle navigation menu"
            className="relative p-3 md:hidden rounded-2xl transition-all duration-300 border text-gray-700 hover:text-primary hover:scale-110 group backdrop-blur-xl bg-white/90 border-gray-200"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 transition-transform duration-500 group-hover:rotate-180" />
            ) : (
              <Menu className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" />
            )}
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-primary/10 to-red-500/5 group-hover:opacity-100 rounded-2xl" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="absolute left-0 right-0 top-full z-40 bg-white/95 backdrop-blur-2xl border-y border-gray-200 shadow-[0_20px_40px_-10px_rgba(54,116,181,0.25)]">
              <div className="px-4 py-6">
                <nav className="flex flex-col gap-2" aria-label="Mobile">
                  {navigation.map((item, index) => {
                    const activeSec = active === item.href.replace('#', '')
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        style={{ animationDelay: `${index * 50}ms` }}
                        className={`group relative flex items-center justify-between rounded-xl px-5 py-3 text-[16px] font-medium tracking-wide transition-colors duration-300 ${activeSec ? 'text-primary bg-primary/10' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`}
                      >
                        {item.name}
                        {activeSec && <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_0_4px_rgba(54,116,181,0.22)]" />}
                      </button>
                    )
                  })}
                  <div className="pt-4 mt-2 border-t border-gray-200">
                    <Button
                      asChild
                      className="w-full rounded-full bg-red-500 hover:bg-red-600 text-white hover:shadow-lg font-bold"
                    >
                      <Link href="/login">Masuk</Link>
                    </Button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
