"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Calendar, Users, Award, AlertCircle } from "lucide-react"
import { PaymentDialog } from "@/components/laboratory/payment-dialog"

interface LabRegistrationDialogProps {
  lab: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LabRegistrationDialog({ lab, open, onOpenChange }: LabRegistrationDialogProps) {
  const [step, setStep] = useState<"details" | "confirmation">("details")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)

  const handleContinue = () => {
    setStep("confirmation")
  }

  const handleBack = () => {
    setStep("details")
  }

  const handleRegister = () => {
    setIsPaymentOpen(true)
    onOpenChange(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          {step === "details" ? (
            <>
              <DialogHeader>
                <DialogTitle>Laboratory Registration</DialogTitle>
                <DialogDescription>
                  Review the laboratory details before proceeding with registration.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="relative h-48 w-full rounded-md overflow-hidden">
                  <Image src={lab.image || "/placeholder.svg"} alt={lab.title} fill className="object-cover" />
                </div>
                <h3 className="text-lg font-bold">{lab.title}</h3>
                <p className="text-sm">{lab.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{lab.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        {lab.enrolled} / {lab.capacity} students
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{lab.credits} credits</span>
                    </div>
                    <div className="flex items-center text-sm font-medium">
                      <span>Instructor: {lab.instructor}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-2 pt-4">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the laboratory terms and conditions
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      By checking this box, you agree to attend all laboratory sessions and follow safety protocols.
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button onClick={handleContinue} disabled={!agreedToTerms}>
                  Continue
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Confirm Registration</DialogTitle>
                <DialogDescription>Please review your registration details before proceeding.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="rounded-md border p-4 bg-muted/50">
                  <h4 className="font-medium mb-2">{lab.title}</h4>
                  <div className="space-y-1 text-sm">
                    <p>Schedule: {lab.schedule}</p>
                    <p>Instructor: {lab.instructor}</p>
                    <p>Credits: {lab.credits}</p>
                  </div>
                </div>
                <div className="rounded-md border p-4 bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Important Information</p>
                      <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                        <li>Registration fee: Rp 150,000</li>
                        <li>You will be redirected to the payment page after confirmation</li>
                        <li>Registration can be canceled up to 3 days before the lab starts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleRegister}>Proceed to Payment</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <PaymentDialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen} lab={lab} amount={150000} />
    </>
  )
}

