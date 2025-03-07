import { getInternshipApplications } from "@/app/actions/internship-actions"
import InternshipApprovalDashboard from "@/components/internship/approval-dashboard"

export default async function InternshipApprovalPage() {
  const applications = await getInternshipApplications()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Persetujuan Magang
          </span>
        </h1>
        <p className="text-muted-foreground mt-2">Kelola dan tinjau aplikasi magang mahasiswa</p>
      </div>

      <InternshipApprovalDashboard initialApplications={applications} />
    </div>
  )
}

