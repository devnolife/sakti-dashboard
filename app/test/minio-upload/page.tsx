"use client"

import { useState } from "react"
import { FileUploadMinio } from "@/components/ui/file-upload-minio"
import { uploadFile } from "@/lib/upload-helper"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Upload, FileText, Copy, ExternalLink } from "lucide-react"

export default function MinIOTestPage() {
  // Test 1: Using Component
  const [componentFile, setComponentFile] = useState<{name: string, url: string} | null>(null)

  // Test 2: Manual Upload
  const [manualFile, setManualFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [manualUrl, setManualUrl] = useState<string | null>(null)

  const handleManualUpload = async () => {
    if (!manualFile) return

    setUploading(true)
    try {
      const url = await uploadFile(manualFile)
      setManualUrl(url)

      toast({
        title: "Upload Berhasil!",
        description: `File ${manualFile.name} berhasil diupload ke MinIO`,
      })
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: "Upload Gagal",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">MinIO Upload Test</h1>
        <p className="text-muted-foreground">
          Test upload file ke MinIO server (Bucket: simtekmu)
        </p>
      </div>

      <Tabs defaultValue="component" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="component">Upload Component</TabsTrigger>
          <TabsTrigger value="manual">Manual Upload</TabsTrigger>
        </TabsList>

        {/* Test 1: Using Component */}
        <TabsContent value="component" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Test 1: FileUploadMinio Component
              </CardTitle>
              <CardDescription>
                Cara termudah - pakai component yang sudah jadi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FileUploadMinio
                label="Upload File (PDF atau Gambar)"
                accept="application/pdf,image/*"
                maxSize={10}
                onUploadComplete={(url, name) => {
                  setComponentFile({ name, url })
                  toast({
                    title: "Upload Berhasil!",
                    description: `File ${name} berhasil diupload`,
                  })
                }}
                currentFile={componentFile}
                onRemove={() => setComponentFile(null)}
              />

              {componentFile && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-green-900">File Uploaded Successfully!</h3>
                        <div className="space-y-1 text-sm">
                          <p><strong>Filename:</strong> {componentFile.name}</p>
                          <p><strong>URL:</strong></p>
                          <code className="block p-2 bg-white rounded text-xs break-all">
                            {componentFile.url}
                          </code>
                        </div>

                        {/* Preview */}
                        <div className="mt-4">
                          <p className="font-semibold mb-2">Preview:</p>
                          {componentFile.name.toLowerCase().endsWith('.pdf') ? (
                            <iframe
                              src={componentFile.url}
                              className="w-full border rounded"
                              style={{ height: '500px' }}
                            />
                          ) : (
                            <img
                              src={componentFile.url}
                              alt="Preview"
                              className="max-w-full rounded border"
                            />
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(componentFile.url, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Open in New Tab
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(componentFile.url)
                              toast({ title: "URL copied to clipboard!" })
                            }}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy URL
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Test 2: Manual Upload */}
        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Test 2: Manual Upload
              </CardTitle>
              <CardDescription>
                Upload dengan custom UI menggunakan uploadFile() function
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select File
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setManualFile(file)
                      setManualUrl(null)
                    }
                  }}
                  accept="application/pdf,image/*"
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0 file:text-sm file:font-semibold
                    file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>

              {manualFile && !manualUrl && (
                <div className="p-4 border rounded-lg bg-muted/50">
                  <p className="text-sm mb-3">
                    <strong>Selected:</strong> {manualFile.name}
                    <span className="text-muted-foreground ml-2">
                      ({(manualFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </p>
                  <Button
                    onClick={handleManualUpload}
                    disabled={uploading}
                    className="w-full"
                  >
                    {uploading ? (
                      <>
                        <Upload className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload to MinIO
                      </>
                    )}
                  </Button>
                </div>
              )}

              {manualUrl && manualFile && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-green-900">Upload Success!</h3>
                        <div className="space-y-1 text-sm">
                          <p><strong>Filename:</strong> {manualFile.name}</p>
                          <p><strong>URL:</strong></p>
                          <code className="block p-2 bg-white rounded text-xs break-all">
                            {manualUrl}
                          </code>
                        </div>

                        {/* Preview */}
                        <div className="mt-4">
                          <p className="font-semibold mb-2">Preview:</p>
                          {manualFile.type === 'application/pdf' ? (
                            <iframe
                              src={manualUrl}
                              className="w-full border rounded"
                              style={{ height: '500px' }}
                            />
                          ) : (
                            <img
                              src={manualUrl}
                              alt="Preview"
                              className="max-w-full rounded border"
                            />
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(manualUrl, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Open in New Tab
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(manualUrl)
                              toast({ title: "URL copied!" })
                            }}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy URL
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setManualFile(null)
                              setManualUrl(null)
                            }}
                          >
                            Upload Another
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* MinIO Info */}
      <Card className="mt-8 bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">MinIO Configuration</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-900">
          <div className="grid grid-cols-2 gap-2">
            <div><strong>Endpoint:</strong></div>
            <div>103.151.145.21:990</div>

            <div><strong>Bucket:</strong></div>
            <div>simtekmu</div>

            <div><strong>SSL:</strong></div>
            <div>false (HTTP)</div>

            <div><strong>Status:</strong></div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Connected
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
