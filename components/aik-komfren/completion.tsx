"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ArrowLeft, ArrowRight, CheckCircle2, Info, Loader2, AlertCircle, BookOpen } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  examDate: z.string().min(1, {
    message: "Please enter the exam date.",
  }),
  examinerName: z.string().min(2, {
    message: "Please enter the examiner's name.",
  }),
  materialsCovered: z.array(z.string()).min(1, {
    message: "Please select at least one material covered.",
  }),
  feedback: z.string().min(10, {
    message: "Feedback must be at least 10 characters.",
  }),
  result: z.enum(["passed", "failed"]),
  certificateNumber: z.string().optional(),
  reflectionEssay: z.string().min(50, {
    message: "Reflection essay must be at least 50 characters.",
  }),
  confirmationChecked: z.boolean().refine((val) => val === true, {
    message: "You must confirm that the information is correct.",
  }),
})

export function AIKKomfrenCompletion() {
  const router = useRouter()
  const [examStatus, setExamStatus] = useState<
    "not_registered" | "registered" | "scheduled" | "completed" | "passed" | "failed"
  >("scheduled")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      examDate: "",
      examinerName: "",
      materialsCovered: [],
      feedback: "",
      result: "passed",
      certificateNumber: "",
      reflectionEssay: "",
      confirmationChecked: false,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setExamStatus(values.result)
      toast({
        title: "Exam Completion Submitted",
        description: "Your AIK Komfren Exam completion information has been submitted successfully.",
      })
      router.push("/dashboard/mahasiswa/aik-komfren")
    }, 2000)
  }

  if (examStatus === "not_registered" || examStatus === "registered") {
    return (
      <div className="space-y-8">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              AIK Komfren Exam Completion
            </span>
          </h1>
          <p className="text-muted-foreground mt-2">Complete your AIK Komfren Examination process</p>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Not Ready for Completion</AlertTitle>
          <AlertDescription>
            {examStatus === "not_registered"
              ? "You have not registered for the AIK Komfren Exam yet. Please complete the registration process first."
              : "Your exam has not been scheduled yet. Please wait for your exam schedule to be assigned."}
          </AlertDescription>
          <div className="mt-4">
            <Button asChild>
              <Link
                href={
                  examStatus === "not_registered"
                    ? "/dashboard/mahasiswa/aik-komfren/registration"
                    : "/dashboard/mahasiswa/aik-komfren/schedule"
                }
              >
                {examStatus === "not_registered" ? "Register Now" : "Check Schedule"}{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Alert>
      </div>
    )
  }

  if (examStatus === "completed" || examStatus === "passed" || examStatus === "failed") {
    return (
      <div className="space-y-8">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              AIK Komfren Exam Completion
            </span>
          </h1>
          <p className="text-muted-foreground mt-2">Your AIK Komfren Examination has been completed</p>
        </div>

        <Alert
          className={
            examStatus === "passed"
              ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900/30 dark:text-green-300"
              : examStatus === "failed"
                ? "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-300"
                : "bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-900/20 dark:border-purple-900/30 dark:text-purple-300"
          }
        >
          {examStatus === "passed" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : examStatus === "failed" ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <Info className="h-4 w-4" />
          )}
          <AlertTitle>
            {examStatus === "passed" ? "Exam Passed" : examStatus === "failed" ? "Exam Failed" : "Exam Completed"}
          </AlertTitle>
          <AlertDescription>
            {examStatus === "passed"
              ? "Congratulations! You have successfully passed the AIK Komfren Exam. Your certificate will be available soon."
              : examStatus === "failed"
                ? "Unfortunately, you did not pass the AIK Komfren Exam. Please contact your academic advisor for guidance on retaking the exam."
                : "Your exam has been completed and is currently being evaluated. Results will be available soon."}
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Exam Details</CardTitle>
            <CardDescription>Information about your completed AIK Komfren Exam</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Exam Date</Label>
                <p className="font-medium">March 15, 2025</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Examiner</Label>
                <p className="font-medium">Dr. Ahmad Fauzi, M.A.</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Result</Label>
                <p className="font-medium">
                  {examStatus === "passed" ? "Passed" : examStatus === "failed" ? "Failed" : "Pending"}
                </p>
              </div>
              {examStatus === "passed" && (
                <div>
                  <Label className="text-muted-foreground">Certificate Number</Label>
                  <p className="font-medium">AIK-2025-12345</p>
                </div>
              )}
            </div>

            <div>
              <Label className="text-muted-foreground">Materials Covered</Label>
              <ul className="mt-1 space-y-1">
                <li className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>Al-Qur'an recitation (Surah Al-Baqarah: 1-10)</span>
                </li>
                <li className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>Basic Islamic principles</span>
                </li>
                <li className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>Islamic ethics and values</span>
                </li>
              </ul>
            </div>

            <div>
              <Label className="text-muted-foreground">Examiner Feedback</Label>
              <p className="mt-1">
                The student demonstrated a good understanding of basic Islamic principles and was able to recite the
                assigned Qur'anic verses with proper tajweed. Some improvement is needed in understanding the historical
                context of Islamic teachings.
              </p>
            </div>

            <div>
              <Label className="text-muted-foreground">Reflection Essay</Label>
              <p className="mt-1">
                This exam has been a valuable experience for me to deepen my understanding of Islamic teachings. I
                realized that there are many aspects of Islam that I still need to learn and practice in my daily life.
                The process of preparing for this exam has helped me to become more disciplined in my studies and more
                committed to implementing Islamic values in my life.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard/mahasiswa/aik-komfren">Back to Dashboard</Link>
            </Button>
            {examStatus === "passed" && (
              <Button asChild>
                <Link href="#">
                  Download Certificate <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            AIK Komfren Exam Completion
          </span>
        </h1>
        <p className="text-muted-foreground mt-2">Complete your AIK Komfren Examination process</p>
      </div>

      <Alert className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-900/30 dark:text-amber-300">
        <Info className="h-4 w-4" />
        <AlertTitle>Exam Completion Form</AlertTitle>
        <AlertDescription>
          Please fill out this form after completing your AIK Komfren Exam. This information will be used to process
          your exam results and generate your certificate if you pass.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Exam Completion Information</CardTitle>
          <CardDescription>Provide details about your completed exam</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="examDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exam Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>The date when you took the exam</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="examinerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Examiner Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the name of your examiner" {...field} />
                      </FormControl>
                      <FormDescription>The name of the lecturer who examined you</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="materialsCovered"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Materials Covered</FormLabel>
                      <FormDescription>Select all materials that were covered in your exam</FormDescription>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        "Al-Qur'an recitation",
                        "Basic Islamic principles",
                        "Islamic ethics and values",
                        "Islamic history",
                        "Islamic jurisprudence (Fiqh)",
                        "Islamic theology (Aqidah)",
                      ].map((item) => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="materialsCovered"
                          render={({ field }) => {
                            return (
                              <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item])
                                        : field.onChange(field.value?.filter((value) => value !== item))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{item}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Examiner Feedback</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the feedback provided by your examiner"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Summarize the feedback given by your examiner</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="result"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Exam Result</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="passed" />
                          </FormControl>
                          <FormLabel className="font-normal">Passed</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="failed" />
                          </FormControl>
                          <FormLabel className="font-normal">Failed</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>Select the result of your exam as communicated by your examiner</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("result") === "passed" && (
                <FormField
                  control={form.control}
                  name="certificateNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificate Number (if provided)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your certificate number if provided" {...field} />
                      </FormControl>
                      <FormDescription>If your examiner provided a certificate number, enter it here</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="reflectionEssay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reflection Essay</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a short reflection on your AIK Komfren Exam experience"
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Write a short reflection (minimum 50 characters) on what you learned from this exam and how it
                      will impact your understanding of Islamic studies
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmationChecked"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I confirm that all the information provided is correct and accurately represents my AIK Komfren
                        Exam experience
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/dashboard/mahasiswa/aik-komfren/schedule">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Schedule
            </Link>
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              <>
                Submit Completion <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

