import { useI18n } from "@/lib/i18n";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";

const TITLE   = { en: "Terms of Use",                               pl: "Regulamin",                                   tr: "Kullanım Koşulları" };
const UPDATED = { en: "Last updated: 7 May 2026",                   pl: "Ostatnia aktualizacja: 7 maja 2026",          tr: "Son güncelleme: 7 Mayıs 2026" };
const BACK    = { en: "← Back to home",                             pl: "← Powrót na stronę główną",                   tr: "← Ana sayfaya dön" };

export default function TermsPage() {
  const { lang } = useI18n();

  return (
    <LegalLayout title={TITLE[lang]} updated={UPDATED[lang]} back={BACK[lang]}>
      {lang === "pl" && <ContentPL />}
      {lang === "en" && <ContentEN />}
      {lang === "tr" && <ContentTR />}
    </LegalLayout>
  );
}

function ContentEN() {
  return (
    <>
      <LegalSection title="1. About this website">
        <p>This website (industryarch.com) is operated by IndustryArch Sp. z o.o., Al. Armii Krajowej 15, 97-300 Piotrków Trybunalski, Poland. It provides information about our construction services and project portfolio.</p>
      </LegalSection>

      <LegalSection title="2. Permitted use">
        <p>You may browse the website for personal informational purposes and to submit business inquiries. Automated scraping, mass data extraction, or use of the contact form for unsolicited marketing are not permitted.</p>
      </LegalSection>

      <LegalSection title="3. Intellectual property">
        <p>All content on this website — including text, photographs, logos, layout and code — is the property of IndustryArch Sp. z o.o. or its licensors. You may not reproduce, modify or distribute content without prior written consent, except for short quotations with attribution.</p>
        <p>Project photographs depicting third-party properties (e.g. embassies) are published with appropriate authorization or under publicly disclosable terms. Identifiable details of restricted projects are omitted by design.</p>
      </LegalSection>

      <LegalSection title="4. Accuracy and limitation of liability">
        <p>We endeavour to keep the information on this site accurate and up to date, but do not guarantee that it is free from errors or that all references reflect current capacity. The website does not constitute a binding offer; project terms are agreed individually in a written contract.</p>
        <p>To the maximum extent permitted by Polish law, IndustryArch Sp. z o.o. shall not be liable for any indirect or consequential damages arising from the use of this website.</p>
      </LegalSection>

      <LegalSection title="5. External links">
        <p>The website may contain links to third-party sites. We do not control and are not responsible for the content, privacy practices or security of those sites.</p>
      </LegalSection>

      <LegalSection title="6. Governing law and jurisdiction">
        <p>These terms are governed by Polish law. Any disputes shall be resolved by the competent court for the registered seat of IndustryArch Sp. z o.o. in Piotrków Trybunalski.</p>
      </LegalSection>

      <LegalSection title="7. Changes">
        <p>We may update these terms from time to time. Continued use of the website after changes constitutes acceptance of the revised terms.</p>
      </LegalSection>
    </>
  );
}

function ContentPL() {
  return (
    <>
      <LegalSection title="1. O stronie">
        <p>Niniejsza strona (industryarch.com) prowadzona jest przez IndustryArch Sp. z o.o., Al. Armii Krajowej 15, 97-300 Piotrków Trybunalski, Polska. Zawiera informacje o świadczonych usługach budowlanych oraz portfolio realizacji.</p>
      </LegalSection>

      <LegalSection title="2. Dozwolone korzystanie">
        <p>Strona służy do przeglądania w celach informacyjnych oraz do kierowania zapytań biznesowych. Niedozwolone są: automatyczne pobieranie danych (scraping), masowa ekstrakcja informacji oraz wykorzystywanie formularza kontaktowego do niezamówionej reklamy.</p>
      </LegalSection>

      <LegalSection title="3. Własność intelektualna">
        <p>Wszelkie treści zamieszczone na stronie — w tym teksty, zdjęcia, logo, układ graficzny i kod — stanowią własność IndustryArch Sp. z o.o. lub licencjodawców. Reprodukowanie, modyfikowanie lub rozpowszechnianie treści wymaga uprzedniej pisemnej zgody, z wyjątkiem krótkich cytatów z podaniem źródła.</p>
        <p>Fotografie obiektów osób trzecich (np. ambasad) publikujemy na podstawie stosownych upoważnień lub w zakresie umownie dopuszczalnym do publikacji. Identyfikowalne szczegóły obiektów objętych poufnością nie są udostępniane.</p>
      </LegalSection>

      <LegalSection title="4. Aktualność danych i ograniczenie odpowiedzialności">
        <p>Dokładamy starań, aby informacje na stronie były aktualne, jednak nie gwarantujemy ich bezbłędności ani że odzwierciedlają bieżącą dostępność wykonawczą. Strona nie stanowi wiążącej oferty handlowej w rozumieniu Kodeksu cywilnego — warunki realizacji uzgadniane są indywidualnie w odrębnej umowie.</p>
        <p>W zakresie dopuszczalnym przepisami prawa polskiego IndustryArch Sp. z o.o. nie ponosi odpowiedzialności za szkody pośrednie i następcze wynikające z korzystania ze strony.</p>
      </LegalSection>

      <LegalSection title="5. Linki zewnętrzne">
        <p>Strona może zawierać odnośniki do witryn osób trzecich. Nie sprawujemy nad nimi kontroli i nie odpowiadamy za ich zawartość, polityki prywatności ani bezpieczeństwo.</p>
      </LegalSection>

      <LegalSection title="6. Prawo właściwe i jurysdykcja">
        <p>Niniejszy regulamin podlega prawu polskiemu. Spory rozstrzyga sąd właściwy dla siedziby IndustryArch Sp. z o.o. w Piotrkowie Trybunalskim.</p>
      </LegalSection>

      <LegalSection title="7. Zmiany regulaminu">
        <p>Regulamin może być aktualizowany. Dalsze korzystanie ze strony po wprowadzeniu zmian oznacza ich akceptację.</p>
      </LegalSection>
    </>
  );
}

