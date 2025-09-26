import { prisma } from './lib/prisma'
import { BookStatus, BorrowingStatus, ThesisStatus } from './lib/generated/prisma'

async function seedLibraryData() {
  console.log('🏗️ Starting library data seeding...')

  // Hardcoded student ID (MAHASISWA001)
  const studentId = 'cmfz4q41z00019yo0urpkhgyf'

  try {
    // 1. Create Book Categories
    console.log('📚 Creating book categories...')
    const categories = [
      {
        id: 'cat-cs',
        code: 'CS',  
        name: 'Ilmu Komputer',
        description: 'Buku-buku terkait ilmu komputer dan teknologi informasi'
      },
      {
        id: 'cat-math',
        code: 'MATH',
        name: 'Matematika', 
        description: 'Buku-buku matematika dan statistika'
      },
      {
        id: 'cat-eng',
        code: 'ENG',
        name: 'Teknik',
        description: 'Buku-buku teknik dan engineering'
      },
      {
        id: 'cat-bus',
        code: 'BUS',
        name: 'Bisnis',
        description: 'Buku-buku bisnis dan manajemen'
      },
      {
        id: 'cat-sci',
        code: 'SCI',
        name: 'Sains',
        description: 'Buku-buku sains umum'
      }
    ]

    for (const category of categories) {
      await prisma.bookCategory.upsert({
        where: { code: category.code },
        update: category,
        create: category
      })
    }

    // 2. Create Books
    console.log('📖 Creating books...')
    const books = [
      {
        id: 'book-1',
        title: 'Introduction to Algorithms',
        author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
        publisher: 'MIT Press',
        publicationYear: 2009,
        isbn: '978-0262033848',
        categoryId: 'cat-cs',
        coverImage: '/placeholder.svg?height=400&width=300',
        description: 'This book covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers.',
        pageCount: 1312,
        location: 'Lantai 2, Rak CS-101',
        status: BookStatus.available,
        borrowCount: 15
      },
      {
        id: 'book-2',
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        author: 'Robert C. Martin',
        publisher: 'Prentice Hall',
        publicationYear: 2008,
        isbn: '978-0132350884',
        categoryId: 'cat-cs',
        coverImage: '/placeholder.svg?height=400&width=300',
        description: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees.',
        pageCount: 464,
        location: 'Lantai 2, Rak CS-102',
        status: BookStatus.borrowed,
        borrowCount: 23
      },
      {
        id: 'book-3',
        title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
        author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
        publisher: 'Addison-Wesley',
        publicationYear: 1994,
        isbn: '978-0201633610',
        categoryId: 'cat-cs',
        coverImage: '/placeholder.svg?height=400&width=300',
        description: 'Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems.',
        pageCount: 395,
        location: 'Lantai 2, Rak CS-103',
        status: BookStatus.available,
        borrowCount: 18
      },
      {
        id: 'book-4',
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt, David Thomas',
        publisher: 'Addison-Wesley',
        publicationYear: 2019,
        isbn: '978-0135957059',
        categoryId: 'cat-cs',
        coverImage: '/placeholder.svg?height=400&width=300',
        description: 'The Pragmatic Programmer illustrates the best practices and major pitfalls of many different aspects of software development.',
        pageCount: 352,
        location: 'Lantai 2, Rak CS-104',
        status: BookStatus.available,
        borrowCount: 12
      },
      {
        id: 'book-5',
        title: 'Database System Concepts',
        author: 'Abraham Silberschatz, Henry F. Korth, S. Sudarshan',
        publisher: 'McGraw-Hill',
        publicationYear: 2019,
        isbn: '978-0078022159',
        categoryId: 'cat-cs',
        coverImage: '/placeholder.svg?height=400&width=300',
        description: 'Database System Concepts by Silberschatz, Korth and Sudarshan is now in its 7th edition and is one of the cornerstone texts of database education.',
        pageCount: 1376,
        location: 'Lantai 2, Rak CS-105',
        status: BookStatus.borrowed,
        borrowCount: 20
      },
      {
        id: 'book-6',
        title: 'Linear Algebra and Its Applications',
        author: 'David C. Lay, Steven R. Lay, Judi J. McDonald',
        publisher: 'Pearson',
        publicationYear: 2015,
        isbn: '978-0321982384',
        categoryId: 'cat-math',
        coverImage: '/placeholder.svg?height=400&width=300',
        description: 'Linear Algebra and Its Applications offers a modern elementary introduction with broad, relevant applications.',
        pageCount: 576,
        location: 'Lantai 1, Rak MATH-201',
        status: BookStatus.available,
        borrowCount: 8
      },
      {
        id: 'book-7',
        title: 'Calculus: Early Transcendentals',
        author: 'James Stewart',
        publisher: 'Cengage Learning',
        publicationYear: 2015,
        isbn: '978-1285741550',
        categoryId: 'cat-math',
        coverImage: '/placeholder.svg?height=400&width=300',
        description: 'Success in your calculus course starts here! James Stewart\'s CALCULUS: EARLY TRANSCENDENTALS texts are world-wide best-sellers for a reason.',
        pageCount: 1368,
        location: 'Lantai 1, Rak MATH-202',
        status: BookStatus.available,
        borrowCount: 14
      },
      {
        id: 'book-8',
        title: 'Software Engineering: A Practitioner\'s Approach',
        author: 'Roger S. Pressman, Bruce R. Maxim',
        publisher: 'McGraw-Hill',
        publicationYear: 2019,
        isbn: '978-1259872976',
        categoryId: 'cat-eng',
        coverImage: '/placeholder.svg?height=400&width=300',
        description: 'For over 30 years, Software Engineering: A Practitioner\'s Approach has been the world\'s leading textbook in software engineering.',
        pageCount: 976,
        location: 'Lantai 3, Rak ENG-301',
        status: BookStatus.available,
        borrowCount: 11
      },
      {
        id: 'book-9',
        title: 'The Lean Startup',
        author: 'Eric Ries',
        publisher: 'Crown Business',
        publicationYear: 2011,
        isbn: '978-0307887894',
        categoryId: 'cat-bus',
        coverImage: '/placeholder.svg?height=400&width=300',
        description: 'Most startups fail. But many of those failures are preventable. The Lean Startup is a new approach being adopted across the globe.',
        pageCount: 336,
        location: 'Lantai 3, Rak BUS-401',
        status: BookStatus.available,
        borrowCount: 7
      },
      {
        id: 'book-10',
        title: 'Physics for Scientists and Engineers',
        author: 'Raymond A. Serway, John W. Jewett',
        publisher: 'Cengage Learning',
        publicationYear: 2018,
        isbn: '978-1337553278',
        categoryId: 'cat-sci',
        coverImage: '/placeholder.svg?height=400&width=300',
        description: 'Achieve success in your physics course by making the most of what PHYSICS FOR SCIENTISTS AND ENGINEERS has to offer.',
        pageCount: 1344,
        location: 'Lantai 1, Rak SCI-501',
        status: BookStatus.available,
        borrowCount: 9
      }
    ]

    for (const book of books) {
      await prisma.book.upsert({
        where: { isbn: book.isbn },
        update: book,
        create: book
      })
    }

    // 3. Get student profile
    const student = await prisma.student.findFirst({
      where: { userId: studentId }
    })

    if (!student) {
      throw new Error('Student profile not found for userId: ' + studentId)
    }

    // 4. Create Book Borrowings for the student
    console.log('📋 Creating book borrowings...')
    const borrowings = [
      {
        id: 'borrow-1',
        bookId: 'book-2', // Clean Code - currently borrowed
        studentId: student.id,
        borrowDate: new Date('2025-03-15'),
        dueDate: new Date('2025-04-15'),
        status: BorrowingStatus.active,
        notes: 'First borrowing of Clean Code'
      },
      {
        id: 'borrow-2',
        bookId: 'book-5', // Database System Concepts - currently borrowed
        studentId: student.id,
        borrowDate: new Date('2025-03-20'),
        dueDate: new Date('2025-04-20'),
        status: BorrowingStatus.active,
        notes: 'For thesis research'
      },
      {
        id: 'borrow-3',
        bookId: 'book-1', // Introduction to Algorithms - returned
        studentId: student.id,
        borrowDate: new Date('2025-02-01'),
        dueDate: new Date('2025-03-01'),
        returnDate: new Date('2025-02-28'),
        status: BorrowingStatus.returned,
        notes: 'Returned on time'
      },
      {
        id: 'borrow-4',
        bookId: 'book-3', // Design Patterns - returned
        studentId: student.id,
        borrowDate: new Date('2025-01-15'),
        dueDate: new Date('2025-02-15'),
        returnDate: new Date('2025-02-10'),
        status: BorrowingStatus.returned,
        notes: 'Returned early'
      }
    ]

    for (const borrowing of borrowings) {
      await prisma.bookBorrowing.upsert({
        where: { id: borrowing.id },
        update: borrowing,
        create: borrowing
      })
    }

    console.log('✅ Library data seeded successfully!')
    console.log('📊 Summary:')
    console.log(`- Created ${categories.length} book categories`)
    console.log(`- Created ${books.length} books`)  
    console.log(`- Created ${borrowings.length} book borrowings for student`)
    console.log(`- Student: ${student.nim}`)

  } catch (error) {
    console.error('❌ Error seeding library data:', error)
    throw error
  }
}

