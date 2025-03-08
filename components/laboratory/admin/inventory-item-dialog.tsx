"use client"

import { useState } from "react"
import { Calendar, Clock, Edit, History, Info, Package, Trash2 } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InventoryItemDialog({
  item,
  open,
  onOpenChange,
}: {
  item: any
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedItem, setEditedItem] = useState(item)

  // Mock maintenance history
  const maintenanceHistory = [
    {
      date: "2023-12-10",
      type: "Regular Maintenance",
      technician: "John Smith",
      notes: "Cleaned and calibrated. All systems functioning normally.",
    },
    {
      date: "2023-06-15",
      type: "Repair",
      technician: "Sarah Johnson",
      notes: "Replaced worn out parts. Tested functionality.",
    },
    {
      date: "2022-12-05",
      type: "Regular Maintenance",
      technician: "John Smith",
      notes: "Routine check and calibration.",
    },
  ]

  // Mock transaction history
  const transactionHistory = [
    {
      date: "2024-01-15",
      type: "Check Out",
      quantity: 2,
      user: "Dr. Emily Chen",
      notes: "For Cell Biology class",
    },
    {
      date: "2024-01-10",
      type: "Check In",
      quantity: 1,
      user: "Lab Assistant",
      notes: "Returned after repair",
    },
    {
      date: "2023-12-20",
      type: "Check Out",
      quantity: 3,
      user: "Prof. Robert Williams",
      notes: "For research project",
    },
    {
      date: "2023-11-05",
      type: "Restock",
      quantity: 5,
      user: "Inventory Manager",
      notes: "Regular inventory replenishment",
    },
  ]

  const handleSave = () => {
    // Here you would typically save the changes to your backend
    setIsEditing(false)
    // For demo purposes, we're just updating the local state
    // In a real app, you would make an API call here
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Package className="h-5 w-5" />
            {isEditing ? "Edit Item" : "Inventory Item Details"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Make changes to the inventory item details below."
              : "View detailed information about this inventory item."}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details" className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              Details
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Maintenance
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-4">
            {isEditing ? (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Item Name</Label>
                    <Input
                      id="name"
                      value={editedItem.name}
                      onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="id">Item ID</Label>
                    <Input id="id" value={editedItem.id} disabled />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={editedItem.category}
                      onChange={(e) => setEditedItem({ ...editedItem, category: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={editedItem.location}
                      onChange={(e) => setEditedItem({ ...editedItem, location: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Current Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={editedItem.quantity}
                      onChange={(e) => setEditedItem({ ...editedItem, quantity: Number.parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalQuantity">Total Quantity</Label>
                    <Input
                      id="totalQuantity"
                      type="number"
                      value={editedItem.totalQuantity}
                      onChange={(e) => setEditedItem({ ...editedItem, totalQuantity: Number.parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={editedItem.price}
                      onChange={(e) => setEditedItem({ ...editedItem, price: Number.parseFloat(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supplier">Supplier</Label>
                    <Input
                      id="supplier"
                      value={editedItem.supplier}
                      onChange={(e) => setEditedItem({ ...editedItem, supplier: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lastMaintenance">Last Maintenance Date</Label>
                    <Input
                      id="lastMaintenance"
                      type="date"
                      value={editedItem.lastMaintenance || ""}
                      onChange={(e) => setEditedItem({ ...editedItem, lastMaintenance: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nextMaintenance">Next Maintenance Date</Label>
                    <Input
                      id="nextMaintenance"
                      type="date"
                      value={editedItem.nextMaintenance || ""}
                      onChange={(e) => setEditedItem({ ...editedItem, nextMaintenance: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="flex gap-6">
                  <div className="h-32 w-32 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">{item.name}</h3>
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
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">ID: {item.id}</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="outline" className="font-normal">
                        {item.category}
                      </Badge>
                      <Badge variant="outline" className="font-normal">
                        {item.location}
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <div className="mb-1 flex justify-between text-sm">
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
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="mb-2 font-medium">Item Details</h4>
                    <dl className="grid grid-cols-[120px_1fr] gap-2 text-sm">
                      <dt className="text-muted-foreground">Price:</dt>
                      <dd className="font-medium">${item.price.toFixed(2)}</dd>

                      <dt className="text-muted-foreground">Supplier:</dt>
                      <dd>{item.supplier}</dd>

                      <dt className="text-muted-foreground">Purchase Date:</dt>
                      <dd>{new Date(item.purchaseDate).toLocaleDateString()}</dd>
                    </dl>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium">Maintenance Information</h4>
                    <dl className="grid grid-cols-[160px_1fr] gap-2 text-sm">
                      {item.lastMaintenance && (
                        <>
                          <dt className="text-muted-foreground">Last Maintenance:</dt>
                          <dd>{new Date(item.lastMaintenance).toLocaleDateString()}</dd>
                        </>
                      )}

                      {item.nextMaintenance && (
                        <>
                          <dt className="text-muted-foreground">Next Maintenance:</dt>
                          <dd>
                            {new Date(item.nextMaintenance).toLocaleDateString()}
                            {new Date(item.nextMaintenance) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                              <Badge variant="warning" className="ml-2">
                                Due Soon
                              </Badge>
                            )}
                          </dd>
                        </>
                      )}

                      {!item.lastMaintenance && !item.nextMaintenance && (
                        <dd className="col-span-2 italic text-muted-foreground">
                          No maintenance schedule for this item
                        </dd>
                      )}
                    </dl>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="maintenance" className="mt-4">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-medium">Maintenance Schedule</h3>
                <p className="text-sm text-muted-foreground">
                  Track maintenance history and upcoming maintenance for this item
                </p>
              </div>

              {item.nextMaintenance ? (
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Next Scheduled Maintenance</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(item.nextMaintenance).toLocaleDateString()}(
                        {Math.ceil((new Date(item.nextMaintenance).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}{" "}
                        days from now)
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-muted p-2 text-muted-foreground">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">No Maintenance Scheduled</h4>
                      <p className="text-sm text-muted-foreground">This item does not have any scheduled maintenance</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h4 className="mb-2 font-medium">Maintenance History</h4>
                {maintenanceHistory.length > 0 ? (
                  <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="h-10 px-4 text-left font-medium">Date</th>
                            <th className="h-10 px-4 text-left font-medium">Type</th>
                            <th className="h-10 px-4 text-left font-medium">Technician</th>
                            <th className="h-10 px-4 text-left font-medium">Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {maintenanceHistory.map((record, index) => (
                            <tr key={index} className="border-b hover:bg-muted/50">
                              <td className="p-2 px-4">{new Date(record.date).toLocaleDateString()}</td>
                              <td className="p-2 px-4">{record.type}</td>
                              <td className="p-2 px-4">{record.technician}</td>
                              <td className="p-2 px-4">{record.notes}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border bg-card p-4 text-center">
                    <p className="text-sm text-muted-foreground">No maintenance history available for this item</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-medium">Transaction History</h3>
                <p className="text-sm text-muted-foreground">
                  Track check-ins, check-outs, and other inventory movements
                </p>
              </div>

              {transactionHistory.length > 0 ? (
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="h-10 px-4 text-left font-medium">Date</th>
                          <th className="h-10 px-4 text-left font-medium">Type</th>
                          <th className="h-10 px-4 text-left font-medium">Quantity</th>
                          <th className="h-10 px-4 text-left font-medium">User</th>
                          <th className="h-10 px-4 text-left font-medium">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactionHistory.map((record, index) => (
                          <tr key={index} className="border-b hover:bg-muted/50">
                            <td className="p-2 px-4">{new Date(record.date).toLocaleDateString()}</td>
                            <td className="p-2 px-4">
                              <Badge
                                variant={
                                  record.type === "Check Out"
                                    ? "outline"
                                    : record.type === "Check In"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {record.type}
                              </Badge>
                            </td>
                            <td className="p-2 px-4">{record.quantity}</td>
                            <td className="p-2 px-4">{record.user}</td>
                            <td className="p-2 px-4">{record.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border bg-card p-4 text-center">
                  <p className="text-sm text-muted-foreground">No transaction history available for this item</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex items-center justify-between sm:justify-between">
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Item
              </Button>
            </div>
          )}

          {!isEditing && (
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Item
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

