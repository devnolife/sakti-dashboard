"use client"

import type React from "react"

import { useState } from "react"
import { Package, Upload } from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

export function AddInventoryDialog({
  open,
  onOpenChange,
  categories,
  locations,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  categories: string[]
  locations: string[]
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onOpenChange(false)
      // Here you would typically make an API call to add the item
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Package className="h-5 w-5" />
            Add New Inventory Item
          </DialogTitle>
          <DialogDescription>Fill in the details below to add a new item to the inventory</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Item Name *</Label>
                <Input id="name" placeholder="Enter item name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="itemId">Item ID</Label>
                <Input id="itemId" placeholder="Auto-generated if left empty" />
                <p className="text-xs text-muted-foreground">Leave blank for auto-generated ID</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Select required>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Initial Quantity *</Label>
                <Input id="quantity" type="number" min="0" placeholder="Enter quantity" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (USD) *</Label>
                <Input id="price" type="number" min="0" step="0.01" placeholder="Enter price" required />
              </div>
            </div>

            <Separator className="my-2" />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Input id="supplier" placeholder="Enter supplier name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchaseDate">Purchase Date</Label>
                <Input id="purchaseDate" type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter item description" className="min-h-[100px]" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Item Image</Label>
              <div className="flex items-center gap-4">
                <div className="h-24 w-24 rounded-md border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <div className="flex-1">
                  <Input id="image" type="file" className="cursor-pointer" />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Upload an image of the item (PNG, JPG, or WEBP, max 5MB)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="mr-2">Adding Item...</span>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                </>
              ) : (
                "Add Item"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

