"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiGet, apiPut, apiPost } from "@/lib/api-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Save,
  Users,
  Search,
  RefreshCw,
  UserX,
  UserCheck,
  Trash2,
  AlertTriangle,
  Download
} from "lucide-react";

interface ProdiDetail {
  kode: string;
  nama: string;
  akreditasi: string | null;
  ketua_prodi: {
    nama_lengkap: string;
    nip: string;
  } | null;
}

interface Account {
  id: string;
  name: string;
  identifier: string; // NIM/NIP
  role: string;
  status: "active" | "inactive";
  email?: string;
}

export default function ProdiDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const kode = params.kode as string;

  // Prodi Info State
  const [prodi, setProdi] = useState<ProdiDetail | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    nama: "",
    kode: "",
    akreditasi: "",
  });
  const [saving, setSaving] = useState(false);

  // Accounts State
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Filters
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Dialog States
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<{
    type: "reset" | "deactivate" | "activate" | "delete" | "reset_all" | "deactivate_all" | "delete_all";
    title: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    loadProdiDetail();
    loadAccounts();
  }, [kode]);

  useEffect(() => {
    applyFilters();
  }, [accounts, roleFilter, statusFilter, searchQuery]);

  const loadProdiDetail = async () => {
    try {
      const response = await apiGet(`/api/admin/super/prodi/${kode}`);
      const prodiData = response.data;
      setProdi({
        kode: prodiData.kode,
        nama: prodiData.nama,
        akreditasi: prodiData.akreditasi,
        ketua_prodi: prodiData.ketuaProdi ? {
          nama_lengkap: prodiData.ketuaProdi.name,
          nip: prodiData.ketuaProdi.nip
        } : null
      });
      setEditData({
        nama: prodiData.nama,
        kode: prodiData.kode,
        akreditasi: prodiData.akreditasi || "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal memuat data prodi",
        variant: "destructive",
      });
    }
  };

  const loadAccounts = async () => {
    try {
      setLoading(true);
      const data = await apiGet(`/api/admin/super/prodi/${kode}/accounts`);
      setAccounts(data.accounts || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal memuat data akun",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...accounts];

    if (roleFilter !== "all") {
      filtered = filtered.filter((acc) => acc.role === roleFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((acc) => acc.status === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (acc) =>
          acc.name.toLowerCase().includes(query) ||
          acc.identifier.toLowerCase().includes(query) ||
          (acc.email && acc.email.toLowerCase().includes(query))
      );
    }

    setFilteredAccounts(filtered);
  };

  const handleSaveProdi = async () => {
    try {
      setSaving(true);
      const response = await apiPut(`/api/admin/super/prodi/${kode}`, editData);
      toast({
        title: "Berhasil",
        description: "Data prodi berhasil diperbarui",
      });
      setEditMode(false);

      // If kode changed, redirect to new URL
      if (response.data && editData.kode !== kode) {
        router.replace(`/dashboard/admin/super/prodi/${editData.kode}`);
      } else {
        loadProdiDetail();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal memperbarui data prodi",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleBulkAction = async (action: string, accountIds?: string[]) => {
    try {
      const ids = accountIds || Array.from(selectedAccounts);
      if (ids.length === 0) {
        toast({
          title: "Peringatan",
          description: "Pilih minimal satu akun",
          variant: "destructive",
        });
        return;
      }

      await apiPost(`/api/admin/super/prodi/${kode}/accounts`, {
        action,
        accountIds: ids,
      });

      toast({
        title: "Berhasil",
        description: `Aksi ${action} berhasil dijalankan`,
      });

      setSelectedAccounts(new Set());
      loadAccounts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal menjalankan aksi",
        variant: "destructive",
      });
    }
  };

  const handleDangerAction = async (action: string) => {
    try {
      // Get all account IDs for danger actions
      const allIds = accounts.map((acc) => acc.id);
      await apiPost(`/api/admin/super/prodi/${kode}/accounts`, {
        action,
        accountIds: allIds,
      });

      toast({
        title: "Berhasil",
        description: `Aksi ${action} berhasil dijalankan pada semua akun`,
      });

      loadAccounts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal menjalankan aksi",
        variant: "destructive",
      });
    }
  };

  const openDialog = (
    type: "reset" | "deactivate" | "activate" | "delete" | "reset_all" | "deactivate_all" | "delete_all",
    title: string,
    description: string
  ) => {
    setDialogAction({ type, title, description });
    setDialogOpen(true);
  };

  const confirmAction = async () => {
    if (!dialogAction) return;

    const { type } = dialogAction;

    if (type === "reset_all") {
      await handleDangerAction("reset_password");
    } else if (type === "deactivate_all") {
      await handleDangerAction("deactivate");
    } else if (type === "delete_all") {
      await handleDangerAction("delete");
    } else {
      await handleBulkAction(type);
    }

    setDialogOpen(false);
    setDialogAction(null);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAccounts(new Set(filteredAccounts.map((acc) => acc.id)));
    } else {
      setSelectedAccounts(new Set());
    }
  };

  const handleSelectAccount = (accountId: string, checked: boolean) => {
    const newSelected = new Set(selectedAccounts);
    if (checked) {
      newSelected.add(accountId);
    } else {
      newSelected.delete(accountId);
    }
    setSelectedAccounts(newSelected);
  };

  const exportToCSV = () => {
    const headers = ["Nama", "NIM/NIP", "Role", "Status", "Email"];
    const rows = filteredAccounts.map((acc) => [
      acc.name,
      acc.identifier,
      acc.role,
      acc.status,
      acc.email || "-",
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `accounts_${kode}_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  if (!prodi) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{prodi.nama}</h1>
            <p className="text-muted-foreground">Kode: {prodi.kode}</p>
          </div>
        </div>
        <Badge variant={prodi.akreditasi ? "default" : "secondary"}>
          {prodi.akreditasi || "Belum Terakreditasi"}
        </Badge>
      </div>

      {/* Prodi Information Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Informasi Program Studi</CardTitle>
            {!editMode ? (
              <Button onClick={() => setEditMode(true)}>Edit</Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Batal
                </Button>
                <Button onClick={handleSaveProdi} disabled={saving}>
                  {saving ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Simpan
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {editMode ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nama">Nama Program Studi</Label>
                  <Input
                    id="nama"
                    value={editData.nama}
                    onChange={(e) => setEditData({ ...editData, nama: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="kode">Kode Prodi</Label>
                  <Input
                    id="kode"
                    value={editData.kode}
                    onChange={(e) => setEditData({ ...editData, kode: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="akreditasi">Akreditasi</Label>
                <Input
                  id="akreditasi"
                  value={editData.akreditasi}
                  onChange={(e) => setEditData({ ...editData, akreditasi: e.target.value })}
                  placeholder="Contoh: A, B, Unggul"
                />
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nama</p>
                <p className="font-medium">{prodi.nama}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kode</p>
                <p className="font-medium">{prodi.kode}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Akreditasi</p>
                <p className="font-medium">{prodi.akreditasi || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ketua Prodi</p>
                <p className="font-medium">
                  {prodi.ketua_prodi ? `${prodi.ketua_prodi.nama_lengkap} (${prodi.ketua_prodi.nip})` : "-"}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Management Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Manajemen Akun</CardTitle>
              <CardDescription>
                Total: {accounts.length} akun | Dipilih: {selectedAccounts.size}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={exportToCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama, NIM/NIP, email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Role</SelectItem>
                <SelectItem value="student">Mahasiswa</SelectItem>
                <SelectItem value="lecturer">Dosen</SelectItem>
                <SelectItem value="staff">Staff TU</SelectItem>
                <SelectItem value="lab_admin">Admin Lab</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Tidak Aktif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {selectedAccounts.size > 0 && (
            <div className="flex gap-2 p-3 bg-muted rounded-lg">
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  openDialog(
                    "reset",
                    "Reset Password",
                    `Reset password untuk ${selectedAccounts.size} akun terpilih?`
                  )
                }
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Password
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  openDialog(
                    "deactivate",
                    "Nonaktifkan Akun",
                    `Nonaktifkan ${selectedAccounts.size} akun terpilih?`
                  )
                }
              >
                <UserX className="h-4 w-4 mr-2" />
                Nonaktifkan
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  openDialog(
                    "activate",
                    "Aktifkan Akun",
                    `Aktifkan ${selectedAccounts.size} akun terpilih?`
                  )
                }
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Aktifkan
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() =>
                  openDialog(
                    "delete",
                    "Hapus Akun",
                    `Hapus ${selectedAccounts.size} akun terpilih? Aksi ini tidak dapat dibatalkan!`
                  )
                }
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Hapus
              </Button>
            </div>
          )}

          {/* Accounts Table */}
          {loading ? (
            <div className="flex justify-center p-8">
              <RefreshCw className="h-8 w-8 animate-spin" />
            </div>
          ) : filteredAccounts.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Tidak ada akun ditemukan</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedAccounts.size === filteredAccounts.length && filteredAccounts.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>NIM/NIP</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedAccounts.has(account.id)}
                        onCheckedChange={(checked) => handleSelectAccount(account.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{account.name}</TableCell>
                    <TableCell>{account.identifier}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{account.role}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{account.email || "-"}</TableCell>
                    <TableCell>
                      <Badge variant={account.status === "active" ? "default" : "secondary"}>
                        {account.status === "active" ? "Aktif" : "Tidak Aktif"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </div>
          <CardDescription>Aksi di bawah ini akan mempengaruhi SEMUA akun di prodi ini</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Reset Password Semua Akun</p>
              <p className="text-sm text-muted-foreground">Password akan direset ke default: password123</p>
            </div>
            <Button
              variant="outline"
              onClick={() =>
                openDialog(
                  "reset_all",
                  "Reset Semua Password",
                  `Reset password untuk SEMUA ${accounts.length} akun di prodi ini?`
                )
              }
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Semua
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Nonaktifkan Semua Akun</p>
              <p className="text-sm text-muted-foreground">Semua akun tidak akan bisa login</p>
            </div>
            <Button
              variant="outline"
              onClick={() =>
                openDialog(
                  "deactivate_all",
                  "Nonaktifkan Semua Akun",
                  `Nonaktifkan SEMUA ${accounts.length} akun di prodi ini?`
                )
              }
            >
              <UserX className="h-4 w-4 mr-2" />
              Nonaktifkan Semua
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border border-destructive rounded-lg">
            <div>
              <p className="font-medium text-destructive">Hapus Semua Akun</p>
              <p className="text-sm text-muted-foreground">
                Aksi ini tidak dapat dibatalkan! Semua data akan hilang.
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() =>
                openDialog(
                  "delete_all",
                  "Hapus Semua Akun",
                  `HAPUS PERMANEN SEMUA ${accounts.length} akun di prodi ini? Aksi ini TIDAK DAPAT DIBATALKAN!`
                )
              }
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Hapus Semua
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogAction?.title}</AlertDialogTitle>
            <AlertDialogDescription>{dialogAction?.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction}>Lanjutkan</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
