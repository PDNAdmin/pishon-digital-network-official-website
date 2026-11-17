import Link from "next/link";
import type { ReactNode } from "react";
import { IconArrowRight } from "@/components/icons";

type Variant = "primary" | "secondary" | "secondary-light" | "text";

type Props = {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  full?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const base =
  "group relative inline-flex items-center justify-center gap-3 rounded-full font-medium text-[16px] leading-none transition-colors duration-200 select-none whitespace-nowrap disabled:opacity-60";

const styles: Record<Variant, string> = {
  // gold fill + INK text (contrast 9.6:1), never gold text on light
  primary: "h-[52px] pl-6 pr-[6px] bg-gold text-ink hover:bg-gold-deep",
  secondary:
    "h-[52px] px-6 border border-ink text-ink overflow-hidden isolate before:absolute before:inset-0 before:-z-10 before:bg-ink before:origin-left before:scale-x-0 before:transition-transform before:duration-300 before:ease-[var(--ease-out-expo)] hover:before:scale-x-100 hover:text-paper",
  "secondary-light":
    "h-[52px] px-6 border border-paper/60 text-paper overflow-hidden isolate before:absolute before:inset-0 before:-z-10 before:bg-paper before:origin-left before:scale-x-0 before:transition-transform before:duration-300 before:ease-[var(--ease-out-expo)] hover:before:scale-x-100 hover:text-ink",
  text: "h-auto px-0 underline decoration-1 underline-offset-[6px] hover:decoration-transparent",
};

function Inner({ children, variant }: { children: ReactNode; variant: Variant }) {
  if (variant === "text") return <span>{children}</span>;
  return (
    <>
      {/* label rolls up on hover; the copy is for the roll only */}
      <span className="relative -my-[0.2em] block overflow-hidden py-[0.2em]">
        <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-[130%]">{children}</span>
        <span aria-hidden className="absolute inset-x-0 top-[0.2em] block translate-y-[130%] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0">
          {children}
        </span>
      </span>
      {variant === "primary" && (
        <span data-magnetic-inner className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-ink text-paper transition-[scale] duration-300 ease-[var(--ease-out-expo)] group-hover:scale-110">
          <IconArrowRight className="h-[18px] w-[18px] transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-[150%]" />
          <IconArrowRight className="absolute h-[18px] w-[18px] -translate-x-[150%] transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0" />
        </span>
      )}
    </>
  );
}

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
  full,
  disabled,
  onClick,
}: Props) {
  const cls = `${base} ${styles[variant]} ${full ? "w-full" : ""} ${className}`;
  // magnetic pull + press ripple (components/motion/MicroFX), not on plain text links
  const fx = variant === "text" ? {} : { "data-magnetic": "", "data-ripple": "" };
  if (href) {
    return (
      <Link href={href} className={cls} {...fx}>
        <Inner variant={variant}>{children}</Inner>
      </Link>
    );
  }
  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick} {...fx}>
      <Inner variant={variant}>{children}</Inner>
    </button>
  );
}
