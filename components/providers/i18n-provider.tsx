'use client'

import { ReactNode, useState, useEffect } from 'react'
import { I18nContext, type Locale, type I18nContextType, defaultLocale } from '@/lib/i18n'
import { translations } from '@/lib/translations'

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale
    if (savedLocale && (savedLocale === 'id' || savedLocale === 'en')) {
      setLocale(savedLocale)
    }
  }, [])

  // Save language preference to localStorage when it changes
  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  // Translation function with parameter interpolation
  const t = (key: string, params?: Record<string, string>) => {
    const translation = translations[locale]?.[key as keyof typeof translations[typeof locale]] || key
    
    if (!params) {
      return translation
    }

    // Replace {{param}} placeholders with actual values
    return Object.entries(params).reduce((text, [param, value]) => {
      return text.replace(new RegExp(`{{${param}}}`, 'g'), value)
    }, translation)
  }

  const value: I18nContextType = {
    locale,
    setLocale: handleSetLocale,
    t
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}