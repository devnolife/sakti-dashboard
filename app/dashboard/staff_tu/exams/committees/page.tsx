import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Komite Penguji | Staff TU Dashboard",
  description: "Manage exam committees for the university",
}

export default function ExamCommitteesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Komite Penguji</h1>
        <p className="text-muted-foreground">Kelola komite penguji untuk ujian akademik</p>
      </div>

      <div className="rounded-md border p-6 shadow-sm">
        <div className="flex items-center justify-center h-[400px]">
          <p className="text-muted-foreground text-center">
            Halaman ini sedang dalam pengembangan.
            <br />
            Silakan kembali lagi nanti.
          </p>
        </div>
      </div>
    </div>
  )
}

