"use client"

import type React from "react"

import { useState } from "react"
import { Check, ChevronDown, ShoppingCart } from "lucide-react"

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
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function OrderSuppliesDialog({
  open,
  onOpenChange,
  lowStockItems,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  lowStockItems: any[]
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([])

  // Extract unique suppliers from low stock items
  const suppliers = Array.from(new Set(lowStockItems.map((item) => item.supplier)))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onOpenChange(false)
      // Here you would typically make an API call to place the order
    }, 1500)
  }

  const toggleItem = (itemId: string) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const toggleSupplier = (supplier: string) => {
    setSelectedSuppliers((prev) => (prev.includes(supplier) ? prev.filter((s) => s !== supplier) : [...prev, supplier]))
  }

  const filteredItems = lowStockItems.filter(
    (item) => selectedSuppliers.length === 0 || selectedSuppliers.includes(item.supplier),
  )

  const selectAllItems = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredItems.map((item) => item.id))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ShoppingCart className="h-5 w-5" />
            Order Supplies
          </DialogTitle>
          <DialogDescription>Create a purchase order for low stock items</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">{lowStockItems.length} items require reordering</div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Filter by Supplier
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Select Suppliers</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {suppliers.map((supplier) => (
                    <DropdownMenuCheckboxItem
                      key={supplier}
                      checked={selectedSuppliers.includes(supplier)}
                      onCheckedChange={() => toggleSupplier(supplier)}
                    >
                      {supplier}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm" onClick={selectAllItems}>
                {selectedItems.length === filteredItems.length && filteredItems.length > 0
                  ? "Deselect All"
                  : "Select All"}
              </Button>
            </div>
          </div>

          <div className="max-h-[300px] overflow-y-auto rounded-md border">
            <table className="w-full caption-bottom text-sm">
              <thead className="sticky top-0 bg-background">
                <tr className="border-b">
                  <th className="h-10 w-[40px] px-2"></th>
                  <th className="h-10 px-2 text-left font-medium">Item</th>
                  <th className="h-10 px-2 text-left font-medium">Current Stock</th>
                  <th className="h-10 px-2 text-left font-medium">Status</th>
                  <th className="h-10 px-2 text-left font-medium">Supplier</th>
                  <th className="h-10 px-2 text-left font-medium">Order Quantity</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center">
                      <div className="text-sm text-muted-foreground">No items match the selected filters</div>
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-2 text-center">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => toggleItem(item.id)}
                        />
                      </td>
                      <td className="p-2">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.id}</div>
                      </td>
                      <td className="p-2">
                        {item.quantity} / {item.totalQuantity}
                      </td>
                      <td className="p-2">
                        <Badge variant={item.status === "Low Stock" ? "warning" : "destructive"}>{item.status}</Badge>
                      </td>
                      <td className="p-2">{item.supplier}</td>
                      <td className="p-2">
                        <Input
                          type="number"
                          min="1"
                          defaultValue={item.totalQuantity - item.quantity}
                          className="h-8 w-20"
                          disabled={!selectedItems.includes(item.id)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orderNumber">Purchase Order #</Label>
              <Input id="orderNumber" placeholder="Auto-generated if left empty" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedDelivery">Expected Delivery Date</Label>
              <Input id="expectedDelivery" type="date" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Order Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any special instructions or notes for this order"
              className="min-h-[100px]"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || selectedItems.length === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2">Placing Order...</span>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Place Order
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

