"use client"
import EvaluationMetrics from "@/components/gkm/evaluation-metrics"
import { motion } from "framer-motion"
export default function QualityEvaluationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 p-6 space-y-8">
      {/* Header */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Evaluasi Mutu Program Studi
        </h1>
        <p className="text-gray-600 text-lg">
          Evaluasi Komprehensif Kinerja 5 Program Studi Fakultas Teknik
        </p>
      </motion.div>
      {/* Evaluation Metrics for Each Program */}
      <div className="space-y-8">
        <EvaluationMetrics
          title="Evaluasi Teknik Sipil (Pengairan)"
          currentScore={94}
          targetScore={95}
          data={[
            { period: "2023 Sem 1", teaching: 88, research: 85, service: 82, overall: 85 },
            { period: "2023 Sem 2", teaching: 90, research: 87, service: 84, overall: 87 },
            { period: "2024 Sem 1", teaching: 92, research: 89, service: 86, overall: 89 },
            { period: "2024 Sem 2", teaching: 94, research: 91, service: 88, overall: 91 },
            { period: "Current", teaching: 96, research: 93, service: 90, overall: 93 }
          ]}
          recommendations={[
            "Tingkatkan penelitian di bidang irigasi dan pengelolaan air",
            "Perkuat kerjasama dengan Kementerian PUPR untuk program pengabdian",
            "Implementasikan teknologi smart irrigation dalam kurikulum"
          ]}
        />
        <EvaluationMetrics
          title="Evaluasi Teknik Elektro"
          currentScore={87}
          targetScore={90}
          data={[
            { period: "2023 Sem 1", teaching: 82, research: 75, service: 78, overall: 78 },
            { period: "2023 Sem 2", teaching: 84, research: 78, service: 80, overall: 81 },
            { period: "2024 Sem 1", teaching: 86, research: 80, service: 82, overall: 83 },
            { period: "2024 Sem 2", teaching: 88, research: 83, service: 85, overall: 85 },
            { period: "Current", teaching: 90, research: 85, service: 87, overall: 87 }
          ]}
          recommendations={[
            "Tingkatkan penelitian di bidang renewable energy dan smart grid",
            "Perkuat laboratorium elektronika daya dan sistem kontrol",
            "Jalin kerjasama dengan industri teknologi untuk magang mahasiswa"
          ]}
        />
        <EvaluationMetrics
          title="Evaluasi Arsitektur"
          currentScore={92}
          targetScore={95}
          data={[
            { period: "2023 Sem 1", teaching: 90, research: 82, service: 85, overall: 86 },
            { period: "2023 Sem 2", teaching: 91, research: 84, service: 86, overall: 87 },
            { period: "2024 Sem 1", teaching: 93, research: 86, service: 88, overall: 89 },
            { period: "2024 Sem 2", teaching: 94, research: 88, service: 90, overall: 91 },
            { period: "Current", teaching: 95, research: 90, service: 92, overall: 92 }
          ]}
          recommendations={[
            "Integrasikan sustainable design dan green building dalam kurikulum",
            "Perkuat penelitian arsitektur vernakular dan adaptasi iklim",
            "Tingkatkan kerjasama dengan arsitek profesional untuk guest lecture"
          ]}
        />
        <EvaluationMetrics
          title="Evaluasi Informatika"
          currentScore={85}
          targetScore={88}
          data={[
            { period: "2023 Sem 1", teaching: 80, research: 72, service: 75, overall: 76 },
            { period: "2023 Sem 2", teaching: 82, research: 75, service: 77, overall: 78 },
            { period: "2024 Sem 1", teaching: 84, research: 78, service: 80, overall: 81 },
            { period: "2024 Sem 2", teaching: 86, research: 80, service: 82, overall: 83 },
            { period: "Current", teaching: 88, research: 82, service: 85, overall: 85 }
          ]}
          recommendations={[
            "Tingkatkan penelitian di bidang AI, machine learning, dan data science",
            "Perbarui kurikulum dengan teknologi terkini seperti cloud computing",
            "Perkuat kerjasama dengan startup dan perusahaan teknologi"
          ]}
        />
        <EvaluationMetrics
          title="Evaluasi Perencanaan Wilayah Kota"
          currentScore={88}
          targetScore={92}
          data={[
            { period: "2023 Sem 1", teaching: 85, research: 78, service: 80, overall: 81 },
            { period: "2023 Sem 2", teaching: 86, research: 80, service: 82, overall: 83 },
            { period: "2024 Sem 1", teaching: 88, research: 82, service: 84, overall: 85 },
            { period: "2024 Sem 2", teaching: 89, research: 84, service: 86, overall: 86 },
            { period: "Current", teaching: 91, research: 86, service: 88, overall: 88 }
          ]}
          recommendations={[
            "Integrasikan smart city dan digital twin dalam perencanaan kota",
            "Perkuat penelitian sustainable urban development",
            "Tingkatkan kerjasama dengan pemerintah daerah untuk project-based learning"
          ]}
        />
      </div>
    </div>
  )
}