"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, FileText, Users, BookOpen, AlertCircle, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

interface MyLabData {
  id: string
  labId: string
  title: string
  code: string
  instructor: string
  progress: number
  status: string
  registeredAt: Date
  totalAssignments: number
  completedAssignments: number
  nextDeadline?: Date
}

interface MyLabsTabProps {
  labs?: MyLabData[]
}

export function MyLabsTab({ labs = [] }: MyLabsTabProps) {
  const [selectedLab, setSelectedLab] = useState<MyLabData | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approved: { label: "Aktif", variant: "default" as const, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
      pending: { label: "Menunggu", variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
      rejected: { label: "Ditolak", variant: "destructive" as const, color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
    }
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 60) return "bg-blue-500"
    if (progress >= 40) return "bg-yellow-500"
    return "bg-red-500"
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date)
  }

  const handleViewDetails = (lab: MyLabData) => {
    setSelectedLab(lab)
    setIsDetailOpen(true)
  }

  if (labs.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-muted/30">
          <BookOpen className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-medium">Belum Ada Lab Terdaftar</h3>
        <p className="max-w-md text-muted-foreground">
          Anda belum terdaftar dalam laboratorium apapun. Jelajahi lab yang tersedia dan daftar untuk mulai belajar.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {labs.map((lab, index) => {
          const statusBadge = getStatusBadge(lab.status)
          
          return (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full transition-all duration-200 hover:shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base font-semibold line-clamp-2">
                        {lab.title}
                      </CardTitle>
                      <CardDescription className="mt-1 text-sm">
                        {lab.code}
                      </CardDescription>
                    </div>
                    <Badge className={statusBadge.color}>
                      {statusBadge.label}
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
                      <span className="font-medium">{lab.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(lab.progress)}`}
                        style={{ width: `${lab.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {lab.completedAssignments}/{lab.totalAssignments} Tugas
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {formatDate(lab.registeredAt)}
                      </span>
                    </div>
                  </div>

                  {lab.nextDeadline && (
                    <div className="flex items-center p-2 space-x-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                      <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-orange-600 dark:text-orange-400">
                          Deadline: {formatDate(lab.nextDeadline)}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>

                <Separator />

                <CardFooter className="pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleViewDetails(lab)}
                  >
                    Lihat Detail
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedLab?.title}</DialogTitle>
            <DialogDescription>
              Detail informasi laboratorium dan progress Anda
            </DialogDescription>
          </DialogHeader>
          
          {selectedLab && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Kode Lab</label>
                  <p className="text-sm">{selectedLab.code}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <p className="text-sm">
                    <Badge className={getStatusBadge(selectedLab.status).color}>
                      {getStatusBadge(selectedLab.status).label}
                    </Badge>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Instruktur</label>
                  <p className="text-sm">{selectedLab.instructor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tanggal Daftar</label>
                  <p className="text-sm">{formatDate(selectedLab.registeredAt)}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Progress Keseluruhan</label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Tugas Selesai: {selectedLab.completedAssignments}/{selectedLab.totalAssignments}</span>
                    <span className="font-medium">{selectedLab.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(selectedLab.progress)}`}
                      style={{ width: `${selectedLab.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {selectedLab.nextDeadline && (
                <div className="p-4 border border-orange-200 rounded-lg bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <div>
                      <p className="font-medium text-orange-600 dark:text-orange-400">
                        Deadline Terdekat
                      </p>
                      <p className="text-sm text-orange-600 dark:text-orange-400">
                        {formatDate(selectedLab.nextDeadline)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}