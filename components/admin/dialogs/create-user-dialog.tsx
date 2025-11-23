"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { UserPlus, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface CreateUserDialogProps {
  onSuccess?: () => void
}

export function CreateUserDialog({ onSuccess }: CreateUserDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [prodi, setProdi] = useState<Array<{ kode: string; nama: string }>>([])

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "",
    prodi_id: "",
    nip: "",
    nim: "",
    position: "",
    department: "",
    major: "",
    semester: 1
  })

  useEffect(() => {
    fetchProdi()
  }, [])

  const fetchProdi = async () => {
    try {
      const response = await fetch("/api/prodi")
      if (!response.ok) throw new Error("Failed to fetch prodi")
      const data = await response.json()
      setProdi(data.prodi || [])
    } catch (error) {
      console.error("Error fetching prodi:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.username || !formData.name || !formData.password || !formData.role) {
      toast.error("Please fill all required fields")
      return
    }

    setLoading(true)
    try {
      const additional_data: any = {}

      // Add role-specific data
      if (formData.role === "dosen") {
        additional_data.nip = formData.nip
        additional_data.position = formData.position
        additional_data.department = formData.department
      } else if (formData.role === "mahasiswa") {
        additional_data.nim = formData.nim
        additional_data.major = formData.major
        additional_data.semester = formData.semester
      } else if (formData.role === "staff_tu") {
        additional_data.position = formData.position
      }

      const response = await fetch("/api/admin/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          additional_data
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create user")
      }

      toast.success("User created successfully!")
      setOpen(false)
      setFormData({
        username: "",
        name: "",
        email: "",
        password: "",
        role: "",
        prodi_id: "",
        nip: "",
        nim: "",
        position: "",
        department: "",
        major: "",
        semester: 1
      })

      if (onSuccess) onSuccess()
    } catch (error: any) {
      toast.error(error.message || "Failed to create user")
    } finally {
      setLoading(false)
    }
  }

  const showProdiField = ["dosen", "mahasiswa", "staff_tu", "laboratory_admin", "prodi"].includes(formData.role)
  const showNipField = formData.role === "dosen"
  const showNimField = formData.role === "mahasiswa"
  const showPositionField = ["dosen", "staff_tu"].includes(formData.role)
  const showDepartmentField = formData.role === "dosen"
  const showMajorField = formData.role === "mahasiswa"
  const showSemesterField = formData.role === "mahasiswa"

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Create User
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>
            Buat akun baru untuk user. Pastikan semua data terisi dengan benar.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">
                Username <span className="text-red-500">*</span>
              </Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="username"
                required
              />
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="user@example.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required
              />
            </div>

            {/* Role */}
            <div className="space-y-2 col-span-2">
              <Label htmlFor="role">
                Role <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                  <SelectItem value="dosen">Dosen</SelectItem>
                  <SelectItem value="staff_tu">Staff TU</SelectItem>
                  <SelectItem value="prodi">Prodi</SelectItem>
                  <SelectItem value="dekan">Dekan</SelectItem>
                  <SelectItem value="laboratory_admin">Laboratory Admin</SelectItem>
                  <SelectItem value="admin_umum">Admin Umum</SelectItem>
                  <SelectItem value="admin_keuangan">Admin Keuangan</SelectItem>
                  <SelectItem value="kepala_tata_usaha">Kepala Tata Usaha</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Prodi (conditional) */}
            {showProdiField && (
              <div className="space-y-2 col-span-2">
                <Label htmlFor="prodi">
                  Program Studi <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.prodi_id} onValueChange={(value) => setFormData({ ...formData, prodi_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select prodi" />
                  </SelectTrigger>
                  <SelectContent>
                    {prodi.map((p) => (
                      <SelectItem key={p.kode} value={p.kode}>
                        {p.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* NIP (for dosen) */}
            {showNipField && (
              <div className="space-y-2">
                <Label htmlFor="nip">NIP</Label>
                <Input
                  id="nip"
                  value={formData.nip}
                  onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                  placeholder="198012345678901234"
                />
              </div>
            )}

            {/* NIM (for mahasiswa) */}
            {showNimField && (
              <div className="space-y-2">
                <Label htmlFor="nim">NIM</Label>
                <Input
                  id="nim"
                  value={formData.nim}
                  onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                  placeholder="2021123456"
                />
              </div>
            )}

            {/* Position */}
            {showPositionField && (
              <div className="space-y-2">
                <Label htmlFor="position">Position/Jabatan</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Dosen / Staff"
                />
              </div>
            )}

            {/* Department */}
            {showDepartmentField && (
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="Fakultas Teknik"
                />
              </div>
            )}

            {/* Major */}
            {showMajorField && (
              <div className="space-y-2">
                <Label htmlFor="major">Major/Jurusan</Label>
                <Input
                  id="major"
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  placeholder="Teknik Informatika"
                />
              </div>
            )}

            {/* Semester */}
            {showSemesterField && (
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Input
                  id="semester"
                  type="number"
                  min="1"
                  max="14"
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: parseInt(e.target.value) })}
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
