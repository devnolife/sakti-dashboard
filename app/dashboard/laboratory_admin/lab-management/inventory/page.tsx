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
const categories = ["All Categories", "Equipment", "Glassware", "Chemicals", "Safety", "Consumables", "Tools"]

// Locations for filtering
const locations = ["All Locations", "Lab A", "Lab B", "Lab C", "Storage Room", "Prep Room"]

// Status options for filtering
const statusOptions = ["All Status", "Available", "Low Stock", "Critical", "Out of Stock", "Maintenance Required"]

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false)

  // Filter items based on search query and filters
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory
    const matchesLocation = selectedLocation === "All Locations" || item.location === selectedLocation
    const matchesStatus = selectedStatus === "All Status" || item.status === selectedStatus

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
        <h1 className="text-3xl font-bold tracking-tight">Laboratory Inventory</h1>
        <p className="text-muted-foreground">Manage and track all laboratory equipment, supplies, and consumables</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground mt-1">Across {inventoryItems.length} unique items</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Total investment in inventory</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground mt-1">Items requiring reorder</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Maintenance Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maintenanceItems}</div>
            <p className="text-xs text-muted-foreground mt-1">Items due for maintenance in 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search inventory..."
              className="w-full pl-8 md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="mr-2 h-4 w-4" />
                  Category: {selectedCategory}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
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
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="mr-2 h-4 w-4" />
                  Location: {selectedLocation}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter by Location</DropdownMenuLabel>
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
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="mr-2 h-4 w-4" />
                  Status: {selectedStatus}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
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
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="default"
            size="sm"
            className="h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
          <Button variant="outline" size="sm" className="h-9" onClick={() => setIsOrderDialogOpen(true)}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Order Supplies
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <ArrowDownUp className="mr-2 h-4 w-4" />
                Export/Import
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export to CSV
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export to Excel
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Upload className="mr-2 h-4 w-4" />
                Import from CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Inventory Items */}
      <Tabs defaultValue="grid" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="grid" className="flex items-center">
              <Box className="mr-2 h-4 w-4" />
              Grid View
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center">
              <Box className="mr-2 h-4 w-4" />
              Table View
            </TabsTrigger>
          </TabsList>
          <div className="text-sm text-muted-foreground">
            Showing {filteredItems.length} of {inventoryItems.length} items
          </div>
        </div>

        <TabsContent value="grid" className="mt-4">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <div className="rounded-full bg-muted p-3">
                <AlertCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No items found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden transition-all hover:shadow-md"
                  onClick={() => openItemDialog(item)}
                >
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={300}
                      height={200}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <div className="flex justify-between">
                      <Badge
                        variant={
                          item.status === "Available"
                            ? "default"
                            : item.status === "Low Stock"
                              ? "warning"
                              : "destructive"
                        }
                        className="mb-2"
                      >
                        {item.status}
                      </Badge>
                      <span className="text-xs font-medium text-muted-foreground">{item.id}</span>
                    </div>
                    <CardTitle className="line-clamp-1 text-lg">{item.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{item.category}</span>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{item.location}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="mt-2">
                      <div className="mb-1 flex justify-between text-xs">
                        <span>Quantity</span>
                        <span className="font-medium">
                          {item.quantity} / {item.totalQuantity}
                        </span>
                      </div>
                      <Progress
                        value={(item.quantity / item.totalQuantity) * 100}
                        className="h-2"
                        indicatorClassName={
                          item.quantity / item.totalQuantity > 0.6
                            ? "bg-green-500"
                            : item.quantity / item.totalQuantity > 0.3
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm font-medium">${item.price.toFixed(2)}</div>
                      {item.nextMaintenance && (
                        <div className="text-xs text-muted-foreground">
                          Next maintenance: {new Date(item.nextMaintenance).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="table" className="mt-4">
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left font-medium">Item</th>
                    <th className="h-12 px-4 text-left font-medium">ID</th>
                    <th className="h-12 px-4 text-left font-medium">Category</th>
                    <th className="h-12 px-4 text-left font-medium">Location</th>
                    <th className="h-12 px-4 text-left font-medium">Quantity</th>
                    <th className="h-12 px-4 text-left font-medium">Status</th>
                    <th className="h-12 px-4 text-left font-medium">Price</th>
                    <th className="h-12 px-4 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-4 text-center">
                        <div className="flex flex-col items-center justify-center py-8">
                          <AlertCircle className="h-8 w-8 text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-semibold">No items found</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Try adjusting your search or filters to find what you're looking for.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 overflow-hidden rounded-md bg-muted">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="font-medium">{item.name}</div>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">{item.id}</td>
                        <td className="p-4">
                          <Badge variant="outline" className="font-normal">
                            {item.category}
                          </Badge>
                        </td>
                        <td className="p-4">{item.location}</td>
                        <td className="p-4">
                          <div className="flex flex-col gap-1">
                            <div className="text-sm">
                              {item.quantity} / {item.totalQuantity}
                            </div>
                            <Progress
                              value={(item.quantity / item.totalQuantity) * 100}
                              className="h-2 w-24"
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
                            variant={
                              item.status === "Available"
                                ? "default"
                                : item.status === "Low Stock"
                                  ? "warning"
                                  : "destructive"
                            }
                          >
                            {item.status}
                          </Badge>
                        </td>
                        <td className="p-4">${item.price.toFixed(2)}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation()
                                openItemDialog(item)
                              }}
                            >
                              <Search className="h-4 w-4" />
                              <span className="sr-only">View details</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
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

      {/* Dialogs */}
      {selectedItem && (
        <InventoryItemDialog item={selectedItem} open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen} />
      )}

      <AddInventoryDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        categories={categories.filter((c) => c !== "All Categories")}
        locations={locations.filter((l) => l !== "All Locations")}
      />

      <OrderSuppliesDialog
        open={isOrderDialogOpen}
        onOpenChange={setIsOrderDialogOpen}
        lowStockItems={inventoryItems.filter((item) => item.status === "Low Stock" || item.status === "Critical")}
      />
    </div>
  )
}

