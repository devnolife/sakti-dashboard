"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Award, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

interface RegistrationData {
  id: string
  labId: string
  title: string
  code: string
  instructor: string
  status: string
  registeredAt: Date
  completedAt: Date | null
  progress: number
  grade: string | null
}

interface RegistrationHistoryTabProps {
  registrations?: RegistrationData[]
}

export function RegistrationHistoryTab({ registrations = [] }: RegistrationHistoryTabProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { 
        label: "Selesai", 
        color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        icon: <Award className="w-3 h-3" />
      },
      approved: { 
        label: "Aktif", 
        color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        icon: <Clock className="w-3 h-3" />
      },
      pending: { 
        label: "Menunggu", 
        color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        icon: <Clock className="w-3 h-3" />
      },
      rejected: { 
        label: "Ditolak", 
        color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        icon: <AlertCircle className="w-3 h-3" />
      },
      dropped: { 
        label: "Dibatalkan", 
        color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
        icon: <AlertCircle className="w-3 h-3" />
      },
    }
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date)
  }

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  if (registrations.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-muted/30">
          <Calendar className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-medium">Belum Ada Riwayat Pendaftaran</h3>
        <p className="max-w-md text-muted-foreground">
          Anda belum pernah mendaftar laboratorium apapun. Mulai jelajahi lab yang tersedia dan daftar sekarang.
        </p>
      </motion.div>
    )
  }

  // Group registrations by status
  const groupedRegistrations = registrations.reduce((acc, reg) => {
    if (!acc[reg.status]) {
      acc[reg.status] = []
    }
    acc[reg.status].push(reg)
    return acc
  }, {} as Record<string, RegistrationData[]>)

  // Sort status order
  const statusOrder = ['completed', 'approved', 'pending', 'rejected', 'dropped']
  const sortedStatuses = statusOrder.filter(status => groupedRegistrations[status])

  return (
    <div className="space-y-8">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statusOrder.map(status => {
          const count = groupedRegistrations[status]?.length || 0
          const statusInfo = getStatusBadge(status)
          
          return (
            <Card key={status} className="text-center">
              <CardContent className="pt-4">
                <div className="flex items-center justify-center mb-2">
                  {statusInfo.icon}
                </div>
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm text-muted-foreground">{statusInfo.label}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Registration History by Status */}
      {sortedStatuses.map(status => {
        const statusInfo = getStatusBadge(status)
        const statusRegistrations = groupedRegistrations[status].sort(
          (a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()
        )

        return (
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <Badge className={statusInfo.color}>
                {statusInfo.icon}
                <span className="ml-1">{statusInfo.label}</span>
              </Badge>
              <span className="text-sm text-muted-foreground">
                ({statusRegistrations.length} lab)
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {statusRegistrations.map((registration, index) => (
                <motion.div
                  key={registration.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base font-semibold line-clamp-2">
                            {registration.title}
                          </CardTitle>
                          <CardDescription className="mt-1 text-sm">
                            {registration.code}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="text-xs">
                            {registration.instructor.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{registration.instructor}</p>
                          <p className="text-xs text-muted-foreground">Instruktur</p>
                        </div>
                      </div>

                      {registration.status === 'completed' && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium text-green-600">
                              {registration.progress}% ✓
                            </span>
                          </div>
                          {registration.grade && (
                            <div className="flex items-center justify-between text-sm">
                              <span>Nilai</span>
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                {registration.grade}
                              </Badge>
                            </div>
                          )}
                        </div>
                      )}

                      {(registration.status === 'approved' || registration.status === 'pending') && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">
                              {registration.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                            <div
                              className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                              style={{ width: `${registration.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>Daftar: {formatDate(registration.registeredAt)}</span>
                        </div>
                        {registration.completedAt && (
                          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                            <Award className="w-4 h-4" />
                            <span>Selesai: {formatDate(registration.completedAt)}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
