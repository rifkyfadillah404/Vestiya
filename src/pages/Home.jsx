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
    <div className="space-y-16">
      {/* Hero section */}
      <section className="hero-edge relative overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-neutral-200 border-y border-neutral-200 py-20 px-4 sm:px-6">
        {/* Decorative background */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-neutral-300/40 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-neutral-200/60 blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">

          <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold text-neutral-900 tracking-tight">
            Vestiya
          </h1>
          <p className="mt-4 text-neutral-700">
            Temukan gaya sederhana yang elegan bersama <span className="font-semibold">Vestiya</span>. Koleksi fashion modern dengan sentuhan minimalis, nyaman dipakai, dan mudah dipadukan untuk setiap kesempatan.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Link to="/products" className="btn btn-primary ring-focus">
              Belanja Sekarang
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a href="#highlight" className="btn btn-outline ring-focus">
              Lihat Keunggulan
            </a>
          </div>
        </div>
      </section>

      {/* Highlight section */}
      <section id="highlight" className="grid sm:grid-cols-3 gap-6">
        <div className="group card card-hover p-6 bg-white/80 backdrop-blur">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 border border-neutral-200 text-xl">🚚</div>
          <h3 className="mt-3 font-semibold text-neutral-900">Pengiriman Cepat</h3>
          <p className="mt-1 text-sm text-neutral-600">Order diproses 1x24 jam, pengiriman ke seluruh Indonesia.</p>
        </div>
        <div className="group card card-hover p-6 bg-white/80 backdrop-blur">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 border border-neutral-200 text-xl">🧵</div>
          <h3 className="mt-3 font-semibold text-neutral-900">Bahan Berkualitas</h3>
          <p className="mt-1 text-sm text-neutral-600">Material nyaman dan tahan lama dengan warna netral elegan.</p>
        </div>
        <div className="group card card-hover p-6 bg-white/80 backdrop-blur">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 border border-neutral-200 text-xl">💬</div>
          <h3 className="mt-3 font-semibold text-neutral-900">Dukungan Pelanggan</h3>
          <p className="mt-1 text-sm text-neutral-600">Tim kami siap membantu melalui chat setiap hari.</p>
        </div>
      </section>

      {/* Featured section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">Produk Unggulan</h2>
            <p className="text-sm text-neutral-600">Pilihan terbaik dari koleksi kami.</p>
          </div>
          <Link to="/products" className="text-sm text-neutral-700 hover:text-neutral-900 inline-flex items-center gap-1">
            Lihat semua
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-4">
                <div className="aspect-square rounded-md bg-neutral-200 animate-pulse" />
                <div className="mt-4 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-neutral-200 animate-pulse" />
                  <div className="h-4 w-1/2 rounded bg-neutral-200 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-3 gap-6">
            {featured.map((p) => (
              <article key={p.id} className="group relative card card-hover overflow-hidden">
                <div className="aspect-square overflow-hidden bg-neutral-100">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-neutral-900">{p.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-neutral-900">{formatIDR(p.price)}</p>
                </div>
                <div className="pointer-events-none absolute inset-0 grid place-items-center bg-neutral-900/0 transition-colors duration-200 group-hover:bg-neutral-900/5" aria-hidden="true" />
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
