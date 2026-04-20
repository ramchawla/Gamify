# Noma Resorts — POC Design Brief
> **Audience:** Potential investors / resort owners evaluating look & feel  
> **Scope:** UI/UX polish only — mock data, no backend work this sprint  
> **Goal:** Make the app feel like it belongs in an Aman brochure, not a hackathon

---

## Executive Context

The POC is a gamified $10K challenge app for resort guests: teams complete missions, upload proof, earn points, win prizes. Investors care about one thing: **does this feel premium enough that guests would actually use it during a high-end stay?** Every design decision should be filtered through that lens.

This is NOT a product-manager demo. No one is being judged on feature count. They are being judged on whether they would hand a phone running this app to a guest paying $2,000/night.

---

## Core User Problem (First Principles)

A group of resort guests wants **shared adventurous play** during a 3–7 day stay, with a tangible prize as the MacGuffin. They need to:
1. Know what to do right now — with no onboarding required
2. Prove they did it in ≤3 taps
3. Feel a moment of earned specialness
4. Know where their group stands in one glance

**Premium is not more features. Premium is fewer elements, each one intentional.**

What the app must feel like: a concierge handing you a leather-bound adventure card, not a loyalty app with badges.

---

## Brutal Critique — Everything Identified

### Premium-Feel Violations (design debt)

| # | Issue | Location | Severity |
|---|---|---|---|
| 1 | Emoji medals (🥈🥇🥉) | `LeaderboardPodium.tsx` | Critical |
| 2 | "👋" in greeting | `home/page.tsx` | High |
| 3 | `linear-gradient(135deg, #1A1F2E → #0D1225)` — the default "Stripe clone" gradient | `SeasonHeroBanner.tsx` | High |
| 4 | Everything is a card on a card on a card. No editorial layout, no imagery | all pages | High |
| 5 | No display typeface — Inter everywhere = SaaS dashboard tone | `layout.tsx` | High |
| 6 | Podium uses colored block heights (h-20/h-28/h-14) — visual vocabulary of a kids' app | `LeaderboardPodium.tsx` | High |
| 7 | `uppercase tracking-widest` on 10px nav labels — Bootstrap-era | `BottomNav.tsx` | Medium |
| 8 | Mode pill toggle on Join (Create/Join) — #1 most-copied stock Tailwind snippet | `join/page.tsx` | Medium |
| 9 | Quick-action 3-col grid with icon + label + sublabel — dashboard tile pattern | `home/page.tsx` | Medium |
| 10 | `red-400` error color looks like browser DevTools | all forms | Medium |
| 11 | Gold `#C8902A` on dark — reads warm but the `#0D1225` blue-ish bg creates a split-personality brand | `globals.css` | Medium |
| 12 | `+{pts}` pill on feed cards — SaaS gamification language | `FeedCard.tsx` | Medium |
| 13 | Points badge style (small pill) undersells the reward moment | `PointsBadge.tsx` | Low |
| 14 | Confirm screen for submissions — currently generic | `ConfirmationScreen.tsx` | Low |
| 15 | `shimmer` skeleton looks like a loading indicator, not a premium state | `Skeleton.tsx` | Low |

### Churn Risks (all deferred to post-POC — documented for awareness)

| # | Risk | Priority |
|---|---|---|
| 1 | Empty feed/leaderboard on day 1 — "is this broken?" | P0 post-launch |
| 2 | Photo upload — no retry, no progress, no offline queue | P0 post-launch |
| 3 | Rank demotivation — "5th of 8" shown immediately | P1 post-launch |
| 4 | Polling (30/60s) drains battery vs. Supabase Realtime | P1 post-launch |
| 5 | Join friction — 4 fields for create | P1 post-launch |
| 6 | No reminders (push/email) — guests forget app after day 1 | P1 post-launch |
| 7 | Photo moderation — no report/flag flow for 10K users | P0 post-launch |
| 8 | Captain/member ownership unclear in UX | P2 post-launch |
| 9 | iOS PWA push notification restrictions | P2 post-launch |
| 10 | No error boundaries — Supabase hiccup → raw Next.js error | P0 post-launch |

### Self-Critique of the Critique

