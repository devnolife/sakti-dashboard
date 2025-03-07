"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle2,
  Download,
  FileText,
  Award,
  Star,
  Calendar,
  Users,
  Building,
  FileCheck,
  BookOpen,
  PresentationIcon,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react"

export default function FinishKkpPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500">
              Completed KKP
            </span>
          </h1>
          <p className="text-muted-foreground mt-1">
            View your completed Kuliah Kerja Praktik details and documentation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            View Certificate
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      {/* KKP Completion Card */}
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-gradient-to-r from-green-500/10 via-green-400/5 to-transparent p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white p-2 rounded-full shadow-sm">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold">KKP Completed</h2>
              <p className="text-sm text-muted-foreground">Your KKP has been successfully completed</p>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium">Location</h3>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>
                </div>
                <p className="font-medium text-lg">PT Teknologi Maju Indonesia</p>
                <p className="text-sm text-muted-foreground mt-1">Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta</p>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <h3 className="font-medium">Implementation Period</h3>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Start Date</p>
                    <p className="text-sm">August 1, 2023</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">End Date</p>
                    <p className="text-sm">October 31, 2023</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <h3 className="font-medium">Group Members</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium border-2 border-white">
                        JD
                      </div>
                      <div>
                        <p className="text-sm font-medium">John Doe (You)</p>
                        <p className="text-xs text-muted-foreground">1234567890</p>
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary">Leader</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-medium border-2 border-white">
                      AS
                    </div>
                    <div>
                      <p className="text-sm font-medium">Alice Smith</p>
                      <p className="text-xs text-muted-foreground">2345678901</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-medium border-2 border-white">
                      RD
                    </div>
                    <div>
                      <p className="text-sm font-medium">Robert Davis</p>
                      <p className="text-xs text-muted-foreground">3456789012</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-green-100/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium">Final Evaluation</h3>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Excellent</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Final Grade</h4>
                      <div className="flex items-center">
                        <span className="text-xl font-bold text-green-600 mr-2">A</span>
                        <span className="text-sm text-muted-foreground">(92/100)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-medium mb-2">Completion Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileCheck className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Weekly Reports</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">12/12</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Required Hours</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">320/300</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Final Report</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Approved</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <PresentationIcon className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Final Presentation</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium mb-2">Supervisor Comments</h4>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary/50 pl-3">
                      <p className="text-sm italic text-muted-foreground">
                        "John and his team demonstrated exceptional skills in developing the inventory management
                        system. Their solution was well-designed, thoroughly documented, and implemented with attention
                        to detail. The final presentation was clear and professional, showcasing their deep
                        understanding of the project requirements and technical implementation."
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">— Dr. Rudi Hartono, Faculty Supervisor</p>
                    </div>
                    <div className="border-l-4 border-secondary/50 pl-3">
                      <p className="text-sm italic text-muted-foreground">
                        "The inventory management system developed by John's team has significantly improved our
                        operations. The system is user-friendly, reliable, and includes all the features we requested.
                        The team was professional, responsive to feedback, and delivered a high-quality solution that
                        exceeded our expectations."
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">— Budi Santoso, Industry Supervisor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="overview">Project Overview</TabsTrigger>
          <TabsTrigger value="report">Final Report</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="certificate">Certificate</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>Details about your completed KKP project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Project Title</h3>
                  <p className="text-muted-foreground">
                    Development of Inventory Management System for PT Teknologi Maju Indonesia
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Project Description</h3>
                  <p className="text-muted-foreground">
                    This project involved the development of a comprehensive inventory management system for PT
                    Teknologi Maju Indonesia. The system streamlines inventory tracking, ordering, and reporting
                    processes with features including real-time inventory tracking, automated reorder notifications,
                    supplier management, and comprehensive reporting capabilities.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Key Achievements</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Developed a user-friendly interface that reduced training time by 50%</li>
                    <li>Implemented real-time tracking that improved inventory accuracy by 35%</li>
                    <li>Created automated notifications that reduced stockouts by 75%</li>
                    <li>Designed comprehensive reporting features that saved 10 hours per week in manual reporting</li>
                    <li>Successfully integrated with existing company systems with minimal disruption</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Node.js", "Express", "MongoDB", "Docker", "AWS", "Redux", "Material UI"].map(
                      (tech, index) => (
                        <Badge key={index} variant="outline" className="bg-primary/5 text-primary">
                          {tech}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Learning Outcomes</h3>
                  <p className="text-muted-foreground">
                    Through this KKP project, I gained valuable experience in full-stack development, project
                    management, and client communication. I improved my technical skills in React and Node.js, learned
                    how to design and implement a database schema for a complex system, and developed a deeper
                    understanding of inventory management processes. Working in a team environment also enhanced my
                    collaboration and leadership skills.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="report" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Final Report</CardTitle>
              <CardDescription>Your KKP final report and documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Report Documents</h3>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download Full Report
                  </Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-4 font-medium p-3 bg-muted/50">
                    <div>Document</div>
                    <div>Size</div>
                    <div>Last Updated</div>
                    <div>Actions</div>
                  </div>

                  <div className="divide-y">
                    {[
                      {
                        name: "KKP Final Report.pdf",
                        size: "8.5 MB",
                        date: "Oct 31, 2023",
                      },
                      {
                        name: "Technical Documentation.pdf",
                        size: "5.2 MB",
                        date: "Oct 28, 2023",
                      },
                      {
                        name: "User Manual.pdf",
                        size: "3.7 MB",
                        date: "Oct 25, 2023",
                      },
                      {
                        name: "Presentation Slides.pptx",
                        size: "12.1 MB",
                        date: "Oct 30, 2023",
                      },
                      {
                        name: "Source Code.zip",
                        size: "45.3 MB",
                        date: "Oct 29, 2023",
                      },
                    ].map((doc, index) => (
                      <div key={index} className="grid grid-cols-4 p-3 items-center">
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-muted-foreground">{doc.size}</div>
                        <div className="text-sm text-muted-foreground">{doc.date}</div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Report Chapters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Chapter 1: Introduction",
                        description: "Background, objectives, and scope of the project",
                      },
                      {
                        title: "Chapter 2: Literature Review",
                        description: "Review of inventory management systems and technologies",
                      },
                      {
                        title: "Chapter 3: Methodology",
                        description: "Project approach, timeline, and development methodology",
                      },
                      {
                        title: "Chapter 4: System Design",
                        description: "Architecture, database design, and user interface design",
                      },
                      {
                        title: "Chapter 5: Implementation",
                        description: "Development process, challenges, and solutions",
                      },
                      {
                        title: "Chapter 6: Testing & Evaluation",
                        description: "Testing methodology, results, and system evaluation",
                      },
                      {
                        title: "Chapter 7: Conclusion",
                        description: "Summary, lessons learned, and recommendations",
                      },
                      {
                        title: "Appendices",
                        description: "Additional documentation, code samples, and user guides",
                      },
                    ].map((chapter, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <h4 className="font-medium">{chapter.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{chapter.description}</p>
                        <Button variant="link" className="p-0 h-auto mt-2 text-primary">
                          View Chapter <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Documentation</CardTitle>
              <CardDescription>Photos, videos, and other documentation of your KKP project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Media Gallery</h3>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download All Media
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden group relative">
                      <img
                        src={`/placeholder.svg?height=200&width=200&text=Project+Photo+${index + 1}`}
                        alt={`KKP Documentation ${index + 1}`}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="sm" variant="outline" className="h-8 text-white border-white/20 bg-black/20">
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 text-white border-white/20 bg-black/20">
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Project Videos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "System Demo",
                        duration: "5:32",
                        date: "Oct 25, 2023",
                      },
                      {
                        title: "Final Presentation",
                        duration: "15:47",
                        date: "Oct 30, 2023",
                      },
                      {
                        title: "User Interface Walkthrough",
                        duration: "8:21",
                        date: "Oct 20, 2023",
                      },
                      {
                        title: "Team Interview",
                        duration: "10:05",
                        date: "Oct 28, 2023",
                      },
                    ].map((video, index) => (
                      <div key={index} className="border rounded-lg p-4 flex items-center gap-4">
                        <div className="bg-muted aspect-video w-32 flex items-center justify-center rounded">
                          <PresentationIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{video.title}</h4>
                          <p className="text-sm text-muted-foreground">Duration: {video.duration}</p>
                          <p className="text-xs text-muted-foreground">{video.date}</p>
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">
                              Watch
                            </Button>
                            <Button variant="outline" size="sm">
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>KKP Certificate</CardTitle>
              <CardDescription>Your official KKP completion certificate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="border-8 border-double border-primary/20 p-8 max-w-2xl w-full bg-gradient-to-b from-green-50 to-white">
                    <div className="text-center space-y-4">
                      <div className="flex justify-center mb-2">
                        <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
                          <Award className="h-12 w-12 text-primary" />
                        </div>
                      </div>
                      <h2 className="text-2xl font-serif font-bold text-primary">Certificate of Completion</h2>
                      <p className="text-muted-foreground">This certifies that</p>
                      <p className="text-xl font-medium">John Doe</p>
                      <p className="text-muted-foreground">has successfully completed</p>
                      <p className="text-lg font-medium">Kuliah Kerja Praktik (KKP)</p>
                      <p className="text-muted-foreground">at</p>
                      <p className="text-lg font-medium">PT Teknologi Maju Indonesia</p>
                      <p className="text-muted-foreground">from August 1, 2023 to October 31, 2023</p>
                      <div className="pt-6 grid grid-cols-2 gap-8">
                        <div className="text-center">
                          <div className="h-px w-full bg-gray-300 mb-2"></div>
                          <p className="text-sm font-medium">Dr. Rudi Hartono, M.Kom.</p>
                          <p className="text-xs text-muted-foreground">Faculty Supervisor</p>
                        </div>
                        <div className="text-center">
                          <div className="h-px w-full bg-gray-300 mb-2"></div>
                          <p className="text-sm font-medium">Prof. Dr. Siti Aminah, M.Sc.</p>
                          <p className="text-xs text-muted-foreground">Dean, Faculty of Computer Science</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-center">
                        <div className="h-24 w-24 opacity-30">
                          <div className="h-full w-full rounded-full border-2 border-gray-300 flex items-center justify-center">
                            <p className="text-xs text-gray-400">SEAL</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Request Physical Copy
                  </Button>
                </div>

                <div className="mt-6 border rounded-lg p-4 bg-muted/20">
                  <h3 className="text-lg font-medium mb-2">Certificate Verification</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This certificate can be verified using the following details:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Certificate ID</p>
                      <p className="text-sm text-muted-foreground">KKP-2023-0042-CERT</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Verification URL</p>
                      <p className="text-sm text-primary">https://university.edu/verify-certificate</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Issue Date</p>
                      <p className="text-sm text-muted-foreground">November 15, 2023</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Valid Until</p>
                      <p className="text-sm text-muted-foreground">Permanent</p>
                    </div>
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

