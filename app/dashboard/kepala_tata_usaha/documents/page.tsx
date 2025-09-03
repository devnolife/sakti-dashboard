"use client"

import DocumentManagement from "@/components/kepala-tata-usaha/document-management"
import { motion } from "framer-motion"

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-6 space-y-8">
      {/* Header */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Manajemen Dokumen
        </h1>
        <p className="text-gray-600 text-lg">
          Sistem Manajemen Dokumen dan Arsip Digital Fakultas Teknik
        </p>
      </motion.div>

      {/* Document Management */}
      <DocumentManagement />
    </div>
  )
}