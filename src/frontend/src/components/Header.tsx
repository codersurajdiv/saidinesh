import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Research", href: "#research" },
  { label: "Publications", href: "#publications" },
  { label: "Teaching", href: "#teaching" },
  { label: "CV", href: "#cv" },
  { label: "Contact", href: "#contact" },
];

interface HeaderProps {
  onAdminClick: () => void;
}

export default function Header({ onAdminClick }: HeaderProps) {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => l.href.replace("#", ""))
      .filter((id) => document.getElementById(id));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const label = navLinks.find(
              (l) => l.href === `#${entry.target.id}`,
            )?.label;
            if (label) setActive(label);
          }
        }
      },
      { threshold: 0.3 },
    );

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-xs border-b border-border" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="font-serif text-lg font-normal tracking-wide text-foreground hover:text-teal transition-colors"
          data-ocid="header.link"
        >
          SAI DINESH KANCHARANA
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-ocid={`nav.${link.label.toLowerCase()}.link`}
              onClick={() => setActive(link.label)}
              className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-teal ${
                active === link.label ? "text-teal" : "text-foreground/70"
              }`}
            >
              {link.label}
              {active === link.label && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-teal"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md text-foreground/70 hover:text-foreground"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          data-ocid="header.toggle"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-white overflow-hidden"
          >
            <nav className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                  onClick={() => {
                    setActive(link.label);
                    setMobileOpen(false);
                  }}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    active === link.label
                      ? "text-teal bg-teal/5"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onAdminClick();
                }}
                className="px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground text-left"
                data-ocid="header.admin.button"
              >
                Admin
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
