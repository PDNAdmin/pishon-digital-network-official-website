import { AbsoluteFill, Easing, Img, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, MONO, ASSETS, asset } from "../theme";
import { Phone } from "../components/Phone";
import { ChatThread, type Step } from "../components/ChatThread";
import { MarkGlyph } from "../components/Mark";
import { LogoHorizontal } from "../../components/Logo";
import {
  AnchoredKinetic,
  BOUNCY,
  CameraRig,
  Card,
  CardFlip3D,
  Check,
  ConsentGate,
  Icon,
  IconToken,
  Label,
  Lines,
  Mascot,
  ScreenOnPlate,
  StatusCycle,
  Tap,
  Typewriter,
  UI,
  clamp,
  plateScreen,
  useUi,
  type CamKey,
  type MascotState,
} from "./kit";

type V = { v: boolean };
const AV = ASSETS.avatars;

function useCanvas() {
  const { width: W, height: H } = useVideoConfig();
  return { W, H, cx: W / 2, cy: H / 2 };
}

function Avatar({ src, size }: { src: string; size: number }) {
  return <Img alt="" src={asset(src)} style={{ width: size, height: size, borderRadius: 999, objectFit: "cover", display: "block", flexShrink: 0 }} />;
}

/* ==================================================================
   ACT 1 · The tactile hook (0:00 – 0:08)
   Mark pops → scatters into a field of real objects → camera pushes
   through → "Meet your [mascot] AI assistant."
================================================================== */
type FieldItem = { x: number; y: number; d: number; kind: "avatar" | "bubble" | "photo" | "token" | "pill" | "booked"; src?: string; text?: string; icon?: string };
const FIELD: FieldItem[] = [
  { x: -0.78, y: -0.62, d: 0.9, kind: "avatar", src: AV[0] },
  { x: -0.35, y: -0.78, d: 0.6, kind: "bubble", text: "Is it still available?" },
  { x: 0.2, y: -0.7, d: 1.2, kind: "token", icon: "whatsapp" },
  { x: 0.66, y: -0.58, d: 0.75, kind: "photo", src: ASSETS.chatMedia.propertyLiving ?? AV[1] },
  { x: 0.9, y: -0.08, d: 0.55, kind: "avatar", src: AV[7] },
  { x: 0.62, y: 0.45, d: 1.05, kind: "booked", text: "Sat · 11:00 AM" },
  { x: 0.18, y: 0.78, d: 0.7, kind: "avatar", src: AV[4] },
  { x: -0.3, y: 0.62, d: 1.3, kind: "token", icon: "calendar" },
  { x: -0.72, y: 0.4, d: 0.8, kind: "pill", text: "Answered in 3s" },
  { x: -0.95, y: -0.05, d: 0.5, kind: "token", icon: "email" },
  { x: -0.05, y: -0.35, d: 0.45, kind: "bubble", text: "Do you take HMO?" },
  { x: 0.42, y: 0.08, d: 0.5, kind: "photo", src: ASSETS.chatMedia.hotelRoom ?? AV[2] },
  { x: -0.5, y: 0.05, d: 0.6, kind: "avatar", src: AV[8] },
];

function FieldThing({ it, s }: { it: FieldItem; s: number }) {
  switch (it.kind) {
    case "avatar":
      return <div style={{ borderRadius: 999, border: `${6 * s}px solid ${C.white}`, boxShadow: "0 20px 40px rgba(15,15,16,0.18)" }}><Avatar src={it.src!} size={150 * s} /></div>;
    case "bubble":
      return <div style={{ padding: `${22 * s}px ${30 * s}px`, borderRadius: 34 * s, borderBottomLeftRadius: 8 * s, background: C.white, fontSize: 34 * s, whiteSpace: "nowrap", boxShadow: "0 20px 40px rgba(15,15,16,0.12)", fontFamily: FONT }}>{it.text}</div>;
    case "photo":
      return <div style={{ padding: 8 * s, background: C.white, borderRadius: 24 * s, boxShadow: "0 24px 48px rgba(15,15,16,0.16)" }}><Img alt="" src={asset(it.src!)} style={{ width: 260 * s, height: 190 * s, objectFit: "cover", borderRadius: 18 * s, display: "block" }} /></div>;
    case "token":
      return <IconToken name={it.icon!} size={130 * s} />;
    case "pill":
      return <div style={{ display: "flex", alignItems: "center", gap: 12 * s, padding: `${16 * s}px ${26 * s}px`, borderRadius: 99, background: C.ink, color: C.paper, fontSize: 30 * s, fontWeight: 500, whiteSpace: "nowrap", fontFamily: FONT }}><Check size={34 * s} bg={C.gold} />{it.text}</div>;
    case "booked":
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 18 * s, padding: `${22 * s}px ${28 * s}px`, borderRadius: 28 * s, background: C.white, boxShadow: "0 24px 48px rgba(15,15,16,0.14)", fontFamily: FONT, whiteSpace: "nowrap" }}>
          <IconToken name="calendar" size={64 * s} gold />
          <div>
            <div style={{ fontSize: 30 * s, fontWeight: 600 }}>Viewing booked</div>
            <div style={{ fontSize: 24 * s, color: C.g500 }}>{it.text}</div>
          </div>
        </div>
      );
  }
}

