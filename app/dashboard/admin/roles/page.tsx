"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Users,
  Settings,
  Plus,
  Edit,
  Trash2,
  Search,
  Lock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

interface Role {
  id: string
  name: string
  displayName: string
  description: string
  userCount: number
  permissions: string[]
  isSystem: boolean
  createdAt: string
}

interface Permission {
  id: string
  module: string
  action: string
  description: string
}

interface SubRole {
  id: string
  code: string
  displayName: string
  description: string
  parentRole: string
  userCount: number
  isActive: boolean
  createdAt: string
}

export default function RolesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [isSubRoleDialogOpen, setIsSubRoleDialogOpen] = useState(false)
  const [selectedSubRole, setSelectedSubRole] = useState<SubRole | null>(null)
  const [subRoles, setSubRoles] = useState<SubRole[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    code: '',
    displayName: '',
    description: '',
    parentRole: '',
    isActive: true
  })

  const roles: Role[] = [
    {
      id: "1",
      name: "admin",
      displayName: "Administrator",
      description: "Akses penuh ke semua fitur sistem",
      userCount: 3,
      permissions: ["all"],
      isSystem: true,
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      name: "mahasiswa",
      displayName: "Mahasiswa",
      description: "Akses untuk mahasiswa",
      userCount: 1245,
      permissions: ["read_courses", "submit_assignments", "view_grades"],
      isSystem: true,
      createdAt: "2024-01-01",
    },
    {
      id: "3",
      name: "dosen",
      displayName: "Dosen",
      description: "Akses untuk dosen",
      userCount: 89,
      permissions: ["read_courses", "grade_assignments", "manage_students"],
      isSystem: true,
      createdAt: "2024-01-01",
    },
    {
      id: "4",
      name: "staff_tu",
      displayName: "Staff TU",
      description: "Akses untuk staff tata usaha",
      userCount: 15,
      permissions: ["manage_documents", "manage_schedules"],
      isSystem: true,
      createdAt: "2024-01-01",
    },
    {
      id: "5",
      name: "dekan",
      displayName: "Dekan",
      description: "Akses untuk dekan",
      userCount: 1,
      permissions: ["view_reports", "approve_requests"],
      isSystem: true,
      createdAt: "2024-01-01",
    },
  ]

  const permissions: Permission[] = [
    { id: "1", module: "Users", action: "create", description: "Buat pengguna baru" },
    { id: "2", module: "Users", action: "read", description: "Lihat data pengguna" },
    { id: "3", module: "Users", action: "update", description: "Edit data pengguna" },
    { id: "4", module: "Users", action: "delete", description: "Hapus pengguna" },
    { id: "5", module: "Courses", action: "create", description: "Buat mata kuliah baru" },
    { id: "6", module: "Courses", action: "read", description: "Lihat mata kuliah" },
    { id: "7", module: "Courses", action: "update", description: "Edit mata kuliah" },
    { id: "8", module: "Courses", action: "delete", description: "Hapus mata kuliah" },
    { id: "9", module: "Grades", action: "create", description: "Input nilai" },
    { id: "10", module: "Grades", action: "read", description: "Lihat nilai" },
    { id: "11", module: "Grades", action: "update", description: "Edit nilai" },
    { id: "12", module: "Documents", action: "create", description: "Buat dokumen" },
    { id: "13", module: "Documents", action: "read", description: "Lihat dokumen" },
    { id: "14", module: "Documents", action: "approve", description: "Setujui dokumen" },
    { id: "15", module: "Reports", action: "view", description: "Lihat laporan" },
    { id: "16", module: "Reports", action: "export", description: "Export laporan" },
  ]

  const groupedPermissions = permissions.reduce((acc, perm) => {
    if (!acc[perm.module]) {
      acc[perm.module] = []
    }
    acc[perm.module].push(perm)
    return acc
  }, {} as Record<string, Permission[]>)

  // Fetch sub roles
  useEffect(() => {
    fetchSubRoles()
  }, [])

  const fetchSubRoles = async () => {
    try {
      setLoading(true)
      const response = await apiGet('/api/admin/sub-roles')
      const data = response?.data || []
      setSubRoles(Array.isArray(data) ? data : [])
    } catch (error: any) {
      console.error('Error fetching sub roles:', error)
      setSubRoles([])
      toast({
        title: "Error",
        description: error.message || "Gagal memuat sub roles",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEditRole = (role: Role) => {
    setSelectedRole(role)
    setIsDialogOpen(true)
  }

  const handleCreateRole = () => {
    setSelectedRole(null)
    setIsDialogOpen(true)
  }

  const handleEditSubRole = (subRole: SubRole) => {
    setSelectedSubRole(subRole)
    setFormData({
      code: subRole.code,
      displayName: subRole.displayName,
      description: subRole.description,
      parentRole: subRole.parentRole,
      isActive: subRole.isActive
    })
    setIsSubRoleDialogOpen(true)
  }

  const handleCreateSubRole = () => {
    setSelectedSubRole(null)
    setFormData({
      code: '',
      displayName: '',
      description: '',
      parentRole: '',
      isActive: true
    })
    setIsSubRoleDialogOpen(true)
  }

  const handleSubmitSubRole = async () => {
    try {
      setSubmitting(true)

      if (!formData.code || !formData.displayName || !formData.parentRole) {
        toast({
          title: "Error",
          description: "Code, Display Name, dan Parent Role wajib diisi",
          variant: "destructive",
        })
        return
      }

      if (selectedSubRole) {
        // Update existing
        await apiPut(`/api/admin/sub-roles/${selectedSubRole.id}`, formData)
        toast({
          title: "Berhasil",
          description: "Sub role berhasil diupdate",
        })
      } else {
        // Create new
        await apiPost('/api/admin/sub-roles', formData)
        toast({
          title: "Berhasil",
          description: "Sub role berhasil dibuat",
        })
      }

      setIsSubRoleDialogOpen(false)
      fetchSubRoles()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal menyimpan sub role",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteSubRole = async (subRole: SubRole) => {
    if (!confirm(`Hapus sub role "${subRole.displayName}"?`)) return

    try {
      await apiDelete(`/api/admin/sub-roles/${subRole.id}`)
      toast({
        title: "Berhasil",
        description: "Sub role berhasil dihapus",
      })
      fetchSubRoles()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal menghapus sub role",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <Shield className="w-8 h-8" />
            Role & Permission Management
          </h1>
          <p className="mt-1 text-muted-foreground">
            Kelola role dan hak akses pengguna sistem
          </p>
        </div>
        <Button onClick={handleCreateRole}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Role
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.length}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {roles.filter(r => r.isSystem).length} system roles
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {roles.reduce((sum, role) => sum + role.userCount, 0)}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Pengguna terdaftar</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{permissions.length}</div>
            <p className="mt-1 text-xs text-muted-foreground">Hak akses tersedia</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.keys(groupedPermissions).length}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Modul sistem</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="subroles">Sub Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Daftar Role</CardTitle>
                  <CardDescription>Kelola role dan hak akses pengguna</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Cari role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{role.displayName}</div>
                          <div className="font-mono text-sm text-muted-foreground">
                            {role.name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm truncate text-muted-foreground">
                          {role.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          <Users className="w-3 h-3 mr-1" />
                          {role.userCount}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={role.isSystem ? "default" : "outline"}>
                          {role.isSystem ? (
                            <>
                              <Lock className="w-3 h-3 mr-1" />
                              System
                            </>
                          ) : (
                            "Custom"
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(role.createdAt).toLocaleDateString("id-ID")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditRole(role)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          {!role.isSystem && (
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subroles" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Daftar Sub Role</CardTitle>
                  <CardDescription>Kelola sub role untuk role tertentu</CardDescription>
                </div>
                <Button onClick={handleCreateSubRole}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Sub Role
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sub Role Name</TableHead>
                    <TableHead>Parent Role</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        <Loader2 className="w-6 h-6 mx-auto animate-spin" />
                      </TableCell>
                    </TableRow>
                  ) : !Array.isArray(subRoles) || subRoles.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        Belum ada sub role
                      </TableCell>
                    </TableRow>
                  ) : (
                    subRoles.map((subRole) => (
                      <TableRow key={subRole.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{subRole.displayName}</div>
                            <div className="font-mono text-sm text-muted-foreground">
                              {subRole.code}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="text-white border-0 bg-gradient-to-r from-blue-500 to-cyan-500">
                            {roles.find(r => r.name === subRole.parentRole)?.displayName || subRole.parentRole}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm truncate text-muted-foreground">
                            {subRole.description}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            <Users className="w-3 h-3 mr-1" />
                            {subRole.userCount}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {subRole.isActive ? (
                            <Badge className="bg-green-500 hover:bg-green-600">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <XCircle className="w-3 h-3 mr-1" />
                              Inactive
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(subRole.createdAt).toLocaleDateString("id-ID")}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditSubRole(subRole)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteSubRole(subRole)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Permission</CardTitle>
              <CardDescription>
                Hak akses yang tersedia di sistem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(groupedPermissions).map(([module, perms]) => (
                <div key={module} className="space-y-3">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <Settings className="w-5 h-5" />
                    {module}
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {perms.map((perm) => (
                      <Card key={perm.id} className="border">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="font-mono text-sm font-medium">
                                {perm.module.toLowerCase()}:{perm.action}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {perm.description}
                              </p>
                            </div>
                            <Badge variant="outline" className="ml-2">
                              {perm.action}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Role Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedRole ? "Edit Role" : "Tambah Role Baru"}
            </DialogTitle>
            <DialogDescription>
              {selectedRole
                ? "Edit informasi dan permissions role"
                : "Buat role baru dan atur permissions"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Role Name (ID)</Label>
              <Input
                id="name"
                placeholder="e.g., admin, staff"
                defaultValue={selectedRole?.name}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                placeholder="e.g., Administrator"
                defaultValue={selectedRole?.displayName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Deskripsi role"
                defaultValue={selectedRole?.description}
              />
            </div>

            <div className="pt-4 space-y-3">
              <Label>Permissions</Label>
              <div className="p-4 space-y-4 overflow-y-auto border rounded-lg max-h-96">
                {Object.entries(groupedPermissions).map(([module, perms]) => (
                  <div key={module} className="space-y-2">
                    <div className="font-medium">{module}</div>
                    <div className="pl-4 space-y-2">
                      {perms.map((perm) => (
                        <div key={perm.id} className="flex items-center space-x-2">
                          <Checkbox id={`perm-${perm.id}`} />
                          <label
                            htmlFor={`perm-${perm.id}`}
                            className="flex-1 text-sm cursor-pointer"
                          >
                            <span className="font-mono text-xs">
                              {perm.module.toLowerCase()}:{perm.action}
                            </span>
                            <span className="ml-2 text-muted-foreground">
                              - {perm.description}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>
              {selectedRole ? "Simpan" : "Buat Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Sub Role Dialog */}
      <Dialog open={isSubRoleDialogOpen} onOpenChange={setIsSubRoleDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedSubRole ? "Edit Sub Role" : "Tambah Sub Role Baru"}
            </DialogTitle>
            <DialogDescription>
              {selectedSubRole
                ? "Edit informasi sub role"
                : "Buat sub role baru untuk role tertentu"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sub-code">Sub Role Code</Label>
              <Input
                id="sub-code"
                placeholder="e.g., wakil_dekan_1, sekretaris_prodi"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Gunakan format snake_case (huruf kecil dengan underscore)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sub-displayName">Display Name</Label>
              <Input
                id="sub-displayName"
                placeholder="e.g., Wakil Dekan I"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sub-parentRole">Parent Role</Label>
              <select
                id="sub-parentRole"
                className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={formData.parentRole}
                onChange={(e) => setFormData({ ...formData, parentRole: e.target.value })}
              >
                <option value="">Pilih Parent Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.displayName}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground">
                Sub role akan mewarisi permissions dari parent role
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sub-description">Description</Label>
              <Input
                id="sub-description"
                placeholder="Deskripsi sub role"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="sub-active"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="sub-active" className="cursor-pointer">
                Sub Role Aktif
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsSubRoleDialogOpen(false)}
              disabled={submitting}
            >
              Batal
            </Button>
            <Button
              onClick={handleSubmitSubRole}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                selectedSubRole ? "Simpan" : "Buat Sub Role"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

