"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { DATA } from "@/lib/data";

export default function Header() {
  const t = useTranslations("nav");
  const tA11y = useTranslations("a11y");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Détecter le scroll pour changer le style du header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { key: "home", href: "/#hero" },
    { key: "skills", href: "/#skills" },
    { key: "experience", href: "/#experience" },
    { key: "projects", href: "/#projects" },
    { key: "blog", href: "/blog" },
    { key: "contact", href: "/#contact" },
  ] as const;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/80 shadow-sm backdrop-blur-md dark:bg-slate-900/80" : "bg-transparent"}`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/#hero" className="flex items-center gap-2 text-xl font-bold tracking-tighter">
          <Code2 className="text-primary-500" />
          <span>
            {DATA.personal.name.split(" ")[0]}
            <span className="text-primary-500">.Dev</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="hover:text-primary-500 text-sm font-medium transition-colors"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        {/* Actions à droite : langue + thème + menu mobile */}
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="focus-visible:ring-primary-500 flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 focus-visible:ring-2 focus-visible:outline-none md:hidden dark:text-slate-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? tA11y("closeMenu") : tA11y("openMenu")}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            id="mobile-nav"
            className="absolute top-16 left-0 w-full border-b border-slate-100 bg-white shadow-xl md:hidden dark:border-slate-800 dark:bg-slate-900"
          >
            <nav className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="border-b border-slate-100 py-2 text-lg font-medium dark:border-slate-800"
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
