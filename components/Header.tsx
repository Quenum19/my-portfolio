"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useContent } from "@/components/ContentProvider";
import { useActiveSection } from "@/lib/useActiveSection";

const navLinks = [
  { key: "home", href: "/#hero", section: "hero" },
  { key: "skills", href: "/#skills", section: "skills" },
  { key: "experience", href: "/#experience", section: "experience" },
  { key: "projects", href: "/#projects", section: "projects" },
  { key: "blog", href: "/blog", section: null },
  { key: "contact", href: "/#contact", section: "contact" },
] as const;

const SECTION_IDS: string[] = navLinks
  .map((l) => l.section)
  .filter((s): s is NonNullable<typeof s> => s !== null);

export default function Header() {
  const t = useTranslations("nav");
  const tA11y = useTranslations("a11y");
  const DATA = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  // Monogramme (SQ) + nom court (prénom + nom) dérivés du nom complet.
  const parts = DATA.personal.name.trim().split(/\s+/).filter(Boolean);
  const initials = ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
  const shortName =
    parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1]}` : DATA.personal.name;

  // Détecter le scroll pour changer le style du header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/80 shadow-sm backdrop-blur-md dark:bg-slate-900/80" : "bg-transparent"}`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo : monogramme + nom */}
        <Link href="/#hero" className="flex items-center gap-2.5 font-bold tracking-tight">
          <span className="from-primary-500 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br to-purple-600 text-sm font-extrabold text-white shadow-sm">
            {initials}
          </span>
          <span className="text-lg">{shortName}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = link.section !== null && active === link.section;
            return (
              <Link
                key={link.key}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`hover:text-primary-500 relative text-sm font-medium transition-colors ${
                  isActive ? "text-primary-500" : ""
                }`}
              >
                {t(link.key)}
                <span
                  className={`bg-primary-500 absolute -bottom-1.5 left-0 h-0.5 rounded-full transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
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
