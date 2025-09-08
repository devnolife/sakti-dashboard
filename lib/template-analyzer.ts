// Template Pattern Analysis and Dynamic Field Detection
export interface TemplatePattern {
  type: 'header' | 'identity' | 'signature' | 'table' | 'content' | 'date' | 'number'
  pattern: RegExp
  label: string
  frequency: number // berapa sering muncul di template (0-1)
  isCommon: boolean // apakah ini bagian yang umum
}

export interface DetectedField {
  id: string
  type: TemplatePattern['type']
  value: string
  label: string
  startIndex: number
  endIndex: number
  isVariable: boolean // apakah ini field yang bisa berubah
  confidence: number // seberapa yakin ini adalah field yang bisa diubah
  suggestions?: string[] // saran nilai alternatif
}

// Pattern definitions berdasarkan analisa template yang ada
export const COMMON_PATTERNS: TemplatePattern[] = [
  // Header Patterns (sangat umum)
  {
    type: 'header',
    pattern: /^[A-Z\s]+$/gm,
    label: 'Nama Institusi',
    frequency: 0.9,
    isCommon: true
  },
  {
    type: 'header', 
    pattern: /UNIVERSITAS\s+[A-Z\s]+/gi,
    label: 'Nama Universitas',
    frequency: 0.95,
    isCommon: true
  },
  {
    type: 'header',
    pattern: /FAKULTAS\s+[A-Z\s]+/gi,
    label: 'Nama Fakultas', 
    frequency: 0.85,
    isCommon: true
  },

  // Identity/Document Patterns (sangat umum)
  {
    type: 'number',
    pattern: /Nomor\s*[:]\s*([0-9\/A-Z\-]+)/gi,
    label: 'Nomor Dokumen',
    frequency: 0.8,
    isCommon: true
  },
  {
    type: 'date',
    pattern: /\b\d{1,2}\s+(Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember)\s+\d{4}\b/gi,
    label: 'Tanggal',
    frequency: 0.9,
    isCommon: true
  },
  {
    type: 'date',
    pattern: /\d{4}-\d{2}-\d{2}/g,
    label: 'Tanggal Format ISO',
    frequency: 0.7,
    isCommon: true
  },

  // Name and ID Patterns (umum)
  {
    type: 'identity',
    pattern: /Dr\.\s+[A-Za-z\s,\.]+/g,
    label: 'Nama dengan Gelar Dr.',
    frequency: 0.6,
    isCommon: true
  },
  {
    type: 'identity',
    pattern: /Prof\.\s+[A-Za-z\s,\.]+/g,
    label: 'Nama dengan Gelar Prof.',
    frequency: 0.4,
    isCommon: true
  },
  {
    type: 'identity',
    pattern: /NIP[:\.\s]*\d+/gi,
    label: 'Nomor Induk Pegawai',
    frequency: 0.7,
    isCommon: true
  },
  {
    type: 'identity',
    pattern: /NBM[:\.\s]*\d+/gi,
    label: 'Nomor Badge Muhammadiyah',
    frequency: 0.8,
    isCommon: true
  },
  {
    type: 'identity',
    pattern: /NIDN[:\.\s]*\d+/gi,
    label: 'Nomor Induk Dosen Nasional',
    frequency: 0.6,
    isCommon: true
  },

  // Signature Patterns (sangat umum)
  {
    type: 'signature',
    pattern: /(Ditetapkan di|Makassar|Jakarta),?\s*\d{1,2}\s+\w+\s+\d{4}/gi,
    label: 'Tempat dan Tanggal Penetapan',
    frequency: 0.85,
    isCommon: true
  },
  {
    type: 'signature',
    pattern: /(Dekan|Wakil Dekan|Ketua Program Studi|Kepala)/gi,
    label: 'Jabatan Penandatangan',
    frequency: 0.9,
    isCommon: true
  },

  // Table Patterns (khusus formulir)
  {
    type: 'table',
    pattern: /\b\d{10,}\b/g, // Stambuk/NIM
    label: 'Nomor Mahasiswa',
    frequency: 0.5,
    isCommon: false
  },
  {
    type: 'table',
    pattern: /[A-F][+-]?/g, // Nilai
    label: 'Nilai Akademik',
    frequency: 0.3,
    isCommon: false
  },

  // Content Patterns (medium)
  {
    type: 'content',
    pattern: /Program Studi\s+[A-Za-z]+/gi,
    label: 'Program Studi',
    frequency: 0.7,
    isCommon: true
  }
]

export class TemplateAnalyzer {
  
