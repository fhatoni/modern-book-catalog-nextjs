import React from "react";
import { Category } from "@/types";

interface FilterBarProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="w-full md:w-auto min-w-[200px]">
      <div className="relative">
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full appearance-none bg-background border border-input text-foreground text-sm rounded-md px-4 py-2 pr-8 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all cursor-pointer"
        >
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
