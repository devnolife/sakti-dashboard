"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  UserX
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface User {
  id: string
  username: string
  name: string
  role: string
  subRole?: string
  isActive: boolean
  createdAt: string
  students: {
    nim: string
    major: string
    department: string
  }
  lecturerProfile?: {
    nip: string
    department: string
    position: string
  }
  staffProfile?: {
    nip: string
    department: string
    position: string
  }
}

interface UserFormData {
  username: string
  password: string
  name: string
  role: string
  subRole?: string
  isActive: boolean
}

const ROLES = [
  { value: 'mahasiswa', label: 'Mahasiswa' },
  { value: 'dosen', label: 'Dosen' },
  { value: 'staff_tu', label: 'Staff TU' },
  { value: 'prodi', label: 'Prodi' },
  { value: 'dekan', label: 'Dekan' },
  { value: 'admin', label: 'Admin' },
  { value: 'laboratory_admin', label: 'Admin Lab' },
  { value: 'reading_room_admin', label: 'Admin Perpus' },
  { value: 'admin_umum', label: 'Admin Umum' },
  { value: 'admin_keuangan', label: 'Admin Keuangan' },
  { value: 'gkm', label: 'GKM' },
  { value: 'kepala_tata_usaha', label: 'Kepala Tata Usaha' }
]

const SUB_ROLES = [
  { value: 'wakil_dekan_1', label: 'Wakil Dekan I' },
  { value: 'wakil_dekan_2', label: 'Wakil Dekan II' },
  { value: 'wakil_dekan_3', label: 'Wakil Dekan III' },
  { value: 'wakil_dekan_4', label: 'Wakil Dekan IV' }
]

