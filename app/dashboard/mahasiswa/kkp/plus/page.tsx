import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Award, BookOpen, GraduationCap, Briefcase, Calendar, Users, ArrowRight } from "lucide-react"

export default function KkpPlusPage() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden gradient-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <span>About KKP Plus</span>
          </CardTitle>
          <CardDescription>
            Expand your skills and boost your career prospects with our KKP Plus program
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The KKP Plus program is designed to complement your internship experience with additional learning
            opportunities, industry-recognized certifications, and career development resources. By participating in KKP
            Plus, you'll gain valuable skills and credentials that will set you apart in the job market after
            graduation.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Workshops & Training</CardTitle>
                    <CardDescription>Enhance your skills</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Participate in specialized workshops and training sessions led by industry experts to develop
                  practical skills relevant to your field.
                </p>
                <div className="flex justify-end">
                  <Button size="sm" asChild>
                    <Link href="/dashboard/mahasiswa/kkp/plus/workshops">
                      Explore Workshops
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Certifications</CardTitle>
                    <CardDescription>Earn industry credentials</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Earn industry-recognized certifications that validate your skills and knowledge, making you more
                  competitive in the job market.
                </p>
                <div className="flex justify-end">
                  <Button size="sm" asChild>
                    <Link href="/dashboard/mahasiswa/kkp/plus/certifications">
                      View Certifications
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Learning Resources</CardTitle>
                    <CardDescription>Access curated materials</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Access a library of curated learning materials, guides, and resources to support your internship and
                  professional development.
                </p>
                <div className="flex justify-end">
                  <Button size="sm" asChild>
                    <Link href="/dashboard/mahasiswa/kkp/plus/resources">
                      Browse Resources
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Upcoming KKP Plus Events</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Technical Interview Workshop</h4>
                    <Badge className="bg-green-500/10 text-green-500">Registration Open</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Learn how to ace technical interviews with practical tips and mock interview sessions.
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>September 20, 2023</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>25 spots available</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <Award className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">AWS Cloud Practitioner Certification Prep</h4>
                    <Badge className="bg-amber-500/10 text-amber-500">Coming Soon</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Prepare for the AWS Cloud Practitioner certification with our comprehensive training program.
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>October 5-15, 2023</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>Online & In-person</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

