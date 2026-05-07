import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  title: string;
  updated: string;
  children: ReactNode;
  back: string;
}

export function LegalLayout({ title, updated, children, back }: Props) {
  return (
    <div>
      <section className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            {back}
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">{title}</h1>
          <p className="text-sm text-muted-foreground">{updated}</p>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-5 sm:px-8 py-12 sm:py-16 prose-legal">
        {children}
      </article>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: ReactNode;
}

export function LegalSection({ title, children }: SectionProps) {
  return (
    <section className="mb-10">
      <h2 className="text-lg sm:text-xl font-bold mb-4 tracking-tight text-foreground">{title}</h2>
      <div className="text-sm sm:text-[0.95rem] text-foreground/80 leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}
