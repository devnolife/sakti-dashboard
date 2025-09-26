"use client"

import { format, parseISO } from "date-fns"
import { id } from "date-fns/locale"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, RotateCcw } from "lucide-react"

interface BorrowedBook {
  id: string
  title: string
  author: string
  borrowDate: string
  dueDate: string
  status: string
  fine: number | null
}

interface MyBorrowedBooksProps {
  borrowedBooks: BorrowedBook[]
}

export function MyBorrowedBooks({ borrowedBooks }: MyBorrowedBooksProps) {
  // Separate active and returned books
  const activeBorrowings = borrowedBooks.filter(book => book.status === 'active')
  const historyBorrowings = borrowedBooks.filter(book => book.status === 'returned')

  const getStatusBadge = (status: string, dueDate: string) => {
    if (status === 'returned') {
      return <Badge variant="secondary">Dikembalikan</Badge>
    }
    if (status === 'overdue') {
      return <Badge variant="destructive">Terlambat</Badge>
    }
    if (status === 'active') {
      const due = parseISO(dueDate)
      const now = new Date()
      const isOverdue = due < now
      if (isOverdue) {
        return <Badge variant="destructive">Terlambat</Badge>
      }
      return <Badge variant="default">Aktif</Badge>
    }
    return <Badge variant="outline">{status}</Badge>
  }

  return (
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
              {activeBorrowings.length > 0 ? (
                activeBorrowings.map((book) => (
                  <div key={book.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <div className="font-medium">{book.title}</div>
                      <div className="text-sm text-muted-foreground">{book.author}</div>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(book.status, book.dueDate)}
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          Jatuh tempo: {format(parseISO(book.dueDate), 'dd MMM yyyy', { locale: id })}
                        </Badge>
                        {book.fine && (
                          <Badge variant="destructive">
                            Denda: Rp {book.fine.toLocaleString()}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">Tidak ada buku yang sedang dipinjam.</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="history" className="mt-4">
            <div className="space-y-4">
              {historyBorrowings.length > 0 ? (
                historyBorrowings.map((book) => (
                  <div key={book.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <div className="font-medium">{book.title}</div>
                      <div className="text-sm text-muted-foreground">{book.author}</div>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(book.status, book.dueDate)}
                        <Badge variant="outline">
                          <RotateCcw className="h-3 w-3 mr-1" />
                          Dipinjam: {format(parseISO(book.borrowDate), 'dd MMM yyyy', { locale: id })}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">Belum ada riwayat peminjaman.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
