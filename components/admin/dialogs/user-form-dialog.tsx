"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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

interface UserFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user?: {
    id: string
    nidn: string
    name: string
    role: string
    subRole?: string | null
    isActive: boolean
  } | null
  onSubmit: (data: any) => void
}

export default function UserFormDialog({
  open,
  onOpenChange,
  user,
  onSubmit
}: UserFormDialogProps) {
  const [formData, setFormData] = useState({
    nidn: user?.nidn || "",
    name: user?.name || "",
    role: user?.role || "mahasiswa",
    subRole: user?.subRole || "",
    password: "",
    isActive: user?.isActive ?? true
  })

  const isEditMode = !!user

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onOpenChange(false)
  }

  const roles = [
    { value: "admin", label: "Admin" },
    { value: "mahasiswa", label: "Mahasiswa" },
    { value: "dosen", label: "Dosen" },
    { value: "staff_tu", label: "Staff TU" },
    { value: "prodi", label: "Prodi" },
    { value: "dekan", label: "Dekan" },
    { value: "admin_keuangan", label: "Admin Keuangan" },
    { value: "admin_umum", label: "Admin Umum" },
    { value: "laboratory_admin", label: "Laboratory Admin" },
    { value: "reading_room_admin", label: "Reading Room Admin" },
    { value: "kepala_tata_usaha", label: "Kepala Tata Usaha" },
  ]

  const subRoles = [
    { value: "", label: "None" },
    { value: "wakil_dekan_1", label: "Wakil Dekan I (Akademik)" },
    { value: "wakil_dekan_2", label: "Wakil Dekan II (Keuangan)" },
    { value: "wakil_dekan_3", label: "Wakil Dekan III (Kemahasiswaan)" },
    { value: "wakil_dekan_4", label: "Wakil Dekan IV (Kerjasama)" },
    { value: "prodi", label: "Ketua Program Studi" },
    { value: "sekretaris_prodi", label: "Sekretaris Program Studi" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit User" : "Create New User"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update user information and permissions"
              : "Add a new user to the system"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nidn">NIDN *</Label>
              <Input
                id="nidn"
                value={formData.nidn}
                onChange={(e) => setFormData({ ...formData, nidn: e.target.value })}
                placeholder="1234567890"
                required
                disabled={isEditMode}
              />
              <p className="text-xs text-muted-foreground">
                10-digit unique identifier
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Role *</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="subRole">Sub Role (Optional)</Label>
              <Select
                value={formData.subRole}
                onValueChange={(value) => setFormData({ ...formData, subRole: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sub role" />
                </SelectTrigger>
                <SelectContent>
                  {subRoles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Additional role for specific permissions
              </p>
            </div>

            {!isEditMode && (
              <div className="grid gap-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Minimum 6 characters"
                  required={!isEditMode}
                  minLength={6}
                />
              </div>
            )}

            <div className="flex items-center justify-between space-x-2 rounded-lg border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="active">Active Status</Label>
                <p className="text-sm text-muted-foreground">
                  {formData.isActive ? "User can login" : "User cannot login"}
                </p>
              </div>
              <Switch
                id="active"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? "Update User" : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
