import { useI18n } from "@/lib/i18n";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact/send.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("ok");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send");
    }
  };

  return (
    <div>
      <section className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">{t("contact.title")}</h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">{t("contact.subtitle")}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">{t("contact.info.address")}</h3>
                <p className="text-sm text-muted-foreground">ul. Wieniecka 6<br />03-634 Warszawa<br />Poland</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <Phone className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">{t("contact.info.phone")}</h3>
                <a href="tel:+48576107071" className="text-sm text-muted-foreground hover:text-primary transition-colors">+48 576 10 70 71</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <Mail className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">{t("contact.info.email")}</h3>
                <a href="mailto:info@industryarch.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">info@industryarch.com</a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-xs text-muted-foreground">www.industryarch.com</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">{t("contact.form.name")}</label>
                <input type="text" required maxLength={100} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2">{t("contact.form.email")}</label>
                  <input type="email" required maxLength={255} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t("contact.form.phone")}</label>
                  <input type="tel" maxLength={20} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t("contact.form.message")}</label>
                <textarea required maxLength={1000} rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none" />
              </div>
              {status === "ok" && (
                <p className="text-sm text-green-600">Message sent. We'll be in touch shortly.</p>
              )}
              {status === "error" && (
                <p className="text-sm text-destructive">{errorMsg || "Something went wrong. Please try again."}</p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                <Send size={16} />
                {status === "sending" ? "Sending..." : t("contact.form.send")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
