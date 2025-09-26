'use server'

import { prisma } from '@/lib/prisma'
import { getHardcodedStudentId } from '@/lib/auth-utils'

export interface Book {
  id: string
  title: string
  author: string
  coverImage: string | null
  category: string
  isAvailable: boolean
  description: string | null
  publishedYear: number
  publisher: string
  isbn: string
  totalCopies: number
  availableCopies: number
  location: string
  language: string
}

export interface BorrowedBook {
  id: string
  title: string
  author: string
  borrowDate: string
  dueDate: string
  status: 'active' | 'returned' | 'overdue' | 'lost'
  fine: number | null
}

export interface LibraryStats {
  totalBooks: number
  availableBooks: number
  borrowedBooks: number
  recentReturns: number
}

export interface LibraryData {
  stats: LibraryStats
  books: Book[]
  borrowedBooks: BorrowedBook[]
  categories: Array<{
    code: string
    name: string
  }>
}

export async function getLibraryData(): Promise<LibraryData> {
  const userId = getHardcodedStudentId()
  
  console.log('🔍 Fetching library data for user:', userId)

  try {
    // Get user with student profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: {
          include: {
            bookBorrowings: {
              include: {
                book: {
                  include: {
                    category: true
                  }
                }
              },
              orderBy: { borrowDate: 'desc' }
            }
          }
        }
      }
    })

    if (!user?.studentProfile) {
      throw new Error('Student profile not found')
    }

    const student = user.studentProfile

    // Get all books with categories
    const allBooks = await prisma.book.findMany({
      include: {
        category: true,
        borrowings: {
          where: {
            status: 'active'
          }
        }
      },
      orderBy: { title: 'asc' }
    })

    // Get categories
    const categories = await prisma.bookCategory.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    })

    // Transform books data
    const books: Book[] = allBooks.map(book => {
      const activeBorrowings = book.borrowings.length
      const totalCopies = 5 // Mock total copies, can be made dynamic
      const availableCopies = Math.max(0, totalCopies - activeBorrowings)
      
      return {
        id: book.id,
        title: book.title,
        author: book.author,
        coverImage: book.coverImage,
        category: book.category.code.toLowerCase(),
        isAvailable: book.status === 'available' && availableCopies > 0,
        description: book.description,
        publishedYear: book.publicationYear,
        publisher: book.publisher,
        isbn: book.isbn,
        totalCopies,
        availableCopies,
        location: book.location,
        language: 'Indonesian' // Mock language, can be made dynamic
      }
    })

    // Transform borrowed books
    const borrowedBooks: BorrowedBook[] = student.bookBorrowings
      .filter(borrowing => borrowing.status === 'active')
      .map(borrowing => ({
        id: borrowing.id,
        title: borrowing.book.title,
        author: borrowing.book.author,
        borrowDate: borrowing.borrowDate.toISOString(),
        dueDate: borrowing.dueDate.toISOString(),
        status: borrowing.status as BorrowedBook['status'],
        fine: borrowing.fine ? parseFloat(borrowing.fine.toString()) : null
      }))

    // Calculate stats
    const totalBooks = allBooks.length
    const availableBooks = books.filter(book => book.isAvailable).length
    const borrowedByStudent = borrowedBooks.length
    
    // Get recent returns (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const recentReturns = await prisma.bookBorrowing.count({
      where: {
        studentId: student.id,
        status: 'returned',
        returnDate: {
          gte: sevenDaysAgo
        }
      }
    })

    const stats: LibraryStats = {
      totalBooks,
      availableBooks,
      borrowedBooks: borrowedByStudent,
      recentReturns
    }

    const libraryData: LibraryData = {
      stats,
      books,
      borrowedBooks,
      categories: categories.map(cat => ({
        code: cat.code.toLowerCase(),
        name: cat.name
      }))
    }

    console.log(`✅ Library data loaded for student: ${user.name}`)
    console.log(`- Total Books: ${totalBooks}`)
    console.log(`- Available Books: ${availableBooks}`)
    console.log(`- Student's Borrowed Books: ${borrowedByStudent}`)
    console.log(`- Recent Returns: ${recentReturns}`)

    return libraryData

  } catch (error) {
    console.error('Error fetching library data:', error)
    throw error
  }
}

export interface ThesisTitle {
  id: string
  title: string
  student: {
    id: string
    name: string
    nim: string
    program: string
  }
  supervisor: {
    id: string
    name: string
  }
  keywords: string[]
  abstract: string
  year: number
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  field: string
  submissionDate: string
}

export interface ThesisData {
  theses: ThesisTitle[]
  stats: {
    total: number
    approved: number
    pending: number
    byField: Record<string, number>
  }
}

