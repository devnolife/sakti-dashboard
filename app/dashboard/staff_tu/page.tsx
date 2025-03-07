import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Users, Building, CheckCircle, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function StaffTuDashboardPage() {
  return (
    <div className="flex-1 p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Staff TU Dashboard</h2>
        <p className="mt-2 text-muted-foreground">
          Welcome to the Staff TU dashboard. Manage academic and administrative tasks.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/staff_tu/kkp">
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">KKP Applications</CardTitle>
              <CardDescription>Manage student KKP applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span>View Applications</span>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  <span>Manage</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <div className="text-xs">
                    <p className="font-medium">Pending</p>
                    <p className="text-muted-foreground">3 applications</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                  <AlertCircle className="w-4 h-4 text-blue-500" />
                  <div className="text-xs">
                    <p className="font-medium">In Review</p>
                    <p className="text-muted-foreground">2 applications</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Student Records</CardTitle>
            <CardDescription>Manage student academic records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>View Records</span>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                <span>Manage</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Company Directory</CardTitle>
            <CardDescription>Manage KKP partner companies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                <span>View Companies</span>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                <span>Manage</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="tasks">Pending Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your recent actions and system notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">KKP Application Approved</p>
                    <p className="text-xs text-muted-foreground">
                      You approved Andi Wijaya's KKP application for Tokopedia
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New KKP Application</p>
                    <p className="text-xs text-muted-foreground">
                      Dian Sastro submitted a new KKP application for Perpustakaan Nasional
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <AlertCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Application Set to Review</p>
                    <p className="text-xs text-muted-foreground">
                      You set Rini Susanti's KKP application to review status
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>
                Tasks that require your attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-amber-500/10">
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Review KKP Applications</p>
                      <Button variant="ghost" size="sm">Review</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      3 applications pending review
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-amber-500/10">
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Verify Documents</p>
                      <Button variant="ghost" size="sm">Verify</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      5 documents pending verification
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

