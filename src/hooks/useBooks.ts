import { useState, useEffect, useRef } from "react";
import { Book, BooksApiResponse, Category } from "@/types";

interface UseBooksParams {
  currentPage: number;
  limit: number;
  searchQuery: string;
  selectedCategory: string;
  initialBooks?: Book[];
  initialCategories?: Category[];
  initialTotal?: number;
}

const ALL_CATEGORY: Category = { slug: "all", name: "All Categories", url: "" };

export const useBooks = ({
  currentPage,
  limit,
  searchQuery,
  selectedCategory,
  initialBooks = [],
  initialCategories = [ALL_CATEGORY],
  initialTotal = 0,
}: UseBooksParams) => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [loading, setLoading] = useState(initialBooks.length === 0);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(initialTotal);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (initialCategories.length > 1) return;

    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products/categories");
        if (!response.ok) throw new Error("Gagal mengambil data kategori.");

        const rawData = await response.json();

        if (Array.isArray(rawData)) {
          const processedCategories: Category[] = rawData.map((item: any) => {
            if (typeof item === "string") {
              return { slug: item, name: item, url: "" };
            }
            return {
              slug: item.slug || "unknown",
              name: item.name || "Unknown",
              url: item.url || "",
            };
          });

          setCategories([ALL_CATEGORY, ...processedCategories]);
        }
      } catch (err: unknown) {
        console.error("Gagal memuat kategori:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (
      isFirstRender.current &&
      initialBooks.length > 0 &&
      currentPage === 1 &&
      !searchQuery &&
      selectedCategory === "all"
    ) {
      isFirstRender.current = false;
      return;
    }
    isFirstRender.current = false;

    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        let url = `https://dummyjson.com/products`;
        const skip = (currentPage - 1) * limit;

        if (searchQuery) {
          url = `https://dummyjson.com/products/search?q=${searchQuery}`;
        } else if (selectedCategory && selectedCategory !== "all") {
          url = `https://dummyjson.com/products/category/${selectedCategory}`;
        }

        const booksResponse = await fetch(`${url}?limit=${limit}&skip=${skip}`);
        if (!booksResponse.ok) throw new Error("Gagal mengambil data buku.");
        const booksData: BooksApiResponse = await booksResponse.json();

        setBooks(booksData.products);
        setTotalItems(booksData.total);
      } catch (err: unknown) {
        let errorMessage = "Terjadi kesalahan yang tidak diketahui.";
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage, limit, searchQuery, selectedCategory]);

  return { books, categories, loading, error, totalItems };
};
