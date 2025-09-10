import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../components/toast.jsx";

const formatIDR = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(n);

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { push } = useToast();

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

  const incQty = () => setQty((v) => Math.max(1, v + 1));
  const decQty = () => setQty((v) => Math.max(1, v - 1));

  const handleAddToCart = () => {
    if (!product) return;
    push(`Ditambahkan ke keranjang: ${product.title} x${qty}`, { type: "success" });
  };

  const handleBuyNow = () => {
    if (!product) return;
    push(`Checkout cepat: ${product.title} x${qty}`, { type: "success" });
  };

  if (loading) {
    return (
      <div className="space-y-10">
        <div className="h-5 w-48 bg-slate-200 rounded animate-pulse" />
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="aspect-square rounded-2xl bg-slate-200 animate-pulse" />
          <div className="space-y-6">
            <div className="h-8 w-3/4 bg-slate-200 rounded animate-pulse" />
            <div className="h-5 w-1/2 bg-slate-200 rounded animate-pulse" />
            <div className="h-32 w-full bg-slate-200 rounded animate-pulse" />
            <div className="h-12 w-64 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center space-y-6 py-16">
        <div className="text-6xl mb-4">😔</div>
        <p className="text-xl text-slate-600">{error || "Produk tidak ditemukan."}</p>
        <button
          className="btn btn-outline ring-focus"
          onClick={() => navigate(-1)}
          type="button"
        >
          Kembali
        </button>
      </div>
    );
  }

  const stars = Math.round(product?.rating?.rate ?? 0);

  return (
    <div className="space-y-12">
      {/* Breadcrumbs */}
      <nav data-reveal className="text-sm text-slate-600">
        <ol className="flex items-center gap-2.5">
          <li>
            <Link className="hover:text-indigo-600 inline-flex items-center gap-1.5 transition-colors" to="/">
              <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
              </svg>
              Home
            </Link>
          </li>
          <li className="text-slate-300">/</li>
          <li>
            <Link className="hover:text-indigo-600 transition-colors" to="/products">
              Products
            </Link>
          </li>
          {product.category && (
            <>
              <li className="text-slate-300">/</li>
              <li className="capitalize font-medium text-slate-900">{product.category}</li>
            </>
          )}
        </ol>
      </nav>

      {/* Main */}
      <section className="grid lg:grid-cols-2 gap-12">
        {/* Image */}
        <div data-reveal className="lg:sticky lg:top-28 card overflow-hidden bg-white/90 backdrop-blur rounded-2xl shadow-lg w-full mx-auto max-w-[240px] sm:max-w-[280px] md:max-w-[360px] lg:max-w-none">
          <div className="aspect-square grid place-items-center bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-8">
            <img 
              src={product?.image || "/vite.svg"} 
              alt={product?.title || "Product"} 
              className="h-full w-full object-contain max-h-80" 
              onError={(e) => {
                e.target.src = "/vite.svg"; // Fallback image
              }}
            />
          </div>
        </div>

        {/* Details */}
        <div data-reveal data-reveal-delay="120" className="space-y-8">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              {product?.category && (
                <span className="badge capitalize bg-gradient-to-r from-indigo-100 to-violet-100 border-indigo-200 text-indigo-700">
                  {product.category}
                </span>
              )}
              <span className="badge bg-gradient-to-r from-emerald-100 to-cyan-100 border-emerald-200 text-emerald-700">
                Ready Stock
              </span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900">{product?.title || "Product Title"}</h1>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className={`text-xl ${i <= stars ? "text-amber-400" : "text-slate-300"}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-slate-600">
                {product?.rating?.rate ?? 0} ({product?.rating?.count ?? 0} ulasan)
              </span>
            </div>

            <p className="text-4xl font-extrabold tracking-tight text-indigo-600">{formatIDR(product?.price || 0)}</p>
          </div>

          <div className="card p-6 bg-white/80 backdrop-blur rounded-xl">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Deskripsi</h2>
            <p className="text-slate-700 leading-7">{product?.description || "No description available."}</p>
          </div>

          {/* Qty */}
          <div className="flex items-center gap-5">
            <span className="label text-base">Jumlah</span>
            <div className="inline-flex items-stretch rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <button 
                type="button" 
                onClick={decQty} 
                className="btn btn-ghost ring-focus !rounded-none border-r border-slate-200 px-4 text-lg font-bold"
              >
                −
              </button>
              <input
                id="qty"
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                className="input ring-focus text-center !rounded-none w-20 border-0 font-medium"
              />
              <button 
                type="button" 
                onClick={incQty} 
                className="btn btn-ghost ring-focus !rounded-none border-l border-slate-200 px-4 text-lg font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={handleAddToCart} 
              className="btn btn-primary ring-focus flex-1 justify-center py-3.5 shadow-lg hover:shadow-xl"
            >
              Tambah ke Keranjang
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l2-7H6.4M7 13L5.4 5M7 13l-2 9m12-9l-2 9M9 22a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </button>
            <button 
              onClick={handleBuyNow} 
              className="btn btn-outline ring-focus flex-1 justify-center py-3.5"
            >
              Beli Sekarang
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="badge bg-gradient-to-r from-amber-100 to-orange-100 border-amber-200 text-amber-700">
              Gratis ongkir 500k+
            </span>
            <span className="badge bg-gradient-to-r from-cyan-100 to-blue-100 border-cyan-200 text-cyan-700">
              Pengembalian 7 hari
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}