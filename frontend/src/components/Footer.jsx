import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-card">
      <div className="container py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-xs sm:text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Awais Portfolio. All rights reserved.
        </p>
        <a
          href="#hero"
          aria-label="Back to top"
          className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 hover:scale-110 text-primary transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowUp className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
}
