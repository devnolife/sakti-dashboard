export interface BookCategory {
  id: string
  code: string
  name: string
  description?: string
  bookCount: number
  isActive: boolean
}

export interface Book {
  id: string
  title: string
  author: string
  publisher: string
  publicationYear: number
  isbn: string
  categoryId: string
  categoryName: string
  coverImage?: string
  description?: string
  pageCount: number
  location: string
  status: "available" | "borrowed" | "reserved" | "maintenance"
  addedDate: string
  lastBorrowedDate?: string
  borrowCount: number
}

export interface BookBorrowing {
  id: string
  bookId: string
  bookTitle: string
  studentId: string
  studentName: string
  borrowDate: string
  dueDate: string
  returnDate?: string
  status: "active" | "returned" | "overdue" | "lost"
  notes?: string
}