export async function getThesisTitlesData(): Promise<ThesisData> {
  const userId = getHardcodedStudentId()
  
  console.log('🔍 Fetching thesis titles data for user:', userId)

  try {
    // Get all thesis titles (for browsing approved ones)
    const allTheses = await prisma.thesisTitle.findMany({
      include: {
        author: {
          include: {
            user: true
          }
        },
        supervisor: {
          include: {
            user: true
          }
        }
      },
      orderBy: { year: 'desc' }
    })

    // Transform thesis data
    const theses: ThesisTitle[] = allTheses.map(thesis => ({
      id: thesis.id,
      title: thesis.title,
      student: {
        id: thesis.author.id,
        name: thesis.author.user.name,
        nim: thesis.author.nim,
        program: 'Informatika' // Can be made dynamic later
      },
      supervisor: {
        id: thesis.supervisor?.id || '',
        name: thesis.supervisor?.user.name || 'TBA'
      },
      keywords: thesis.keywords,
      abstract: thesis.abstract,
      year: thesis.year,
      status: thesis.status === 'archived' ? 'completed' : thesis.status as 'pending' | 'approved' | 'rejected' | 'completed',
      field: thesis.department,
      submissionDate: thesis.submissionDate.toISOString()
    }))

    // Calculate stats
    const total = theses.length
    const approved = theses.filter(t => t.status === 'approved').length
    const pending = theses.filter(t => t.status === 'pending').length
    
    const byField = theses.reduce((acc, thesis) => {
      acc[thesis.field] = (acc[thesis.field] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const thesisData: ThesisData = {
      theses,
      stats: {
        total,
        approved,
        pending,
        byField
      }
    }

    console.log(`✅ Thesis data loaded`)
    console.log(`- Total Theses: ${total}`)
    console.log(`- Approved: ${approved}`)
    console.log(`- Pending: ${pending}`)

    return thesisData

  } catch (error) {
    console.error('Error fetching thesis data:', error)
    throw error
  }
}

export interface StudentThesisSubmission {
  id: string
  title: string
  abstract: string
  keywords: string[]
  status: 'pending' | 'approved' | 'rejected'
  submissionDate: string
  similarityScore?: number
  supervisor?: string
}

export interface ThesisSubmissionData {
  submissions: StudentThesisSubmission[]
  canSubmitNew: boolean
}

export async function getThesisSubmissionData(): Promise<ThesisSubmissionData> {
  const userId = getHardcodedStudentId()
  
  console.log('🔍 Fetching thesis submission data for user:', userId)

  try {
    // Get user with student profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: {
          include: {
            thesesAuthored: {
              include: {
                supervisor: {
                  include: {
                    user: true
                  }
                }
              },
              orderBy: { submissionDate: 'desc' }
            }
          }
        }
      }
    })

    if (!user?.studentProfile) {
      throw new Error('Student profile not found')
    }

    const student = user.studentProfile

    // Transform submission data
    const submissions: StudentThesisSubmission[] = student.thesesAuthored.map(thesis => ({
      id: thesis.id,
      title: thesis.title,
      abstract: thesis.abstract,
      keywords: thesis.keywords,
      status: thesis.status as StudentThesisSubmission['status'],
      submissionDate: thesis.submissionDate.toISOString(),
      similarityScore: thesis.similarityScore || undefined,
      supervisor: thesis.supervisor?.user.name
    }))

    // Check if student can submit new thesis (no pending submissions)
    const hasPendingSubmission = submissions.some(s => s.status === 'pending')
    const hasApprovedSubmission = submissions.some(s => s.status === 'approved')
    const canSubmitNew = !hasPendingSubmission && !hasApprovedSubmission

    const submissionData: ThesisSubmissionData = {
      submissions,
      canSubmitNew
    }

    console.log(`✅ Thesis submission data loaded for student: ${user.name}`)
    console.log(`- Total Submissions: ${submissions.length}`)
    console.log(`- Can Submit New: ${canSubmitNew}`)

    return submissionData

  } catch (error) {
    console.error('Error fetching thesis submission data:', error)
    throw error
  }
}

export async function submitThesisTitle(data: {
  title: string
  abstract: string
  keywords: string[]
  supervisorId?: string
}): Promise<{ success: boolean; message: string; thesisId?: string }> {
  const userId = getHardcodedStudentId()
  
  console.log('📝 Submitting thesis title for user:', userId)

  try {
    // Get user with student profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: {
          include: {
            thesesAuthored: {
              where: {
                OR: [
                  { status: 'pending' },
                  { status: 'approved' }
                ]
              }
            }
          }
        }
      }
    })

    if (!user?.studentProfile) {
      throw new Error('Student profile not found')
    }

    const student = user.studentProfile

    // Check if student can submit
    const hasPendingSubmission = student.thesesAuthored.some(t => t.status === 'pending')
    const hasApprovedSubmission = student.thesesAuthored.some(t => t.status === 'approved')

    if (hasPendingSubmission) {
      return {
        success: false,
        message: 'Anda masih memiliki pengajuan judul yang sedang pending. Harap tunggu hasil review terlebih dahulu.'
      }
    }

    if (hasApprovedSubmission) {
      return {
        success: false,
        message: 'Anda sudah memiliki judul yang disetujui. Tidak dapat mengajukan judul baru.'
      }
    }

    // Create new thesis submission
    const newThesis = await prisma.thesisTitle.create({
      data: {
        title: data.title,
        abstract: data.abstract,
        keywords: data.keywords,
        authorId: student.id,
        supervisorId: data.supervisorId,
        department: 'Teknik Informatika', // Can be made dynamic
        year: new Date().getFullYear(),
        status: 'pending'
      }
    })

    console.log(`✅ Thesis title submitted successfully: ${newThesis.id}`)

    return {
      success: true,
      message: 'Judul skripsi berhasil diajukan dan sedang menunggu review.',
      thesisId: newThesis.id
    }

  } catch (error) {
    console.error('Error submitting thesis title:', error)
    return {
      success: false,
      message: 'Terjadi kesalahan saat mengajukan judul skripsi. Silakan coba lagi.'
    }
  }
}
