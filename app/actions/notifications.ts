"use server"

import { prisma } from "@/lib/prisma"
import { nanoid } from "nanoid"

type NotificationType = "info" | "warning" | "error" | "success"

/**
 * Create a notification for a user
 */
export async function createNotification(
  userId: string,
  title: string,
  message: string,
  type: NotificationType = "info",
  data?: Record<string, any>
) {
  try {
    await prisma.notifications.create({
      data: {
        id: nanoid(),
        user_id: userId,
        title,
        message,
        type,
        data: data || null,
        is_read: false,
        created_at: new Date()
      }
    })
    return { success: true }
  } catch (error) {
    console.error("Error creating notification:", error)
    return { success: false, error }
  }
}

/**
 * Get notifications for a user
 */
export async function getUserNotifications(userId: string, limit = 50) {
  try {
    const notifications = await prisma.notifications.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      take: limit
    })
    return notifications
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return []
  }
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(notificationId: string) {
  try {
    await prisma.notifications.update({
      where: { id: notificationId },
      data: {
        is_read: true,
        read_at: new Date()
      }
    })
    return { success: true }
  } catch (error) {
    console.error("Error marking notification as read:", error)
    return { success: false, error }
  }
}

/**
 * Mark all notifications as read for a user
 */
export async function markAllNotificationsAsRead(userId: string) {
  try {
    await prisma.notifications.updateMany({
      where: {
        user_id: userId,
        is_read: false
      },
      data: {
        is_read: true,
        read_at: new Date()
      }
    })
    return { success: true }
  } catch (error) {
    console.error("Error marking all notifications as read:", error)
    return { success: false, error }
  }
}

/**
 * Get unread notification count
 */
export async function getUnreadNotificationCount(userId: string) {
  try {
    const count = await prisma.notifications.count({
      where: {
        user_id: userId,
        is_read: false
      }
    })
    return count
  } catch (error) {
    console.error("Error fetching unread count:", error)
    return 0
  }
}

/**
 * Delete a notification
 */
export async function deleteNotification(notificationId: string) {
  try {
    await prisma.notifications.delete({
      where: { id: notificationId }
    })
    return { success: true }
  } catch (error) {
    console.error("Error deleting notification:", error)
    return { success: false, error }
  }
}