- "Premium = editorial serif" is based on marketing sites (Jesko/Lando), not mobile product apps. Aman/Rosewood apps use **restraint**, not large editorial type. Serif should be used for moments, not chrome.
- Pool-deck readability: heavy type on small screens in sun glare is worse than clean Inter. Serif is reserved for display moments only (hero heading, Wrapped numerals, podium rank).
- Photography supply: editorial direction collapses without actual resort photos. The AI-generated campfire image (`hero-campfire.png`) bridges this gap for POC.
- Wrapped is the virality driver (guests share on Instagram) — cutting it would be wrong. It stays in scope as a hardcoded ambitious demo.
- Moderation and error recovery are higher priority than typography for a real launch — but this sprint is investor-demo only.

---

## Reference Site Patterns Applied

Drawn from analysis of jeskojets.com and landonorris.com:

| Pattern | Source | Applied to Noma |
|---|---|---|
| Full-bleed photography, minimal text overlay | Both | Join hero, Home hero card |
| Typographic contrast — bold large + refined body | Jesko | Season hero (display serif for team name/points) |
| Generous whitespace, no clutter | Both | Reduce card density, increase padding |
| Restrained palette — high-contrast not busy | Both | Warm ivory + deep charcoal, no blue undertones |
| Understated CTA — confident, not desperate | Jesko | "Begin the Challenge" instead of "Create Team" |
| Cinematic pacing — section breaks, narrative flow | Lando | Wrapped card sequence |
| No decorative emoji — brand voice through type | Jesko | Kill all emoji from structural UI |
| Navigation anchors suggest effortless access | Jesko | Bottom nav: icon + active dot only, no labels |
| High-quality imagery dominates | Lando | Photos as card backgrounds not decorations |

---

## Image Asset Map

All assets copied to `public/images/`. Placement decisions:

| File | What It Is | Where It Goes | How |
|---|---|---|---|
| `hero-campfire.png` | AI-gen family at campfire, geodesic domes, mountains behind | **Join screen** full-bleed hero | 65% dark overlay, form above |
| `hero-domes.jpg` | Luxury glamping domes at Torres del Paine, dusk moody | **Home "Today's Quest" card** bg, or Season Hero | Dark gradient overlay bottom-up |
| `hero-adventure.jpg` | Yosemite Half Dome, winding road, golden hour | **Mission cards** — rotation background per type, or individual mission hero | Per-card overlay |
| `hero-sequoia.jpg` | Vintage VW Bug + massive sequoia tree | **Feed hardcoded submission** — shown as a guest-uploaded photo in POC seed data | img src in mock feed |
| `hero-meadow.jpg` | Child on boardwalk, Yosemite Falls | **Feed hardcoded submission** — second seed photo | img src in mock feed |
| `globe.png` | Dark globe, gold orbital rings, location pin | **Wrapped intro card** background (still) | full-bleed, no overlay |
| `globe-rotation.mp4` | Rotating globe video | **Wrapped intro card** — autoplay muted loop replaces still | `<video>` tag, muted autoplay loop |

**Rationale:**
- `hero-campfire.png` is the single best image for **first impression** — it directly shows the product promise (families, luxury outdoor, dome resort). It goes on Join.
- `hero-domes.jpg` (Patagonia) is the most visually premium — moody, dark, high-contrast mountains. Best for Home where the dark overlay system works perfectly.
- `hero-adventure.jpg` is warm and golden — ideal for energising mission moments.
- The sequoia/meadow shots are naturalistic and slightly imperfect (film grain on sequoia, tourist candid on meadow) — they nail what **actual guest photos will look like in the feed**, which is the honest POC story: "users upload real moments, not perfect colour-graded shots, and it still looks great."
- Globe video stays on Wrapped — it's the cinematic brand anchor, the moment before the big reveal.

---

## POC Scope — UI/UX Only

**In scope this sprint:**
- [x] Design token refresh (palette, typography scale, motion)
- [x] Typeface: Fraunces (display/moments only) + Inter Tight (UI body)
- [x] Join page — imagery hero, simplified single-path form
- [x] Home page — "Today's Quest" editorial card, imagery hero, no QuickActions grid
- [x] SeasonHeroBanner — photo-backed, warm palette, no blue gradient
- [x] MissionCard — less dense, photo-backed variant for hero mission
- [x] BottomNav — icon only + 4px gold dot active state, no uppercase labels
- [x] LeaderboardPodium — typeset numerals, thin SVG laurel, no emoji
- [x] FeedCard — editorial caption layout, real hardcoded photos as submissions
- [x] Wrapped — globe video intro, 5-card hardcoded sequence, ambitious
- [x] ConfirmationScreen — celebratory moment, not generic success state
- [x] Mock data layer — all pages render from hardcoded JSON, no Supabase calls needed for demo

