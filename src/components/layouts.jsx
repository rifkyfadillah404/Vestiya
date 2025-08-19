import Header from "./header.jsx";
import Footer from "./footer.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-800">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 fade-in">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
