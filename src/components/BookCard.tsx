import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Book } from "@/types";
import { Star } from "lucide-react";

interface BookCardProps {
  book: Book;
  priority?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, priority = false }) => {
  const author = book.brand || "Unknown Author";
  const isInStock = book.availabilityStatus === "In Stock";

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={`${i < Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted-foreground/30"
              }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Link href={`/books/${book.id}`} className="group h-full block">
      <div className="h-full flex flex-col bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div className="relative aspect-[3/4] w-full bg-muted overflow-hidden">
          <Image
            src={book.thumbnail}
            alt={book.title}
            fill
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
          {!isInStock && (
            <div className="absolute top-2 right-2 bg-destructive/90 text-destructive-foreground text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
              Out of Stock
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow gap-2">
          <div className="flex-grow space-y-1">
            <h3 className="font-semibold text-lg text-card-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground font-medium">{author}</p>
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {book.description}
            </p>

            <div className="flex items-end justify-between border-t border-border pt-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg text-primary">${book.price}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  {renderRating(book.rating)}
                  <span className="text-[10px] leading-none">({book.rating})</span>
                </div>
              </div>

              {isInStock && (
                <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                  In Stock
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
