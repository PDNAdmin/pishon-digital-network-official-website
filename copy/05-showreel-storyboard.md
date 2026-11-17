# Showreel storyboard: PDN AI assistant (1:18)

**Built in Remotion:** `remotion/scenes/Showreel.tsx`, with the acts in `remotion/reel/acts.tsx` and the motion kit in `remotion/reel/kit.tsx`.

**Two cuts:**
- 16:9 for the website and YouTube
- 9:16 for Reels, WhatsApp Status and TikTok

## Beat grid
- Every cut, camera punch and text swap lands on a **120 BPM grid**. That is one beat every 0.5 seconds (15 frames).
- Any 120 BPM track will line up. Drop it into `public/audio/` and set `ASSETS.music` in `remotion/theme.ts`.

## The story in one line
A customer messages at night → the assistant answers and books, and the customer confirms → next morning it spots people who went quiet and *you* tap Send → an urgent case goes straight to the lawyer on call, who taps "Take it" → every channel in one place, and you stay in control.

## Rules we followed (from the brief)
- **Bright, physical canvas:**
  - Paper background, real cards with crisp shadows.
  - No dark sci-fi grids, glowing circuits or floating particles.
  - Colours are black and white, with gold for small accents.
  - Red appears only for the urgent alert.
- **Never a black box:**
  - Every demo shows what the assistant is doing ("Checking your listings…", "Writing a reply…").
  - A person taps to approve before anything final happens.
- **Camera moves to the action:** the scene sits on a large canvas, and the camera punches in (about 1.3× to 2×) on whatever is happening at that moment.
- **Slow, then fast, then slow:** quiet 16–18 second demos alternate with 4 second text bursts.
- **Fast text bursts are easy to read:** the top and bottom lines stay still, and only the middle line (icon + words) changes on the beat.
- **Springs:**
  - Snappy for cards and text: stiffness 180, damping 18, mass 0.8.
  - Bouncy (damping 11) is used only for the mascot (the PDN mark) and celebrations.

## Acts

| Time | Act | What you see | On-screen words |
|---|---|---|---|
| 0:00–0:08 | **1 · Hook** | The PDN mark pops in. It bursts into a field of real things: customer faces, chat bubbles, a property photo, a booked viewing. The camera pushes through them into the headline. The mascot sits inside the line and waves. | "Meet your [mascot] AI assistant." / "It answers your customers and books them in. Day and night." |
| 0:08–0:12 | **2 · Trust loop: real estate** | Real photo of a woman on her couch at night. Her phone screen shows the chat. She types and sends. The camera punches into the phone. | 11:43 PM · Your office is closed |
| 0:12–0:26 | | **Card flip:** her message flips over to show "behind the scenes". On the left, the chat: the assistant answers with price and a living-room photo, then offers times. On the right, the mascot works, the status line changes, and it ticks off "Your listings / Your calendar / Your rules". **Approval:** Tolu taps **Confirm**, a gold ripple shows the tap, the button turns to "Confirmed", and the mascot celebrates. | "Booked at 11:46 PM. While you were asleep." |
| 0:26–0:30 | **3 · Fast text** | Three swaps on the beat. The background flips between light and dark. | One assistant that / [WhatsApp] answers on WhatsApp · [calendar] books your appointments · [follow-up] follows up for you / while you're busy. |
| 0:30–0:33 | **4 · Follow-ups (next morning)** | Real photo of the owner with coffee. The lock screen shows the assistant's morning message. | 7:00 AM · The next morning |
| 0:33–0:46 | | The camera pans across result cards (14 chats, 5 booked, **3 didn't finish booking**, 2 need you, 0 missed) and stops on the gold one. The mascot thinks: "Shall I follow up?" The camera moves down while the follow-up message fills itself in. **Approval:** you tap **Send** ("Nothing goes out until you say so"). Reward: "2 replied · 1 viewing booked", and the mascot celebrates. | "Customers who went quiet, back in." |
| 0:46–0:50 | **5 · Fast text** | Three swaps on the beat. | Every customer gets / a reply in seconds · your real prices · a time that suits them / even at 2am. |
| 0:50–0:56 | **6 · Urgent case: law firm** | A red URGENT card drops in and shakes. The camera punches onto the badge. Status line: "Reading the message → This is urgent → Finding the lawyer on call → Handover ready". | |
| 0:56–1:00 | | Real photo of a lawyer's hand holding a phone. The handover card shows on screen. **Take control:** the lawyer taps **Take it**, with a ripple. | 11:52 PM · Barr. Adeyemi, on call |
| 1:00–1:06 | | The red card turns into a handled card: the red stripe turns gold, URGENT becomes HANDLED, and the reply to the client types out. The mascot celebrates. | "It knows when to hand over to you." |
| 1:06–1:11 | **7 · Close** | WhatsApp, Instagram, website, email and SMS icons circle a pill, spiral in and lock. The pill changes from "All your messages" to "Answered in one place", and five gold ticks pop in. | |
| 1:11–1:15 | | Final lines. "in control" gets a gold underline. | "Every customer answered. Every booking made. And you stay in control." |
| 1:15–1:18 | | Hard cut to the dark end card. | PDN logo · "Your AI assistant, ready in 1–2 weeks." · **Book a free call** · pishondigital.com |

## Sound cue sheet
Timings are in `remotion/reel/beats.ts` (`SFX_CUES`). They mark the pops, whooshes, taps, card flip and the end hit, for whoever mixes the final MP4.

## Export
`npm run showreel:render` writes `out/Showreel.mp4` (16:9) and `out/ShowreelVertical.mp4` (9:16).
