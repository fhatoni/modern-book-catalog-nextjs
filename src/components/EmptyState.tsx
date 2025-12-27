import React from "react";

interface EmptyStateProps {
  query: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ query }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <svg className="w-24 h-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Buku Tidak Ditemukan</h2>
      <p className="text-gray-500 max-w-md">
        Kami tidak dapat menemukan buku dengan kata kunci <span className="font-semibold text-gray-700">`{query}`</span>. Coba kata kunci lain.
      </p>
    </div>
  );
};

export default EmptyState;