export function ActHook({ v }: V) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { W, H, cx, cy } = useCanvas();
  const s = v ? 0.95 : 1;

  const pop = spring({ frame: frame - 2, fps, config: BOUNCY });
  const logoGone = interpolate(frame, [30, 42], [1, 0], clamp);
  const scatter = spring({ frame: frame - 30, fps, config: UI });
  const push = interpolate(frame, [105, 150], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });

  // headline
  const words = [
    { t: "Meet", at: 150 },
    { t: "your", at: 157 },
  ];
  const chip = spring({ frame: frame - 165, fps, config: UI });
  const tail = spring({ frame: frame - 172, fps, config: UI });
  const fs = v ? 112 : 128;
  const sub = spring({ frame: frame - 195, fps, config: UI });

  return (
    <AbsoluteFill style={{ background: C.paper, fontFamily: FONT, color: C.ink, overflow: "hidden" }}>
      {/* field of objects */}
      {frame < 152 &&
        FIELD.map((it, i) => {
          const sc = spring({ frame: frame - 30 - i * 2, fps, config: UI });
          const grow = 1 + push * it.d * 6;
          const x = cx + it.x * W * (v ? 0.4 : 0.44) * sc * grow;
          const y = cy + it.y * H * (v ? 0.4 : 0.4) * sc * grow;
          const bob = Math.sin(frame / 18 + i) * 8 * it.d;
          const op = sc * interpolate(push * it.d, [0.35, 0.8], [1, 0], clamp);
          return (
            <div key={i} style={{ position: "absolute", left: x, top: y + bob, transform: `translate(-50%, -50%) scale(${(0.55 + it.d * 0.5) * sc * grow * s})`, opacity: op, zIndex: Math.round(it.d * 10), filter: push > 0.2 ? `blur(${push * it.d * 6}px)` : undefined }}>
              <FieldThing it={it} s={1} />
            </div>
          );
        })}

      {/* logo pop */}
      {logoGone > 0 && (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${pop * (1 + (1 - logoGone) * 0.6)})`, opacity: logoGone }}>
            <MarkGlyph size={170} color={C.ink} />
          </div>
        </AbsoluteFill>
      )}
      {scatter > 0 && frame < 60 && (
        <div style={{ position: "absolute", left: cx, top: cy, width: 10, height: 10, borderRadius: 999, border: `3px solid ${C.gold}`, transform: `translate(-50%,-50%) scale(${scatter * 90})`, opacity: 1 - scatter }} />
      )}

      {/* headline */}
      {frame >= 148 && (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: v ? "0 60px" : "0 120px" }}>
          <div style={{ opacity: sub, marginBottom: 40 }}>
            <Label size={v ? 22 : 22}>PDN · AI assistants</Label>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", columnGap: fs * 0.26, rowGap: fs * 0.1, fontSize: fs, fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1 }}>
            {words.map((w) => {
              const p = spring({ frame: frame - w.at, fps, config: UI });
              return (
                <span key={w.t} style={{ display: "inline-block", overflow: "hidden", paddingBottom: fs * 0.1 }}>
                  <span style={{ display: "inline-block", transform: `translateY(${(1 - p) * 110}%)` }}>{w.t}</span>
                </span>
              );
            })}
            {/* inline mascot splits the line */}
            <span style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", width: fs * 1.15 * chip, height: fs * 1.05, borderRadius: fs * 0.3, background: C.ink, overflow: "hidden", transform: `scale(${0.6 + chip * 0.4})` }}>
              <span style={{ display: "inline-flex", transform: `scale(${chip})` }}>
                <Mascot state={frame >= 200 ? "celebrating" : "idle"} since={200} size={fs * 0.62} dark />
              </span>
            </span>
            <span style={{ display: "inline-block", overflow: "hidden", paddingBottom: fs * 0.1, flexBasis: v ? "100%" : undefined, textAlign: "center" }}>
              <span style={{ display: "inline-block", transform: `translateY(${(1 - tail) * 110}%)` }}>AI assistant.</span>
            </span>
          </div>
          <div style={{ marginTop: 44, fontSize: v ? 40 : 38, color: C.g700, opacity: sub, transform: `translateY(${(1 - sub) * 20}px)`, textAlign: "center", maxWidth: v ? 860 : undefined }}>
            It answers your customers and books them in. Day and night.
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}

/* ==================================================================
   ACT 2 · Hero workflow 1: the trust loop (0:08 – 0:26)
   A customer messages at 11:43 PM → flip to behind the scenes →
   assistant shows what it's doing → customer confirms → booked.
================================================================== */
function CustomerPhone({ w, h }: { w: number; h: number }) {
  const frame = useCurrentFrame();
  const msg = "Is the 3-bedroom in Lekki still available?";
  const sent = frame >= 66;
  const steps: Step[] = sent ? [{ t: "us", at: 66, text: msg, time: "11:43 PM" }] : [];
  return (
    <Phone width={w} height={h} bezel={false} footer={false} title="Prime Homes Realty" subtitle={frame >= 80 ? "typing…" : "online"} time="11:43 PM">
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: w * 0.16 }}>
        <ChatThread steps={steps} width={w} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: w * 0.16, borderTop: `1px solid ${C.g200}`, display: "flex", alignItems: "center", padding: `0 ${w * 0.04}px`, gap: w * 0.03 }}>
        <div style={{ flex: 1, height: w * 0.095, borderRadius: 99, background: C.g200, display: "flex", alignItems: "center", paddingLeft: w * 0.045, fontSize: w * 0.032, color: sent || frame < 12 ? C.g500 : C.ink, overflow: "hidden", whiteSpace: "nowrap" }}>
          {sent || frame < 12 ? "Message" : <Typewriter text={msg} at={12} cps={30} />}
        </div>
        <div style={{ width: w * 0.095, height: w * 0.095, borderRadius: 99, background: frame >= 58 && frame < 70 ? C.gold : C.ink, transform: `scale(${frame >= 62 && frame < 68 ? 0.85 : 1})` }} />
      </div>
    </Phone>
  );
}

function PlateCut({ plate, keys, children, screenWidth = 400, dim = 0 }: { plate: string; keys: CamKey[]; children: (w: number, h: number) => React.ReactNode; screenWidth?: number; dim?: number }) {
  const p = plateScreen(plate);
  const h = Math.round((screenWidth * p.sh) / p.sw);
  return (
    <CameraRig keys={keys} bg={C.ink}>
      <ScreenOnPlate plate={plate} screenWidth={screenWidth} dim={dim}>
        {children(screenWidth, h)}
      </ScreenOnPlate>
    </CameraRig>
  );
}

function TimeTag({ text, sub }: { text: string; sub?: string }) {
  const p = useUi(4);
  return (
    <div style={{ position: "absolute", left: 64, top: 56, opacity: p, transform: `translateY(${(1 - p) * 16}px)`, display: "flex", alignItems: "center", gap: 16 }}>
      <span style={{ padding: "10px 18px", borderRadius: 99, background: C.paper, color: C.ink, fontFamily: MONO, fontSize: 22, letterSpacing: "0.08em" }}>{text}</span>
      {sub && <span style={{ fontFamily: MONO, fontSize: 20, letterSpacing: "0.08em", color: "rgba(246,245,241,0.8)", textTransform: "uppercase" }}>{sub}</span>}
    </div>
  );
}

function fitScreen(plate: string, H: number, mult: number) {
  const p = plateScreen(plate);
  const z = (H / p.sh) * mult;
  const hw = p.w / 2 / z; // half the view, in plate pixels (canvas = plate size)
  const hh = p.h / 2 / z;
  const keep = (c: number, half: number, max: number) => (half * 2 >= max ? max / 2 : Math.min(Math.max(c, half), max - half));
  return { x: mult > 1.5 ? p.cx : keep(p.cx, hw, p.w), y: mult > 1.5 ? p.cy : keep(p.cy, hh, p.h), z };
}

export function ActTrust({ v }: V) {
  const { H } = useCanvas();
  const plate = v ? "customer-night-v" : "customer-night-h";
  const sc = fitScreen(plate, H, 0.82);
  const deep = fitScreen(plate, H, 2.6);
  const p = plateScreen(plate);
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={120}>
        <PlateCut
          plate={plate}
          keys={[
            { f: 0, x: p.w / 2, y: p.h / 2, z: 1 },
            { f: 22, x: sc.x, y: sc.y, z: sc.z, d: 22 },
            { f: 96, x: deep.x, y: deep.y, z: deep.z, d: 22 },
          ]}
        >
          {(w, h) => <CustomerPhone w={w} h={h} />}
        </PlateCut>
        <TimeTag text="11:43 PM" sub="Your office is closed" />
      </Sequence>
      <Sequence from={120}>
        <TrustWorkspace v={v} />
      </Sequence>
    </AbsoluteFill>
  );
}

function TrustWorkspace({ v }: V) {
  const frame = useCurrentFrame();
  const { cx, cy } = useCanvas();
  const cw = v ? 940 : 1300;
  const ch = v ? 1500 : 740;
  const left = cx - cw / 2;
  const top = cy - ch / 2;
  // regions (world coords) for the camera
  const chatW = v ? cw - 64 : 620;
  const chatH = v ? 900 : ch - 64;
  const chat = { x: left + 32 + chatW / 2, y: top + 32 + chatH / 2 };
  const panel = v ? { x: cx, y: top + 32 + chatH + (ch - chatH - 32) / 2 } : { x: left + 32 + chatW + (cw - chatW - 32) / 2, y: cy };
  const keys: CamKey[] = [
    { f: 0, x: cx, y: cy, z: v ? 1.0 : 1.0 },
    { f: 45, x: panel.x, y: v ? panel.y : top + 230, z: v ? 1.3 : 1.55 },
    { f: 125, x: chat.x, y: chat.y + (v ? 40 : 20), z: v ? 1.12 : 1.4 },
    { f: 220, x: chat.x, y: chat.y + chatH * 0.3, z: v ? 1.35 : 1.75 },
    { f: 280, x: chat.x, y: chat.y + chatH * 0.18, z: v ? 1.3 : 1.6 },
    { f: 335, x: cx, y: cy, z: 1.0, d: 24 },
    { f: 365, x: cx, y: top + ch + (v ? 230 : 210), z: 1.0, d: 26 },
  ];

  const mascot: MascotState = frame >= 332 ? "celebrating" : frame >= 40 && frame < 130 ? "working" : "idle";
  const steps: Step[] = [
    { t: "them", at: 10, text: "Is the 3-bedroom in Lekki still available?", time: "11:43 PM" },
    { t: "typing", at: 80, until: 130 },
    { t: "us", at: 130, text: "Yes, it is! A serviced 3-bedroom with 24-hour power, ₦4.5m a year. Here's the living room:", time: "11:43 PM" },
    { t: "image", at: 155, src: ASSETS.chatMedia.propertyLiving, caption: "3-bed · Lekki Phase 1" },
    { t: "them", at: 185, text: "Lovely. Can I see it this weekend?" },
    { t: "typing", at: 200, until: 215 },
    { t: "us", at: 215, text: "Of course. Pick a time that suits you:" },
    { t: "chips", at: 230, options: ["Sat 11:00 AM", "Sat 2:00 PM", "Sun 1:00 PM"], pick: 0, pickAt: 265 },
  ];
  const knows = [
    { at: 50, t: "Your listings", d: "12 properties, prices and photos" },
    { at: 75, t: "Your calendar", d: "Viewings on Saturdays and Sundays" },
    { at: 100, t: "Your rules", d: "Never promise discounts" },
  ];

  const front = (
    <Card style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", gap: 30 }} pad={60}>
      <Label color={C.goldDeep}>New message · WhatsApp · 11:43 PM</Label>
      <Avatar src={AV[0]} size={v ? 180 : 150} />
      <div style={{ fontSize: v ? 34 : 30, color: C.g500 }}>Tolu A.</div>
      <div style={{ fontSize: v ? 68 : 64, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.08, maxWidth: v ? 780 : 1000 }}>“Is the 3-bedroom in Lekki still available?”</div>
    </Card>
  );

  const back = (
    <Card style={{ width: "100%", height: "100%", display: "flex", flexDirection: v ? "column" : "row", gap: 32 }} pad={32}>
      {/* the conversation */}
      <div style={{ position: "relative", width: chatW, height: chatH, borderRadius: 22, background: C.paper, overflow: "hidden", flexShrink: 0 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 74, display: "flex", alignItems: "center", gap: 14, padding: "0 22px", borderBottom: `1px solid ${C.g200}`, background: C.white, zIndex: 2 }}>
          <Avatar src={AV[0]} size={44} />
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 22, fontWeight: 600 }}>Tolu A.</div>
            <div style={{ fontSize: 17, color: C.g500 }}>WhatsApp · Prime Homes Realty</div>
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 74, bottom: 0 }}>
          <ChatThread steps={steps} width={v ? 820 : 600} />
        </div>
        {/* the customer confirms (consent gate) */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: v ? 60 : 36, display: "flex", justifyContent: "center", zIndex: 3 }}>
          {frame >= 280 && (
            <ConsentGate at={285} tapAt={330} who="Tolu confirms" title="Viewing · Sat 11:00 AM" detail="3-bed · Lekki Phase 1 · with Prime Homes" secondary="Change" primary="Confirm" done="Confirmed" width={v ? 760 : 540} />
          )}
        </div>
      </div>
      {/* behind the scenes */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: v ? 26 : 30, padding: v ? "4px 12px" : "24px 16px", minWidth: 0 }}>
        <Label>Behind the scenes · your assistant</Label>
        <div style={{ display: "flex", alignItems: "center", gap: 28, marginTop: v ? 0 : 10 }}>
          <Mascot state={mascot} since={332} size={v ? 92 : 104} />
          <StatusCycle
            size={v ? 1.05 : 1}
            items={[
              { at: 40, label: "Reading Tolu's message" },
              { at: 70, label: "Checking your listings" },
              { at: 100, label: "Writing a reply" },
              { at: 130, label: "Replied in 3 seconds", done: true },
              { at: 332, label: "Viewing booked", done: true },
            ]}
          />
        </div>
        <div style={{ display: "flex", flexDirection: v ? "row" : "column", gap: v ? 14 : 4, marginTop: v ? 4 : 18 }}>
          {knows.map((k) => {
            const p = spring({ frame: frame - k.at, fps: 30, config: UI });
            return (
              <div key={k.t} style={{ flex: v ? 1 : undefined, display: "flex", alignItems: "flex-start", gap: 16, padding: v ? "16px 16px" : "18px 0", borderTop: v ? "none" : `1px solid ${C.g200}`, border: v ? `1px solid ${C.g200}` : undefined, borderRadius: v ? 18 : 0, opacity: p, transform: `translateX(${(1 - p) * 30}px)` }}>
                <Check size={30} bg={C.gold} />
                <div style={{ lineHeight: 1.25 }}>
                  <div style={{ fontSize: 23, fontWeight: 600 }}>{k.t}</div>
                  <div style={{ fontSize: 19, color: C.g500 }}>{k.d}</div>
                </div>
              </div>
            );
          })}
        </div>
        {!v && <div style={{ marginTop: "auto", fontSize: 19, color: C.g500 }}>It only uses what you've given it.</div>}
      </div>
    </Card>
  );

  return (
    <CameraRig keys={keys}>
      <div style={{ position: "absolute", left, top }}>
        <CardFlip3D at={20} width={cw} height={ch} front={front} back={back} />
      </div>
      <div style={{ position: "absolute", left: 0, width: cx * 2, top: top + ch + (v ? 120 : 110), display: "flex", justifyContent: "center", textAlign: "center" }}>
        {frame >= 360 && <Lines at={370} gap={7} size={v ? 92 : 96} lines={["Booked at 11:46 PM.", "While you were asleep."]} accent="asleep" />}
      </div>
    </CameraRig>
  );
}

/* ==================================================================
   ACT 3 + ACT 5 · Kinetic montages (anchored frame, swapping core)
================================================================== */
export function ActMontage1({ v }: V) {
  return (
    <AnchoredKinetic
      every={45}
      size={v ? 76 : 118}
      top="One assistant that"
      bottom="while you're busy."
      items={[
        { icon: "whatsapp", text: "answers on WhatsApp" },
        { icon: "calendar", text: "books your appointments" },
        { icon: "follow", text: "follows up for you" },
      ]}
    />
  );
}

export function ActMontage2({ v }: V) {
  return (
    <AnchoredKinetic
      every={45}
      size={v ? 76 : 118}
      top="Every customer gets"
      bottom="even at 2am."
      items={[
        { icon: "fast", text: "a reply in seconds" },
        { icon: "shield", text: "your real prices" },
        { icon: "calendar", text: "a time that suits them" },
      ]}
    />
  );
}

/* ==================================================================
   ACT 4 · Hero workflow 2: proactive (0:30 – 0:46)
   7:00 AM summary → pan across status cards → it spots people who
   went quiet → drafts follow-ups → you tap Send → they come back.
================================================================== */
function LockScreen({ w, h }: { w: number; h: number }) {
  const n = useUi(20);
  return (
    <div style={{ width: w, height: h, background: C.ink, color: C.paper, fontFamily: FONT, display: "flex", flexDirection: "column", alignItems: "center", padding: `${w * 0.16}px ${w * 0.05}px` }}>
      <div style={{ fontSize: w * 0.05, opacity: 0.7 }}>Tuesday</div>
      <div style={{ fontSize: w * 0.24, fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1 }}>7:00</div>
      <div style={{ marginTop: w * 0.12, width: "100%", background: "rgba(246,245,241,0.12)", borderRadius: w * 0.05, padding: w * 0.045, opacity: n, transform: `translateY(${(1 - n) * w * 0.1}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: w * 0.025, fontSize: w * 0.032, opacity: 0.75 }}>
          <MarkGlyph size={w * 0.05} color={C.paper} /> YOUR ASSISTANT · NOW
        </div>
        <div style={{ fontSize: w * 0.045, fontWeight: 600, marginTop: w * 0.02 }}>Good morning!</div>
        <div style={{ fontSize: w * 0.04, lineHeight: 1.35, opacity: 0.9 }}>Last night: 14 chats, 5 viewings booked. 3 people need a nudge.</div>
      </div>
    </div>
  );
}

