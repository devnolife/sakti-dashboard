export interface TemplateVariable {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date';
  textContent: string;
  startIndex: number;
  endIndex: number;
}

export interface VariableMapping {
  [key: string]: TemplateVariable;
}

export interface TemplatePreview {
  html: string;
  rawText: string;
  detectedFields: any;
  variableMapping: VariableMapping | null;
}