  static analyzeContent(content: string): DetectedField[] {
    const detectedFields: DetectedField[] = []
    let fieldId = 1

    COMMON_PATTERNS.forEach(pattern => {
      try {
        // Ensure pattern has global flag for matchAll
        let globalPattern = pattern.pattern
        if (!globalPattern.global) {
          // Create new regex with global flag
          globalPattern = new RegExp(globalPattern.source, globalPattern.flags + 'g')
        }

        const matches = Array.from(content.matchAll(globalPattern))
        
        matches.forEach(match => {
          if (match.index !== undefined) {
            const field: DetectedField = {
              id: `field_${fieldId++}`,
              type: pattern.type,
              value: match[0],
              label: pattern.label,
              startIndex: match.index,
              endIndex: match.index + match[0].length,
              isVariable: this.determineIfVariable(match[0], pattern),
              confidence: this.calculateConfidence(match[0], pattern),
              suggestions: this.generateSuggestions(match[0], pattern)
            }
            detectedFields.push(field)
          }
        })
      } catch (error) {
        console.warn(`Error processing pattern ${pattern.label}:`, error)
        // Continue with next pattern if one fails
      }
    })

    // Sort by position in document
    return detectedFields.sort((a, b) => a.startIndex - b.startIndex)
  }

  static determineIfVariable(value: string, pattern: TemplatePattern): boolean {
    // Logika untuk menentukan apakah field ini kemungkinan bisa berubah
    switch (pattern.type) {
      case 'date':
        return true // tanggal hampir selalu berubah
      case 'number':
        return true // nomor dokumen selalu berubah
      case 'identity':
        // Nama dengan gelar mungkin berubah, tapi jabatan lebih stabil
        return value.includes('Dr.') || value.includes('Prof.') || /\d/.test(value)
      case 'signature':
        return value.includes('Makassar') || value.includes('Jakarta') // tempat dan tanggal
      case 'table':
        return true // data dalam tabel hampir selalu berubah
      case 'header':
        return false // header institusi biasanya tetap
      case 'content':
        return value.includes('Program Studi') // program studi mungkin berubah
      default:
        return false
    }
  }

  static calculateConfidence(value: string, pattern: TemplatePattern): number {
    let confidence = pattern.frequency

    // Boost confidence untuk pattern yang jelas variabel
    if (pattern.type === 'date' && /\d{4}/.test(value)) confidence += 0.2
    if (pattern.type === 'number' && /\d/.test(value)) confidence += 0.2
    if (pattern.type === 'identity' && /\d/.test(value)) confidence += 0.15

    return Math.min(confidence, 1.0)
  }

  static generateSuggestions(value: string, pattern: TemplatePattern): string[] {
    const suggestions: string[] = []

    switch (pattern.type) {
      case 'date':
        suggestions.push(
          new Date().toLocaleDateString('id-ID', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          }),
          '{TANGGAL_HARI_INI}',
          '{TANGGAL_CUSTOM}'
        )
        break
      case 'number':
        if (value.includes('/')) {
          suggestions.push('{NOMOR_URUT}/DEPT/{TAHUN}', '{AUTO_INCREMENT}')
        }
        break
      case 'identity':
        if (value.includes('Dr.')) {
          suggestions.push('{NAMA_DOSEN}', '{NAMA_DENGAN_GELAR}')
        }
        if (value.includes('NIP') || value.includes('NBM')) {
          suggestions.push('{NIP_DOSEN}', '{NBM_DOSEN}', '{NIDN_DOSEN}')
        }
        break
      case 'signature':
        if (value.includes('Makassar')) {
          suggestions.push('{KOTA}, {TANGGAL}', 'Jakarta, {TANGGAL}')
        }
        break
      case 'content':
        if (value.includes('Program Studi')) {
          suggestions.push('Program Studi Informatika', 'Program Studi Teknik Sipil', '{PROGRAM_STUDI}')
        }
        break
    }

    return suggestions
  }

  static getCommonPatterns(): TemplatePattern[] {
    return COMMON_PATTERNS.filter(p => p.isCommon && p.frequency >= 0.7)
  }

  static getVariablePatterns(): TemplatePattern[] {
    return COMMON_PATTERNS.filter(p => 
      ['date', 'number', 'identity', 'table'].includes(p.type)
    )
  }

  // Analisa seberapa mirip template baru dengan template yang ada
  static calculateSimilarity(content1: string, content2: string): number {
    const fields1 = this.analyzeContent(content1)
    const fields2 = this.analyzeContent(content2)
    
    const commonPatterns = fields1.filter(f1 => 
      fields2.some(f2 => f2.type === f1.type && f2.label === f1.label)
    )
    
    const totalPatterns = Math.max(fields1.length, fields2.length)
    return totalPatterns > 0 ? commonPatterns.length / totalPatterns : 0
  }

  // Generate template metadata
  static generateMetadata(content: string) {
    const fields = this.analyzeContent(content)
    const variableFields = fields.filter(f => f.isVariable)
    const commonFields = fields.filter(f => f.confidence >= 0.7)
    
    return {
      totalFields: fields.length,
      variableFields: variableFields.length,
      commonFields: commonFields.length,
      templateComplexity: variableFields.length / fields.length,
      reusabilityScore: commonFields.length / fields.length,
      suggestedFields: variableFields.map(f => ({
        label: f.label,
        type: f.type,
        defaultValue: f.value,
        suggestions: f.suggestions
      }))
    }
  }
}