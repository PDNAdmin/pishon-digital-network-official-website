import type { CSSProperties, ReactNode } from "react";
import { C, FONT, MONO } from "../theme";
import { MarkGlyph } from "./Mark";

/** A matte-black phone with status bar + chat header. Screen content is passed as children. */
export function Phone({
  width = 420,
  title,
  subtitle = "AI assistant · replies in seconds",
  time = "11:41 PM",
  avatarText,
  children,
  style,
  footer = true,
  bezel = true,
  height,
}: {
  width?: number;
  title: string;
  subtitle?: string;
  time?: string;
  avatarText?: string;
  children: ReactNode;
  style?: CSSProperties;
  footer?: boolean;
  /** false = screen only (for compositing onto a photo of a real phone) */
  bezel?: boolean;
  height?: number;
}) {
  const h = height ?? width * 2.05;
  return (
    <div
      style={{
        width,
        height: h,
        borderRadius: bezel ? width * 0.14 : 0,
        background: bezel ? "#000" : C.paper,
        padding: bezel ? width * 0.028 : 0,
        boxShadow: bezel ? "0 40px 80px rgba(0,0,0,0.35)" : "none",
        fontFamily: FONT,
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: bezel ? width * 0.115 : 0,
          background: C.paper,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          color: C.ink,
        }}
      >
        {/* status bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${width * 0.035}px ${width * 0.07}px ${width * 0.015}px`, fontFamily: MONO, fontSize: width * 0.028 }}>
          <span>{time}</span>
          <span style={{ width: width * 0.24, height: width * 0.06, borderRadius: 99, background: "#000" }} />
          <span style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
            {[5, 7, 9].map((hh) => (
              <i key={hh} style={{ display: "block", width: 3, height: hh, borderRadius: 1, background: C.ink }} />
            ))}
          </span>
        </div>
        {/* chat header */}
        <div style={{ display: "flex", alignItems: "center", gap: width * 0.03, padding: `${width * 0.02}px ${width * 0.045}px ${width * 0.035}px`, borderBottom: `1px solid ${C.g200}` }}>
          <div style={{ width: width * 0.1, height: width * 0.1, borderRadius: 99, background: C.ink, color: C.paper, display: "flex", alignItems: "center", justifyContent: "center", fontSize: width * 0.035, fontWeight: 600 }}>
            {avatarText ?? <MarkGlyph size={width * 0.055} color={C.paper} />}
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: width * 0.038, fontWeight: 500 }}>{title}</div>
            <div style={{ fontSize: width * 0.029, color: C.g500 }}>{subtitle}</div>
          </div>
        </div>
        {/* screen */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>{children}</div>
        {footer && (
          <div style={{ padding: `${width * 0.03}px ${width * 0.04}px ${width * 0.05}px`, borderTop: `1px solid ${C.g200}` }}>
            <div style={{ height: width * 0.095, borderRadius: 99, background: C.g200, opacity: 0.7, display: "flex", alignItems: "center", paddingLeft: width * 0.045, fontSize: width * 0.032, color: C.g500 }}>Message</div>
          </div>
        )}
      </div>
    </div>
  );
}
