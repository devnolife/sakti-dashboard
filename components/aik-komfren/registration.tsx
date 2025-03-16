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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ArrowLeft, ArrowRight, Check, CreditCard, Info, Loader2, Wallet, Building } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  nim: z.string().min(5, {
    message: "NIM must be at least 5 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  semester: z.string().min(1, {
    message: "Please select your current semester.",
  }),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  notes: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
})

export function AIKKomfrenRegistration() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<string>("virtual_account")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nim: "",
      email: "",
      phone: "",
      semester: "",
      preferredDate: "",
      preferredTime: "",
      notes: "",
      termsAccepted: false,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setIsRegistered(true)
      toast({
        title: "Registration Successful",
        description: "Your AIK Komfren Exam registration has been submitted successfully.",
      })
    }, 2000)
  }

  const handlePayment = () => {
    setIsSubmitting(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/dashboard/mahasiswa/aik-komfren/schedule")
    }, 2000)
  }

  if (isRegistered) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Payment for AIK Komfren Exam
            </span>
          </h1>
          <p className="text-muted-foreground mt-2">Complete your payment to finalize your registration</p>
        </div>

        <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900/30 dark:text-green-300">
          <Check className="h-4 w-4" />
          <AlertTitle>Registration Submitted</AlertTitle>
          <AlertDescription>
            Your registration information has been submitted successfully. Please complete the payment to finalize your
            registration.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>Please select a payment method and complete the payment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border p-4 bg-muted/50">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-medium">AIK Komfren Exam Fee</h3>
                  <p className="text-sm text-muted-foreground">Consumption and administration fee</p>
                </div>
                <div className="text-xl font-bold">Rp 50,000</div>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-center mt-4">
                <div className="font-medium">Total Payment</div>
                <div className="text-xl font-bold text-primary">Rp 50,000</div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Select Payment Method</Label>
              <RadioGroup
                defaultValue="virtual_account"
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem value="virtual_account" id="virtual_account" className="peer sr-only" />
                  <Label
                    htmlFor="virtual_account"
                    className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all hover:shadow-md"
                  >
                    <CreditCard className="mb-3 h-8 w-8" />
                    <span className="font-medium text-lg mb-1">Virtual Account</span>
                    <span className="text-sm text-center text-muted-foreground">
                      Transfer via ATM, mobile banking, or internet banking
                    </span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="e_wallet" id="e_wallet" className="peer sr-only" />
                  <Label
                    htmlFor="e_wallet"
                    className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all hover:shadow-md"
                  >
                    <Wallet className="mb-3 h-8 w-8" />
                    <span className="font-medium text-lg mb-1">E-Wallet</span>
                    <span className="text-sm text-center text-muted-foreground">
                      Pay with GoPay, OVO, DANA, LinkAja, or ShopeePay
                    </span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="bank_teller" id="bank_teller" className="peer sr-only" />
                  <Label
                    htmlFor="bank_teller"
                    className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all hover:shadow-md"
                  >
                    <Building className="mb-3 h-8 w-8" />
                    <span className="font-medium text-lg mb-1">Teller Bank</span>
                    <span className="text-sm text-center text-muted-foreground">
                      Pay directly at the nearest bank branch
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 text-sm">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Important:</p>
                  <p>
                    Please complete the payment within 24 hours. Your registration will be automatically canceled if
                    payment is not received within this timeframe.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsRegistered(false)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Registration
            </Button>
            <Button onClick={handlePayment} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  Pay Now <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
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
            AIK Komfren Exam Registration
          </span>
        </h1>
        <p className="text-muted-foreground mt-2">Register for your AIK Komfren Examination</p>
      </div>

      <div className="mb-8">
        <div className="relative">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
            >
              1
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
            >
              2
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? "bg-primary" : "bg-gray-200"}`}></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
            >
              3
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <div className={`text-center w-20 ${step >= 1 ? "text-primary font-medium" : "text-gray-500"}`}>
              Personal Info
            </div>
            <div className={`text-center w-20 ${step >= 2 ? "text-primary font-medium" : "text-gray-500"}`}>
              Preferences
            </div>
            <div className={`text-center w-20 ${step >= 3 ? "text-primary font-medium" : "text-gray-500"}`}>
              Confirmation
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 ? "Personal Information" : step === 2 ? "Exam Preferences" : "Review and Confirm Registration"}
          </CardTitle>
          <CardDescription>
            {step === 1
              ? "Please provide your personal details for registration"
              : step === 2
                ? "Select your preferred exam date and time"
                : "Review your information before submitting"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nim"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student ID (NIM)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your NIM" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="semester"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Semester</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your current semester" {...field} />
                        </FormControl>
                        <FormDescription>
                          You must be at least in semester 4 to register for the AIK Komfren Exam
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Exam Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>
                          Select your preferred date for the exam (subject to availability)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Time Slot</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (08:00 - 12:00)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (13:00 - 16:00)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Select your preferred time slot (subject to availability)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Any additional information or special requests" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="rounded-lg border p-4 space-y-4">
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="text-sm font-medium">Full Name</p>
                          <p className="text-sm">{form.getValues("name") || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Student ID (NIM)</p>
                          <p className="text-sm">{form.getValues("nim") || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm">{form.getValues("email") || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Phone Number</p>
                          <p className="text-sm">{form.getValues("phone") || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Current Semester</p>
                          <p className="text-sm">{form.getValues("semester") || "Not provided"}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">Exam Preferences</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="text-sm font-medium">Preferred Date</p>
                          <p className="text-sm">
                            {form.getValues("preferredDate")
                              ? new Date(form.getValues("preferredDate")).toLocaleDateString()
                              : "No preference"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Preferred Time</p>
                          <p className="text-sm">
                            {form.getValues("preferredTime") === "morning"
                              ? "Morning (08:00 - 12:00)"
                              : form.getValues("preferredTime") === "afternoon"
                                ? "Afternoon (13:00 - 16:00)"
                                : "No preference"}
                          </p>
                        </div>
                      </div>
                      {form.getValues("notes") && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Additional Notes</p>
                          <p className="text-sm">{form.getValues("notes")}</p>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">Payment Information</h3>
                      <div className="mt-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm">AIK Komfren Exam Fee (Consumption & Administration)</p>
                          <p className="text-sm font-medium">Rp 50,000</p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-sm font-medium">Total</p>
                          <p className="text-sm font-bold">Rp 50,000</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 text-sm">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Important:</p>
                        <p>
                          By submitting this registration, you agree to proceed with the payment of Rp 50,000 for the
                          AIK Komfren Exam fee. After registration, you will be directed to the payment page.
                        </p>
                      </div>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I confirm that all the information provided is correct and I agree to the terms and
                            conditions
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/dashboard/mahasiswa/aik-komfren">
                <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
              </Link>
            </Button>
          )}

          {step < 3 ? (
            <Button
              onClick={() => {
                if (step === 1) {
                  const { name, nim, email, phone, semester } = form.getValues()
                  if (!name || !nim || !email || !phone || !semester) {
                    form.trigger(["name", "nim", "email", "phone", "semester"])
                    return
                  }
                }
                setStep(step + 1)
              }}
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  Submit Registration <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

// Add missing components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

