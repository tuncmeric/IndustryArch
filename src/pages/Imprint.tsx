import { useI18n } from "@/lib/i18n";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";

const TITLE   = { en: "Legal Notice",                               pl: "Informacje prawne",                           tr: "Yasal Bilgiler" };
const UPDATED = { en: "Last updated: 7 May 2026",                   pl: "Ostatnia aktualizacja: 7 maja 2026",          tr: "Son güncelleme: 7 Mayıs 2026" };
const BACK    = { en: "← Back to home",                             pl: "← Powrót na stronę główną",                   tr: "← Ana sayfaya dön" };

const COPY = {
  en: {
    company:   "Company details",
    contact:   "Contact",
    register:  "Court of registration",
    represent: "Authorized representatives",
    note:      "Some registration numbers are placeholders pending final company-secretary input. They will be updated here without redeploying the site (via the admin panel).",
  },
  pl: {
    company:   "Dane spółki",
    contact:   "Kontakt",
    register:  "Sąd rejestrowy",
    represent: "Reprezentacja",
    note:      "Niektóre numery rejestrowe są tymczasowymi placeholderami i zostaną uzupełnione po finalnym wpisie sekretarza spółki. Aktualizacja nastąpi w panelu administracyjnym bez konieczności ponownego wdrożenia strony.",
  },
  tr: {
    company:   "Şirket bilgileri",
    contact:   "İletişim",
    register:  "Tescil mahkemesi",
    represent: "Yetkili temsilciler",
    note:      "Bazı tescil numaraları, şirket sekreterinin nihai girdisini bekleyen yer tutuculardır. Sitede yeniden dağıtım yapmadan yönetici panelinden güncellenecektir.",
  },
} as const;

export default function ImprintPage() {
  const { lang } = useI18n();
  const c = COPY[lang];

  return (
    <LegalLayout title={TITLE[lang]} updated={UPDATED[lang]} back={BACK[lang]}>
      <LegalSection title={c.company}>
        <div className="bg-card border border-border rounded-md p-5 sm:p-6 space-y-2">
          <p className="font-semibold text-foreground">IndustryArch Sp. z o.o.</p>
          <p>ul. Wieniecka 6</p>
          <p>03-634 Warszawa</p>
          <p>Poland</p>
          <div className="pt-3 mt-3 border-t border-border space-y-1 text-sm">
            <p><span className="text-muted-foreground">KRS:</span> <span className="font-mono">[to be filled in]</span></p>
            <p><span className="text-muted-foreground">NIP:</span> <span className="font-mono">[to be filled in]</span></p>
            <p><span className="text-muted-foreground">REGON:</span> <span className="font-mono">[to be filled in]</span></p>
            <p><span className="text-muted-foreground">{lang === "pl" ? "Kapitał zakładowy" : lang === "tr" ? "Ödenmiş sermaye" : "Share capital"}:</span> <span className="font-mono">[to be filled in]</span></p>
          </div>
        </div>
      </LegalSection>

      <LegalSection title={c.register}>
        <p>{lang === "pl"
          ? "Sąd Rejonowy dla m.st. Warszawy w Warszawie, XIV Wydział Gospodarczy Krajowego Rejestru Sądowego."
          : lang === "tr"
            ? "Sąd Rejonowy dla m.st. Warszawy w Warszawie, XIV Ulusal Mahkeme Sicili Ticaret Bölümü (Polonya)."
            : "Sąd Rejonowy dla m.st. Warszawy w Warszawie, XIV Commercial Division of the National Court Register (Poland)."}</p>
      </LegalSection>

      <LegalSection title={c.represent}>
        <p className="font-mono text-sm">[Names of board members / authorized signatories — to be filled in]</p>
      </LegalSection>

      <LegalSection title={c.contact}>
        <ul className="space-y-2">
          <li><span className="text-muted-foreground">Email:</span> <a href="mailto:info@industryarch.com" className="text-foreground underline underline-offset-2 hover:text-accent">info@industryarch.com</a></li>
          <li><span className="text-muted-foreground">{lang === "pl" ? "Telefon" : lang === "tr" ? "Telefon" : "Phone"}:</span> <a href="tel:+48576107071" className="text-foreground underline underline-offset-2 hover:text-accent">+48 576 10 70 71</a></li>
          <li><span className="text-muted-foreground">Web:</span> www.industryarch.com</li>
        </ul>
      </LegalSection>

      <p className="text-xs text-muted-foreground italic mt-12 leading-relaxed">{c.note}</p>
    </LegalLayout>
  );
}
