"use client"

interface StudentPerformanceMetricsProps {
  departmentId: string
}

export function StudentPerformanceMetrics({ departmentId }: StudentPerformanceMetricsProps) {
  // Mock data for student performance metrics
  const metricsData = {
    all: {
      totalStudents: 1550,
      activeStudents: 1550,
      onLeaveStudents: 65,
      graduatedStudents: 390,
      averageGpa: 3.24,
      belowAverageCount: 234,
      belowAveragePercentage: 15.1,
      academicWarningCount: 57,
      academicWarningPercentage: 3.68,
    },
    civil: {
      totalStudents: 320,
      activeStudents: 320,
      onLeaveStudents: 15,
      graduatedStudents: 85,
      averageGpa: 3.1,
      belowAverageCount: 48,
      belowAveragePercentage: 15,
      academicWarningCount: 12,
      academicWarningPercentage: 3.75,
    },
    electrical: {
      totalStudents: 280,
      activeStudents: 280,
      onLeaveStudents: 12,
      graduatedStudents: 70,
      averageGpa: 3.2,
      belowAverageCount: 42,
      belowAveragePercentage: 15,
      academicWarningCount: 10,
      academicWarningPercentage: 3.57,
    },
    architecture: {
      totalStudents: 250,
      activeStudents: 250,
      onLeaveStudents: 8,
      graduatedStudents: 65,
      averageGpa: 3.3,
      belowAverageCount: 38,
      belowAveragePercentage: 15.2,
      academicWarningCount: 9,
      academicWarningPercentage: 3.6,
    },
    informatics: {
      totalStudents: 410,
      activeStudents: 410,
      onLeaveStudents: 20,
      graduatedStudents: 95,
      averageGpa: 3.4,
      belowAverageCount: 62,
      belowAveragePercentage: 15.1,
      academicWarningCount: 15,
      academicWarningPercentage: 3.66,
    },
    urban: {
      totalStudents: 290,
      activeStudents: 290,
      onLeaveStudents: 10,
      graduatedStudents: 75,
      averageGpa: 3.2,
      belowAverageCount: 44,
      belowAveragePercentage: 15.2,
      academicWarningCount: 11,
      academicWarningPercentage: 3.79,
    },
  }

  const metrics = metricsData[departmentId as keyof typeof metricsData] || metricsData.all

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border bg-white dark:bg-gray-950 p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary-100 dark:hover:border-primary-900 group">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-muted-foreground">Total Mahasiswa</div>
          <div className="h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-500 dark:text-blue-400"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold">{metrics.totalStudents}</div>
        <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-green-400"></span>
          Aktif: {metrics.activeStudents - metrics.onLeaveStudents}
          <span className="inline-block h-2 w-2 rounded-full bg-amber-400 ml-2"></span>
          Cuti: {metrics.onLeaveStudents}
        </div>
      </div>
      <div className="rounded-xl border bg-white dark:bg-gray-950 p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary-100 dark:hover:border-primary-900 group">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-muted-foreground">Rata-rata IPK</div>
          <div className="h-8 w-8 rounded-full bg-green-50 dark:bg-green-950 flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-900 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500 dark:text-green-400"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold">{metrics.averageGpa.toFixed(2)}</div>
        <div className="mt-2 text-xs text-muted-foreground">Dari seluruh mahasiswa aktif</div>
      </div>
      <div className="rounded-xl border bg-white dark:bg-gray-950 p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary-100 dark:hover:border-primary-900 group">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-muted-foreground">IPK Di Bawah Rata-rata</div>
          <div className="h-8 w-8 rounded-full bg-amber-50 dark:bg-amber-950 flex items-center justify-center group-hover:bg-amber-100 dark:group-hover:bg-amber-900 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-amber-500 dark:text-amber-400"
            >
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold text-amber-600 dark:text-amber-500">{metrics.belowAverageCount}</div>
        <div className="mt-2 text-xs text-muted-foreground">{metrics.belowAveragePercentage}% dari total mahasiswa</div>
      </div>
      <div className="rounded-xl border bg-white dark:bg-gray-950 p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary-100 dark:hover:border-primary-900 group">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-muted-foreground">Peringatan Akademik</div>
          <div className="h-8 w-8 rounded-full bg-red-50 dark:bg-red-950 flex items-center justify-center group-hover:bg-red-100 dark:group-hover:bg-red-900 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-500 dark:text-red-400"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold text-red-600 dark:text-red-500">{metrics.academicWarningCount}</div>
        <div className="mt-2 text-xs text-muted-foreground">
          {metrics.academicWarningPercentage}% dari total mahasiswa
        </div>
      </div>
    </div>
  )
}

