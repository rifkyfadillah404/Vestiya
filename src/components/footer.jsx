export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/90 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="inline-block h-3 w-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" aria-hidden="true" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Vestiya
              </span>
            </div>
            <p className="text-slate-600 max-w-md mb-6">
              Brand fashion minimalis yang menghadirkan koleksi sederhana namun elegan. 
              Gaya terbaik lahir dari kesederhanaan—mudah dipadukan, nyaman dikenakan, dan selalu relevan.
            </p>
            <div className="flex items-center gap-3">
              <a className="btn btn-ghost ring-focus p-3 rounded-xl" href="#" aria-label="Instagram">
                <svg className="icon w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a className="btn btn-ghost ring-focus p-3 rounded-xl" href="#" aria-label="Facebook">
                <svg className="icon w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.02 3.66 9.19 8.44 10v-7.07H7.9V12.1h2.54V9.97c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.89h-2.34V22c4.78-.81 8.44-4.98 8.44-9.94z"/>
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a className="btn btn-ghost ring-focus p-3 rounded-xl" href="#" aria-label="Twitter">
                <svg className="icon w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M21.54 7.2c.01.16.01.33.01.49 0 5.04-3.84 10.85-10.85 10.85-2.16 0-4.17-.63-5.86-1.72.3.03.6.05.91.05 1.79 0 3.44-.61 4.75-1.63a3.83 3.83 0 0 1-3.57-2.65c.24.04.49.07.75.07.36 0 .71-.05 1.04-.14A3.82 3.82 0 0 1 5.3 9.74v-.05c.52.29 1.12.47 1.76.49A3.82 3.82 0 0 1 5.9 6.3c0-.01 0-.03 0-.04a10.84 10.84 0 0 0 7.86 3.99c-.02-.16-.03-.32-.03-.48a3.82 3.82 0 0 1 6.61-2.61 7.54 7.54 0 0 0 2.42-.92 3.82 3.82 0 0 1-1.68 2.11A7.63 7.63 0 0 0 22 6.9a8.13 8.13 0 0 1-2.03 2.1z"/>
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Navigasi</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-slate-600 hover:text-indigo-600 transition-colors">Beranda</a></li>
              <li><a href="/products" className="text-slate-600 hover:text-indigo-600 transition-colors">Produk</a></li>
              <li><a href="/about" className="text-slate-600 hover:text-indigo-600 transition-colors">Tentang Kami</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Bantuan</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">Pengiriman</a></li>
              <li><a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">Pengembalian</a></li>
              <li><a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">Kontak</a></li>
            </ul>
          </div>
        </div>

        <div className="divider my-10"></div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-slate-600">© {new Date().getFullYear()} Vestiya. All rights reserved.</p>
            <p className="text-xs text-slate-500 mt-1">Gaya minimal untuk keseharianmu.</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}