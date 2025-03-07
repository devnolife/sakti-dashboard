"use client"

import { DialogFooter } from "@/components/ui/dialog"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Wallet, Building, CheckCircle2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface PaymentDialogProps {
  lab: any
  amount: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PaymentDialog({ lab, amount, open, onOpenChange }: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const handlePayment = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)

      toast({
        title: "Payment Successful",
        description: `You have successfully registered for ${lab.title}`,
      })
    }, 2000)
  }

  const handleClose = () => {
    if (isComplete) {
      // Reset state for next time
      setIsComplete(false)
      setPaymentMethod("credit-card")
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        {!isComplete ? (
          <>
            <DialogHeader>
              <DialogTitle>Payment</DialogTitle>
              <DialogDescription>Complete your payment to finalize laboratory registration.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="rounded-md border p-4 bg-muted/50">
                <h4 className="font-medium">Payment Summary</h4>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Laboratory Registration Fee</span>
                    <span>{formatCurrency(amount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Administrative Fee</span>
                    <span>{formatCurrency(2500)}</span>
                  </div>
                  <div className="border-t my-2"></div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatCurrency(amount + 2500)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Select Payment Method</h4>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <Card className={`cursor-pointer ${paymentMethod === "credit-card" ? "border-primary" : ""}`}>
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="flex items-center cursor-pointer">
                          <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Credit/Debit Card</span>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className={`cursor-pointer ${paymentMethod === "e-wallet" ? "border-primary" : ""}`}>
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="e-wallet" id="e-wallet" />
                        <Label htmlFor="e-wallet" className="flex items-center cursor-pointer">
                          <Wallet className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>E-Wallet</span>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className={`cursor-pointer ${paymentMethod === "bank-transfer" ? "border-primary" : ""}`}>
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                        <Label htmlFor="bank-transfer" className="flex items-center cursor-pointer">
                          <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Bank Transfer</span>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </RadioGroup>
              </div>

              {paymentMethod === "credit-card" && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="name">Cardholder Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                </div>
              )}

              {paymentMethod === "e-wallet" && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="081234567890" />
                  </div>
                </div>
              )}

              {paymentMethod === "bank-transfer" && (
                <div className="space-y-3">
                  <div className="rounded-md border p-4 bg-muted/50">
                    <h4 className="font-medium mb-2">Bank Transfer Instructions</h4>
                    <p className="text-sm text-muted-foreground">
                      After clicking "Pay Now", you will receive transfer instructions to your email.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handlePayment} disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Pay Now"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-muted-foreground mb-6">Your registration for {lab.title} has been confirmed.</p>
              <div className="rounded-md border p-4 bg-muted/50 w-full text-left mb-6">
                <h4 className="font-medium mb-2">Registration Details</h4>
                <div className="space-y-1 text-sm">
                  <p>Laboratory: {lab.title}</p>
                  <p>Schedule: {lab.schedule}</p>
                  <p>Instructor: {lab.instructor}</p>
                  <p>Payment Amount: {formatCurrency(amount + 2500)}</p>
                  <p>
                    Payment Method:{" "}
                    {paymentMethod === "credit-card"
                      ? "Credit/Debit Card"
                      : paymentMethod === "e-wallet"
                        ? "E-Wallet"
                        : "Bank Transfer"}
                  </p>
                  <p>Transaction ID: INV-{Math.floor(Math.random() * 1000000)}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                A confirmation email has been sent to your registered email address.
              </p>
              <Button onClick={handleClose} className="w-full">
                Go to My Labs
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

