import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, FileSignature, TrendingUp, BarChart, PieChart } from "lucide-react"

export default function SystemStatisticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Statistics</h1>
        <p className="text-muted-foreground">
          Comprehensive system usage and performance statistics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Documents
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Signatures
            </CardTitle>
            <FileSignature className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,184</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Signers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52</div>
            <p className="text-xs text-muted-foreground">
              +3 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Success Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">
              +0.3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Document Statistics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Document Generation by Type
            </CardTitle>
            <CardDescription>
              Distribution of document types generated
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">KKP Documents</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">432</span>
                  <Badge variant="outline">34.6%</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Thesis Documents</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">298</span>
                  <Badge variant="outline">23.9%</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Proposal Documents</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">267</span>
                  <Badge variant="outline">21.4%</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm">Final Reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">187</span>
                  <Badge variant="outline">15.0%</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Other Documents</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">63</span>
                  <Badge variant="outline">5.1%</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Documents by Program Studi
            </CardTitle>
            <CardDescription>
              Document generation across study programs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                  <span className="text-sm">Informatika</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">512</span>
                  <Badge variant="outline">41.1%</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-sm">Elektro</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">387</span>
                  <Badge variant="outline">31.0%</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm">Arsitektur</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">234</span>
                  <Badge variant="outline">18.8%</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <span className="text-sm">Teknik Mesin</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">89</span>
                  <Badge variant="outline">7.1%</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                  <span className="text-sm">Others</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">25</span>
                  <Badge variant="outline">2.0%</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance Overview</CardTitle>
          <CardDescription>
            Document generation and signature trends over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-6">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Aug 2024</p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-green-600">+8%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Sep 2024</p>
                <p className="text-2xl font-bold">203</p>
                <p className="text-xs text-green-600">+30%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Oct 2024</p>
                <p className="text-2xl font-bold">189</p>
                <p className="text-xs text-red-600">-7%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Nov 2024</p>
                <p className="text-2xl font-bold">267</p>
                <p className="text-xs text-green-600">+41%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Dec 2024</p>
                <p className="text-2xl font-bold">298</p>
                <p className="text-xs text-green-600">+12%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Jan 2025</p>
                <p className="text-2xl font-bold">134</p>
                <p className="text-xs text-muted-foreground">Current</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="grid gap-4 md:grid-cols-3 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Average Monthly</p>
                  <p className="text-xl font-bold">207</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Peak Month</p>
                  <p className="text-xl font-bold">298 (Dec)</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Growth Rate</p>
                  <p className="text-xl font-bold text-green-600">+15.3%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Performance Metrics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>
              API response times and system health metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Average Response Time</span>
                <span className="font-medium">120ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">95th Percentile</span>
                <span className="font-medium">245ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Error Rate</span>
                <span className="font-medium text-green-600">0.02%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Uptime</span>
                <span className="font-medium text-green-600">99.98%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Request Volume/Day</span>
                <span className="font-medium">15,247</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
            <CardDescription>
              User activity and system usage patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Daily Active Users</span>
                <span className="font-medium">245</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Peak Concurrent Users</span>
                <span className="font-medium">67</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Most Active Hour</span>
                <span className="font-medium">10:00 - 11:00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Average Session Duration</span>
                <span className="font-medium">23 minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Documents per User/Day</span>
                <span className="font-medium">2.3</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
