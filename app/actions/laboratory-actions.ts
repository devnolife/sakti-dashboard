'use server'

import { prisma } from '@/lib/prisma'
import { getServerActionUserId } from '@/lib/auth-utils'

// Get laboratory data for student dashboard
export async function getLaboratoryData() {
  const user_id = await getServerActionUserId()

  try {
    // Get student profile
    const student = await prisma.students.findUnique({
      where: { user_id },
      select: { id: true }
    })

    if (!student) {
      throw new Error('Student profile not found')
    }

    // Get available laboratories
    const availableLabs = await prisma.laboratory.findMany({
      where: { status: 'active' },
      include: {
        instructor: {
          include: {
            user: true
          }
        },
        registrations: {
          where: { student_id: student.id },
          select: { id: true, status: true }
        },
        _count: {
          select: {
            registrations: true,
            sessions: true,
            assignments: true
          }
        }
      },
      orderBy: { code: 'asc' }
    })

    // Get student's lab registrations
    const myRegistrations = await prisma.labRegistration.findMany({
      where: { student_id: student.id },
      include: {
        laboratory: {
          include: {
            instructor: {
              include: {
                user: true
              }
            }
          }
        },
        assignments: {
          include: {
            assignment: true
          }
        }
      },
      orderBy: { registeredAt: 'desc' }
    })

    // Get completed labs
    const completedLabs = myRegistrations.filter(reg => reg.status === 'completed')

    // Get registration history
    const registrationHistory = myRegistrations

    return {
      availableLabs: availableLabs.map(lab => ({
        id: lab.id,
        code: lab.code,
        title: lab.name,
        description: lab.description,
        image: lab.image || '/placeholder.svg?height=200&width=400',
        instructor: lab.instructor?.user?.name || 'TBA',
        instructorImage: lab.instructor?.user?.avatar || '/placeholder.svg?height=100&width=100',
        schedule: 'Lihat jadwal', // Will be populated from sessions
        capacity: lab.capacity,
        enrolled: lab._count.registrations,
        credits: lab.credits,
        tags: [lab.category, lab.department], // Simplified tags
        status: lab.registrations.length > 0 ? 
          (lab.registrations[0].status === 'completed' ? 'selesai' :
           lab.registrations[0].status === 'approved' ? 'terdaftar' :
           lab.registrations[0].status === 'pending' ? 'menunggu' : 'tersedia') : 
          (lab._count.registrations >= lab.capacity ? 'penuh' : 'tersedia'),
        semester: lab.semester,
        category: lab.category,
        location: lab.location,
        color: getLabColor(lab.category),
        isRegistered: lab.registrations.length > 0
      })),
      myLabs: myRegistrations
        .filter(reg => ['approved', 'pending'].includes(reg.status))
        .map(reg => ({
          id: reg.id,
          labId: reg.laboratory.id,
          title: reg.laboratory.name,
          code: reg.laboratory.code,
          instructor: reg.laboratory.instructor?.user?.name || 'TBA',
          progress: reg.progress,
          status: reg.status,
          registeredAt: reg.registeredAt,
          totalAssignments: reg.assignments.length,
          completedAssignments: reg.assignments.filter(a => a.score !== null).length,
          nextDeadline: reg.assignments
            .filter(a => a.score === null)
            .sort((a, b) => new Date(a.assignment.dueDate).getTime() - new Date(b.assignment.dueDate).getTime())[0]?.assignment.dueDate
        })),
      completedLabs: completedLabs.map(reg => ({
        id: reg.id,
        labId: reg.laboratory.id,
        title: reg.laboratory.name,
        code: reg.laboratory.code,
        instructor: reg.laboratory.instructor?.user?.name || 'TBA',
        progress: reg.progress,
        grade: reg.grade,
        completedAt: reg.completedAt,
        totalAssignments: reg.assignments.length,
        averageScore: reg.assignments.length > 0 ? 
          reg.assignments.reduce((sum, a) => sum + (a.score || 0), 0) / reg.assignments.length : 0
      })),
      registrationHistory: registrationHistory.map(reg => ({
        id: reg.id,
        labId: reg.laboratory.id,
        title: reg.laboratory.name,
        code: reg.laboratory.code,
        instructor: reg.laboratory.instructor?.user?.name || 'TBA',
        status: reg.status,
        registeredAt: reg.registeredAt,
        completedAt: reg.completedAt,
        progress: reg.progress,
        grade: reg.grade
      }))
    }

  } catch (error) {
    console.error('Error fetching laboratory data:', error)
    throw error
  }
}

