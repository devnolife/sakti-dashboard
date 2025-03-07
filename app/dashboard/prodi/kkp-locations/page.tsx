import { getKkpLocationRequests } from "@/app/actions/kkp-location-actions"
import KkpLocationRequestsDashboard from "@/components/kkp/location-requests-dashboard"

export default async function KkpLocationsPage() {
  const locationRequests = await getKkpLocationRequests()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Persetujuan Lokasi KKP
          </span>
        </h1>
        <p className="text-muted-foreground mt-2">Kelola dan tinjau permintaan lokasi KKP baru dari mahasiswa</p>
      </div>

      <KkpLocationRequestsDashboard initialRequests={locationRequests} />
    </div>
  )
}

