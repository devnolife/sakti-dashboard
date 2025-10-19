"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Award, FileText, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

interface CompletedLabData {
  id: string
  labId: string
  title: string
  code: string
  instructor: string
  progress: number
  grade: string | null
  completedAt: Date | null
  totalAssignments: number
  averageScore: number
}

interface CompletedLabsTabProps {
  labs?: CompletedLabData[]
}

export function CompletedLabsTab({ labs = [] }: CompletedLabsTabProps) {
  const getGradeBadge = (grade: string) => {
    const gradeConfig = {
      'A': { color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", icon: "🏆" },
      'B+': { color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", icon: "🥈" },
      'B': { color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", icon: "🥉" },
      'C+': { color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200", icon: "⭐" },
      'C': { color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200", icon: "⭐" },
      'D': { color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200", icon: "📜" },
    }
    return gradeConfig[grade as keyof typeof gradeConfig] || gradeConfig['C']
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date)
  }

  if (labs.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-muted/30">
          <Award className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-medium">Belum Ada Lab yang Diselesaikan</h3>
        <p className="max-w-md text-muted-foreground">
          Anda belum menyelesaikan laboratorium apapun. Terus kerjakan tugas dan praktikum Anda untuk mencapai progress 100%.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {labs.map((lab, index) => {
          const gradeBadge = getGradeBadge(lab.grade || "N/A")
          
          return (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full transition-all duration-200 hover:shadow-lg border-green-200 dark:border-green-800">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base font-semibold line-clamp-2 text-green-700 dark:text-green-300">
                        {lab.title}
                      </CardTitle>
                      <CardDescription className="mt-1 text-sm">
                        {lab.code}
                      </CardDescription>
                    </div>
                    <Badge className={gradeBadge.color}>
                      {gradeBadge.icon} {lab.grade}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-xs">
                        {lab.instructor.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{lab.instructor}</p>
                      <p className="text-xs text-muted-foreground">Instruktur</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        {lab.progress}% ✓
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div
                        className="h-2 bg-green-500 rounded-full transition-all duration-300"
                        style={{ width: `${lab.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {lab.totalAssignments} Tugas
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Rata-rata: {lab.averageScore.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center p-3 space-x-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-green-600 dark:text-green-400">
                        Selesai pada
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        {lab.completedAt ? formatDate(lab.completedAt) : "Belum selesai"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Summary Statistics */}
      {labs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-700 dark:text-green-300">
                <Award className="w-5 h-5" />
                <span>Ringkasan Pencapaian</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {labs.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Lab Selesai</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {(labs.reduce((sum, lab) => sum + lab.averageScore, 0) / labs.length).toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">Rata-rata Nilai</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {labs.filter(lab => lab.grade && ['A', 'B+', 'B'].includes(lab.grade)).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Nilai Baik</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {labs.reduce((sum, lab) => sum + lab.totalAssignments, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Tugas</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
