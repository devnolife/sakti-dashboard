// Integration dengan backend docxtemplater
import type { DetectedField } from "./template-analyzer"

// Konfigurasi backend
export const DOCXTEMPLATER_CONFIG = {
  // URL backend yang menggunakan docxtemplater
  baseUrl: process.env.NEXT_PUBLIC_DOCXTEMPLATER_API_URL || "https://context7.com/open-xml-templating/docxtemplater",
  endpoints: {
    createTemplate: "/api/template/create",
    processTemplate: "/api/template/process",
    validateTemplate: "/api/template/validate"
  }
}

// Interface untuk data yang dikirim ke backend
export interface DocxTemplateData {
  templateId: string
  templateName: string
  originalFile: File
  detectedFields: TemplateVariable[]
  templateMetadata: {
    totalFields: number
    variableFields: number
    templateComplexity: number
    reusabilityScore: number
  }
  documentType: 'surat_keputusan' | 'laporan' | 'formulir' | 'undangan' | 'penilaian' | 'general'
}

// Format variabel untuk docxtemplater
export interface TemplateVariable {
  id: string
  key: string // variabel name untuk docxtemplater, e.g., "{{nama_dekan}}"
  label: string // label yang user-friendly
  type: 'text' | 'date' | 'number' | 'email' | 'select' | 'textarea'
  defaultValue: string
  originalValue: string // nilai asli dari dokumen
  isRequired: boolean
  validation?: {
    pattern?: string
    minLength?: number
    maxLength?: number
    options?: string[] // untuk type 'select'
  }
  suggestions?: string[]
  position: {
    startIndex: number
    endIndex: number
  }
  confidence: number
}

// Response dari backend setelah create template
export interface CreateTemplateResponse {
  success: boolean
  templateId: string
  templateUrl?: string
  variables: TemplateVariable[]
  previewUrl?: string
  message: string
}

// Data untuk proses template (generate dokumen)
export interface ProcessTemplateRequest {
  templateId: string
  variables: Record<string, string | number | Date>
  outputFormat?: 'docx' | 'pdf'
  fileName?: string
}

export class DocxTemplaterIntegration {
  
  // Convert detected fields ke format yang dibutuhkan docxtemplater
  static convertToTemplateVariables(detectedFields: DetectedField[]): TemplateVariable[] {
    return detectedFields
      .filter(field => field.isVariable && field.confidence > 0.5)
      .map((field, index) => {
        const variableKey = this.generateVariableKey(field.label, field.type)
        
        return {
          id: field.id,
          key: `{{${variableKey}}}`,
          label: field.label,
          type: this.mapFieldTypeToInputType(field.type),
          defaultValue: this.generateDefaultValue(field.value, field.type),
          originalValue: field.value,
          isRequired: field.confidence > 0.8,
          validation: this.generateValidation(field.type, field.value),
          suggestions: field.suggestions || [],
          position: {
            startIndex: field.startIndex,
            endIndex: field.endIndex
          },
          confidence: field.confidence
        }
      })
  }
  
  // Generate variable key untuk docxtemplater
  static generateVariableKey(label: string, type: string): string {
    // Convert label ke format snake_case yang aman untuk docxtemplater
    let key = label
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // hapus karakter khusus
      .replace(/\s+/g, '_') // spasi jadi underscore
      .replace(/_{2,}/g, '_') // double underscore jadi single
      .trim()
    
    // Tambah prefix berdasarkan type untuk clarity
    switch (type) {
      case 'date':
        key = key.startsWith('tanggal_') ? key : `tanggal_${key}`
        break
      case 'number':
        key = key.startsWith('nomor_') ? key : `nomor_${key}`
        break
      case 'identity':
        if (key.includes('nama')) key = key
        else if (key.includes('nip') || key.includes('nbm') || key.includes('nidn')) key = key
        else key = `nama_${key}`
        break
    }
    
    return key
  }
  
  // Map field type ke input type untuk form
  static mapFieldTypeToInputType(fieldType: string): TemplateVariable['type'] {
    switch (fieldType) {
      case 'date': return 'date'
      case 'number': return 'number'
      case 'email': return 'email'
      case 'content': return 'textarea'
      default: return 'text'
    }
  }
  
  // Generate default value yang lebih smart
  static generateDefaultValue(originalValue: string, fieldType: string): string {
    switch (fieldType) {
      case 'date':
        // Coba parse tanggal dan return format ISO
        const dateMatch = originalValue.match(/\d{1,2}\s+\w+\s+\d{4}/)
        if (dateMatch) {
          try {
            return new Date().toISOString().split('T')[0] // today's date
          } catch {
            return originalValue
          }
        }
        return originalValue
        
      case 'number':
        // Extract nomor dan buat template
        if (originalValue.includes('/')) {
          const parts = originalValue.split('/')
          return `${parts[0] || '001'}/${parts[1] || 'DEPT'}/${new Date().getFullYear()}`
        }
        return originalValue
        
      case 'identity':
        if (originalValue.includes('Dr.') || originalValue.includes('Prof.')) {
          return originalValue // keep gelar
        }
        return originalValue
        
      default:
        return originalValue
    }
  }
  
