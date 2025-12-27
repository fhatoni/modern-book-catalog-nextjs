import React from "react";
import { Book } from "@/types";
import BookCard from "./BookCard";
import EmptyState from "./EmptyState";

interface BookListProps {
  books: Book[];
  searchQuery: string;
}

const BookList: React.FC<BookListProps> = ({ books, searchQuery }) => {
  if (books.length === 0 && !searchQuery) return null;
  if (books.length === 0) return <EmptyState query={searchQuery} />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
      {books.map((book, index) => {
        const isPriority = index < 4;

        return (
          <BookCard
            key={book.id}
            book={book}
            priority={isPriority}
          />
        );
      })}
    </div>
  );
};

export default BookList;
