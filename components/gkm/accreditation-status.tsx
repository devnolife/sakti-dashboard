"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import {
  Award,
  Calendar,
  FileCheck,
  Clock,
  CheckCircle,
  AlertTriangle,
  Target,
  Download
} from "lucide-react"

interface AccreditationProgram {
  id: string
  name: string
  level: "A" | "B" | "C" | "Unggul" | "Baik Sekali" | "Baik"
  validUntil: string
  score: number
  status: "active" | "expired" | "renewal" | "preparation"
  nextReview: string
  completionRate: number
  documents: {
    total: number
    completed: number
    pending: number
  }
}

interface AccreditationStatusProps {
  programs?: AccreditationProgram[]
  overallReadiness?: number
}

// Default data with 5 engineering programs
const defaultPrograms: AccreditationProgram[] = [
  {
    id: "teknik-sipil",
    name: "Teknik Sipil (Pengairan)",
    level: "A",
    validUntil: "2025-12-31",
    score: 94,
    status: "active",
    nextReview: "2025-06-15",
    completionRate: 95,
    documents: {
      total: 45,
      completed: 43,
      pending: 2
    }
  },
  {
    id: "teknik-elektro",
    name: "Teknik Elektro",
    level: "B",
    validUntil: "2024-08-31",
    score: 87,
    status: "renewal",
    nextReview: "2024-06-01",
    completionRate: 78,
    documents: {
      total: 42,
      completed: 33,
      pending: 9
    }
  },
  {
    id: "arsitektur",
    name: "Arsitektur",
    level: "A",
    validUntil: "2026-03-31",
    score: 92,
    status: "active",
    nextReview: "2025-09-15",
    completionRate: 88,
    documents: {
      total: 48,
      completed: 42,
      pending: 6
    }
  },
  {
    id: "informatika",
    name: "Informatika",
    level: "B",
    validUntil: "2024-11-30",
    score: 85,
    status: "preparation",
    nextReview: "2024-09-01",
    completionRate: 72,
    documents: {
      total: 40,
      completed: 29,
      pending: 11
    }
  },
  {
    id: "pwk",
    name: "Perencanaan Wilayah Kota",
    level: "B",
    validUntil: "2025-05-31",
    score: 88,
    status: "active",
    nextReview: "2024-12-01",
    completionRate: 82,
    documents: {
      total: 44,
      completed: 36,
      pending: 8
    }
  }
]

const getLevelColor = (level: string) => {
  switch (level) {
    case "A":
    case "Unggul":
      return "bg-green-500 text-white"
    case "B": 
    case "Baik Sekali":
      return "bg-blue-500 text-white"
    case "C":
    case "Baik":
      return "bg-yellow-500 text-white"
    default:
      return "bg-gray-500 text-white"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-300"
    case "renewal":
      return "bg-orange-100 text-orange-800 border-orange-300"
    case "expired":
      return "bg-red-100 text-red-800 border-red-300"
    case "preparation":
      return "bg-blue-100 text-blue-800 border-blue-300"
    default:
      return "bg-gray-100 text-gray-800 border-gray-300"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <CheckCircle className="w-4 h-4" />
    case "renewal":
    case "preparation":
      return <Clock className="w-4 h-4" />
    case "expired":
      return <AlertTriangle className="w-4 h-4" />
    default:
      return <FileCheck className="w-4 h-4" />
  }
}

export default function AccreditationStatus({ 
  programs = defaultPrograms, 
  overallReadiness = 85 
}: AccreditationStatusProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-50 to-orange-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Status Akreditasi Program Studi
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Monitoring dan Persiapan Akreditasi
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-600">
                {overallReadiness}%
              </div>
              <div className="text-sm text-gray-600">Kesiapan Keseluruhan</div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Overall Readiness */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Kesiapan Akreditasi</span>
              <span className="text-sm font-bold text-gray-900">{overallReadiness}%</span>
            </div>
            <Progress value={overallReadiness} className="h-3" />
          </div>
          
          {/* Programs List */}
          <div className="space-y-4">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                className="p-4 rounded-xl bg-white border border-amber-200 hover:border-amber-300 transition-all duration-300 hover:shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{program.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getLevelColor(program.level)}>
                        Grade {program.level}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(program.status)} flex items-center gap-1`}
                      >
                        {getStatusIcon(program.status)}
                        {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-bold text-lg text-amber-600">
                      {program.score}
                    </div>
                    <div className="text-gray-600">Score</div>
                  </div>
                </div>
                
                {/* Document Progress */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Dokumen Lengkap</span>
                      <span className="font-medium">
                        {program.documents.completed}/{program.documents.total}
                      </span>
                    </div>
                    <Progress 
                      value={(program.documents.completed / program.documents.total) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Valid hingga:</span>
                      <div className="font-medium">{program.validUntil}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Review berikutnya:</span>
                      <div className="font-medium">{program.nextReview}</div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                  >
                    <FileCheck className="w-4 h-4" />
                    Cek Dokumen
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Unduh Laporan
                  </Button>
                  {program.status === "renewal" && (
                    <Button 
                      size="sm" 
                      className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    >
                      <Target className="w-4 h-4" />
                      Mulai Renewal
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Quick Actions */}
          <div className="pt-4 border-t border-amber-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-amber-300 hover:bg-amber-50"
              >
                <Calendar className="w-4 h-4" />
                Jadwal Assessment
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-amber-300 hover:bg-amber-50"
              >
                <FileCheck className="w-4 h-4" />
                Upload Dokumen
              </Button>
              <Button 
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                <Award className="w-4 h-4" />
                Progress Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}