// src/pages/books/[id].tsx
import { GetServerSideProps, GetServerSidePropsContext } from "next"; // 1. Import tipe context
import { Book } from "@/types";
import BookDetail from "@/components/BookDetail";

interface BookDetailPageProps {
  book?: Book;
  error?: string;
}

const BookDetailPage: React.FC<BookDetailPageProps> = ({ book, error }) => {
  if (error || !book) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-red-500">Buku tidak ditemukan</h1>
        <p>Maaf, buku yang Anda cari tidak ada dalam katalog kami.</p>
      </div>
    );
  }

  return <BookDetail book={book} />;
};

export default BookDetailPage;

// 2. Gunakan tipe yang lebih eksplisit untuk context
export const getServerSideProps: GetServerSideProps<BookDetailPageProps> = async (context: GetServerSidePropsContext) => {
  const { params } = context;

  // 3. Lakukan pengecekan yang sangat ketat
  if (!params || !params.id || Array.isArray(params.id)) {
    return { props: { error: "ID buku tidak valid" } };
  }

  // 4. Sekarang TypeScript 100% yakin 'params.id' adalah string
  const id = params.id;

  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return { props: { error: "Buku tidak ditemukan" } };
      }
      throw new Error("Gagal mengambil data buku dari server.");
    }

    const book: Book = await response.json();

    return {
      props: { book },
    };
  } catch (err: unknown) {
    let errorMessage = "Terjadi kesalahan internal server.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return {
      props: { error: errorMessage },
    };
  }
};
