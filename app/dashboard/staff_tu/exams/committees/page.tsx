import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Penguji | Admin Prodi ",
  description: "Manage exam committees for the university",
}

export default function ExamCommitteesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Penguji</h1>
        <p className="text-muted-foreground">Kelola penguji untuk ujian akademik</p>
      </div>

      <div className="p-6 border rounded-md shadow-sm">
        <div className="flex items-center justify-center h-[400px]">
          <p className="text-center text-muted-foreground">
            Halaman ini sedang dalam pengembangan.
            <br />
            Silakan kembali lagi nanti.
          </p>
        </div>
      </div>
    </div>
  )
}

