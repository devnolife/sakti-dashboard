"use client"

import StaffManagementCard from "@/components/kepala-tata-usaha/staff-management-card"
import { motion } from "framer-motion"

export default function AdministrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-6 space-y-8">
      {/* Header */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Manajemen Administrasi
        </h1>
        <p className="text-gray-600 text-lg">
          Pengelolaan Sumber Daya Manusia dan Operasional Fakultas Teknik
        </p>
      </motion.div>

      {/* Staff Management */}
      <StaffManagementCard title="Manajemen Staf Fakultas Teknik" />
    </div>
  )
}