import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { Briefcase, HardHat, Home, PaintBucket, Wrench, Building2, ArrowRight, CheckCircle } from "lucide-react";

export default function ServicesPage() {
  const { t } = useI18n();

  const services = [
    { icon: Briefcase, title: t("services.gc.title"), desc: t("services.gc.desc"), scope: ["Site organization & permits", "Trade coordination", "Construction execution", "Quality control & handover"] },
    { icon: HardHat, title: t("services.pm.title"), desc: t("services.pm.desc"), scope: ["Schedule & budget oversight", "Procurement management", "Risk & change control", "Stakeholder reporting"] },
    { icon: Home, title: t("services.house.title"), desc: t("services.house.desc"), scope: ["Foundations & structure", "MEP installations", "Interior finishing", "Landscaping & handover"] },
    { icon: PaintBucket, title: t("services.reno.title"), desc: t("services.reno.desc"), scope: ["Design adaptation", "Demolition & strip-out", "Construction works", "Final fit-out"] },
    { icon: Wrench, title: t("services.maint.title"), desc: t("services.maint.desc"), scope: ["Periodic inspections", "Preventive maintenance", "Emergency response", "Documentation & reporting"] },
    { icon: Building2, title: t("services.inst.title"), desc: t("services.inst.desc"), scope: ["Office & corporate fit-out", "Hospitality & restaurants", "Healthcare facilities", "Institutional buildings"] },
  ];

  return (
    <div>
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <p className="text-xs font-semibold text-accent tracking-widest uppercase mb-4">{t("services.eyebrow")}</p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">{t("services.title")}</h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-6 leading-relaxed">{t("services.subtitle")}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-card border border-border rounded-xl p-7 sm:p-9 hover:border-accent/40 transition-all duration-300">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <s.icon className="text-accent" size={22} strokeWidth={1.5} />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold leading-tight pt-1">{s.title}</h2>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">{s.desc}</p>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-foreground/60 mb-3">{t("services.scope")}</p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {s.scope.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle size={14} className="text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
