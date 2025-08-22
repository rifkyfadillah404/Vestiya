import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

function ToastIcon({ type }) {
  if (type === "success") {
    return (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  if (type === "error") {
    return (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  }
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01" />
    </svg>
  );
}

export function ToastProvider({ children, defaultDuration = 2500 }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message, opts = {}) => {
      const id = Math.random().toString(36).slice(2);
      const type = opts.type || "success";
      const duration = typeof opts.duration === "number" ? opts.duration : defaultDuration;
      setToasts((list) => [...list, { id, message, type }]);
      if (duration > 0) {
        window.setTimeout(() => remove(id), duration);
      }
      return id;
    },
    [defaultDuration, remove]
  );

  const value = useMemo(() => ({ push, remove }), [push, remove]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-container" role="status" aria-live="polite" aria-atomic="true">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`} data-type={t.type}>
            <div className="toast-leading">
              <span className={`toast-dot ${t.type}`} aria-hidden="true" />
              <ToastIcon type={t.type} />
            </div>
            <div className="toast-message">{t.message}</div>
            <button className="toast-close btn btn-ghost ring-focus" aria-label="Tutup notifikasi" onClick={() => remove(t.id)}>
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/* eslint-disable-next-line react-refresh/only-export-components */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}