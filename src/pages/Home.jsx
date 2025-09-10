import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const formatIDR = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(n);

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products?limit=3")
      .then((res) => {
        setFeatured(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-20">
      {/* Hero section */}
      <section className="hero-edge relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50 border-y border-sky-200 py-24 px-4 sm:px-6">
        {/* Decorative background elements */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-gradient-to-r from-sky-200/30 to-blue-200/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-gradient-to-r from-cyan-200/30 to-sky-200/30 blur-3xl" />
          <div className="absolute top-1/3 left-1/2 h-40 w-40 rounded-full bg-gradient-to-r from-amber-200/40 to-orange-200/40 blur-2xl" />
        </div>

        <div data-reveal className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-sm font-medium mb-6">
            <span className="h-2 w-2 rounded-full bg-sky-500"></span>
            Fashion Minimalis Terbaik
          </div>

          <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold text-sky-900 tracking-tight">
            <span className="block">Temukan Gaya</span>
            <span className="gradient-text block">Sederhana yang Elegan</span>
          </h1>
          
          <p className="mt-6 text-xl text-sky-700 max-w-2xl mx-auto">
            Koleksi fashion modern dengan sentuhan minimalis, nyaman dipakai, dan mudah dipadukan untuk setiap kesempatan.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link 
              to="/products" 
              className="btn btn-primary ring-focus shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Belanja Sekarang
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a 
              href="#highlight" 
              className="btn btn-outline ring-focus shadow hover:shadow-md"
            >
              Lihat Keunggulan
            </a>
          </div>
        </div>
      </section>

      {/* Highlight section */}
      <section id="highlight" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-8">
          <div data-reveal data-reveal-delay="0" className="group card card-hover p-8 bg-white/80 backdrop-blur rounded-2xl">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-blue-100 border border-sky-200 text-2xl shadow-md">
              🚚
            </div>
            <h3 className="mt-5 text-xl font-semibold text-sky-900">Pengiriman Cepat</h3>
            <p className="mt-3 text-sky-700">Order diproses 1x24 jam, pengiriman ke seluruh Indonesia dengan kurir terpercaya.</p>
          </div>
          <div data-reveal data-reveal-delay="120" className="group card card-hover p-8 bg-white/80 backdrop-blur rounded-2xl">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 to-sky-100 border border-cyan-200 text-2xl shadow-md">
              👘
            </div>
            <h3 className="mt-5 text-xl font-semibold text-sky-900">Bahan Berkualitas</h3>
            <p className="mt-3 text-sky-700">Material nyaman dan tahan lama dengan warna netral elegan yang tidak mudah pudar.</p>
          </div>
          <div data-reveal data-reveal-delay="240" className="group card card-hover p-8 bg-white/80 backdrop-blur rounded-2xl">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200 text-2xl shadow-md">
              💬
            </div>
            <h3 className="mt-5 text-xl font-semibold text-sky-900">Dukungan Pelanggan</h3>
            <p className="mt-3 text-sky-700">Tim kami siap membantu melalui chat setiap hari dengan respon cepat dan ramah.</p>
          </div>
        </div>
      </section>

      {/* Featured section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div data-reveal className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-sky-900">Produk Unggulan</h2>
            <p className="mt-2 text-lg text-sky-700">Pilihan terbaik dari koleksi kami yang paling diminati.</p>
          </div>
          <Link 
            to="/products" 
            className="text-base font-medium text-sky-600 hover:text-sky-800 inline-flex items-center gap-2 transition-colors"
          >
            Lihat semua
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-6 rounded-2xl">
                <div className="aspect-square rounded-xl bg-sky-200 animate-pulse" />
                <div className="mt-6 space-y-3">
                  <div className="h-5 w-3/4 rounded bg-sky-200 animate-pulse" />
                  <div className="h-5 w-1/2 rounded bg-sky-200 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-3 gap-8">
            {featured.map((p, i) => (
              <article 
                data-reveal 
                data-reveal-delay={i * 100} 
                key={p.id} 
                className="group relative card card-hover overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-square overflow-hidden bg-sky-100 rounded-t-2xl">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-sky-900 line-clamp-1">{p.title}</h3>
                  <p className="mt-2 text-lg font-bold text-sky-600">{formatIDR(p.price)}</p>
                  <Link 
                    to={`/products/${p.id}`} 
                    className="btn btn-outline ring-focus mt-4 w-full justify-center text-sm py-2"
                  >
                    Lihat Detail
                  </Link>
                </div>
                <div className="pointer-events-none absolute inset-0 grid place-items-center bg-sky-900/0 transition-colors duration-200 group-hover:bg-sky-900/5 rounded-2xl" aria-hidden="true" />
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}