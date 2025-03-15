import StaffUmumRoleDescription from "@/components/admin-umum/role-description"

export default function StaffUmumRoleDescriptionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Deskripsi Peran Staff Umum
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">
          Informasi lengkap tentang tanggung jawab dan lingkup tugas Staff Umum
        </p>
      </div>

      <StaffUmumRoleDescription />
    </div>
  )
}

