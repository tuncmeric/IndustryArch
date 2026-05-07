import { useI18n } from "@/lib/i18n";
import { Landmark, Home, Building2, UtensilsCrossed, Warehouse, HardHat, Heart, Wrench, Shield } from "lucide-react";
import { useState } from "react";

type Category = "all" | "diplomatic" | "residential" | "commercial" | "gastro" | "institutional" | "road" | "social";

export default function ProjectsPage() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const categories: { key: Category; label: string; icon: typeof Building2 }[] = [
    { key: "all", label: t("nav.projects"), icon: Building2 },
    { key: "diplomatic", label: t("projects.cat.diplomatic"), icon: Shield },
    { key: "residential", label: t("projects.cat.residential"), icon: Home },
    { key: "commercial", label: t("projects.cat.commercial"), icon: Building2 },
    { key: "gastro", label: t("projects.cat.gastro"), icon: UtensilsCrossed },
    { key: "institutional", label: t("projects.cat.institutional"), icon: Warehouse },
    { key: "road", label: t("projects.cat.road"), icon: HardHat },
    { key: "social", label: t("projects.cat.social"), icon: Heart },
  ];

  const projects = [
    { category: "diplomatic", title: t("projects.turkey.title"), desc: t("projects.turkey.desc"), area: "3 Buildings", status: t("projects.turkey.status"), icon: Landmark, image: "/images/turkish-embassy.jpg", scopes: [t("projects.turkey.scope1"), t("projects.turkey.scope2"), t("projects.turkey.scope3"), t("projects.turkey.scope4")] },
    { category: "diplomatic", title: t("projects.usa.title"), desc: t("projects.usa.desc"), area: "+3,000 m²", status: t("projects.usa.status"), icon: Home, image: "/images/usa-residence.jpg" },
    { category: "residential", title: t("projects.willa.title"), desc: t("projects.willa.desc"), area: "+4,050 m²", icon: Home, image: "/images/willa-wojcieszyn.jpg" },
    { category: "residential", title: t("projects.mokotow.title"), desc: t("projects.mokotow.desc"), area: "+1,458 m²", icon: Building2, image: "/images/mokotow-building.jpg" },
    { category: "residential", title: t("projects.wawer.title"), desc: t("projects.wawer.desc"), area: "+150 m²", icon: Home },
    { category: "commercial", title: t("projects.mabel.title"), desc: t("projects.mabel.desc"), area: "+200 m²", icon: Building2, image: "/images/mabel-clinic.jpg" },
    { category: "commercial", title: t("projects.kolin.title"), desc: t("projects.kolin.desc"), area: "+400 m²", icon: Building2 },
    { category: "commercial", title: t("projects.polandstudy.title"), desc: t("projects.polandstudy.desc"), area: "+160 m²", icon: Building2 },
    { category: "gastro", title: t("projects.bodrum.title"), desc: t("projects.bodrum.desc"), area: "+145 m²", icon: UtensilsCrossed, image: "/images/restaurant-bodrum.jpg" },
    { category: "gastro", title: t("projects.sirin.title"), desc: t("projects.sirin.desc"), area: "+120 m²", icon: UtensilsCrossed, image: "/images/restaurant-sirin.jpg" },
    { category: "gastro", title: t("projects.olimpos.title"), desc: t("projects.olimpos.desc"), area: "+180 m²", icon: UtensilsCrossed },
    { category: "gastro", title: t("projects.nefis.title"), desc: t("projects.nefis.desc"), area: "+60 m²", icon: UtensilsCrossed },
    { category: "gastro", title: t("projects.istanbul.title"), desc: t("projects.istanbul.desc"), area: "+120 m²", icon: UtensilsCrossed },
    { category: "institutional", title: t("projects.targowek.title"), desc: t("projects.targowek.desc"), area: "+450 m²", icon: Warehouse },
    { category: "institutional", title: t("projects.lider.title"), desc: t("projects.lider.desc"), area: "+200 m²", icon: Warehouse },
    { category: "institutional", title: t("projects.germany.title"), desc: t("projects.germany.desc"), area: "+350 m²", icon: Warehouse, image: "/images/roof-germany.jpg" },
    { category: "road", title: t("projects.road.title"), desc: t("projects.road.desc"), area: "3,500+ m", icon: HardHat, image: "/images/road-works.jpg" },
    { category: "social", title: t("projects.turkpol.title"), desc: t("projects.turkpol.desc"), icon: Heart, image: "/images/turkpol.jpg" },
  ] as const;

  const filtered = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <div>
      <section className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">{t("projects.title")}</h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">{t("projects.subtitle")}</p>
        </div>
      </section>

      <section className="border-b border-border sticky top-16 sm:top-20 z-40 bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <cat.icon size={14} />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, idx) => (
            <div key={idx} className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors group">
              {"image" in project && project.image && (
                <div className="relative h-48 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <project.icon className="text-primary" size={20} />
                  </div>
                  {"status" in project && project.status && (
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{project.status}</span>
                  )}
                </div>
                <h3 className="font-bold text-sm sm:text-base mb-2 leading-snug">{project.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">{project.desc}</p>
                {"scopes" in project && project.scopes && (
                  <ul className="text-xs text-muted-foreground space-y-1 mb-3 ml-4 list-disc">
                    {project.scopes.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                )}
                {"area" in project && project.area && (
                  <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border">
                    <Wrench size={12} className="text-primary" />
                    <span className="text-xs font-semibold text-foreground">{project.area}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
