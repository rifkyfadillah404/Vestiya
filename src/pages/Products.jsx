import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useToast } from "../components/toast.jsx";
 
const formatIDR = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(n);
 
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const { push } = useToast();
 
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        const mapped = res.data.map((p) => ({
          id: p.id,
          name: p.title,
          price: p.price,
          image: p.image,
          color: p.category,
        }));
        setProducts(mapped);
        const cats = Array.from(new Set(mapped.map((p) => p.color)));
        setCategories(cats);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);
 
  const filteredBySearch = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  const filteredProducts = filteredBySearch.filter((p) => (category === "all" ? true : p.color === category));
 
  return (
    <div className="space-y-8">
      {/* Header + Search */}
      <header data-reveal className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-neutral-900">Katalog Produk</h1>
        <p className="text-neutral-600 text-sm">Pilih style minimalis favoritmu dari koleksi terbaik kami.</p>
 
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Cari produk…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input ring-focus pl-9"
            aria-label="Cari produk"
          />
        </div>
 
        {/* Category filter */}
        {categories.length > 0 && (
          <div data-reveal data-reveal-delay="120" className="flex flex-wrap items-center gap-2 justify-center pt-1">
            {["all", ...categories].map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`btn btn-ghost ring-focus rounded-full border ${active ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-200 text-neutral-700 hover:bg-neutral-100"}`}
                >
                  {c === "all" ? "Semua" : c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              );
            })}
          </div>
        )}
      </header>
 
      {/* List Produk */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card p-4">
              <div className="aspect-square rounded-md bg-neutral-200 animate-pulse" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-3/4 rounded bg-neutral-200 animate-pulse" />
                <div className="h-4 w-1/2 rounded bg-neutral-200 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-center">Tidak ada produk.</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-neutral-600">Produk tidak ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p, i) => (
            <article data-reveal data-reveal-delay={i * 80} key={p.id} className="group relative card card-hover overflow-hidden flex flex-col bg-white/80 backdrop-blur">
              <Link to={`/products/${p.id}`} className="block relative aspect-square bg-neutral-100 overflow-hidden">
                <span className="badge absolute left-3 top-3 capitalize">{p.color}</span>
                <img src={p.image} alt={p.name} className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                <div className="pointer-events-none absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-colors duration-200" aria-hidden="true" />
              </Link>
              <div className="p-4 space-y-1">
                <h3 className="font-medium text-neutral-900">
                  <Link to={`/products/${p.id}`} className="hover:underline">
                    {p.name}
                  </Link>
                </h3>
                <p className="text-sm font-semibold text-neutral-900">{formatIDR(p.price)}</p>
                <div className="mt-3 flex items-center gap-2">
                  <button className="btn btn-primary ring-focus" onClick={() => push(`Ditambahkan ke keranjang: ${p.name}`, { type: "success" })}>
                    Tambah ke Keranjang
                  </button>
                  <Link to={`/products/${p.id}`} className="btn btn-outline ring-focus">
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
