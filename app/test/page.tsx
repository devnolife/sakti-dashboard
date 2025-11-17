"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import mammoth from "mammoth"
import { saveAs } from "file-saver"
import { Upload, FileText, Edit2, Eye, MousePointer2, Hand, Undo2, Redo2, Download, Award } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import CertificateBulkGenerator from "@/components/test/certificate-bulk-generator"

interface MockTemplate {
  id: string
  name: string
  html: string
  rawText: string
  variableMapping: Record<string, TemplateVariable>
}

interface TemplateVariable {
  id: string // Unique identifier for DOM mapping
  key: string
  label: string
  type: 'text' | 'number' | 'date'
  textContent: string
  startIndex: number
  endIndex: number
  htmlPosition?: string // HTML path for precise positioning
}

export default function TestTemplatePage() {
  const [file, setFile] = useState<File | null>(null)
  const [templateName, setTemplateName] = useState("")
  const [mockTemplate, setMockTemplate] = useState<MockTemplate | null>(null)
  const [processing, setProcessing] = useState(false)
  const [variableEditorOpen, setVariableEditorOpen] = useState(false)
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.name.endsWith('.docx')) {
        setFile(selectedFile)
        if (!templateName) {
          setTemplateName(selectedFile.name.replace('.docx', ''))
        }
      } else {
        toast({
          title: "Error",
          description: "Please select a .docx file",
          variant: "destructive"
        })
      }
    }
  }

  const handleProcessTemplate = async () => {
    if (!file || !templateName) {
      toast({
        title: "Validation Error",
        description: "Please provide a file and template name",
        variant: "destructive"
      })
      return
    }

    setProcessing(true)
    try {
      const arrayBuffer = await file.arrayBuffer()

      // Convert DOCX to HTML with enhanced style mapping
      const htmlResult = await mammoth.convertToHtml(
        { arrayBuffer },
        {
          styleMap: [
            // Document Title - centered, large, bold
            "p[style-name='Title'] => h1.text-3xl.font-bold.text-center.mb-6.mt-4:fresh",
            "p[style-name='Subtitle'] => h2.text-xl.font-semibold.text-center.mb-4.text-gray-600:fresh",

            // Headings - hierarchical styling
            "p[style-name='Heading 1'] => h2.text-2xl.font-bold.mt-6.mb-3.border-b.border-gray-300.pb-2:fresh",
            "p[style-name='Heading 2'] => h3.text-xl.font-bold.mt-5.mb-2:fresh",
            "p[style-name='Heading 3'] => h4.text-lg.font-semibold.mt-4.mb-2:fresh",
            "p[style-name='Heading 4'] => h5.text-base.font-semibold.mt-3.mb-1:fresh",

            // Body text - proper spacing and line height
            "p[style-name='Normal'] => p.mb-3.leading-relaxed.text-justify:fresh",
            "p[style-name='Body Text'] => p.mb-3.leading-relaxed:fresh",

            // Lists
            "p[style-name='List Paragraph'] => p.ml-6.mb-2:fresh",

            // Special formatting
            "r[style-name='Strong'] => strong.font-bold",
            "r[style-name='Emphasis'] => em.italic",
            "p[style-name='Quote'] => blockquote.border-l-4.border-primary.pl-4.italic.my-4.text-gray-700:fresh",

            // Alignment
            "p[style-name='align-center'] => p.text-center:fresh",
            "p[style-name='align-right'] => p.text-right:fresh",
          ],
          includeDefaultStyleMap: true,
          convertImage: mammoth.images.imgElement((image) => {
            return image.read("base64").then((imageBuffer) => {
              return {
                src: `data:${image.contentType};base64,${imageBuffer}`,
              };
            });
          }),
        }
      )

      // Extract raw text
      const textResult = await mammoth.extractRawText({ arrayBuffer })

      // Create mock template
      const newTemplate: MockTemplate = {
        id: `mock-${Date.now()}`,
        name: templateName,
        html: htmlResult.value,
        rawText: textResult.value,
        variableMapping: {}
      }

      setMockTemplate(newTemplate)

      toast({
        title: "Success",
        description: "Template processed successfully! You can now edit variables.",
      })
    } catch (error) {
      console.error('Error processing template:', error)
      toast({
        title: "Error",
        description: "Failed to process template",
        variant: "destructive"
      })
    } finally {
      setProcessing(false)
    }
  }

  const handleSaveVariables = (variables: any) => {
    if (mockTemplate) {
      setMockTemplate({
        ...mockTemplate,
        variableMapping: variables
      })
      toast({
        title: "Success",
        description: "Variables saved locally (mock mode)",
      })
    }
  }

  const handleDownloadJSON = () => {
    if (!mockTemplate) return

    const templateData = {
      name: mockTemplate.name,
      variableMapping: mockTemplate.variableMapping,
      metadata: {
        variableCount: Object.keys(mockTemplate.variableMapping).length,
        createdAt: new Date().toISOString(),
        templateId: mockTemplate.id
      }
    }

    const blob = new Blob([JSON.stringify(templateData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${mockTemplate.name}_variables.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded",
      description: "Template variables downloaded as JSON",
    })
  }

  const handleDownloadHTML = () => {
    if (!mockTemplate) return

    // Create a complete HTML document with inline styles
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${mockTemplate.name}</title>
  <style>
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 14px;
      line-height: 1.6;
      color: #1a1a1a;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      background: #ffffff;
    }
    h1 {
      font-size: 24px;
      line-height: 1.3;
      margin-top: 1rem;
      margin-bottom: 1.5rem;
    }
    h2 {
      font-size: 20px;
      line-height: 1.3;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
    }
    h3 {
      font-size: 18px;
      line-height: 1.3;
      margin-top: 1.25rem;
      margin-bottom: 0.5rem;
    }
    h4 {
      font-size: 16px;
      line-height: 1.3;
      margin-top: 1rem;
      margin-bottom: 0.25rem;
    }
    p {
      margin-bottom: 0.75rem;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1rem 0;
    }
    table td, table th {
      border: 1px solid #ddd;
      padding: 8px;
    }
    blockquote {
      margin: 1rem 0;
      padding-left: 1rem;
      border-left: 4px solid #e5e7eb;
      color: #4b5563;
    }
    img {
      max-width: 100%;
      height: auto;
      margin: 1rem 0;
    }
    ul, ol {
      margin-left: 2rem;
      margin-bottom: 0.75rem;
    }
    strong {
      font-weight: 700;
    }
    em {
      font-style: italic;
    }
    .variable-highlight {
      background-color: #fef08a;
      padding: 2px 6px;
      border-radius: 3px;
      border: 2px solid #facc15;
      font-weight: 600;
    }
    .print-info {
      page-break-after: always;
      padding: 20px;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      margin-bottom: 40px;
    }
    .print-info h2 {
      margin-top: 0;
      color: #374151;
    }
    .variable-list {
      list-style: none;
      padding: 0;
    }
    .variable-item {
      padding: 8px 12px;
      margin: 4px 0;
      background: white;
      border-radius: 4px;
      border-left: 4px solid #facc15;
    }
    .variable-key {
      font-family: 'Courier New', monospace;
      font-weight: bold;
      color: #7c3aed;
    }
    @media print {
      .print-info {
        page-break-after: always;
      }
    }
  </style>
</head>
<body>
  <div class="print-info">
    <h2>📋 Template Variable Information</h2>
    <p><strong>Template Name:</strong> ${mockTemplate.name}</p>
    <p><strong>Total Variables:</strong> ${Object.keys(mockTemplate.variableMapping).length}</p>
    <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
    <h3>Defined Variables:</h3>
    <ul class="variable-list">
      ${Object.entries(mockTemplate.variableMapping).map(([key, variable]) => `
        <li class="variable-item">
          <span class="variable-key">{{${variable.key}}}</span> - 
          <strong>${variable.label}</strong> 
          <em>(${variable.type})</em>
          <br>
          <small style="color: #6b7280;">Current: "${variable.textContent}"</small>
        </li>
      `).join('')}
    </ul>
  </div>

  <div class="template-content">
    ${mockTemplate.html.replace(
      new RegExp(Object.values(mockTemplate.variableMapping).map((v: any) =>
        v.textContent.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      ).join('|'), 'g'),
      (match) => {
        const variable = Object.values(mockTemplate.variableMapping).find((v: any) => v.textContent === match)
        return variable ? `<span class="variable-highlight" title="${(variable as any).label}">{{${(variable as any).key}}}</span>` : match
      }
    )}
  </div>
</body>
</html>`

    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${mockTemplate.name}_template.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded",
      description: "Template downloaded as HTML with variables highlighted",
    })
  }

  const handleDownloadDOCX = async () => {
    if (!mockTemplate || !file) return

    try {
      // Dynamically import PizZip
      const PizZip = (await import('pizzip')).default

      // Read original DOCX file as binary
      const arrayBuffer = await file.arrayBuffer()

      // Load the DOCX file with PizZip
      const zip = new PizZip(arrayBuffer)

      // Get the main document XML (word/document.xml)
      let documentXml = zip.file('word/document.xml')?.asText()

      if (!documentXml) {
        throw new Error('Could not read document.xml from DOCX file')
      }

      console.log('=== Starting DOCX Variable Replacement ===')
      console.log('Variables to replace:', mockTemplate.variableMapping)

      // Replace all variable text content with placeholders in the XML
      Object.values(mockTemplate.variableMapping).forEach((variable) => {
        console.log(`\n--- Processing variable: ${variable.key} ---`)
        console.log(`Text to find: "${variable.textContent}"`)

        const placeholder = `{{${variable.key}}}`
        const searchText = variable.textContent

        // Method 1: Direct simple replacement (for text in single <w:t> tag)
        const escapedSearch = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const beforeCount = (documentXml!.match(new RegExp(escapedSearch, 'g')) || []).length

        // Replace in <w:t> tags directly
        const simpleRegex = new RegExp(`(<w:t[^>]*>)([^<]*)(${escapedSearch})([^<]*)(<\\/w:t>)`, 'g')
        documentXml = documentXml!.replace(simpleRegex, (match, openTag, before, text, after, closeTag) => {
          console.log(`✓ Simple match found: "${text}"`)
          return openTag + before + placeholder + after + closeTag
        })

        // Method 2: Handle text split with XML tags in between (more complex)
        // Split search text into characters and create flexible regex
        const chars = searchText.split('')
        const flexiblePattern = chars
          .map(char => char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
          .join('(?:<[^>]+>)*') // Allow any XML tags between characters

        const flexRegex = new RegExp(
          `(<w:t[^>]*>[^<]*)(${flexiblePattern})([^<]*<\\/w:t>)`,
          'g'
        )

        documentXml = documentXml!.replace(flexRegex, (match, before, text, after) => {
          // Extract just the text content without XML tags
          const cleanText = text.replace(/<[^>]+>/g, '')
          if (cleanText === searchText) {
            console.log(`✓ Flexible match found (split text): "${cleanText}"`)
            return before + placeholder + after
          }
          return match
        })

        // Method 3: Brute force - find and replace in continuous text runs
        // Extract all text between <w:t> tags and build a map
        const wtRegex = /<w:t[^>]*>([^<]*)<\/w:t>/g
        const textParts: Array<{ match: RegExpExecArray; text: string }> = []
        let wtMatch

        while ((wtMatch = wtRegex.exec(documentXml!)) !== null) {
          textParts.push({ match: wtMatch, text: wtMatch[1] })
        }

        // Look for the search text in combinations of consecutive text parts
        for (let i = 0; i < textParts.length; i++) {
          let combined = textParts[i].text
          const indices = [i]

          // Try combining with next parts
          for (let j = i + 1; j < Math.min(i + 10, textParts.length); j++) {
            combined += textParts[j].text
            indices.push(j)

            if (combined.includes(searchText)) {
              console.log(`✓ Found in combined parts [${indices.join(',')}]: "${combined}"`)

              // Replace in the first part and clear the rest
              const startIdx = combined.indexOf(searchText)
              const endIdx = startIdx + searchText.length

              // Simple approach: replace in first part if text starts there
              if (startIdx === 0 && endIdx <= textParts[i].text.length) {
                const firstPart = textParts[i].match
                const newXml: string = documentXml!.substring(0, firstPart.index) +
                  firstPart[0].replace(textParts[i].text, placeholder) +
                  documentXml!.substring(firstPart.index + firstPart[0].length)
                documentXml = newXml
                console.log(`✓ Replaced in part ${i}`)
                break
              }
            }

            if (combined.length > searchText.length + 50) break
          }
        }

        const afterCount = (documentXml!.match(new RegExp(escapedSearch, 'g')) || []).length
        console.log(`Result: ${beforeCount} occurrences -> ${afterCount} remaining`)
      })

      console.log('\n=== Replacement Complete ===')

      // Update the document.xml in the zip
      zip.file('word/document.xml', documentXml)

      // Generate modified DOCX file
      const modifiedDocx = zip.generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        compression: 'DEFLATE'
      })

      // Save the file
      saveAs(modifiedDocx, `${mockTemplate.name}_with_variables.docx`)

      const variableCount = Object.keys(mockTemplate.variableMapping).length
      const variableList = Object.values(mockTemplate.variableMapping)
        .map(v => `{{${v.key}}}`)
        .join(', ')

      toast({
        title: "✅ Downloaded Successfully",
        description: `Template with ${variableCount} variable(s): ${variableList}. Original formatting preserved.`,
      })
    } catch (error) {
      console.error('Error generating DOCX:', error)
      toast({
        title: "Error",
        description: "Failed to generate DOCX file",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="container py-8 mx-auto space-y-8 max-w-7xl">
      {/* Certificate Bulk Generator Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Bulk Certificate Generator
          </CardTitle>
          <CardDescription>
            Upload CSV/TXT file untuk generate multiple sertifikat sekaligus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CertificateBulkGenerator />
        </CardContent>
      </Card>

      {/* Separator */}
      <Separator className="my-8" />

      {/* Template Variable Editor Section */}
      <Card>
        <CardHeader>
          <CardTitle>Test Template Variable Editor</CardTitle>
          <CardDescription>
            Upload a DOCX file to test the interactive variable editor without database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Section */}
          {!mockTemplate && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="Enter template name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="docx-file">Upload DOCX File</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="docx-file"
                    type="file"
                    accept=".docx"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  {file && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      {file.name}
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={handleProcessTemplate}
                disabled={!file || !templateName || processing}
                className="w-full"
              >
                {processing ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Process Template
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Template Actions */}
          {mockTemplate && (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{mockTemplate.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Variables defined: {Object.keys(mockTemplate.variableMapping).length}
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-muted-foreground" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => setPreviewDialogOpen(true)}
                  className="w-full"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Template
                </Button>
                <Button
                  onClick={() => setVariableEditorOpen(true)}
                  className="w-full"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Variables
                </Button>
              </div>

              {/* Download Section */}
              {Object.keys(mockTemplate.variableMapping).length > 0 && (
                <div className="space-y-3">
                  <Separator />
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Download Options</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownloadDOCX}
                        className="w-full"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        DOCX
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownloadHTML}
                        className="w-full"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        HTML
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownloadJSON}
                        className="w-full"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        JSON
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Download template as DOCX, HTML, or variable mappings as JSON
                    </p>
                  </div>
                </div>
              )}

              <Separator />

              {/* Variable Mapping Display */}
              {Object.keys(mockTemplate.variableMapping).length > 0 && (
                <div className="space-y-2">
                  <Label>Defined Variables (JSON)</Label>
                  <pre className="p-4 overflow-auto text-xs rounded-lg bg-muted max-h-64">
                    {JSON.stringify(mockTemplate.variableMapping, null, 2)}
                  </pre>
                </div>
              )}

              <Button
                variant="outline"
                onClick={() => {
                  setMockTemplate(null)
                  setFile(null)
                  setTemplateName("")
                }}
                className="w-full"
              >
                Reset & Upload New Template
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Inline Variable Editor */}
      {mockTemplate && (
        <InlineVariableEditor
          template={mockTemplate}
          open={variableEditorOpen}
          onOpenChange={setVariableEditorOpen}
          onSave={handleSaveVariables}
        />
      )}

      {/* Preview Dialog - Enhanced */}
      {mockTemplate && (
        <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col p-0">
            {/* Header with gradient */}
            <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/10 via-primary/5 to-background">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <FileText className="w-6 h-6 text-primary" />
                  {mockTemplate.name}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1">
                    <Badge variant="secondary" className="font-mono">
                      {Object.keys(mockTemplate.variableMapping).length} variables
                    </Badge>
                  </span>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-xs text-muted-foreground">
                    Preview mode - Variables highlighted in yellow
                  </span>
                </DialogDescription>
              </DialogHeader>
            </div>

            {/* Variable Info Bar */}
            {Object.keys(mockTemplate.variableMapping).length > 0 && (
              <div className="px-6 py-3 border-b bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                    Defined Variables:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(mockTemplate.variableMapping).map(([key, variable]) => (
                    <Badge
                      key={key}
                      variant="outline"
                      className="font-mono text-xs text-yellow-800 border-yellow-200 bg-yellow-50 hover:bg-yellow-100"
                    >
                      <span className="font-bold">{`{{${variable.key}}}`}</span>
                      <Separator orientation="vertical" className="h-3 mx-2" />
                      <span className="font-normal">{variable.label}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Document Preview */}
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="max-w-4xl mx-auto">
                {/* Paper-like container */}
                <div className="bg-white border shadow-lg rounded-lg p-8 min-h-[600px]">
                  <style dangerouslySetInnerHTML={{
                    __html: `
                      .preview-document {
                        font-family: 'Times New Roman', Times, serif;
                        font-size: 14px;
                        line-height: 1.8;
                        color: #1a1a1a;
                      }
                      .preview-document h1 {
                        font-size: 28px;
                        font-weight: bold;
                        line-height: 1.3;
                        margin-top: 1rem;
                        margin-bottom: 1.5rem;
                        color: #111;
                      }
                      .preview-document h2 {
                        font-size: 22px;
                        font-weight: bold;
                        line-height: 1.3;
                        margin-top: 1.5rem;
                        margin-bottom: 0.75rem;
                        color: #222;
                      }
                      .preview-document h3 {
                        font-size: 18px;
                        font-weight: 600;
                        line-height: 1.3;
                        margin-top: 1.25rem;
                        margin-bottom: 0.5rem;
                        color: #333;
                      }
                      .preview-document p {
                        margin-bottom: 1rem;
                        text-align: justify;
                      }
                      .preview-document table {
                        border-collapse: collapse;
                        width: 100%;
                        margin: 1.5rem 0;
                        border: 1px solid #ddd;
                      }
                      .preview-document table td,
                      .preview-document table th {
                        border: 1px solid #ddd;
                        padding: 12px;
                        text-align: left;
                      }
                      .preview-document table th {
                        background-color: #f8f9fa;
                        font-weight: 600;
                      }
                      .preview-document strong {
                        font-weight: 700;
                        color: #000;
                      }
                      .preview-document em {
                        font-style: italic;
                      }
                      .preview-document ul, .preview-document ol {
                        margin-left: 2rem;
                        margin-bottom: 1rem;
                      }
                      .preview-document li {
                        margin-bottom: 0.5rem;
                      }
                      .preview-document blockquote {
                        border-left: 4px solid #e5e7eb;
                        padding-left: 1rem;
                        margin: 1.5rem 0;
                        font-style: italic;
                        color: #555;
                      }
                      .preview-document img {
                        max-width: 100%;
                        height: auto;
                        margin: 1.5rem 0;
                        border-radius: 4px;
                      }
                      /* Highlight variables in preview */
                      .preview-document mark {
                        background-color: #fef08a;
                        padding: 2px 4px;
                        border-radius: 3px;
                        font-weight: 600;
                        border: 1px solid #fcd34d;
                      }
                    `
                  }} />
                  <div
                    className="preview-document"
                    dangerouslySetInnerHTML={{
                      __html: Object.keys(mockTemplate.variableMapping).length > 0
                        ? mockTemplate.html.replace(
                          new RegExp(
                            Object.values(mockTemplate.variableMapping)
                              .map((v: any) => v.textContent.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
                              .join('|'),
                            'g'
                          ),
                          (match) => {
                            const variable = Object.values(mockTemplate.variableMapping).find(
                              (v: any) => v.textContent === match
                            )
                            return variable
                              ? `<mark title="${(variable as any).label}">${match}</mark>`
                              : match
                          }
                        )
                        : mockTemplate.html
                    }}
                  />
                </div>
              </div>
            </ScrollArea>

            {/* Footer Actions */}
            <div className="flex items-center justify-between px-6 py-4 border-t bg-muted/20">
              <div className="text-xs text-muted-foreground">
                💡 Tip: Use "Edit Variables" to define or modify template variables
              </div>
              <Button onClick={() => setPreviewDialogOpen(false)}>
                Close Preview
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Inline Variable Editor - Simple version for testing
function InlineVariableEditor({
  template,
  open,
  onOpenChange,
  onSave
}: {
  template: MockTemplate
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (variables: Record<string, TemplateVariable>) => void
}) {
  const [variables, setVariables] = useState<Record<string, TemplateVariable>>(template.variableMapping)
  const [selectedText, setSelectedText] = useState("")
  const [selectionRange, setSelectionRange] = useState<{ start: number; end: number } | null>(null)
  const [showVariableDialog, setShowVariableDialog] = useState(false)
  const [newVariable, setNewVariable] = useState({
    key: "",
    label: "",
    type: "text" as 'text' | 'number' | 'date'
  })

  // New states for enhanced editing
  const [editMode, setEditMode] = useState<'select' | 'edit'>('select')
  const [editingVariable, setEditingVariable] = useState<string | null>(null)
  const [history, setHistory] = useState<Array<Record<string, TemplateVariable>>>([template.variableMapping])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [hoveredVariable, setHoveredVariable] = useState<string | null>(null)

  // Undo/Redo handlers
  const addToHistory = (newVariables: Record<string, TemplateVariable>) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newVariables)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setVariables(history[historyIndex - 1])
      toast({ title: "Undone", description: "Last action reverted" })
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setVariables(history[historyIndex + 1])
      toast({ title: "Redone", description: "Action restored" })
    }
  }

  const handleTextSelection = () => {
    if (editMode !== 'select') return

    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      const selectedText = selection.toString().trim()
      const selectionStart = template.rawText.indexOf(selectedText)

      if (selectionStart !== -1) {
        setSelectedText(selectedText)
        setSelectionRange({
          start: selectionStart,
          end: selectionStart + selectedText.length
        })
        setShowVariableDialog(true)
      }
    }
  }

  const validateVariableKey = (key: string): boolean => {
    return /^[a-zA-Z0-9_]+$/.test(key)
  }

  const handleAddVariable = () => {
    if (!newVariable.key || !newVariable.label || !selectionRange) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      })
      return
    }

    if (!validateVariableKey(newVariable.key)) {
      toast({
        title: "Validation Error",
        description: "Variable key must contain only letters, numbers, and underscores",
        variant: "destructive"
      })
      return
    }

    if (variables[newVariable.key]) {
      toast({
        title: "Validation Error",
        description: "Variable key already exists",
        variant: "destructive"
      })
      return
    }

    const variable: TemplateVariable = {
      id: `var-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      key: newVariable.key,
      label: newVariable.label,
      type: newVariable.type,
      textContent: selectedText,
      startIndex: selectionRange.start,
      endIndex: selectionRange.end
    }

    const newVariables = { ...variables, [variable.key]: variable }
    setVariables(newVariables)
    addToHistory(newVariables)

    setShowVariableDialog(false)
    setNewVariable({ key: "", label: "", type: "text" })
    setSelectedText("")
    setSelectionRange(null)

    toast({
      title: "Success",
      description: "Variable added successfully"
    })
  }

  const handleDeleteVariable = (key: string) => {
    const newVariables = { ...variables }
    delete newVariables[key]
    setVariables(newVariables)
    addToHistory(newVariables)

    toast({
      title: "Success",
      description: "Variable deleted successfully"
    })
  }

  const handleEditVariable = (key: string, updates: Partial<TemplateVariable>) => {
    const newVariables = {
      ...variables,
      [key]: { ...variables[key], ...updates }
    }
    setVariables(newVariables)
    addToHistory(newVariables)
    setEditingVariable(null)

    toast({
      title: "Success",
      description: "Variable updated successfully"
    })
  }

  const handleSave = () => {
    onSave(variables)
    onOpenChange(false)
  }

  const getHighlightedHtml = () => {
    const baseStyles = `
      <style>
        .document-preview {
          font-family: 'Times New Roman', Times, serif;
          font-size: 14px;
          line-height: 1.6;
          color: #1a1a1a;
          max-width: 100%;
        }
        .document-preview h1 {
          font-size: 24px;
          line-height: 1.3;
          margin-top: 1rem;
          margin-bottom: 1.5rem;
        }
        .document-preview h2 {
          font-size: 20px;
          line-height: 1.3;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .document-preview h3 {
          font-size: 18px;
          line-height: 1.3;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .document-preview h4 {
          font-size: 16px;
          line-height: 1.3;
          margin-top: 1rem;
          margin-bottom: 0.25rem;
        }
        .document-preview p {
          margin-bottom: 0.75rem;
        }
        .document-preview table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
        }
        .document-preview table td,
        .document-preview table th {
          border: 1px solid #ddd;
          padding: 8px;
        }
        .document-preview blockquote {
          margin: 1rem 0;
          padding-left: 1rem;
          border-left: 4px solid #e5e7eb;
          color: #4b5563;
        }
        .document-preview img {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
        }
        .document-preview ul, .document-preview ol {
          margin-left: 2rem;
          margin-bottom: 0.75rem;
        }
        .document-preview strong {
          font-weight: 700;
        }
        .document-preview em {
          font-style: italic;
        }
        .variable-highlight {
          padding: 2px 6px;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          border: 2px solid transparent;
        }
        .variable-highlight:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .variable-highlight.mode-select {
          background-color: #fef08a;
          border-color: #facc15;
        }
        .variable-highlight.mode-edit {
          background-color: #bbf7d0;
          border-color: #22c55e;
        }
        .variable-highlight.editing {
          background-color: #ddd6fe;
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }
        .document-preview.mode-select {
          cursor: text;
        }
        .document-preview.mode-edit .variable-highlight {
          cursor: pointer;
        }
      </style>
    `;

    if (!template.html || Object.keys(variables).length === 0) {
      return `${baseStyles}<div class="document-preview mode-${editMode}">${template.html}</div>`;
    }

    let highlightedHtml = template.html;
    const sortedVars = Object.values(variables).sort((a, b) => b.startIndex - a.startIndex);

    sortedVars.forEach((variable) => {
      const isEditing = editingVariable === variable.key;
      const modeClass = editMode === 'select' ? 'mode-select' : 'mode-edit';
      const editingClass = isEditing ? 'editing' : '';

      const highlighted = `<mark class="variable-highlight ${modeClass} ${editingClass}" data-variable-id="${variable.id}" data-variable-key="${variable.key}" title="${variable.label} (${variable.key})">${variable.textContent}</mark>`;

      highlightedHtml = highlightedHtml.replace(
        new RegExp(variable.textContent.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
        highlighted
      );
    });

    return `${baseStyles}<div class="document-preview mode-${editMode}">${highlightedHtml}</div>`;
  }

  // Handle click on variable in edit mode
  const handleVariableClick = (e: React.MouseEvent) => {
    if (editMode !== 'edit') return;

    const target = e.target as HTMLElement;
    if (target.classList.contains('variable-highlight')) {
      const variableKey = target.getAttribute('data-variable-key');
      if (variableKey) {
        setEditingVariable(editingVariable === variableKey ? null : variableKey);
      }
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Template Variable Editor</DialogTitle>
            <DialogDescription>
              {editMode === 'select' ? 'Select text to define new variables' : 'Click on highlighted variables to edit them'}
            </DialogDescription>
          </DialogHeader>

          {/* Toolbar */}
          <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Mode:</span>
              <div className="flex items-center gap-1 p-1 border rounded-lg bg-background">
                <Button
                  size="sm"
                  variant={editMode === 'select' ? 'default' : 'ghost'}
                  onClick={() => setEditMode('select')}
                  className="h-8"
                >
                  <Hand className="w-4 h-4 mr-1" />
                  Select
                </Button>
                <Button
                  size="sm"
                  variant={editMode === 'edit' ? 'default' : 'ghost'}
                  onClick={() => setEditMode('edit')}
                  className="h-8"
                >
                  <MousePointer2 className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleUndo}
                disabled={historyIndex === 0}
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleRedo}
                disabled={historyIndex === history.length - 1}
                title="Redo (Ctrl+Y)"
              >
                <Redo2 className="w-4 h-4" />
              </Button>
              <Separator orientation="vertical" className="h-8" />
              <Badge variant="secondary" className="font-mono">
                {Object.keys(variables).length} variables
              </Badge>
            </div>
          </div>

          <div className="flex flex-1 gap-4 overflow-hidden">
            {/* Preview Panel */}
            <div className="flex flex-col flex-1 border rounded-lg">
              <div className="flex items-center justify-between p-3 border-b bg-muted">
                <h3 className="font-semibold">Template Preview</h3>
                <Badge variant="outline" className="text-xs">
                  {editMode === 'select' ? '🖐️ Select Mode' : '🖱️ Edit Mode'}
                </Badge>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: getHighlightedHtml() }}
                  onMouseUp={handleTextSelection}
                  onClick={handleVariableClick}
                  style={{ userSelect: editMode === 'select' ? "text" : "none" }}
                />
              </ScrollArea>
            </div>

            {/* Variables Panel */}
            <div className="flex flex-col border rounded-lg w-80">
              <div className="p-3 border-b bg-muted">
                <h3 className="font-semibold">Defined Variables</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {Object.keys(variables).length} variable(s) defined
                </p>
              </div>
              <ScrollArea className="flex-1 p-3">
                <div className="space-y-3">
                  {Object.keys(variables).length === 0 ? (
                    <div className="py-8 text-sm text-center text-muted-foreground">
                      No variables defined yet. Select text to add variables.
                    </div>
                  ) : (
                    Object.entries(variables).map(([key, variable]) => (
                      <div
                        key={key}
                        className={`border rounded-lg p-3 space-y-2 hover:bg-muted/50 transition-colors ${editingVariable === key ? 'ring-2 ring-primary' : ''
                          }`}
                      >
                        <div className="flex items-start justify-between">
                          <Badge variant="secondary" className="font-mono text-xs">
                            {variable.key}
                          </Badge>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingVariable(editingVariable === key ? null : key)}
                              title="Edit variable"
                            >
                              <Edit2 className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteVariable(key)}
                              title="Delete variable"
                            >
                              <Trash2 className="w-3 h-3 text-destructive" />
                            </Button>
                          </div>
                        </div>

                        {editingVariable === key ? (
                          <InlineVariableEditForm
                            variable={variable}
                            onSave={(updates) => handleEditVariable(key, updates)}
                            onCancel={() => setEditingVariable(null)}
                          />
                        ) : (
                          <div>
                            <p className="text-sm font-medium">{variable.label}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Type: {variable.type}
                            </p>
                            <p className="p-2 mt-1 text-xs rounded text-muted-foreground bg-muted">
                              "{variable.textContent}"
                            </p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={Object.keys(variables).length === 0}>
              Save Variables
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Variable Dialog */}
      <Dialog open={showVariableDialog} onOpenChange={setShowVariableDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Define Variable</DialogTitle>
            <DialogDescription>
              Create a variable for the selected text: "{selectedText}"
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="var-key">Variable Key *</Label>
              <Input
                id="var-key"
                placeholder="e.g., nama_mahasiswa"
                value={newVariable.key}
                onChange={(e) => setNewVariable({ ...newVariable, key: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Only letters, numbers, and underscores. No spaces.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="var-label">Label *</Label>
              <Input
                id="var-label"
                placeholder="e.g., Nama Mahasiswa"
                value={newVariable.label}
                onChange={(e) => setNewVariable({ ...newVariable, label: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="var-type">Type</Label>
              <Select
                value={newVariable.type}
                onValueChange={(value) => setNewVariable({ ...newVariable, type: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVariableDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddVariable}>
              Add Variable
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Inline Variable Edit Form Component
function InlineVariableEditForm({
  variable,
  onSave,
  onCancel
}: {
  variable: TemplateVariable
  onSave: (updates: Partial<TemplateVariable>) => void
  onCancel: () => void
}) {
  const [editedLabel, setEditedLabel] = useState(variable.label)
  const [editedType, setEditedType] = useState(variable.type)

  const handleSave = () => {
    if (!editedLabel.trim()) {
      toast({
        title: "Validation Error",
        description: "Label cannot be empty",
        variant: "destructive"
      })
      return
    }

    onSave({
      label: editedLabel,
      type: editedType
    })
  }

  return (
    <div className="pt-2 space-y-3 border-t">
      <div className="space-y-2">
        <Label className="text-xs">Label</Label>
        <Input
          value={editedLabel}
          onChange={(e) => setEditedLabel(e.target.value)}
          className="h-8 text-sm"
          placeholder="Variable label"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-xs">Type</Label>
        <Select value={editedType} onValueChange={(value: any) => setEditedType(value)}>
          <SelectTrigger className="h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={handleSave} className="flex-1 h-8">
          Save
        </Button>
        <Button size="sm" variant="outline" onClick={onCancel} className="flex-1 h-8">
          Cancel
        </Button>
      </div>
    </div>
  )
}
