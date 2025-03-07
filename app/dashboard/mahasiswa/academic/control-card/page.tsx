import AcademicControlCard from "@/components/academic/control-card"
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
  title: "Kartu Kontrol Akademik",
  description: "Kartu kontrol untuk konsultasi dengan penasehat akademik",
}

export default function ControlCardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Kartu Kontrol Akademik</h1>
        <p className="text-muted-foreground mt-2">Kartu kontrol untuk konsultasi dengan penasehat akademik</p>
      </div>

      <AcademicControlCard />
      <Toaster />
    </div>
  )
}

