"use client"

import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CheckCircle, Clock, Shield } from "lucide-react"

interface SignatureStatusBadgeProps {
  isSigned: boolean
  signedAt?: string | null
  signedBy?: string | null
  verificationCount?: number
}

export function SignatureStatusBadge({
  isSigned,
  signedAt,
  signedBy,
  verificationCount = 0,
}: SignatureStatusBadgeProps) {
  if (!isSigned) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" />
              Belum Ditandatangani
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Dokumen belum memiliki tanda tangan digital</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant="default" className="gap-1 bg-green-600 hover:bg-green-700">
            <Shield className="h-3 w-3" />
            Ditandatangani
            {verificationCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded text-xs">
                {verificationCount}×
              </span>
            )}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="flex items-center gap-2 font-medium">
              <CheckCircle className="h-3 w-3" />
              Dokumen Tersertifikasi Digital
            </p>
            {signedBy && (
              <p className="text-xs">
                <span className="text-muted-foreground">Oleh:</span> {signedBy}
              </p>
            )}
            {signedAt && (
              <p className="text-xs">
                <span className="text-muted-foreground">Pada:</span>{" "}
                {new Date(signedAt).toLocaleString("id-ID")}
              </p>
            )}
            {verificationCount > 0 && (
              <p className="text-xs text-muted-foreground">
                Diverifikasi {verificationCount} kali
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
