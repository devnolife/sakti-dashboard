"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowDownLeft, ArrowUpRight, Building2, GraduationCap, BookOpen, Beaker, Users } from "lucide-react"

// Recent transactions data (in millions of Rupiah)
const transactionsData = [
  {
    id: "tx-001",
    description: "Pembayaran Biaya Lab Informatika",
    amount: 45,
    type: "income",
    department: "Informatika",
    date: "2023-12-15",
    icon: Beaker,
  },
  {
    id: "tx-002",
    description: "Pembelian Peralatan Lab Teknik Elektro",
    amount: 78,
    type: "expense",
    department: "Teknik Elektro",
    date: "2023-12-14",
    icon: Beaker,
  },
  {
    id: "tx-003",
    description: "Pembayaran Biaya Lab Arsitektur",
    amount: 32,
    type: "income",
    department: "Arsitektur",
    date: "2023-12-13",
    icon: Beaker,
  },
  {
    id: "tx-004",
    description: "Dana Penelitian Teknik Sipil",
    amount: 120,
    type: "expense",
    department: "Teknik Sipil - Irigasi",
    date: "2023-12-12",
    icon: BookOpen,
  },
  {
    id: "tx-005",
    description: "Pembayaran Biaya Lab PWK",
    amount: 28,
    type: "income",
    department: "Perencanaan Wilayah & Kota",
    date: "2023-12-11",
    icon: Beaker,
  },
  {
    id: "tx-006",
    description: "Pembelian Furnitur Ruang Dosen",
    amount: 65,
    type: "expense",
    department: "Fakultas",
    date: "2023-12-10",
    icon: Building2,
  },
  {
    id: "tx-007",
    description: "Pembayaran Biaya Lab Teknik Sipil",
    amount: 38,
    type: "income",
    department: "Teknik Sipil - Irigasi",
    date: "2023-12-09",
    icon: Beaker,
  },
  {
    id: "tx-008",
    description: "Beasiswa Mahasiswa Berprestasi",
    amount: 45,
    type: "expense",
    department: "Fakultas",
    date: "2023-12-08",
    icon: GraduationCap,
  },
  {
    id: "tx-009",
    description: "Pembayaran Biaya Lab Teknik Elektro",
    amount: 42,
    type: "income",
    department: "Teknik Elektro",
    date: "2023-12-07",
    icon: Beaker,
  },
  {
    id: "tx-010",
    description: "Gaji Staf Administrasi",
    amount: 85,
    type: "expense",
    department: "Fakultas",
    date: "2023-12-06",
    icon: Users,
  },
]

export function RecentTransactions() {
  // Function to get department color
  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Teknik Sipil - Irigasi":
        return "bg-blue-100 text-blue-700 dark:bg-blue-800/30 dark:text-blue-400"
      case "Teknik Elektro":
        return "bg-red-100 text-red-700 dark:bg-red-800/30 dark:text-red-400"
      case "Arsitektur":
        return "bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-400"
      case "Informatika":
        return "bg-orange-100 text-orange-700 dark:bg-orange-800/30 dark:text-orange-400"
      case "Perencanaan Wilayah & Kota":
        return "bg-purple-100 text-purple-700 dark:bg-purple-800/30 dark:text-purple-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-400"
    }
  }

  // Function to get transaction type badge
  const getTransactionBadge = (type: string) => {
    if (type === "income") {
      return (
        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
          <ArrowDownLeft className="mr-1 h-3 w-3" />
          Pemasukan
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-200">
          <ArrowUpRight className="mr-1 h-3 w-3" />
          Pengeluaran
        </Badge>
      )
    }
  }

  return (
    <div className="space-y-4">
      {transactionsData.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between rounded-lg border p-3 shadow-sm transition-all hover:bg-muted/50"
        >
          <div className="flex items-center gap-3">
            <Avatar className={`h-9 w-9 ${getDepartmentColor(transaction.department)}`}>
              <AvatarFallback>
                <transaction.icon className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{transaction.description}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">{transaction.department}</p>
                <span className="text-xs text-muted-foreground">•</span>
                <p className="text-xs text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className={`text-sm font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
              {transaction.type === "income" ? "+" : "-"} Rp {transaction.amount} Juta
            </p>
            {getTransactionBadge(transaction.type)}
          </div>
        </div>
      ))}
    </div>
  )
}

