"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface User {
  id: string
  username: string
  name: string
  role: string
  sub_role: string | null
  is_active: boolean
  lecturers?: Array<{ position?: string; department?: string; prodi_id?: string }>
  staff?: Array<{ position?: string; department?: string; prodi_id?: string }>
}

interface EditUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
  onSuccess: () => void
}

export function EditUserDialog({ open, onOpenChange, user, onSuccess }: EditUserDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    role: "",
    sub_role: "",
    is_active: true,
    position: "",
    department: "",
    prodi_id: ""
  })

  useEffect(() => {
    if (user) {
      const position = user.lecturers?.[0]?.position || user.staff?.[0]?.position || ""
      const department = user.lecturers?.[0]?.department || user.staff?.[0]?.department || ""
      const prodi_id = user.lecturers?.[0]?.prodi_id || user.staff?.[0]?.prodi_id || ""

      setFormData({
        role: user.role,
        sub_role: user.sub_role || "",
        is_active: user.is_active,
        position,
        department,
        prodi_id
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to update user')

      toast.success('User updated successfully')
      onSuccess()
      onOpenChange(false)
    } catch (error) {
      toast.error('Failed to update user')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user role, position, and status
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* User Info (Read-only) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input value={user.username} disabled />
              </div>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={user.name} disabled />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                  <SelectItem value="dosen">Dosen</SelectItem>
                  <SelectItem value="staff_tu">Staff TU</SelectItem>
                  <SelectItem value="kepala_tata_usaha">Kepala Tata Usaha</SelectItem>
                  <SelectItem value="admin_keuangan">Admin Keuangan</SelectItem>
                  <SelectItem value="admin_umum">Admin Umum</SelectItem>
                  <SelectItem value="laboratory_admin">Laboratory Admin</SelectItem>
                  <SelectItem value="reading_room_admin">Reading Room Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sub Role (for dosen) */}
            {formData.role === 'dosen' && (
              <div className="space-y-2">
                <Label htmlFor="sub_role">Sub Role (Optional)</Label>
                <Select
                  value={formData.sub_role}
                  onValueChange={(value) => setFormData({ ...formData, sub_role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sub role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    <SelectItem value="dekan">Dekan</SelectItem>
                    <SelectItem value="wakil_dekan_1">Wakil Dekan I</SelectItem>
                    <SelectItem value="wakil_dekan_2">Wakil Dekan II</SelectItem>
                    <SelectItem value="wakil_dekan_3">Wakil Dekan III</SelectItem>
                    <SelectItem value="prodi">Kepala Prodi</SelectItem>
                    <SelectItem value="sekretaris_prodi">Sekretaris Prodi</SelectItem>
                    <SelectItem value="gkm">GKM</SelectItem>
                    <SelectItem value="dosen">Dosen Biasa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Position & Department */}
            {(formData.role === 'dosen' || formData.role.includes('staff') || formData.role.includes('admin')) && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="e.g., Lektor Kepala, Staff TU"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g., Teknik Informatika"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prodi_id">Prodi Code (Optional)</Label>
                  <Input
                    id="prodi_id"
                    value={formData.prodi_id}
                    onChange={(e) => setFormData({ ...formData, prodi_id: e.target.value })}
                    placeholder="e.g., 55202"
                  />
                </div>
              </>
            )}

            {/* Active Status */}
            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="is_active" className="cursor-pointer">
                Active User
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
