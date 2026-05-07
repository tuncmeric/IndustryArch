import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { ShieldCheck, HardHat, ClipboardCheck, FileBarChart2, Users, ArrowRight } from "lucide-react";

export default function StandardsPage() {
  const { t } = useI18n();

  const standards = [
    { icon: ShieldCheck, title: t("standards.quality.title"), desc: t("standards.quality.desc") },
    { icon: HardHat, title: t("standards.hse.title"), desc: t("standards.hse.desc") },
    { icon: ClipboardCheck, title: t("standards.budget.title"), desc: t("standards.budget.desc") },
    { icon: FileBarChart2, title: t("standards.report.title"), desc: t("standards.report.desc") },
    { icon: Users, title: t("standards.subs.title"), desc: t("standards.subs.desc") },
  ];

  return (
    <div>
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <p className="text-xs font-semibold text-accent tracking-widest uppercase mb-4">{t("standards.eyebrow")}</p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl">{t("standards.title")}</h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-6 leading-relaxed">{t("standards.subtitle")}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {standards.map((s, idx) => (
            <div key={s.title} className="bg-card border border-border rounded-xl p-7 sm:p-8 hover:border-accent/40 transition-all">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-mono text-accent tracking-wider">0{idx + 1}</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <s.icon className="text-accent mb-5" size={26} strokeWidth={1.5} />
              <h2 className="font-bold text-lg sm:text-xl mb-3 leading-snug">{s.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-primary-foreground/70 text-sm sm:text-base mb-8 max-w-xl mx-auto">{t("cta.desc")}</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 rounded-lg font-medium text-sm hover:opacity-90 transition-all">
            {t("cta.button")}
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
