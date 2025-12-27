import React, { useState } from "react";
import { useBooks } from "@/hooks/useBooks";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import BookList from "@/components/BookList";
import Pagination from "@/components/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import ControlBar from "@/components/ControlBar";

import { GetStaticProps } from "next";
import { Book, BooksApiResponse, Category } from "@/types";

const ITEMS_PER_PAGE = 12;

interface HomeProps {
  initialBooks: Book[];
  initialCategories: Category[];
  initialTotal: number;
}

const BookCatalogPage = ({ initialBooks, initialCategories, initialTotal }: HomeProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { books, categories, loading, error, totalItems } = useBooks({
    currentPage,
    limit: ITEMS_PER_PAGE,
    searchQuery,
    selectedCategory,
    initialBooks,
    initialCategories,
    initialTotal,
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <main className="container mx-auto px-4 pb-12">
      <ControlBar>
        <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </ControlBar>

      {loading && <LoadingSpinner />}
      {error && <p className="text-center text-destructive mt-8">{error}</p>}
      {!loading && !error && <BookList books={books} searchQuery={searchQuery} />}

      {!loading && !error && books.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          limit={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [booksRes, categoriesRes] = await Promise.all([
      fetch(`https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=0`),
      fetch("https://dummyjson.com/products/categories"),
    ]);

    const booksData: BooksApiResponse = await booksRes.json();
    const rawCategories = await categoriesRes.json();

    let processedCategories: Category[] = [];
    if (Array.isArray(rawCategories)) {
      processedCategories = rawCategories.map((item: any) => {
        if (typeof item === "string") {
          return { slug: item, name: item, url: "" };
        }
        return {
          slug: item.slug || "unknown",
          name: item.name || "Unknown",
          url: item.url || "",
        };
      });
    }

    const allCategory: Category = { slug: "all", name: "All Categories", url: "" };

    return {
      props: {
        initialBooks: booksData.products || [],
        initialCategories: [allCategory, ...processedCategories],
        initialTotal: booksData.total || 0,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching initial data:", error);
    const allCategory: Category = { slug: "all", name: "All Categories", url: "" };
    return {
      props: {
        initialBooks: [],
        initialCategories: [allCategory],
        initialTotal: 0,
      },
    };
  }
};

export default BookCatalogPage;
