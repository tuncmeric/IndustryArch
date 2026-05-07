import { useI18n } from "@/lib/i18n";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";

const TITLE   = { en: "Privacy Policy",                            pl: "Polityka prywatności",                       tr: "Gizlilik Politikası" };
const UPDATED = { en: "Last updated: 7 May 2026",                   pl: "Ostatnia aktualizacja: 7 maja 2026",         tr: "Son güncelleme: 7 Mayıs 2026" };
const BACK    = { en: "← Back to home",                             pl: "← Powrót na stronę główną",                  tr: "← Ana sayfaya dön" };

export default function PrivacyPage() {
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
      <LegalSection title="1. Data controller">
        <p>The data controller of personal data processed via this website is <strong>IndustryArch Sp. z o.o.</strong>, Al. Armii Krajowej 15, 97-300 Piotrków Trybunalski, Poland.</p>
        <p>You can contact us in any data-related matter at <a href="mailto:info@industryarch.com" className="text-foreground underline underline-offset-2 hover:text-accent">info@industryarch.com</a> or +48 576 10 70 71.</p>
      </LegalSection>

      <LegalSection title="2. What data we collect">
        <p>We process only the data you actively provide:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Contact form submissions</strong> — name, email, phone (optional), message content.</li>
          <li><strong>Server logs</strong> — IP address, user-agent, request timestamps. Used solely for security and abuse prevention.</li>
          <li><strong>Admin accounts</strong> (internal use) — email and a hashed password for the content-management panel.</li>
        </ul>
        <p>We do <strong>not</strong> use analytics, advertising, or social-media tracking.</p>
      </LegalSection>

      <LegalSection title="3. Why we process this data">
        <p>Legal bases under the GDPR (Regulation (EU) 2016/679):</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Article 6(1)(b)</strong> — to take steps at your request prior to entering into a contract (responding to your inquiry).</li>
          <li><strong>Article 6(1)(f)</strong> — our legitimate interest in preventing abuse of the website (security logging).</li>
          <li><strong>Article 6(1)(c)</strong> — compliance with applicable accounting and tax law (where messages relate to a paid project).</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. How long we keep it">
        <p>Contact form submissions are retained for up to <strong>3 years</strong> from the last interaction, then permanently deleted. Server logs are retained for up to <strong>90 days</strong>. Admin account records are kept while the account is active and deleted within 30 days of deactivation.</p>
      </LegalSection>

      <LegalSection title="5. Sub-processors">
        <p>We share personal data only with service providers strictly necessary to operate the website:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Hosting.com</strong> — website and database hosting (Poland / EU).</li>
          <li><strong>Google LLC (Workspace)</strong> — outgoing email delivery for the contact form.</li>
        </ul>
        <p>We do not sell or share data for marketing purposes.</p>
      </LegalSection>

      <LegalSection title="6. International transfers">
        <p>Where data is transferred outside the European Economic Area (e.g. when sent via Google Workspace), the transfer is covered by the European Commission's Standard Contractual Clauses and/or applicable adequacy decisions.</p>
      </LegalSection>

      <LegalSection title="7. Your rights">
        <p>Under the GDPR you have the right to:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>access your data and receive a copy of it (Art. 15);</li>
          <li>rectify incorrect data (Art. 16);</li>
          <li>request erasure (Art. 17);</li>
          <li>restrict processing (Art. 18);</li>
          <li>data portability (Art. 20);</li>
          <li>object to processing based on legitimate interest (Art. 21);</li>
          <li>withdraw consent at any time (where processing is based on consent).</li>
        </ul>
        <p>You may also lodge a complaint with the Polish supervisory authority — Prezes Urzędu Ochrony Danych Osobowych (UODO), <a href="https://uodo.gov.pl" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:text-accent">uodo.gov.pl</a>.</p>
      </LegalSection>

      <LegalSection title="8. Cookies and local storage">
        <p>The website uses only strictly necessary cookies and browser local storage. See our <a href="/cookies" className="text-foreground underline underline-offset-2 hover:text-accent">Cookie Policy</a> for details.</p>
      </LegalSection>

      <LegalSection title="9. Changes to this policy">
        <p>We may update this policy when our processing activities change. The "last updated" date at the top reflects the most recent revision. Material changes will be highlighted on the website prior to taking effect.</p>
      </LegalSection>
    </>
  );
}

