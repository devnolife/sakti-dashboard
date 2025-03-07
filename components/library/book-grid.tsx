import type { Book } from "./mock-data"
import { BookCard } from "./book-card"

interface BookGridProps {
  books: Book[]
}

export function BookGrid({ books }: BookGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}

