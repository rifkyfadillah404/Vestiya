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
          name: p.title || "Untitled Product",
          price: p.price || 0,
          image: p.image || "/vite.svg",
          color: p.category || "uncategorized",
        }));
        setProducts(mapped);
        const cats = Array.from(new Set(mapped.map((p) => p.color)));
        setCategories(cats);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredBySearch = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  const filteredProducts = filteredBySearch.filter((p) => (category === "all" ? true : p.color === category));

  return (
    <div className="space-y-12">
      {/* Header + Search */}
      <header data-reveal className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-sm font-medium">
          <span className="h-2 w-2 rounded-full bg-sky-500"></span>
          Katalog Lengkap
        </div>
        
        <h1 className="text-4xl font-bold text-sky-900">Katalog Produk</h1>
        <p className="text-sky-700 text-lg max-w-2xl mx-auto">
          Pilih style minimalis favoritmu dari koleksi terbaik kami yang dibuat dengan bahan berkualitas.
        </p>

        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Cari produk favoritmu…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input ring-focus pl-12 pr-4 py-3 text-base rounded-xl shadow-sm"
            aria-label="Cari produk"
          />
        </div>

        {/* Category filter */}
        {categories.length > 0 && (
          <div data-reveal data-reveal-delay="120" className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {["all", ...categories].map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    active 
                      ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-md" 
                      : "bg-white text-sky-700 hover:bg-sky-50 border border-sky-200"
                  }`}
                >
                  {c === "all" ? "Semua Kategori" : c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* List Produk */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card p-5 rounded-2xl">
              <div className="aspect-square rounded-xl bg-sky-200 animate-pulse" />
              <div className="mt-5 space-y-3">
                <div className="h-5 w-3/4 rounded bg-sky-200 animate-pulse" />
                <div className="h-5 w-1/2 rounded bg-sky-200 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">😔</div>
          <p className="text-xl text-sky-600">Tidak ada produk tersedia saat ini.</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-xl text-sky-600">Produk tidak ditemukan. Coba kata kunci lain.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((p, i) => (
            <article 
              data-reveal 
              data-reveal-delay={i * 80} 
              key={p.id} 
              className="group relative card overflow-hidden flex flex-col bg-white/90 backdrop-blur rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <Link to={`/products/${p.id}`} className="block relative aspect-square bg-sky-50 overflow-hidden rounded-t-2xl">
                <span className="badge absolute left-4 top-4 capitalize">{p.color}</span>
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 p-4" 
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "/vite.svg"; // Fallback image
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-sky-900/0 group-hover:bg-sky-900/5 transition-colors duration-200 rounded-t-2xl" aria-hidden="true" />
              </Link>
              <div className="p-5 space-y-3">
                <h3 className="font-semibold text-sky-900 line-clamp-2">
                  <Link to={`/products/${p.id}`} className="hover:text-sky-600 transition-colors">
                    {p.name}
                  </Link>
                </h3>
                <p className="text-lg font-bold text-sky-600">{formatIDR(p.price)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button 
                    className="btn btn-primary ring-focus flex-1 justify-center text-sm py-2"
                    onClick={() => push(`Ditambahkan ke keranjang: ${p.name}`, { type: "success" })}
                  >
                    Tambah ke Keranjang
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}