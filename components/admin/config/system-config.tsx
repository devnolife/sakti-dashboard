"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings, Save, RotateCcw, Lock, GraduationCap, DollarSign,
  BookMarked, Bell, Upload, Building2
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function SystemConfig() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">System Configuration</h2>
          <p className="text-muted-foreground mt-2">
            Manage application settings and parameters
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset to Default
          </Button>
          <Button className="gap-2" onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="auth" className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="auth" className="gap-2">
            <Lock className="h-4 w-4" />
            Auth
          </TabsTrigger>
          <TabsTrigger value="academic" className="gap-2">
            <GraduationCap className="h-4 w-4" />
            Academic
          </TabsTrigger>
          <TabsTrigger value="payment" className="gap-2">
            <DollarSign className="h-4 w-4" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="library" className="gap-2">
            <BookMarked className="h-4 w-4" />
            Library
          </TabsTrigger>
          <TabsTrigger value="notification" className="gap-2">
            <Bell className="h-4 w-4" />
            Notification
          </TabsTrigger>
          <TabsTrigger value="upload" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="faculty" className="gap-2">
            <Building2 className="h-4 w-4" />
            Faculty
          </TabsTrigger>
        </TabsList>

        {/* Authentication Settings */}
        <TabsContent value="auth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentication & Security</CardTitle>
              <CardDescription>
                Configure authentication and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="session-timeout">Session Timeout (seconds)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    defaultValue="86400"
                    placeholder="86400"
                  />
                  <p className="text-sm text-muted-foreground">
                    Default: 86400 (24 hours)
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password-length">Minimum Password Length</Label>
                  <Input
                    id="password-length"
                    type="number"
                    defaultValue="6"
                    placeholder="6"
                  />
                  <p className="text-sm text-muted-foreground">
                    Minimum number of characters for passwords
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="max-attempts">Maximum Login Attempts</Label>
                  <Input
                    id="max-attempts"
                    type="number"
                    defaultValue="5"
                    placeholder="5"
                  />
                  <p className="text-sm text-muted-foreground">
                    Account will be locked after this many failed attempts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Settings */}
        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Configuration</CardTitle>
              <CardDescription>
                Manage academic year, semester, and credit requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="current-semester">Current Semester</Label>
                  <Input
                    id="current-semester"
                    defaultValue="Ganjil 2024/2025"
                    placeholder="Ganjil 2024/2025"
                  />
                  <p className="text-sm text-muted-foreground">
                    Currently active academic semester
                  </p>
                </div>

                <Separator />

                <div className="grid gap-2">
                  <Label htmlFor="kkp-credits">Minimum Credits for KKP</Label>
                  <Input
                    id="kkp-credits"
                    type="number"
                    defaultValue="110"
                    placeholder="110"
                  />
                  <p className="text-sm text-muted-foreground">
                    Minimum credits required to apply for KKP
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="thesis-credits">Minimum Credits for Thesis</Label>
                  <Input
                    id="thesis-credits"
                    type="number"
                    defaultValue="130"
                    placeholder="130"
                  />
                  <p className="text-sm text-muted-foreground">
                    Minimum credits required to apply for thesis
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment & Financial Configuration</CardTitle>
              <CardDescription>
                Configure payment deadlines and fee calculations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="late-fee">Late Payment Fee (%)</Label>
                  <Input
                    id="late-fee"
                    type="number"
                    defaultValue="10"
                    placeholder="10"
                  />
                  <p className="text-sm text-muted-foreground">
                    Percentage added for late payments
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="payment-deadline">Payment Deadline (days)</Label>
                  <Input
                    id="payment-deadline"
                    type="number"
                    defaultValue="30"
                    placeholder="30"
                  />
                  <p className="text-sm text-muted-foreground">
                    Number of days from due date before considered late
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Library Settings */}
        <TabsContent value="library" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Library Configuration</CardTitle>
              <CardDescription>
                Configure book borrowing rules and fines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="max-books">Maximum Books Per Student</Label>
                  <Input
                    id="max-books"
                    type="number"
                    defaultValue="3"
                    placeholder="3"
                  />
                  <p className="text-sm text-muted-foreground">
                    Maximum number of books a student can borrow at once
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="borrow-period">Borrow Period (days)</Label>
                  <Input
                    id="borrow-period"
                    type="number"
                    defaultValue="14"
                    placeholder="14"
                  />
                  <p className="text-sm text-muted-foreground">
                    Number of days books can be borrowed
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="fine-amount">Fine Per Day (Rp)</Label>
                  <Input
                    id="fine-amount"
                    type="number"
                    defaultValue="1000"
                    placeholder="1000"
                  />
                  <p className="text-sm text-muted-foreground">
                    Fine amount in Rupiah for each day overdue
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Configuration</CardTitle>
              <CardDescription>
                Manage notification channels and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notif">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send notifications via email
                    </p>
                  </div>
                  <Switch id="email-notif" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notif">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send notifications via SMS
                    </p>
                  </div>
                  <Switch id="sms-notif" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upload Settings */}
        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>File Upload Configuration</CardTitle>
              <CardDescription>
                Configure file upload limits and allowed types
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="max-size">Maximum File Size (MB)</Label>
                  <Input
                    id="max-size"
                    type="number"
                    defaultValue="10"
                    placeholder="10"
                  />
                  <p className="text-sm text-muted-foreground">
                    Maximum file size in megabytes
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="allowed-ext">Allowed File Extensions</Label>
                  <Input
                    id="allowed-ext"
                    defaultValue="pdf,doc,docx,jpg,jpeg,png"
                    placeholder="pdf,doc,docx,jpg,jpeg,png"
                  />
                  <p className="text-sm text-muted-foreground">
                    Comma-separated list of allowed file extensions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Faculty Settings */}
        <TabsContent value="faculty" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Faculty Information</CardTitle>
              <CardDescription>
                Configure faculty and university information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="faculty-name">Faculty Name</Label>
                  <Input
                    id="faculty-name"
                    defaultValue="Fakultas Teknik"
                    placeholder="Fakultas Teknik"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="university">University Name</Label>
                  <Input
                    id="university"
                    defaultValue="Universitas Sriwijaya"
                    placeholder="Universitas Sriwijaya"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    defaultValue="Jl. Raya Palembang - Prabumulih Km. 32, Indralaya, Sumatera Selatan"
                    placeholder="Faculty address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      defaultValue="+62711580069"
                      placeholder="+62711580069"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="ft@unsri.ac.id"
                      placeholder="ft@unsri.ac.id"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    defaultValue="https://ft.unsri.ac.id"
                    placeholder="https://ft.unsri.ac.id"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
