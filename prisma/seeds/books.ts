import { PrismaClient } from '../../lib/generated/prisma'

export async function seedBookCategories(prisma: PrismaClient) {
  const categories = [
    {
      code: 'CS',
      name: 'Computer Science',
      description: 'Books related to computer science, programming, and software engineering'
    },
    {
      code: 'EE',
      name: 'Electrical Engineering',
      description: 'Books related to electrical engineering, electronics, and telecommunications'
    },
    {
      code: 'CE',
      name: 'Civil Engineering',
      description: 'Books related to civil engineering, construction, and infrastructure'
    },
    {
      code: 'AR',
      name: 'Architecture',
      description: 'Books related to architecture, building design, and urban planning'
    },
    {
      code: 'MT',
      name: 'Mathematics',
      description: 'Mathematics, statistics, and mathematical modeling books'
    },
    {
      code: 'PH',
      name: 'Physics',
      description: 'Physics and applied physics books'
    },
    {
      code: 'EN',
      name: 'English',
      description: 'English language, literature, and communication books'
    },
    {
      code: 'ID',
      name: 'Indonesian',
      description: 'Indonesian language and literature books'
    },
    {
      code: 'MG',
      name: 'Management',
      description: 'Management, leadership, and business books'
    },
    {
      code: 'GN',
      name: 'General',
      description: 'General reference and miscellaneous books'
    }
  ]

  const createdCategories = []
  for (const category of categories) {
    const created = await prisma.bookCategory.create({
      data: category
    })
    createdCategories.push(created)
  }

  // Create sample books for each category
  await seedBooks(prisma, createdCategories)

  console.log(`✅ Created ${categories.length} book categories and sample books`)
  return createdCategories
}

async function seedBooks(prisma: PrismaClient, categories: any[]) {
  const sampleBooks = [
    // Computer Science books
    {
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      publisher: 'MIT Press',
      publicationYear: 2009,
      isbn: '9780262033848',
      categoryCode: 'CS',
      description: 'Comprehensive textbook on algorithms and data structures',
      pageCount: 1312,
      location: 'Shelf A1-01'
    },
    {
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
      publisher: 'Prentice Hall',
      publicationYear: 2008,
      isbn: '9780132350884',
      categoryCode: 'CS',
      description: 'Guide to writing clean, maintainable code',
      pageCount: 464,
      location: 'Shelf A1-02'
    },
    {
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      author: 'Gang of Four',
      publisher: 'Addison-Wesley',
      publicationYear: 1994,
      isbn: '9780201633610',
      categoryCode: 'CS',
      description: 'Classic book on software design patterns',
      pageCount: 395,
      location: 'Shelf A1-03'
    },
    // Electrical Engineering books
    {
      title: 'Fundamentals of Electric Circuits',
      author: 'Charles K. Alexander',
      publisher: 'McGraw-Hill',
      publicationYear: 2016,
      isbn: '9780078028229',
      categoryCode: 'EE',
      description: 'Comprehensive introduction to circuit analysis',
      pageCount: 896,
      location: 'Shelf B1-01'
    },
    {
      title: 'Power System Analysis and Design',
      author: 'J. Duncan Glover',
      publisher: 'Cengage Learning',
      publicationYear: 2016,
      isbn: '9781305632134',
      categoryCode: 'EE',
      description: 'Power system analysis and design principles',
      pageCount: 784,
      location: 'Shelf B1-02'
    },
    // Civil Engineering books
    {
      title: 'Structural Analysis',
      author: 'Russell C. Hibbeler',
      publisher: 'Pearson',
      publicationYear: 2017,
      isbn: '9780134610672',
      categoryCode: 'CE',
      description: 'Fundamentals of structural analysis',
      pageCount: 736,
      location: 'Shelf C1-01'
    },
    {
      title: 'Introduction to Hydraulic Engineering',
      author: 'Robert J. Houghtalen',
      publisher: 'Pearson',
      publicationYear: 2010,
      isbn: '9780131473214',
      categoryCode: 'CE',
      description: 'Hydraulic engineering principles and applications',
      pageCount: 560,
      location: 'Shelf C1-02'
    },
    // Architecture books
    {
      title: 'A History of Architecture',
      author: 'Banister Fletcher',
      publisher: 'Architectural Press',
      publicationYear: 2019,
      isbn: '9780750622677',
      categoryCode: 'AR',
      description: 'Comprehensive history of architectural styles',
      pageCount: 1616,
      location: 'Shelf D1-01'
    },
    {
      title: 'Thinking Architecture',
      author: 'Peter Zumthor',
      publisher: 'Birkhäuser',
      publicationYear: 2006,
      isbn: '9783764374952',
      categoryCode: 'AR',
      description: 'Philosophical approach to architectural design',
      pageCount: 112,
      location: 'Shelf D1-02'
    },
    // Mathematics books
    {
      title: 'Calculus: Early Transcendentals',
      author: 'James Stewart',
      publisher: 'Cengage Learning',
      publicationYear: 2015,
      isbn: '9781285741550',
      categoryCode: 'MT',
      description: 'Comprehensive calculus textbook',
      pageCount: 1368,
      location: 'Shelf E1-01'
    },
    {
      title: 'Linear Algebra and Its Applications',
      author: 'David C. Lay',
      publisher: 'Pearson',
      publicationYear: 2015,
      isbn: '9780321982384',
      categoryCode: 'MT',
      description: 'Linear algebra theory and applications',
      pageCount: 576,
      location: 'Shelf E1-02'
    }
  ]

  const categoryMap = new Map(categories.map(cat => [cat.code, cat.id]))

  for (const book of sampleBooks) {
    await prisma.book.create({
      data: {
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        publicationYear: book.publicationYear,
        isbn: book.isbn,
        categoryId: categoryMap.get(book.categoryCode)!,
        description: book.description,
        pageCount: book.pageCount,
        location: book.location,
        borrowCount: Math.floor(Math.random() * 50)
      }
    })
  }

  // Add more random books to fill the library
  const randomTitles = [
    'Advanced Programming Concepts', 'Digital Signal Processing', 'Concrete Technology',
    'Sustainable Architecture', 'Differential Equations', 'Quantum Physics',
    'Technical English', 'Bahasa Indonesia Teknis', 'Project Management',
    'Engineering Ethics', 'Database Systems', 'Microprocessors',
    'Geotechnical Engineering', 'Urban Design', 'Statistical Methods',
    'Modern Physics', 'Academic Writing', 'Manajemen Konstruksi'
  ]

  for (let i = 0; i < 100; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const randomTitle = randomTitles[Math.floor(Math.random() * randomTitles.length)]

    await prisma.book.create({
      data: {
        title: `${randomTitle} ${i + 1}`,
        author: `Author ${i + 1}`,
        publisher: `Publisher ${Math.floor(i / 10) + 1}`,
        publicationYear: 2000 + Math.floor(Math.random() * 24),
        isbn: `978${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`,
        categoryId: randomCategory.id,
        description: `Description for ${randomTitle} ${i + 1}`,
        pageCount: 200 + Math.floor(Math.random() * 800),
        location: `Shelf ${randomCategory.code}${Math.floor(i / 20) + 1}-${(i % 20) + 1}`,
        borrowCount: Math.floor(Math.random() * 30)
      }
    })
  }
}