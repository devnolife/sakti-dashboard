"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FileText, MapPin, Users } from "lucide-react"

// Tipe untuk anggota kelompok
interface GroupMember {
  id: number
  name: string
  nim: string
  avatar?: string
}

// Tipe untuk kelompok KKP
interface KkpGroup {
  id: number
  groupName: string
  company: string
  topic: string
  status: string
  progress: string
  members: GroupMember[]
}

export function KkpGuidanceList() {
  // Data kelompok KKP dengan 2-4 anggota per kelompok
  const kkpGroups: KkpGroup[] = [
    {
      id: 1,
      groupName: "Kelompok A",
      company: "PT. Teknologi Maju",
      topic: "Sistem Informasi Manajemen",
      status: "Sedang KKP",
      progress: "Minggu ke-3",
      members: [
        { id: 1, name: "Lina Mariani", nim: "12345688" },
        { id: 2, name: "Maman Suparman", nim: "12345689" },
        { id: 3, name: "Nina Herlina", nim: "12345690" },
      ]
    },
    {
      id: 2,
      groupName: "Kelompok B",
      company: "Dinas Komunikasi dan Informatika",
      topic: "Website E-Government",
      status: "Sedang KKP",
      progress: "Minggu ke-5",
      members: [
        { id: 4, name: "Opik Hidayat", nim: "12345691" },
        { id: 5, name: "Pandu Wijaya", nim: "12345692" },
      ]
    },
    {
      id: 3,
      groupName: "Kelompok C",
      company: "PT. Global Teknologi",
      topic: "Mobile Application Development",
      status: "Selesai",
      progress: "Laporan Final",
      members: [
        { id: 6, name: "Qori Salsabila", nim: "12345693" },
        { id: 7, name: "Rudi Hermawan", nim: "12345694" },
        { id: 8, name: "Siti Nurhaliza", nim: "12345695" },
        { id: 9, name: "Tono Suratno", nim: "12345696" },
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
              <TableHead>Topik</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kkpGroups.map((group) => (
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
                  <span className="text-sm">{group.topic}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={group.status === "Sedang KKP" ? "default" : "secondary"}>
                    {group.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{group.progress}</span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Lihat Laporan</span>
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

