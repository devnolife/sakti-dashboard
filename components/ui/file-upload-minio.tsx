"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { uploadFile } from "@/lib/upload-helper"
import { Upload, X, FileText, Image as ImageIcon, CheckCircle, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface FileUploadMinioProps {
  label?: string
  accept?: string
  maxSize?: number // in MB
  onUploadComplete: (url: string, fileName: string) => void
  currentFile?: { name: string; url: string } | null
  onRemove?: () => void
}

export function FileUploadMinio({
  label = "Upload File",
  accept = "*/*",
  maxSize = 10,
  onUploadComplete,
  currentFile,
  onRemove,
}: FileUploadMinioProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "File terlalu besar",
        description: `Ukuran maksimal file adalah ${maxSize}MB`,
        variant: "destructive",
      })
      return
    }

    // Show preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }

    // Upload to MinIO
    setUploading(true)
    try {
      const fileUrl = await uploadFile(file)

      toast({
        title: "Berhasil",
        description: "File berhasil diupload",
      })

      onUploadComplete(fileUrl, file.name)
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: "Gagal upload",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        variant: "destructive",
      })
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onRemove?.()
  }

  const getFileIcon = (fileName?: string) => {
    if (!fileName) return <FileText className="w-4 h-4" />
    const ext = fileName.split('.').pop()?.toLowerCase()
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) {
      return <ImageIcon className="w-4 h-4" />
    }
    return <FileText className="w-4 h-4" />
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {currentFile || preview ? (
        <div className="relative p-4 border rounded-lg bg-muted/30">
          <div className="flex items-center gap-3">
            {preview ? (
              <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-background border">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                {getFileIcon(currentFile?.name)}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {currentFile?.name || "Uploaded file"}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <CheckCircle className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">File uploaded</span>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              disabled={uploading}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {preview && currentFile?.url && (
            <a
              href={currentFile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline mt-2 inline-block"
            >
              Lihat file
            </a>
          )}
        </div>
      ) : (
        <div className="relative">
          <Input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
            id={`file-upload-${label}`}
          />
          <label
            htmlFor={`file-upload-${label}`}
            className={`
              flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed rounded-lg
              cursor-pointer transition-colors hover:bg-muted/50
              ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm">Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                <span className="text-sm">
                  Click to upload atau drag & drop
                  <span className="block text-xs text-muted-foreground mt-1">
                    Max {maxSize}MB
                  </span>
                </span>
              </>
            )}
          </label>
        </div>
      )}
    </div>
  )
}
