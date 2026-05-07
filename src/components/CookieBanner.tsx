import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "ia_cookie_consent";

const COPY = {
  en: {
    text: "We use only strictly necessary cookies for site functionality (e.g. language preference, admin login). No tracking, marketing or analytics cookies.",
    accept: "Got it",
    learn: "Cookie Policy",
    aria: "Dismiss cookie notice",
  },
  pl: {
    text: "Używamy wyłącznie plików cookies niezbędnych do działania strony (np. preferencji języka, logowania administratora). Nie stosujemy cookies śledzących, marketingowych ani analitycznych.",
    accept: "Rozumiem",
    learn: "Polityka cookies",
    aria: "Zamknij informację o cookies",
  },
  tr: {
    text: "Yalnızca site işlevselliği için kesinlikle gerekli çerezleri kullanıyoruz (ör. dil tercihi, yönetici girişi). İzleme, pazarlama veya analiz çerezi kullanmıyoruz.",
    accept: "Anladım",
    learn: "Çerez Politikası",
    aria: "Çerez bildirimini kapat",
  },
} as const;

export function CookieBanner() {
  const { lang } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
  }, []);

  if (!show) return null;
  const c = COPY[lang];

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "accepted-" + new Date().toISOString());
    setShow(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 bg-primary text-primary-foreground border border-primary-foreground/15 rounded-lg shadow-2xl"
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3 mb-3">
          <Cookie className="text-accent shrink-0 mt-0.5" size={18} strokeWidth={1.8} />
          <p className="text-xs sm:text-sm leading-relaxed text-primary-foreground/85">{c.text}</p>
        </div>
        <div className="flex items-center justify-between gap-3 pl-7">
          <Link
            to="/cookies"
            className="text-xs font-semibold text-accent hover:text-primary-foreground transition-colors underline-offset-4 hover:underline"
          >
            {c.learn}
          </Link>
          <button
            onClick={dismiss}
            className="bg-accent text-accent-foreground px-4 py-2 rounded-md text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            {c.accept}
          </button>
        </div>
        <button
          onClick={dismiss}
          aria-label={c.aria}
          className="absolute top-2 right-2 text-primary-foreground/40 hover:text-primary-foreground transition-colors p-1"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
