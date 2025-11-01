'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RefreshCw, CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import { toast } from 'sonner'

interface SyncStatus {
  nidn: string
  nama: string
  lastSync: string | null
  hoursSinceSync: number | null
  needsSync: boolean
  dataComplete: boolean
}

export function DosenDataSync() {
  const [loading, setLoading] = useState(false)
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  // Fetch sync status
  const fetchSyncStatus = async () => {
    try {
      const response = await fetch('/api/dosen/sync')
      if (response.ok) {
        const data = await response.json()
        setSyncStatus(data)
        setShowDetails(true)
      } else {
        console.error('Failed to fetch sync status')
      }
    } catch (error) {
      console.error('Error fetching sync status:', error)
    }
  }

  // Trigger manual sync
  const handleSync = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/dosen/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nidn: syncStatus?.nidn,
          force: true
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast.success('Data dosen berhasil disinkronkan!')
        await fetchSyncStatus() // Refresh status
      } else {
        // If already synced, show info instead of error
        if (data.error?.includes('already') || data.error?.includes('up to date')) {
          toast.info('Data sudah up to date', {
            description: data.error
          })
        } else {
          toast.error('Gagal sinkronisasi data', {
            description: data.error || 'Terjadi kesalahan'
          })
        }
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat sinkronisasi')
      console.error('Sync error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sinkronisasi Data</CardTitle>
            <CardDescription>
              Sinkronkan data Anda dari sistem akademik pusat
            </CardDescription>
          </div>
          {syncStatus && (
            <Badge variant={syncStatus.dataComplete ? 'default' : 'secondary'}>
              {syncStatus.dataComplete ? (
                <><CheckCircle2 className="mr-1 h-3 w-3" /> Lengkap</>
              ) : (
                <><AlertCircle className="mr-1 h-3 w-3" /> Perlu Update</>
              )}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showDetails ? (
          <Button
            onClick={fetchSyncStatus}
            variant="outline"
            className="w-full"
          >
            <Clock className="mr-2 h-4 w-4" />
            Cek Status Sinkronisasi
          </Button>
        ) : syncStatus ? (
          <>
            <div className="space-y-2 rounded-lg border p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">NIDN</span>
                <span className="font-medium">{syncStatus.nidn}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Nama</span>
                <span className="font-medium">{syncStatus.nama}</span>
              </div>
              {syncStatus.lastSync && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Terakhir Sync</span>
                    <span className="font-medium">
                      {new Date(syncStatus.lastSync).toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  {syncStatus.hoursSinceSync !== null && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Waktu Sejak Sync</span>
                      <span className="font-medium">
                        {syncStatus.hoursSinceSync < 1
                          ? 'Kurang dari 1 jam'
                          : `${syncStatus.hoursSinceSync} jam yang lalu`
                        }
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>

            {syncStatus.needsSync && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Data Anda belum disinkronkan dalam 24 jam terakhir atau data belum lengkap.
                  Silakan lakukan sinkronisasi untuk mendapatkan data terbaru.
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleSync}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Menyinkronkan...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sinkronkan Sekarang
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Data akan otomatis disinkronkan setiap kali Anda login
            </p>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}
