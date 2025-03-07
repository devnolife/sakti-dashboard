"use client"

import { usePathname } from "next/navigation"
import { Search, LogOut, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
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

  return (
    <header className="fixed top-0 right-0 z-40 px-4 py-3 md:px-6 lg:px-8 lg:left-64 transition-all duration-300">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`mx-auto rounded-xl border border-border/40 ${
          scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background/80 backdrop-blur-sm"
        } transition-all duration-200`}
      >
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {/* Page Title - Can be dynamic based on current route */}
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {user && (
              <>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted transition-colors">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>

                <NotificationDropdown />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-9 w-9 rounded-full p-0 hover:bg-muted transition-colors">
                      <Avatar className="h-8 w-8 border border-border">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 p-2">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                      <Avatar className="h-10 w-10 border-2 border-primary/10">
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

                    <div className="mt-2 mb-1 px-2">
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {getRoleDisplayName(user.role)}
                      </span>
                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="rounded-lg cursor-pointer flex items-center gap-2 py-2">
                      <User className="h-4 w-4" />
                      Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem className="rounded-lg cursor-pointer flex items-center gap-2 py-2">
                      <Settings className="h-4 w-4" />
                      Settings
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

