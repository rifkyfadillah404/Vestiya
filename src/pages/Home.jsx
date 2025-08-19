import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

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
      <section className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-300 border-y border-neutral-300 py-16 px-4 sm:px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 tracking-tight">Vestiya</h1>
        <p className="mt-4 text-neutral-700 max-w-2xl mx-auto">
          Temukan gaya sederhana yang elegan bersama <span className="font-semibold">Vestiya</span>. Koleksi fashion modern dengan sentuhan minimalis, nyaman dipakai, dan mudah dipadukan untuk setiap kesempatan.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link to="/products" className="inline-flex items-center justify-center rounded-md bg-neutral-500 text-white px-5 py-2.5 text-sm font-medium hover:bg-neutral-700">
            Belanja Sekarang
          </Link>
          <a href="#highlight" className="inline-flex items-center justify-center rounded-md border border-neutral-400 text-neutral-800 px-5 py-2.5 text-sm font-medium hover:bg-neutral-200/60">
            Lihat Keunggulan
          </a>
        </div>
      </section>

      {/* Highlight section */}
      <section id="highlight" className="grid sm:grid-cols-3 gap-6">
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-xl">🚚</div>
          <h3 className="mt-3 font-semibold text-neutral-900">Pengiriman Cepat</h3>
          <p className="mt-1 text-sm text-neutral-600">Order diproses 1x24 jam, pengiriman ke seluruh Indonesia.</p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-xl">🧵</div>
          <h3 className="mt-3 font-semibold text-neutral-900">Bahan Berkualitas</h3>
          <p className="mt-1 text-sm text-neutral-600">Material nyaman dan tahan lama dengan warna netral elegan.</p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-xl">💬</div>
          <h3 className="mt-3 font-semibold text-neutral-900">Dukungan Pelanggan</h3>
          <p className="mt-1 text-sm text-neutral-600">Tim kami siap membantu melalui chat setiap hari.</p>
        </div>
      </section>

      {/* Featured section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-semibold text-neutral-900">Produk Unggulan</h2>
          <Link to="/products" className="text-sm text-neutral-700 hover:text-neutral-900">
            Lihat semua →
          </Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid sm:grid-cols-3 gap-6">
            {featured.map((p) => (
              <article key={p.id} className="group rounded-xl border border-neutral-200 bg-neutral-50 overflow-hidden transition-colors hover:bg-neutral-100 hover:border-neutral-300">
                <div className="aspect-square overflow-hidden bg-neutral-200">
                  <img src={p.image} alt={p.title} className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-neutral-900">{p.title}</h3>
                  <p className="mt-1 text-sm text-neutral-600">${p.price}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
