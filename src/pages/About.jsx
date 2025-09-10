import { useState } from "react";

export default function About() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (values) => {
    const e = {};
    if (!values.name.trim()) e.name = "Nama wajib diisi.";
    if (!values.email.trim()) {
      e.email = "Email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      e.email = "Format email tidak valid.";
    }
    if (!values.message.trim()) e.message = "Pesan wajib diisi.";
    return e;
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(validate({ ...form, [name]: value }));
    }
  };

  const handleBlur = (evt) => {
    const { name } = evt.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const e = validate(form);
    setErrors(e);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(e).length === 0) {
      alert(`Terima kasih, ${form.name}! Pesan kamu telah terkirim:\n\n${form.message}`);
      setForm({ name: "", email: "", message: "" });
      setTouched({});
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-16">
      {/* Left: About */}
      <section data-reveal className="space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
            <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
            Tentang Kami
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Tentang Vestiya</h1>
        </div>
        
        <p className="text-slate-600 text-lg leading-8">
          <span className="font-semibold text-slate-900">Vestiya</span> adalah brand fashion minimalis yang menghadirkan koleksi sederhana namun elegan. 
          Kami percaya gaya terbaik lahir dari kesederhanaan—mudah dipadukan, nyaman dikenakan, dan selalu relevan.
        </p>


        <div className="card p-6 bg-gradient-to-br from-indigo-50 to-violet-50 border-indigo-100 rounded-2xl space-y-5">
          <h2 className="text-xl font-semibold text-slate-900">Informasi Toko</h2>
          <ul className="text-slate-700 space-y-2">
            <li className="flex items-start gap-3">
              <svg className="h-5 w-5 text-indigo-500 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span><span className="font-medium">Lokasi:</span> Jakarta, Indonesia</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="h-5 w-5 text-indigo-500 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span><span className="font-medium">Jam Operasional:</span> Senin - Minggu, 09.00 - 20.00 WIB</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="h-5 w-5 text-indigo-500 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span><span className="font-medium">Email:</span> support@vestiya.id</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="h-5 w-5 text-indigo-500 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span><span className="font-medium">Instagram:</span> @vestiya.id</span>
            </li>
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="badge bg-gradient-to-r from-emerald-100 to-cyan-100 border-emerald-200 text-emerald-700">500+ Pesanan</span>
            <span className="badge bg-gradient-to-r from-amber-100 to-orange-100 border-amber-200 text-amber-700">4.8/5 Rating</span>
            <span className="badge bg-gradient-to-r from-indigo-100 to-violet-100 border-indigo-200 text-indigo-700">Minimal & Modern</span>
          </div>
        </div>
      </section>

      {/* Right: Contact form */}
      <section data-reveal data-reveal-delay="80" className="space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
            <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
            Hubungi Kami
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Kirim Pesan</h2>
          <p className="text-slate-600 mt-2">Punya pertanyaan? Kami siap membantu Anda kapan saja.</p>
        </div>
        
        <form data-reveal data-reveal-delay="120" onSubmit={handleSubmit} noValidate className="card p-8 bg-white/80 backdrop-blur rounded-2xl space-y-6 shadow-lg">
          {/* Name */}
          <div>
            <label htmlFor="name" className="label">Nama Lengkap</label>
            <div className="relative">
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Nama lengkap kamu"
                className={`input ring-focus pl-12 py-3 rounded-xl ${errors.name && touched.name ? "input-invalid" : ""}`}
                aria-invalid={Boolean(errors.name && touched.name)}
              />
            </div>
            {errors.name && touched.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="label">Alamat Email</label>
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="email@domain.com"
                className={`input ring-focus pl-12 py-3 rounded-xl ${errors.email && touched.email ? "input-invalid" : ""}`}
                aria-invalid={Boolean(errors.email && touched.email)}
              />
            </div>
            {errors.email && touched.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="label">Pesan</label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tulis pesan kamu di sini…"
                className={`input ring-focus resize-y pl-12 pt-3 rounded-xl ${errors.message && touched.message ? "input-invalid" : ""}`}
                aria-invalid={Boolean(errors.message && touched.message)}
              />
            </div>
            {errors.message && touched.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-slate-500 text-sm">Kami akan membalas dalam 1x24 jam kerja.</p>
            <button type="submit" className="btn btn-primary ring-focus px-8 py-3 shadow-lg hover:shadow-xl">
              Kirim Pesan
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l18-9-9 18-2-7-7-2z" />
              </svg>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}