"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LogoHorizontal } from "@/components/Logo";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

const links = [
  { href: "/websites", label: "Websites" },
  { href: "/ai-assistants", label: "AI Assistants" },
  { href: "/work", label: "Our work" },
  { href: "/about", label: "About" },
];

/** Text that rolls up and is replaced by itself on hover (Off Brand detail). */
function RollLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="group relative block overflow-hidden text-[15px] font-medium">
      <span className="block transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-full">
        {label}
      </span>
      <span aria-hidden className="absolute inset-0 translate-y-full transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-y-0">
        {label}
      </span>
    </Link>
  );
}

export default function Nav({ minimal = false, dark = false }: { minimal?: boolean; dark?: boolean }) {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > 400 && y > last.current && !open);
      last.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-out-expo)] ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${open ? "border-b border-transparent bg-transparent text-paper" : solid ? "border-b border-grey-200 bg-paper/95 text-ink" : `border-b border-transparent bg-transparent ${dark ? "text-paper" : "text-ink"}`}`}
      >
        <div className="container-pdn flex h-[72px] items-center justify-between lg:h-[84px]">
          <Link href="/" aria-label="PDN home" className="text-current transition-colors duration-300">
            <LogoHorizontal className="h-8 w-auto lg:h-9" />
          </Link>

          {minimal ? (
            <div className="flex items-center gap-6 text-[15px] font-medium">
              <a href={site.whatsappHref} className="hidden sm:block underline decoration-1 underline-offset-[6px] hover:decoration-transparent">
                WhatsApp us
              </a>
              <a href={site.phoneHref} className="underline decoration-1 underline-offset-[6px] hover:decoration-transparent">
                Call
              </a>
            </div>
          ) : (
            <>
              <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
                {links.map((l) => (
                  <RollLink key={l.href} {...l} />
                ))}
                <Button href="/contact" className="ml-2">Book a free call</Button>
              </nav>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                data-magnetic
                className="relative flex h-12 w-12 items-center justify-center rounded-full border border-current lg:hidden"
              >
                <span className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
                <span className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
              </button>
            </>
          )}
        </div>
      </header>

      {!minimal && (
        <div
          id="mobile-menu"
          className={`on-ink fixed inset-0 z-40 flex flex-col bg-ink text-paper transition-[clip-path] duration-700 ease-[var(--ease-out-expo)] lg:hidden ${
            open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
          }`}
        >
          <nav aria-label="Mobile" className="container-pdn flex flex-1 flex-col justify-center gap-4 pt-20">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="t-h1 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]"
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms", opacity: open ? 1 : 0, transform: open ? "none" : "translateY(24px)" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="container-pdn pb-10">
            <Button href="/contact" full>Book a free call</Button>
          </div>
        </div>
      )}
    </>
  );
}
