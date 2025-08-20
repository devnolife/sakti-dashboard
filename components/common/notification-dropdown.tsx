"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNotifications } from "@/context/notification-context"
import { NotificationCard } from "@/components/ui/notification-card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function NotificationDropdown() {
  const { notifications, unreadCount, markAllAsRead, markAsRead, acceptInvitation, declineInvitation } =
    useNotifications()
  const [open, setOpen] = useState(false)

  // Sort notifications by date (newest first)
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )

  // Get the 5 most recent notifications
  const recentNotifications = sortedNotifications.slice(0, 5)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={() => markAllAsRead()}>
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[400px]">
          <DropdownMenuGroup className="p-2 space-y-2">
            {recentNotifications.length > 0 ? (
              recentNotifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="p-0 focus:bg-transparent">
                  <NotificationCard
                    notification={notification}
                    onRead={markAsRead}
                    onAccept={acceptInvitation}
                    onDecline={declineInvitation}
                  />
                </DropdownMenuItem>
              ))
            ) : (
              <div className="py-6 text-center text-muted-foreground">
                <p>No notifications</p>
              </div>
            )}
          </DropdownMenuGroup>
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="justify-center">
          <Link href="/dashboard/notifications" className="w-full text-center">
            View all notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

