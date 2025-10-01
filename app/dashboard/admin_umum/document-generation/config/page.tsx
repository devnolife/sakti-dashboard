import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Settings, Save, RotateCcw, FileText, Code } from "lucide-react"

export default function DocumentConfigPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Document Configuration</h1>
        <p className="text-muted-foreground">
          Configure document generation settings and templates
        </p>
      </div>

      {/* Configuration Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Select Configuration
          </CardTitle>
          <CardDescription>
            Choose document type and program studi to configure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="doc-type">Document Type</Label>
              <Select defaultValue="kkp">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kkp">KKP (Kerja Praktik)</SelectItem>
                  <SelectItem value="thesis">Thesis (Skripsi)</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="final-report">Final Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prodi">Program Studi</Label>
              <Select defaultValue="informatika">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="informatika">Informatika</SelectItem>
                  <SelectItem value="elektro">Elektro</SelectItem>
                  <SelectItem value="arsitektur">Arsitektur</SelectItem>
                  <SelectItem value="teknik-mesin">Teknik Mesin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Template Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Template Settings
            </CardTitle>
            <CardDescription>
              Configure document template parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                value="KKP Report Template - Informatika"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-version">Template Version</Label>
              <Input
                id="template-version"
                value="v2.1.0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-author">Template Author</Label>
              <Input
                id="template-author"
                value="Admin Team"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-description">Description</Label>
              <Textarea
                id="template-description"
                value="Standard KKP report template for Informatika students with automatic signature placement and document validation."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-green-600">Active</Badge>
                <Badge variant="outline">Latest Version</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Field Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Required Fields
            </CardTitle>
            <CardDescription>
              Configure required data fields for document generation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">nim</p>
                  <p className="text-xs text-muted-foreground">Student ID Number</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-red-600">Required</Badge>
                  <Badge variant="outline">String</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">nama</p>
                  <p className="text-xs text-muted-foreground">Student Full Name</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-red-600">Required</Badge>
                  <Badge variant="outline">String</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">judul</p>
                  <p className="text-xs text-muted-foreground">Project Title</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-red-600">Required</Badge>
                  <Badge variant="outline">String</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">pembimbing1</p>
                  <p className="text-xs text-muted-foreground">Primary Supervisor</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-red-600">Required</Badge>
                  <Badge variant="outline">String</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">pembimbing2</p>
                  <p className="text-xs text-muted-foreground">Secondary Supervisor</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-blue-600">Optional</Badge>
                  <Badge variant="outline">String</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">tempat_kkp</p>
                  <p className="text-xs text-muted-foreground">Internship Location</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-red-600">Required</Badge>
                  <Badge variant="outline">String</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Validation Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Validation Rules</CardTitle>
          <CardDescription>
            Configure validation patterns and rules for data fields
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nim-pattern">NIM Pattern</Label>
              <Input
                id="nim-pattern"
                value="^[0-9]{8,10}$"
                placeholder="Regex pattern for NIM validation"
              />
              <p className="text-xs text-muted-foreground">
                Validates 8-10 digit student ID numbers
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nama-pattern">Name Pattern</Label>
              <Input
                id="nama-pattern"
                value="^[a-zA-Z\s\.]+$"
                placeholder="Regex pattern for name validation"
              />
              <p className="text-xs text-muted-foreground">
                Allows letters, spaces, and dots only
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="judul-min-length">Title Min Length</Label>
              <Input
                id="judul-min-length"
                type="number"
                value="10"
                placeholder="Minimum character count"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="judul-max-length">Title Max Length</Label>
              <Input
                id="judul-max-length"
                type="number"
                value="200"
                placeholder="Maximum character count"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>
            Document generation API settings and endpoints
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="api-endpoint">Generation Endpoint</Label>
              <Input
                id="api-endpoint"
                value="POST /api/v1/documents/generate"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-timeout">Request Timeout (seconds)</Label>
              <Input
                id="api-timeout"
                type="number"
                value="30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-retries">Max Retry Attempts</Label>
              <Input
                id="max-retries"
                type="number"
                value="3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="output-format">Output Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="docx">Microsoft Word</SelectItem>
                  <SelectItem value="both">PDF + DOCX</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Configuration
        </Button>
        <Button variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset to Default
        </Button>
        <Button variant="outline">
          Test Configuration
        </Button>
      </div>
    </div>
  )
}
