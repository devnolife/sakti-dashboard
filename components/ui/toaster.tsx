"use client"

import { useToast } from "@/components/ui/use-toast"
import { X } from "lucide-react"

export function Toaster() {
  const toasts = useToast()

  if (!toasts.length) return null

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 w-full max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-4 animate-in slide-in-from-right"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{toast.title}</h3>
              {toast.description && <p className="text-sm text-muted-foreground mt-1">{toast.description}</p>}
            </div>
            <button
              onClick={() => {
                const event = new CustomEvent("toast-dismiss", {
                  detail: { id: toast.id },
                })
                window.dispatchEvent(event)
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

