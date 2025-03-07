"use client"

import { useState, useEffect } from "react"

type ToastProps = {
  title: string
  description?: string
  duration?: number
}

export function toast({ title, description, duration = 3000 }: ToastProps) {
  const event = new CustomEvent("toast", {
    detail: {
      title,
      description,
      duration,
    },
  })
  window.dispatchEvent(event)
}

export function useToast() {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([])

  useEffect(() => {
    const handleToast = (event: Event) => {
      const { title, description, duration } = (event as CustomEvent).detail
      const id = Math.random().toString(36).substring(2, 9)
      setToasts((prev) => [...prev, { id, title, description, duration }])

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
      }, duration)
    }

    window.addEventListener("toast", handleToast)
    return () => window.removeEventListener("toast", handleToast)
  }, [])

  return toasts
}

