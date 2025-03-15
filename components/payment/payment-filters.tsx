"use client"

import { useState } from "react"
import { Search, X, SlidersHorizontal } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function PaymentFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [department, setDepartment] = useState<string | undefined>()
  const [status, setStatus] = useState<string | undefined>()
  const [paymentType, setPaymentType] = useState<string | undefined>()
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleFilterChange = (type: string, value: string | undefined) => {
    if (!value) {
      setActiveFilters((prev) => prev.filter((filter) => !filter.startsWith(type)))
      return
    }

    const filterString = `${type}:${value}`
    setActiveFilters((prev) => {
      const withoutType = prev.filter((filter) => !filter.startsWith(type))
      return [...withoutType, filterString]
    })
  }

  const handleDepartmentChange = (value: string) => {
    setDepartment(value)
    handleFilterChange("Department", value)
  }

  const handleStatusChange = (value: string) => {
    setStatus(value)
    handleFilterChange("Status", value)
  }

  const handlePaymentTypeChange = (value: string) => {
    setPaymentType(value)
    handleFilterChange("Type", value)
  }

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range)
    if (range.from && range.to) {
      const fromStr = format(range.from, "yyyy-MM-dd")
      const toStr = format(range.to, "yyyy-MM-dd")
      handleFilterChange("Date", `${fromStr} to ${toStr}`)
    } else {
      handleFilterChange("Date", undefined)
    }
  }

  const removeFilter = (filter: string) => {
    const [type] = filter.split(":")

    if (type === "Department") setDepartment(undefined)
    if (type === "Status") setStatus(undefined)
    if (type === "Type") setPaymentType(undefined)
    if (type === "Date") setDateRange({ from: undefined, to: undefined })

    setActiveFilters((prev) => prev.filter((f) => f !== filter))
  }

  const clearAllFilters = () => {
    setDepartment(undefined)
    setStatus(undefined)
    setPaymentType(undefined)
    setDateRange({ from: undefined, to: undefined })
    setActiveFilters([])
  }

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by student name, ID, or payment ID..."
            className="pl-10 transition-all bg-background/50 border-muted focus-visible:bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 bg-background/50 border-muted hover:bg-background">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Filters</h4>
                  <p className="text-sm text-muted-foreground">Filter payment verifications by various criteria</p>
                </div>
                <Separator />
                <div className="grid gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="department">Department</Label>
                    <Select value={department} onValueChange={handleDepartmentChange}>
                      <SelectTrigger id="department" className="bg-background">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pengairan">Pengairan</SelectItem>
                        <SelectItem value="Elektro">Elektro</SelectItem>
                        <SelectItem value="Arsitektur">Arsitektur</SelectItem>
                        <SelectItem value="Informatika">Informatika</SelectItem>
                        <SelectItem value="PWK">PWK</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={handleStatusChange}>
                      <SelectTrigger id="status" className="bg-background">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="paymentType">Payment Type</Label>
                    <Select value={paymentType} onValueChange={handlePaymentTypeChange}>
                      <SelectTrigger id="paymentType" className="bg-background">
                        <SelectValue placeholder="Select payment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tuition">Tuition</SelectItem>
                        <SelectItem value="Laboratory">Laboratory</SelectItem>
                        <SelectItem value="Registration">Registration</SelectItem>
                        <SelectItem value="Exam">Exam</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-1.5">
                    <Label>Date Range</Label>
                    <Card className="border-none shadow-none">
                      <CardContent className="p-0">
                        <Calendar
                          mode="range"
                          selected={dateRange}
                          onSelect={handleDateRangeChange}
                          numberOfMonths={1}
                          className="border-none shadow-none"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {activeFilters.length > 0 && (
            <Button variant="ghost" onClick={clearAllFilters} size="sm" className="text-muted-foreground">
              Clear all
            </Button>
          )}
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 duration-300 animate-in fade-in">
          {activeFilters.map((filter) => {
            const [type, value] = filter.split(":")
            return (
              <Badge key={filter} variant="secondary" className="gap-1 px-3 py-1 bg-background/80">
                <span className="font-medium text-muted-foreground">{type}:</span> {value}
                <Button variant="ghost" size="icon" className="w-4 h-4 p-0 ml-1" onClick={() => removeFilter(filter)}>
                  <X className="w-3 h-3" />
                  <span className="sr-only">Remove {type} filter</span>
                </Button>
              </Badge>
            )
          })}
        </div>
      )}
    </div>
  )
}

