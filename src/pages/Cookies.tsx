import { useI18n } from "@/lib/i18n";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";

const TITLE   = { en: "Cookie Policy",                              pl: "Polityka cookies",                            tr: "Çerez Politikası" };
const UPDATED = { en: "Last updated: 7 May 2026",                   pl: "Ostatnia aktualizacja: 7 maja 2026",          tr: "Son güncelleme: 7 Mayıs 2026" };
const BACK    = { en: "← Back to home",                             pl: "← Powrót na stronę główną",                   tr: "← Ana sayfaya dön" };

export default function CookiesPage() {
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
      <LegalSection title="1. What are cookies">
        <p>Cookies are small text files placed on your device when you visit a website. Some are essential to make a site work; others are used for analytics or advertising. This site uses <strong>only the essential ones</strong>.</p>
      </LegalSection>

      <LegalSection title="2. Cookies we use">
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm border border-border rounded-md">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-semibold">Name</th>
                <th className="text-left p-3 font-semibold">Purpose</th>
                <th className="text-left p-3 font-semibold">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3 font-mono">ia_session</td>
                <td className="p-3">Keeps the admin user signed in. Set <strong>only</strong> when you log into the CMS at /auth.</td>
                <td className="p-3">7 days (HttpOnly, Secure)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>That's it — there is no other cookie. We do not use Google Analytics, Facebook Pixel, marketing tags, or any third-party trackers.</p>
      </LegalSection>

      <LegalSection title="3. Browser local storage">
        <p>The site also uses your browser's local storage for two preferences:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><code className="text-xs bg-muted px-1.5 py-0.5 rounded">lang</code> — the language you've selected (EN / PL / TR).</li>
          <li><code className="text-xs bg-muted px-1.5 py-0.5 rounded">ia_cookie_consent</code> — that you've dismissed the cookie notice.</li>
        </ul>
        <p>This data stays on your device and is never sent to our server.</p>
      </LegalSection>

      <LegalSection title="4. Managing cookies">
        <p>You can clear or block cookies in your browser settings. Doing so will not break the public site, but you will be unable to log in to the admin area without the session cookie.</p>
        <p>Helpful links:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:text-accent">Manage cookies in Chrome</a></li>
          <li><a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:text-accent">Manage cookies in Firefox</a></li>
          <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:text-accent">Manage cookies in Safari</a></li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Changes to this policy">
        <p>If we ever introduce additional cookies, we will update this policy and request consent before placing any non-essential cookie.</p>
      </LegalSection>
    </>
  );
}

function ContentPL() {
  return (
    <>
      <LegalSection title="1. Czym są cookies">
        <p>Cookies to małe pliki tekstowe zapisywane na urządzeniu użytkownika podczas korzystania ze strony. Część jest niezbędna do działania serwisu, inne służą do analityki lub reklamy. Niniejsza strona stosuje <strong>wyłącznie pliki niezbędne</strong>.</p>
      </LegalSection>

      <LegalSection title="2. Pliki, których używamy">
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm border border-border rounded-md">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-semibold">Nazwa</th>
                <th className="text-left p-3 font-semibold">Cel</th>
                <th className="text-left p-3 font-semibold">Czas</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3 font-mono">ia_session</td>
                <td className="p-3">Utrzymuje sesję administratora. Ustawiany <strong>tylko</strong> po zalogowaniu do panelu CMS pod adresem /auth.</td>
                <td className="p-3">7 dni (HttpOnly, Secure)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Tyle. Nie korzystamy z Google Analytics, Facebook Pixel, tagów marketingowych ani żadnych zewnętrznych narzędzi śledzących.</p>
      </LegalSection>

      <LegalSection title="3. Pamięć lokalna przeglądarki">
        <p>Strona zapisuje również dwie preferencje w pamięci lokalnej przeglądarki:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><code className="text-xs bg-muted px-1.5 py-0.5 rounded">lang</code> — wybrany język (EN / PL / TR).</li>
          <li><code className="text-xs bg-muted px-1.5 py-0.5 rounded">ia_cookie_consent</code> — informacja, że zamknąłeś baner cookie.</li>
        </ul>
        <p>Dane pozostają na Twoim urządzeniu i nie są przesyłane na nasz serwer.</p>
      </LegalSection>

      <LegalSection title="4. Zarządzanie cookies">
        <p>Możesz wyczyścić lub zablokować cookies w ustawieniach przeglądarki. Nie wpłynie to na działanie publicznej części strony, ale uniemożliwi logowanie do panelu administracyjnego.</p>
        <p>Pomocne linki:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:text-accent">Cookies w Chrome</a></li>
          <li><a href="https://support.mozilla.org/pl/kb/usuwanie-ciasteczek-i-danych-stron-firefox" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:text-accent">Cookies w Firefox</a></li>
          <li><a href="https://support.apple.com/pl-pl/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:text-accent">Cookies w Safari</a></li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Zmiany w polityce">
        <p>Jeśli kiedykolwiek dodamy dodatkowe pliki cookie, zaktualizujemy niniejszą politykę i poprosimy o zgodę przed umieszczeniem pliku niezbędnego.</p>
      </LegalSection>
    </>
  );
}

