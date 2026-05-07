import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { content as contentApi } from "./api";
import { staticTranslations } from "./i18n-static";

export type Language = "en" | "pl" | "tr";

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  reload: () => Promise<void>;
  loaded: boolean;
}

const I18nContext = createContext<I18nContextType | null>(null);

type Dict = Record<string, { en: string; pl: string; tr: string }>;

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lang") as Language | null;
      if (stored === "en" || stored === "pl" || stored === "tr") return stored;
    }
    return "en";
  });

  const [dict, setDict] = useState<Dict>(staticTranslations);
  const [loaded, setLoaded] = useState(false);

  const reload = useCallback(async () => {
    try {
      const rows = await contentApi.list();
      const merged: Dict = { ...staticTranslations };
      for (const row of rows) {
        merged[row.content_key] = {
          en: row.value_en || staticTranslations[row.content_key]?.en || row.content_key,
          pl: row.value_pl || staticTranslations[row.content_key]?.pl || row.content_key,
          tr: row.value_tr || staticTranslations[row.content_key]?.tr || row.value_en || row.content_key,
        };
      }
      setDict(merged);
    } catch {
      // API not available — fall back to static translations
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", l);
    }
  }, []);

  const t = useCallback(
    (key: string) => {
      const entry = dict[key];
      if (!entry) return key;
      return entry[lang] || entry.en || key;
    },
    [dict, lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t, reload, loaded }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