  // Generate validation rules
  static generateValidation(fieldType: string, originalValue: string): TemplateVariable['validation'] {
    switch (fieldType) {
      case 'date':
        return {
          pattern: '^\\d{4}-\\d{2}-\\d{2}$' // ISO date format
        }
      case 'number':
        if (originalValue.includes('/')) {
          return {
            pattern: '^\\d{3}/[A-Z]+/\\d{4}$',
            minLength: 8
          }
        }
        return {
          pattern: '^\\d+$'
        }
      case 'email':
        return {
          pattern: '^[^@]+@[^@]+\\.[^@]+$'
        }
      case 'identity':
        if (originalValue.includes('NIP') || originalValue.includes('NBM')) {
          return {
            pattern: '^\\d+$',
            minLength: 8,
            maxLength: 20
          }
        }
        return {
          minLength: 2,
          maxLength: 100
        }
      default:
        return {
          minLength: 1,
          maxLength: 500
        }
    }
  }
  
  // Determine document type berdasarkan content
  static determineDocumentType(templateName: string, content: string): DocxTemplateData['documentType'] {
    const name = templateName.toLowerCase()
    const text = content.toLowerCase()
    
    if (name.includes('keputusan') || text.includes('memutuskan') || text.includes('menetapkan')) {
      return 'surat_keputusan'
    } else if (name.includes('laporan') || text.includes('laporan')) {
      return 'laporan'
    } else if (name.includes('undangan') || text.includes('mengundang')) {
      return 'undangan'
    } else if (name.includes('penilaian') || text.includes('nilai') || text.includes('stambuk')) {
      return 'penilaian'
    } else if (name.includes('formulir') || text.includes('formulir')) {
      return 'formulir'
    } else {
      return 'general'
    }
  }
  
  // Prepare data untuk dikirim ke backend
  static prepareTemplateData(template: {
    id: string
    name: string
    file?: File
    content?: string
    detectedFields?: DetectedField[]
    templateMetadata?: any
  }): DocxTemplateData | null {
    
    if (!template.file || !template.detectedFields || !template.templateMetadata) {
      return null
    }
    
    const templateVariables = this.convertToTemplateVariables(template.detectedFields)
    
    return {
      templateId: template.id,
      templateName: template.name,
      originalFile: template.file,
      detectedFields: templateVariables,
      templateMetadata: {
        totalFields: template.templateMetadata.totalFields,
        variableFields: template.templateMetadata.variableFields,
        templateComplexity: template.templateMetadata.templateComplexity,
        reusabilityScore: template.templateMetadata.reusabilityScore
      },
      documentType: this.determineDocumentType(template.name, template.content || '')
    }
  }
  
  // Send template to backend
  static async createTemplate(templateData: DocxTemplateData): Promise<CreateTemplateResponse> {
    try {
      const formData = new FormData()
      formData.append('file', templateData.originalFile)
      formData.append('templateData', JSON.stringify({
        templateId: templateData.templateId,
        templateName: templateData.templateName,
        detectedFields: templateData.detectedFields,
        templateMetadata: templateData.templateMetadata,
        documentType: templateData.documentType
      }))
      
      const response = await fetch(`${DOCXTEMPLATER_CONFIG.baseUrl}${DOCXTEMPLATER_CONFIG.endpoints.createTemplate}`, {
        method: 'POST',
        body: formData,
        headers: {
          // Don't set Content-Type for FormData, let browser set it
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      return result
      
    } catch (error) {
      console.error('Error creating template:', error)
      return {
        success: false,
        templateId: templateData.templateId,
        message: `Gagal membuat template: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variables: templateData.detectedFields
      }
    }
  }
  
  // Process template (generate document)
  static async processTemplate(request: ProcessTemplateRequest): Promise<Blob | null> {
    try {
      const response = await fetch(`${DOCXTEMPLATER_CONFIG.baseUrl}${DOCXTEMPLATER_CONFIG.endpoints.processTemplate}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.blob()
      
    } catch (error) {
      console.error('Error processing template:', error)
      return null
    }
  }
  
  // Validate template variables
  static validateTemplateVariables(variables: TemplateVariable[]): {isValid: boolean, errors: string[]} {
    const errors: string[] = []
    
    variables.forEach(variable => {
      if (variable.isRequired && !variable.defaultValue) {
        errors.push(`Field "${variable.label}" is required but has no default value`)
      }
      
      if (variable.validation?.pattern) {
        const regex = new RegExp(variable.validation.pattern)
        if (!regex.test(variable.defaultValue)) {
          errors.push(`Field "${variable.label}" doesn't match required pattern`)
        }
      }
    })
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
}