function Counter({ to, at }: { to: number; at: number }) {
  const frame = useCurrentFrame();
  const n = Math.round(interpolate(frame, [at, at + 20], [0, to], { ...clamp, easing: Easing.out(Easing.cubic) }));
  return <>{n}</>;
}

export function ActProactive({ v }: V) {
  const { H } = useCanvas();
  const plate = v ? "owner-morning-v" : "owner-morning-h";
  const sc = fitScreen(plate, H, 0.8);
  const deep = fitScreen(plate, H, 2.6);
  const p = plateScreen(plate);
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={90}>
        <PlateCut
          plate={plate}
          keys={[
            { f: 0, x: p.w / 2, y: p.h / 2, z: 1 },
            { f: 26, x: sc.x, y: sc.y, z: sc.z, d: 22 },
            { f: 70, x: deep.x, y: deep.y, z: deep.z, d: 20 },
          ]}
        >
          {(w, h) => <LockScreen w={w} h={h} />}
        </PlateCut>
        <TimeTag text="7:00 AM" sub="The next morning" />
      </Sequence>
      <Sequence from={90}>
        <ProactiveBoard v={v} />
      </Sequence>
    </AbsoluteFill>
  );
}

function ProactiveBoard({ v }: V) {
  const frame = useCurrentFrame();
  const { cx } = useCanvas();
  const z = (h: number, vv: number) => (v ? vv : h);
  const cards = [
    { n: 14, l: "conversations last night" },
    { n: 5, l: "viewings booked" },
    { n: 3, l: "didn't finish booking" },
    { n: 2, l: "need you personally" },
    { n: 0, l: "messages missed" },
  ];
  const gap = 440;
  const cardX = (i: number) => cx + (i - 2) * gap;
  const keys: CamKey[] = [
    { f: 0, x: cardX(0) + 40, y: 300, z: z(1.4, 1.25) },
    { f: 30, x: cardX(1), y: 300, z: z(1.4, 1.25), d: 16 },
    { f: 60, x: cardX(2), y: 330, z: z(1.4, 1.25), d: 16 },
    { f: 90, x: cx, y: 600, z: z(1.3, 1.1) },
    { f: 135, x: cx, y: 1020, z: z(1.3, 1.05), d: 24 },
    { f: 250, x: cx, y: 1390, z: z(1.55, 1.25) },
    { f: 310, x: cx, y: 1720, z: z(1.3, 1.1) },
    { f: 340, x: cx, y: 1960, z: 1.0, d: 24 },
  ];
  const insight = useUi(92);
  const draft = useUi(138);
  const fields = [
    { at: 148, k: "To", node: (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {[AV[4], AV[5], AV[6]].map((a, i) => (
          <span key={a} style={{ marginLeft: i ? -18 : 0, border: `3px solid ${C.white}`, borderRadius: 999, display: "inline-flex", opacity: interpolate(frame, [148 + i * 5, 156 + i * 5], [0, 1], clamp) }}>
            <Avatar src={a} size={44} />
          </span>
        ))}
        <span style={{ marginLeft: 10 }}><Typewriter text="Grace O., Ibrahim S., Kemi A." at={160} cps={40} caret={false} /></span>
      </div>
    ) },
    { at: 172, k: "Message", node: <Typewriter text="Good morning! The 2-bed in Yaba is still available. Would you like to see it this week?" at={176} cps={34} /> },
    { at: 236, k: "Send", node: <Typewriter text="Now, from your WhatsApp" at={238} cps={40} caret={false} /> },
  ];
  const result = useUi(306);
  return (
    <CameraRig keys={keys}>
      {/* status cards row */}
      {cards.map((c, i) => {
        const p = spring({ frame: frame + 10 - i * 5, fps: 30, config: UI });
        const hi = i === 2 && frame >= 75;
        return (
          <div key={c.l} style={{ position: "absolute", left: cardX(i) - 190, top: 300 - 130, opacity: p, transform: `translateY(${(1 - p) * 40}px) scale(${hi ? 1.04 : 1})` }}>
            <Card style={{ width: 380, height: 260, display: "flex", flexDirection: "column", justifyContent: "space-between", border: hi ? `3px solid ${C.gold}` : `1px solid ${C.g200}` }} pad={34}>
              <Label color={hi ? C.goldDeep : C.g500}>{hi ? "Spotted" : "Last night"}</Label>
              <div>
                <div style={{ fontSize: 96, fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 0.95 }}><Counter to={c.n} at={i * 8} /></div>
                <div style={{ fontSize: 26, color: C.g700, marginTop: 8 }}>{c.l}</div>
              </div>
            </Card>
          </div>
        );
      })}
      {/* insight */}
      <div style={{ position: "absolute", left: cx - (v ? 470 : 430), top: 520, width: v ? 940 : 860, display: "flex", alignItems: "flex-start", gap: 26, opacity: insight, transform: `translateY(${(1 - insight) * 30}px)` }}>
        <div style={{ paddingTop: 30 }}><Mascot state={frame >= 310 ? "celebrating" : frame >= 92 && frame < 250 ? "thinking" : "idle"} since={310} size={90} /></div>
        <Card pad={32} style={{ flex: 1, borderRadius: 28, borderTopLeftRadius: 8 }}>
          <div style={{ fontSize: 31, lineHeight: 1.3 }}>
            3 people asked about the <b style={{ fontWeight: 600 }}>Yaba 2-bed</b> last night but didn't book. Shall I follow up?
          </div>
        </Card>
      </div>
      {/* draft (fields auto-fill, camera tracks down) */}
      <div style={{ position: "absolute", left: cx - 460, top: 830, width: 920, opacity: draft, transform: `translateY(${(1 - draft) * 40}px)` }}>
        <Card pad={0} style={{ overflow: "hidden" }}>
          <div style={{ padding: "22px 32px", borderBottom: `1px solid ${C.g200}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Label>Follow-up · drafted by your assistant</Label>
            <StatusCycle size={0.8} items={[{ at: 140, label: "Drafting" }, { at: 240, label: "Ready for you", done: true }]} />
          </div>
          {fields.map((f) => (
            <div key={f.k} style={{ display: "flex", gap: 24, padding: "22px 32px", borderBottom: `1px solid ${C.g200}`, opacity: interpolate(frame, [f.at, f.at + 8], [0, 1], clamp), minHeight: 92, alignItems: "center" }}>
              <div style={{ width: 120, fontFamily: MONO, fontSize: 18, letterSpacing: "0.08em", color: C.g500, textTransform: "uppercase", flexShrink: 0 }}>{f.k}</div>
              <div style={{ fontSize: 27, lineHeight: 1.35, flex: 1 }}>{f.node}</div>
            </div>
          ))}
        </Card>
      </div>
      {/* consent gate: you tap Send */}
      <div style={{ position: "absolute", left: cx - 330, top: 1270 }}>
        {frame >= 246 && <ConsentGate at={250} tapAt={300} who="You approve" title="Send 3 follow-ups?" detail="Nothing goes out until you say so." secondary="Edit" primary="Send" done="Sent" width={660} />}
      </div>
      {/* reward */}
      <div style={{ position: "absolute", left: cx - 460, top: 1660, width: 920, display: "flex", gap: 24, opacity: result, transform: `scale(${0.9 + result * 0.1})` }}>
        {[
          { n: 2, l: "replied" },
          { n: 1, l: "viewing booked" },
        ].map((r, i) => (
          <Card key={r.l} pad={28} style={{ flex: 1, display: "flex", alignItems: "center", gap: 20, background: i ? C.ink : C.white, color: i ? C.paper : C.ink, border: i ? "none" : undefined }}>
            <Check size={50} bg={C.gold} />
            <div style={{ fontSize: 38, fontWeight: 500, letterSpacing: "-0.02em" }}>
              <Counter to={r.n} at={312 + i * 6} /> {r.l}
            </div>
          </Card>
        ))}
      </div>
      {/* caption */}
      <div style={{ position: "absolute", left: 0, width: cx * 2, top: 1860, display: "flex", justifyContent: "center", textAlign: "center" }}>
        {frame >= 340 && <Lines at={345} gap={7} size={v ? 88 : 92} lines={["Customers who went quiet,", "back in."]} accent="back in" />}
      </div>
    </CameraRig>
  );
}

/* ==================================================================
   ACT 6 · Hero workflow 3: real-time problem solving (0:50 – 1:06)
   Urgent message (red) → status pills → lawyer taps "Take it" on
   their phone → the red card morphs into a handled one.
================================================================== */
function AlertCard({ v, resolveAt }: V & { resolveAt?: number }) {
  const frame = useCurrentFrame();
  const r = resolveAt === undefined ? 0 : interpolate(frame, [resolveAt, resolveAt + 22], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const shake = resolveAt === undefined ? Math.sin(frame * 2.2) * interpolate(frame, [14, 30], [10, 0], clamp) * (frame >= 14 ? 1 : 0) : 0;
  const w = v ? 940 : 1120;
  const col = r < 0.5 ? C.red : C.gold;
  return (
    <div style={{ width: w, transform: `translateX(${shake}px)` }}>
      <Card pad={0} style={{ overflow: "hidden", display: "flex" }}>
        <div style={{ width: 14, background: col, flexShrink: 0 }} />
        <div style={{ flex: 1, padding: "34px 40px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ position: "relative", height: 44 }}>
              <span style={{ position: "absolute", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 16px", borderRadius: 99, background: C.red, color: C.white, fontFamily: MONO, fontSize: 19, letterSpacing: "0.08em", opacity: 1 - r, transform: `scale(${1 - r * 0.2})` }}>
                ▲ URGENT · 11:52 PM
              </span>
              <span style={{ position: "absolute", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 16px", borderRadius: 99, background: C.ink, color: C.paper, fontFamily: MONO, fontSize: 19, letterSpacing: "0.08em", opacity: r, transform: `scale(${0.8 + r * 0.2})` }}>
                <Check size={22} color={C.gold} /> HANDLED · 11:53 PM
              </span>
            </div>
            <div style={{ fontSize: 20, color: C.g500 }}>Adeyemi & Co. Legal</div>
          </div>
          <div style={{ display: "flex", gap: 22, marginTop: 28, alignItems: "flex-start" }}>
            <Avatar src={AV[8]} size={72} />
            <div>
              <div style={{ fontSize: 22, fontWeight: 600 }}>Mrs. Bello</div>
              <div style={{ fontSize: v ? 34 : 36, lineHeight: 1.3, marginTop: 6, letterSpacing: "-0.01em" }}>“I've just been served court papers for my shop. I don't know what to do.”</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateRows: r > 0 ? "1fr" : "0fr" }}>
            <div style={{ overflow: "hidden" }}>
              <div style={{ display: "flex", gap: 18, alignItems: "flex-start", marginTop: 26, paddingTop: 26, borderTop: `1px solid ${C.g200}`, opacity: r }}>
                <div style={{ width: 72, display: "flex", justifyContent: "center", flexShrink: 0 }}>
                  <MarkGlyph size={44} color={C.ink} />
                </div>
                <div style={{ fontSize: v ? 30 : 31, lineHeight: 1.35, color: C.g700 }}>
                  {resolveAt !== undefined && <Typewriter text="Barrister Adeyemi will call you at 8:30 AM. Please keep the papers safe and don't sign anything until you speak." at={resolveAt + 18} cps={45} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function LawyerPhone({ w, h }: { w: number; h: number }) {
  const frame = useCurrentFrame();
  const p = useUi(8);
  const took = frame >= 75;
  return (
    <Phone width={w} height={h} bezel={false} footer={false} title="Adeyemi & Co. · Assistant" subtitle="Handover to you" time="11:52 PM">
      <div style={{ position: "absolute", inset: 0, padding: w * 0.045, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: w * 0.03, fontFamily: FONT }}>
        <div style={{ opacity: p, transform: `translateY(${(1 - p) * 30}px)`, background: C.white, border: `1px solid ${C.g200}`, borderRadius: w * 0.05, padding: w * 0.05, boxShadow: "0 10px 20px rgba(0,0,0,0.06)" }}>
          <span style={{ display: "inline-block", padding: `${w * 0.012}px ${w * 0.025}px`, borderRadius: 99, background: took ? C.ink : C.red, color: C.white, fontFamily: MONO, fontSize: w * 0.026, letterSpacing: "0.06em" }}>
            {took ? "YOU TOOK THIS CASE" : "URGENT · NEEDS A LAWYER"}
          </span>
          <div style={{ fontSize: w * 0.05, fontWeight: 600, marginTop: w * 0.03 }}>Mrs. Bello</div>
          <div style={{ fontSize: w * 0.04, lineHeight: 1.35, color: C.g700, marginTop: w * 0.01 }}>Served court papers for her shop tonight. Worried, wants advice.</div>
          <div style={{ fontFamily: MONO, fontSize: w * 0.028, color: C.g500, marginTop: w * 0.025 }}>FULL CHAT ATTACHED ›</div>
        </div>
        <div style={{ display: "flex", gap: w * 0.025, opacity: p }}>
          <div style={{ flex: 1, height: w * 0.13, borderRadius: 99, border: `1.5px solid ${C.g300}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: w * 0.042, opacity: took ? 0.35 : 1 }}>Later</div>
          <div style={{ position: "relative", flex: 1.4, height: w * 0.13, borderRadius: 99, background: took ? C.gold : C.ink, color: took ? C.ink : C.paper, display: "flex", alignItems: "center", justifyContent: "center", gap: w * 0.02, fontSize: w * 0.042, fontWeight: 600 }}>
            {took && <Check size={w * 0.05} />}
            {took ? "It's yours" : "Take it"}
            <Tap at={75} size={w * 0.12} from={[w * 0.2, w * 0.3]} />
          </div>
        </div>
      </div>
    </Phone>
  );
}

