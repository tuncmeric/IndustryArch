import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { Shield, Home, Briefcase, UtensilsCrossed, Landmark, Warehouse, ArrowRight } from "lucide-react";

export default function SectorsPage() {
  const { t } = useI18n();

  const sectors = [
    { icon: Shield, title: t("sectors.diplomatic.title"), desc: t("sectors.diplomatic.desc"), img: "/images/turkish-embassy.jpg" },
    { icon: Home, title: t("sectors.residential.title"), desc: t("sectors.residential.desc"), img: "/images/willa-wojcieszyn.jpg" },
    { icon: Briefcase, title: t("sectors.commercial.title"), desc: t("sectors.commercial.desc"), img: "/images/mabel-clinic.jpg" },
    { icon: UtensilsCrossed, title: t("sectors.hospitality.title"), desc: t("sectors.hospitality.desc"), img: "/images/restaurant-bodrum.jpg" },
    { icon: Landmark, title: t("sectors.institutional.title"), desc: t("sectors.institutional.desc"), img: "/images/roof-germany.jpg" },
    { icon: Warehouse, title: t("sectors.infra.title"), desc: t("sectors.infra.desc"), img: "/images/road-works.jpg" },
  ];

  return (
    <div>
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <p className="text-xs font-semibold text-accent tracking-widest uppercase mb-4">{t("sectors.eyebrow")}</p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">{t("sectors.title")}</h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-6 leading-relaxed">{t("sectors.subtitle")}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((s) => (
            <article key={s.title} className="group bg-card border border-border rounded-xl overflow-hidden hover:border-accent/40 hover:shadow-xl transition-all duration-300">
              <div className="relative h-52 overflow-hidden">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-background/95 flex items-center justify-center backdrop-blur-sm">
                  <s.icon className="text-accent" size={18} strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-bold text-lg mb-2 leading-snug">{s.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </article>
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