function ContentPL() {
  return (
    <>
      <LegalSection title="1. Administrator danych">
        <p>Administratorem danych osobowych przetwarzanych za pośrednictwem niniejszej strony jest <strong>IndustryArch Sp. z o.o.</strong>, Al. Armii Krajowej 15, 97-300 Piotrków Trybunalski, Polska.</p>
        <p>W sprawach związanych z przetwarzaniem danych można skontaktować się pod adresem <a href="mailto:info@industryarch.com" className="text-foreground underline underline-offset-2 hover:text-accent">info@industryarch.com</a> lub +48 576 10 70 71.</p>
      </LegalSection>

      <LegalSection title="2. Jakie dane przetwarzamy">
        <p>Przetwarzamy wyłącznie dane, które przekazujesz świadomie:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Formularz kontaktowy</strong> — imię i nazwisko, e-mail, telefon (opcjonalnie), treść wiadomości.</li>
          <li><strong>Logi serwerowe</strong> — adres IP, user-agent, znaczniki czasu żądań. Wyłącznie w celach bezpieczeństwa i zapobiegania nadużyciom.</li>
          <li><strong>Konta administracyjne</strong> (użytek wewnętrzny) — adres e-mail oraz zahaszowane hasło do panelu CMS.</li>
        </ul>
        <p><strong>Nie</strong> stosujemy narzędzi analitycznych, reklamowych ani śledzenia w mediach społecznościowych.</p>
      </LegalSection>

      <LegalSection title="3. Cele i podstawy prawne">
        <p>Podstawy prawne wynikające z RODO (Rozporządzenie 2016/679):</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Art. 6 ust. 1 lit. b RODO</strong> — podjęcie działań na żądanie osoby, której dane dotyczą, przed zawarciem umowy (odpowiedź na zapytanie).</li>
          <li><strong>Art. 6 ust. 1 lit. f RODO</strong> — uzasadniony interes administratora w zakresie zapobiegania nadużyciom strony.</li>
          <li><strong>Art. 6 ust. 1 lit. c RODO</strong> — wypełnienie obowiązków prawnych (rachunkowość, podatki) jeżeli wiadomość prowadzi do realizacji zlecenia.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Okres przechowywania">
        <p>Wiadomości z formularza kontaktowego przechowujemy do <strong>3 lat</strong> od ostatniego kontaktu, a następnie trwale usuwamy. Logi serwera przechowywane są do <strong>90 dni</strong>. Konta administracyjne — przez czas aktywności konta i są usuwane w ciągu 30 dni od dezaktywacji.</p>
      </LegalSection>

      <LegalSection title="5. Odbiorcy danych (podmioty przetwarzające)">
        <p>Dane przekazujemy wyłącznie podmiotom niezbędnym do działania strony:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Hosting.com</strong> — hosting strony i bazy danych (Polska / UE).</li>
          <li><strong>Google LLC (Workspace)</strong> — wysyłka poczty elektronicznej z formularza kontaktowego.</li>
        </ul>
        <p>Nie sprzedajemy ani nie udostępniamy danych w celach marketingowych.</p>
      </LegalSection>

      <LegalSection title="6. Transfery międzynarodowe">
        <p>W przypadku przekazania danych poza Europejski Obszar Gospodarczy (np. przez Google Workspace), transfer odbywa się na podstawie Standardowych Klauzul Umownych Komisji Europejskiej i/lub stosownych decyzji o adekwatności.</p>
      </LegalSection>

      <LegalSection title="7. Twoje prawa">
        <p>Na podstawie RODO przysługują Ci prawa do:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>dostępu do danych i otrzymania ich kopii (art. 15);</li>
          <li>sprostowania nieprawidłowych danych (art. 16);</li>
          <li>żądania usunięcia (art. 17);</li>
          <li>ograniczenia przetwarzania (art. 18);</li>
          <li>przenoszenia danych (art. 20);</li>
          <li>wniesienia sprzeciwu wobec przetwarzania na podstawie uzasadnionego interesu (art. 21);</li>
          <li>cofnięcia zgody w każdym momencie (gdy podstawą jest zgoda).</li>
        </ul>
        <p>Przysługuje Ci również prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych — <a href="https://uodo.gov.pl" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:text-accent">uodo.gov.pl</a>.</p>
      </LegalSection>

      <LegalSection title="8. Pliki cookies i pamięć lokalna">
        <p>Strona wykorzystuje wyłącznie niezbędne pliki cookies oraz pamięć lokalną przeglądarki. Szczegóły w naszej <a href="/cookies" className="text-foreground underline underline-offset-2 hover:text-accent">Polityce cookies</a>.</p>
      </LegalSection>

      <LegalSection title="9. Zmiany w polityce">
        <p>Politykę aktualizujemy w przypadku zmiany czynności przetwarzania. Data „ostatniej aktualizacji" odzwierciedla najnowszą wersję. Istotne zmiany sygnalizujemy na stronie z wyprzedzeniem.</p>
      </LegalSection>
    </>
  );
}

