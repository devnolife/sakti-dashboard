export type Book = {
  id: string
  title: string
  author: string
  coverImage: string
  category: string
  isAvailable: boolean
  similarityPercentage?: number
  description: string
  publishedYear: number
  publisher: string
  isbn: string
  totalCopies: number
  availableCopies: number
  location: string
  language: string
}

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "computer-science",
    isAvailable: true,
    similarityPercentage: 92,
    description:
      "This book covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers.",
    publishedYear: 2009,
    publisher: "MIT Press",
    isbn: "978-0262033848",
    totalCopies: 5,
    availableCopies: 2,
    location: "Lantai 2, Rak CS-101",
    language: "English",
  },
  {
    id: "2",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "computer-science",
    isAvailable: false,
    similarityPercentage: 85,
    description:
      "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.",
    publishedYear: 2008,
    publisher: "Prentice Hall",
    isbn: "978-0132350884",
    totalCopies: 3,
    availableCopies: 0,
    location: "Lantai 2, Rak CS-102",
    language: "English",
  },
  {
    id: "3",
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "computer-science",
    isAvailable: true,
    similarityPercentage: 78,
    description:
      "Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems.",
    publishedYear: 1994,
    publisher: "Addison-Wesley Professional",
    isbn: "978-0201633610",
    totalCopies: 2,
    availableCopies: 1,
    location: "Lantai 2, Rak CS-103",
    language: "English",
  },
  {
    id: "4",
    title: "Calculus: Early Transcendentals",
    author: "James Stewart",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "mathematics",
    isAvailable: true,
    similarityPercentage: 65,
    description:
      "Success in your calculus course starts here! James Stewart's CALCULUS texts are world-wide best-sellers for a reason: they are clear, accurate, and filled with relevant, real-world examples.",
    publishedYear: 2015,
    publisher: "Cengage Learning",
    isbn: "978-1285741550",
    totalCopies: 8,
    availableCopies: 3,
    location: "Lantai 1, Rak MTH-201",
    language: "English",
  },
  {
    id: "5",
    title: "Linear Algebra and Its Applications",
    author: "Gilbert Strang",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "mathematics",
    isAvailable: false,
    similarityPercentage: 72,
    description:
      "Renowned professor and author Gilbert Strang demonstrates that linear algebra is a fascinating subject by showing both its beauty and value.",
    publishedYear: 2016,
    publisher: "Cengage Learning",
    isbn: "978-0030105678",
    totalCopies: 4,
    availableCopies: 0,
    location: "Lantai 1, Rak MTH-202",
    language: "English",
  },
  {
    id: "6",
    title: "Database System Concepts",
    author: "Abraham Silberschatz, Henry F. Korth, S. Sudarshan",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "computer-science",
    isAvailable: true,
    similarityPercentage: 88,
    description:
      "Database System Concepts by Silberschatz, Korth and Sudarshan is now in its 6th edition and is one of the cornerstone texts of database education.",
    publishedYear: 2010,
    publisher: "McGraw-Hill Education",
    isbn: "978-0073523323",
    totalCopies: 3,
    availableCopies: 1,
    location: "Lantai 2, Rak CS-201",
    language: "English",
  },
  {
    id: "7",
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell, Peter Norvig",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "computer-science",
    isAvailable: true,
    similarityPercentage: 94,
    description:
      "The most comprehensive, up-to-date introduction to the theory and practice of artificial intelligence.",
    publishedYear: 2020,
    publisher: "Pearson",
    isbn: "978-0134610993",
    totalCopies: 5,
    availableCopies: 2,
    location: "Lantai 2, Rak CS-301",
    language: "English",
  },
  {
    id: "8",
    title: "Principles of Economics",
    author: "N. Gregory Mankiw",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "business",
    isAvailable: false,
    similarityPercentage: 60,
    description:
      "In writing this textbook, Mankiw has tried to put himself in the position of someone seeing economics for the first time.",
    publishedYear: 2017,
    publisher: "Cengage Learning",
    isbn: "978-1305585126",
    totalCopies: 6,
    availableCopies: 0,
    location: "Lantai 3, Rak BUS-101",
    language: "English",
  },
  {
    id: "9",
    title: "Physics for Scientists and Engineers",
    author: "Raymond A. Serway, John W. Jewett",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "science",
    isAvailable: true,
    similarityPercentage: 75,
    description:
      "Achieve success in your physics course by making the most of what PHYSICS FOR SCIENTISTS AND ENGINEERS has to offer.",
    publishedYear: 2018,
    publisher: "Cengage Learning",
    isbn: "978-1337553292",
    totalCopies: 4,
    availableCopies: 2,
    location: "Lantai 1, Rak SCI-101",
    language: "English",
  },
  {
    id: "10",
    title: "Fundamentals of Electric Circuits",
    author: "Charles K. Alexander, Matthew N. O. Sadiku",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "engineering",
    isAvailable: true,
    similarityPercentage: 82,
    description:
      "Alexander and Sadiku's fifth edition of Fundamentals of Electric Circuits continues in the spirit of its successful previous editions, with the objective of presenting circuit analysis in a manner that is clearer, more interesting, and easier to understand than other, more traditional texts.",
    publishedYear: 2012,
    publisher: "McGraw-Hill Education",
    isbn: "978-0073380575",
    totalCopies: 3,
    availableCopies: 1,
    location: "Lantai 3, Rak ENG-201",
    language: "English",
  },
  {
    id: "11",
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum, David J. Wetherall",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "computer-science",
    isAvailable: true,
    similarityPercentage: 89,
    description:
      "Computer Networks, 5/e is appropriate for Computer Networking or Introduction to Networking courses at both the undergraduate and graduate level in Computer Science, Electrical Engineering, CIS, MIS, and Business Departments.",
    publishedYear: 2010,
    publisher: "Pearson",
    isbn: "978-0132126953",
    totalCopies: 4,
    availableCopies: 2,
    location: "Lantai 2, Rak CS-202",
    language: "English",
  },
  {
    id: "12",
    title: "Operating System Concepts",
    author: "Abraham Silberschatz, Peter B. Galvin, Greg Gagne",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "computer-science",
    isAvailable: false,
    similarityPercentage: 91,
    description:
      "The tenth edition of Operating System Concepts has been revised to keep it fresh and up-to-date with contemporary examples of how operating systems function, as well as enhanced interactive elements to improve learning and the student's experience with the material.",
    publishedYear: 2018,
    publisher: "Wiley",
    isbn: "978-1119320913",
    totalCopies: 3,
    availableCopies: 0,
    location: "Lantai 2, Rak CS-203",
    language: "English",
  },
]

export const borrowedBooks = [
  {
    id: "2",
    borrowDate: "2023-10-15",
    dueDate: "2023-11-15",
    status: "borrowed",
  },
  {
    id: "5",
    borrowDate: "2023-09-20",
    dueDate: "2023-10-20",
    status: "overdue",
  },
  {
    id: "8",
    borrowDate: "2023-10-05",
    dueDate: "2023-11-05",
    status: "borrowed",
  },
]

export const recentlyReturnedBooks = ["3", "7", "10"]

