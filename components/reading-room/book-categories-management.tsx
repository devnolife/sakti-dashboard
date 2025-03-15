"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AddCategoryDialog } from "./add-category-dialog"
import { EditCategoryDialog } from "./edit-category-dialog"
import { DeleteCategoryDialog } from "./delete-category-dialog"
import { mockCategories } from "./mock-data"
import type { BookCategory } from "@/types/book"

export function BookCategoriesManagement() {
  const [categories, setCategories] = useState<BookCategory[]>(mockCategories)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | null>(null)

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.code.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddCategory = (newCategory: BookCategory) => {
    setCategories([...categories, { ...newCategory, id: (categories.length + 1).toString() }])
    setShowAddDialog(false)
  }

  const handleEditCategory = (updatedCategory: BookCategory) => {
    setCategories(categories.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat)))
    setShowEditDialog(false)
    setSelectedCategory(null)
  }

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId))
    setShowDeleteDialog(false)
    setSelectedCategory(null)
  }

  const openEditDialog = (category: BookCategory) => {
    setSelectedCategory(category)
    setShowEditDialog(true)
  }

  const openDeleteDialog = (category: BookCategory) => {
    setSelectedCategory(category)
    setShowDeleteDialog(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari kategori..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Tambah Kategori
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Kategori Buku</CardTitle>
          <CardDescription>
            Kelola kategori buku untuk memudahkan pengorganisasian koleksi perpustakaan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Nama Kategori</TableHead>
                <TableHead>Jumlah Buku</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    Tidak ada kategori yang ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.code}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.bookCount}</TableCell>
                    <TableCell>
                      <Badge variant={category.isActive ? "default" : "secondary"}>
                        {category.isActive ? "Aktif" : "Tidak Aktif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => openEditDialog(category)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => openDeleteDialog(category)}
                          disabled={category.bookCount > 0}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Menampilkan {filteredCategories.length} dari {categories.length} kategori
          </div>
        </CardFooter>
      </Card>

      {showAddDialog && (
        <AddCategoryDialog open={showAddDialog} onOpenChange={setShowAddDialog} onAdd={handleAddCategory} />
      )}

      {showEditDialog && selectedCategory && (
        <EditCategoryDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          category={selectedCategory}
          onEdit={handleEditCategory}
        />
      )}

      {showDeleteDialog && selectedCategory && (
        <DeleteCategoryDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          category={selectedCategory}
          onDelete={handleDeleteCategory}
        />
      )}
    </div>
  )
}

