import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ArrowLeft, ShoppingCart, Heart, Share2 } from "lucide-react";
import { Book } from "@/types";

interface BookDetailProps {
  book: Book;
}

const BookDetail: React.FC<BookDetailProps> = ({ book }) => {
  const router = useRouter();
  const author = book.brand || "Unknown Author";
  const isInStock = book.availabilityStatus === "In Stock";

  const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto p-4 md:p-8 bg-background min-h-[calc(100vh-64px)]">
      <button
        onClick={() => router.back()}
        className="group flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <div className="p-2 rounded-full bg-secondary group-hover:bg-primary/10 transition-colors">
          <ArrowLeft size={20} />
        </div>
        <span className="font-medium">Kembali</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative w-full aspect-square md:h-[500px] bg-secondary/30 rounded-2xl overflow-hidden border border-border">
          <Image
            src={book.thumbnail}
            alt={book.title}
            fill
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "contain" }}
            className="p-4 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-foreground tracking-tight">
              {book.title}
            </h1>
            <p className="text-xl text-muted-foreground font-medium">by {author}</p>
          </div>

          <div className="flex items-center mb-6 gap-4">
            <div className="flex items-center gap-1">
              <span className="flex text-yellow-400 text-xl">{renderRating(Math.round(book.rating))}</span>
              <span className="font-bold ml-2 text-foreground">{book.rating}</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <span className="text-muted-foreground">
              {book.reviews.length} Ulasan
            </span>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl font-bold text-primary">${book.price}</span>
            <span
              className={`text-sm font-semibold px-4 py-1.5 rounded-full border ${isInStock
                ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                : "bg-red-100 text-red-700 border-red-200"
                }`}
            >
              {isInStock ? "Tersedia" : "Stok Habis"}
            </span>
          </div>

          <p className="text-lg text-foreground/80 leading-relaxed mb-8">
            {book.description}
          </p>

          <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-border mb-8">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Kategori</p>
              <p className="font-medium text-foreground">{book.category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Stok</p>
              <p className="font-medium text-foreground">{book.stock} Unit</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">SKU</p>
              <p className="font-medium text-foreground">{book.sku}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pengiriman</p>
              <p className="font-medium text-foreground">{book.shippingInformation}</p>
            </div>
          </div>

          <div className="mt-auto flex flex-col sm:flex-row gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground h-12 rounded-xl font-semibold hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20">
              <ShoppingCart size={20} />
              Keranjang
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground h-12 rounded-xl font-semibold hover:bg-secondary/80 transition-all active:scale-[0.98] border border-border">
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
