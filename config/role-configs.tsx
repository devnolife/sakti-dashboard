import {
  Building2,
  GraduationCap,
  BookOpen,
  Users,
  DollarSign,
  ClipboardList,
  UserCheck,
  FlaskConical,
  BookMarked,
  Microscope,
  Archive,
  School
} from "lucide-react"

interface RoleConfig {
  headerConfig: {
    title: string
    subtitle: string
    icon: React.ComponentType<{ className?: string }>
  }
  user: {
    name: string
    email: string
    avatar: string
  }
}

export const roleConfigs: Record<string, RoleConfig> = {
  admin_umum: {
    headerConfig: {
      title: "Admin Umum",
      subtitle: "Management System",
      icon: Building2
    },
    user: {
      name: "Admin Umum",
      email: "admin.umum@university.edu",
      avatar: ""
    }
  },
  dosen: {
    headerConfig: {
      title: "Dosen",
      subtitle: "Academic Portal",
      icon: GraduationCap
    },
    user: {
      name: "Dr. Dosen",
      email: "dosen@university.edu",
      avatar: ""
    }
  },
  staff_tu: {
    headerConfig: {
      title: "Staff TU",
      subtitle: "Administrative Portal",
      icon: ClipboardList
    },
    user: {
      name: "Staff TU",
      email: "staff.tu@university.edu",
      avatar: ""
    }
  },
  dekan: {
    headerConfig: {
      title: "Dekan",
      subtitle: "Faculty Management",
      icon: UserCheck
    },
    user: {
      name: "Prof. Dekan",
      email: "dekan@university.edu",
      avatar: ""
    }
  },
  mahasiswa: {
    headerConfig: {
      title: "Mahasiswa",
      subtitle: "Student Portal",
      icon: BookOpen
    },
    user: {
      name: "Mahasiswa",
      email: "mahasiswa@university.edu",
      avatar: ""
    }
  },
  admin_keuangan: {
    headerConfig: {
      title: "Admin Keuangan",
      subtitle: "Finance Management",
      icon: DollarSign
    },
    user: {
      name: "Admin Keuangan",
      email: "admin.keuangan@university.edu",
      avatar: ""
    }
  },
  kepala_tata_usaha: {
    headerConfig: {
      title: "Kepala Tata Usaha",
      subtitle: "Administration Head",
      icon: Users
    },
    user: {
      name: "Kepala TU",
      email: "kepala.tu@university.edu",
      avatar: ""
    }
  },
  prodi: {
    headerConfig: {
      title: "Program Studi",
      subtitle: "Academic Management",
      icon: School
    },
    user: {
      name: "Koordinator Prodi",
      email: "prodi@university.edu",
      avatar: ""
    }
  },
  gkm: {
    headerConfig: {
      title: "GKM",
      subtitle: "Student Affairs",
      icon: Users
    },
    user: {
      name: "Staff GKM",
      email: "gkm@university.edu",
      avatar: ""
    }
  },
  laboratory_admin: {
    headerConfig: {
      title: "Laboratory Admin",
      subtitle: "Lab Management",
      icon: FlaskConical
    },
    user: {
      name: "Lab Admin",
      email: "lab.admin@university.edu",
      avatar: ""
    }
  },
  reading_room_admin: {
    headerConfig: {
      title: "Reading Room Admin",
      subtitle: "Library Management",
      icon: BookMarked
    },
    user: {
      name: "Reading Room Admin",
      email: "reading.room@university.edu",
      avatar: ""
    }
  },
  simak: {
    headerConfig: {
      title: "SIMAK",
      subtitle: "Academic Information System",
      icon: Archive
    },
    user: {
      name: "SIMAK Admin",
      email: "simak@university.edu",
      avatar: ""
    }
  }
}
