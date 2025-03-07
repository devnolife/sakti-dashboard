import type { Book } from "./mock-data"
import { BookListItem } from "./book-list-item"

interface BookListProps {
  books: Book[]
}

export function BookList({ books }: BookListProps) {
  return (
    <div className="space-y-4">
      {books.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </div>
  )
}

