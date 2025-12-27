import React from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="bg-primary text-primary-foreground p-1.5 rounded-lg group-hover:bg-primary/90 transition-colors">
          <BookOpen size={20} />
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground group-hover:opacity-90 transition-opacity">
          ModernBook
        </span>
      </Link>

      <nav className="flex items-center gap-4">
        <ThemeToggle />
      </nav>
    </div>
  </header>
);

export default Header;
