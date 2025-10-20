// Backend Integration API untuk Sistem Penomoran Surat
// File ini akan diintegrasikan dengan backend untuk mengelola penomoran otomatis

export interface NumberingRule {
  id: string
  letterType: string
  prefix: string
  format: string
  currentNumber: number
  resetPeriod: 'never' | 'monthly' | 'yearly'
  is_active: boolean
  createdAt?: string
  updatedAt?: string
}

export interface NumberingSystemData {
  currentNumber: number
  format: string
  lastUsed: string
  totalThisMonth: number
  totalThisYear: number
  categories: {
    type: string
    lastNumber: number
    format: string
    total: number
  }[]
}

// Backend API endpoints yang akan diimplementasi
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

export class NumberingSystemAPI {
  // Mendapatkan data sistem penomoran terkini
  static async getNumberingSystemData(): Promise<NumberingSystemData> {
    try {
      const response = await fetch(`${API_BASE_URL}/numbering-system/data`)
      if (!response.ok) {
        throw new Error('Failed to fetch numbering system data')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching numbering system data:', error)
      // Return mock data untuk development
      return {
        currentNumber: 145,
        format: "001/TU-UNIV/{YYYY}/{MM}",
        lastUsed: "145/TU-UNIV/2024/01",
        totalThisMonth: 12,
        totalThisYear: 145,
        categories: [
          { type: "active_student", lastNumber: 89, format: "AS", total: 89 },
          { type: "research_permission", lastNumber: 23, format: "RP", total: 23 },
          { type: "internship_recommendation", lastNumber: 18, format: "IR", total: 18 },
          { type: "graduation_letter", lastNumber: 15, format: "GL", total: 15 }
        ]
      }
    }
  }

  // Mendapatkan semua aturan penomoran
  static async getNumberingRules(): Promise<NumberingRule[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/numbering-system/rules`)
      if (!response.ok) {
        throw new Error('Failed to fetch numbering rules')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching numbering rules:', error)
      // Return mock data untuk development
      return [
        {
          id: '1',
          letterType: 'active_student',
          prefix: 'AS',
          format: 'AS-{XXX}/TU-UNIV/{YYYY}/{MM}',
          currentNumber: 89,
          resetPeriod: 'yearly',
          is_active: true
        },
        {
          id: '2',
          letterType: 'research_permission',
          prefix: 'RP',
          format: 'RP-{XXX}/TU-UNIV/{YYYY}/{MM}',
          currentNumber: 23,
          resetPeriod: 'yearly',
          is_active: true
        },
        {
          id: '3',
          letterType: 'internship_recommendation',
          prefix: 'IR',
          format: 'IR-{XXX}/TU-UNIV/{YYYY}/{MM}',
          currentNumber: 18,
          resetPeriod: 'yearly',
          is_active: true
        },
        {
          id: '4',
          letterType: 'graduation_letter',
          prefix: 'GL',
          format: 'GL-{XXX}/TU-UNIV/{YYYY}/{MM}',
          currentNumber: 15,
          resetPeriod: 'yearly',
          is_active: true
        }
      ]
    }
  }

  // Membuat aturan penomoran baru
  static async createNumberingRule(rule: Omit<NumberingRule, 'id' | 'createdAt' | 'updatedAt'>): Promise<NumberingRule> {
    try {
      const response = await fetch(`${API_BASE_URL}/numbering-system/rules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rule)
      })
      
      if (!response.ok) {
        throw new Error('Failed to create numbering rule')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error creating numbering rule:', error)
      throw error
    }
  }

  // Memperbarui aturan penomoran
  static async updateNumberingRule(id: string, rule: Partial<NumberingRule>): Promise<NumberingRule> {
    try {
      const response = await fetch(`${API_BASE_URL}/numbering-system/rules/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rule)
      })
      
      if (!response.ok) {
        throw new Error('Failed to update numbering rule')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error updating numbering rule:', error)
      throw error
    }
  }

  // Menghapus aturan penomoran
  static async deleteNumberingRule(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/numbering-system/rules/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete numbering rule')
      }
    } catch (error) {
      console.error('Error deleting numbering rule:', error)
      throw error
    }
  }

  // Generate nomor berikutnya untuk jenis surat tertentu
  static async generateNextNumber(letterType: string): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/numbering-system/generate/${letterType}`, {
        method: 'POST'
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate next number')
      }
      
      const data = await response.json()
      return data.nextNumber
    } catch (error) {
      console.error('Error generating next number:', error)
      throw error
    }
  }

  // Reset counter berdasarkan periode
  static async resetCounter(letterType: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/numbering-system/reset/${letterType}`, {
        method: 'POST'
      })
      
      if (!response.ok) {
        throw new Error('Failed to reset counter')
      }
    } catch (error) {
      console.error('Error resetting counter:', error)
      throw error
    }
  }

  // Mendapatkan statistik penggunaan nomor
  static async getNumberingStatistics(period?: 'month' | 'year'): Promise<any> {
    try {
      const queryParam = period ? `?period=${period}` : ''
      const response = await fetch(`${API_BASE_URL}/numbering-system/statistics${queryParam}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch numbering statistics')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching numbering statistics:', error)
      throw error
    }
  }
}

// Utility functions untuk format nomor
export class NumberingUtils {
  static formatNumber(format: string, number: number, date: Date = new Date()): string {
    return format
      .replace('{XXX}', String(number).padStart(3, '0'))
      .replace('{YYYY}', date.getFullYear().toString())
      .replace('{MM}', String(date.getMonth() + 1).padStart(2, '0'))
      .replace('{DD}', String(date.getDate()).padStart(2, '0'))
  }

  static parseFormat(format: string): {
    hasNumber: boolean
    hasYear: boolean
    hasMonth: boolean
    hasDay: boolean
  } {
    return {
      hasNumber: format.includes('{XXX}'),
      hasYear: format.includes('{YYYY}'),
      hasMonth: format.includes('{MM}'),
      hasDay: format.includes('{DD}')
    }
  }

  static validateFormat(format: string): boolean {
    const requiredPattern = /\{XXX\}/
    return requiredPattern.test(format)
  }
}

// Hook untuk penggunaan di React components
export function useNumberingSystem() {
  const getNumberingData = async () => {
    return await NumberingSystemAPI.getNumberingSystemData()
  }

  const getNumberingRules = async () => {
    return await NumberingSystemAPI.getNumberingRules()
  }

  const generateNumber = async (letterType: string) => {
    return await NumberingSystemAPI.generateNextNumber(letterType)
  }

  return {
    getNumberingData,
    getNumberingRules,
    generateNumber,
    createRule: NumberingSystemAPI.createNumberingRule,
    updateRule: NumberingSystemAPI.updateNumberingRule,
    deleteRule: NumberingSystemAPI.deleteNumberingRule,
    resetCounter: NumberingSystemAPI.resetCounter,
    getStatistics: NumberingSystemAPI.getNumberingStatistics
  }
}