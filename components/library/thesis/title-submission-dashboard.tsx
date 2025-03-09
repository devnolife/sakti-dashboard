"use client"

import { useState } from "react"
import { TitleSubmissionForm } from "./title-submission-form"
import { SimilarityResults } from "./similarity-results"
import { mockThesisTitles } from "./mock-thesis-data"

export interface SimilarityResult {
  originalTitle: string
  similarTheses: Array<{
    thesis: (typeof mockThesisTitles)[0]
    similarityScore: number
  }>
  overallSimilarity: number
}

export function TitleSubmissionDashboard() {
  const [similarityResults, setSimilarityResults] = useState<SimilarityResult | null>(null)

  // Function to check similarity (mock implementation)
  const checkSimilarity = (title: string, keywords: string[], abstract: string) => {
    // This is a mock implementation that would be replaced by a real algorithm
    const results: SimilarityResult = {
      originalTitle: title,
      similarTheses: [],
      overallSimilarity: 0,
    }

    // Simple mock algorithm to find similar theses based on keywords
    const lowerTitle = title.toLowerCase()
    const lowerKeywords = keywords.map((k) => k.toLowerCase())

    // Find theses with similar keywords or title
    mockThesisTitles.forEach((thesis) => {
      let score = 0

      // Check title similarity (very basic implementation)
      const thesisWords = thesis.title.toLowerCase().split(" ")
      const submittedWords = lowerTitle.split(" ")

      // Count matching words
      thesisWords.forEach((word) => {
        if (submittedWords.includes(word) && word.length > 3) {
          score += 10
        }
      })

      // Check keyword matches
      thesis.keywords.forEach((keyword) => {
        if (lowerKeywords.includes(keyword.toLowerCase())) {
          score += 15
        }
      })

      // Add to similar theses if score is above threshold
      if (score > 20) {
        // Normalize score to percentage (max theoretical score could be higher)
        const normalizedScore = Math.min(Math.round(score / 2), 100)
        results.similarTheses.push({
          thesis,
          similarityScore: normalizedScore,
        })
      }
    })

    // Sort by similarity score
    results.similarTheses.sort((a, b) => b.similarityScore - a.similarityScore)

    // Calculate overall similarity based on top matches
    if (results.similarTheses.length > 0) {
      const topScores = results.similarTheses.slice(0, 3).map((item) => item.similarityScore)
      results.overallSimilarity = Math.round(topScores.reduce((sum, score) => sum + score, 0) / topScores.length)
    }

    return results
  }

  const handleSubmit = (title: string, keywords: string[], abstract: string) => {
    const results = checkSimilarity(title, keywords, abstract)
    setSimilarityResults(results)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Pengajuan Judul Skripsi</h2>
        <p className="text-muted-foreground">
          Ajukan judul skripsi Anda dan lihat tingkat kemiripan dengan judul yang sudah ada.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <TitleSubmissionForm onSubmit={handleSubmit} />
        </div>
        <div>
          <SimilarityResults results={similarityResults} />
        </div>
      </div>
    </div>
  )
}