function ContentTR() {
  return (
    <>
      <LegalSection title="1. Çerez nedir">
        <p>Çerezler, bir web sitesini ziyaret ettiğinizde cihazınıza yerleştirilen küçük metin dosyalarıdır. Bazıları sitenin çalışması için gereklidir, diğerleri analitik veya reklam için kullanılır. Bu site <strong>yalnızca gerekli olanları</strong> kullanır.</p>
      </LegalSection>

      <LegalSection title="2. Kullandığımız çerezler">
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm border border-border rounded-md">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-semibold">Ad</th>
                <th className="text-left p-3 font-semibold">Amaç</th>
                <th className="text-left p-3 font-semibold">Süre</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3 font-mono">ia_session</td>
                <td className="p-3">Yönetici oturumunu açık tutar. <strong>Yalnızca</strong> /auth üzerinden CMS'e giriş yapıldığında ayarlanır.</td>
                <td className="p-3">7 gün (HttpOnly, Secure)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Hepsi bu kadar — başka çerez yok. Google Analytics, Facebook Pixel, pazarlama etiketleri veya üçüncü taraf izleyicileri kullanmıyoruz.</p>
      </LegalSection>

      <LegalSection title="3. Tarayıcı yerel depolaması">
        <p>Site ayrıca iki tercih için tarayıcınızın yerel depolamasını kullanır:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><code className="text-xs bg-muted px-1.5 py-0.5 rounded">lang</code> — seçtiğiniz dil (EN / PL / TR).</li>
          <li><code className="text-xs bg-muted px-1.5 py-0.5 rounded">ia_cookie_consent</code> — çerez bildirimini kapattığınız bilgisi.</li>
        </ul>
        <p>Bu veriler cihazınızda kalır ve sunucumuza asla gönderilmez.</p>
      </LegalSection>

      <LegalSection title="4. Çerezleri yönetme">
        <p>Tarayıcı ayarlarından çerezleri temizleyebilir veya engelleyebilirsiniz. Bunu yapmak halka açık siteyi bozmaz, ancak oturum çerezi olmadan yönetici alanına giriş yapamazsınız.</p>
        <p>Faydalı bağlantılar:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:text-accent">Chrome'da çerez yönetimi</a></li>
          <li><a href="https://support.mozilla.org/tr/kb/Cerezleri%20silme" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:text-accent">Firefox'ta çerez yönetimi</a></li>
          <li><a href="https://support.apple.com/tr-tr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:text-accent">Safari'de çerez yönetimi</a></li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Politikada değişiklikler">
        <p>İlerde ek çerezler eklersek, bu politikayı güncelleyecek ve gerekli olmayan herhangi bir çerez yerleştirmeden önce onayınızı isteyeceğiz.</p>
      </LegalSection>
    </>
  );
}
