"use client"

import { useState } from "react"
import { Calendar, CheckCircle2, Clock, Edit, Flame, MoreHorizontal, Plus, Send, Trash2, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

interface TaskDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: any // Replace with proper type
}

export function TaskDetailDialog({ open, onOpenChange, task }: TaskDetailDialogProps) {
  const [activeTab, setActiveTab] = useState("details")
  const [comment, setComment] = useState("")

  // Mock comments data
  const comments = [
    {
      id: 1,
      user: {
        name: "Alex Kim",
        avatar: "/placeholder-user.jpg",
      },
      content: "I've started calibrating the microscopes in Room 101. Should be done by tomorrow.",
      timestamp: "2023-11-12T14:30:00Z",
    },
    {
      id: 2,
      user: {
        name: "Jamie Chen",
        avatar: "/placeholder-user.jpg",
      },
      content: "I'll handle the ones in Room 102. Do we have the calibration kit?",
      timestamp: "2023-11-12T15:45:00Z",
    },
    {
      id: 3,
      user: {
        name: "Alex Kim",
        avatar: "/placeholder-user.jpg",
      },
      content: "Yes, it's in the storage cabinet. I've already checked it out.",
      timestamp: "2023-11-12T16:10:00Z",
    },
  ]

  // Mock activity data
  const activities = [
    {
      id: 1,
      user: {
        name: "System",
        avatar: "/placeholder.svg",
      },
      action: "created this task",
      timestamp: "2023-11-10T09:00:00Z",
    },
    {
      id: 2,
      user: {
        name: "Admin",
        avatar: "/placeholder-user.jpg",
      },
      action: "assigned Alex Kim to this task",
      timestamp: "2023-11-10T09:05:00Z",
    },
    {
      id: 3,
      user: {
        name: "Admin",
        avatar: "/placeholder-user.jpg",
      },
      action: "assigned Jamie Chen to this task",
      timestamp: "2023-11-10T09:05:00Z",
    },
    {
      id: 4,
      user: {
        name: "Alex Kim",
        avatar: "/placeholder-user.jpg",
      },
      action: "updated the progress to 30%",
      timestamp: "2023-11-11T14:20:00Z",
    },
    {
      id: 5,
      user: {
        name: "Alex Kim",
        avatar: "/placeholder-user.jpg",
      },
      action: "updated the progress to 65%",
      timestamp: "2023-11-12T16:15:00Z",
    },
  ]

  const handleSubmitComment = () => {
    if (comment.trim()) {
      // In a real app, you would add the comment to the database
      // and update the UI accordingly
      setComment("")
    }
  }

  if (!task) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {task.priority === "high" && <Badge className="bg-rose-500 hover:bg-rose-600">High Priority</Badge>}
              {task.priority === "medium" && <Badge className="bg-amber-500 hover:bg-amber-600">Medium Priority</Badge>}
              {task.priority === "low" && <Badge className="bg-emerald-500 hover:bg-emerald-600">Low Priority</Badge>}
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
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" /> Edit task
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" /> Assign staff
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <DialogTitle className="text-xl font-bold mt-2">{task.title}</DialogTitle>
          <DialogDescription className="text-base">{task.description}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="comments">Comments ({comments.length})</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm font-medium">Status</div>
                <div className="flex items-center gap-2">
                  {task.status === "in-progress" && (
                    <Badge
                      variant="outline"
                      className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20"
                    >
                      <Clock className="mr-1 h-3 w-3" /> In Progress
                    </Badge>
                  )}
                  {task.status === "completed" && (
                    <Badge
                      variant="outline"
                      className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20"
                    >
                      <CheckCircle2 className="mr-1 h-3 w-3" /> Completed
                    </Badge>
                  )}
                  {task.status === "not-started" && (
                    <Badge
                      variant="outline"
                      className="bg-slate-500/10 text-slate-500 hover:bg-slate-500/20 border-slate-500/20"
                    >
                      Not Started
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-medium">Due Date</div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-medium">Priority</div>
                <div className="flex items-center gap-2">
                  {task.priority === "high" && (
                    <div className="flex items-center gap-1">
                      <Flame className="h-4 w-4 text-rose-500" />
                      <span>High</span>
                    </div>
                  )}
                  {task.priority === "medium" && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <span>Medium</span>
                    </div>
                  )}
                  {task.priority === "low" && (
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span>Low</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-medium">Assignees</div>
                <div className="flex items-center gap-1">
                  {task.assignees.map((assignee) => (
                    <Avatar key={assignee.id} className="h-6 w-6 border border-background">
                      <AvatarImage src={assignee.avatar} alt={assignee.name} />
                      <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                  <Button variant="outline" size="icon" className="rounded-full h-6 w-6 border-dashed">
                    <Plus className="h-3 w-3" />
                    <span className="sr-only">Add assignee</span>
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{task.progress}%</span>
              </div>
              <Progress value={task.progress} className="h-2" />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Task Checklist</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="check-1" className="rounded text-primary" checked />
                  <label htmlFor="check-1" className="text-sm line-through opacity-70">
                    Prepare equipment
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="check-2" className="rounded text-primary" checked />
                  <label htmlFor="check-2" className="text-sm line-through opacity-70">
                    Gather calibration tools
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="check-3" className="rounded text-primary" />
                  <label htmlFor="check-3" className="text-sm">
                    Complete Room 101 calibration
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="check-4" className="rounded text-primary" />
                  <label htmlFor="check-4" className="text-sm">
                    Complete Room 102 calibration
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="check-5" className="rounded text-primary" />
                  <label htmlFor="check-5" className="text-sm">
                    Document results
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Attachments</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="border rounded-md p-2 flex items-center gap-2">
                  <div className="bg-blue-100 text-blue-700 rounded p-2 h-10 w-10 flex items-center justify-center">
                    PDF
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-sm font-medium truncate">Calibration_Manual.pdf</div>
                    <div className="text-xs text-muted-foreground">2.4 MB</div>
                  </div>
                </div>
                <div className="border rounded-md p-2 flex items-center gap-2">
                  <div className="bg-green-100 text-green-700 rounded p-2 h-10 w-10 flex items-center justify-center">
                    XLS
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-sm font-medium truncate">Equipment_Inventory.xlsx</div>
                    <div className="text-xs text-muted-foreground">1.8 MB</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="space-y-4 mt-4">
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                    <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.timestamp).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="You" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Textarea
                  placeholder="Add a comment..."
                  className="min-h-[80px]"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button onClick={handleSubmitComment} disabled={!comment.trim()}>
                    <Send className="mr-2 h-4 w-4" /> Send
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-4">
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {activities.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                    <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{activity.user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{activity.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