export function ActSolve({ v }: V) {
  const { H } = useCanvas();
  const plate = v ? "hand-v" : "hand-h";
  const p = plateScreen(plate);
  const sc = fitScreen(plate, H, v ? 0.75 : 0.95);
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={180}>
        <SolveAlert v={v} />
      </Sequence>
      <Sequence from={180} durationInFrames={130}>
        <PlateCut
          plate={plate}
          keys={[
            { f: 0, x: p.w / 2, y: p.h / 2, z: 1 },
            { f: 18, x: sc.x, y: sc.y + p.sh * 0.28, z: sc.z * 1.35, d: 22 },
            { f: 96, x: sc.x, y: sc.y, z: sc.z * 0.95, d: 22 },
          ]}
        >
          {(w, h) => <LawyerPhone w={w} h={h} />}
        </PlateCut>
        <TimeTag text="11:52 PM" sub="Barr. Adeyemi, on call" />
      </Sequence>
      <Sequence from={310}>
        <SolveResolved v={v} />
      </Sequence>
    </AbsoluteFill>
  );
}

function SolveAlert({ v }: V) {
  const frame = useCurrentFrame();
  const { cx, cy } = useCanvas();
  const cardY = cy - 120;
  const w = v ? 940 : 1120;
  const inP = useUi(4);
  const keys: CamKey[] = [
    { f: 0, x: cx, y: cardY, z: 1.0 },
    { f: 16, x: cx - w / 2 + 200, y: cardY - 120, z: v ? 1.8 : 2.1, d: 14 },
    { f: 45, x: cx, y: cardY, z: v ? 1.0 : 1.25 },
    { f: 60, x: cx, y: cy + 230, z: v ? 1.4 : 1.6 },
  ];
  return (
    <CameraRig keys={keys}>
      <div style={{ position: "absolute", left: cx - w / 2, top: cardY - 190, opacity: inP, transform: `translateY(${(1 - inP) * -60}px)` }}>
        <AlertCard v={v} />
      </div>
      <div style={{ position: "absolute", left: cx - (v ? 300 : 380), top: cy + 190, display: "flex", alignItems: "center", gap: 26 }}>
        <Mascot state={frame >= 150 ? "idle" : frame >= 55 ? "working" : "thinking"} size={84} />
        <StatusCycle
          size={1.1}
          items={[
            { at: 60, label: "Reading the message" },
            { at: 90, label: "This is urgent", alert: true },
            { at: 120, label: "Finding the lawyer on call" },
            { at: 150, label: "Handover ready", done: true },
          ]}
        />
      </div>
    </CameraRig>
  );
}

