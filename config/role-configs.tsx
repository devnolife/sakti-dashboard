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
  School,
  Shield
} from "lucide-react"

// Icon mapping for string-based resolution
export const iconMap = {
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
  School,
  Shield
} as const

export type IconName = keyof typeof iconMap

interface RoleConfig {
  headerConfig: {
    title: string
    subtitle: string
    iconName: IconName
  }
  user: {
    name: string
    email: string
    avatar: string
  }
}

export const roleConfigs: Record<string, RoleConfig> = {
  admin: {
    headerConfig: {
      title: "Administrator",
      subtitle: "System Management",
      iconName: "Shield"
    },
    user: {
      name: "Administrator",
      email: "admin@university.edu",
      avatar: ""
    }
  },
  admin_umum: {
    headerConfig: {
      title: "Admin Umum",
      subtitle: "Management System",
      iconName: "Building2"
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
      iconName: "GraduationCap"
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
      iconName: "ClipboardList"
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
      iconName: "UserCheck"
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
      iconName: "BookOpen"
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
      iconName: "DollarSign"
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
      iconName: "Users"
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
      iconName: "School"
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
      iconName: "Users"
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
      iconName: "FlaskConical"
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
      iconName: "BookMarked"
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
      iconName: "Archive"
    },
    user: {
      name: "SIMAK Admin",
      email: "simak@university.edu",
      avatar: ""
    }
  }
}
