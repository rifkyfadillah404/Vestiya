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
    <div className="grid lg:grid-cols-2 gap-10">
      {/* Left: About */}
      <section data-reveal className="space-y-4">
        <h1 className="text-3xl font-bold text-neutral-900">Tentang Vestiya</h1>
        <p className="text-neutral-600">
          <span className="font-semibold">Vestiya</span> adalah brand fashion minimalis yang menghadirkan koleksi sederhana namun elegan.
          Kami percaya gaya terbaik lahir dari kesederhanaan—mudah dipadukan, nyaman dikenakan, dan selalu relevan.
        </p>
 
        <div className="card p-6 bg-white/80 backdrop-blur space-y-4">
          <h2 className="text-lg font-semibold text-neutral-900">Informasi Toko</h2>
          <ul className="text-neutral-700 text-sm space-y-1">
            <li>• Lokasi: Jakarta, Indonesia</li>
            <li>• Jam Operasional: Senin - Minggu, 09.00 - 20.00 WIB</li>
            <li>• Email: support@Vestiya.id</li>
            <li>• Instagram: @Vestiya.id</li>
          </ul>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="badge">500+ Pesanan</span>
            <span className="badge">4.8/5 Rating</span>
            <span className="badge">Minimal & Modern</span>
          </div>
        </div>
      </section>
 
      {/* Right: Contact form */}
      <section data-reveal data-reveal-delay="80" className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-900">Hubungi Kami</h2>
        <form data-reveal data-reveal-delay="120" onSubmit={handleSubmit} noValidate className="card p-6 bg-white/80 backdrop-blur space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="label">Nama</label>
            <div className="relative">
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Nama lengkap"
                className={`input ring-focus pl-9 ${errors.name && touched.name ? "input-invalid" : ""}`}
                aria-invalid={Boolean(errors.name && touched.name)}
              />
            </div>
            {errors.name && touched.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>
 
          {/* Email */}
          <div>
            <label htmlFor="email" className="label">Email</label>
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="nama@email.com"
                className={`input ring-focus pl-9 ${errors.email && touched.email ? "input-invalid" : ""}`}
                aria-invalid={Boolean(errors.email && touched.email)}
              />
            </div>
            {errors.email && touched.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
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
                placeholder="Tulis pesan kamu…"
                className={`input ring-focus resize-y pl-9 pt-2 ${errors.message && touched.message ? "input-invalid" : ""}`}
                aria-invalid={Boolean(errors.message && touched.message)}
              />
            </div>
            {errors.message && touched.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
          </div>
 
          <div className="flex items-center justify-between">
            <p className="helper">Kami akan membalas dalam 1x24 jam kerja.</p>
            <button type="submit" className="btn btn-primary ring-focus">
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
