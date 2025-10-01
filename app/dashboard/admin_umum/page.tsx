import StaffUmumDashboard from "@/components/dashboards/staff-umum-dashboard"

export default function StaffUmumDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Administrasi Umum</h1>
        <p className="text-muted-foreground">
          Kelola urusan mahasiswa non-regular dan korespondensi pimpinan.
        </p>
      </div>
      <StaffUmumDashboard activeSection="dashboard" />
    </div>
  )
}

