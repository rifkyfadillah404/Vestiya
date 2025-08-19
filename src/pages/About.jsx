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
      <section className="space-y-4">
        <h1 className="text-3xl font-bold text-neutral-900">Tentang Vestiya</h1>
        <p className="text-neutral-600">
          Vestiya adalah brand e-commerce yang berfokus pada produk fashion minimalis
          dengan palet warna abu dan putih. Kami percaya bahwa kesederhanaan adalah kunci
          dari gaya yang timeless dan mudah dipadukan sehari-hari.
        </p>
        <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-3">
          <h2 className="text-lg font-semibold text-neutral-900">Informasi Toko</h2>
          <ul className="text-neutral-700 text-sm space-y-1">
            <li>• Lokasi: Jakarta, Indonesia</li>
            <li>• Jam Operasional: Senin - Minggu, 09.00 - 20.00 WIB</li>
            <li>• Email: support@Vestiya.id</li>
            <li>• Instagram: @Vestiya.id</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-900">Hubungi Kami</h2>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-xl border border-neutral-200 bg-white p-6 space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-800">
              Nama
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Nama lengkap"
              className={`mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none transition
                ${errors.name && touched.name ? "border-red-400 focus:ring-2 ring-red-200" : "border-neutral-300 focus:ring-2 ring-neutral-200"}`}
              />
            {errors.name && touched.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-800">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="nama@email.com"
              className={`mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none transition
                ${errors.email && touched.email ? "border-red-400 focus:ring-2 ring-red-200" : "border-neutral-300 focus:ring-2 ring-neutral-200"}`}
            />
            {errors.email && touched.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-neutral-800">
              Pesan
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tulis pesan kamu…"
              className={`mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none transition resize-y
                ${errors.message && touched.message ? "border-red-400 focus:ring-2 ring-red-200" : "border-neutral-300 focus:ring-2 ring-neutral-200"}`}
            />
            {errors.message && touched.message && (
              <p className="mt-1 text-xs text-red-600">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white px-4 py-2.5 text-sm font-medium hover:bg-neutral-800"
          >
            Kirim Pesan
          </button>
        </form>
      </section>
    </div>
  );
}