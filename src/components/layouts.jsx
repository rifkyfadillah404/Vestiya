import Header from "./header.jsx";
import Footer from "./footer.jsx";
import { Outlet } from "react-router-dom";
import ScrollReveal from "./scroll-reveal.jsx";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800">
      <Header />
      <ScrollReveal />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 fade-in">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}