**Not in scope this sprint (logged for later):**
- Upload retry / progress / offline queue
- Supabase Realtime subscriptions (replace polling)
- Email daily digest / push notifications
- Photo moderation / report flow
- Error boundaries on all routes
- Hidden Treasures feature
- Text / video / location submission types
- Three.js atmosphere (2D fallbacks stay)
- Remotion Wrapped video export
- Production .env.local setup docs

---

## Separation of Concerns — Component-Level Responsibility Map

### Design System (`app/globals.css`, `app/layout.tsx`)
**Owns:** All tokens. Typography scale. Motion. Palette.  
**Changes:**
- Add `Fraunces` font import (display axis only, weights 300 + 700)
- Add `Inter_Tight` alongside existing `Inter`
- Retokenize: replace `--color-surface: #1A1F2E` with `--color-surface: #181410` (warm charcoal)
- Replace `--color-base: #0D0D0F` with `--color-base: #0A0908` (warmer near-black)
- Remove blue-ish gradient tokens (`#0D1225`) — these are not in tokens but used inline; grep and kill
- Add `--font-display: 'Fraunces', Georgia, serif`
- Add `--font-ui: 'Inter Tight', 'Inter', sans-serif`
- Tune `--ease-cinematic` — already defined, just ensure used consistently

### Join Page (`app/(auth)/join/page.tsx`)
**Owns:** First impression. Team creation + joining.  
**Changes:**
- Full-bleed `hero-campfire.png` background, 65% dark overlay via `after:` pseudo
- Remove dual-tab toggle (Create / Join) — replace with two sequential screens: screen 1 = Team Name entry → generates code; screen 2 = Enter code. Intent inferred by whether user typed or received a code.
- For POC simplicity: keep the tab toggle but restyle it from pill to **two large text links** (not buttons) — underline active, muted inactive. Luxury menus don't use toggle pills.
- Replace "Noma Resorts" text-only header with the globe PNG as an icon mark (40px) + wordmark
- "Create Team" CTA → "Begin the Challenge"
- "Join Team" CTA → "Join Your Team"
- Remove booking number field for POC (still collect name + email minimum)
- Input style: bottom-border only (no rounded box) — editorial form aesthetic

### Home Page (`app/(main)/home/page.tsx`)
**Owns:** Dashboard entry point, emotional first view post-login.  
**Changes:**
- Delete QuickActions grid (3 redundant links duplicating bottom nav)
- Delete "Your Join Code" section (not needed on home for demo)
- Add "Today's Quest" editorial card — single full-bleed mission photo, mission title in Fraunces, large "→ Start Mission" link. This is the ONE call to action.
- Remove "Welcome back, {name} 👋" — replace with "Good morning, {name}" (no emoji) in Inter Tight light
- Season progress strip moves below the editorial card — compact horizontal strip, not a full banner

### Season Hero Banner (`components/home/SeasonHeroBanner.tsx`)
**Owns:** Team progress display.  
**Changes:**
- Kill the `linear-gradient(135deg, #1A1F2E → #0D1225)` gradient entirely
- Replace with `hero-domes.jpg` as background-image, `object-cover`, with `rgba(10,9,8,0.72)` overlay
- Team name in Fraunces display 700 (this is one of the display moments)
- Points in Fraunces tabular-nums — typeset as art, not a badge
- Rank badge becomes a clean pill: no Trophy icon, just the ordinal in Inter Tight semibold
- Progress bar stays — increase height to 2px, clean

### Mission Cards (`components/missions/MissionCard.tsx`)
**Owns:** Mission browsing, visual hierarchy.  
**Changes:**
- Add optional `heroImage` prop — when present, renders a 3:2 image behind a dark overlay as card top, with title overlaid. Hero mission gets the `hero-adventure.jpg`.
- Standard cards (list view): increase padding, reduce description line-clamp to 1 (breathe more), points in Fraunces tabular-nums
- Remove `Gem` icon for hidden treasure — hide this concept entirely for POC
- `completed` state: gold left-border + reduced opacity, not greyed-out card

