import { ImageResponse } from "next/og";

/** The preview card shown when the site is shared on WhatsApp, Instagram, Facebook, LinkedIn or X. */
export const alt = "PDN, Pishon Digital Network: websites people trust, and assistants that answer your customers day and night.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MARK = [
  "M38.29 21.13C37.8 20.37 37.44 19.45 37.57 19.26C38.33 18.09 38.98 17.35 39.11 17.2C41.62 14.34 44.5 14.27 45.93 16.13C48.86 19.95 41.63 26.32 38.29 21.13",
  "M16.12 40.28C16.17 40.11 16.48 39.04 17.02 38.27C19.75 34.39 24.62 35.29 25 35.33C25.44 35.37 25.28 35.56 25.24 35.75C24.69 38.12 24.42 39.15 23.29 41.2C20.62 46.05 15.35 44.82 16.12 40.28",
  "M44.32 52.04C44.23 52.69 44.25 53.72 43.01 55.15C41.26 57.15 37.5 57.27 36.44 54.06C35.48 51.11 37.86 47.74 42.41 46.12C42.8 45.98 42.77 46.18 42.94 46.55C43.44 47.63 44.47 49.74 44.32 52.04",
  "M37.19 0L57.07 0C64.47 0 70.48 6.01 70.48 13.41L70.48 29.67C61.83 33.49 48.83 39.25 45.4 40.59C45 40.75 45.05 39.89 42.78 37.67C38.24 33.22 31.53 31.97 31.48 31.92C31.39 31.8 32.34 29.77 32.74 28.79C32.81 28.61 34.11 25.76 34.27 25.37C34.72 24.28 34.82 24.26 34.88 24.33C35.16 24.64 35.07 24.72 35.99 25.6C41.54 30.9 52.61 25.7 51.1 16.53C50.31 11.7 43.99 7.46 37.59 12.39C37.49 12.46 37.5 12.45 37.39 12.54C37.22 12.68 37.21 12.56 37.21 12.55C37.18 11.8 37.18 5.83 37.19 0",
  "M70.48 35.06L70.48 53.64C70.48 61.04 64.47 67.05 57.07 67.05L13.41 67.05C6.01 67.05 0 61.04 0 53.64L0 13.41C0 6.01 6.01 0 13.41 0L31.94 0C31.94 5.04 31.95 9.83 31.98 10.74C32.2 16.98 32.84 17.52 32.58 17.91C30.67 20.88 28.08 26.96 28.05 27.03C26.54 30.61 26.57 30.62 26.44 30.93C26.3 31.25 24.82 30.55 21.59 30.89C17.42 31.32 13.88 33.9 12.23 37.55C9.39 43.84 14.15 49.37 19.71 48.86C28.01 48.1 29.58 37.24 30.07 36.36C30.21 36.12 37.44 38.28 40.22 41.9C40.4 42.13 40.27 42.17 40.03 42.27C38.36 43.01 34.02 45.04 32.29 49.52C30.18 54.98 33.7 60.61 39.07 61.15C44.29 61.67 50.9 56.6 48.48 47.93C47.81 45.53 47.21 44.9 47.5 44.82C48.33 44.6 60.81 39.09 70.48 35.06",
];

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0F0F10", color: "#F6F5F1", padding: "72px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="64" height="61" viewBox="0 0 70.48 67.05">
            {MARK.map((d, i) => (
              <path key={i} d={d} fill="#D4AF37" fillRule="evenodd" />
            ))}
          </svg>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "rgba(246,245,241,0.7)" }}>PISHON DIGITAL NETWORK</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, lineHeight: 1.04, letterSpacing: -2, maxWidth: 960 }}>Stop losing customers to slow replies and an old website.</div>
          {/* the river line */}
          <svg width="1040" height="60" viewBox="0 0 1040 60" style={{ marginTop: 34 }}>
            <path d="M0 30 C120 0 220 60 360 30 S600 0 740 30 S940 60 1030 30" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
            <circle cx="1030" cy="30" r="8" fill="#D4AF37" />
          </svg>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "rgba(246,245,241,0.7)" }}>
          <span>Websites · AI assistants</span>
          <span style={{ color: "#D4AF37" }}>Book a free call</span>
        </div>
      </div>
    ),
    size,
  );
}
