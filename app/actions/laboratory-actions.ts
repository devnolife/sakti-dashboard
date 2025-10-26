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
    const availableLabs = await prisma.laboratories.findMany({
      where: { status: 'active' },
      include: {
        lecturers: {
          include: {
            users: true
          }
        },
        lab_registrations: {
          where: { student_id: student.id },
          select: { id: true, status: true }
        },
        _count: {
          select: {
            lab_registrations: true,
            lab_sessions: true,
            lab_assignments: true
          }
        }
      },
      orderBy: { code: 'asc' }
    })

    // Get student's lab registrations
    const myRegistrations = await prisma.lab_registrations.findMany({
      where: { student_id: student.id },
      include: {
        laboratories: {
          include: {
            lecturers: {
              include: {
                users: true
              }
            }
          }
        },
        lab_assignment_submissions: {
          include: {
            lab_assignments: true
          }
        }
      },
      orderBy: { registered_at: 'desc' }
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
        instructor: lab.lecturers?.users?.name || 'TBA',
        instructorImage: lab.lecturers?.users?.avatar || '/placeholder.svg?height=100&width=100',
        schedule: 'Lihat jadwal', // Will be populated from sessions
        capacity: lab.capacity,
        enrolled: lab._count.lab_registrations,
        credits: lab.credits,
        tags: [lab.category, lab.department], // Simplified tags
        status: lab.lab_registrations.length > 0 ?
          (lab.lab_registrations[0].status === 'completed' ? 'selesai' :
            lab.lab_registrations[0].status === 'approved' ? 'terdaftar' :
              lab.lab_registrations[0].status === 'pending' ? 'menunggu' : 'tersedia') :
          (lab._count.lab_registrations >= lab.capacity ? 'penuh' : 'tersedia'),
        semester: lab.semester,
        category: lab.category,
        location: lab.location,
        color: getLabColor(lab.category),
        isRegistered: lab.lab_registrations.length > 0
      })),
      myLabs: myRegistrations
        .filter(reg => ['approved', 'pending'].includes(reg.status))
        .map(reg => ({
          id: reg.id,
          labId: reg.laboratories.id,
          title: reg.laboratories.name,
          code: reg.laboratories.code,
          instructor: reg.laboratories.lecturers?.users?.name || 'TBA',
          progress: reg.progress,
          status: reg.status,
          registeredAt: reg.registered_at,
          totalAssignments: reg.lab_assignment_submissions.length,
          completedAssignments: reg.lab_assignment_submissions.filter(a => a.score !== null).length,
          nextDeadline: reg.lab_assignment_submissions
            .filter(a => a.score === null)
            .sort((a, b) => new Date(a.lab_assignments.due_date).getTime() - new Date(b.lab_assignments.due_date).getTime())[0]?.lab_assignments.due_date
        })),
      completedLabs: completedLabs.map(reg => ({
        id: reg.id,
        labId: reg.laboratories.id,
        title: reg.laboratories.name,
        code: reg.laboratories.code,
        instructor: reg.laboratories.lecturers?.users?.name || 'TBA',
        progress: reg.progress,
        grade: reg.grade,
        completedAt: reg.completed_at,
        totalAssignments: reg.lab_assignment_submissions.length,
        averageScore: reg.lab_assignment_submissions.length > 0 ?
          reg.lab_assignment_submissions.reduce((sum, a) => sum + (a.score || 0), 0) / reg.lab_assignment_submissions.length : 0
      })),
      registrationHistory: registrationHistory.map(reg => ({
        id: reg.id,
        labId: reg.laboratories.id,
        title: reg.laboratories.name,
        code: reg.laboratories.code,
        instructor: reg.laboratories.lecturers?.users?.name || 'TBA',
        status: reg.status,
        registeredAt: reg.registered_at,
        completedAt: reg.completed_at,
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
    const existingRegistration = await prisma.lab_registrations.findUnique({
      where: {
        student_id_laboratory_id: {
          student_id: student.id,
          laboratory_id: laboratoryId
        }
      }
    })

    if (existingRegistration) {
      throw new Error('Already registered for this laboratory')
    }

    // Check laboratory capacity
    const lab = await prisma.laboratories.findUnique({
      where: { id: laboratoryId },
      include: {
        _count: {
          select: { lab_registrations: true }
        }
      }
    })

    if (!lab) {
      throw new Error('Laboratory not found')
    }

    if (lab._count.lab_registrations >= lab.capacity) {
      throw new Error('Laboratory is full')
    }

    // Create registration
    const registration = await prisma.lab_registrations.create({
      data: {
        id: crypto.randomUUID(),
        student_id: student.id,
        laboratory_id: laboratoryId,
        status: 'pending',
        updated_at: new Date()
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
    const sessions = await prisma.lab_sessions.findMany({
      where: { laboratory_id: laboratoryId },
      orderBy: { session_date: 'asc' }
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

    const assignments = await prisma.lab_assignments.findMany({
      where: { laboratory_id: laboratoryId },
      include: {
        lab_assignment_submissions: {
          where: { student_id: student.id },
          select: {
            id: true,
            score: true,
            feedback: true,
            submitted_at: true,
            file_url: true
          }
        }
      },
      orderBy: { due_date: 'asc' }
    })

    return assignments.map(assignment => ({
      ...assignment,
      submission: assignment.lab_assignment_submissions[0] || null
    }))
  } catch (error) {
    console.error('Error fetching lab assignments:', error)
    throw error
  }
}

// Get laboratory materials
export async function getLabMaterials(laboratoryId: string) {
  try {
    const materials = await prisma.lab_materials.findMany({
      where: { laboratory_id: laboratoryId },
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
    const announcements = await prisma.lab_announcements.findMany({
      where: { laboratory_id: laboratoryId },
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
