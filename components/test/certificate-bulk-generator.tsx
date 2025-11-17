"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Download, FileText, Eye, Award, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"

interface Recipient {
  name: string
  courseName?: string
  certificateId?: string
}

export default function CertificateBulkGenerator() {
  const router = useRouter()
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [recipients, setRecipients] = useState<Recipient[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<"lab_certificate">("lab_certificate")

  // Available templates - Lab Certificate Template only (matching lab admin)
  const availableTemplates = [
    {
      name: "Lab Certificate Template",
      templateKey: "lab_certificate" as const,
      description: "Template resmi laboratorium dengan badge, QR code, dan statistik lengkap (sesuai lab admin)",
      icon: Award,
      color: "from-blue-600 to-indigo-700"
    }
  ]

  const currentTemplate = availableTemplates.find(t => t.templateKey === selectedTemplateKey) || availableTemplates[0]

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const fileExt = file.name.split('.').pop()?.toLowerCase()
    if (fileExt !== 'csv' && fileExt !== 'txt') {
      toast({
        title: "Error",
        description: "File harus berformat CSV atau TXT",
        variant: "destructive"
      })
      return
    }

    setCsvFile(file)

    try {
      const text = await file.text()
      const lines = text.split('\n').filter(line => line.trim())

      const parsedRecipients = lines.map((line, index) => {
        const parts = line.split(',').map(p => p.trim())
        return {
          name: parts[0] || `Peserta ${index + 1}`,
          courseName: parts[1] || "Pelatihan Laboratorium",
          certificateId: parts[2] || `CERT-LAB-${new Date().getFullYear()}-${String(index + 1).padStart(3, '0')}`
        }
      })

      setRecipients(parsedRecipients)

      toast({
        title: "✅ File Berhasil Diupload",
        description: `${parsedRecipients.length} peserta siap di-generate`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal membaca file",
        variant: "destructive"
      })
    }
  }

  const handleGenerateCertificates = async () => {
    if (recipients.length === 0) {
      toast({
        title: "Error",
        description: "Upload file daftar nama terlebih dahulu",
        variant: "destructive"
      })
      return
    }

    setIsProcessing(true)

    try {
      // Simulate generation
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast({
        title: "✅ Sertifikat Berhasil Di-generate",
        description: `${recipients.length} sertifikat telah dibuat dan siap didownload`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal generate sertifikat",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const IconComponent = currentTemplate.icon

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Upload & Configuration Panel */}
      <div className="lg:col-span-3 space-y-6">
        {/* Template Info */}
        <div className="p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className={`p-3 bg-gradient-to-br ${currentTemplate.color} rounded-lg shadow-lg`}>
                <IconComponent className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 text-lg">{currentTemplate.name}</h3>
                <p className="text-sm text-blue-700 mt-1">{currentTemplate.description}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className="bg-blue-600 text-white">Template Resmi</Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/test/certificate-preview')}
                className="gap-2 bg-white"
              >
                <Eye className="w-3 h-3" />
                Preview
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="space-y-4 p-6 border rounded-lg">
          <div className="space-y-2">
            <Label htmlFor="csv-upload" className="text-base font-semibold">
              Upload Daftar Nama Peserta
            </Label>
            <p className="text-sm text-muted-foreground">
              Upload file CSV atau TXT dengan format: <code className="bg-muted px-1 py-0.5 rounded">nama,kursus,id</code>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Input
              id="csv-upload"
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="cursor-pointer"
            />
            {csvFile && (
              <Badge variant="secondary" className="flex items-center gap-2">
                <FileText className="w-3 h-3" />
                {csvFile.name}
              </Badge>
            )}
          </div>

          {/* Example Format */}
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-xs font-medium mb-2">📝 Contoh format CSV:</p>
            <pre className="text-xs overflow-x-auto">
              {`Ahmad Fauzi,Pelatihan Lab A,CERT-001
Siti Nurhaliza,Pelatihan Lab A,CERT-002
Budi Santoso,Pelatihan Lab B,CERT-003`}
            </pre>
            <p className="text-xs text-muted-foreground mt-2">
              💡 Atau format sederhana (hanya nama):
            </p>
            <pre className="text-xs">
              {`Ahmad Fauzi
Siti Nurhaliza
Budi Santoso`}
            </pre>
          </div>
        </div>

        {/* Recipients List */}
        {recipients.length > 0 && (
          <div className="space-y-4 p-6 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Daftar Peserta</h3>
                <p className="text-sm text-muted-foreground">
                  {recipients.length} peserta akan di-generate
                </p>
              </div>
              <Button
                onClick={handleGenerateCertificates}
                disabled={isProcessing}
                className="gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Generate {recipients.length} Sertifikat
                  </>
                )}
              </Button>
            </div>

            <ScrollArea className="h-64 border rounded-lg">
              <div className="p-4 space-y-2">
                {recipients.map((recipient, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer group"
                    onClick={() => {
                      const params = new URLSearchParams({
                        name: recipient.name,
                        program: recipient.courseName || '',
                        id: recipient.certificateId || ''
                      })
                      router.push(`/test/certificate-preview?${params.toString()}`)
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{recipient.name}</p>
                        <p className="text-xs text-muted-foreground">{recipient.courseName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {recipient.certificateId}
                      </Badge>
                      <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div className="lg:col-span-1">
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Info & Preview
            </CardTitle>
            <CardDescription>
              Statistik dan aksi cepat
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Peserta:</span>
                <Badge variant="secondary">{recipients.length || 0}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Template:</span>
                <span className="font-medium truncate">{currentTemplate.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant={recipients.length > 0 ? "default" : "outline"}>
                  {recipients.length > 0 ? "Siap" : "Upload"}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => router.push('/test/certificate-preview')}
              >
                <Eye className="w-3 h-3 mr-2" />
                Preview Template
                <ExternalLink className="w-3 h-3 ml-auto" />
              </Button>

              {recipients.length > 0 && (
                <div className="text-xs text-muted-foreground text-center p-2 bg-muted rounded-md">
                  💡 Klik nama peserta di list untuk preview sertifikat mereka
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
