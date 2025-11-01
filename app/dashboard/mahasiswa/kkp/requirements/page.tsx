'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Upload, 
  ExternalLink,
  FileText,
  Loader2,
  ArrowLeft,
  Info
} from 'lucide-react'
import { getKkpRequirementsByProdi, type KkpRequirement } from '@/app/actions/kkp-actions'
import Link from 'next/link'

export default function KkpRequirementsPage() {
  const { user } = useAuth()
  const [requirements, setRequirements] = useState<KkpRequirement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchRequirements()
    }
  }, [user])

  const fetchRequirements = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('🔍 Fetching KKP requirements...')
      const result = await getKkpRequirementsByProdi()
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to fetch requirements')
      }
      
      console.log('✅ Requirements loaded:', result.data.length)
      setRequirements(result.data)
    } catch (err) {
      console.error('❌ Error loading requirements:', err)
      setError(err instanceof Error ? err.message : 'Failed to load requirements')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Link href="/dashboard/mahasiswa/kkp">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Dashboard KKP
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Persyaratan Pengajuan KKP
            </CardTitle>
            <CardDescription>
              Memuat persyaratan...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Link href="/dashboard/mahasiswa/kkp">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Dashboard KKP
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-6 w-6" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchRequirements} variant="outline">
              Coba Lagi
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const completedCount = 0 // TODO: Implement requirement checking
  const totalCount = requirements.length
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/dashboard/mahasiswa/kkp">
            <Button variant="ghost" size="sm" className="mb-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Dashboard KKP
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Persyaratan Pengajuan KKP</h1>
          <p className="text-muted-foreground">
            Pastikan semua persyaratan terpenuhi sebelum mengajukan KKP
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Persyaratan</CardTitle>
          <CardDescription>
            {completedCount} dari {totalCount} persyaratan telah terpenuhi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold">{progressPercentage.toFixed(0)}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requirements List */}
      {requirements.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Tidak ada persyaratan yang ditemukan untuk program studi Anda
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {requirements.map((req, index) => (
            <Card key={req.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Number Badge */}
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-lg">{req.nama}</h3>
                        {req.logo && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Logo: {req.logo}
                          </p>
                        )}
                      </div>
                      <Badge variant="outline" className="flex-shrink-0">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Belum Dicek
                      </Badge>
                    </div>

                    {/* Requirement Type */}
                    <div className="flex flex-wrap gap-2">
                      {req.is_upload_file && (
                        <Badge variant="secondary" className="text-xs">
                          <Upload className="h-3 w-3 mr-1" />
                          Upload File
                        </Badge>
                      )}
                      {req.url_check && (
                        <Badge variant="secondary" className="text-xs">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Validasi Online
                        </Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      {req.is_upload_file && (
                        <Button size="sm" variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Dokumen
                        </Button>
                      )}

                      {req.url_check && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={req.url_check} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Cek Status Online
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900 mb-1">Informasi Penting</p>
              <ul className="text-blue-700 space-y-1 list-disc list-inside">
                <li>Total {totalCount} persyaratan yang harus dipenuhi</li>
                <li>Pastikan semua dokumen dalam format PDF (maksimal 5MB)</li>
                <li>Dokumen yang di-upload akan diverifikasi oleh staff TU</li>
                <li>Hubungi staff TU jika ada pertanyaan mengenai persyaratan</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
