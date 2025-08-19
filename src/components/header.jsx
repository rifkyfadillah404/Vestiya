import { NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) => "px-3 py-2 rounded-md text-sm font-medium " + (isActive ? "bg-neutral-200 text-neutral-900" : "text-neutral-700 hover:bg-neutral-100");

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <NavLink to="/" className="text-xl font-semibold text-neutral-900">
            Vestiya
          </NavLink>
          <nav className="flex gap-1">
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
        </div>
      </div>
    </header>
  );
}
