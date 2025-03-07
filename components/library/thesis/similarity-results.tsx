"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { SimilarityResult } from "./title-submission-dashboard"
import { SimilarityIndicator } from "../similarity-indicator"
import { RelatedThesisList } from "./related-thesis-list"
import { AlertCircle, CheckCircle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SimilarityResultsProps {
  results: SimilarityResult | null
}

export function SimilarityResults({ results }: SimilarityResultsProps) {
  const [selectedThesisId, setSelectedThesisId] = useState<string | null>(null)

  if (!results) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Hasil Pemeriksaan</CardTitle>
          <CardDescription>
            Masukkan judul skripsi Anda untuk melihat tingkat kemiripan dengan judul yang sudah ada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Info className="mb-2 h-12 w-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Hasil pemeriksaan kemiripan akan muncul di sini setelah Anda mengirimkan judul.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Determine alert type based on similarity score
  const getAlertContent = () => {
    if (results.overallSimilarity >= 70) {
      return {
        icon: <AlertCircle className="h-4 w-4" />,
        title: "Kemiripan Tinggi",
        description: "Judul yang Anda ajukan memiliki kemiripan yang tinggi dengan judul yang sudah ada.",
        variant: "destructive" as const,
      }
    } else if (results.overallSimilarity >= 40) {
      return {
        icon: <Info className="h-4 w-4" />,
        title: "Kemiripan Sedang",
        description: "Judul yang Anda ajukan memiliki beberapa kemiripan dengan judul yang sudah ada.",
        variant: "default" as const,
      }
    } else {
      return {
        icon: <CheckCircle className="h-4 w-4" />,
        title: "Kemiripan Rendah",
        description: "Judul yang Anda ajukan memiliki kemiripan yang rendah dengan judul yang sudah ada.",
        variant: "default" as const,
      }
    }
  }

  const alertContent = getAlertContent()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hasil Pemeriksaan</CardTitle>
        <CardDescription>Tingkat kemiripan judul yang Anda ajukan dengan judul yang sudah ada.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant={alertContent.variant}>
          {alertContent.icon}
          <AlertTitle>{alertContent.title}</AlertTitle>
          <AlertDescription>{alertContent.description}</AlertDescription>
        </Alert>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Tingkat Kemiripan Keseluruhan</h4>
          <SimilarityIndicator percentage={results.overallSimilarity} />
        </div>

        {results.similarTheses.length > 0 ? (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Judul Terkait</h4>
            <RelatedThesisList
              similarTheses={results.similarTheses}
              selectedThesisId={selectedThesisId}
              onThesisSelect={setSelectedThesisId}
            />
          </div>
        ) : (
          <div className="rounded-md bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Tidak ditemukan judul yang mirip.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

