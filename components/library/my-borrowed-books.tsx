"use client"

import { useState } from "react"
import { type Book, borrowedBooks, mockBooks } from "./mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookDetailsDialog } from "./book-details-dialog"
import { Badge } from "@/components/ui/badge"
import { Clock, RotateCcw } from "lucide-react"

export function MyBorrowedBooks() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  // Get the full book details for borrowed books
  const borrowedBooksWithDetails = borrowedBooks.map((borrowed) => {
    const bookDetails = mockBooks.find((book) => book.id === borrowed.id)
    return {
      ...borrowed,
      ...bookDetails,
    }
  })

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book)
    setShowDetails(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Buku Saya</CardTitle>
          <CardDescription>Buku yang sedang Anda pinjam dan riwayat peminjaman</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="borrowed" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="borrowed">Sedang Dipinjam</TabsTrigger>
              <TabsTrigger value="history">Riwayat Peminjaman</TabsTrigger>
            </TabsList>
            <TabsContent value="borrowed" className="mt-4">
              <div className="space-y-4">
                {borrowedBooksWithDetails.length > 0 ? (
                  borrowedBooksWithDetails.map((book: any) => (
                    <div key={book.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <div className="font-medium">{book.title}</div>
                        <div className="text-sm text-muted-foreground">{book.author}</div>
                        <div className="mt-1 flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs">Jatuh tempo: {book.dueDate}</span>
                          {book.status === "overdue" && (
                            <Badge variant="destructive" className="text-xs">
                              Terlambat
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(book)}>
                        Detail
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-muted-foreground">Anda tidak memiliki buku yang sedang dipinjam.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="history" className="mt-4">
              <div className="space-y-4">
                {mockBooks
                  .filter((book) => recentlyReturnedBooks.includes(book.id))
                  .map((book) => (
                    <div key={book.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <div className="font-medium">{book.title}</div>
                        <div className="text-sm text-muted-foreground">{book.author}</div>
                        <div className="mt-1 flex items-center gap-2">
                          <RotateCcw className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs">Dikembalikan: 2023-10-25</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(book)}>
                        Detail
                      </Button>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {selectedBook && <BookDetailsDialog book={selectedBook} open={showDetails} onOpenChange={setShowDetails} />}
    </>
  )
}

// Import this at the top of the file
const recentlyReturnedBooks = ["3", "7", "10"]

