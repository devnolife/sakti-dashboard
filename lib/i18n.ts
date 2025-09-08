import { createContext, useContext } from 'react'

export type Locale = 'id' | 'en'

export interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string>) => string
}

export const I18nContext = createContext<I18nContextType | null>(null)

export const useI18n = () => {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

export const defaultLocale: Locale = 'id'