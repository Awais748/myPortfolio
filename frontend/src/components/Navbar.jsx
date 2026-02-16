import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out",
          "py-5",
          isScrolled || isMenuOpen
            ? "bg-background/80 backdrop-blur-xl border-b border-primary/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] py-4"
            : "bg-transparent border-transparent"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo with Theme-Aware Professional Aesthetic */}
          <a
            href="#hero"
            className="flex items-baseline group relative z-[110] transition-transform duration-300 active:scale-95"
          >
            <span className="text-2xl font-bold tracking-tighter transition-all duration-300 text-foreground group-hover:text-primary">
              Awais
            </span>
            <span className="ml-1 text-xl font-black uppercase tracking-[0.2em] text-primary transition-all duration-300 group-hover:opacity-80">
              Portfolio
            </span>
          </a>

          {/* Desktop Nav - Professional & High-End */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[12px] font-bold text-foreground/60 hover:text-primary transition-all duration-300 tracking-[0.15em] uppercase group relative"
              >
                {item.name}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Area */}
          <div className="flex items-center gap-5 relative z-[110]">
            <ThemeToggle className="hover:rotate-12 transition-transform duration-300" />

            {/* Minimal Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-primary/5 hover:bg-primary/10 border border-primary/10 text-foreground transition-all active:scale-95"
              aria-label="Toggle Navigation"
            >
              {isMenuOpen ? <X size={22} className="" /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Minimal Blurred Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[90] md:hidden flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        )}
        style={{
          backdropFilter: isMenuOpen ? "blur(60px) saturate(180%)" : "none",
          WebkitBackdropFilter: isMenuOpen
            ? "blur(60px) saturate(180%)"
            : "none",
        }}
      >
        {/* Dynamic Background for Light/Dark Mode */}
        <div className={cn(
          "absolute inset-0 -z-20 transition-colors duration-700",
          isMenuOpen ? "bg-white/70 dark:bg-zinc-950/80" : "bg-transparent"
        )} />
        {/* Subtle Background Glows matching Cosmic Theme */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" />

        <div className="flex flex-col items-center gap-10">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "group relative text-3xl font-medium tracking-[0.15em] text-foreground transition-all duration-500 hover:scale-105 uppercase",
                isMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              )}
              style={{
                transitionDelay: `${index * 80}ms`,
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="bg-gradient-to-r from-foreground/80 to-foreground group-hover:from-primary bg-clip-text group-hover:text-transparent transition-all duration-500">
                {item.name}
              </span>
            </a>
          ))}
        </div>

        {/* Mobile Hire Badge */}
        <div
          className={cn(
            "absolute bottom-20 transition-all duration-1000 delay-500",
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          )}
        >
          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="px-8 py-3 rounded-full bg-foreground text-background font-bold text-sm tracking-widest uppercase hover:scale-105 hover:bg-primary hover:text-white transition-all shadow-2xl"
          >
            Work with me
          </a>
        </div>
      </div>
    </>
  );
};
