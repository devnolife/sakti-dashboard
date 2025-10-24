'use client'

import { useStudentProfile } from '@/hooks/use-student-profile'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, RefreshCw, User, GraduationCap, Phone, Mail } from 'lucide-react'
import { format } from 'date-fns'

export function StudentProfileCard() {
  const { profile, loading, error, lastSyncTime, syncProfile } = useStudentProfile({
    autoSync: true
  })

  if (loading && !profile) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-48">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full border-destructive">
        <CardContent className="flex flex-col items-center justify-center h-48 gap-4">
          <p className="text-destructive">Error: {error}</p>
          <Button onClick={syncProfile} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!profile) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-48">
          <p className="text-muted-foreground">No profile data available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {profile.users.name}
            </CardTitle>
            <CardDescription>NIM: {profile.nim}</CardDescription>
          </div>
          <Button
            onClick={syncProfile}
            variant="outline"
            size="sm"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Academic Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Program Studi:</span>
            <span>{profile.prodi?.nama || 'N/A'}</span>
          </div>
          {profile.prodi && (
            <div className="flex gap-2 ml-6">
              <Badge variant="secondary">{profile.prodi.jenjang}</Badge>
              <Badge variant="outline">{profile.prodi.fakultas}</Badge>
              {profile.prodi.akreditasi && (
                <Badge>{profile.prodi.akreditasi}</Badge>
              )}
            </div>
          )}
        </div>

        {/* GPA */}
        {profile.gpa !== null && (
          <div className="flex items-center gap-2">
            <span className="font-medium">IPK:</span>
            <Badge variant={profile.gpa >= 3.5 ? 'default' : 'secondary'}>
              {profile.gpa.toFixed(2)}
            </Badge>
          </div>
        )}

        {/* Academic Year & Semester */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Tahun Akademik</p>
            <p className="font-medium">{profile.academic_year}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Semester</p>
            <p className="font-medium">{profile.semester}</p>
          </div>
        </div>

        {/* Contact Info */}
        {(profile.phone || profile.users.name) && (
          <div className="space-y-2 pt-4 border-t">
            {profile.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{profile.phone}</span>
              </div>
            )}
          </div>
        )}

        {/* Academic Advisor */}
        {profile.lecturers && (
          <div className="space-y-2 pt-4 border-t">
            <p className="text-sm font-medium">Dosen Pembimbing Akademik</p>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{profile.lecturers.users.name}</span>
            </div>
            {profile.lecturers.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{profile.lecturers.email}</span>
              </div>
            )}
          </div>
        )}

        {/* Guardian Info */}
        {profile.guardian?.ayah && (
          <div className="space-y-2 pt-4 border-t">
            <p className="text-sm font-medium">Data Orang Tua</p>
            <div className="grid gap-1 text-sm">
              <p>
                <span className="text-muted-foreground">Nama Ayah:</span>{' '}
                {profile.guardian.ayah.nama}
              </p>
              {profile.guardian.ayah.pekerjaan && (
                <p>
                  <span className="text-muted-foreground">Pekerjaan:</span>{' '}
                  {profile.guardian.ayah.pekerjaan}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Last Sync Time */}
        {lastSyncTime && (
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Last synced: {format(lastSyncTime, 'PPp')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
