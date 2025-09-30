"use client"

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, GraduationCap } from 'lucide-react'

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

  // Updated navigation labels for new sections
  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Courses', href: '#courses' },
    { name: 'News', href: '#news' },
    { name: 'Testimonials', href: '#testimonials' }
  ]

  const headerBase = 'fixed top-0 left-0 right-0 z-50 transition-all duration-500'
  const scrolled = scrollY > 50
  const headerClasses = scrolled
    ? 'backdrop-blur-xl bg-white/90 dark:bg-neutral-900/90 shadow-[0_4px_24px_-4px_rgba(54,116,181,0.15)] border-b border-white/60 dark:border-white/10'
    : 'bg-primary'

  return (
    <header className={`${headerBase} ${headerClasses}`}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between ${scrolled ? 'h-16' : 'h-20'} transition-all`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`relative flex items-center justify-center w-12 h-12 rounded-2xl border overflow-hidden transition-colors duration-500 ${scrolled ? 'bg-primary/10 border-primary/25' : 'bg-white/20 border-white/30'}`}>
              <GraduationCap className={`w-7 h-7 transition-all duration-500 group-hover:rotate-12 ${scrolled ? 'text-primary' : 'text-white'}`} />
              <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 bg-radial from-white/40 to-transparent" />
            </div>
            <span className="text-[26px] font-bold leading-none tracking-tight select-none">
              <span className={scrolled ? 'text-primary' : 'text-white'}>Edu</span>
              <span className={scrolled ? 'text-[#101012] dark:text-white' : 'text-white'}>Learn</span>
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
                  className={`relative text-[18px] font-medium tracking-wide transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${scrolled ? (isActive ? 'text-[#101012] dark:text-white' : 'text-neutral-800/50 dark:text-neutral-300/50 hover:text-neutral-900 dark:hover:text-white') : (isActive ? 'text-white' : 'text-white/70 hover:text-white')}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                  {isActive && <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[6px] w-[6px] rounded-full transition-colors duration-300 ${scrolled ? 'bg-primary shadow-[0_0_0_4px_rgba(54,116,181,0.25)]' : 'bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.25)]'}`} />}
                </button>
              )
            })}
          </nav>

          {/* Contact Button */}
          <div className="items-center hidden md:flex">
            <Button
              asChild
              variant="ghost"
              className={`rounded-full px-8 py-2.5 text-[17px] font-semibold border-2 transition-all duration-300 ${scrolled ? 'text-primary hover:text-primary border-primary hover:bg-primary/5 shadow-[0_4px_18px_-6px_rgba(54,116,181,0.35)] hover:shadow-[0_6px_28px_-4px_rgba(54,116,181,0.45)]' : 'text-white hover:text-white border-white hover:bg-white/10 shadow-[0_4px_18px_-6px_rgba(255,255,255,0.35)] hover:shadow-[0_6px_28px_-4px_rgba(255,255,255,0.45)]'}`}
            >
              <Link href="#contact">Contact</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(v => !v)}
            aria-label="Toggle navigation menu"
            className={`relative p-3 md:hidden rounded-2xl transition-all duration-300 border text-neutral-700 dark:text-neutral-200 hover:text-primary hover:scale-110 group ${scrolled ? 'backdrop-blur-xl bg-white/70 dark:bg-neutral-800/60 border-white/60 dark:border-white/10' : 'bg-white/20 dark:bg-neutral-800/40 border-white/40 dark:border-white/10'}`}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 transition-transform duration-500 group-hover:rotate-180" />
            ) : (
              <Menu className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" />
            )}
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-primary/20 to-transparent group-hover:opacity-100 rounded-2xl" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="absolute left-0 right-0 top-full z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl border-y border-white/60 dark:border-white/10 shadow-[0_20px_40px_-10px_rgba(4,81,211,0.25)]">
              <div className="px-4 py-6">
                <nav className="flex flex-col gap-2" aria-label="Mobile">
                  {navigation.map((item, index) => {
                    const activeSec = active === item.href.replace('#', '')
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        style={{ animationDelay: `${index * 50}ms` }}
                        className={`group relative flex items-center justify-between rounded-xl px-5 py-3 text-[16px] font-medium tracking-wide transition-colors duration-300 ${activeSec ? 'text-primary bg-primary/10' : 'text-neutral-700 dark:text-neutral-300 hover:text-primary hover:bg-primary/8'}`}
                      >
                        {item.name}
                        {activeSec && <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_0_4px_rgba(54,116,181,0.22)]" />}
                      </button>
                    )
                  })}
                  <div className="pt-4 mt-2 border-t border-white/60 dark:border-white/10">
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full rounded-full border-2 border-primary text-primary hover:bg-primary/10"
                    >
                      <Link href="#contact">Contact</Link>
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
