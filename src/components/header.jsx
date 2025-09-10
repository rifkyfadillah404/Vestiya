import { NavLink } from "react-router-dom";
import { useState } from "react";

const navLinkClass = ({ isActive }) =>
  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 " +
  (isActive 
    ? "bg-sky-500 text-white shadow-lg shadow-sky-200" 
    : "text-sky-800 hover:text-sky-600 hover:bg-sky-50");

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-sky-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-18 flex items-center justify-between">
          <NavLink 
            to="/" 
            className="group inline-flex items-center gap-2.5 text-2xl font-bold tracking-tight text-sky-900" 
            onClick={close}
          >
            <span className="inline-block h-3 w-3 rounded-full bg-gradient-to-r from-sky-400 to-sky-600 transition-transform group-hover:scale-110 shadow-md" aria-hidden="true" />
            <span className="bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
              Vestiya
            </span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden sm:flex gap-1">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              Products
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </nav>

          {/* Mobile toggle */}
          <button
            className="sm:hidden btn btn-ghost ring-focus p-2"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={toggle}
            aria-label="Toggle menu"
            type="button"
          >
            <svg
              className="icon w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <nav id="mobile-nav" className="sm:hidden pb-4 fade-in">
            <div className="pt-2 border-t border-sky-200">
              <div className="flex flex-col space-y-1">
                <NavLink to="/" className={navLinkClass} end onClick={close}>
                  Home
                </NavLink>
                <NavLink to="/products" className={navLinkClass} onClick={close}>
                  Products
                </NavLink>
                <NavLink to="/about" className={navLinkClass} onClick={close}>
                  About
                </NavLink>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}