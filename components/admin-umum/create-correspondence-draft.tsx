"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockTemplates } from "./mock-correspondence-drafts"

export function CreateCorrespondenceDraft() {
  const [title, setTitle] = useState("")
  const [type, setType] = useState("")
  const [content, setContent] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [useTemplate, setUseTemplate] = useState(true)

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = mockTemplates.find((t) => t.id === templateId)
    if (template) {
      setContent(template.content)
      setType(template.category)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the draft to your backend
    console.log({ title, type, content })
    // Reset form
    setTitle("")
    setType("")
    setContent("")
    setSelectedTemplate("")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create New Correspondence Draft</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex space-x-4">
              <Button
                type="button"
                variant={useTemplate ? "default" : "outline"}
                onClick={() => setUseTemplate(true)}
                className="flex-1"
              >
                Use Template
              </Button>
              <Button
                type="button"
                variant={!useTemplate ? "default" : "outline"}
                onClick={() => setUseTemplate(false)}
                className="flex-1"
              >
                Start from Scratch
              </Button>
            </div>
          </div>

          {useTemplate && (
            <div className="space-y-2">
              <Label htmlFor="template">Select Template</Label>
              <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger id="template">
                  <SelectValue placeholder="Choose a template" />
                </SelectTrigger>
                <SelectContent>
                  {mockTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter draft title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              {useTemplate && selectedTemplate ? (
                <Input id="type" value={type} readOnly />
              ) : (
                <Select value={type} onValueChange={setType} required>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Surat Keterangan">Surat Keterangan</SelectItem>
                    <SelectItem value="Undangan">Undangan</SelectItem>
                    <SelectItem value="Surat Permohonan">Surat Permohonan</SelectItem>
                    <SelectItem value="Pengumuman">Pengumuman</SelectItem>
                    <SelectItem value="Surat Pengantar">Surat Pengantar</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] font-mono"
              placeholder="Enter your draft content here..."
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Save Draft</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

