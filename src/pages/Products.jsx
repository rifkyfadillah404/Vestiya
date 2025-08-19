import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const formatIDR = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(n);

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <p className="text-center">Memuat produk...</p>;
  if (products.length === 0) return <p className="text-center">Tidak ada produk.</p>;

  return (
    <div className="space-y-8">
      <header className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-neutral-900">Katalog Produk</h1>

        <div className="max-w-md mx-auto">
          <input type="text" placeholder="Cari produk..." value={search} onChange={(e) => setSearch(e.target.value)} className="input ring-focus" />
        </div>
      </header>

      {/* List Produk */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-neutral-600">Produk tidak ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <article key={p.id} className="group card card-hover overflow-hidden flex flex-col">
              <Link to={`/products/${p.id}`} className="block aspect-square bg-neutral-100 overflow-hidden">
                <img src={p.image} alt={p.name} className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" loading="lazy" />
              </Link>
              <div className="p-4 space-y-1">
                <h3 className="font-medium text-neutral-900">
                  <Link to={`/products/${p.id}`} className="hover:underline">
                    {p.name}
                  </Link>
                </h3>
                <p className="text-sm text-neutral-600 capitalize">{p.color}</p>
                <p className="text-sm font-semibold text-neutral-900">{formatIDR(p.price)}</p>
                <div className="mt-3 flex items-center gap-2">
                  <button className="btn btn-primary ring-focus" onClick={() => alert(`Ditambahkan ke keranjang: ${p.name}`)}>
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
