"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, MapPin, FileCheck, Lightbulb, UserPlus, Clock, CheckCircle } from "lucide-react"

export default function KkpLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  
  return (
    <div className="space-y-6 pt-14">
      <div className="flex pb-2 overflow-auto scrollbar-hide">
        <div className="flex space-x-2">
          <Link
            href="/dashboard/mahasiswa/kkp"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent hover:text-accent-foreground h-9 data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-border/50"
            data-state={pathname === "/dashboard/mahasiswa/kkp" ? "active" : "inactive"}
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/mahasiswa/kkp/requirements"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent hover:text-accent-foreground h-9 data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-border/50"
            data-state={pathname === "/dashboard/mahasiswa/kkp/requirements" ? "active" : "inactive"}
          >
            <FileCheck className="w-4 h-4 mr-2" />
            Persyaratan
          </Link>
          <Link
            href="/dashboard/mahasiswa/kkp/locations"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent hover:text-accent-foreground h-9 data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-border/50"
            data-state={pathname === "/dashboard/mahasiswa/kkp/locations" ? "active" : "inactive"}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Lokasi
          </Link>
          <Link
            href="/dashboard/mahasiswa/kkp/pengajuan"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent hover:text-accent-foreground h-9 data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-border/50"
            data-state={pathname === "/dashboard/mahasiswa/kkp/pengajuan" ? "active" : "inactive"}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Pengajuan
          </Link>
          <Link
            href="/dashboard/mahasiswa/kkp/plus"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent hover:text-accent-foreground h-9 data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-border/50"
            data-state={pathname.startsWith("/dashboard/mahasiswa/kkp/plus") ? "active" : "inactive"}
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            KKP Plus
          </Link>
        </div>
      </div>

      <div className="mt-4">{children}</div>
    </div>
  )
}

