"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

interface LabCardProps {
  lab: {
    id: string
    title: string
    description: string
    image: string
    instructor: string
    instructorImage?: string
    schedule: string
    capacity: number
    enrolled: number
    credits: number
    tags: string[]
    status: string
    color?: string
    [key: string]: any
  }
  onRegister: () => void
}

export function LabCard({ lab, onRegister }: LabCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
  }

  // Helper function to get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "open":
        return "success"
      case "almost-full":
        return "warning"
      case "full":
        return "destructive"
      default:
        return "outline"
    }
  }

  // Helper function to get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return "Open for Registration"
      case "almost-full":
        return "Almost Full"
      case "full":
        return "Full"
      default:
        return status
    }
  }

  // Helper function to get color gradient based on lab color
  const getColorGradient = () => {
    switch (lab.color) {
      case "blue":
        return "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30"
      case "green":
        return "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30"
      case "purple":
        return "from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30"
      case "orange":
        return "from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30"
      case "red":
        return "from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30"
      case "teal":
        return "from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30"
      default:
        return "from-gray-50 to-slate-50 dark:from-gray-950/30 dark:to-slate-950/30"
    }
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="h-full">
      <Card
        className={`overflow-hidden border-none shadow-md bg-gradient-to-br ${getColorGradient()} h-full flex flex-col transition-all duration-300`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="pb-2 relative">
          <div className="absolute top-3 right-3 z-10">
            <Badge variant={getStatusVariant(lab.status)} className="shadow-sm">
              {getStatusText(lab.status)}
            </Badge>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl leading-tight h-14 flex items-start">{lab.title}</CardTitle>
              <CardDescription className="mt-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800 shadow-sm">
                    <AvatarImage src={lab.instructorImage} alt={lab.instructor} />
                    <AvatarFallback className="bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                      {getInitials(lab.instructor)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{lab.instructor}</span>
                    <span className="text-xs text-muted-foreground">Supervising Lecturer</span>
                  </div>
                </div>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2 flex-grow flex flex-col justify-between">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-2 h-10">{lab.description}</p>

            <div className="flex flex-wrap gap-1 min-h-[28px]">
              {lab.tags.slice(0, 3).map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-none shadow-sm"
                >
                  {tag}
                </Badge>
              ))}
              {lab.tags.length > 3 && (
                <Badge
                  variant="outline"
                  className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-none shadow-sm"
                >
                  +{lab.tags.length - 3} more
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{lab.schedule}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>
                  {lab.enrolled}/{lab.capacity} enrolled
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-4">
          <Button
            onClick={onRegister}
            className={`w-full group ${lab.status === "full" ? "opacity-70" : ""}`}
            disabled={lab.status === "full"}
            variant={lab.status === "full" ? "outline" : "default"}
          >
            <span className="mr-2">{lab.status === "full" ? "Registration Closed" : "Register Now"}</span>
            <ChevronRight
              className={`h-4 w-4 transition-transform duration-300 ${isHovered && lab.status !== "full" ? "translate-x-1" : ""}`}
            />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