async function seedThesisData() {
  console.log('📝 Starting thesis data seeding...')

  // Hardcoded student ID (MAHASISWA001)
  const studentId = 'cmfz4q41z00019yo0urpkhgyf'

  try {
    // Get student profile
    const student = await prisma.student.findFirst({
      where: { userId: studentId }
    })

    if (!student) {
      throw new Error('Student profile not found for userId: ' + studentId)
    }

    // Get some lecturers for supervisors
    const lecturers = await prisma.lecturer.findMany({
      take: 3,
      include: { user: true }
    })

    if (lecturers.length === 0) {
      console.log('⚠️ No lecturers found, skipping thesis seeding')
      return
    }

    // Create thesis titles (both for the student and others for similarity checking)
    console.log('📋 Creating thesis titles...')
    const thesisTitles = [
      {
        id: 'thesis-1',
        title: 'Implementasi Machine Learning untuk Prediksi Kelulusan Mahasiswa',
        abstract: 'Penelitian ini menggunakan algoritma machine learning untuk memprediksi tingkat kelulusan mahasiswa berdasarkan data akademik dan non-akademik. Metode yang digunakan meliputi Random Forest, SVM, dan Neural Network.',
        keywords: ['machine learning', 'prediksi', 'kelulusan', 'mahasiswa', 'neural network'],
        authorId: student.id,
        supervisorId: lecturers[0].id,
        department: 'Teknik Informatika',
        year: 2025,
        status: ThesisStatus.pending,
        similarityScore: null
      },
      {
        id: 'thesis-2',
        title: 'Sistem Informasi Manajemen Perpustakaan Berbasis Web',
        abstract: 'Pengembangan sistem informasi untuk mengelola data perpustakaan menggunakan teknologi web modern dengan framework Laravel dan database MySQL.',
        keywords: ['sistem informasi', 'perpustakaan', 'web', 'laravel', 'mysql'],
        authorId: student.id, // Create multiple thesis titles for same student (draft/alternative)
        supervisorId: lecturers[1].id,
        department: 'Teknik Informatika',
        year: 2025,
        status: ThesisStatus.rejected,
        similarityScore: 15.5
      },
      // Other students' thesis titles for similarity comparison
      {
        id: 'thesis-3',
        title: 'Penerapan Algoritma Machine Learning dalam Analisis Sentimen Media Sosial',
        abstract: 'Penelitian ini membahas penggunaan Natural Language Processing dan Machine Learning untuk menganalisis sentimen pada data media sosial Twitter.',
        keywords: ['machine learning', 'analisis sentimen', 'nlp', 'twitter', 'sosial media'],
        authorId: student.id, // Using same student for demo, in real scenario this would be different
        supervisorId: lecturers[2].id,
        department: 'Teknik Informatika', 
        year: 2024,
        status: ThesisStatus.approved,
        similarityScore: 25.3
      },
      {
        id: 'thesis-4',
        title: 'Pengembangan Aplikasi Mobile untuk Monitoring Kesehatan',
        abstract: 'Aplikasi mobile berbasis Android yang dapat memantau kondisi kesehatan pengguna menggunakan sensor smartphone dan IoT devices.',
        keywords: ['mobile app', 'android', 'kesehatan', 'iot', 'monitoring'],
        authorId: student.id,
        supervisorId: lecturers[0].id,
        department: 'Teknik Informatika',
        year: 2024,
        status: ThesisStatus.approved,
        similarityScore: 8.2
      },
      {
        id: 'thesis-5',
        title: 'Implementasi Blockchain untuk Sistem Voting Elektronik',
        abstract: 'Penelitian tentang penerapan teknologi blockchain dalam sistem pemungutan suara elektronik untuk meningkatkan keamanan dan transparansi.',
        keywords: ['blockchain', 'voting', 'elektronik', 'keamanan', 'transparansi'],
        authorId: student.id,
        supervisorId: lecturers[1].id,
        department: 'Teknik Informatika',
        year: 2024,
        status: ThesisStatus.approved,
        similarityScore: 5.1
      }
    ]

    for (const thesis of thesisTitles) {
      await prisma.thesisTitle.upsert({
        where: { id: thesis.id },
        update: thesis,
        create: thesis
      })
    }

    // Create similarity records
    console.log('🔍 Creating thesis similarities...')
    const similarities = [
      {
        id: 'sim-1',
        sourceThesisId: 'thesis-1',
        targetThesisId: 'thesis-3',
        similarityPercentage: 25.3
      },
      {
        id: 'sim-2', 
        sourceThesisId: 'thesis-1',
        targetThesisId: 'thesis-4',
        similarityPercentage: 8.2
      }
    ]

    for (const similarity of similarities) {
      await prisma.thesisSimilarity.upsert({
        where: { 
          sourceThesisId_targetThesisId: {
            sourceThesisId: similarity.sourceThesisId,
            targetThesisId: similarity.targetThesisId
          }
        },
        update: similarity,
        create: similarity
      })
    }

    console.log('✅ Thesis data seeded successfully!')
    console.log('📊 Summary:')
    console.log(`- Created ${thesisTitles.length} thesis titles`)
    console.log(`- Created ${similarities.length} similarity records`)

  } catch (error) {
    console.error('❌ Error seeding thesis data:', error)
    throw error
  }
}

async function main() {
  try {
    await seedLibraryData()
    await seedThesisData()
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
