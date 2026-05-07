import { useI18n } from "@/lib/i18n";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Lock } from "lucide-react";
import logo from "@/assets/logo.svg";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-primary text-primary-foreground border-t-4 border-accent">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <img src={logo} alt="IndustryArch" className="h-24 w-auto mb-4" />
            <p className="text-sm text-primary-foreground/70 leading-relaxed mb-5">
              {t("footer.about_short")}
            </p>
            <div className="flex items-center gap-2 text-xs text-accent font-semibold uppercase tracking-wider">
              <Lock size={12} />
              <span>{t("trust.diplomatic")}</span>
            </div>
            <p className="text-xs text-primary-foreground/40 mt-5">{t("footer.group")}</p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-5">
              {t("footer.expertise")}
            </h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/services" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("services.gc.title")}</Link></li>
              <li><Link to="/services" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("services.pm.title")}</Link></li>
              <li><Link to="/services" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("services.house.title")}</Link></li>
              <li><Link to="/services" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("services.reno.title")}</Link></li>
              <li><Link to="/services" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("services.maint.title")}</Link></li>
            </ul>
          </div>

          {/* Sectors */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-5">
              {t("footer.sectors")}
            </h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/sectors" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("sectors.diplomatic.title")}</Link></li>
              <li><Link to="/sectors" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("sectors.residential.title")}</Link></li>
              <li><Link to="/sectors" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("sectors.commercial.title")}</Link></li>
              <li><Link to="/sectors" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("sectors.hospitality.title")}</Link></li>
              <li><Link to="/sectors" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("sectors.institutional.title")}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-5">
              {t("footer.company")}
            </h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/about" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("nav.about")}</Link></li>
              <li><Link to="/standards" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("nav.standards")}</Link></li>
              <li><Link to="/projects" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("nav.projects")}</Link></li>
              <li><Link to="/contact" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-5">
              {t("footer.contact")}
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/70 leading-snug">
                  ul. Wieniecka 6,<br />03-634 Warszawa
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-accent shrink-0" />
                <a href="tel:+48576107071" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  +48 576 10 70 71
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-accent shrink-0" />
                <a href="mailto:info@industryarch.com" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors break-all">
                  info@industryarch.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal links row */}
        <div className="border-t border-primary-foreground/10 mt-14 pt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link to="/privacy"  className="text-xs text-primary-foreground/60 hover:text-primary-foreground transition-colors">{t("legal.privacy")}</Link>
          <Link to="/cookies"  className="text-xs text-primary-foreground/60 hover:text-primary-foreground transition-colors">{t("legal.cookies")}</Link>
          <Link to="/terms"    className="text-xs text-primary-foreground/60 hover:text-primary-foreground transition-colors">{t("legal.terms")}</Link>
          <Link to="/imprint"  className="text-xs text-primary-foreground/60 hover:text-primary-foreground transition-colors">{t("legal.imprint")}</Link>
        </div>

        {/* Copyright + provider credit */}
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-primary-foreground/40 leading-relaxed">
            © {new Date().getFullYear()} IndustryArch Sp. z o.o. · {t("footer.rights")} · {t("footer.providedby")}{" "}
            <a
              href="https://www.teamknocknock.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/60 hover:text-accent transition-colors underline-offset-2 hover:underline"
            >
              Team Knocknock
            </a>
          </p>
          <p className="text-xs text-primary-foreground/40 uppercase tracking-wider">Warsaw · Poland</p>
        </div>
      </div>
    </footer>
  );
}
