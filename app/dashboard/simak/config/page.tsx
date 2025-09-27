"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  Clock,
  Calendar,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Database,
  Server,
  Activity
} from "lucide-react"
import { jadwalKuliahAPI } from "@/lib/api/jadwal-kuliah"

interface TimeSlot {
  start: string
  end: string
}

interface SystemConfig {
  time_slots: Record<string, TimeSlot>
  default_academic_year: string
  default_semester_type: string
}

export default function SystemConfigPage() {
  const [config, setConfig] = useState<SystemConfig>({
    time_slots: {
      "1": { start: "07:00", end: "08:40" },
      "2": { start: "08:40", end: "10:20" },
      "3": { start: "10:30", end: "12:10" },
      "4": { start: "13:00", end: "14:40" },
      "5": { start: "14:40", end: "16:20" }
    },
    default_academic_year: "2025-2026",
    default_semester_type: "ganjil"
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [systemHealth, setSystemHealth] = useState({
    database: "healthy",
    api_response: "healthy",
    storage: "warning"
  })

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await jadwalKuliahAPI.getSystemConfig()
        if (response.success && response.data) {
          // Transform API response to our config format
          const timeSlots = response.data.find(c => c.key === 'time_slots')
          const academicYear = response.data.find(c => c.key === 'default_academic_year')
          const semesterType = response.data.find(c => c.key === 'default_semester_type')

          setConfig({
            time_slots: timeSlots?.value || config.time_slots,
            default_academic_year: academicYear?.value || config.default_academic_year,
            default_semester_type: semesterType?.value || config.default_semester_type
          })
        }
      } catch (error) {
        console.error('Failed to load config:', error)
      } finally {
        setLoading(false)
      }
    }

    const checkSystemHealth = async () => {
      try {
        const healthResponse = await jadwalKuliahAPI.getHealth()
        if (healthResponse.success) {
          setSystemHealth({
            database: "healthy",
            api_response: "healthy",
            storage: "warning"
          })
        }
      } catch (error) {
        setSystemHealth({
          database: "error",
          api_response: "error",
          storage: "error"
        })
      }
    }

    loadConfig()
    checkSystemHealth()
  }, [])

  const handleSaveConfig = async () => {
    setSaving(true)
    try {
      // Save time slots
      await jadwalKuliahAPI.updateSystemConfig('time_slots', {
        value: config.time_slots,
        description: 'System time slots configuration'
      })

      // Save academic year
      await jadwalKuliahAPI.updateSystemConfig('default_academic_year', {
        value: config.default_academic_year,
        description: 'Default academic year'
      })

      // Save semester type
      await jadwalKuliahAPI.updateSystemConfig('default_semester_type', {
        value: config.default_semester_type,
        description: 'Default semester type'
      })

      alert("Konfigurasi berhasil disimpan!")
    } catch (error) {
      console.error('Failed to save config:', error)
      alert("Gagal menyimpan konfigurasi. Silakan coba lagi.")
    } finally {
      setSaving(false)
    }
  }

  const updateTimeSlot = (slot: string, field: 'start' | 'end', value: string) => {
    setConfig({
      ...config,
      time_slots: {
        ...config.time_slots,
        [slot]: {
          ...config.time_slots[slot],
          [field]: value
        }
      }
    })
  }

  const getHealthColor = (status: string) => {
    switch (status) {
      case "healthy": return "text-green-500"
      case "warning": return "text-yellow-500"
      case "error": return "text-red-500"
      default: return "text-gray-500"
    }
  }

  const getHealthIcon = (status: string) => {
    switch (status) {
      case "healthy": return <CheckCircle className="w-4 h-4" />
      case "warning": return <AlertCircle className="w-4 h-4" />
      case "error": return <AlertCircle className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Konfigurasi Sistem
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Kelola pengaturan sistem dan konfigurasi aplikasi
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleSaveConfig}
            disabled={saving}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Simpan Konfigurasi
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Time Slots Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800 dark:text-gray-200">
                <Clock className="w-5 h-5 mr-2 text-blue-500" />
                Konfigurasi Waktu Perkuliahan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(config.time_slots).map(([slot, times]) => (
                <div key={slot} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="w-16 text-center">
                    <Badge variant="outline" className="text-sm">
                      Slot {slot}
                    </Badge>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-gray-600">Mulai</Label>
                      <Input
                        type="time"
                        value={times.start}
                        onChange={(e) => updateTimeSlot(slot, 'start', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-gray-600">Selesai</Label>
                      <Input
                        type="time"
                        value={times.end}
                        onChange={(e) => updateTimeSlot(slot, 'end', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {times.start} - {times.end}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800 dark:text-gray-200">
                <Calendar className="w-5 h-5 mr-2 text-green-500" />
                Pengaturan Akademik Default
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="academic_year">Tahun Akademik Default</Label>
                  <Input
                    id="academic_year"
                    value={config.default_academic_year}
                    onChange={(e) => setConfig({ ...config, default_academic_year: e.target.value })}
                    placeholder="2025-2026"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester_type">Tipe Semester Default</Label>
                  <select
                    id="semester_type"
                    value={config.default_semester_type}
                    onChange={(e) => setConfig({ ...config, default_semester_type: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                  >
                    <option value="ganjil">Semester Ganjil</option>
                    <option value="genap">Semester Genap</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health & Status */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800 dark:text-gray-200">
                <Activity className="w-5 h-5 mr-2 text-purple-500" />
                Status Sistem
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">Database</span>
                  </div>
                  <Badge
                    variant={systemHealth.database === "healthy" ? "default" : "destructive"}
                    className={`${getHealthColor(systemHealth.database)} flex items-center`}
                  >
                    {getHealthIcon(systemHealth.database)}
                    <span className="ml-1 capitalize">{systemHealth.database}</span>
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Server className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">API Response</span>
                  </div>
                  <Badge
                    variant={systemHealth.api_response === "healthy" ? "default" : "destructive"}
                    className={`${getHealthColor(systemHealth.api_response)} flex items-center`}
                  >
                    {getHealthIcon(systemHealth.api_response)}
                    <span className="ml-1 capitalize">{systemHealth.api_response}</span>
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Settings className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">Storage</span>
                  </div>
                  <Badge
                    variant={systemHealth.storage === "healthy" ? "default" : "outline"}
                    className={`${getHealthColor(systemHealth.storage)} flex items-center`}
                  >
                    {getHealthIcon(systemHealth.storage)}
                    <span className="ml-1 capitalize">{systemHealth.storage}</span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
            <CardHeader>
              <CardTitle className="text-amber-800 dark:text-amber-200">
                ⚠️ Peringatan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Perubahan konfigurasi akan mempengaruhi seluruh sistem. Pastikan untuk melakukan backup sebelum menyimpan perubahan.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
