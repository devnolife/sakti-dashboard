"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Globe,
  Mail,
  Bell,
  Lock,
  Database,
  FileText,
  Calendar,
  DollarSign,
  Shield,
  Zap,
  Save,
  RotateCcw,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [hasChanges, setHasChanges] = useState(false)

  const handleSave = () => {
    // Implement save logic
    setHasChanges(false)
  }

  const handleReset = () => {
    // Implement reset logic
    setHasChanges(false)
  }

  return (
    <div className="container mx-auto p-6 space-y-6 mt-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8" />
            System Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Konfigurasi pengaturan sistem dan aplikasi
          </p>
        </div>
        {hasChanges && (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Simpan Perubahan
            </Button>
          </div>
        )}
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="academic">Akademik</TabsTrigger>
          <TabsTrigger value="payment">Pembayaran</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Pengaturan Umum
              </CardTitle>
              <CardDescription>
                Konfigurasi dasar sistem dan aplikasi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="app-name">Nama Aplikasi</Label>
                  <Input
                    id="app-name"
                    defaultValue="Dashboard Fakultas Teknik"
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution-name">Nama Institusi</Label>
                  <Input
                    id="institution-name"
                    defaultValue="Universitas ABC"
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution-logo">Logo URL</Label>
                  <Input
                    id="institution-logo"
                    placeholder="https://example.com/logo.png"
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona Waktu</Label>
                  <Select defaultValue="asia-jakarta">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia-jakarta">Asia/Jakarta (WIB)</SelectItem>
                      <SelectItem value="asia-makassar">Asia/Makassar (WITA)</SelectItem>
                      <SelectItem value="asia-jayapura">Asia/Jayapura (WIT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Bahasa Default</Label>
                  <Select defaultValue="id">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id">Bahasa Indonesia</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Aktifkan mode maintenance untuk melakukan pemeliharaan sistem
                    </p>
                  </div>
                  <Switch onCheckedChange={() => setHasChanges(true)} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Registrasi Publik</Label>
                    <p className="text-sm text-muted-foreground">
                      Izinkan registrasi pengguna baru dari publik
                    </p>
                  </div>
                  <Switch onCheckedChange={() => setHasChanges(true)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Konfigurasi Email
              </CardTitle>
              <CardDescription>
                Pengaturan SMTP dan template email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input
                    id="smtp-host"
                    placeholder="smtp.gmail.com"
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input
                      id="smtp-port"
                      type="number"
                      defaultValue="587"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtp-encryption">Encryption</Label>
                    <Select defaultValue="tls">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tls">TLS</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtp-username">SMTP Username</Label>
                  <Input
                    id="smtp-username"
                    placeholder="email@example.com"
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <Input
                    id="smtp-password"
                    type="password"
                    placeholder="••••••••"
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="from-email">From Email</Label>
                  <Input
                    id="from-email"
                    type="email"
                    defaultValue="noreply@example.com"
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="from-name">From Name</Label>
                  <Input
                    id="from-name"
                    defaultValue="Fakultas Teknik"
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Send Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Kirim notifikasi email kepada pengguna
                    </p>
                  </div>
                  <Switch defaultChecked onCheckedChange={() => setHasChanges(true)} />
                </div>

                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Test Email Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Pengaturan Notifikasi
              </CardTitle>
              <CardDescription>
                Kelola pengaturan notifikasi sistem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifikasi Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Kirim notifikasi melalui email
                    </p>
                  </div>
                  <Switch defaultChecked onCheckedChange={() => setHasChanges(true)} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifikasi Push</Label>
                    <p className="text-sm text-muted-foreground">
                      Kirim notifikasi push ke browser
                    </p>
                  </div>
                  <Switch defaultChecked onCheckedChange={() => setHasChanges(true)} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifikasi SMS</Label>
                    <p className="text-sm text-muted-foreground">
                      Kirim notifikasi melalui SMS
                    </p>
                  </div>
                  <Switch onCheckedChange={() => setHasChanges(true)} />
                </div>

                <Separator />

                <h4 className="font-medium">Event Notifications</h4>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-normal">Pengajuan KKP Baru</Label>
                    <Switch defaultChecked onCheckedChange={() => setHasChanges(true)} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="font-normal">Persetujuan Dokumen</Label>
                    <Switch defaultChecked onCheckedChange={() => setHasChanges(true)} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="font-normal">Pembayaran Diterima</Label>
                    <Switch defaultChecked onCheckedChange={() => setHasChanges(true)} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="font-normal">User Login Baru</Label>
                    <Switch onCheckedChange={() => setHasChanges(true)} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="font-normal">System Errors</Label>
                    <Switch defaultChecked onCheckedChange={() => setHasChanges(true)} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Pengaturan Keamanan
              </CardTitle>
              <CardDescription>
                Konfigurasi keamanan dan autentikasi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (menit)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    defaultValue="60"
                    onChange={() => setHasChanges(true)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Durasi session sebelum pengguna harus login ulang
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-min-length">Minimum Password Length</Label>
                  <Input
                    id="password-min-length"
                    type="number"
                    defaultValue="8"
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                  <Input
                    id="max-login-attempts"
                    type="number"
                    defaultValue="5"
                    onChange={() => setHasChanges(true)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Jumlah maksimal percobaan login sebelum akun dikunci
                  </p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Email Verification</Label>
                    <p className="text-sm text-muted-foreground">
                      Wajibkan verifikasi email untuk user baru
                    </p>
                  </div>
                  <Switch defaultChecked onCheckedChange={() => setHasChanges(true)} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Aktifkan 2FA untuk semua user
                    </p>
                  </div>
                  <Switch onCheckedChange={() => setHasChanges(true)} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Force Password Change</Label>
                    <p className="text-sm text-muted-foreground">
                      Wajibkan user mengganti password setiap 90 hari
                    </p>
                  </div>
                  <Switch onCheckedChange={() => setHasChanges(true)} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>IP Whitelist</Label>
                    <p className="text-sm text-muted-foreground">
                      Batasi akses hanya dari IP yang terdaftar
                    </p>
                  </div>
                  <Switch onCheckedChange={() => setHasChanges(true)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Settings */}
        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Pengaturan Akademik
              </CardTitle>
              <CardDescription>
                Konfigurasi tahun akademik dan semester
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-year">Tahun Akademik Aktif</Label>
                  <Input
                    id="current-year"
                    defaultValue="2024/2025"
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current-semester">Semester Aktif</Label>
                  <Select defaultValue="ganjil">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ganjil">Ganjil</SelectItem>
                      <SelectItem value="genap">Genap</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="min-sks">Minimum SKS per Semester</Label>
                  <Input
                    id="min-sks"
                    type="number"
                    defaultValue="12"
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-sks">Maximum SKS per Semester</Label>
                  <Input
                    id="max-sks"
                    type="number"
                    defaultValue="24"
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passing-grade">Nilai Minimum Kelulusan</Label>
                  <Input
                    id="passing-grade"
                    type="number"
                    step="0.01"
                    defaultValue="2.00"
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Generate Schedule</Label>
                    <p className="text-sm text-muted-foreground">
                      Otomatis generate jadwal perkuliahan
                    </p>
                  </div>
                  <Switch onCheckedChange={() => setHasChanges(true)} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Late Submission</Label>
                    <p className="text-sm text-muted-foreground">
                      Izinkan pengumpulan tugas terlambat dengan penalti
                    </p>
                  </div>
                  <Switch defaultChecked onCheckedChange={() => setHasChanges(true)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pengaturan Pembayaran
              </CardTitle>
              <CardDescription>
                Konfigurasi payment gateway dan biaya
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-gateway">Payment Gateway</Label>
                  <Select defaultValue="midtrans">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="midtrans">Midtrans</SelectItem>
                      <SelectItem value="xendit">Xendit</SelectItem>
                      <SelectItem value="manual">Manual Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="merchant-id">Merchant ID</Label>
                  <Input
                    id="merchant-id"
                    placeholder="Your merchant ID"
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Your API key"
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="late-payment-fee">Denda Keterlambatan (%)</Label>
                  <Input
                    id="late-payment-fee"
                    type="number"
                    step="0.1"
                    defaultValue="2.0"
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-deadline">Batas Pembayaran (hari)</Label>
                  <Input
                    id="payment-deadline"
                    type="number"
                    defaultValue="7"
                    onChange={() => setHasChanges(true)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Jumlah hari setelah invoice diterbitkan
                  </p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Generate Invoice</Label>
                    <p className="text-sm text-muted-foreground">
                      Otomatis buat invoice untuk pembayaran rutin
                    </p>
                  </div>
                  <Switch defaultChecked onCheckedChange={() => setHasChanges(true)} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Send Payment Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Kirim pengingat pembayaran via email
                    </p>
                  </div>
                  <Switch defaultChecked onCheckedChange={() => setHasChanges(true)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

