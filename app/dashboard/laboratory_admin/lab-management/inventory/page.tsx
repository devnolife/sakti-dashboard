"use client"

import { useState } from "react"
import {
  AlertCircle,
  ArrowDownUp,
  Box,
  ChevronDown,
  Download,
  Filter,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  Upload,
  Package,
  TrendingUp,
  Wrench,
  BarChart3
} from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { InventoryItemDialog } from "@/components/laboratory/admin/inventory-item-dialog"
import { AddInventoryDialog } from "@/components/laboratory/admin/add-inventory-dialog"
import { OrderSuppliesDialog } from "@/components/laboratory/admin/order-supplies-dialog"

// Mock data for inventory items
const inventoryItems = [
  {
    id: "INV001",
    name: "Microscope - Binocular",
    category: "Equipment",
    location: "Lab A",
    quantity: 15,
    totalQuantity: 20,
    status: "Available",
    lastMaintenance: "2023-12-10",
    nextMaintenance: "2024-06-10",
    image: "/placeholder.svg?height=100&width=100",
    price: 1200,
    supplier: "SciTech Supplies",
    purchaseDate: "2022-05-15",
  },
  {
    id: "INV002",
    name: "Test Tubes (100ml)",
    category: "Glassware",
    location: "Lab B",
    quantity: 75,
    totalQuantity: 100,
    status: "Low Stock",
    lastMaintenance: null,
    nextMaintenance: null,
    image: "/placeholder.svg?height=100&width=100",
    price: 2.5,
    supplier: "LabGlass Inc.",
    purchaseDate: "2023-01-20",
  },
  {
    id: "INV003",
    name: "Digital pH Meter",
    category: "Equipment",
    location: "Lab C",
    quantity: 8,
    totalQuantity: 10,
    status: "Available",
    lastMaintenance: "2023-11-05",
    nextMaintenance: "2024-05-05",
    image: "/placeholder.svg?height=100&width=100",
    price: 350,
    supplier: "SciTech Supplies",
    purchaseDate: "2022-09-12",
  },
  {
    id: "INV004",
    name: "Bunsen Burner",
    category: "Equipment",
    location: "Lab A",
    quantity: 18,
    totalQuantity: 25,
    status: "Low Stock",
    lastMaintenance: "2023-10-15",
    nextMaintenance: "2024-04-15",
    image: "/placeholder.svg?height=100&width=100",
    price: 45,
    supplier: "LabEquip Co.",
    purchaseDate: "2022-07-30",
  },
  {
    id: "INV005",
    name: "Safety Goggles",
    category: "Safety",
    location: "All Labs",
    quantity: 45,
    totalQuantity: 60,
    status: "Available",
    lastMaintenance: null,
    nextMaintenance: null,
    image: "/placeholder.svg?height=100&width=100",
    price: 12,
    supplier: "SafetyFirst Ltd.",
    purchaseDate: "2023-03-10",
  },
  {
    id: "INV006",
    name: "Pipettes (10ml)",
    category: "Glassware",
    location: "Lab B",
    quantity: 5,
    totalQuantity: 30,
    status: "Critical",
    lastMaintenance: null,
    nextMaintenance: null,
    image: "/placeholder.svg?height=100&width=100",
    price: 8.75,
    supplier: "LabGlass Inc.",
    purchaseDate: "2022-11-05",
  },
  {
    id: "INV007",
    name: "Electronic Balance",
    category: "Equipment",
    location: "Lab C",
    quantity: 4,
    totalQuantity: 5,
    status: "Available",
    lastMaintenance: "2023-09-20",
    nextMaintenance: "2024-03-20",
    image: "/placeholder.svg?height=100&width=100",
    price: 850,
    supplier: "SciTech Supplies",
    purchaseDate: "2022-04-18",
  },
  {
    id: "INV008",
    name: "Lab Coats",
    category: "Safety",
    location: "All Labs",
    quantity: 30,
    totalQuantity: 40,
    status: "Available",
    lastMaintenance: null,
    nextMaintenance: null,
    image: "/placeholder.svg?height=100&width=100",
    price: 35,
    supplier: "SafetyFirst Ltd.",
    purchaseDate: "2023-02-15",
  },
]

