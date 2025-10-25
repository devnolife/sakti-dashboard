"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Copy,
  Download,
  Eye,
  Search,
  Filter,
  Settings,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Template {
  id: string
  name: string
  description: string
  category: string
  format: "PDF" | "DOCX" | "HTML"
  status: "active" | "draft"
  usageCount: number
  lastModified: string
  createdBy: string
}

export default function DocumentTemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  const templates: Template[] = [
    {
      id: "1",
      name: "Surat Keterangan Mahasiswa Aktif",
      description: "Template surat keterangan status mahasiswa aktif",
      category: "Academic",
      format: "PDF",
      status: "active",
      usageCount: 245,
      lastModified: "2024-01-20",
      createdBy: "Admin",
    },
    {
      id: "2",
      name: "Surat Pengantar KKP",
      description: "Template surat pengantar untuk kegiatan KKP",
      category: "KKP",
      format: "DOCX",
      status: "active",
      usageCount: 189,
      lastModified: "2024-01-18",
      createdBy: "Admin",
    },
    {
      id: "3",
      name: "Transkrip Nilai Sementara",
      description: "Template transkrip nilai sementara mahasiswa",
      category: "Academic",
      format: "PDF",
      status: "active",
      usageCount: 567,
      lastModified: "2024-01-15",
      createdBy: "Staff TU",
    },
    {
      id: "4",
      name: "Surat Rekomendasi",
      description: "Template surat rekomendasi dari dosen",
      category: "Letter",
      format: "DOCX",
      status: "active",
      usageCount: 89,
      lastModified: "2024-01-10",
      createdBy: "Dosen",
    },
    {
      id: "5",
      name: "Berita Acara Ujian",
      description: "Template berita acara pelaksanaan ujian",
      category: "Exam",
      format: "PDF",
      status: "draft",
      usageCount: 0,
      lastModified: "2024-01-19",
      createdBy: "Admin",
    },
  ]

  const templateStats = {
    total: templates.length,
    active: templates.filter(t => t.status === "active").length,
    totalUsage: templates.reduce((sum, t) => sum + t.usageCount, 0),
  }

  const handleEditTemplate = (template: Template) => {
    setSelectedTemplate(template)
    setIsDialogOpen(true)
  }

  const handleCreateTemplate = () => {
    setSelectedTemplate(null)
    setIsDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-500">Active</Badge>
    ) : (
      <Badge variant="secondary">Draft</Badge>
    )
  }

  const getFormatBadge = (format: string) => {
    const colors: Record<string, string> = {
      PDF: "bg-red-500",
      DOCX: "bg-blue-500",
      HTML: "bg-green-500",
    }
    return <Badge className={colors[format] || "bg-gray-500"}>{format}</Badge>
  }

  const categorizedTemplates = templates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = []
    }
    acc[template.category].push(template)
    return acc
  }, {} as Record<string, Template[]>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Document Templates
          </h1>
          <p className="text-muted-foreground mt-1">
            Kelola template dokumen untuk generate otomatis
          </p>
        </div>
        <Button onClick={handleCreateTemplate}>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templateStats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">Available templates</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templateStats.active}</div>
            <p className="text-xs text-muted-foreground mt-1">Ready to use</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templateStats.totalUsage}</div>
            <p className="text-xs text-muted-foreground mt-1">Documents generated</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.keys(categorizedTemplates).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Template categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Templates List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Templates</TabsTrigger>
          {Object.keys(categorizedTemplates).map((category) => (
            <TabsTrigger key={category} value={category.toLowerCase()}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Templates</CardTitle>
                  <CardDescription>Manage your document templates</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search templates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {template.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{template.category}</Badge>
                      </TableCell>
                      <TableCell>{getFormatBadge(template.format)}</TableCell>
                      <TableCell>{getStatusBadge(template.status)}</TableCell>
                      <TableCell className="font-mono">{template.usageCount}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {template.lastModified}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" title="Preview">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditTemplate(template)}
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Duplicate">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Download">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Delete">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {Object.entries(categorizedTemplates).map(([category, items]) => (
          <TabsContent key={category} value={category.toLowerCase()} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {items.map((template) => (
                <Card key={template.id} className="hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex items-center gap-2">
                        {getFormatBadge(template.format)}
                        {getStatusBadge(template.status)}
                      </div>
                    </div>
                    <CardTitle className="mt-4 line-clamp-2">{template.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Used</span>
                      <span className="font-medium">{template.usageCount} times</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleEditTemplate(template)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Template Editor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedTemplate ? "Edit Template" : "Create New Template"}
            </DialogTitle>
            <DialogDescription>
              {selectedTemplate
                ? "Edit template content and settings"
                : "Create a new document template"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Template Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Surat Keterangan Aktif"
                  defaultValue={selectedTemplate?.name}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue={selectedTemplate?.category || "academic"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="kkp">KKP</SelectItem>
                    <SelectItem value="letter">Letter</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Brief description of the template"
                defaultValue={selectedTemplate?.description}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="format">Output Format</Label>
                <Select defaultValue={selectedTemplate?.format || "PDF"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="DOCX">DOCX</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={selectedTemplate?.status || "draft"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Template Content</Label>
              <Textarea
                id="content"
                placeholder="Enter template content with placeholders like {{name}}, {{date}}, etc."
                className="min-h-[300px] font-mono text-sm"
                defaultValue={`<!DOCTYPE html>
<html>
<head>
  <title>{{title}}</title>
</head>
<body>
  <h1>{{header}}</h1>
  <p>Dengan ini menerangkan bahwa:</p>
  <p>Nama: {{name}}</p>
  <p>NIM: {{nim}}</p>
  <p>Program Studi: {{program}}</p>
</body>
</html>`}
              />
            </div>

            <Card className="bg-muted">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Available Placeholders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-3 text-sm font-mono">
                  <div>{"{{name}}"}</div>
                  <div>{"{{nim}}"}</div>
                  <div>{"{{email}}"}</div>
                  <div>{"{{program}}"}</div>
                  <div>{"{{date}}"}</div>
                  <div>{"{{semester}}"}</div>
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>
              {selectedTemplate ? "Save Changes" : "Create Template"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

