# Octech — Making consumer engagement feel tangible

**Category:** Brand Experience · Website · Product Design · UX/UI
**Role:** Senior UI/UX Designer
**Scope:** UX strategy · UI design · Design system · Interaction design · Visual direction
**Live site:** [octech.in](https://octech.in/)
**Timeline:** [NEEDS INPUT] · **Team:** [NEEDS INPUT]

> A new digital experience for a consumer engagement technology company — bringing its products, capabilities and campaign work into one place that enterprise brands can actually navigate.

**My contribution:** [NEEDS INPUT — confirm wording] Led the UX/UI design, visual direction, interaction design and design system for the website, working with the wider design, content and engineering team on implementation.

> [NOTE — Octech's About page lists four UI/UX designers and a frontend team, so this line needs to state precisely which parts were mine — for example "led" vs. "contributed to", and which pages or systems I owned]

---

## 01 — Overview

Octech designs, deploys and operates consumer engagement programmes for enterprise brands: on-pack and trade promotions, brand activations, loyalty programmes, branded games and AI-driven experiences. It describes itself as neither an agency nor a software licence business, but an "engagement systems partner" that runs strategy, engineering, creative and compliance in one team.

That breadth is the design problem. Behind a single campaign sits a platform (Playverra, PromoGenie), an intelligence layer (analytics, fraud detection, personalisation), a set of AI modules, and compliance commitments (ISO 27001:2022, DPDP Act 2023). The website had to make all of that legible to a brand manager in a few minutes — without flattening it into a generic "we do digital" pitch.

I worked on the website experience end to end: structure, visual language, components and the interaction layer. [NEEDS INPUT — confirm which of these were owned vs. shared]

---

## 02 — The Challenge

Octech sells something that is easy to experience and hard to explain. A consumer sees a cricket game or a spin-the-wheel; the brand is buying the reward logic, fraud controls, data capture and integrations behind it.

From what the site has to communicate, the challenge breaks into five parts:

- **A wide ecosystem.** Seven headline products, an intelligence layer with four parts, nine AI modules, three programme types, and five or more industries — all of which relate to each other.
- **Products that need translating.** Names like PromoGenie, Playverra and SmartClaim AI mean nothing to a new visitor until the problem each one solves is made concrete.
- **Proof, not claims.** Enterprise buyers need to see campaigns that actually ran, for brands they recognise.
- **Trust.** Every programme touches consumer data, so security and compliance have to be findable, not buried in a footer.
- **Personality.** Octech makes games and playful campaigns. A site that felt like enterprise software would undersell the work; one that felt like a gaming studio would undersell the rigour.

[NEEDS INPUT — what the previous site or starting point looked like, and what specifically wasn't working]

---

## 03 — Understanding Octech

**What it runs** — three outcome-led programmes, each tied to a business goal:

| Programme | What it's for |
| --- | --- |
| Consumer & Trade Promotions | Trial, participation and controlled rewards at scale — QR, scan-to-play, receipt verification, instant wins |
| Brand Activations | Engagement depth and clean, consented first-party data — microsites, quizzes, referral and WhatsApp journeys |
| Loyalty & Repeat Purchase | Always-on programmes designed for month twelve, not launch day — tiers, earn-burn, AI segmentation, win-back |

**How it runs them** — a four-step method used on every programme: *Observe → Design → Deploy → Optimise.*

**What powers them** — the product ecosystem:

| Product | One-line summary |
| --- | --- |
| PromoGenie | No-code platform to set up, run and scale promotional journeys across channels. |
| AnalyticsGenie | One live dashboard for media spend and promotion performance, with plain answers instead of raw charts. |
| Playverra | The platform that runs campaigns, games, loyalty and rewards — configured per brand rather than rebuilt. |
| GenStudio AI | Consumer co-creation — AI selfies, anthems, pack designs — with moderation, compliance and rewards built in. |
| SmartClaim AI | Automates the path from a submitted receipt or claim to an approved reward, with fraud checks at each step. |
| AcademyGenie | Applies engagement mechanics to learning so people finish courses instead of dropping off. |
| XQR.ink | Makes printed QR codes measurable and editable after print, capturing every scan with context. |
| ShelfVision AI | Reads a retail shelf with computer vision to surface stock, placement and compliance issues. [NOTE — has a product page but isn't in the main navigation] |

Beneath these sit nine AI modules (AI Experience Studio, AI Engagement Engine, AI Conversion & Rewards Engine, AI Intelligence Layer, Personal Creative Generator, User Content Creator, AI Gamification Layer, Fraud & Safety Shield, Smart Reward Picker) and a Campaign Intelligence Report.

**Who it's for** — industries presented on the site, each with its own engagement problem:

| Industry | The problem Octech addresses |
| --- | --- |
| FMCG | On-pack promotions at national scale, reconciled to the last code |
| Retail | Store-level loyalty that works for staff, not just head office |
| Alcobev | Engagement inside strict compliance and age-gating rules |
| Pharma | Chemist and prescriber programmes with full auditability |
| Banking | Card-linked offers and reward economies that hold at volume |

[NEEDS INPUT — the navigation also lists Consumer Durables and Beverages, and the Industries page metadata mentions QSR and Media. Confirm the intended final list]

---

## 04 — Information Architecture

The site is organised so each layer answers the next question a buyer asks:

```
Home
├── Solutions ........ What can you run for us?        (3 programmes)
├── Products ......... What is it built on?            (7 products + AI modules)
├── Intelligence ..... How do we know it's working?    (analytics, fraud, personalisation, agents)
├── Industries ....... Do you understand my category?  (FMCG, Retail, Alcobev, Pharma, Banking…)
├── Case Studies ..... Has this actually worked?       (filterable by Gamification / Promotions / Loyalty / AI)
├── Why Octech ....... Why you, and can we trust you?  (approach, integrations, MACH-ready, security)
├── Blogs ............ How do you think?
└── About / Careers / Contact
```

Three structural decisions make the ecosystem easier to follow:

- **The homepage is a table of contents.** Services, method, numbers, capabilities, platform, industries and FAQ appear in the order a first-time visitor needs them, each linking to its deeper page.
- **Pages cross-reference each other.** Intelligence, product and Why Octech pages end in a "Related" row with labelled cards — *Product*, *System*, *Trust*, *Company* — so a visitor reading about fraud detection is one click from the product that uses it and the compliance page that governs it.
- **Repeatable page templates.** Product pages share one structure (*The Problem → How It Works*, in numbered steps), and case studies share another (*Objective → Journey & Mechanic → Technology Delivered → Key Features*). Twenty-plus product and case-study pages can be read the same way, and new ones slot in without new design work.

[NEEDS INPUT — how the IA was arrived at: workshops, content audits, stakeholder input, card sorting, iterations]

---

## 05 — Visual Direction

- **Typography.** A single family, Urbanist, used across headings and body. Headlines are large and tightly tracked. Small uppercase, letter-spaced eyebrow labels, each led by a red dot ("• HOW WE DELIVER", "• OUR IMPACT"), mark every section.
- **Colour.** A restrained base of near-white surfaces and a deep navy ink, with one strong red (`#F50000`) reserved for the logo mark, primary actions, the method timeline and highlighted figures. The campaign imagery supplies the rest of the colour, so the product work stays the loudest thing on the page.
- **Components.** Large rounded cards for services and case studies. Hairline-divided grids for figures. A vertical red timeline for the four-step method. A dark pill-shaped navigation bar with a products menu. A persistent red call button and "Chat with us" action.
- **Imagery.** Real campaign screens shown inside phone and browser frames, set against the campaign's own world (a cricket stadium, a festive Diwali scene), rather than abstract illustration.

[NEEDS INPUT — exploration: moodboards, rejected directions, how the red and the type were chosen, any brand guidelines you inherited or created]

---

## 06 — Designing the Experience

- **Hero.** Covered in detail in section 07.
- **Navigation.** A compact floating pill that stays readable over both the dark hero and the light content below. "Our Products" opens a grouped menu of solutions, products and industries, so the whole ecosystem is reachable from the first screen.
- **Services.** Consumer Promotions, Loyalty Programmes, Gamification and AI Experiences as large numbered cards, each pairing a single-sentence promise with a real campaign visual.
- **Method.** Observe, Design, Deploy, Optimise on a vertical red timeline — a process diagram that reads as a narrative rather than a slide.
- **Capabilities.** "Everything a campaign needs, already built." A pinned section that scrolls horizontally through campaign cards (Holi Heist 2, Scream to Jump, Love Language Quiz, TCL AR Cricket), with a "Scroll →" cue.
- **Platform.** The product suite shown as real product UI in a browser frame, switchable by product (PromoGenie, AnalyticsGenie, AcademyGenie, Playverra).
- **Industries.** Five tall image columns that expand on hover ("Hover to open"), each with a one-line industry problem.
- **Case studies.** A filterable grid (All · Gamification · Promotions · Loyalty · AI), with every case study following the same four-part template.
- **FAQ.** An accordion answering the questions enterprise teams ask before a first call: agency or platform, fraud, data protection, reward sourcing, launch time.

[NEEDS INPUT — which of these you designed directly, key decisions or trade-offs per section, and mobile versions of each]

---

## 07 — Motion & Interaction

**The hero as a statement of capability.** The hero is built around a fixed "We make", completed by a typed phrase that cycles through five: *brands playable · loyalty rewarding · campaigns engaging · data actionable · AI personalised.* Each phrase maps to one of Octech's capabilities — gamification, loyalty, promotions, analytics and AI — so the headline itself becomes a tour of what the company does.

The rhythm is deliberate: each phrase types in over roughly half a second, holds for about two and a half seconds, deletes and hands over to the next. That's long enough to read, and short enough that the whole range comes round within about 20 seconds.

Beside it, a 3D smartphone (rendered in WebGL) shows real campaign screens — a cricket league game, a Diwali spin-the-wheel — while the full-screen background changes to match each campaign's world, from a floodlit stadium to a festive purple scene. A row of five campaign thumbnails under the headline shows which campaign is on screen.

The idea: instead of *describing* engagement, the hero *performs* it. The words say what Octech makes, and the phone and environment show it being made.

[NEEDS INPUT — confirm whether the typed phrase, phone screen and background are deliberately synchronised to each other, and how the timing was designed and prototyped]

**Other interactive moments observed on the live site:**

- **Custom cursor**, replacing the system cursor across the site. [NEEDS INPUT — describe its states and behaviour]
- **Smooth scrolling** throughout, which the pinned horizontal capability section and scroll-linked reveals rely on.
- **Time-aware greeting.** A line above the headline greets visitors by time of day ("Good afternoon. Let's build something people remember?").
- **Hover-to-expand industry columns** and **accordion FAQs**, which keep dense content one interaction away rather than on screen all at once.

**My role in motion:** [NEEDS INPUT — what you specified (prototypes, timing, easing, storyboards) vs. what engineering built. The 3D and scroll work were implemented by the frontend team]

---

## 08 — Product Storytelling

Much of Octech's offer is invisible: fraud scoring, reward logic, data pipelines. The site makes these concepts concrete in a few consistent ways:

| Concept | How it's made tangible |
| --- | --- |
| Gamification | Real game screens (cricket, endless runners, spin wheels) inside device frames, not descriptions of mechanics |
| Loyalty | "Designed so the reward economics still work at month twelve" — a promise framed around time, shown with real loyalty-app screens |
| Consumer engagement | The case-study template walks through the actual journey: scan → play → score → share → reward |
| AI | Framed by output (an AI selfie, a generated rap, an avatar in 1.8 s) rather than by the model |
| Analytics | Four named measurement layers (participation, redemption, engagement quality, business outcomes) instead of a generic "dashboard" |
| Purchase validation | SmartClaim and Fraud & Safety Shield explained as a numbered path from claim to approved reward |
| Retail intelligence | ShelfVision explained as three steps: photo in-store → every SKU identified → stock and compliance insight |

The common thread: every abstract capability is anchored to either a real campaign, a real screen or a short numbered sequence.

---

## 09 — Outcome

These are **design outcomes**, not measured business results.

- **Clearer product communication.** Every product has a one-line promise and the same *Problem → How it works* structure.
- **Easier movement across the ecosystem.** Related-content cards and a grouped products menu connect products, intelligence, trust and case studies.
- **Stronger visual hierarchy.** One typeface, one accent colour and a consistent eyebrow-label system give 50+ pages a single voice.
- **Credible enterprise positioning.** Security, compliance, integrations and method are first-class pages, not footnotes.
- **Work-first storytelling.** Real campaign screens carry the narrative from the hero to the case studies.

[NOTE — Octech's homepage reports company-wide figures (for example "536+ campaigns delivered", "73M+ consumer interactions"). These describe the business, not this redesign, and shouldn't be presented as results of the website work. The meta description also quotes different figures (1200+ campaigns, 100M+ interactions)]

[NEEDS INPUT — any verified post-launch data: analytics, lead volume, sales feedback, time on site. Only include with a source]

---

## 10 — Reflection

[NEEDS INPUT — this section should be in your own words. Prompts:]

- What was hardest about giving a sales, engineering and compliance story one visual language?
- Which decision would you defend most — and which would you revisit?
- How did working closely with the engineers on 3D and motion change what you designed?
- What did designing templates (product, case study, intelligence) teach you about scaling a site beyond launch?

---

## Information I still need from Gokul

1. **Exact contribution.** Which pages, systems and decisions were yours versus other designers'? Four UI/UX designers are listed on the About page.
2. **Timeline and team.** Project duration, launch date, team size and roles (design, frontend, content, stakeholders).
3. **Starting point.** What the previous site was, and the specific problems or brief that triggered the redesign.
4. **Process.** Research, content audit, IA work, wireframes, prototyping tools, design reviews and iterations.
5. **Design system.** Tokens, component library, grid and type scale, and whether it's documented in Figma.
6. **Motion specifics.** How the hero's typing, phone and background timing was designed, whether it's intentionally synchronised, and the custom cursor's behaviour.
7. **Constraints.** Performance budgets for the 3D, compliance or brand restrictions, and content dependencies.
8. **Responsive work.** Mobile and tablet designs (these weren't reviewed during research).
9. **Collaboration.** How design handed off to and worked with engineering, especially on 3D and scroll.
10. **Results.** Any verified post-launch metrics or feedback, with a source.
11. **Visual assets.** Figma frames, before/after screenshots, hero recordings and component sheets for the case-study page.

---

### Research notes

Sources: the live [octech.in](https://octech.in/) site (51 pages via its sitemap: home, About, Why Octech and its subpages, Solutions, Industries, Case Studies and six case-study pages, Intelligence and four subpages, 20 product pages, Blog), reviewed on 30 Sep 2026.

Inconsistencies found on the live site, worth resolving before publishing:

- Headline figures differ between the homepage (536+ campaigns, 73M+ interactions) and the meta description (1200+ campaigns, 100M+ interactions).
- Industries appear as five on the homepage and Industries page, seven in the navigation, and the Industries metadata also mentions QSR and Media.
- ShelfVision AI has a product page but isn't in the main navigation.
- Some "Related" cards say "product page — in progress" (Analytics Genie, GenStudio) even though the product pages exist.
- The product is called "PromoGenie" on the site, not "PromoX".
