"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts"
import { 
  BarChart3, 
  Eye, 
  FileText, 
  Users,
  Calendar,
  Target
} from "lucide-react"

interface EvaluationData {
  period: string
  teaching: number
  research: number
  service: number
  overall: number
}

interface EvaluationMetricsProps {
  title: string
  data?: EvaluationData[]
  currentScore?: number
  targetScore?: number
  recommendations?: string[]
}

// Default evaluation data for 5 engineering programs
const defaultEvaluationData: EvaluationData[] = [
  { period: "2023 Sem 1", teaching: 85, research: 75, service: 80, overall: 80 },
  { period: "2023 Sem 2", teaching: 87, research: 78, service: 82, overall: 82 },
  { period: "2024 Sem 1", teaching: 89, research: 80, service: 85, overall: 85 },
  { period: "2024 Sem 2", teaching: 91, research: 83, service: 87, overall: 87 },
  { period: "Current", teaching: 92, research: 85, service: 89, overall: 89 }
]

const defaultRecommendations = [
  "Tingkatkan kolaborasi penelitian antar program studi untuk meningkatkan output penelitian",
  "Implementasikan program mentoring dosen junior untuk meningkatkan kualitas pengajaran",
  "Perkuat kerjasama industri khususnya untuk program studi Teknik Sipil dan Teknik Elektro",
  "Tingkatkan kegiatan pengabdian masyarakat yang terintegrasi dengan kurikulum",
  "Lakukan evaluasi berkala terhadap relevansi kurikulum dengan kebutuhan industri"
]

export default function EvaluationMetrics({
  title,
  data = defaultEvaluationData,
  currentScore = 89,
  targetScore = 92,
  recommendations = defaultRecommendations
}: EvaluationMetricsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {title}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Evaluasi Berkala dan Analisis Kinerja
                </p>
              </div>
            </div>
            <Badge 
              variant={currentScore >= targetScore ? "default" : "secondary"}
              className={`px-3 py-1 ${
                currentScore >= targetScore 
                  ? "bg-green-500 text-white" 
                  : "bg-orange-500 text-white"
              }`}
            >
              {currentScore}% / {targetScore}%
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Pengajaran</span>
                <span className="text-sm font-bold text-gray-900">
                  {data[data.length - 1]?.teaching || 0}%
                </span>
              </div>
              <Progress 
                value={data[data.length - 1]?.teaching || 0} 
                className="h-2"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Penelitian</span>
                <span className="text-sm font-bold text-gray-900">
                  {data[data.length - 1]?.research || 0}%
                </span>
              </div>
              <Progress 
                value={data[data.length - 1]?.research || 0} 
                className="h-2"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Pengabdian</span>
                <span className="text-sm font-bold text-gray-900">
                  {data[data.length - 1]?.service || 0}%
                </span>
              </div>
              <Progress 
                value={data[data.length - 1]?.service || 0} 
                className="h-2"
              />
            </div>
          </div>
          
          {/* Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="teaching" stackId="a" fill="#8b5cf6" name="Pengajaran" />
                <Bar dataKey="research" stackId="a" fill="#06b6d4" name="Penelitian" />
                <Bar dataKey="service" stackId="a" fill="#10b981" name="Pengabdian" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Recommendations */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-500" />
              Rekomendasi Perbaikan
            </h4>
            <div className="space-y-2">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 border border-orange-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{rec}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              className="flex-1 flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Detail Evaluasi
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Buat Laporan
            </Button>
            <Button 
              className="flex-1 flex items-center gap-2 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
            >
              <Calendar className="w-4 h-4" />
              Jadwalkan Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}