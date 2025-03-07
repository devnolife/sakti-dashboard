"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { Notification } from "@/context/notification-context"
import { CheckCircle, XCircle, Bell, UserPlus } from "lucide-react"

interface NotificationCardProps {
  notification: Notification
  onRead: (id: string) => void
  onAccept?: (id: string) => Promise<void>
  onDecline?: (id: string) => Promise<void>
}

export function NotificationCard({ notification, onRead, onAccept, onDecline }: NotificationCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  // Format the timestamp
  const formattedTime = new Date(notification.timestamp).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })

  // Handle click on the notification
  const handleClick = () => {
    if (!notification.read) {
      onRead(notification.id)
    }
  }

  // Handle accept invitation
  const handleAccept = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onAccept) {
      setIsLoading(true)
      try {
        await onAccept(notification.id)
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Handle decline invitation
  const handleDecline = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onDecline) {
      setIsLoading(true)
      try {
        await onDecline(notification.id)
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Get notification icon based on type
  const getNotificationIcon = () => {
    switch (notification.type) {
      case "kkp-invitation":
        return <UserPlus className="h-5 w-5 text-blue-500" />
      case "kkp-accepted":
      case "kkp-approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "kkp-declined":
      case "kkp-rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-primary" />
    }
  }

  return (
    <div
      className={`w-full p-3 rounded-lg transition-colors ${notification.read ? "bg-transparent" : "bg-muted/50"}`}
      onClick={handleClick}
    >
      <div className="flex gap-3">
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
          {getNotificationIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-medium">{notification.title}</h4>
            {!notification.read && <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5"></div>}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
          <p className="text-xs text-muted-foreground mt-1">{formattedTime}</p>

          {/* Action buttons for invitations */}
          {notification.type === "kkp-invitation" && notification.actionRequired && (
            <div className="mt-2 flex gap-2">
              <Button size="sm" variant="outline" className="h-7 text-xs" disabled={isLoading} onClick={handleDecline}>
                Decline
              </Button>
              <Button size="sm" className="h-7 text-xs" disabled={isLoading} onClick={handleAccept}>
                Accept
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

