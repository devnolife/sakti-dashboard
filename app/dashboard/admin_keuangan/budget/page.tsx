import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Wallet, PieChart, TrendingUp, AlertTriangle, Plus, Download } from "lucide-react"

export const metadata: Metadata = {
  title: "Budget Management | Finance Admin Dashboard",
  description: "Manage and allocate budgets across departments and programs",
}

// Mock budget data
const departmentBudgets = [
  {
    department: "Informatics",
    allocated: 1200000000,
    spent: 780000000,
    remaining: 420000000,
    percentage: 65,
  },
  {
    department: "Architecture",
    allocated: 950000000,
    spent: 520000000,
    remaining: 430000000,
    percentage: 55,
  },
  {
    department: "Electrical",
    allocated: 850000000,
    spent: 610000000,
    remaining: 240000000,
    percentage: 72,
  },
  {
    department: "Urban Planning",
    allocated: 750000000,
    spent: 390000000,
    remaining: 360000000,
    percentage: 52,
  },
  {
    department: "Watering",
    allocated: 680000000,
    spent: 450000000,
    remaining: 230000000,
    percentage: 66,
  },
]

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export default function BudgetPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Budget Management</h2>
          <p className="text-muted-foreground">Manage and allocate budgets across departments and programs</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Budget
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Budget Data
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 4.43B</div>
            <p className="text-xs text-muted-foreground">For academic year 2023/2024</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spent</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 2.75B</div>
            <p className="text-xs text-muted-foreground">62% of total budget</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 1.68B</div>
            <p className="text-xs text-muted-foreground">38% of total budget</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 nearing budget limit</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department Budget Allocation</CardTitle>
          <CardDescription>Budget allocation and spending by department</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Allocated</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departmentBudgets.map((budget) => (
                <TableRow key={budget.department}>
                  <TableCell className="font-medium">{budget.department}</TableCell>
                  <TableCell>{formatCurrency(budget.allocated)}</TableCell>
                  <TableCell>{formatCurrency(budget.spent)}</TableCell>
                  <TableCell>{formatCurrency(budget.remaining)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={budget.percentage} className="h-2 w-[100px]" />
                      <span className="text-sm">{budget.percentage}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget Details</CardTitle>
          <CardDescription>Detailed budget information and allocation</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="allocation">Allocation</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="h-[300px] w-full flex items-center justify-center border border-dashed rounded-md">
                <div className="text-center">
                  <PieChart className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Budget Overview</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Comprehensive overview of budget allocation and spending
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="allocation">
              <div className="h-[300px] w-full flex items-center justify-center border border-dashed rounded-md">
                <div className="text-center">
                  <Wallet className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Budget Allocation</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Detailed breakdown of budget allocation across departments
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="expenses">
              <div className="h-[300px] w-full flex items-center justify-center border border-dashed rounded-md">
                <div className="text-center">
                  <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Expense Tracking</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Track and monitor expenses against allocated budgets
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="planning">
              <div className="h-[300px] w-full flex items-center justify-center border border-dashed rounded-md">
                <div className="text-center">
                  <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Budget Planning</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Plan and forecast future budget allocations</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

