import { Link, NavLink } from "react-router-dom";
import React, { useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

interface NavbarProps {
  mode: "dark" | "light";
  setMode: (mode: "dark" | "light") => void;
}

export default function Navbar({ mode, setMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/about" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <nav className="glass-nav px-6 py-4 relative z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="font-display font-bold text-xl tracking-tighter text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
          >
            VK™
          </Link>
          
          {/* Mode Switcher */}
          <div className="flex items-center border border-[var(--color-border)] rounded-full p-1 bg-[var(--color-ink)]/[0.03] backdrop-blur-md shadow-xl shadow-black/10">
            <button 
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              className="p-1.5 rounded-full text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-all flex items-center gap-2 px-3"
              title={mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {mode === "dark" ? (
                <>
                  <Sun className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Dark</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <NavLink 
                key={link.label} 
                to={link.href} 
                className={({ isActive }) => 
                  `text-[11px] uppercase tracking-widest transition-colors ${
                    isActive 
                      ? "text-[var(--color-accent)] font-bold" 
                      : "text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <Link 
            to="/contact" 
            className="hidden md:inline-block px-4 py-2 bg-[var(--color-ink)] text-[var(--color-surface)] rounded-full text-[11px] font-bold uppercase tracking-wider hover:opacity-90 transition-all font-mono"
          >
            Get in touch
          </Link>

          {/* Hamburger Menu Toggle Button (Mobile Only) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-ink)]/[0.05] transition-all text-[var(--color-ink)] focus:outline-none cursor-pointer flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[var(--color-surface)]/95 backdrop-blur-xl border-b border-[var(--color-border)] md:hidden z-40 p-8 flex flex-col gap-6 shadow-2xl transition-all duration-300">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <NavLink 
                key={link.label} 
                to={link.href} 
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => 
                  `text-xs font-mono uppercase tracking-widest transition-all py-3 border-b border-[var(--color-border)]/10 block ${
                    isActive 
                      ? "text-[var(--color-accent)] font-bold" 
                      : "text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          
          <Link 
            to="/contact" 
            onClick={() => setIsOpen(false)}
            className="w-full text-center py-4 bg-[var(--color-ink)] text-[var(--color-surface)] rounded-2xl text-[11px] font-bold uppercase tracking-wider hover:opacity-90 transition-all font-mono"
          >
            Get in touch
          </Link>
        </div>
      )}
    </nav>
  );
}
