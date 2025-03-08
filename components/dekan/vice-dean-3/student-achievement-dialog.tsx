"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, BookOpen, Calendar, Globe, Medal, Trophy, Users } from "lucide-react"
import type { OutstandingStudent } from "@/types/outstanding-student"

interface StudentAchievementDialogProps {
  student: OutstandingStudent
  open: boolean
  onClose: () => void
}

export function StudentAchievementDialog({ student, open, onClose }: StudentAchievementDialogProps) {
  const [activeTab, setActiveTab] = useState("profile")

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "academic":
        return <BookOpen className="h-4 w-4" />
      case "competition":
        return <Trophy className="h-4 w-4" />
      case "research":
        return <BookOpen className="h-4 w-4" />
      case "community":
        return <Users className="h-4 w-4" />
      case "leadership":
        return <Award className="h-4 w-4" />
      default:
        return <Medal className="h-4 w-4" />
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "department":
        return <Users className="h-4 w-4" />
      case "faculty":
        return <Users className="h-4 w-4" />
      case "university":
        return <BookOpen className="h-4 w-4" />
      case "regional":
        return <Globe className="h-4 w-4" />
      case "national":
        return <Globe className="h-4 w-4" />
      case "international":
        return <Globe className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      department: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      faculty: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      university: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      regional: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
      national: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      international: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
    }
    return colors[level] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      academic: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      competition: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
      research: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      community: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      leadership: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
    }
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Profil Mahasiswa Berprestasi</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-2 bg-muted/30 p-1 rounded-xl">
            <TabsTrigger
              value="profile"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
            >
              Profil
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
            >
              Prestasi ({student.achievements.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-4">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-24 w-24 mb-4 border-4 border-primary-100 dark:border-primary-900">
                <AvatarImage src={student.photoUrl} alt={student.name} />
                <AvatarFallback className="text-2xl">{student.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{student.name}</h2>
              <p className="text-muted-foreground">{student.nim}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                  Tahun ke-{student.year}
                </Badge>
                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                  IPK {student.gpa.toFixed(2)}
                </Badge>
              </div>
              <Badge className="mt-2" variant="outline">
                {student.department}
              </Badge>
            </div>

            <div className="bg-muted/20 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Biografi</h3>
              <p className="text-sm text-muted-foreground">{student.bio}</p>
            </div>

            <div className="mt-4">
              <h3 className="font-medium mb-2">Prestasi Utama</h3>
              <div className="space-y-2">
                {student.achievements.slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="bg-muted/20 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      {getCategoryIcon(achievement.category)}
                      <span className="font-medium">{achievement.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className={getCategoryColor(achievement.category)}>
                        {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(achievement.date)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-4">
            <div className="space-y-4">
              {student.achievements.map((achievement) => (
                <Card key={achievement.id} className="overflow-hidden border-none shadow-sm bg-white dark:bg-gray-900">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base font-semibold">{achievement.title}</CardTitle>
                      <Badge className={getLevelColor(achievement.level)}>
                        {achievement.level.charAt(0).toUpperCase() + achievement.level.slice(1)}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(achievement.date)}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(achievement.category)}>
                        <span className="flex items-center gap-1">
                          {getCategoryIcon(achievement.category)}
                          <span>{achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}</span>
                        </span>
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

