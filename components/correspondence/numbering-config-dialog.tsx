"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, Save, RotateCcw, Plus, Trash2, Eye } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface NumberingConfigDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface NumberingRule {
  id: string
  letterType: string
  prefix: string
  format: string
  currentNumber: number
  resetPeriod: 'never' | 'monthly' | 'yearly'
  isActive: boolean
}

const mockNumberingRules: NumberingRule[] = [
  {
    id: '1',
    letterType: 'active_student',
    prefix: 'AS',
    format: 'AS-{XXX}/TU-UNIV/{YYYY}/{MM}',
    currentNumber: 89,
    resetPeriod: 'yearly',
    isActive: true
  },
  {
    id: '2',
    letterType: 'research_permission',
    prefix: 'RP',
    format: 'RP-{XXX}/TU-UNIV/{YYYY}/{MM}',
    currentNumber: 23,
    resetPeriod: 'yearly',
    isActive: true
  },
  {
    id: '3',
    letterType: 'internship_recommendation',
    prefix: 'IR',
    format: 'IR-{XXX}/TU-UNIV/{YYYY}/{MM}',
    currentNumber: 18,
    resetPeriod: 'yearly',
    isActive: true
  },
  {
    id: '4',
    letterType: 'graduation_letter',
    prefix: 'GL',
    format: 'GL-{XXX}/TU-UNIV/{YYYY}/{MM}',
    currentNumber: 15,
    resetPeriod: 'yearly',
    isActive: true
  }
]

const letterTypes = [
  { value: 'active_student', label: 'Surat Keterangan Aktif Kuliah' },
  { value: 'research_permission', label: 'Surat Izin Penelitian' },
  { value: 'internship_recommendation', label: 'Surat Rekomendasi Magang' },
  { value: 'graduation_letter', label: 'Surat Keterangan Lulus' },
  { value: 'scholarship_recommendation', label: 'Surat Rekomendasi Beasiswa' },
  { value: 'leave_absence', label: 'Surat Izin Cuti' },
  { value: 'transcript_request', label: 'Surat Keterangan Nilai' }
]

