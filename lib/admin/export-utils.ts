/**
 * Utility functions for exporting admin data
 */

export type ExportFormat = 'csv' | 'json' | 'excel'

/**
 * Convert data to CSV format
 */
export function convertToCSV(data: any[], headers?: string[]): string {
  if (data.length === 0) return ''

  // Get headers from first object if not provided
  const csvHeaders = headers || Object.keys(data[0])

  // Create CSV header row
  const headerRow = csvHeaders.join(',')

  // Create CSV data rows
  const dataRows = data.map(row => {
    return csvHeaders.map(header => {
      const value = row[header]
      // Handle values that contain commas or quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value ?? ''
    }).join(',')
  })

  return [headerRow, ...dataRows].join('\n')
}

/**
 * Download data as file
 */
export function downloadFile(content: string, filename: string, contentType: string = 'text/plain') {
  const blob = new Blob([content], { type: contentType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Export users data
 */
export function exportUsers(users: any[], format: ExportFormat = 'csv') {
  const exportData = users.map(user => ({
    Username: user.username,
    Name: user.name,
    Role: user.role,
    'Sub Role': user.subRole || '-',
    Status: user.isActive ? 'Active' : 'Inactive',
    'Created At': new Date(user.createdAt).toLocaleDateString(),
  }))

  const timestamp = new Date().toISOString().split('T')[0]

  switch (format) {
    case 'csv':
      const csv = convertToCSV(exportData)
      downloadFile(csv, `users-export-${timestamp}.csv`, 'text/csv')
      break
    case 'json':
      const json = JSON.stringify(exportData, null, 2)
      downloadFile(json, `users-export-${timestamp}.json`, 'application/json')
      break
    default:
      throw new Error(`Format ${format} not supported yet`)
  }
}

/**
 * Export companies data
 */
export function exportCompanies(companies: any[], format: ExportFormat = 'csv') {
  const exportData = companies.map(company => ({
    Name: company.name,
    City: company.city,
    Industry: company.industry,
    'Contact Person': company.contactPerson,
    'Contact Phone': company.contactPhone,
    'Contact Email': company.contactEmail || '-',
    Status: company.isActive ? 'Active' : 'Inactive',
  }))

  const timestamp = new Date().toISOString().split('T')[0]

  switch (format) {
    case 'csv':
      const csv = convertToCSV(exportData)
      downloadFile(csv, `companies-export-${timestamp}.csv`, 'text/csv')
      break
    case 'json':
      const json = JSON.stringify(exportData, null, 2)
      downloadFile(json, `companies-export-${timestamp}.json`, 'application/json')
      break
    default:
      throw new Error(`Format ${format} not supported yet`)
  }
}

/**
 * Export audit logs
 */
export function exportAuditLogs(logs: any[], format: ExportFormat = 'csv') {
  const exportData = logs.map(log => ({
    Timestamp: new Date(log.createdAt).toLocaleString(),
    User: log.userName,
    Action: log.action,
    Resource: log.resource,
    Details: log.details,
    'IP Address': log.ipAddress,
  }))

  const timestamp = new Date().toISOString().split('T')[0]

  switch (format) {
    case 'csv':
      const csv = convertToCSV(exportData)
      downloadFile(csv, `audit-logs-${timestamp}.csv`, 'text/csv')
      break
    case 'json':
      const json = JSON.stringify(exportData, null, 2)
      downloadFile(json, `audit-logs-${timestamp}.json`, 'application/json')
      break
    default:
      throw new Error(`Format ${format} not supported yet`)
  }
}

/**
 * Export KKP applications
 */
export function exportKKPApplications(applications: any[], format: ExportFormat = 'csv') {
  const exportData = applications.map(app => ({
    'Application Number': app.applicationNumber,
    Student: app.student,
    Title: app.title,
    Company: app.company,
    Status: app.status,
    'Submitted At': new Date(app.submittedAt).toLocaleDateString(),
  }))

  const timestamp = new Date().toISOString().split('T')[0]

  switch (format) {
    case 'csv':
      const csv = convertToCSV(exportData)
      downloadFile(csv, `kkp-applications-${timestamp}.csv`, 'text/csv')
      break
    case 'json':
      const json = JSON.stringify(exportData, null, 2)
      downloadFile(json, `kkp-applications-${timestamp}.json`, 'application/json')
      break
    default:
      throw new Error(`Format ${format} not supported yet`)
  }
}

/**
 * Export system statistics
 */
export function exportStatistics(stats: any, format: ExportFormat = 'json') {
  const timestamp = new Date().toISOString().split('T')[0]

  switch (format) {
    case 'json':
      const json = JSON.stringify(stats, null, 2)
      downloadFile(json, `system-statistics-${timestamp}.json`, 'application/json')
      break
    case 'csv':
      // Flatten statistics object for CSV
      const flatData = []

      // Users stats
      flatData.push({
        Category: 'Users',
        Metric: 'Total',
        Value: stats.users.total
      })
      flatData.push({
        Category: 'Users',
        Metric: 'Active',
        Value: stats.users.active
      })
      flatData.push({
        Category: 'Users',
        Metric: 'Inactive',
        Value: stats.users.inactive
      })

      // Pending approvals
      flatData.push({
        Category: 'Pending Approvals',
        Metric: 'KKP',
        Value: stats.pendingApprovals.kkp
      })
      flatData.push({
        Category: 'Pending Approvals',
        Metric: 'Exams',
        Value: stats.pendingApprovals.exams
      })

      const csv = convertToCSV(flatData)
      downloadFile(csv, `system-statistics-${timestamp}.csv`, 'text/csv')
      break
    default:
      throw new Error(`Format ${format} not supported yet`)
  }
}
