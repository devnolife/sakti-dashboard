'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Languages, Check } from 'lucide-react'
import { useI18n, type Locale } from '@/lib/i18n'

const languages = {
  id: {
    name: 'Bahasa Indonesia',
    flag: '🇮🇩'
  },
  en: {
    name: 'English',
    flag: '🇺🇸'
  }
} as const

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n()

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Languages className="h-4 w-4" />
          <span className="sr-only">{t('common.language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([lang, config]) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang as Locale)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span>{config.flag}</span>
              <span>{config.name}</span>
            </div>
            {locale === lang && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}