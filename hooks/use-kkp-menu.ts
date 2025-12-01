import { useEffect, useState } from "react"
import { MenuItem } from "@/config/menu-items"
import {
  Briefcase,
  FileCheck,
  MapPin,
  FileText,
  Users,
  UserCheck,
  Info,
  Award,
  Star,
  BookOpen,
  Calendar,
  ClipboardList,
  Download,
} from "lucide-react"

type KkpStatus = "no_application" | "pending" | "approved" | "in_progress" | "rejected" | "completed"

interface KkpMenuHookReturn {
  menuItems: MenuItem[]
  isLoading: boolean
  error: string | null
  status: KkpStatus | null
}

/**
 * Hook untuk mendapatkan menu KKP yang dinamis berdasarkan status mahasiswa
 */
export function useKkpMenu(): KkpMenuHookReturn {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<KkpStatus | null>(null)

  useEffect(() => {
    fetchKkpStatusAndGenerateMenu()
  }, [])

  const fetchKkpStatusAndGenerateMenu = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/student/kkp/status")

      if (!response.ok) {
        throw new Error("Failed to fetch KKP status")
      }

      const data = await response.json()
      const kkpStatus: KkpStatus = data.status

      setStatus(kkpStatus)
      setMenuItems(generateKkpMenuByStatus(kkpStatus))
    } catch (err) {
      console.error("Error fetching KKP status for menu:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
      // Default to no_application menu on error
      setMenuItems(generateKkpMenuByStatus("no_application"))
    } finally {
      setIsLoading(false)
    }
  }

  return {
    menuItems,
    isLoading,
    error,
    status,
  }
}

/**
 * Generate menu items berdasarkan status KKP
 */
function generateKkpMenuByStatus(status: KkpStatus): MenuItem[] {
  const baseMenuItem: MenuItem = {
    id: "kkp",
    title: "KKP",
    href: "/dashboard/mahasiswa/kkp",
    icon: Briefcase,
  }

  switch (status) {
    case "no_application":
      // Belum daftar KKP - Menu sederhana: Dashboard (berisi info & persyaratan), Lokasi, Pengajuan
      baseMenuItem.children = [
        {
          id: "kkp-dashboard",
          title: "Dashboard",
          href: "/dashboard/mahasiswa/kkp",
        },
        {
          id: "kkp-locations",
          title: "Lokasi KKP",
          href: "/dashboard/mahasiswa/kkp/lokasi",
          icon: MapPin,
        },
        {
          id: "kkp-apply",
          title: "Pengajuan KKP",
          href: "/dashboard/mahasiswa/kkp/pengajuan",
          icon: FileText,
        },
      ]
      break

    case "pending":
    case "approved":
    case "in_progress":
      // Sedang KKP - fokus pada tracking dan dokumen
      baseMenuItem.children = [
        {
          id: "kkp-dashboard",
          title: "Dashboard",
          href: "/dashboard/mahasiswa/kkp",
        },
        {
          id: "kkp-application",
          title: "Detail Pengajuan",
          href: "/dashboard/mahasiswa/kkp/application",
          icon: FileText,
        },
        {
          id: "kkp-documents",
          title: "Dokumen",
          href: "/dashboard/mahasiswa/kkp/documents",
          icon: FileText,
        },
        {
          id: "kkp-supervisor",
          title: "Pembimbing",
          href: "/dashboard/mahasiswa/kkp/supervisors",
          icon: UserCheck,
        },
        {
          id: "kkp-progress",
          title: "Progres KKP",
          href: "/dashboard/mahasiswa/kkp/progress",
          icon: ClipboardList,
        },
        {
          id: "kkp-logbook",
          title: "Logbook",
          href: "/dashboard/mahasiswa/kkp/logbook",
          icon: Calendar,
        },
        {
          id: "kkp-team",
          title: "Tim Kelompok",
          href: "/dashboard/mahasiswa/kkp/team",
          icon: Users,
        },
      ]
      break

    case "completed":
      // Sudah selesai KKP - fokus pada dokumen akhir dan sertifikat
      baseMenuItem.children = [
        {
          id: "kkp-dashboard",
          title: "Dashboard",
          href: "/dashboard/mahasiswa/kkp",
        },
        {
          id: "kkp-certificate",
          title: "Sertifikat",
          href: "/dashboard/mahasiswa/kkp/certificate",
          icon: Award,
        },
        {
          id: "kkp-documents",
          title: "Dokumen KKP",
          href: "/dashboard/mahasiswa/kkp/documents",
          icon: FileText,
        },
        {
          id: "kkp-final-report",
          title: "Laporan Akhir",
          href: "/dashboard/mahasiswa/kkp/final-report",
          icon: Download,
        },
        {
          id: "kkp-evaluation",
          title: "Evaluasi & Nilai",
          href: "/dashboard/mahasiswa/kkp/evaluation",
          icon: Star,
        },
        {
          id: "kkp-feedback",
          title: "Feedback",
          href: "/dashboard/mahasiswa/kkp/feedback",
          icon: Info,
        },
      ]
      break

    case "rejected":
      // Ditolak - fokus pada perbaikan dan pengajuan ulang
      baseMenuItem.children = [
        {
          id: "kkp-dashboard",
          title: "Dashboard",
          href: "/dashboard/mahasiswa/kkp",
        },
        {
          id: "kkp-rejection",
          title: "Status Penolakan",
          href: "/dashboard/mahasiswa/kkp/rejection",
          icon: Info,
        },
        {
          id: "kkp-requirements",
          title: "Perbaiki Persyaratan",
          href: "/dashboard/mahasiswa/kkp/requirements",
          icon: FileCheck,
        },
        {
          id: "kkp-reapply",
          title: "Ajukan Ulang",
          href: "/dashboard/mahasiswa/kkp/reapply",
          icon: FileText,
        },
      ]
      break

    default:
      // Default menu
      baseMenuItem.children = [
        {
          id: "kkp-dashboard",
          title: "Dashboard",
          href: "/dashboard/mahasiswa/kkp",
        },
      ]
  }

  return [baseMenuItem]
}

/**
 * Export function untuk generate menu secara langsung tanpa hook
 * Berguna untuk server-side atau static generation
 */
export function getKkpMenuByStatus(status: KkpStatus): MenuItem[] {
  return generateKkpMenuByStatus(status)
}
