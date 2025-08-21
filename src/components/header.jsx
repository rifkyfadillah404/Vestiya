import { NavLink } from "react-router-dom";
import { useState } from "react";
 
const navLinkClass = ({ isActive }) =>
  "px-3 py-2 rounded-full text-sm font-medium transition-colors " +
  (isActive ? "bg-neutral-900 text-white" : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100");
 
export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);
 
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <NavLink to="/" className="group inline-flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-900" onClick={close}>
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-neutral-900 transition-transform group-hover:scale-110" aria-hidden="true" />
            Vestiya
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
            className="sm:hidden btn btn-ghost ring-focus"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={toggle}
            aria-label="Toggle menu"
            type="button"
          >
            <svg
              className="icon"
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
          <nav id="mobile-nav" className="sm:hidden fade-in">
            <div className="py-3 border-t border-neutral-200">
              <div className="flex flex-col">
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
