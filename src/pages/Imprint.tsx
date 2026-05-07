import { useI18n } from "@/lib/i18n";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";

const TITLE   = { en: "Legal Notice",                               pl: "Informacje prawne",                           tr: "Yasal Bilgiler" };
const UPDATED = { en: "Last updated: 7 May 2026",                   pl: "Ostatnia aktualizacja: 7 maja 2026",          tr: "Son güncelleme: 7 Mayıs 2026" };
const BACK    = { en: "← Back to home",                             pl: "← Powrót na stronę główną",                   tr: "← Ana sayfaya dön" };

const COPY = {
  en: {
    seat:        "Registered seat",
    office:      "Warsaw office",
    company:     "Company details",
    contact:     "Contact",
    register:    "Court of registration",
    represent:   "Authorized representatives",
    legalForm:   "Legal form",
    legalFormVal:"Limited liability company (Spółka z ograniczoną odpowiedzialnością)",
    regDate:     "Date of registration",
    regDateVal:  "17 January 2024",
    capital:     "Share capital",
    capitalVal:  "200,000 PLN (paid in full)",
    courtName:   "District Court for Łódź-Śródmieście in Łódź, XX Commercial Division of the National Court Register",
  },
  pl: {
    seat:        "Adres siedziby",
    office:      "Biuro Warszawa",
    company:     "Dane spółki",
    contact:     "Kontakt",
    register:    "Sąd rejestrowy",
    represent:   "Reprezentacja",
    legalForm:   "Forma prawna",
    legalFormVal:"Spółka z ograniczoną odpowiedzialnością",
    regDate:     "Data rejestracji",
    regDateVal:  "17 stycznia 2024 r.",
    capital:     "Kapitał zakładowy",
    capitalVal:  "200 000,00 zł (opłacony w całości)",
    courtName:   "Sąd Rejonowy dla Łodzi-Śródmieścia w Łodzi, XX Wydział Gospodarczy Krajowego Rejestru Sądowego",
  },
  tr: {
    seat:        "Tescilli merkez adresi",
    office:      "Varşova ofisi",
    company:     "Şirket bilgileri",
    contact:     "İletişim",
    register:    "Tescil mahkemesi",
    represent:   "Yetkili temsilciler",
    legalForm:   "Şirket türü",
    legalFormVal:"Limited şirket (Spółka z ograniczoną odpowiedzialnością)",
    regDate:     "Tescil tarihi",
    regDateVal:  "17 Ocak 2024",
    capital:     "Ödenmiş sermaye",
    capitalVal:  "200.000 PLN (tamamı ödenmiş)",
    courtName:   "Łódź-Śródmieście Bölge Mahkemesi (Łódź), XX Ulusal Mahkeme Sicili Ticaret Bölümü",
  },
} as const;

export default function ImprintPage() {
  const { lang } = useI18n();
  const c = COPY[lang];

  return (
    <LegalLayout title={TITLE[lang]} updated={UPDATED[lang]} back={BACK[lang]}>
      <LegalSection title={c.company}>
        <div className="bg-card border border-border rounded-md p-5 sm:p-6 space-y-3">
          <p className="font-semibold text-foreground text-base">IndustryArch Sp. z o.o.</p>

          <div className="pt-2 border-t border-border space-y-1">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.seat}</p>
            <p>Al. Armii Krajowej 15</p>
            <p>97-300 Piotrków Trybunalski</p>
            <p>{lang === "pl" ? "Polska" : lang === "tr" ? "Polonya" : "Poland"}</p>
          </div>

          <div className="pt-3 border-t border-border space-y-1">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.office}</p>
            <p>ul. Wieniecka 6</p>
            <p>03-634 Warszawa</p>
            <p>{lang === "pl" ? "Polska" : lang === "tr" ? "Polonya" : "Poland"}</p>
          </div>

          <div className="pt-3 mt-1 border-t border-border grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <p><span className="text-muted-foreground">KRS:</span> <span className="font-mono">0001082166</span></p>
            <p><span className="text-muted-foreground">NIP:</span> <span className="font-mono">7712929374</span></p>
            <p><span className="text-muted-foreground">REGON:</span> <span className="font-mono">527479546</span></p>
            <p><span className="text-muted-foreground">{c.legalForm}:</span> {c.legalFormVal}</p>
            <p><span className="text-muted-foreground">{c.regDate}:</span> {c.regDateVal}</p>
            <p><span className="text-muted-foreground">{c.capital}:</span> {c.capitalVal}</p>
          </div>
        </div>
      </LegalSection>

      <LegalSection title={c.register}>
        <p>{c.courtName}</p>
      </LegalSection>

      <LegalSection title={c.represent}>
        <p className="font-mono text-sm text-muted-foreground italic">[{lang === "pl" ? "Imiona członków zarządu — do uzupełnienia" : lang === "tr" ? "Yönetim kurulu üyeleri — eklenecek" : "Names of board members — to be filled in"}]</p>
      </LegalSection>

      <LegalSection title={c.contact}>
        <ul className="space-y-2">
          <li><span className="text-muted-foreground">Email:</span> <a href="mailto:info@industryarch.com" className="text-foreground underline underline-offset-2 hover:text-accent">info@industryarch.com</a></li>
          <li><span className="text-muted-foreground">{lang === "pl" ? "Telefon" : lang === "tr" ? "Telefon" : "Phone"}:</span> <a href="tel:+48576107071" className="text-foreground underline underline-offset-2 hover:text-accent">+48 576 10 70 71</a></li>
          <li><span className="text-muted-foreground">Web:</span> www.industryarch.com</li>
        </ul>
      </LegalSection>
    </LegalLayout>
  );
}
