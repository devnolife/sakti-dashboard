import { PrismaClient } from './lib/generated/prisma'

const prisma = new PrismaClient()

async function checkLaboratoryData() {
  try {
    console.log('🔍 Checking laboratory data in database...\n')

    // Get student with username MAHASISWA001
    const student = await prisma.student.findFirst({
      where: { 
        user: {
          nidn: 'MAHASISWA001'
        }
      },
      select: { id: true, nim: true, user: { select: { name: true } } }
    })

    if (!student) {
      console.log('❌ Student with username MAHASISWA001 not found')
      return
    }

    console.log(`📚 Checking data for student: ${student.user.name} (${student.nim})`)
    console.log('=' .repeat(60))

    // Check laboratories
    const laboratories = await prisma.laboratory.findMany({
      include: {
        instructor: {
          include: {
            user: true
          }
        },
        _count: {
          select: {
            registrations: true,
            sessions: true,
            assignments: true,
            materials: true,
            announcements: true
          }
        }
      },
      orderBy: { code: 'asc' }
    })

    console.log(`\n🧪 LABORATORIES (${laboratories.length} total):`)
    console.log('-'.repeat(60))
    laboratories.forEach((lab, index) => {
      console.log(`${index + 1}. ${lab.name} (${lab.code})`)
      console.log(`   📍 Location: ${lab.location}`)
      console.log(`   👨‍🏫 Instructor: ${lab.instructor?.user?.name || 'Not assigned'}`)
      console.log(`   📊 Capacity: ${lab.capacity} | Credits: ${lab.credits}`)
      console.log(`   📂 Category: ${lab.category} | Status: ${lab.status}`)
      console.log(`   📝 Registrations: ${lab._count.registrations}`)
      console.log(`   🕐 Sessions: ${lab._count.sessions}`)
      console.log(`   📋 Assignments: ${lab._count.assignments}`)
      console.log(`   📚 Materials: ${lab._count.materials}`)
      console.log(`   📢 Announcements: ${lab._count.announcements}`)
      console.log('')
    })

    // Check lab registrations for MAHASISWA001
    const registrations = await prisma.labRegistration.findMany({
      where: { studentId: student.id },
      include: {
        laboratory: {
          select: {
            name: true,
            code: true
          }
        },
        _count: {
          select: {
            assignments: true
          }
        }
      },
      orderBy: { registeredAt: 'desc' }
    })

    console.log(`\n📝 LAB REGISTRATIONS for ${student.nim} (${registrations.length} total):`)
    console.log('-'.repeat(60))
    registrations.forEach((reg, index) => {
      console.log(`${index + 1}. ${reg.laboratory.name} (${reg.laboratory.code})`)
      console.log(`   📊 Status: ${reg.status}`)
      console.log(`   📈 Progress: ${reg.progress}%`)
      console.log(`   🎯 Grade: ${reg.grade || 'Not graded yet'}`)
      console.log(`   📅 Registered: ${reg.registeredAt.toLocaleDateString()}`)
      console.log(`   ✅ Completed: ${reg.completedAt?.toLocaleDateString() || 'Not completed'}`)
      console.log(`   📋 Assignments: ${reg._count.assignments}`)
      console.log('')
    })

    // Check lab sessions
    const sessions = await prisma.labSession.findMany({
      include: {
        laboratory: {
          select: {
            name: true,
            code: true
          }
        }
      },
      orderBy: [{ laboratoryId: 'asc' }, { sessionDate: 'asc' }]
    })

    console.log(`\n🕐 LAB SESSIONS (${sessions.length} total):`)
    console.log('-'.repeat(60))
    let currentLabId = ''
    sessions.forEach((session, index) => {
      if (session.laboratoryId !== currentLabId) {
        currentLabId = session.laboratoryId
        console.log(`\n📚 ${session.laboratory.name} (${session.laboratory.code}):`)
      }
      console.log(`   ${index + 1}. ${session.title}`)
      console.log(`      📅 Date: ${session.sessionDate.toLocaleDateString()}`)
      console.log(`      🕐 Time: ${session.startTime} - ${session.endTime}`)
      console.log(`      📍 Location: ${session.location || 'TBD'}`)
      console.log(`      📊 Status: ${session.status}`)
    })

    // Check lab assignments
    const assignments = await prisma.labAssignment.findMany({
      include: {
        laboratory: {
          select: {
            name: true,
            code: true
          }
        },
        _count: {
          select: {
            submissions: true
          }
        }
      },
      orderBy: [{ laboratoryId: 'asc' }, { dueDate: 'asc' }]
    })

    console.log(`\n\n📋 LAB ASSIGNMENTS (${assignments.length} total):`)
    console.log('-'.repeat(60))
    currentLabId = ''
    assignments.forEach((assignment, index) => {
      if (assignment.laboratoryId !== currentLabId) {
        currentLabId = assignment.laboratoryId
        console.log(`\n📚 ${assignment.laboratory.name} (${assignment.laboratory.code}):`)
      }
      console.log(`   ${index + 1}. ${assignment.title}`)
      console.log(`      📅 Due Date: ${assignment.dueDate.toLocaleDateString()}`)
      console.log(`      🎯 Max Score: ${assignment.maxScore}`)
      console.log(`      📝 Submissions: ${assignment._count.submissions}`)
    })

    // Check assignment submissions for MAHASISWA001
    const submissions = await prisma.labAssignmentSubmission.findMany({
      where: { studentId: student.id },
      include: {
        assignment: {
          include: {
            laboratory: {
              select: {
                name: true,
                code: true
              }
            }
          }
        }
      },
      orderBy: { submittedAt: 'desc' }
    })

    console.log(`\n\n📤 ASSIGNMENT SUBMISSIONS for ${student.nim} (${submissions.length} total):`)
    console.log('-'.repeat(60))
    submissions.forEach((submission, index) => {
      console.log(`${index + 1}. ${submission.assignment.title}`)
      console.log(`   📚 Lab: ${submission.assignment.laboratory.name}`)
      console.log(`   📅 Submitted: ${submission.submittedAt.toLocaleDateString()}`)
      console.log(`   🎯 Score: ${submission.score || 'Not graded'} / ${submission.assignment.maxScore}`)
      console.log(`   💬 Feedback: ${submission.feedback || 'No feedback yet'}`)
      console.log(`   📎 File: ${submission.fileUrl || 'No file'}`)
      console.log('')
    })

    // Check lab materials
    const materialsCount = await prisma.labMaterial.count()
    const materials = await prisma.labMaterial.findMany({
      include: {
        laboratory: {
          select: {
            name: true,
            code: true
          }
        }
      },
      orderBy: [{ laboratoryId: 'asc' }, { title: 'asc' }]
    })

    console.log(`\n📚 LAB MATERIALS (${materialsCount} total):`)
    console.log('-'.repeat(60))
    currentLabId = ''
    materials.forEach((material, index) => {
      if (material.laboratoryId !== currentLabId) {
        currentLabId = material.laboratoryId
        console.log(`\n📚 ${material.laboratory.name} (${material.laboratory.code}):`)
      }
      console.log(`   ${index + 1}. ${material.title}`)
      console.log(`      📝 Type: ${material.type}`)
      console.log(`      📎 File: ${material.fileUrl || 'N/A'}`)
      console.log(`      🔗 URL: ${material.externalUrl || 'N/A'}`)
    })

    // Check lab announcements
    const announcementsCount = await prisma.labAnnouncement.count()
    const announcements = await prisma.labAnnouncement.findMany({
      include: {
        laboratory: {
          select: {
            name: true,
            code: true
          }
        }
      },
      orderBy: [{ laboratoryId: 'asc' }, { createdAt: 'desc' }]
    })

    console.log(`\n\n📢 LAB ANNOUNCEMENTS (${announcementsCount} total):`)
    console.log('-'.repeat(60))
    currentLabId = ''
    announcements.forEach((announcement, index) => {
      if (announcement.laboratoryId !== currentLabId) {
        currentLabId = announcement.laboratoryId
        console.log(`\n📚 ${announcement.laboratory.name} (${announcement.laboratory.code}):`)
      }
      console.log(`   ${index + 1}. ${announcement.title} ${announcement.isImportant ? '⚠️' : ''}`)
      console.log(`      📅 Created: ${announcement.createdAt.toLocaleDateString()}`)
      console.log(`      📝 Content: ${announcement.content.substring(0, 100)}${announcement.content.length > 100 ? '...' : ''}`)
    })

    console.log('\n' + '='.repeat(60))
    console.log('✅ Laboratory data check completed!')

  } catch (error) {
    console.error('❌ Error checking laboratory data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the check function
checkLaboratoryData()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