// Register for a laboratory
export async function registerLaboratory(laboratoryId: string) {
  try {
    const user_id = await getServerActionUserId()
    // Ambil student berdasarkan user_id (bukan langsung student_id karena sebelumnya hardcoded mengacu pada user_id mahasiswa)
    const student = await prisma.students.findUnique({ where: { user_id }, select: { id: true } })
    if (!student) throw new Error('Student profile not found')

    // Check if already registered
    const existingRegistration = await prisma.labRegistration.findUnique({
      where: {
        studentId_laboratoryId: {
          student_id: student.id,
          laboratoryId: laboratoryId
        }
      }
    })

    if (existingRegistration) {
      throw new Error('Already registered for this laboratory')
    }

    // Check laboratory capacity
    const lab = await prisma.laboratory.findUnique({
      where: { id: laboratoryId },
      include: {
        _count: {
          select: { registrations: true }
        }
      }
    })

    if (!lab) {
      throw new Error('Laboratory not found')
    }

    if (lab._count.registrations >= lab.capacity) {
      throw new Error('Laboratory is full')
    }

    // Create registration
    const registration = await prisma.labRegistration.create({
      data: {
        student_id: student.id,
        laboratoryId: laboratoryId,
        status: 'pending'
      }
    })

    return { success: true, registrationId: registration.id }

  } catch (error) {
    console.error('Error registering for laboratory:', error)
    throw error
  }
}

// Get laboratory sessions
export async function getLabSessions(laboratoryId: string) {
  try {
    const sessions = await prisma.labSession.findMany({
      where: { laboratoryId },
      orderBy: { sessionDate: 'asc' }
    })

    return sessions
  } catch (error) {
    console.error('Error fetching lab sessions:', error)
    throw error
  }
}

// Get laboratory assignments
export async function getLabAssignments(laboratoryId: string) {
  try {
    const user_id = await getServerActionUserId()
    const studentRecord = await prisma.students.findUnique({ where: { user_id }, select: { id: true } })
    if (!studentRecord) throw new Error('Student profile not found')
    
    const student = studentRecord

    const assignments = await prisma.labAssignment.findMany({
      where: { laboratoryId },
      include: {
        submissions: {
          where: { student_id: student.id },
          select: {
            id: true,
            score: true,
            feedback: true,
            submittedAt: true,
            fileUrl: true
          }
        }
      },
      orderBy: { dueDate: 'asc' }
    })

    return assignments.map(assignment => ({
      ...assignment,
      submission: assignment.submissions[0] || null
    }))
  } catch (error) {
    console.error('Error fetching lab assignments:', error)
    throw error
  }
}

// Get laboratory materials
export async function getLabMaterials(laboratoryId: string) {
  try {
    const materials = await prisma.labMaterial.findMany({
      where: { laboratoryId },
      orderBy: { created_at: 'desc' }
    })

    return materials
  } catch (error) {
    console.error('Error fetching lab materials:', error)
    throw error
  }
}

// Get laboratory announcements
export async function getLabAnnouncements(laboratoryId: string) {
  try {
    const announcements = await prisma.labAnnouncement.findMany({
      where: { laboratoryId },
      orderBy: { created_at: 'desc' }
    })

    return announcements
  } catch (error) {
    console.error('Error fetching lab announcements:', error)
    throw error
  }
}

// Helper function to get lab color based on category
function getLabColor(category: string): string {
  const colorMap: { [key: string]: string } = {
    'Inti': 'blue',
    'Pilihan': 'purple',
    'Wajib': 'green',
    'default': 'gray'
  }
  return colorMap[category] || colorMap.default
}
