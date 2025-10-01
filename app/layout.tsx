import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { RoleProvider } from "@/context/role-context"
import { AuthProvider } from "@/context/auth-context"
import { NotificationProvider } from "@/context/notification-context"
import { I18nProvider } from "@/components/providers/i18n-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SINTEKMu - Sistem Informasi Terintegrasi Fakultas Teknik Unismuh Makassar",
  description: "Sistem Informasi Terintegrasi Fakultas Teknik Unismuh Makassar",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <RoleProvider>
              <AuthProvider>
                <NotificationProvider>
                  {children}
                  <Toaster />
                </NotificationProvider>
              </AuthProvider>
            </RoleProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



