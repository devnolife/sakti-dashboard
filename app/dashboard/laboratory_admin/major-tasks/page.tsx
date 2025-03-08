"use client"

import { useState } from "react"
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Flame,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for major tasks
const majorTasks = [
  {
    id: 1,
    title: "Equipment Calibration",
    description: "Calibrate all microscopes in Biology Lab",
    priority: "high",
    dueDate: "2023-11-15",
    status: "in-progress",
    progress: 65,
    assignees: [
      { id: 1, name: "Alex Kim", avatar: "/placeholder-user.jpg" },
      { id: 2, name: "Jamie Chen", avatar: "/placeholder-user.jpg" },
    ],
    lab: "Biology Lab",
  },
  {
    id: 2,
    title: "Software Update",
    description: "Update simulation software in Computer Lab",
    priority: "medium",
    dueDate: "2023-11-20",
    status: "not-started",
    progress: 0,
    assignees: [{ id: 3, name: "Taylor Wong", avatar: "/placeholder-user.jpg" }],
    lab: "Computer Lab",
  },
  {
    id: 3,
    title: "Safety Inspection",
    description: "Conduct monthly safety inspection in Chemistry Lab",
    priority: "high",
    dueDate: "2023-11-10",
    status: "completed",
    progress: 100,
    assignees: [
      { id: 4, name: "Jordan Lee", avatar: "/placeholder-user.jpg" },
      { id: 5, name: "Casey Park", avatar: "/placeholder-user.jpg" },
    ],
    lab: "Chemistry Lab",
  },
  {
    id: 4,
    title: "Inventory Restocking",
    description: "Restock chemicals and supplies in Chemistry Lab",
    priority: "medium",
    dueDate: "2023-11-25",
    status: "in-progress",
    progress: 30,
    assignees: [{ id: 6, name: "Riley Johnson", avatar: "/placeholder-user.jpg" }],
    lab: "Chemistry Lab",
  },
  {
    id: 5,
    title: "Equipment Maintenance",
    description: "Perform routine maintenance on physics equipment",
    priority: "low",
    dueDate: "2023-12-05",
    status: "not-started",
    progress: 0,
    assignees: [{ id: 7, name: "Morgan Smith", avatar: "/placeholder-user.jpg" }],
    lab: "Physics Lab",
  },
]

export default function MajorTasksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  // Filter tasks based on search query and selected filter
  const filteredTasks = majorTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.lab.toLowerCase().includes(searchQuery.toLowerCase())

    if (selectedFilter === "all") return matchesSearch
    if (selectedFilter === "high-priority") return matchesSearch && task.priority === "high"
    if (selectedFilter === "in-progress") return matchesSearch && task.status === "in-progress"
    if (selectedFilter === "completed") return matchesSearch && task.status === "completed"
    if (selectedFilter === "not-started") return matchesSearch && task.status === "not-started"

    return matchesSearch
  })

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header with stats */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Major Tasks <Sparkles className="h-6 w-6 text-amber-400" />
          </h1>
          <Button className="bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600">
            <Plus className="mr-2 h-4 w-4" /> Create New Task
          </Button>
        </div>
        <p className="text-muted-foreground">Manage and track important laboratory tasks and assignments</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950 dark:to-rose-900 border-rose-200 dark:border-rose-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Flame className="h-5 w-5 text-rose-500" /> High Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{majorTasks.filter((task) => task.priority === "high").length}</div>
            <p className="text-xs text-muted-foreground mt-1">2 in progress, 1 completed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" /> In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {majorTasks.filter((task) => task.status === "in-progress").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">48% average completion</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-emerald-200 dark:border-emerald-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{majorTasks.filter((task) => task.status === "completed").length}</div>
            <p className="text-xs text-muted-foreground mt-1">Last completed 2 days ago</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" /> Assigned Staff
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7</div>
            <p className="text-xs text-muted-foreground mt-1">Across 5 major tasks</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks, labs, or descriptions..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSelectedFilter("all")}>All Tasks</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("high-priority")}>High Priority</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("in-progress")}>In Progress</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("completed")}>Completed</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("not-started")}>Not Started</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Sort</span>
          </Button>

          <Tabs defaultValue="card" className="w-auto">
            <TabsList className="grid w-24 grid-cols-2">
              <TabsTrigger value="card">
                <div className="grid grid-cols-2 gap-0.5 h-4 w-4">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </TabsTrigger>
              <TabsTrigger value="list">
                <div className="flex flex-col gap-0.5 h-4 w-4 justify-center">
                  <div className="h-0.5 w-full bg-current rounded-full"></div>
                  <div className="h-0.5 w-full bg-current rounded-full"></div>
                  <div className="h-0.5 w-full bg-current rounded-full"></div>
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Active filter indicator */}
      {selectedFilter !== "all" && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1 text-sm">
            {selectedFilter === "high-priority" && "High Priority"}
            {selectedFilter === "in-progress" && "In Progress"}
            {selectedFilter === "completed" && "Completed"}
            {selectedFilter === "not-started" && "Not Started"}
            <button className="ml-1 rounded-full hover:bg-muted p-0.5" onClick={() => setSelectedFilter("all")}>
              <span className="sr-only">Clear filter</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 3L3 9M3 3L9 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Badge>
          <span className="text-sm text-muted-foreground">
            {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"} found
          </span>
        </div>
      )}

      {/* Task cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <Card
            key={task.id}
            className="overflow-hidden border border-muted hover:border-muted-foreground/20 transition-all group"
          >
            <CardHeader className="p-4 pb-0">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-2">
                  {task.priority === "high" && <Badge className="bg-rose-500 hover:bg-rose-600">High</Badge>}
                  {task.priority === "medium" && <Badge className="bg-amber-500 hover:bg-amber-600">Medium</Badge>}
                  {task.priority === "low" && <Badge className="bg-emerald-500 hover:bg-emerald-600">Low</Badge>}
                  <Badge variant="outline">{task.lab}</Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit task</DropdownMenuItem>
                    <DropdownMenuItem>Assign staff</DropdownMenuItem>
                    <DropdownMenuItem>Change status</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete task</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardTitle className="text-lg mt-2 group-hover:text-primary transition-colors">{task.title}</CardTitle>
              <CardDescription className="line-clamp-2 mt-1">{task.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Calendar className="h-4 w-4" />
                <span>
                  Due:{" "}
                  {new Date(task.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-2" />
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <div className="flex -space-x-2">
                {task.assignees.map((assignee) => (
                  <Avatar key={assignee.id} className="border-2 border-background h-8 w-8">
                    <AvatarImage src={assignee.avatar} alt={assignee.name} />
                    <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
                <Button variant="outline" size="icon" className="rounded-full h-8 w-8 border-dashed">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add assignee</span>
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                Details <ArrowUpRight className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredTasks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No tasks found</h3>
          <p className="text-muted-foreground text-center max-w-md mt-1">
            We couldn't find any tasks matching your search criteria. Try adjusting your filters or create a new task.
          </p>
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" /> Create New Task
          </Button>
        </div>
      )}
    </div>
  )
}

