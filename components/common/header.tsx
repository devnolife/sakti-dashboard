"use client"

import { usePathname } from "next/navigation"
import { Search, LogOut, Settings, User, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import NotificationDropdown from "@/components/common/notification-dropdown"
import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { getRoleDisplayName } from "@/types/role"
import { motion } from "framer-motion"

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean)
    if (segments.length <= 1) return "Dashboard"

    const lastSegment = segments[segments.length - 1]
    return lastSegment
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <header className="fixed top-0 right-0 z-40 px-4 py-3 md:px-6 lg:px-8 lg:left-64 transition-all duration-300">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`mx-auto rounded-2xl border transition-all duration-200 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-lg border-border/60"
            : "bg-background/90 backdrop-blur-sm shadow-md border-border/40"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {/* Dynamic Page Title with Animation */}
            <motion.h1
              className="text-xl font-bold text-foreground"
              key={pathname}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {getPageTitle()}
            </motion.h1>
            {pathname !== "/dashboard" && (
              <div className="text-sm text-muted-foreground hidden sm:block">
                / {pathname.split("/").filter(Boolean).slice(0, -1).join(" / ")}
              </div>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {user && (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                  >
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <NotificationDropdown />
                </motion.div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        className="h-9 pl-2 pr-3 rounded-xl hover:bg-accent transition-all duration-200"
                      >
                        <Avatar className="h-7 w-7 mr-2 border border-border/50">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold text-xs">
                            {user.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="hidden sm:block text-left">
                          <p className="text-sm font-medium leading-none">{user.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {getRoleDisplayName(user.role)}
                          </p>
                        </div>
                      </Button>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 p-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 mb-2">
                      <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/30 to-primary/20 text-primary font-semibold">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.username}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {getRoleDisplayName(user.role)}
                        </Badge>
                      </div>
                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="rounded-lg cursor-pointer flex items-center gap-2 py-2 hover:bg-accent">
                      <User className="h-4 w-4" />
                      Profile Settings
                    </DropdownMenuItem>

                    <DropdownMenuItem className="rounded-lg cursor-pointer flex items-center gap-2 py-2 hover:bg-accent">
                      <Settings className="h-4 w-4" />
                      Preferences
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={logout}
                      className="rounded-lg cursor-pointer flex items-center gap-2 py-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="h-4 w-4" />
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

