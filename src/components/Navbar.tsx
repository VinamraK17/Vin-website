import { Link, NavLink } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

interface NavbarProps {
  mode: "dark" | "light";
  setMode: (mode: "dark" | "light") => void;
}

export default function Navbar({ mode, setMode }: NavbarProps) {
  const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/about" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <nav className="glass-nav px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className="font-display font-bold text-xl tracking-tighter text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
          >
            VK.
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
        
        <div className="flex items-center gap-8">
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
            className="px-4 py-2 bg-[var(--color-ink)] text-[var(--color-surface)] rounded-full text-[11px] font-bold uppercase tracking-wider hover:opacity-90 transition-all font-mono"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </nav>
  );
}
