"use client"

import { useState } from "react"
import { Menu, X, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/auth-context"
import { getRoleDisplayName } from "@/types/role"

interface MobileMenuProps {
  activeSection: string
  onNavigate: (section: string) => void
}

export default function MobileMenu({ activeSection, onNavigate }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleNavigate = (section: string) => {
    onNavigate(section)
    setOpen(false)
  }

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted transition-colors lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 p-0 border-l border-border/40 bg-background/95 backdrop-blur-md">
        <div className="flex h-full flex-col">
          {user && (
            <>
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-primary/10">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-xs text-muted-foreground">{user.username}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="rounded-full h-8 w-8">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              <div className="p-4 border-b">
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {getRoleDisplayName(user.role)}
                </span>
              </div>

              <nav className="flex-1 overflow-auto p-4">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNavigate(item.id)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                          activeSection === item.id
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/80 hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <item.icon
                          className={cn("h-5 w-5", activeSection === item.id ? "text-primary" : "text-foreground/70")}
                        />
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="border-t p-4">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