export default function ManajemenPenggunaPage() {
  const { user } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [showDialog, setShowDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deletingUser, setDeletingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    password: '',
    name: '',
    role: '',
    isActive: true
  })
  const [submitting, setSubmitting] = useState(false)
  const [retrying, setRetrying] = useState(false)

  const itemsPerPage = 10

  // Helper function to get auth token
  const getAuthToken = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("session-token") : null
    if (!token) {
      toast({
        title: "Authentication Required",
        description: "Please login to continue.",
        variant: "destructive"
      })
      if (typeof window !== "undefined") {
        localStorage.removeItem("session-token")
        localStorage.removeItem("user")
        localStorage.removeItem("current-subrole")
        window.location.href = "/login"
      }
      return null
    }
    return token
  }

  // Helper function to handle authentication errors
  const handleAuthError = (response: Response) => {
    if (response.status === 401) {
      toast({
        title: "Session Expired",
        description: "Your session has expired. Please login again.",
        variant: "destructive"
      })
      // Clear tokens and redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("session-token")
        localStorage.removeItem("user")
        localStorage.removeItem("current-subrole")
        window.location.href = "/login"
      }
      return true
    }
    return false
  }

  // Fetch users
  const fetchUsers = async (page = 1, searchQuery = '', roleQuery = '', showToast = true) => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: itemsPerPage.toString(),
        ...(searchQuery && { search: searchQuery }),
        ...(roleQuery && roleQuery !== 'all' && { role: roleQuery })
      })

      // Get auth token
      const token = getAuthToken()
      if (!token) return

      console.log('Fetching users with token:', token ? 'Token present' : 'No token')

      const response = await fetch(`/api/users?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include' // Include cookies for session-based auth
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))

        // Handle authentication error
        if (handleAuthError(response)) {
          return
        }

        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      setUsers(result.data || [])
      setTotalPages(result.pagination?.totalPages || 1)
      setTotalUsers(result.pagination?.total || 0)
    } catch (error: any) {
      console.error('Error fetching users:', error)
      setError(error.message)
      setUsers([])
      setTotalPages(1)
      setTotalUsers(0)

      if (showToast) {
        toast({
          title: "Error",
          description: `Gagal memuat data pengguna: ${error.message}`,
          variant: "destructive"
        })
      }
    } finally {
      setLoading(false)
    }
  }

  // Retry fetch users
  const retryFetchUsers = async () => {
    setRetrying(true)
    try {
      await fetchUsers(currentPage, search, roleFilter, true)
    } finally {
      setRetrying(false)
    }
  }

  useEffect(() => {
    // Only fetch if user is loaded and has permission
    if (user && (user.role === 'admin' || user.role === 'dekan' || user.role === 'prodi')) {
      fetchUsers(currentPage, search, roleFilter)
    }
  }, [currentPage, search, roleFilter, user])

  // Handle search
  const handleSearch = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  // Handle role filter
  const handleRoleFilter = (value: string) => {
    setRoleFilter(value === 'all' ? '' : value)
    setCurrentPage(1)
  }

  // Handle create user
  const handleCreateUser = () => {
    setEditingUser(null)
    setFormData({
      username: '',
      password: '',
      name: '',
      role: '',
      isActive: true
    })
    setShowDialog(true)
  }

  // Handle edit user
  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setFormData({
      username: user.username,
      password: '',
      name: user.name,
      role: user.role,
      subRole: user.subRole || '',
      isActive: user.isActive
    })
    setShowDialog(true)
  }

  // Handle delete user
  const handleDeleteUser = (user: User) => {
    setDeletingUser(user)
    setShowDeleteDialog(true)
  }

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const url = editingUser ? `/api/users/${editingUser.id}` : '/api/users'
      const method = editingUser ? 'PUT' : 'POST'

      const submitData: any = { ...formData }
      if (editingUser && !submitData.password) {
        delete submitData.password // Don't update password if not provided
      }

      // Get auth token
      const token = getAuthToken()
      if (!token) return

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(submitData)
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }))

        // Handle authentication error
        if (handleAuthError(response)) {
          return
        }

        throw new Error(error.error || 'Failed to save user')
      }

      toast({
        title: "Berhasil",
        description: editingUser ? "Pengguna berhasil diperbarui" : "Pengguna berhasil dibuat"
      })

      setShowDialog(false)
      fetchUsers(currentPage, search, roleFilter)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Confirm delete
  const confirmDelete = async () => {
    if (!deletingUser) return

    try {
      // Get auth token
      const token = getAuthToken()
      if (!token) return

      const response = await fetch(`/api/users/${deletingUser.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }))

        // Handle authentication error
        if (handleAuthError(response)) {
          return
        }

        throw new Error(error.error || 'Failed to delete user')
      }

      toast({
        title: "Berhasil",
        description: "Pengguna berhasil dihapus"
      })

      setShowDeleteDialog(false)
      setDeletingUser(null)
      fetchUsers(currentPage, search, roleFilter)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  // Get role label
  const getRoleLabel = (role: string) => {
    return ROLES.find(r => r.value === role)?.label || role
  }

  // Get sub role label  
  const getSubRoleLabel = (subRole: string) => {
    return SUB_ROLES.find(r => r.value === subRole)?.label || subRole
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Check if user is loaded and has permission to manage users
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-4 border-b-2 rounded-full animate-spin border-primary"></div>
              <h3 className="text-lg font-medium">Memuat...</h3>
              <p className="text-muted-foreground">Memeriksa otentikasi pengguna.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const canManageUsers = user.role === 'admin' || user.role === 'dekan' || user.role === 'prodi'

  if (!canManageUsers) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <UserX className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">Akses Ditolak</h3>
              <p className="text-muted-foreground">Anda tidak memiliki akses ke halaman ini.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mt-20 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Pengguna</h2>
          <p className="text-muted-foreground">
            Kelola seluruh pengguna sistem dengan mudah
          </p>
        </div>
        <Button onClick={handleCreateUser} className="md:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Pengguna
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Data Pengguna
          </CardTitle>
          <CardDescription>
            Total {totalUsers} pengguna terdaftar dalam sistem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari berdasarkan nama atau Username..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={handleRoleFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Role</SelectItem>
                {ROLES.map(role => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pengguna</TableHead>
                  <TableHead>Username/NIM/NIP</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Sub Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal Dibuat</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }, (_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={7}>
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 rounded-full bg-muted animate-pulse"></div>
                          <div className="space-y-2">
                            <div className="w-32 h-4 rounded bg-muted animate-pulse"></div>
                            <div className="w-24 h-3 rounded bg-muted animate-pulse"></div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
                          <UserX className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="space-y-2 text-center">
                          <h3 className="text-lg font-medium text-red-900">Gagal Memuat Data</h3>
                          <p className="max-w-md text-sm text-red-600">
                            {error}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={retryFetchUsers}
                            disabled={retrying}
                            className="mt-4"
                          >
                            {retrying ? "Memuat..." : "Coba Lagi"}
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center">
                      <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Tidak ada pengguna</h3>
                      <p className="text-muted-foreground">
                        {search || roleFilter !== 'all'
                          ? "Tidak ada pengguna yang sesuai dengan filter."
                          : "Belum ada pengguna yang terdaftar."}
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                            <UserCheck className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {user.students ? user.students.major :
                                user.lecturerProfile ? user.lecturerProfile.department :
                                  user.staffProfile ? user.staffProfile.department : '-'}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono text-sm">
                          {user.students ? user.students.nim :
                            user.lecturerProfile ? user.lecturerProfile.nip :
                              user.staffProfile ? user.staffProfile.nip : user.username}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getRoleLabel(user.role)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.subRole ? (
                          <Badge variant="secondary">
                            {getSubRoleLabel(user.subRole)}
                          </Badge>
                        ) : '-'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.isActive ? "default" : "secondary"}>
                          {user.isActive ? "Aktif" : "Nonaktif"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(user.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-8 h-8 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
                              <Pencil className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteUser(user)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Halaman {currentPage} dari {totalPages} ({totalUsers} total)
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Sebelumnya
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Selanjutnya
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit User Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {editingUser ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
              </DialogTitle>
              <DialogDescription>
                {editingUser
                  ? 'Perbarui informasi pengguna. Kosongkan password jika tidak ingin mengubah.'
                  : 'Masukkan informasi untuk pengguna baru.'}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Masukkan Username"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">
                  Password {editingUser && '(kosongkan jika tidak ingin mengubah)'}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Masukkan password"
                  required={!editingUser}
                  minLength={6}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map(role => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.role === 'dosen' && (
                <div className="grid gap-2">
                  <Label htmlFor="subRole">Sub Role (Opsional)</Label>
                  <Select
                    value={formData.subRole || 'none'}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, subRole: value === 'none' ? undefined : value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih sub role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Tidak ada</SelectItem>
                      {SUB_ROLES.map(subRole => (
                        <SelectItem key={subRole.value} value={subRole.value}>
                          {subRole.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                />
                <Label htmlFor="isActive">Pengguna Aktif</Label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Menyimpan...' : (editingUser ? 'Perbarui' : 'Tambah')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus pengguna <strong>{deletingUser?.name}</strong>?
              Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
