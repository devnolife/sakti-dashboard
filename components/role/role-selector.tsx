"use client"

import { useRouter } from "next/navigation"
import { useRole } from "@/context/role-context"
import { getRoleDisplayName, getRolePath, type Role } from "@/types/role"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Check, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function RoleSelector() {
  const { role, setRole } = useRole()
  const router = useRouter()

  // Update the roles array to include laboratory_admin
  const roles: Role[] = [
    "mahasiswa",
    "staff_tu",
    "prodi",
    "dekan",
    "admin",
    "lecturer",
    "laboratory_admin",
  ]

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole)
    router.push(getRolePath(newRole))
  }

  // Update the getRoleColor function to include laboratory_admin
  const getRoleColor = (roleType: Role) => {
    const colors: Record<Role, string> = {
      mahasiswa: "bg-blue-100 text-blue-800",
      staff_tu: "bg-green-100 text-green-800",
      prodi: "bg-purple-100 text-purple-800",
      dekan: "bg-amber-100 text-amber-800",
      admin: "bg-red-100 text-red-800",
      lecturer: "bg-indigo-100 text-indigo-800",
      laboratory_admin: "bg-cyan-100 text-cyan-800",
    }
    return colors[roleType]
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(role)}`}>
            {getRoleDisplayName(role)}
          </span>
          <ChevronDown className="w-4 h-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {roles.map((roleOption) => (
          <DropdownMenuItem
            key={roleOption}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleRoleChange(roleOption)}
          >
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${getRoleColor(roleOption).split(" ")[1]}`}></span>
              <span>{getRoleDisplayName(roleOption)}</span>
            </div>
            {role === roleOption && (
              <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
                <Check className="w-3 h-3 mr-1" />
                Active
              </Badge>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

