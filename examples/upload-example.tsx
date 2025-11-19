"use client"

import { useState } from "react"
import { FileUploadMinio } from "@/components/ui/file-upload-minio"
import { uploadFile } from "@/lib/upload-helper"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

/**
 * Example: Cara pakai MinIO upload
 * Copy paste code ini ke form Anda
 */

export default function UploadExample() {
  // ============================================
  // OPTION 1: Pakai Component (Paling Mudah!)
  // ============================================
  const [skDocument, setSkDocument] = useState<{name: string, url: string} | null>(null)

  return (
    <div className="space-y-8 p-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Option 1: Pakai Component FileUploadMinio</h2>

        <FileUploadMinio
          label="Upload SK PNS/ASN"
          accept="application/pdf"
          maxSize={10}
          onUploadComplete={(url, fileName) => {
            // File berhasil diupload, URL sudah ada!
            setSkDocument({ name: fileName, url: url })

            // Simpan ke form data
            console.log('File uploaded:', { name: fileName, url: url })

            toast({
              title: "Upload berhasil!",
              description: `File ${fileName} berhasil diupload`,
            })
          }}
          currentFile={skDocument}
          onRemove={() => setSkDocument(null)}
        />

        {/* Show hasil upload */}
        {skDocument && (
          <div className="p-4 border rounded">
            <h3 className="font-semibold mb-2">File Uploaded:</h3>
            <p className="text-sm">Name: {skDocument.name}</p>
            <p className="text-sm">URL: {skDocument.url}</p>

            {/* Preview PDF */}
            <iframe
              src={skDocument.url}
              className="w-full mt-4 border"
              style={{ height: '400px' }}
            />
          </div>
        )}
      </div>

      <hr />

      {/* ============================================
           OPTION 2: Manual Upload (Custom UI)
           ============================================ */}
      <ManualUploadExample />
    </div>
  )
}

// ============================================
// OPTION 2: Manual Upload dengan custom UI
// ============================================
function ManualUploadExample() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setUploadedUrl(null) // Reset previous upload
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    try {
      // Upload ke MinIO
      const fileUrl = await uploadFile(file)

      // Simpan URL
      setUploadedUrl(fileUrl)

      toast({
        title: "Upload berhasil!",
        description: `File ${file.name} berhasil diupload`,
      })

      // TODO: Simpan fileUrl ke database
      console.log('File URL:', fileUrl)

    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: "Upload gagal",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Option 2: Manual Upload (Custom UI)</h2>

      <div className="space-y-2">
        <input
          type="file"
          onChange={handleFileChange}
          accept="application/pdf,image/*"
          className="block w-full text-sm"
        />

        {file && (
          <div className="flex items-center gap-2">
            <p className="text-sm">Selected: {file.name}</p>
            <Button
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload to MinIO'}
            </Button>
          </div>
        )}

        {uploadedUrl && (
          <div className="p-4 border rounded mt-4">
            <h3 className="font-semibold mb-2">Upload Success!</h3>
            <p className="text-sm mb-2">URL: {uploadedUrl}</p>

            {/* Preview */}
            {file?.type.startsWith('image/') ? (
              <img src={uploadedUrl} alt="Uploaded" className="max-w-md" />
            ) : (
              <iframe
                src={uploadedUrl}
                className="w-full border"
                style={{ height: '400px' }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// OPTION 3: Pakai di Form dengan State
// ============================================
export function FormWithMinioUpload() {
  const [formData, setFormData] = useState({
    title: '',
    purpose: '',
    additionalInfo: {
      skDocument: null as { name: string, url: string } | null,
      supportingDocument: null as { name: string, url: string } | null,
    }
  })

  const handleSubmit = async () => {
    // formData.additionalInfo.skDocument.url sudah berisi URL MinIO
    console.log('Submit data:', formData)

    // Simpan ke database
    // const result = await submitLetterRequest({
    //   ...formData,
    //   additionalInfo: {
    //     skDocumentUrl: formData.additionalInfo.skDocument?.url,
    //     supportingDocumentUrl: formData.additionalInfo.supportingDocument?.url,
    //   }
    // })
  }

  return (
    <div className="space-y-4 p-8">
      <h2 className="text-2xl font-bold">Option 3: Integration di Form</h2>

      {/* Form fields */}
      <input
        type="text"
        placeholder="Judul"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full p-2 border rounded"
      />

      {/* File uploads */}
      <FileUploadMinio
        label="Upload SK PNS/ASN"
        accept="application/pdf"
        maxSize={10}
        onUploadComplete={(url, name) => {
          setFormData({
            ...formData,
            additionalInfo: {
              ...formData.additionalInfo,
              skDocument: { name, url }
            }
          })
        }}
        currentFile={formData.additionalInfo.skDocument}
        onRemove={() => {
          setFormData({
            ...formData,
            additionalInfo: {
              ...formData.additionalInfo,
              skDocument: null
            }
          })
        }}
      />

      <FileUploadMinio
        label="Upload Dokumen Pendukung"
        accept="application/pdf,image/*"
        maxSize={10}
        onUploadComplete={(url, name) => {
          setFormData({
            ...formData,
            additionalInfo: {
              ...formData.additionalInfo,
              supportingDocument: { name, url }
            }
          })
        }}
        currentFile={formData.additionalInfo.supportingDocument}
        onRemove={() => {
          setFormData({
            ...formData,
            additionalInfo: {
              ...formData.additionalInfo,
              supportingDocument: null
            }
          })
        }}
      />

      <Button onClick={handleSubmit}>
        Submit Form
      </Button>

      {/* Debug: Show form data */}
      <pre className="p-4 bg-gray-100 rounded text-xs">
        {JSON.stringify(formData, null, 2)}
      </pre>
    </div>
  )
}
