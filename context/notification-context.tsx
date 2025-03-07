"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRole } from "./role-context"

export type NotificationType =
  | "kkp-invitation"
  | "kkp-accepted"
  | "kkp-declined"
  | "kkp-approved"
  | "kkp-rejected"
  | "general"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionRequired: boolean
  sender?: {
    id: string
    name: string
    role: string
    avatar?: string
  }
  metadata?: {
    groupId?: string
    groupName?: string
    locationId?: string
    locationName?: string
    expiresAt?: Date
  }
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  acceptInvitation: (notificationId: string) => Promise<void>
  declineInvitation: (notificationId: string) => Promise<void>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Mock data for demonstration
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "kkp-invitation",
    title: "KKP Group Invitation",
    message: "Ahmad Fauzi has invited you to join their KKP group for Bank Nasional Indonesia",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    actionRequired: true,
    sender: {
      id: "user123",
      name: "Ahmad Fauzi",
      role: "mahasiswa",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    metadata: {
      groupId: "group123",
      groupName: "BNI Finance Team",
      locationId: "loc123",
      locationName: "Bank Nasional Indonesia",
    },
  },
  {
    id: "2",
    type: "kkp-approved",
    title: "KKP Application Approved",
    message: "Your KKP application for Kementerian Pendidikan has been approved",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
    actionRequired: false,
    metadata: {
      locationId: "loc456",
      locationName: "Kementerian Pendidikan",
    },
  },
  {
    id: "3",
    type: "general",
    title: "New KKP Locations Available",
    message: "5 new KKP locations have been added to the system",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: false,
    actionRequired: false,
  },
]

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { role } = useRole()
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Load notifications based on role
  useEffect(() => {
    // In a real app, this would be an API call filtered by role
    setNotifications(MOCK_NOTIFICATIONS)

    // Simulate receiving a new KKP invitation after 5 seconds
    const timer = setTimeout(() => {
      const newInvitation: Notification = {
        id: Date.now().toString(),
        type: "kkp-invitation",
        title: "New KKP Group Invitation",
        message: "Siti Nurhaliza has invited you to join their KKP group for Kementerian Pendidikan",
        timestamp: new Date(),
        read: false,
        actionRequired: true,
        sender: {
          id: "user456",
          name: "Siti Nurhaliza",
          role: "mahasiswa",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        metadata: {
          groupId: "group456",
          groupName: "Kemendikbud Team",
          locationId: "loc456",
          locationName: "Kementerian Pendidikan",
        },
      }

      setNotifications((prev) => [newInvitation, ...prev])
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const acceptInvitation = async (notificationId: string) => {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Update the notification
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              actionRequired: false,
              read: true,
              type: "kkp-accepted",
              title: "KKP Invitation Accepted",
              message: `You have joined ${notification.metadata?.groupName} for ${notification.metadata?.locationName}`,
            }
          : notification,
      ),
    )

    // Add a confirmation notification
    addNotification({
      type: "kkp-accepted",
      title: "KKP Group Joined",
      message: `You have successfully joined a KKP group for ${notifications.find((n) => n.id === notificationId)?.metadata?.locationName}`,
      actionRequired: false,
    })
  }

  const declineInvitation = async (notificationId: string) => {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Update the notification
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              actionRequired: false,
              read: true,
              type: "kkp-declined",
              title: "KKP Invitation Declined",
              message: `You have declined to join ${notification.metadata?.groupName} for ${notification.metadata?.locationName}`,
            }
          : notification,
      ),
    )
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        acceptInvitation,
        declineInvitation,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