### Mission Detail (`app/(main)/missions/[id]/page.tsx`)
**Owns:** Mission focus view, submission entry.  
**Changes:**
- Header: `hero-adventure.jpg` as full-bleed top image (aspect-[4/3]), title overlaid bottom-left in Fraunces
- Remove `SubmissionTypeIcon` from header (redundant with photo context)
- Tips box: keep, but warm background (`rgba(200,144,42,0.08)`) not cold grey

### Mission Submit Form (`app/(main)/missions/[id]/MissionSubmitForm.tsx`)
**Owns:** Upload flow, text entry, submit button.  
**Changes:**
- Upload zone: larger hit area, center the camera icon, "Capture the moment" label instead of generic
- Submit button: "Submit Mission" → full-width, rounded, gold — stays the same but add haptic on success
- Caption input: bottom-border style matching new form aesthetic

### Confirmation Screen (`components/submission/ConfirmationScreen.tsx`)
**Owns:** Post-submission moment.  
**Changes:** This is the celebration moment. Needs to feel earned.
- Points revealed in Fraunces 700 at 48px — large, centered, typeset as a number
- Subtitle: "Well done, {team name}." — period, no exclamation, no emoji. Confidence.
- Background: subtle radial gold glow from center (`radial-gradient(circle, rgba(200,144,42,0.15), transparent)`)
- Animate points number counting up from 0 (CSS counter animation, 600ms)

### Bottom Nav (`components/shared/BottomNav.tsx`)
**Owns:** Primary navigation.  
**Changes:**
- Remove label text entirely — icon only
- Active state: 4px gold dot below icon (not color change on icon)
- Inactive: `#4A4F61` icons (muted, not secondary)
- Active icon: `#F3EFE6` (warm ivory, not gold — the dot is gold, the icon is illuminated)
- Slightly increase icon size to 24px

### Leaderboard Podium (`components/leaderboard/LeaderboardPodium.tsx`)
**Owns:** Top-3 visual moment.  
**Changes:**
- Kill emoji medals entirely
- Replace blocks with: large Fraunces numeral (1, 2, 3) in `--color-gold-400` for 1st, muted for 2nd/3rd
- Add thin SVG laurel wreath around the 1st place avatar (inline SVG, not image)
- Remove colored platform blocks — replace with thin horizontal rule below each name
- Typeset in Inter Tight — team name + points as clean two-line entry

### Leaderboard Row (`components/leaderboard/LeaderboardRow.tsx`)
**Owns:** Ranks 4+.  
**Changes:**
- Rank number left-aligned, Fraunces tabular-nums, muted
- Team name center, bold
- Points right-aligned, tabular-nums
- Remove any gamification styling — restaurant-guide aesthetic: clean lines, no badges

### Feed Card (`components/feed/FeedCard.tsx`)
**Owns:** Social activity stream.  
**Changes:**
- Kill `+{pts}` pill from the header — the number doesn't matter in the feed context
- Mission label: keep eyebrow style, but warm text `#C8902A` instead of muted
- Hardcoded submissions: `hero-sequoia.jpg` and `hero-meadow.jpg` will be the `media_url` values in mock data — these represent "real guest photos" in the POC story
- Caption: slightly larger (15px), Inter Tight, line-height relaxed
- Heart button: keep — slightly larger tap target

### Wrapped (`app/wrapped/`)
**Owns:** Season end showcase — the investor's "wow" moment.  
**Changes:**
- Card 0 (Intro): `globe-rotation.mp4` as autoplay muted loop background. No overlay. Gold "Noma Resorts" wordmark centered. "Your Season, Remembered." in Fraunces light below. Tap to begin.
- Card 1 (Stats): Dark bg, large Fraunces numerals for missions completed + points. Hardcoded values for POC.
- Card 2 (Best Moment): `hero-adventure.jpg` or `hero-campfire.png` full bleed, dark overlay, quote-style caption below.
- Card 3 (Labels): Keep the "Pathfinder", "Trailblazer" etc. labels — typeset in Fraunces, centered, poetic.
- Card 4 (Share): Clean dark card, "Share your adventure" headline, mock share sheet UI.
- Progress dots: thin gold lines (not dots), auto-advance 4s per card, tap to advance.

