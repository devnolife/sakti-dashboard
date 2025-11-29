export interface TemplateVariable {
  id: string; // Unique identifier for DOM mapping
  key: string;
  label: string;
  type: 'text' | 'number' | 'date';
  textContent: string;
  startIndex: number;
  endIndex: number;
  htmlPosition?: string; // HTML path for precise positioning
}

export interface VariableMapping {
  [key: string]: TemplateVariable;
}

export interface MockTemplate {
  id: string;
  name: string;
  html: string;
  rawText: string;
  variableMapping: Record<string, TemplateVariable>;
}

export interface TemplateData {
  id: string;
  name: string;
  description?: string;
  file_url: string;
  file_name: string;
  file_size: number;
  file_type: string;
  category: string;
  prodi_id?: string;
  is_global: boolean;
  is_active: boolean;
  detected_fields?: any;
  metadata?: any;
  variable_mapping?: Record<string, TemplateVariable>;
  version: number;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
  letter_type_id?: string; // ID jenis surat yang terhubung
  prodi?: {
    kode: string;
    nama: string;
  };
  uploader?: {
    id: string;
    name: string;
  };
  letter_type?: {
    id: string;
    title: string;
    description?: string;
  };
}

export interface TemplatePreview {
  html: string;
  rawText: string;
  detectedFields: any;
  variableMapping: VariableMapping | null;
}

export interface TemplateListResponse {
  data: TemplateData[];
  total: number;
  page: number;
  limit: number;
}

export interface TemplateUploadPayload {
  file: File;
  name: string;
  description?: string;
  category: string;
  prodi_id?: string;
  is_global: boolean;
}
