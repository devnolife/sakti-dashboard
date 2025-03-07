import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle } from "lucide-react"

// Sample data for lab registration history
const registrationHistory = [
  {
    id: "reg-1",
    labTitle: "Computer Networks Laboratory",
    registrationDate: "August 15, 2023",
    status: "active",
    paymentAmount: 150000,
    paymentMethod: "Credit Card",
    transactionId: "TRX-123456",
  },
  {
    id: "reg-2",
    labTitle: "Database Systems Laboratory",
    registrationDate: "August 16, 2023",
    status: "active",
    paymentAmount: 150000,
    paymentMethod: "Bank Transfer",
    transactionId: "TRX-123457",
  },
  {
    id: "reg-3",
    labTitle: "Web Development Laboratory",
    registrationDate: "May 10, 2023",
    status: "completed",
    paymentAmount: 150000,
    paymentMethod: "E-Wallet",
    transactionId: "TRX-112233",
    completionDate: "September 30, 2023",
  },
  {
    id: "reg-4",
    labTitle: "Mobile App Development Laboratory",
    registrationDate: "April 5, 2023",
    status: "cancelled",
    paymentAmount: 150000,
    paymentMethod: "Credit Card",
    transactionId: "TRX-998877",
    cancellationDate: "April 8, 2023",
    refundStatus: "Refunded",
  },
]

export function LabRegistrationHistory() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden gradient-border">
        <CardHeader>
          <CardTitle>Registration History</CardTitle>
          <CardDescription>View your laboratory registration history and payment details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {registrationHistory.map((registration) => (
              <Card key={registration.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{registration.labTitle}</CardTitle>
                    <Badge
                      variant={
                        registration.status === "active"
                          ? "default"
                          : registration.status === "completed"
                            ? "success"
                            : "destructive"
                      }
                    >
                      {registration.status === "active"
                        ? "Active"
                        : registration.status === "completed"
                          ? "Completed"
                          : "Cancelled"}
                    </Badge>
                  </div>
                  <CardDescription>Registered on {registration.registrationDate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Payment Details</p>
                        <div className="text-sm mt-1">
                          <p>Amount: {formatCurrency(registration.paymentAmount)}</p>
                          <p>Method: {registration.paymentMethod}</p>
                          <p>Transaction ID: {registration.transactionId}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Status Information</p>
                        <div className="text-sm mt-1">
                          {registration.status === "active" && (
                            <div className="flex items-center text-green-600">
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              <span>Currently active</span>
                            </div>
                          )}
                          {registration.status === "completed" && (
                            <div>
                              <div className="flex items-center text-green-600">
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                <span>Completed on {registration.completionDate}</span>
                              </div>
                            </div>
                          )}
                          {registration.status === "cancelled" && (
                            <div>
                              <div className="flex items-center text-red-600">
                                <XCircle className="h-4 w-4 mr-1" />
                                <span>Cancelled on {registration.cancellationDate}</span>
                              </div>
                              <p>Refund Status: {registration.refundStatus}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

