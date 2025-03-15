"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Download, Printer } from "lucide-react"

interface ThesisExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ThesisExportDialog({ open, onOpenChange }: ThesisExportDialogProps) {
  const [format, setFormat] = useState("pdf")
  const [status, setStatus] = useState("all")
  const [includeFields, setIncludeFields] = useState({
    title: true,
    author: true,
    department: true,
    year: true,
    status: true,
    abstract: true,
    keywords: true,
    similarityScore: true,
    supervisor: true,
  })

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: `Exporting thesis data in ${format.toUpperCase()} format.`,
    })
    onOpenChange(false)
  }

  const handlePrint = () => {
    toast({
      title: "Print Prepared",
      description: "Preparing thesis data for printing.",
    })
    onOpenChange(false)
  }

  const toggleField = (field: keyof typeof includeFields) => {
    setIncludeFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Export Thesis Data</DialogTitle>
          <DialogDescription>Choose your export options and download thesis data.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="format">Export Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger id="format">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                <SelectItem value="csv">CSV File</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Thesis Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending Only</SelectItem>
                <SelectItem value="approved">Approved Only</SelectItem>
                <SelectItem value="rejected">Rejected Only</SelectItem>
                <SelectItem value="archived">Archived Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Include Fields</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="title" checked={includeFields.title} onCheckedChange={() => toggleField("title")} />
                <Label htmlFor="title" className="text-sm">
                  Title
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="author" checked={includeFields.author} onCheckedChange={() => toggleField("author")} />
                <Label htmlFor="author" className="text-sm">
                  Author
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="department"
                  checked={includeFields.department}
                  onCheckedChange={() => toggleField("department")}
                />
                <Label htmlFor="department" className="text-sm">
                  Department
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="year" checked={includeFields.year} onCheckedChange={() => toggleField("year")} />
                <Label htmlFor="year" className="text-sm">
                  Year
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="status" checked={includeFields.status} onCheckedChange={() => toggleField("status")} />
                <Label htmlFor="status" className="text-sm">
                  Status
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="abstract"
                  checked={includeFields.abstract}
                  onCheckedChange={() => toggleField("abstract")}
                />
                <Label htmlFor="abstract" className="text-sm">
                  Abstract
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="keywords"
                  checked={includeFields.keywords}
                  onCheckedChange={() => toggleField("keywords")}
                />
                <Label htmlFor="keywords" className="text-sm">
                  Keywords
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="similarityScore"
                  checked={includeFields.similarityScore}
                  onCheckedChange={() => toggleField("similarityScore")}
                />
                <Label htmlFor="similarityScore" className="text-sm">
                  Similarity Score
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="supervisor"
                  checked={includeFields.supervisor}
                  onCheckedChange={() => toggleField("supervisor")}
                />
                <Label htmlFor="supervisor" className="text-sm">
                  Supervisor
                </Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handlePrint} className="sm:mr-auto">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

