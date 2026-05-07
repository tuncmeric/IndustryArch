import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import {
  Building2, Users, ArrowRight, Home, Ruler,
  Briefcase, HardHat, PaintBucket, Shield, CheckCircle2,
  UtensilsCrossed, Landmark, Wrench, MapPin,
  ShieldCheck, ClipboardCheck, FileBarChart2, Lock,
  Search, ShoppingCart, Activity, AlertTriangle, FileText, LifeBuoy,
  Heart, Globe,
} from "lucide-react";

export default function HomePage() {
  const { t } = useI18n();

  const featured = [
    { title: t("projects.turkey.title"), desc: t("projects.turkey.desc"), area: "3 Buildings", status: t("projects.turkey.status"), image: "/images/turkish-embassy.jpg", category: t("projects.cat.diplomatic"), location: t("case.turkey.location"), scope: t("case.turkey.scope"), outcome: t("case.turkey.outcome"), role: t("meta.gc"), sensitive: true },
    { title: t("projects.usa.title"), desc: t("projects.usa.desc"), area: "+3,000 m²", status: t("projects.usa.status"), image: "/images/usa-residence.jpg", category: t("projects.cat.diplomatic"), location: t("case.usa.location"), scope: t("case.usa.scope"), outcome: t("case.usa.outcome"), role: t("meta.sub"), sensitive: true },
    { title: t("projects.willa.title"), desc: t("projects.willa.desc"), area: "+4,050 m²", image: "/images/willa-wojcieszyn.jpg", category: t("projects.cat.residential"), location: t("case.willa.location"), scope: t("case.willa.scope"), outcome: t("case.willa.outcome"), role: t("meta.gc") },
    { title: t("projects.mokotow.title"), desc: t("projects.mokotow.desc"), area: "+1,458 m²", image: "/images/mokotow-building.jpg", category: t("projects.cat.residential"), location: t("case.mokotow.location"), scope: t("case.mokotow.scope"), outcome: t("case.mokotow.outcome"), role: t("meta.pm") },
  ];

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/turkish-embassy.jpg" alt="" aria-hidden="true" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-32 sm:py-40 w-full">
          <div className="flex items-center gap-3 mb-7">
            <span className="h-px w-10 bg-accent" />
            <p className="text-[11px] sm:text-xs font-semibold text-accent tracking-[0.2em] uppercase">{t("hero.badge")}</p>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight max-w-5xl">
            {t("hero.title")} <span className="text-accent">{t("hero.subtitle")}</span>
          </h1>
          <p className="text-accent/95 text-base sm:text-lg font-semibold mt-6 tracking-tight">{t("hero.authority")}</p>
          <p className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mt-5 leading-relaxed">{t("hero.desc")}</p>
          <div className="flex items-start gap-3 mt-6 max-w-2xl">
            <Lock size={16} className="text-accent shrink-0 mt-1" strokeWidth={1.8} />
            <p className="text-sm text-primary-foreground/70 italic leading-relaxed">{t("hero.trust")}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-7 py-4 rounded-md font-semibold text-sm hover:opacity-90 transition-all shadow-xl shadow-accent/20">
              {t("hero.cta")}
              <ArrowRight size={15} />
            </Link>
            <Link to="/projects" className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-7 py-4 rounded-md font-semibold text-sm hover:bg-primary-foreground/10 transition-all">
              {t("hero.cta2")}
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 mt-16 pt-10 border-t border-primary-foreground/15 max-w-4xl">
            {[
              { v: "10+", l: t("stats.experience") },
              { v: "50+", l: t("stats.projects") },
              { v: "80+", l: t("stats.team") },
              { v: "10K+", l: t("stats.area") },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl sm:text-3xl font-bold text-accent tracking-tight">{s.v}</div>
                <div className="text-[11px] sm:text-xs text-primary-foreground/60 mt-1.5 uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-[11px] sm:text-xs text-muted-foreground font-semibold uppercase tracking-wider">
            {["trust.warsaw", "trust.diplomatic", "trust.gc", "trust.sectors", "trust.since"].map((key) => (
              <span key={key} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-accent" />
                {t(key)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <p className="text-[11px] font-semibold text-accent tracking-[0.2em] uppercase mb-4">{t("home.about.eyebrow")}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold mb-7 leading-[1.1] tracking-tight">{t("home.about.title")}</h2>
              <p className="text-foreground/80 leading-relaxed text-base mb-5">{t("home.about.desc")}</p>
              <p className="text-foreground/80 leading-relaxed text-base mb-8">{t("home.about.desc2")}</p>
              <Link to="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground border-b-2 border-accent pb-1 hover:text-accent transition-colors">
                {t("home.about.cta")}
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="lg:col-span-6 relative">
              <div className="rounded-md overflow-hidden shadow-2xl shadow-primary/10">
                <img src="/images/turkish-embassy.jpg" alt="IndustryArch diplomatic project — Warsaw" className="w-full h-72 sm:h-[520px] object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-primary text-primary-foreground p-5 sm:p-6 rounded-md shadow-xl hidden sm:block max-w-[260px]">
                <Lock size={18} className="text-accent mb-2" strokeWidth={1.8} />
                <div className="text-xs uppercase tracking-wider text-primary-foreground/60 mb-1">Active since 2024</div>
                <div className="text-sm font-semibold leading-snug">Trusted contractor for diplomatic premises in Warsaw</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold text-accent tracking-[0.2em] uppercase mb-4">{t("services.eyebrow")}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold mb-4 tracking-tight leading-[1.1]">{t("services.title")}</h2>
              <p className="text-muted-foreground text-base">{t("services.subtitle")}</p>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors shrink-0">
              {t("services.viewall")}
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-md overflow-hidden">
            {[
              { icon: Briefcase, title: t("services.gc.title"), desc: t("services.gc.desc") },
              { icon: HardHat, title: t("services.pm.title"), desc: t("services.pm.desc") },
              { icon: Home, title: t("services.house.title"), desc: t("services.house.desc") },
              { icon: PaintBucket, title: t("services.reno.title"), desc: t("services.reno.desc") },
            ].map((service) => (
              <div key={service.title} className="group bg-card p-7 hover:bg-background transition-all duration-300">
                <service.icon className="text-accent mb-5" size={26} strokeWidth={1.5} />
                <h3 className="font-bold text-base mb-3 tracking-tight">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold text-accent tracking-[0.2em] uppercase mb-4">{t("home.projects.eyebrow")}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold mb-4 tracking-tight leading-[1.1]">{t("home.projects.title")}</h2>
              <p className="text-muted-foreground text-base">{t("projects.subtitle")}</p>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors shrink-0">
              {t("projects.viewall")}
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {featured.map((p) => (
              <article key={p.title} className="group bg-card border border-border rounded-md overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:border-accent/30 transition-all duration-300 flex flex-col">
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {p.status && <span className="text-[10px] font-bold uppercase tracking-wider bg-accent text-accent-foreground px-2.5 py-1 rounded">{p.status}</span>}
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-background/95 text-foreground px-2.5 py-1 rounded backdrop-blur-sm">{p.category}</span>
                    {p.sensitive && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground px-2.5 py-1 rounded flex items-center gap-1">
                        <Lock size={10} /> Restricted
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6 sm:p-7 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg sm:text-xl mb-2 leading-snug tracking-tight">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.desc}</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 py-4 border-t border-border text-xs">
                    <div>
                      <div className="text-muted-foreground uppercase tracking-wider text-[10px] mb-1 flex items-center gap-1.5"><MapPin size={10} />{t("meta.location")}</div>
                      <div className="font-semibold text-foreground">{p.location}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground uppercase tracking-wider text-[10px] mb-1 flex items-center gap-1.5"><Ruler size={10} />{t("meta.area")}</div>
                      <div className="font-semibold text-foreground">{p.area}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground uppercase tracking-wider text-[10px] mb-1 flex items-center gap-1.5"><Wrench size={10} />{t("meta.scope")}</div>
                      <div className="font-semibold text-foreground">{p.scope}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground uppercase tracking-wider text-[10px] mb-1 flex items-center gap-1.5"><Briefcase size={10} />{t("meta.role")}</div>
                      <div className="font-semibold text-foreground">{p.role}</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border mt-auto">
                    <div className="text-muted-foreground uppercase tracking-wider text-[10px] mb-1.5 flex items-center gap-1.5"><CheckCircle2 size={10} className="text-accent" />{t("meta.outcome")}</div>
                    <p className="text-sm font-medium text-foreground leading-snug">{p.outcome}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXECUTION & TRUST */}
      <section className="bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <div className="max-w-3xl mb-14">
            <p className="text-[11px] font-semibold text-accent tracking-[0.2em] uppercase mb-4">{t("exec.eyebrow")}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold mb-5 tracking-tight leading-[1.1]">{t("exec.title")}</h2>
            <p className="text-primary-foreground/70 text-base sm:text-lg leading-relaxed">{t("exec.subtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-primary-foreground/10 rounded-md overflow-hidden">
            {[
              { icon: ShieldCheck, title: t("standards.quality.title"), desc: t("standards.quality.desc") },
              { icon: HardHat, title: t("standards.hse.title"), desc: t("standards.hse.desc") },
              { icon: ClipboardCheck, title: t("standards.budget.title"), desc: t("standards.budget.desc") },
              { icon: FileBarChart2, title: t("standards.report.title"), desc: t("standards.report.desc") },
              { icon: Users, title: t("standards.subs.title"), desc: t("standards.subs.desc") },
              { icon: Lock, title: t("sectors.diplomatic.title"), desc: t("sectors.diplomatic.desc") },
            ].map((s, idx) => (
              <div key={s.title} className="bg-primary p-7 hover:bg-primary-foreground/[0.03] transition-colors">
                <div className="flex items-center justify-between mb-5">
                  <s.icon className="text-accent" size={24} strokeWidth={1.5} />
                  <span className="text-xs font-mono text-primary-foreground/30 tracking-widest">0{idx + 1}</span>
                </div>
                <h3 className="font-bold text-base mb-3 tracking-tight">{s.title}</h3>
                <p className="text-sm text-primary-foreground/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-primary-foreground/15">
            <Link to="/standards" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-primary-foreground transition-colors">
              {t("standards.viewall")}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <div className="max-w-3xl mb-14">
            <p className="text-[11px] font-semibold text-accent tracking-[0.2em] uppercase mb-4">{t("process.eyebrow")}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold mb-4 tracking-tight leading-[1.1]">{t("process.title")}</h2>
            <p className="text-muted-foreground text-base leading-relaxed">{t("process.subtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-md overflow-hidden border border-border">
            {[
              { icon: Search, t: t("process.1.t"), d: t("process.1.d") },
              { icon: ShoppingCart, t: t("process.2.t"), d: t("process.2.d") },
              { icon: Activity, t: t("process.3.t"), d: t("process.3.d") },
              { icon: AlertTriangle, t: t("process.4.t"), d: t("process.4.d") },
              { icon: FileText, t: t("process.5.t"), d: t("process.5.d") },
              { icon: LifeBuoy, t: t("process.6.t"), d: t("process.6.d") },
            ].map((s, idx) => (
              <div key={s.t} className="bg-card p-7 hover:bg-background transition-colors relative">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-md bg-accent/10 flex items-center justify-center">
                    <s.icon className="text-accent" size={20} strokeWidth={1.6} />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground/40 tracking-widest">STAGE 0{idx + 1}</span>
                </div>
                <h3 className="font-bold text-base mb-2 tracking-tight">{s.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <div className="grid lg:grid-cols-12 gap-12 mb-14">
            <div className="lg:col-span-5">
              <p className="text-[11px] font-semibold text-accent tracking-[0.2em] uppercase mb-4">{t("wcu.eyebrow")}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold tracking-tight leading-[1.1]">{t("wcu.title")}</h2>
            </div>
            <div className="lg:col-span-7 lg:pt-2">
              <p className="text-muted-foreground text-base leading-relaxed">{t("hero.trust")}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {[
              { n: "01", t: t("wcu.1.t"), d: t("wcu.1.d") },
              { n: "02", t: t("wcu.2.t"), d: t("wcu.2.d") },
              { n: "03", t: t("wcu.3.t"), d: t("wcu.3.d") },
              { n: "04", t: t("wcu.4.t"), d: t("wcu.4.d") },
              { n: "05", t: t("wcu.5.t"), d: t("wcu.5.d") },
              { n: "06", t: t("wcu.6.t"), d: t("wcu.6.d") },
            ].map((item) => (
              <div key={item.n} className="border-t-2 border-accent pt-5">
                <div className="text-xs font-mono text-accent tracking-widest mb-2">{item.n}</div>
                <h3 className="font-bold text-base mb-2 tracking-tight">{item.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REFERENCES */}
      <section className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <div className="max-w-3xl mb-12">
            <p className="text-[11px] font-semibold text-accent tracking-[0.2em] uppercase mb-4">{t("ref.eyebrow")}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold mb-4 tracking-tight leading-[1.1]">{t("ref.title")}</h2>
            <p className="text-muted-foreground text-base leading-relaxed">{t("ref.subtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-md overflow-hidden border border-border">
            {[
              { icon: Lock, label: t("ref.diplo"), note: t("ref.diplo.note"), restricted: true },
              { icon: Shield, label: t("ref.diplo2"), note: t("ref.diplo2.note"), restricted: true },
              { icon: Building2, label: t("ref.dev"), note: t("ref.dev.note") },
              { icon: Briefcase, label: t("ref.corp"), note: t("ref.corp.note") },
              { icon: Globe, label: t("ref.intl"), note: t("ref.intl.note") },
              { icon: Heart, label: t("ref.foundation"), note: t("ref.foundation.note") },
            ].map((r) => (
              <div key={r.label} className="bg-card p-7">
                <div className="flex items-center justify-between mb-4">
                  <r.icon className="text-accent" size={22} strokeWidth={1.6} />
                  {r.restricted && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/5 text-primary px-2 py-0.5 rounded border border-primary/10">NDA</span>
                  )}
                </div>
                <h3 className="font-bold text-sm mb-2 tracking-tight uppercase">{r.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 bg-card border border-border rounded-md flex items-start gap-3">
            <Lock size={16} className="text-accent shrink-0 mt-0.5" strokeWidth={1.8} />
            <p className="text-xs sm:text-sm text-muted-foreground italic leading-relaxed">{t("ref.confidential.note")}</p>
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold text-accent tracking-[0.2em] uppercase mb-4">{t("sectors.eyebrow")}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold mb-4 tracking-tight leading-[1.1]">{t("sectors.title")}</h2>
              <p className="text-muted-foreground text-base">{t("sectors.subtitle")}</p>
            </div>
            <Link to="/sectors" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors shrink-0">
              {t("sectors.viewall")}
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Shield, label: t("sectors.diplomatic.title"), img: "/images/turkish-embassy.jpg" },
              { icon: Home, label: t("sectors.residential.title"), img: "/images/willa-wojcieszyn.jpg" },
              { icon: Briefcase, label: t("sectors.commercial.title"), img: "/images/mabel-clinic.jpg" },
              { icon: UtensilsCrossed, label: t("sectors.hospitality.title"), img: "/images/restaurant-bodrum.jpg" },
            ].map((item) => (
              <div key={item.label} className="group relative rounded-md overflow-hidden h-64 sm:h-80">
                <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <item.icon className="text-accent mb-2" size={20} strokeWidth={1.5} />
                  <span className="font-bold text-base text-primary-foreground tracking-tight">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-24 sm:py-32 text-center">
          <Landmark className="text-accent mx-auto mb-7" size={40} strokeWidth={1.3} />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-[1.1] tracking-tight">{t("cta.title")}</h2>
          <p className="text-primary-foreground/70 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">{t("cta.desc")}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-md font-semibold text-sm hover:opacity-90 transition-all shadow-xl shadow-accent/20">
              {t("cta.button")}
              <ArrowRight size={15} />
            </Link>
            <Link to="/projects" className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-md font-semibold text-sm hover:bg-primary-foreground/10 transition-all">
              {t("hero.cta2")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
