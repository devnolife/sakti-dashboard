"use client"

import { useState } from "react"
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
} from "lucide-react"
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

export default function RolesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

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

  const handleEditRole = (role: Role) => {
    setSelectedRole(role)
    setIsDialogOpen(true)
  }

  const handleCreateRole = () => {
    setSelectedRole(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Role & Permission Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Kelola role dan hak akses pengguna sistem
          </p>
        </div>
        <Button onClick={handleCreateRole}>
          <Plus className="h-4 w-4 mr-2" />
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
            <p className="text-xs text-muted-foreground mt-1">
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
            <p className="text-xs text-muted-foreground mt-1">Pengguna terdaftar</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{permissions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Hak akses tersedia</p>
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
            <p className="text-xs text-muted-foreground mt-1">Modul sistem</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="roles">Roles</TabsTrigger>
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
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                          <div className="text-sm text-muted-foreground font-mono">
                            {role.name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm text-muted-foreground truncate">
                          {role.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          <Users className="h-3 w-3 mr-1" />
                          {role.userCount}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={role.isSystem ? "default" : "outline"}>
                          {role.isSystem ? (
                            <>
                              <Lock className="h-3 w-3 mr-1" />
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
                            <Edit className="h-4 w-4" />
                          </Button>
                          {!role.isSystem && (
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
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
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    {module}
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {perms.map((perm) => (
                      <Card key={perm.id} className="border">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="font-medium font-mono text-sm">
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
          <div className="space-y-4 py-4">
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

            <div className="space-y-3 pt-4">
              <Label>Permissions</Label>
              <div className="border rounded-lg p-4 space-y-4 max-h-96 overflow-y-auto">
                {Object.entries(groupedPermissions).map(([module, perms]) => (
                  <div key={module} className="space-y-2">
                    <div className="font-medium">{module}</div>
                    <div className="space-y-2 pl-4">
                      {perms.map((perm) => (
                        <div key={perm.id} className="flex items-center space-x-2">
                          <Checkbox id={`perm-${perm.id}`} />
                          <label
                            htmlFor={`perm-${perm.id}`}
                            className="text-sm cursor-pointer flex-1"
                          >
                            <span className="font-mono text-xs">
                              {perm.module.toLowerCase()}:{perm.action}
                            </span>
                            <span className="text-muted-foreground ml-2">
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
    </div>
  )
}

