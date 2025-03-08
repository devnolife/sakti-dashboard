"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Edit, MoreVertical, Search, Trash } from "lucide-react"
import EditMaterialDialog from "./edit-material-dialog"
import { formatDate } from "@/lib/utils"

export default function PracticumMaterialsTable({ materials, onUpdate, onDelete }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [editingMaterial, setEditingMaterial] = useState(null)

  const filteredMaterials = materials.filter(
    (material) =>
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.course.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStockStatusBadge = (quantity, threshold) => {
    if (quantity <= 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    } else if (quantity <= threshold) {
      return <Badge variant="warning">Low Stock</Badge>
    } else {
      return <Badge variant="outline">In Stock</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search materials..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMaterials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No materials found.
                </TableCell>
              </TableRow>
            ) : (
              filteredMaterials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell className="font-medium">{material.name}</TableCell>
                  <TableCell>{material.category}</TableCell>
                  <TableCell>{material.course}</TableCell>
                  <TableCell>
                    {material.quantity} {material.unit}
                  </TableCell>
                  <TableCell>{getStockStatusBadge(material.quantity, material.threshold)}</TableCell>
                  <TableCell>{formatDate(material.updatedAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setEditingMaterial(material)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => onDelete(material.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
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

      {editingMaterial && (
        <EditMaterialDialog
          material={editingMaterial}
          open={!!editingMaterial}
          onOpenChange={(open) => !open && setEditingMaterial(null)}
          onUpdate={(updatedMaterial) => {
            onUpdate({
              ...updatedMaterial,
              updatedAt: new Date().toISOString(),
            })
            setEditingMaterial(null)
          }}
        />
      )}
    </div>
  )
}

