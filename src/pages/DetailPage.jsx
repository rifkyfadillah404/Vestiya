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
 
  const incQty = () => setQty((v) => Math.max(1, v + 1));
  const decQty = () => setQty((v) => Math.max(1, v - 1));
 
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
 
  const stars = Math.round(product.rating?.rate ?? 0);
 
  return (
    <div className="space-y-10">
      {/* Breadcrumbs */}
      <nav className="text-sm text-neutral-600">
        <ol className="flex items-center gap-2">
          <li>
            <Link className="hover:text-neutral-900 inline-flex items-center gap-1" to="/">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
              </svg>
              Home
            </Link>
          </li>
          <li className="text-neutral-400">/</li>
          <li>
            <Link className="hover:text-neutral-900" to="/products">
              Products
            </Link>
          </li>
          {product.category && (
            <>
              <li className="text-neutral-400">/</li>
              <li className="capitalize">{product.category}</li>
            </>
          )}
        </ol>
      </nav>
 
      {/* Main */}
      <section className="grid lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="lg:sticky lg:top-24 card overflow-hidden bg-white/80 backdrop-blur shadow-soft">
          <div className="aspect-square grid place-items-center bg-neutral-50">
            <img src={product.image} alt={product.title} className="h-full w-full object-contain p-6" />
          </div>
        </div>
 
        {/* Details */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {product.category && <span className="badge capitalize">{product.category}</span>}
              <span className="badge">Ready Stock</span>
            </div>
 
            <h1 className="text-3xl font-bold text-neutral-900">{product.title}</h1>
 
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
 
            <p className="text-3xl font-extrabold tracking-tight text-neutral-900">{formatIDR(product.price)}</p>
          </div>
 
          <p className="text-sm leading-7 text-neutral-700">{product.description}</p>
 
          {/* Qty */}
          <div className="flex items-center gap-4">
            <span className="label">Qty</span>
            <div className="inline-flex items-stretch rounded-md border border-neutral-200 overflow-hidden">
              <button type="button" onClick={decQty} className="btn btn-ghost ring-focus !rounded-none border-r border-neutral-200">
                −
              </button>
              <input
                id="qty"
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                className="input ring-focus text-center !rounded-none w-20 border-0"
              />
              <button type="button" onClick={incQty} className="btn btn-ghost ring-focus !rounded-none border-l border-neutral-200">
                +
              </button>
            </div>
          </div>
 
          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={handleAddToCart} className="btn btn-primary ring-focus">
              Tambah ke Keranjang
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l2-7H6.4M7 13L5.4 5M7 13l-2 9m12-9l-2 9M9 22a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </button>
            <button onClick={handleBuyNow} className="btn btn-outline ring-focus">
              Beli Sekarang
            </button>
          </div>
 
          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <span className="badge">Gratis ongkir 500k+</span>
            <span className="badge">Pengembalian 7 hari</span>
          </div>
        </div>
      </section>
    </div>
  );
}
