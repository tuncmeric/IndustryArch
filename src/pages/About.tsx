import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import {
  Clock, Pencil, Handshake, Eye, CheckCircle2,
  Landmark, Lock, ArrowRight, Building2, Compass, Flag,
} from "lucide-react";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/turkish-embassy.jpg" alt="" aria-hidden="true" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-accent" />
            <p className="text-[11px] font-semibold text-accent tracking-[0.2em] uppercase">{t("about.eyebrow")}</p>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] max-w-4xl mb-7">{t("about.title")}</h1>
          <p className="text-primary-foreground/80 text-base sm:text-lg leading-relaxed max-w-3xl">{t("about.intro")}</p>
          <p className="text-primary-foreground/70 text-sm sm:text-base leading-relaxed max-w-3xl mt-4">{t("about.focus")}</p>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-px bg-border rounded-md overflow-hidden border border-border">
            <div className="bg-card p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-5">
                <Compass className="text-accent" size={26} strokeWidth={1.5} />
                <p className="text-[11px] font-semibold text-accent tracking-[0.2em] uppercase">{t("about.vision.eyebrow")}</p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-5 tracking-tight leading-[1.15]">{t("about.vision.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">{t("about.vision.desc")}</p>
            </div>
            <div className="bg-card p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-5">
                <Flag className="text-accent" size={26} strokeWidth={1.5} />
                <p className="text-[11px] font-semibold text-accent tracking-[0.2em] uppercase">{t("about.mission.eyebrow")}</p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-5 tracking-tight leading-[1.15]">{t("about.mission.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">{t("about.mission.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ROLE & HOW WE WORK */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-5 tracking-tight">{t("about.role.title")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{t("about.role.desc")}</p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-5 tracking-tight">{t("about.howwework.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">{t("about.howwework.desc")}</p>
            </div>
            <div className="lg:col-span-6">
              <h3 className="text-base font-bold uppercase tracking-wider text-accent mb-5">{t("about.scope.title")}</h3>
              <div className="space-y-3">
                {["about.scope.1", "about.scope.2", "about.scope.3", "about.scope.4"].map((key) => (
                  <div key={key} className="flex items-start gap-3 bg-background border border-border rounded-md p-4">
                    <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={18} strokeWidth={2} />
                    <span className="text-sm text-foreground/85 leading-relaxed">{t(key)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <div className="max-w-3xl mb-14">
            <p className="text-[11px] font-semibold text-accent tracking-[0.2em] uppercase mb-4">Milestones</p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold tracking-tight leading-[1.1]">{t("about.timeline.title")}</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[15px] sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-border" />
            <div className="space-y-10">
              {[1, 2, 3, 4, 5].map((i, idx) => (
                <div key={i} className={`relative grid sm:grid-cols-2 gap-6 sm:gap-12 ${idx % 2 === 0 ? "" : "sm:[&>*:first-child]:order-2"}`}>
                  <div className="pl-12 sm:pl-0 sm:text-right sm:pr-12">
                    <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-1.5 w-[31px] h-[31px] rounded-full bg-accent border-4 border-background flex items-center justify-center shadow">
                      <span className="text-[10px] font-bold text-accent-foreground">{i.toString().padStart(2, "0")}</span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold text-accent tracking-tight mb-1">{t(`about.timeline.${i}.y`)}</div>
                    <div className="text-base font-bold tracking-tight">{t(`about.timeline.${i}.t`)}</div>
                  </div>
                  <div className="pl-12 sm:pl-12">
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(`about.timeline.${i}.d`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTERNATIONAL EXPERIENCE */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-5 tracking-tight">{t("about.experience.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">{t("about.experience.desc")}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-background border border-border rounded-md p-5">
                <div className="w-11 h-11 bg-accent/10 rounded-md flex items-center justify-center shrink-0">
                  <Landmark className="text-accent" size={20} strokeWidth={1.6} />
                </div>
                <p className="text-sm text-foreground/85 leading-relaxed">{t("about.experience.turkey")}</p>
              </div>
              <div className="flex items-start gap-4 bg-background border border-border rounded-md p-5">
                <div className="w-11 h-11 bg-accent/10 rounded-md flex items-center justify-center shrink-0">
                  <Lock className="text-accent" size={20} strokeWidth={1.6} />
                </div>
                <p className="text-sm text-foreground/85 leading-relaxed">{t("about.experience.usa")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <div className="max-w-3xl mb-12">
            <p className="text-[11px] font-semibold text-accent tracking-[0.2em] uppercase mb-4">Values</p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold tracking-tight leading-[1.1]">{t("about.values.title")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-md overflow-hidden border border-border">
            {[
              { icon: Clock, title: t("about.values.timeliness"), desc: t("about.values.timeliness.desc") },
              { icon: Pencil, title: t("about.values.architect"), desc: t("about.values.architect.desc") },
              { icon: Handshake, title: t("about.values.partners"), desc: t("about.values.partners.desc") },
              { icon: Eye, title: t("about.values.transparency"), desc: t("about.values.transparency.desc") },
            ].map((value) => (
              <div key={value.title} className="bg-card p-7 hover:bg-background transition-colors">
                <value.icon className="text-accent mb-5" size={26} strokeWidth={1.5} />
                <h3 className="font-bold text-base mb-2 tracking-tight">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GROUP & TAGLINE */}
      <section className="bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-24 text-center">
          <Building2 className="text-accent mx-auto mb-6" size={36} strokeWidth={1.4} />
          <h2 className="text-2xl sm:text-3xl font-bold mb-5 tracking-tight">{t("about.group.title")}</h2>
          <p className="text-primary-foreground/75 leading-relaxed max-w-2xl mx-auto mb-10">{t("about.group.desc")}</p>
          <p className="text-lg sm:text-xl font-bold tracking-tight max-w-3xl mx-auto mb-8">{t("about.tagline")}</p>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-7 py-4 rounded-md font-semibold text-sm hover:opacity-90 transition-all shadow-xl shadow-accent/20">
            {t("hero.cta")}
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
