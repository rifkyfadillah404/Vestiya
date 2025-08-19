export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-600">© {new Date().getFullYear()} Vestiya. All rights reserved.</p>
        <div className="flex items-center gap-4 text-sm">
          <a className="text-neutral-600 hover:text-neutral-900" href="#" aria-label="Instagram">Instagram</a>
          <a className="text-neutral-600 hover:text-neutral-900" href="#" aria-label="Facebook">Facebook</a>
          <a className="text-neutral-600 hover:text-neutral-900" href="#" aria-label="Twitter">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