// Categories for filtering
const categories = ["Semua Kategori", "Peralatan", "Peralatan Gelas", "Bahan Kimia", "Keamanan", "Bahan Habis Pakai", "Alat"]

// Locations for filtering
const locations = ["Semua Lokasi", "Lab A", "Lab B", "Lab C", "Ruang Penyimpanan", "Ruang Persiapan"]

// Status options for filtering
const statusOptions = ["Semua Status", "Tersedia", "Stok Rendah", "Kritis", "Habis", "Perlu Pemeliharaan"]

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori")
  const [selectedLocation, setSelectedLocation] = useState("Semua Lokasi")
  const [selectedStatus, setSelectedStatus] = useState("Semua Status")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false)

  // Filter items based on search query and filters
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "Semua Kategori" || item.category === selectedCategory
    const matchesLocation = selectedLocation === "Semua Lokasi" || item.location === selectedLocation
    const matchesStatus = selectedStatus === "Semua Status" || item.status === selectedStatus

    return matchesSearch && matchesCategory && matchesLocation && matchesStatus
  })

  // Calculate inventory statistics
  const totalItems = inventoryItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalValue = inventoryItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const lowStockItems = inventoryItems.filter(
    (item) => item.status === "Low Stock" || item.status === "Critical",
  ).length
  const maintenanceItems = inventoryItems.filter(
    (item) => item.nextMaintenance && new Date(item.nextMaintenance) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  ).length

  const openItemDialog = (item) => {
    setSelectedItem(item)
    setIsItemDialogOpen(true)
  }

  return (
  <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
            Inventaris Laboratorium
          </span>
        </h1>
        <p className="text-muted-foreground">Kelola dan lacak semua peralatan, persediaan, dan bahan habis pakai laboratorium</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100 flex items-center justify-between">
                Total Barang
                <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-50">{totalItems}</div>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                Dari {inventoryItems.length} barang unik
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100 flex items-center justify-between">
                Nilai Inventaris
                <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900 dark:text-green-50">
                Rp{totalValue.toLocaleString('id-ID')}
              </div>
              <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                Total investasi dalam inventaris
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-900 dark:text-amber-100 flex items-center justify-between">
                Barang Stok Rendah
                <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-900 dark:text-amber-50">{lowStockItems}</div>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                Barang yang perlu dipesan ulang
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100 flex items-center justify-between">
                Jatuh Tempo Pemeliharaan
                <Wrench className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900 dark:text-purple-50">{maintenanceItems}</div>
              <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                Barang yang jatuh tempo pemeliharaan dalam 30 hari
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Card */}
        <Card>
          <CardHeader className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              {/* Search Section */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari inventaris..."
                    className="pl-10 h-11 rounded-xl border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                  className="h-11 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Barang
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsOrderDialogOpen(true)}
                  className="h-11 px-6 rounded-xl border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Pesan Persediaan
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="h-11 px-6 rounded-xl border-slate-200 hover:bg-slate-50 transition-all duration-200"
                    >
                      <ArrowDownUp className="mr-2 h-4 w-4" />
                      Ekspor/Impor
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-lg">
                    <DropdownMenuItem className="cursor-pointer">
                      <Download className="mr-2 h-4 w-4" />
                      Ekspor ke CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Download className="mr-2 h-4 w-4" />
                      Ekspor ke Excel
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Impor dari CSV
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Filter:</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 rounded-lg">
                    <Filter className="mr-2 h-4 w-4" />
                    Kategori: {selectedCategory}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter berdasarkan Kategori</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? "bg-muted" : ""}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 rounded-lg">
                    <Filter className="mr-2 h-4 w-4" />
                    Lokasi: {selectedLocation}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter berdasarkan Lokasi</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {locations.map((location) => (
                    <DropdownMenuItem
                      key={location}
                      onClick={() => setSelectedLocation(location)}
                      className={selectedLocation === location ? "bg-muted" : ""}
                    >
                      {location}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 rounded-lg">
                    <Filter className="mr-2 h-4 w-4" />
                    Status: {selectedStatus}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter berdasarkan Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {statusOptions.map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={selectedStatus === status ? "bg-muted" : ""}
                    >
                      {status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {(selectedCategory !== "Semua Kategori" || selectedLocation !== "Semua Lokasi" || selectedStatus !== "Semua Status") && (
                <Badge variant="secondary" className="ml-auto">
                  {filteredItems.length} dari {inventoryItems.length} barang
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* View Toggle */}
            <Tabs defaultValue="grid" className="space-y-6">
              <div className="flex items-center justify-between">
                <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <TabsTrigger 
                    value="grid" 
                    className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <Box className="h-4 w-4" />
                    Tampilan Grid
                  </TabsTrigger>
                  <TabsTrigger 
                    value="table" 
                    className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <Box className="h-4 w-4" />
                    Tampilan Tabel
                  </TabsTrigger>
                </TabsList>
                <div className="text-sm text-muted-foreground">
                  Menampilkan {filteredItems.length} dari {inventoryItems.length} barang
                </div>
              </div>

              <TabsContent value="grid" className="mt-6">
                {filteredItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-12 text-center">
                    <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-6">
                      <AlertCircle className="h-12 w-12 text-slate-400" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold">Tidak ada barang ditemukan</h3>
                    <p className="mt-2 text-sm text-muted-foreground max-w-md">
                      Coba sesuaikan pencarian atau filter untuk menemukan yang Anda cari.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredItems.map((item) => (
                      <Card
                        key={item.id}
                        className="group overflow-hidden border-0 shadow-lg bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                        onClick={() => openItemDialog(item)}
                      >
                        <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={300}
                            height={200}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <CardHeader className="p-4 pb-0">
                          <div className="flex justify-between items-start mb-3">
                            <Badge
                              className={`font-medium ${
                                item.status === "Available"
                                  ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300"
                                  : item.status === "Low Stock"
                                    ? "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900 dark:text-amber-300"
                                    : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300"
                              }`}
                            >
                              {item.status === "Available" ? "Tersedia" : 
                               item.status === "Low Stock" ? "Stok Rendah" : 
                               item.status === "Critical" ? "Kritis" : item.status}
                            </Badge>
                            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                              {item.id}
                            </span>
                          </div>
                          <CardTitle className="line-clamp-2 text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {item.name}
                          </CardTitle>
                          <CardDescription className="flex flex-wrap gap-2 mt-2">
                            <span className="bg-slate-100 dark:bg-slate-700 text-xs px-2 py-1 rounded-full">
                              {item.category}
                            </span>
                            <span className="bg-slate-100 dark:bg-slate-700 text-xs px-2 py-1 rounded-full">
                              {item.location}
                            </span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <div className="space-y-3">
                            <div>
                              <div className="mb-2 flex justify-between text-xs">
                                <span className="font-medium">Kuantitas</span>
                                <span className="font-bold">
                                  {item.quantity} / {item.totalQuantity}
                                </span>
                              </div>
                              <Progress
                                value={(item.quantity / item.totalQuantity) * 100}
                                className="h-2"
                                // @ts-ignore
                                indicatorClassName={
                                  item.quantity / item.totalQuantity > 0.6
                                    ? "bg-green-500"
                                    : item.quantity / item.totalQuantity > 0.3
                                      ? "bg-amber-500"
                                      : "bg-red-500"
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                Rp{item.price.toLocaleString('id-ID')}
                              </div>
                              {item.nextMaintenance && (
                                <div className="text-xs text-muted-foreground text-right">
                                  <div className="font-medium">Pemeliharaan:</div>
                                  <div>{new Date(item.nextMaintenance).toLocaleDateString('id-ID')}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="table" className="mt-6">
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b bg-slate-50 dark:bg-slate-800/50">
                          <th className="h-12 px-4 text-left font-semibold">Barang</th>
                          <th className="h-12 px-4 text-left font-semibold">ID</th>
                          <th className="h-12 px-4 text-left font-semibold">Kategori</th>
                          <th className="h-12 px-4 text-left font-semibold">Lokasi</th>
                          <th className="h-12 px-4 text-left font-semibold">Kuantitas</th>
                          <th className="h-12 px-4 text-left font-semibold">Status</th>
                          <th className="h-12 px-4 text-left font-semibold">Harga</th>
                          <th className="h-12 px-4 text-left font-semibold">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="p-8 text-center">
                              <div className="flex flex-col items-center justify-center py-8">
                                <AlertCircle className="h-12 w-12 text-slate-400 mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Tidak ada barang ditemukan</h3>
                                <p className="text-sm text-muted-foreground">
                                  Coba sesuaikan pencarian atau filter untuk menemukan yang Anda cari.
                                </p>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          filteredItems.map((item) => (
                            <tr 
                              key={item.id} 
                              className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                            >
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="h-12 w-12 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-700 flex-shrink-0">
                                    <Image
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      width={48}
                                      height={48}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div className="font-medium">{item.name}</div>
                                </div>
                              </td>
                              <td className="p-4">
                                <code className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                                  {item.id}
                                </code>
                              </td>
                              <td className="p-4">
                                <Badge variant="outline" className="font-normal">
                                  {item.category}
                                </Badge>
                              </td>
                              <td className="p-4">{item.location}</td>
                              <td className="p-4">
                                <div className="flex flex-col gap-1">
                                  <div className="text-sm font-medium">
                                    {item.quantity} / {item.totalQuantity}
                                  </div>
                                  <Progress
                                    value={(item.quantity / item.totalQuantity) * 100}
                                    className="h-2 w-24"
                                    // @ts-ignore
                                    indicatorClassName={
                                      item.quantity / item.totalQuantity > 0.6
                                        ? "bg-green-500"
                                        : item.quantity / item.totalQuantity > 0.3
                                          ? "bg-amber-500"
                                          : "bg-red-500"
                                    }
                                  />
                                </div>
                              </td>
                              <td className="p-4">
                                <Badge
                                  className={
                                    item.status === "Available"
                                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                                      : item.status === "Low Stock"
                                        ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                        : "bg-red-100 text-red-700 hover:bg-red-200"
                                  }
                                >
                                  {item.status === "Available" ? "Tersedia" : 
                                   item.status === "Low Stock" ? "Stok Rendah" : 
                                   item.status === "Critical" ? "Kritis" : item.status}
                                </Badge>
                              </td>
                              <td className="p-4 font-medium">
                                Rp{item.price.toLocaleString('id-ID')}
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:bg-emerald-100 hover:text-emerald-600"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      openItemDialog(item)
                                    }}
                                  >
                                    <Search className="h-4 w-4" />
                                    <span className="sr-only">Lihat detail</span>
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 hover:bg-red-100 hover:text-red-600"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Hapus</span>
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

      {/* Dialogs */}
      {selectedItem && (
        <InventoryItemDialog item={selectedItem} open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen} />
      )}

      <AddInventoryDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        categories={categories.filter((c) => c !== "Semua Kategori")}
        locations={locations.filter((l) => l !== "Semua Lokasi")}
      />

      <OrderSuppliesDialog
        open={isOrderDialogOpen}
        onOpenChange={setIsOrderDialogOpen}
        lowStockItems={inventoryItems.filter((item) => item.status === "Low Stock" || item.status === "Critical")}
      />
    </div>
  )
}