function SolveResolved({ v }: V) {
  const frame = useCurrentFrame();
  const { cx, cy } = useCanvas();
  const w = v ? 940 : 1120;
  const cardTop = cy - 300;
  const keys: CamKey[] = [
    { f: 0, x: cx, y: cy - 60, z: v ? 1.0 : 1.2 },
    { f: 95, x: cx, y: cy + (v ? 420 : 380), z: 1.0, d: 24 },
  ];
  return (
    <CameraRig keys={keys}>
      <div style={{ position: "absolute", left: cx - w / 2, top: cardTop }}>
        <AlertCard v={v} resolveAt={12} />
      </div>
      <div style={{ position: "absolute", left: cx + w / 2 - 60, top: cardTop - 50 }}>
        {frame >= 40 && <Mascot state="celebrating" since={40} size={96} />}
      </div>
      <div style={{ position: "absolute", left: 0, width: cx * 2, top: cy + (v ? 330 : 280), display: "flex", justifyContent: "center", textAlign: "center" }}>
        {frame >= 95 && <Lines at={100} gap={7} size={v ? 88 : 92} lines={["It knows when", "to hand over to you."]} accent="hand over" />}
      </div>
    </CameraRig>
  );
}

/* ==================================================================
   ACT 7 · Ecosystem orbit + control close (1:06 – 1:18)
================================================================== */
export function ActClose({ v }: V) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const icons = ["whatsapp", "social", "website", "email", "sms"];
  const R = v ? 330 : 380;
  const shrink = interpolate(frame, [60, 96], [1, 0], { ...clamp, easing: Easing.in(Easing.cubic) });
  const merged = frame >= 96;
  const bump = spring({ frame: frame - 96, fps, config: BOUNCY });
  const label = merged ? "Answered in one place" : "All your messages";
  const pillW = (merged ? 620 : 480) * (v ? 0.95 : 1);
  const pillIn = useUi(2);
  return (
    <AbsoluteFill style={{ background: C.paper, fontFamily: FONT }}>
      <Sequence durationInFrames={140}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          {icons.map((ic, i) => {
            const a = frame / 22 + (i * Math.PI * 2) / icons.length;
            const p = spring({ frame: frame - 4 - i * 3, fps, config: UI });
            const r = R * shrink;
            return (
              <div key={ic} style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%,-50%) translate(${Math.cos(a) * r}px, ${Math.sin(a) * r * 0.62}px) scale(${p * (0.4 + shrink * 0.6)})`, opacity: shrink > 0.02 ? 1 : 0, zIndex: Math.sin(a) > 0 ? 3 : 1 }}>
                <IconToken name={ic} size={136} />
              </div>
            );
          })}
          <div style={{ position: "relative", zIndex: 2, width: pillW, height: 116, borderRadius: 99, background: C.ink, color: C.paper, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, fontSize: 42, fontWeight: 500, letterSpacing: "-0.02em", transform: `scale(${pillIn * (merged ? 0.9 + bump * 0.1 : 1)})` }}>
            {merged && <Check size={46} bg={C.gold} />}
            {label}
          </div>
          {merged && (
            <div style={{ position: "absolute", top: "50%", marginTop: 90, display: "flex", gap: 22 }}>
              {icons.map((ic, i) => {
                const p = spring({ frame: frame - 104 - i * 3, fps, config: BOUNCY });
                return (
                  <div key={ic} style={{ display: "flex", alignItems: "center", gap: 8, transform: `scale(${p})`, opacity: p }}>
                    <div style={{ position: "relative", width: 72, height: 72, borderRadius: 20, border: `1.5px solid ${C.g200}`, background: C.white, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name={ic} size={36} />
                      <span style={{ position: "absolute", right: -10, top: -10 }}>
                        <Check size={30} bg={C.gold} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </AbsoluteFill>
      </Sequence>
      <Sequence from={140} durationInFrames={130}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 60px" }}>
          <Lines at={0} gap={18} size={v ? 78 : 112} lines={["Every customer answered.", "Every booking made.", "And you stay in control."]} accent="in control" />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={270}>
        <EndCard v={v} />
      </Sequence>
    </AbsoluteFill>
  );
}

function EndCard({ v }: V) {
  const a = useUi(2);
  const b2 = useUi(10);
  const c = useUi(18);
  return (
    <AbsoluteFill style={{ background: C.ink, color: C.paper, alignItems: "center", justifyContent: "center", textAlign: "center", fontFamily: FONT, gap: v ? 56 : 52, padding: "0 70px" }}>
      <div style={{ opacity: a, transform: `translateY(${(1 - a) * 30}px)`, color: C.paper }}>
        <LogoHorizontal style={{ width: v ? 420 : 380, height: "auto", display: "block" }} />
      </div>
      <div style={{ opacity: b2, transform: `translateY(${(1 - b2) * 30}px)`, fontSize: v ? 76 : 84, fontWeight: 500, letterSpacing: "-0.035em", lineHeight: 1.04, maxWidth: v ? 900 : 1300 }}>
        Your AI assistant, ready in 1–2 weeks.
      </div>
      <div style={{ opacity: c, transform: `scale(${0.9 + c * 0.1})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <div style={{ padding: v ? "26px 48px" : "24px 44px", borderRadius: 99, background: C.gold, color: C.ink, fontSize: v ? 36 : 32, fontWeight: 600 }}>Book a free call</div>
        <div style={{ fontFamily: MONO, fontSize: v ? 26 : 22, letterSpacing: "0.08em", color: "rgba(246,245,241,0.65)" }}>PISHONDIGITAL.COM</div>
      </div>
    </AbsoluteFill>
  );
}
