"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Award, BookOpen, Users, MapPin } from "lucide-react"

// Tipe untuk anggota kelompok
interface GroupMember {
  id: number
  name: string
  nim: string
  avatar?: string
}

// Tipe untuk kelompok KKP Plus
interface KkpPlusGroup {
  id: number
  groupName: string
  company: string
  program: string
  status: string
  certification: string
  members: GroupMember[]
}

export function KkpPlusGuidanceList() {
  // Data kelompok KKP Plus dengan 2-4 anggota per kelompok
  const kkpPlusGroups: KkpPlusGroup[] = [
    {
      id: 1,
      groupName: "Kelompok Alpha",
      company: "PT. Digital Innovation",
      program: "Full Stack Web Development",
      status: "Aktif",
      certification: "Menunggu Ujian",
      members: [
        { id: 1, name: "Putri Rahayu", nim: "12345692" },
        { id: 2, name: "Qori Ananda", nim: "12345693" },
      ]
    },
    {
      id: 2,
      groupName: "Kelompok Beta",
      company: "PT. Mobile Solutions",
      program: "Mobile App Development",
      status: "Aktif",
      certification: "Sedang Ujian",
      members: [
        { id: 3, name: "Rudi Hartono", nim: "12345694" },
        { id: 4, name: "Sari Indah", nim: "12345695" },
        { id: 5, name: "Toni Kurniawan", nim: "12345696" },
      ]
    },
    {
      id: 3,
      groupName: "Kelompok Gamma",
      company: "PT. Creative Studio",
      program: "UI/UX Design & Frontend",
      status: "Selesai",
      certification: "Lulus",
      members: [
        { id: 6, name: "Uci Permata", nim: "12345697" },
        { id: 7, name: "Vino Alamsyah", nim: "12345698" },
        { id: 8, name: "Winda Sari", nim: "12345699" },
        { id: 9, name: "Yoga Pratama", nim: "12345700" },
      ]
    },
  ]

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kelompok</TableHead>
              <TableHead>Anggota</TableHead>
              <TableHead>Perusahaan</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sertifikasi</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kkpPlusGroups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{group.groupName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center -space-x-2 cursor-pointer">
                          {group.members.slice(0, 4).map((member, index) => (
                            <Avatar
                              key={member.id}
                              className="h-8 w-8 border-2 border-background hover:z-10 transition-transform hover:scale-110"
                            >
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback className="text-xs">
                                {member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {group.members.length > 4 && (
                            <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                              +{group.members.length - 4}
                            </div>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-xs">
                        <div className="space-y-2">
                          <p className="font-semibold text-sm">Anggota Kelompok:</p>
                          <ul className="space-y-1">
                            {group.members.map((member) => (
                              <li key={member.id} className="text-xs">
                                <span className="font-medium">{member.name}</span>
                                <span className="text-muted-foreground"> - {member.nim}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{group.company}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{group.program}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={group.status === "Aktif" ? "default" : "secondary"}>
                    {group.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      group.certification === "Lulus"
                        ? "default"
                        : group.certification === "Menunggu Ujian"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {group.certification}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <BookOpen className="h-4 w-4" />
                      <span className="sr-only">Materi</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Award className="h-4 w-4" />
                      <span className="sr-only">Sertifikasi</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

