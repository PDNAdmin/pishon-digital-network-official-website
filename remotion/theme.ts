import { staticFile } from "remotion";

/** PDN tokens for Remotion scenes (inline styles so the same scenes work in the web Player and in CLI renders). */
export const C = {
  ink: "#0F0F10",
  paper: "#F6F5F1",
  white: "#FFFFFF",
  g900: "#1A1A1C",
  g700: "#3A3A3C",
  g500: "#77767A",
  g300: "#C9C7C0",
  g200: "#E3E1DB",
  gold: "#D4AF37",
  goldDeep: "#A8871F",
  green: "#2E7D4F",
  red: "#B8402E", // alert state only (showreel act 6)
};

export const FONT = "var(--font-satoshi), 'Satoshi', ui-sans-serif, system-ui, sans-serif";
export const MONO = "var(--font-jetbrains), 'JetBrains Mono', ui-monospace, monospace";

export const FPS = 30;

/** Public asset helper. Works in the Next.js page (Player) and in `remotion render` (public dir = /public). */
export const asset = (p: string) => staticFile(p.replace(/^\//, ""));

export const ASSETS = {
  avatars: Array.from({ length: 10 }, (_, i) => `/images/avatars/avatar-${String(i + 1).padStart(2, "0")}.jpg`),
  chatMedia: {
    propertyLiving: "/images/chat/property-livingroom.jpg" as string | null,
    propertyBedroom: "/images/chat/property-bedroom.jpg" as string | null,
    propertyKitchen: "/images/chat/property-kitchen.jpg" as string | null,
    hotelRoom: "/images/chat/hotel-deluxe-room.jpg" as string | null,
    clinicRoom: "/images/chat/clinic-room.jpg" as string | null,
  },
  broll: {
    night: "/images/broll/office-night-empty.jpg",
    morning: "/images/broll/office-morning-busy.jpg",
    dusk: "/images/broll/lagos-dusk.jpg",
    traffic: "/images/broll/lagos-night-traffic.jpg",
    sunrise: "/images/broll/lekki-sunrise.jpg",
  },
  /** Music bed for the exported MP4 (120 BPM, cut to the beat grid in reel/beats.ts). null = silent. */
  music: "/audio/showreel-120bpm.mp3" as string | null, // ElevenLabs Music v2.5, take 3 (best beat lock)
};

/**
 * Phone plates: real photos with the screen keyed out (transparent).
 * Corners are the inner-screen edges in image pixels (TL, TR, BR, BL), from Codex's screen-corners.json.
 */
type Quad = [[number, number], [number, number], [number, number], [number, number]];
export const PLATES: Record<string, { src: string; w: number; h: number; q: Quad }> = {
  "customer-night-h": { src: "/images/plates/plate-customer-night-16x9-cut.png", w: 1920, h: 1080, q: [[1474.68, 195.4], [1748.3, 186.7], [1698.96, 789.85], [1422.63, 753.28]] },
  "customer-night-v": { src: "/images/plates/plate-customer-night-9x16-cut.png", w: 1080, h: 1920, q: [[482.63, 396.95], [994.49, 389.71], [900.89, 1563.29], [390.71, 1513.87]] },
  "hand-h": { src: "/images/plates/plate-hand-closeup-16x9-cut.png", w: 1920, h: 1080, q: [[724.17, 85.94], [1156.1, 86.81], [1157.25, 974.16], [730.08, 976.62]] },
  "hand-v": { src: "/images/plates/plate-hand-closeup-9x16-cut.png", w: 1080, h: 1920, q: [[334.68, 344.95], [853.24, 346.89], [847.1, 1409.5], [339.35, 1409.5]] },
  "owner-morning-h": { src: "/images/plates/plate-owner-morning-16x9-cut.png", w: 1920, h: 1080, q: [[1402.69, 228.78], [1677.2, 218.91], [1669.4, 810.53], [1398.09, 802.65]] },
  "owner-morning-v": { src: "/images/plates/plate-owner-morning-9x16-cut.png", w: 1080, h: 1920, q: [[359.87, 524.5], [895.87, 524.5], [892.5, 1651.04], [362.6, 1648.34]] },
};