### Mock Data Layer (`lib/mock-data.ts`) — NEW FILE
**Owns:** All hardcoded POC data so no Supabase needed for demo.  
- Hardcoded team, season, missions, submissions, feed items, leaderboard
- Pages detect `NEXT_PUBLIC_DEMO_MODE=true` and pull from mock instead of Supabase
- This isolates demo from production code cleanly — no Supabase env needed to run the POC demo

---

## Colour & Typography Refinement

### Palette (updated)
```
Base:       #0A0908   (warm near-black, replaces cool #0D0D0F)
Surface:    #181410   (warm dark charcoal, replaces blue-ish #1A1F2E)  
Surface-2:  #221E19   (card bg, slightly lifted)
Ivory:      #F3EFE6   (warm white, replaces neutral #F0EEE9)
Secondary:  #8A8473   (warm grey, replaces blue-grey #8A8F9E)
Muted:      #4A4540   (warm muted, replaces #4A4F61)
Gold-400:   #EAB308   (keep — highlight moments)
Gold-500:   #C8902A   (keep — primary accent)
Gold-tint:  rgba(200,144,42,0.12)  (keep)
```
Principle: **every hex that had a blue/cool undertone gets a warmer equivalent.** This single change eliminates the SaaS-dashboard feel across the entire app.

### Typography Scale
```
Display:  Fraunces 700, 40px/48px    — hero headings, Wrapped, podium rank
Title:    Fraunces 400, 24px/32px    — team name, section anchors  
Body:     Inter Tight 400, 16px/24px — descriptions, captions, body
UI:       Inter Tight 500, 14px/20px — labels, buttons
Eyebrow:  Inter Tight 500, 11px/14px, tracking 0.16em, uppercase — section labels (keep, sparingly)
Mono:     Inter Tight tabular-nums   — points, rank numbers
```
Fraunces is used **only** at Display and Title levels, and only where the number/word needs to feel like art: hero names, points reveals, podium, Wrapped.

### Motion
All existing tokens are correct. Enforce usage:
- Mount animations: `float-in` class already defined — apply to every page's primary content
- Active-state transitions: `duration-fast` (150ms) everywhere — no sluggish transitions
- Wrapped transitions: `duration-cinematic` (600ms) with `ease-cinematic`
- No spring/bounce on primary flows — reserved for the one celebration moment (ConfirmationScreen)

---

## Implementation Checklist (execute next sprint, in order)

### Phase 1 — Foundation (do first, everything depends on it)
- [ ] Install `Fraunces` via `next/font/google`, add `Inter_Tight` alongside `Inter`  
- [ ] Retokenize `globals.css` — warm palette, new font vars, remove blue-ish refs  
- [ ] Create `lib/mock-data.ts` with full hardcoded dataset  
- [ ] Add `NEXT_PUBLIC_DEMO_MODE` env flag; update pages to branch on it  
- [ ] Copy images confirmed into `public/images/` ✅ (done)

### Phase 2 — High-impact screens (investor sees these first)
- [ ] Join page — campfire hero, simplified form, bottom-border inputs
- [ ] Home page — Today's Quest editorial card, no QuickActions
- [ ] SeasonHeroBanner — photo-backed, warm palette, Fraunces points
- [ ] BottomNav — icon-only, gold dot active, warm ivory

### Phase 3 — Depth
- [ ] LeaderboardPodium — typeset numerals, SVG laurel
- [ ] LeaderboardRow — restaurant-guide typesetting
- [ ] MissionCard — photo-backed variant, reduced density
- [ ] FeedCard — real seed photos, kill +pts pill, editorial caption
- [ ] ConfirmationScreen — celebration moment

### Phase 4 — Wrapped (investor's "wow" close)
- [ ] Globe video on intro card
- [ ] 5-card hardcoded sequence
- [ ] Cinematic transitions between cards
- [ ] Share card UI

---

*Last updated: 2026-04-19. All system/backend work (upload reliability, realtime, moderation, notifications) logged in churn risks above and deferred to post-POC sprint.*