function ContentTR() {
  return (
    <>
      <LegalSection title="1. Veri sorumlusu">
        <p>Bu web sitesi aracılığıyla işlenen kişisel verilerin sorumlusu <strong>IndustryArch Sp. z o.o.</strong>, Al. Armii Krajowej 15, 97-300 Piotrków Trybunalski, Polonya'dır.</p>
        <p>Veri ile ilgili her konuda <a href="mailto:info@industryarch.com" className="text-foreground underline underline-offset-2 hover:text-accent">info@industryarch.com</a> adresinden veya +48 576 10 70 71 numarasından bize ulaşabilirsiniz.</p>
      </LegalSection>

      <LegalSection title="2. Hangi verileri topluyoruz">
        <p>Yalnızca aktif olarak sağladığınız verileri işliyoruz:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>İletişim formu</strong> — ad soyad, e-posta, telefon (isteğe bağlı), mesaj içeriği.</li>
          <li><strong>Sunucu kayıtları</strong> — IP adresi, user-agent, istek zaman damgaları. Yalnızca güvenlik ve kötüye kullanımın önlenmesi için.</li>
          <li><strong>Yönetici hesapları</strong> (iç kullanım) — içerik yönetim paneli için e-posta ve karma şifre.</li>
        </ul>
        <p>Analitik, reklam veya sosyal medya izleme araçları <strong>kullanmıyoruz</strong>.</p>
      </LegalSection>

      <LegalSection title="3. Verileri neden işliyoruz">
        <p>GDPR (AB 2016/679 sayılı Tüzük) kapsamındaki yasal dayanaklar:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Madde 6(1)(b)</strong> — sözleşme yapılmadan önce talebinizle ilgili adımları atmak (sorgunuza yanıt vermek).</li>
          <li><strong>Madde 6(1)(f)</strong> — kötüye kullanımın önlenmesinde meşru menfaatimiz (güvenlik kayıtları).</li>
          <li><strong>Madde 6(1)(c)</strong> — geçerli muhasebe ve vergi hukukuna uyum (mesajların ücretli bir projeyle ilgili olması durumunda).</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Verileri ne kadar süre saklıyoruz">
        <p>İletişim formu mesajları son etkileşimden itibaren en fazla <strong>3 yıl</strong> saklanır, ardından kalıcı olarak silinir. Sunucu kayıtları en fazla <strong>90 gün</strong> saklanır. Yönetici hesabı kayıtları, hesap aktif olduğu sürece tutulur ve devre dışı bırakıldıktan sonra 30 gün içinde silinir.</p>
      </LegalSection>

      <LegalSection title="5. Veri işleyenler">
        <p>Kişisel verileri yalnızca sitenin işletilmesi için kesinlikle gerekli hizmet sağlayıcılarla paylaşıyoruz:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Hosting.com</strong> — web sitesi ve veritabanı barındırma (Polonya / AB).</li>
          <li><strong>Google LLC (Workspace)</strong> — iletişim formundan giden e-posta dağıtımı.</li>
        </ul>
        <p>Veriyi pazarlama amaçlarıyla satmıyoruz veya paylaşmıyoruz.</p>
      </LegalSection>

      <LegalSection title="6. Uluslararası transferler">
        <p>Veriler Avrupa Ekonomik Alanı dışına aktarıldığında (örn. Google Workspace üzerinden), transfer Avrupa Komisyonu'nun Standart Sözleşme Maddeleri ve/veya geçerli yeterlilik kararları kapsamında yapılır.</p>
      </LegalSection>

      <LegalSection title="7. Haklarınız">
        <p>GDPR kapsamında şu haklara sahipsiniz:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>verilerinize erişim ve bir kopyasını alma (Madde 15);</li>
          <li>yanlış verileri düzeltme (Madde 16);</li>
          <li>silme talep etme (Madde 17);</li>
          <li>işlemeyi sınırlandırma (Madde 18);</li>
          <li>veri taşınabilirliği (Madde 20);</li>
          <li>meşru menfaate dayalı işlemeye itiraz (Madde 21);</li>
          <li>onayınızı her an geri çekme (onay esaslı işlemelerde).</li>
        </ul>
        <p>Polonya denetim makamına — Prezes Urzędu Ochrony Danych Osobowych (UODO), <a href="https://uodo.gov.pl" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:text-accent">uodo.gov.pl</a> — şikayette bulunma hakkınız da vardır.</p>
      </LegalSection>

      <LegalSection title="8. Çerezler ve tarayıcı depolaması">
        <p>Web sitesi yalnızca kesinlikle gerekli çerezleri ve tarayıcı yerel depolamasını kullanır. Ayrıntılar için <a href="/cookies" className="text-foreground underline underline-offset-2 hover:text-accent">Çerez Politikamıza</a> bakın.</p>
      </LegalSection>

      <LegalSection title="9. Politikadaki değişiklikler">
        <p>İşleme faaliyetlerimiz değiştiğinde bu politikayı güncelleyebiliriz. Üst kısımdaki "son güncelleme" tarihi en yeni revizyonu yansıtır. Önemli değişiklikler yürürlüğe girmeden önce sitede vurgulanır.</p>
      </LegalSection>
    </>
  );
}
