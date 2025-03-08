import type { ReactNode } from "react"
import Link from "next/link"
import { Briefcase, MapPin, FileCheck, Lightbulb, UserPlus, Clock, CheckCircle } from "lucide-react"

export default function KkpLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            KKP Management
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Manage your KKP program requirements and applications</p>
      </div>

      <div className="flex overflow-auto pb-2 scrollbar-hide">
        <div className="flex space-x-2">
          <Link
            href="/dashboard/mahasiswa/kkp"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent hover:text-accent-foreground h-9 data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-border/50"
            data-state={location.pathname === "/dashboard/mahasiswa/kkp" ? "active" : "inactive"}
          >
            <Briefcase className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/mahasiswa/kkp/in-progress"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent hover:text-accent-foreground h-9 data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-border/50"
            data-state={location.pathname === "/dashboard/mahasiswa/kkp/in-progress" ? "active" : "inactive"}
          >
            <Clock className="mr-2 h-4 w-4" />
            In KKP
          </Link>
          <Link
            href="/dashboard/mahasiswa/kkp/finished"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent hover:text-accent-foreground h-9 data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-border/50"
            data-state={location.pathname === "/dashboard/mahasiswa/kkp/finished" ? "active" : "inactive"}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Finish KKP
          </Link>
          <Link
            href="/dashboard/mahasiswa/kkp/requirements"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent hover:text-accent-foreground h-9 data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-border/50"
            data-state={location.pathname === "/dashboard/mahasiswa/kkp/requirements" ? "active" : "inactive"}
          >
            <FileCheck className="mr-2 h-4 w-4" />
            Requirements
          </Link>
          <Link
            href="/dashboard/mahasiswa/kkp/locations"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent hover:text-accent-foreground h-9 data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-border/50"
            data-state={location.pathname === "/dashboard/mahasiswa/kkp/locations" ? "active" : "inactive"}
          >
            <MapPin className="mr-2 h-4 w-4" />
            Locations
          </Link>
          <Link
            href="/dashboard/mahasiswa/kkp/pengajuan"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent hover:text-accent-foreground h-9 data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-border/50"
            data-state={location.pathname === "/dashboard/mahasiswa/kkp/pengajuan" ? "active" : "inactive"}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Pengajuan
          </Link>
          <Link
            href="/dashboard/mahasiswa/kkp/plus"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent hover:text-accent-foreground h-9 data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-border/50"
            data-state={location.pathname.startsWith("/dashboard/mahasiswa/kkp/plus") ? "active" : "inactive"}
          >
            <Lightbulb className="mr-2 h-4 w-4" />
            KKP Plus
          </Link>
        </div>
      </div>

      <div className="mt-4">{children}</div>
    </div>
  )
}

