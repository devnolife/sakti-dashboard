"use client"

import { useState, useEffect } from "react"
import { CorrespondenceProdiDashboard } from "@/components/correspondence/correspondence-prodi-dashboard"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProdiCorrespondencePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container py-6 mx-auto">
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[350px]" />
          <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
            <Skeleton className="h-[180px] rounded-lg" />
            <Skeleton className="h-[180px] rounded-lg" />
            <Skeleton className="h-[180px] rounded-lg" />
          </div>
          <Skeleton className="h-[450px] rounded-lg mt-6" />
        </div>
      ) : (
        <CorrespondenceProdiDashboard />
      )}
    </div>
  )
}

