import Link from "next/link";
import { LogoHorizontal, LogoMark } from "@/components/Logo";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

const cols = [
  {
    title: "What we do",
    links: [
      { href: "/websites", label: "Websites" },
      { href: "/ai-assistants", label: "AI Assistants" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/work", label: "Our work" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer({ showCta = true }: { showCta?: boolean }) {
  return (
    <footer className="on-ink relative overflow-hidden bg-ink text-paper">
      {showCta && (
        <div className="container-pdn pt-24 lg:pt-40">
          <p className="t-label mb-8 text-paper/60">Ready when you are</p>
          <p className="t-display balance max-w-[14ch]">Let&apos;s make sure you answer.</p>
          <div className="mt-12">
            <Button href="/contact">Book a free call</Button>
          </div>
        </div>
      )}

      <div className="container-pdn relative pb-10 pt-24 lg:pt-32">
        {/* the river line arrives and encircles the mark */}
        <div aria-hidden className="pointer-events-none absolute right-[var(--gutter)] top-6 hidden h-40 w-40 lg:block">
          <svg viewBox="0 0 160 160" className="absolute inset-0 h-full w-full overflow-visible">
            <path
              d="M-400 40 C-200 40 -40 10 40 20 C120 30 150 80 120 120 C90 160 30 150 20 110 C10 70 50 30 90 32"
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <LogoMark className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 text-paper" />
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-12 border-t border-grey-700 pt-12">
          <div className="col-span-12 lg:col-span-5">
            <LogoHorizontal className="h-9 w-auto text-paper" />
            <p className="mt-6 max-w-sm text-paper/70">
              Websites and AI assistants for businesses that serve real people.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title} className="col-span-6 lg:col-span-2">
              <p className="t-label mb-5 text-paper/50">{c.title}</p>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-gold transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-12 lg:col-span-3">
            <p className="t-label mb-5 text-paper/50">Talk to us</p>
            <ul className="space-y-3">
              <li><a href={`mailto:${site.email}`} className="hover:text-gold transition-colors">{site.email}</a></li>
              <li><a href={site.whatsappHref} className="hover:text-gold transition-colors">WhatsApp {site.whatsappDisplay}</a></li>
              <li><a href={site.phoneHref} className="hover:text-gold transition-colors">{site.phoneDisplay}</a></li>
            </ul>
            <ul className="mt-6 flex gap-5">
              {site.socials.map((s) => (
                <li key={s.label}><a href={s.href} className="t-label text-paper/70 hover:text-gold transition-colors">{s.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-3 text-sm text-paper/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Pishon Digital Network.</p>
          <p>Made by people who answer their messages.</p>
        </div>
      </div>
    </footer>
  );
}
