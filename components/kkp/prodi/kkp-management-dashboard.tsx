"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, RefreshCw } from "lucide-react"
import KkpLocationSubmissionsTable from "./kkp-location-submissions-table"
import KkpTeamSubmissionsTable from "./kkp-team-submissions-table"
import StudentKkpStatusTable from "./student-kkp-status-table"
import CompletedKkpRecordsTable from "./completed-kkp-records-table"
import { useToast } from "@/components/ui/use-toast"

export default function KkpManagementDashboard() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("locations")
  const [searchQuery, setSearchQuery] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Data refreshed",
        description: "The latest KKP data has been loaded.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            KKP Management
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Manage and monitor Kerja Praktik (KKP) activities for students</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, ID, or location..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="w-full md:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="w-full md:w-auto" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="locations"
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value)
          setSearchQuery("")
        }}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="locations">Location Submissions</TabsTrigger>
          <TabsTrigger value="teams">Team Submissions</TabsTrigger>
          <TabsTrigger value="status">Student Status</TabsTrigger>
          <TabsTrigger value="completed">Completed Records</TabsTrigger>
        </TabsList>

        <TabsContent value="locations">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle>KKP Location Submissions</CardTitle>
              <CardDescription>Review and approve location submissions for KKP</CardDescription>
            </CardHeader>
            <CardContent>
              <KkpLocationSubmissionsTable searchQuery={searchQuery} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle>KKP Team Submissions</CardTitle>
              <CardDescription>Review and approve team submissions for KKP</CardDescription>
            </CardHeader>
            <CardContent>
              <KkpTeamSubmissionsTable searchQuery={searchQuery} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle>Student KKP Status</CardTitle>
              <CardDescription>Track the status of students currently undertaking KKP</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentKkpStatusTable searchQuery={searchQuery} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle>Completed KKP Records</CardTitle>
              <CardDescription>View records of students who have completed their KKP</CardDescription>
            </CardHeader>
            <CardContent>
              <CompletedKkpRecordsTable searchQuery={searchQuery} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

