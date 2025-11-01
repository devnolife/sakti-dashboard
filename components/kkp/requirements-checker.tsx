'use client'

import { useState, useEffect } from 'react'
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
  Loader2
} from 'lucide-react'
import { getKkpRequirementsByProdi, type KkpRequirement } from '@/app/actions/kkp-actions'

export default function KkpRequirementsChecker() {
  const [requirements, setRequirements] = useState<KkpRequirement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRequirements()
  }, [])

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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Syarat Pengajuan KKP
          </CardTitle>
          <CardDescription>
            Pastikan semua syarat terpenuhi sebelum mengajukan KKP
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button onClick={fetchRequirements} className="mt-4" variant="outline">
            Coba Lagi
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (requirements.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Syarat Pengajuan KKP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Tidak ada syarat yang ditemukan untuk program studi Anda
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Syarat Pengajuan KKP
        </CardTitle>
        <CardDescription>
          Pastikan semua syarat terpenuhi sebelum mengajukan KKP
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requirements.map((req, index) => (
            <div
              key={req.id}
              className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{req.nama}</h4>
                  <Badge variant="outline" className="ml-2">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Belum Dicek
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {req.is_upload_file && (
                    <span className="flex items-center gap-1">
                      <Upload className="h-3 w-3" />
                      Upload File
                    </span>
                  )}
                  {req.url_check && (
                    <span className="flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      Validasi Online
                    </span>
                  )}
                </div>

                {req.is_upload_file && (
                  <Button size="sm" variant="outline" className="mt-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                )}

                {req.url_check && (
                  <Button size="sm" variant="outline" className="mt-2" asChild>
                    <a href={req.url_check} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Cek Status
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900">Informasi</p>
              <p className="text-blue-700 mt-1">
                Total {requirements.length} syarat yang harus dipenuhi sebelum mengajukan KKP.
                Pastikan semua dokumen dan persyaratan sudah lengkap.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

