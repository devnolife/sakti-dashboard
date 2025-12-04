"use client";

import { useEffect, useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { X, CheckCircle2, AlertCircle, Info, Package } from "lucide-react";

export function Toaster() {
  const { toasts, dismiss } = useToast();
  const [toastProgress, setToastProgress] = useState<Record<string, number>>(
    {}
  );
  const [pausedToasts, setPausedToasts] = useState<Set<string>>(new Set());
  const timersRef = useRef<
    Record<string, { progress: NodeJS.Timeout; dismiss: NodeJS.Timeout }>
  >({});

  // Auto-dismiss toasts after their duration
  useEffect(() => {
    toasts.forEach((toast) => {
      if (
        toast.duration &&
        toast.duration > 0 &&
        !timersRef.current[toast.id]
      ) {
        // Reset progress for new toasts
        setToastProgress((prev) => ({ ...prev, [toast.id]: 100 }));

        const startTime = Date.now();
        let remainingDuration = toast.duration;

        // Update progress bar
        const progressInterval = setInterval(() => {
          if (!pausedToasts.has(toast.id)) {
            setToastProgress((prev) => {
              const currentProgress = prev[toast.id] || 100;
              const decrement = (100 / toast.duration!) * 50; // Update every 50ms
              const newProgress = Math.max(0, currentProgress - decrement);
              return { ...prev, [toast.id]: newProgress };
            });
          }
        }, 50);

        // Dismiss after duration
        const dismissTimer = setTimeout(() => {
          dismiss(toast.id);
          setToastProgress((prev) => {
            const newProgress = { ...prev };
            delete newProgress[toast.id];
            return newProgress;
          });
          delete timersRef.current[toast.id];
        }, toast.duration);

        timersRef.current[toast.id] = {
          progress: progressInterval,
          dismiss: dismissTimer,
        };
      }
    });

    return () => {
      Object.values(timersRef.current).forEach(({ progress, dismiss }) => {
        clearInterval(progress);
        clearTimeout(dismiss);
      });
    };
  }, [toasts, dismiss, pausedToasts]);

  if (!toasts.length) return null;

  // Determine icon and color based on toast title
  const getToastStyle = (title: React.ReactNode) => {
    const titleStr = typeof title === "string" ? title : String(title);

    if (
      titleStr.includes("✅") ||
      titleStr.toLowerCase().includes("berhasil") ||
      titleStr.toLowerCase().includes("tersimpan")
    ) {
      return {
        icon: (
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0" />
        ),
        className:
          "border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-800",
      };
    } else if (
      titleStr.includes("📦") ||
      titleStr.toLowerCase().includes("zip") ||
      titleStr.toLowerCase().includes("download")
    ) {
      return {
        icon: (
          <Package className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
        ),
        className:
          "border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800",
      };
    } else if (
      titleStr.includes("❌") ||
      titleStr.toLowerCase().includes("gagal") ||
      titleStr.toLowerCase().includes("error")
    ) {
      return {
        icon: (
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0" />
        ),
        className:
          "border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800",
      };
    } else {
      return {
        icon: (
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
        ),
        className:
          "border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800",
      };
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 w-full max-w-md pointer-events-none">
      {toasts.map((toastItem) => {
        const style = getToastStyle(toastItem.title);
        const titleStr =
          typeof toastItem.title === "string"
            ? toastItem.title
            : String(toastItem.title);

        return (
          <div
            key={toastItem.id}
            className={`pointer-events-auto rounded-lg shadow-lg border p-4 transition-all duration-300 ${
              toastItem.open !== false
                ? "animate-in slide-in-from-right-full"
                : "animate-out fade-out-0 slide-out-to-right-full"
            } ${style.className}`}
            onMouseEnter={() => {
              setPausedToasts((prev) => new Set(prev).add(toastItem.id));
            }}
            onMouseLeave={() => {
              setPausedToasts((prev) => {
                const newSet = new Set(prev);
                newSet.delete(toastItem.id);
                return newSet;
              });
            }}
          >
            <div className="flex gap-3">
              {style.icon}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 leading-tight">
                  {titleStr.replace(/[✅❌📦]/g, "").trim()}
                </h3>
                {toastItem.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    {toastItem.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => dismiss(toastItem.id)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors shrink-0 p-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
                aria-label="Close notification"
                title="Close"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            {/* Progress bar for auto-dismiss countdown */}
            {toastItem.duration && toastItem.duration > 0 && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/30 dark:bg-gray-700/30 rounded-b-lg overflow-hidden">
                <div
                  className="h-full bg-current opacity-40 transition-all duration-75 ease-linear"
                  style={{
                    width: `${toastProgress[toastItem.id] || 100}%`,
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
