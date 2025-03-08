"use client"

import type React from "react"

import { useState } from "react"
import { FileUp, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"

interface PracticumGradesImportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function PracticumGradesImportDialog({ open, onOpenChange }: PracticumGradesImportDialogProps) {
  const [importMethod, setImportMethod] = useState<"file" | "paste">("file")
  const [csvContent, setCsvContent] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])

      // Read file content for preview
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setCsvContent(event.target.result as string)
        }
      }
      reader.readAsText(e.target.files[0])
    }
  }

  const handleImport = () => {
    // Here you would typically parse the CSV and send to your backend
    toast({
      title: "Grades imported successfully",
      description: "The grades have been imported successfully.",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Import Grades</DialogTitle>
          <DialogDescription>Import grades from a CSV file or paste CSV content directly.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="file" onValueChange={(v) => setImportMethod(v as "file" | "paste")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">Upload File</TabsTrigger>
            <TabsTrigger value="paste">Paste CSV</TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="space-y-4">
            <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center">
              <FileUp className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">Drag and drop a CSV file, or click to browse</p>
              <Input type="file" accept=".csv" onChange={handleFileChange} className="hidden" id="file-upload" />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Button variant="secondary" type="button">
                  Browse Files
                </Button>
              </Label>
              {selectedFile && (
                <p className="text-sm mt-2">
                  Selected file: <span className="font-medium">{selectedFile.name}</span>
                </p>
              )}
            </div>

            {csvContent && (
              <div>
                <Label className="text-sm">File Preview</Label>
                <pre className="mt-1 p-2 rounded-md bg-muted whitespace-pre-wrap text-xs max-h-40 overflow-auto">
                  {csvContent.slice(0, 500)}
                  {csvContent.length > 500 && "..."}
                </pre>
              </div>
            )}

            <div className="text-sm text-muted-foreground space-y-1">
              <p>Required CSV format:</p>
              <p className="font-mono text-xs">
                Student ID,Student Name,Lab Section,Midterm Score,Final Score,Assignment Score,Lab Report
                Score,Attendance Score
              </p>
              <p className="font-mono text-xs">1234567,John Doe,Lab A,85,90,88,92,95</p>
            </div>
          </TabsContent>

          <TabsContent value="paste" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="csv-content">Paste CSV Content</Label>
              <Textarea
                id="csv-content"
                placeholder="Paste your CSV content here..."
                value={csvContent}
                onChange={(e) => setCsvContent(e.target.value)}
                rows={10}
              />
            </div>

            <div className="text-sm text-muted-foreground space-y-1">
              <p>Required CSV format:</p>
              <p className="font-mono text-xs">
                Student ID,Student Name,Lab Section,Midterm Score,Final Score,Assignment Score,Lab Report
                Score,Attendance Score
              </p>
              <p className="font-mono text-xs">1234567,John Doe,Lab A,85,90,88,92,95</p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={!csvContent.trim()}>
            <Upload className="mr-2 h-4 w-4" />
            Import Grades
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

