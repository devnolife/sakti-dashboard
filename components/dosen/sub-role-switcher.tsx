"use client"

import { useState } from "react"
import { Check, ChevronDown, UserCog } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useDosenSubRole } from "@/context/dosen-subrole-context"
import { dosenSubRoleConfigs, type DosenSubRole } from "@/types/role"

export default function SubRoleSwitcher() {
  const { currentSubRole, setCurrentSubRole, availableSubRoles } = useDosenSubRole()
  const [open, setOpen] = useState(false)

  const currentConfig = dosenSubRoleConfigs[currentSubRole]

  const handleSubRoleChange = (subRole: DosenSubRole) => {
    setCurrentSubRole(subRole)
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 h-10 px-3 border border-border/50 hover:border-border bg-background/80 backdrop-blur-sm"
        >
          <UserCog className="h-4 w-4" />
          <div className="flex flex-col items-start">
            <span className="text-xs font-medium">{currentConfig.displayName}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-2">
          <p className="text-sm font-medium mb-2">Pilih Sub Role</p>
          <div className="space-y-1">
            {availableSubRoles.map((subRole) => {
              const config = dosenSubRoleConfigs[subRole]
              const isSelected = currentSubRole === subRole
              
              return (
                <DropdownMenuItem
                  key={subRole}
                  onClick={() => handleSubRoleChange(subRole)}
                  className="flex items-center gap-3 p-3 cursor-pointer"
                >
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", config.bgColor)}>
                    <UserCog className={cn("h-4 w-4", config.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{config.displayName}</span>
                      {isSelected && (
                        <Badge variant="secondary" className="text-xs">
                          Aktif
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {config.description}
                    </p>
                  </div>
                  {isSelected && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </DropdownMenuItem>
              )
            })}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}