function ContentTR() {
  return (
    <>
      <LegalSection title="1. Bu web sitesi hakkında">
        <p>Bu web sitesi (industryarch.com), IndustryArch Sp. z o.o., Al. Armii Krajowej 15, 97-300 Piotrków Trybunalski, Polonya tarafından işletilmektedir. İnşaat hizmetlerimiz ve proje portföyümüz hakkında bilgi sunar.</p>
      </LegalSection>

      <LegalSection title="2. İzin verilen kullanım">
        <p>Web sitesini kişisel bilgi amaçlı ve iş sorgularınızı iletmek için kullanabilirsiniz. Otomatik veri çekimi (scraping), toplu veri çıkarma veya iletişim formunun istenmeyen pazarlama için kullanılması yasaktır.</p>
      </LegalSection>

      <LegalSection title="3. Fikri mülkiyet">
        <p>Bu web sitesindeki tüm içerik — metinler, fotoğraflar, logolar, düzen ve kod dahil — IndustryArch Sp. z o.o.'nun veya lisans verenlerin mülkiyetindedir. Kısa alıntılar (kaynak gösterilerek) hariç, içeriği önceden yazılı izin olmaksızın çoğaltamaz, değiştiremez veya dağıtamazsınız.</p>
        <p>Üçüncü tarafların mülklerini (örn. büyükelçilikler) gösteren proje fotoğrafları, uygun yetkilendirmelerle veya kamuya açık koşullar altında yayımlanmaktadır. Kısıtlı projelerin tanımlanabilir ayrıntıları tasarım gereği yayımlanmaz.</p>
      </LegalSection>

      <LegalSection title="4. Doğruluk ve sorumluluk sınırlaması">
        <p>Sitedeki bilgileri güncel tutmaya çalışırız, ancak hatasız olduğunu veya tüm referansların güncel kapasiteyi yansıttığını garanti edemeyiz. Web sitesi bağlayıcı bir teklif oluşturmaz; proje koşulları ayrı bir yazılı sözleşmede bireysel olarak kararlaştırılır.</p>
        <p>Polonya hukukunun izin verdiği azami ölçüde, IndustryArch Sp. z o.o., bu web sitesinin kullanımından doğan dolaylı veya sonuçsal zararlardan sorumlu tutulamaz.</p>
      </LegalSection>

      <LegalSection title="5. Dış bağlantılar">
        <p>Web sitesi üçüncü taraf sitelerine bağlantılar içerebilir. Bu sitelerin içeriği, gizlilik uygulamaları veya güvenliği üzerinde kontrolümüz yoktur ve sorumlu tutulamayız.</p>
      </LegalSection>

      <LegalSection title="6. Geçerli hukuk ve yargı yetkisi">
        <p>Bu koşullar Polonya hukukuna tabidir. Tüm anlaşmazlıklar IndustryArch Sp. z o.o.'nun Piotrków Trybunalski'deki tescilli merkezi için yetkili mahkemede çözülecektir.</p>
      </LegalSection>

      <LegalSection title="7. Değişiklikler">
        <p>Bu koşulları zaman zaman güncelleyebiliriz. Değişikliklerden sonra web sitesini kullanmaya devam etmek, revize edilmiş koşulların kabulü anlamına gelir.</p>
      </LegalSection>
    </>
  );
}
