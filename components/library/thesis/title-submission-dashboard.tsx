"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TitleSubmissionForm } from "./title-submission-form"
import { SimilarityResults } from "./similarity-results"

export interface SimilarityResult {
  originalTitle: string
  similarTheses: Array<{
    thesis: any
    similarityScore: number
  }>
  overallSimilarity: number
}

interface StudentThesisSubmission {
  id: string
  title: string
  abstract: string
  keywords: string[]
  status: 'pending' | 'approved' | 'rejected'
  submissionDate: string
  similarityScore?: number
  supervisor?: string
}

interface ThesisSubmissionData {
  submissions: StudentThesisSubmission[]
  canSubmitNew: boolean
}

export function TitleSubmissionDashboard() {
  const [similarityResults, setSimilarityResults] = useState<SimilarityResult | null>(null)
  const [submissionData, setSubmissionData] = useState<ThesisSubmissionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch submission data from API
  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('🚀 Fetching thesis submission data...')
        const response = await fetch('/api/student/library/title-submission')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch submission data: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('📝 Submission data received:', data)
        setSubmissionData(data)
      } catch (error) {
        console.error('❌ Error fetching submission data:', error)
        setError(error instanceof Error ? error.message : 'Failed to load submission data')
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissionData()
  }, [])

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Pengajuan Judul Skripsi</h2>
          <p className="text-muted-foreground">Memuat data pengajuan...</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader2 className="animate-spin h-8 w-8 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Memuat data pengajuan...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Pengajuan Judul Skripsi</h2>
          <p className="text-muted-foreground">Terjadi kesalahan saat memuat data.</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-red-600 mb-4">❌ {error}</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="outline"
                >
                  Coba Lagi
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!submissionData) {
    return null
  }

  // Function to check similarity (mock implementation)
  const checkSimilarity = (title: string, keywords: string[], abstract: string) => {
    // This is a mock implementation that would be replaced by a real algorithm
    const results: SimilarityResult = {
      originalTitle: title,
      similarTheses: [],
      overallSimilarity: Math.floor(Math.random() * 30), // Random similarity for demo
    }

    setSimilarityResults(results)
  }

  const handleSubmitThesis = async (data: {
    title: string
    abstract: string
    keywords: string[]
    supervisorId?: string
  }) => {
    try {
      const response = await fetch('/api/student/library/title-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      
      if (result.success) {
        // Refresh submission data
        const updatedResponse = await fetch('/api/student/library/title-submission')
        const updatedData = await updatedResponse.json()
        setSubmissionData(updatedData)
        
        // Reset similarity results
        setSimilarityResults(null)
        
        alert(result.message)
      } else {
        alert(result.message || 'Gagal mengajukan judul skripsi')
      }
    } catch (error) {
      console.error('Error submitting thesis:', error)
      alert('Terjadi kesalahan saat mengajukan judul skripsi')
    }
  }

  const handleSubmit = (title: string, keywords: string[], abstract: string) => {
    checkSimilarity(title, keywords, abstract)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Pengajuan Judul Skripsi</h2>
        <p className="text-muted-foreground">
          Ajukan judul skripsi Anda dan lihat tingkat kemiripan dengan judul yang sudah ada.
        </p>
      </div>

      {/* Show existing submissions */}
      {submissionData.submissions.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Pengajuan Saya</h3>
            <div className="space-y-4">
              {submissionData.submissions.map((submission) => (
                <div key={submission.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{submission.title}</h4>
                    <span className={`px-2 py-1 rounded text-sm ${
                      submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                      submission.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {submission.status === 'approved' ? 'Disetujui' :
                       submission.status === 'rejected' ? 'Ditolak' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{submission.abstract}</p>
                  <div className="flex gap-2 mb-2">
                    {submission.keywords.map((keyword, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Diajukan: {new Date(submission.submissionDate).toLocaleDateString('id-ID')}
                    {submission.supervisor && ` • Pembimbing: ${submission.supervisor}`}
                    {submission.similarityScore && ` • Similarity: ${submission.similarityScore}%`}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Show submission form only if can submit new */}
      {submissionData.canSubmitNew ? (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <TitleSubmissionForm onSubmit={handleSubmitThesis} />
          </div>
          <div>
            <SimilarityResults results={similarityResults} />
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Tidak Dapat Mengajukan Judul Baru</h3>
              <p className="text-muted-foreground mb-4">
                Anda tidak dapat mengajukan judul baru karena masih memiliki pengajuan yang pending atau sudah memiliki judul yang disetujui.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

