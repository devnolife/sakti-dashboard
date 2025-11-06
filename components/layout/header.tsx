"use client"

import { usePathname } from "next/navigation"
import { Search, LogOut, Settings, User, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import NotificationDropdown from "@/components/notification-dropdown"
import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { getRoleDisplayName } from "@/types/role"
import { motion } from "framer-motion"
import { LanguageSwitcher } from "@/components/language-switcher"
import SubRoleSwitcher from "@/components/dosen/sub-role-switcher"
import { useDosenSubRole } from "@/context/dosen-subrole-context"
import { useTheme } from "next-themes"

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { user, logout } = useAuth()
  const { availableSubRoles } = useDosenSubRole()
  const { theme, setTheme } = useTheme()

  // Check if user is dosen with multiple sub-roles
  const showSubRoleSwitcher = user?.role === 'dosen' && availableSubRoles.length > 1

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 right-0 z-40 px-4 py-3 transition-all duration-300 md:px-6 lg:px-8 lg:left-64">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`mx-auto rounded-xl border border-border/40 ${
          scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background/80 backdrop-blur-sm"
        } transition-all duration-200`}
      >
        <div className="flex items-center gap-4 px-4 h-14">
          {/* Left: Page Title */}
          <div className="flex items-center min-w-0 gap-4">
            <h1 className="text-lg font-semibold whitespace-nowrap">Dashboard</h1>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 hidden max-w-md mx-auto md:block">
            <div className="relative">
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-9 bg-background/60 border-muted-foreground/20 focus-visible:ring-1"
              />
            </div>
          </div>

          {/* Right: Sub Role + Icons */}
          <div className="flex items-center gap-1 md:gap-2">
            {user && (
              <>
                {/* Sub Role Switcher - Only show for dosen with multiple roles */}
                {showSubRoleSwitcher && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <SubRoleSwitcher />
                  </motion.div>
                )}

                {/* Language Switcher */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <LanguageSwitcher />
                </motion.div>

                {/* Theme Toggle */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="transition-colors rounded-full h-9 w-9 hover:bg-muted"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  >
                    <Sun className="w-4 h-4 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute w-4 h-4 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </motion.div>

                {/* Notification */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <NotificationDropdown />
                </motion.div>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 transition-colors rounded-full h-9 w-9 hover:bg-muted">
                      <Avatar className="w-8 h-8 border border-border">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 p-2">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                      <Avatar className="w-10 h-10 border-2 border-primary/10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.username}</span>
                      </div>
                    </div>

                    <div className="px-2 mt-2 mb-1">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                        {getRoleDisplayName(user.role)}
                      </span>
                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="flex items-center gap-2 py-2 rounded-lg cursor-pointer">
                      <User className="w-4 h-4" />
                      Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center gap-2 py-2 rounded-lg cursor-pointer">
                      <Settings className="w-4 h-4" />
                      Settings
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={logout}
                      className="flex items-center gap-2 py-2 rounded-lg cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </header>
  )
}

