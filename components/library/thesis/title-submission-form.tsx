"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface TitleSubmissionFormProps {
  onSubmit: (title: string, keywords: string[], abstract: string) => void
}

export function TitleSubmissionForm({ onSubmit }: TitleSubmissionFormProps) {
  const [title, setTitle] = useState("")
  const [keywordsInput, setKeywordsInput] = useState("")
  const [abstract, setAbstract] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const keywords = keywordsInput
      .split(",")
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword.length > 0)

    setTimeout(() => {
      onSubmit(title, keywords, abstract)
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Pengajuan Judul</CardTitle>
        <CardDescription>Masukkan judul skripsi yang ingin Anda ajukan untuk diperiksa kemiripannya.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Skripsi</Label>
            <Input
              id="title"
              placeholder="Masukkan judul skripsi Anda"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Kata Kunci (pisahkan dengan koma)</Label>
            <Input
              id="keywords"
              placeholder="contoh: machine learning, nlp, klasifikasi"
              value={keywordsInput}
              onChange={(e) => setKeywordsInput(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="abstract">Penjelasan Singkat</Label>
            <Textarea
              id="abstract"
              placeholder="Tuliskan secara singkat tentang penelitian yang Anda usulkan"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              rows={5}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || !title || !keywordsInput}>
            {isSubmitting ? "Memeriksa..." : "Periksa Kemiripan"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

