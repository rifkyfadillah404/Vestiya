import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const formatIDR = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(n);

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!active) return;
        setProduct(res.data);
      })
      .catch(() => {
        if (!active) return;
        setError("Gagal memuat produk.");
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    alert(`Ditambahkan ke keranjang: ${product.title} x${qty}`);
  };

  const handleBuyNow = () => {
    if (!product) return;
    alert(`Checkout cepat: ${product.title} x${qty}`);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-4 w-40 bg-neutral-200 rounded animate-pulse" />
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="aspect-square rounded-xl bg-neutral-200 animate-pulse" />
          <div className="space-y-4">
            <div className="h-6 w-3/4 bg-neutral-200 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-neutral-200 rounded animate-pulse" />
            <div className="h-24 w-full bg-neutral-200 rounded animate-pulse" />
            <div className="h-10 w-64 bg-neutral-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center space-y-4">
        <p className="text-neutral-700">{error || "Produk tidak ditemukan."}</p>
        <button className="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-100" onClick={() => navigate(-1)}>
          Kembali
        </button>
      </div>
    );
  }

  const stars = Math.round(product.rating?.rate ?? 0);

  return (
    <div className="space-y-10">
      {/* Breadcrumbs */}
      <nav className="text-sm text-neutral-600">
        <ol className="flex items-center gap-2">
          <li>
            <Link className="hover:text-neutral-900" to="/">
              Home
            </Link>
          </li>
          <li>›</li>
          <li>
            <Link className="hover:text-neutral-900" to="/products">
              Products
            </Link>
          </li>
          {product.category && (
            <>
              <li>›</li>
              <li className="capitalize">{product.category}</li>
            </>
          )}
          <li className="sr-only">›</li>
        </ol>
      </nav>

      {/* Main */}
      <section className="grid lg:grid-cols-2 gap-8">
        <div className="w-110 h-110 aspect-square rounded-lg bg-neutral-100 overflow-hidden">
          <img src={product.image} alt={product.title} className="h-full w-full object-contain" />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-neutral-900">{product.title}</h1>
            <div className="flex items-center gap-3 text-sm text-neutral-600">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className={i <= stars ? "text-yellow-500" : "text-neutral-300"}>
                    ★
                  </span>
                ))}
              </div>
              <span>
                {product.rating?.rate ?? 0} ({product.rating?.count ?? 0})
              </span>
            </div>
            <p className="text-2xl font-bold text-neutral-900">{formatIDR(product.price)}</p>
          </div>

          <p className="text-sm leading-6 text-neutral-700">{product.description}</p>

          <div className="flex items-center gap-3">
            <label htmlFor="qty" className="text-sm text-neutral-700">
              Qty
            </label>
            <input
              id="qty"
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              className="w-20 rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button onClick={handleAddToCart} className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-neutral-800">
              Tambah ke Keranjang
            </button>
            <button onClick={handleBuyNow} className="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium hover:bg-neutral-100">
              Beli Sekarang
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
