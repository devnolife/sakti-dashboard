"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, CheckCircle, AlertCircle, Clock, BookOpen } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProcessReturnDialog } from "./process-return-dialog"
import { useToast } from "@/components/ui/use-toast"
import { mockPendingReturns, mockRecentReturns } from "./mock-returns-data"

export function BookReturnsManagement() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReturn, setSelectedReturn] = useState<any | null>(null)
  const [showProcessDialog, setShowProcessDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("pending")

  const filteredPendingReturns = mockPendingReturns.filter(
    (item) =>
      item.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentId.includes(searchQuery) ||
      item.bookId.includes(searchQuery),
  )

  const filteredRecentReturns = mockRecentReturns.filter(
    (item) =>
      item.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentId.includes(searchQuery) ||
      item.bookId.includes(searchQuery),
  )

  const handleProcessReturn = (returnItem: any) => {
    setSelectedReturn(returnItem)
    setShowProcessDialog(true)
  }

  const handleReturnProcessed = (returnData: any, condition: string) => {
    toast({
      title: "Buku berhasil dikembalikan",
      description: `${returnData.bookTitle} telah dikembalikan oleh ${returnData.studentName} dalam kondisi ${condition}.`,
    })
    setShowProcessDialog(false)
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold tracking-tight">Pengembalian Buku</h1>

      <div className="mb-4 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari buku, mahasiswa, atau ID..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>

      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="pending">Menunggu Pengembalian</TabsTrigger>
          <TabsTrigger value="recent">Pengembalian Terbaru</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Buku yang Akan Dikembalikan</CardTitle>
              <CardDescription>Proses pengembalian buku dari mahasiswa.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mahasiswa</TableHead>
                    <TableHead>Buku</TableHead>
                    <TableHead>Tanggal Pinjam</TableHead>
                    <TableHead>Jatuh Tempo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPendingReturns.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        Tidak ada buku yang menunggu pengembalian
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPendingReturns.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={item.studentName} />
                              <AvatarFallback>{item.studentName.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium">{item.studentName}</span>
                              <span className="text-xs text-muted-foreground">{item.studentId}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{item.bookTitle}</div>
                          <div className="text-xs text-muted-foreground">ID: {item.bookId}</div>
                        </TableCell>
                        <TableCell>{item.borrowDate}</TableCell>
                        <TableCell>{item.dueDate}</TableCell>
                        <TableCell>
                          {item.isOverdue ? (
                            <Badge variant="destructive" className="gap-1">
                              <AlertCircle className="h-3 w-3" />
                              <span>Terlambat {Math.abs(item.daysOverdue)} hari</span>
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="gap-1">
                              <Clock className="h-3 w-3" />
                              <span>Tepat waktu</span>
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="default"
                            size="sm"
                            className="h-8 gap-1"
                            onClick={() => handleProcessReturn(item)}
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Proses</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Pengembalian Terbaru</CardTitle>
              <CardDescription>Daftar buku yang baru saja dikembalikan.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mahasiswa</TableHead>
                    <TableHead>Buku</TableHead>
                    <TableHead>Tanggal Pinjam</TableHead>
                    <TableHead>Tanggal Kembali</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Kondisi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecentReturns.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        Tidak ada data pengembalian terbaru
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRecentReturns.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={item.studentName} />
                              <AvatarFallback>{item.studentName.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium">{item.studentName}</span>
                              <span className="text-xs text-muted-foreground">{item.studentId}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{item.bookTitle}</div>
                          <div className="text-xs text-muted-foreground">ID: {item.bookId}</div>
                        </TableCell>
                        <TableCell>{item.borrowDate}</TableCell>
                        <TableCell>{item.returnDate}</TableCell>
                        <TableCell>
                          {item.wasOverdue ? (
                            <Badge variant="destructive" className="gap-1">
                              <AlertCircle className="h-3 w-3" />
                              <span>Terlambat</span>
                            </Badge>
                          ) : (
                            <Badge variant="success" className="gap-1 bg-green-500">
                              <CheckCircle className="h-3 w-3" />
                              <span>Tepat waktu</span>
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={item.condition === "Baik" ? "outline" : "destructive"} className="gap-1">
                            <BookOpen className="h-3 w-3" />
                            <span>{item.condition}</span>
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedReturn && (
        <ProcessReturnDialog
          returnData={selectedReturn}
          open={showProcessDialog}
          onOpenChange={setShowProcessDialog}
          onProcessed={handleReturnProcessed}
        />
      )}
    </div>
  )
}

