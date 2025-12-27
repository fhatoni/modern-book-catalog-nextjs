import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems, limit, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / limit);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center space-x-4 my-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-4 py-2 bg-background border border-input rounded-md text-sm font-medium hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      <span className="text-sm font-medium text-muted-foreground">
        Page <span className="text-foreground">{currentPage}</span> of <span className="text-foreground">{totalPages}</span>
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-4 py-2 bg-background border border-input rounded-md text-sm font-medium hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