export function NumberingConfigDialog({ open, onOpenChange }: NumberingConfigDialogProps) {
  const [rules, setRules] = useState<NumberingRule[]>(mockNumberingRules)
  const [selectedRule, setSelectedRule] = useState<NumberingRule | null>(null)
  const [newRule, setNewRule] = useState({
    letterType: '',
    prefix: '',
    format: '',
    resetPeriod: 'yearly' as const
  })

  const handleSaveRule = () => {
    if (selectedRule) {
      // Update existing rule
      setRules(prev => prev.map(rule => 
        rule.id === selectedRule.id ? selectedRule : rule
      ))
    }
    setSelectedRule(null)
  }

  const handleAddRule = () => {
    if (newRule.letterType && newRule.prefix && newRule.format) {
      const rule: NumberingRule = {
        id: Date.now().toString(),
        letterType: newRule.letterType,
        prefix: newRule.prefix,
        format: newRule.format,
        currentNumber: 0,
        resetPeriod: newRule.resetPeriod,
        isActive: true
      }
      setRules(prev => [...prev, rule])
      setNewRule({
        letterType: '',
        prefix: '',
        format: '',
        resetPeriod: 'yearly'
      })
    }
  }

  const handleDeleteRule = (ruleId: string) => {
    setRules(prev => prev.filter(rule => rule.id !== ruleId))
  }

  const generatePreview = (format: string, currentNumber: number) => {
    const now = new Date()
    const preview = format
      .replace('{XXX}', String(currentNumber + 1).padStart(3, '0'))
      .replace('{YYYY}', now.getFullYear().toString())
      .replace('{MM}', String(now.getMonth() + 1).padStart(2, '0'))
      .replace('{DD}', String(now.getDate()).padStart(2, '0'))
    return preview
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Konfigurasi Sistem Penomoran
          </DialogTitle>
          <DialogDescription>
            Kelola aturan penomoran untuk berbagai jenis surat yang akan terintegrasi dengan backend
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="existing" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="existing">Aturan Yang Ada</TabsTrigger>
            <TabsTrigger value="add-new">Tambah Aturan</TabsTrigger>
          </TabsList>

          <TabsContent value="existing" className="space-y-4">
            <div className="grid gap-4">
              {rules.map((rule) => (
                <Card key={rule.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        {letterTypes.find(t => t.value === rule.letterType)?.label || rule.letterType}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant={rule.isActive ? "default" : "secondary"}>
                          {rule.isActive ? "Aktif" : "Nonaktif"}
                        </Badge>
                        <Button
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedRule(rule)}
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteRule(rule.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-muted-foreground">Prefix</p>
                        <p className="font-mono">{rule.prefix}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Format</p>
                        <p className="font-mono text-xs">{rule.format}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Nomor Terakhir</p>
                        <p className="font-bold">{rule.currentNumber}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Reset</p>
                        <p className="capitalize">{rule.resetPeriod === 'never' ? 'Tidak Pernah' : rule.resetPeriod === 'monthly' ? 'Bulanan' : 'Tahunan'}</p>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">Preview Nomor Berikutnya:</span>
                      </div>
                      <p className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400">
                        {generatePreview(rule.format, rule.currentNumber)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedRule && (
              <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
                <CardHeader>
                  <CardTitle className="text-blue-800 dark:text-blue-200">Edit Aturan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Jenis Surat</Label>
                      <Select 
                        value={selectedRule.letterType} 
                        onValueChange={(value) => setSelectedRule({...selectedRule, letterType: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {letterTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Prefix</Label>
                      <Input 
                        value={selectedRule.prefix} 
                        onChange={(e) => setSelectedRule({...selectedRule, prefix: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Format Penomoran</Label>
                    <Input 
                      value={selectedRule.format} 
                      onChange={(e) => setSelectedRule({...selectedRule, format: e.target.value})}
                      placeholder="Contoh: {PREFIX}-{XXX}/TU-UNIV/{YYYY}/{MM}"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Variabel: {"{XXX}"} = nomor urut, {"{YYYY}"} = tahun, {"{MM}"} = bulan, {"{DD}"} = tanggal
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nomor Saat Ini</Label>
                      <Input 
                        type="number" 
                        value={selectedRule.currentNumber} 
                        onChange={(e) => setSelectedRule({...selectedRule, currentNumber: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <div>
                      <Label>Reset Periode</Label>
                      <Select 
                        value={selectedRule.resetPeriod} 
                        onValueChange={(value: any) => setSelectedRule({...selectedRule, resetPeriod: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="never">Tidak Pernah</SelectItem>
                          <SelectItem value="monthly">Bulanan</SelectItem>
                          <SelectItem value="yearly">Tahunan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveRule}>
                      <Save className="w-4 h-4 mr-2" />
                      Simpan
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedRule(null)}>
                      Batal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="add-new" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Tambah Aturan Penomoran Baru
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Jenis Surat</Label>
                    <Select 
                      value={newRule.letterType} 
                      onValueChange={(value) => setNewRule({...newRule, letterType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis surat" />
                      </SelectTrigger>
                      <SelectContent>
                        {letterTypes
                          .filter(type => !rules.some(rule => rule.letterType === type.value))
                          .map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Prefix</Label>
                    <Input 
                      value={newRule.prefix} 
                      onChange={(e) => setNewRule({...newRule, prefix: e.target.value})}
                      placeholder="Contoh: AS, RP, IR"
                    />
                  </div>
                </div>
                <div>
                  <Label>Format Penomoran</Label>
                  <Input 
                    value={newRule.format} 
                    onChange={(e) => setNewRule({...newRule, format: e.target.value})}
                    placeholder="Contoh: {PREFIX}-{XXX}/TU-UNIV/{YYYY}/{MM}"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Variabel: {"{XXX}"} = nomor urut, {"{YYYY}"} = tahun, {"{MM}"} = bulan, {"{DD}"} = tanggal
                  </p>
                </div>
                <div>
                  <Label>Reset Periode</Label>
                  <Select 
                    value={newRule.resetPeriod} 
                    onValueChange={(value: any) => setNewRule({...newRule, resetPeriod: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Tidak Pernah</SelectItem>
                      <SelectItem value="monthly">Bulanan</SelectItem>
                      <SelectItem value="yearly">Tahunan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {newRule.format && (
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium">Preview:</span>
                    </div>
                    <p className="font-mono text-lg font-bold text-green-600 dark:text-green-400">
                      {generatePreview(newRule.format, 0)}
                    </p>
                  </div>
                )}
                <Button onClick={handleAddRule} disabled={!newRule.letterType || !newRule.prefix || !newRule.format}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Aturan
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator />
        
        <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Integrasi Backend:</strong> Konfigurasi ini akan tersinkronisasi dengan backend untuk 
            mengatur penomoran otomatis saat surat diterbitkan. Pastikan format sesuai dengan kebutuhan institusi.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Simpan Semua Konfigurasi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}