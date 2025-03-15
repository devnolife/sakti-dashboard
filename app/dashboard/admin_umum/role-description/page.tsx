import StaffUmumRoleDescription from "@/components/admin-umum/role-description"

export default function StaffUmumRoleDescriptionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Deskripsi Peran Administrasi Umum
          </span>
        </h2>
        <p className="mt-2 text-muted-foreground">
          Informasi lengkap tentang tanggung jawab dan lingkup tugas Administrasi Umum
        </p>
      </div>

      <StaffUmumRoleDescription />
    </div>
  )
}

