"use client"

import { useState } from "react"
import { useNotifications } from "@/context/notification-context"
import { NotificationCard } from "@/components/ui/notification-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, Check, Users, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, acceptInvitation, declineInvitation } = useNotifications()

  const [filter, setFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter notifications based on tab and search query
  const filteredNotifications = notifications.filter((notification) => {
    // Filter by type
    if (filter !== "all" && notification.type !== filter) {
      return false
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query) ||
        notification.sender?.name.toLowerCase().includes(query) ||
        notification.metadata?.locationName?.toLowerCase().includes(query) ||
        notification.metadata?.groupName?.toLowerCase().includes(query)
      )
    }

    return true
  })

  // Count notifications by type
  const counts = {
    all: notifications.length,
    "kkp-invitation": notifications.filter((n) => n.type === "kkp-invitation").length,
    "kkp-accepted": notifications.filter((n) => n.type === "kkp-accepted").length,
    "kkp-declined": notifications.filter((n) => n.type === "kkp-declined").length,
    "kkp-approved": notifications.filter((n) => n.type === "kkp-approved").length,
    "kkp-rejected": notifications.filter((n) => n.type === "kkp-rejected").length,
    general: notifications.filter((n) => n.type === "general").length,
  }

  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce(
    (groups, notification) => {
      const date = new Date(notification.timestamp).toLocaleDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(notification)
      return groups
    },
    {} as Record<string, typeof notifications>,
  )

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
        {notifications.some((n) => !n.read) && (
          <Button variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search notifications..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <SelectValue placeholder="Filter by type" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <div className="flex items-center justify-between">
                <span>All notifications</span>
                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">{counts.all}</span>
              </div>
            </SelectItem>
            <SelectItem value="kkp-invitation">
              <div className="flex items-center justify-between">
                <span>KKP Invitations</span>
                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">{counts["kkp-invitation"]}</span>
              </div>
            </SelectItem>
            <SelectItem value="kkp-accepted">
              <div className="flex items-center justify-between">
                <span>Accepted Invitations</span>
                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">{counts["kkp-accepted"]}</span>
              </div>
            </SelectItem>
            <SelectItem value="kkp-approved">
              <div className="flex items-center justify-between">
                <span>Approved Applications</span>
                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">{counts["kkp-approved"]}</span>
              </div>
            </SelectItem>
            <SelectItem value="general">
              <div className="flex items-center justify-between">
                <span>General</span>
                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">{counts.general}</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
        <TabsList className="mb-4 grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">All</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{counts.all}</span>
          </TabsTrigger>
          <TabsTrigger value="kkp-invitation" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Invitations</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{counts["kkp-invitation"]}</span>
          </TabsTrigger>
          <TabsTrigger value="kkp-accepted" className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            <span className="hidden sm:inline">Accepted</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{counts["kkp-accepted"]}</span>
          </TabsTrigger>
          <TabsTrigger value="kkp-approved" className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            <span className="hidden sm:inline">Approved</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{counts["kkp-approved"]}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-0">
          {Object.keys(groupedNotifications).length > 0 ? (
            Object.entries(groupedNotifications)
              .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
              .map(([date, notifications]) => (
                <div key={date} className="mb-6">
                  <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h3>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <NotificationCard
                        key={notification.id}
                        notification={notification}
                        onRead={markAsRead}
                        onAccept={acceptInvitation}
                        onDecline={declineInvitation}
                      />
                    ))}
                  </div>
                </div>
              ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Bell className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">No notifications found</h3>
              <p className="text-muted-foreground">
                {searchQuery ? "Try adjusting your search or filter criteria" : "You're all caught up!"}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

