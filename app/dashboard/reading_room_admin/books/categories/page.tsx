import { BookCategoriesManagement } from "@/components/reading-room/book-categories-management"

export default function BookCategoriesPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Kategori Buku</h1>
      <BookCategoriesManagement />
    </div>
  )
}

