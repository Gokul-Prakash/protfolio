import type { CaseStudyVisual } from './caseStudies';

// Screens captured from the live octech.in (desktop 1440w, mobile 390w @2x)
const shots = import.meta.glob('../assets/images/Case-Studies/octech/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const img = (name: string) => {
  const src = shots[`../assets/images/Case-Studies/octech/${name}.webp`];
  if (!src) throw new Error(`Missing case-study image: ${name}`);
  return src;
};

// Figures describing Octech's ecosystem as presented on octech.in — not results
export const OCTECH_GLANCE = [
  { value: '3', label: 'Engagement programmes' },
  { value: '8', label: 'Products in the suite' },
  { value: '5', label: 'Core industries' },
  { value: '4', label: 'Movements in one method' },
];

// Visual shown after each section, keyed by section title in octech.md
export const OCTECH_VISUALS: Record<string, CaseStudyVisual> = {
  'The Challenge': {
    kind: 'pair',
    items: [
      { src: img('solutions'), alt: 'Solutions page: outcome-led programmes, not one-off campaigns' },
      { src: img('intelligence'), alt: 'Intelligence page: “Your campaign is live. Do you actually know what’s happening inside it?”' },
    ],
    caption: 'Two sides of the same offer — programmes brands run, and the intelligence that keeps them honest.',
  },
  'Reframing Octech': {
    kind: 'pair',
    items: [
      { src: img('home-services'), alt: 'Services as large cards with a one-line promise and a real campaign' },
      { src: img('home-method'), alt: 'The four-movement method on a red timeline' },
    ],
    caption: 'Capabilities framed as a system: what Octech runs, and the method every programme follows.',
  },
  'Information Architecture': {
    kind: 'flow',
    steps: [
      { title: 'Capabilities', text: 'What can you run?' },
      { title: 'Products', text: 'What is it built on?' },
      { title: 'Industries', text: 'Does it fit my category?' },
      { title: 'Case Studies', text: 'Has it worked?' },
      { title: 'Insights', text: 'How do you think?' },
    ],
  },
  'Visual Direction': { kind: 'system' },
  'The Hero Experience': {
    kind: 'filmstrip',
    items: [
      { src: img('hero-playable'), alt: 'We make brands playable — cricket stadium, team-select screen', label: 'brands playable.' },
      { src: img('hero-rewarding'), alt: 'We make loyalty rewarding — loyalty app on a violet field', label: 'loyalty rewarding.' },
      { src: img('hero-engaging'), alt: 'We make campaigns engaging — Diwali spin-the-wheel', label: 'campaigns engaging.' },
      { src: img('hero-actionable'), alt: 'We make data actionable — campaign screens on amber', label: 'data actionable.' },
      { src: img('hero-personalised'), alt: 'We make AI personalised — AI character experience', label: 'AI personalised.' },
    ],
    caption: 'One hero, five states. The phrase, the phone and the world behind it change together.',
  },
  'Making Complex Products Understandable': {
    kind: 'grid',
    items: [
      { src: img('products-promogenie'), alt: 'PromoGenie', label: 'PromoGenie' },
      { src: img('products-analyticsgenie'), alt: 'AnalyticsGenie', label: 'AnalyticsGenie' },
      { src: img('products-academygenie'), alt: 'AcademyGenie', label: 'AcademyGenie' },
      { src: img('products-playverra'), alt: 'Playverra', label: 'Playverra' },
      { src: img('products-genstudio'), alt: 'GenStudio AI', label: 'GenStudio AI' },
      { src: img('products-smartclaim'), alt: 'SmartClaim AI', label: 'SmartClaim AI' },
      { src: img('products-shelfvision'), alt: 'ShelfVision AI', label: 'ShelfVision AI' },
      { src: img('products-xqr'), alt: 'XQR', label: 'XQR' },
    ],
    caption: 'Eight products, one structure — each with its own highlight and accent inside the Octech system.',
  },
  'Capabilities & Engagement Mechanics': {
    kind: 'image',
    src: img('home-capabilities'),
    alt: '“Everything a campaign needs, already built” — horizontally scrolling campaign cards',
    caption: 'Mechanics shown as campaigns people have played, in a pinned horizontal scroll.',
  },
  Industries: {
    kind: 'image',
    src: img('home-industries'),
    alt: 'Industries as tall image columns that open on hover',
    caption: 'Five industries, each told as the problem that category brings.',
  },
  'Case Studies & Campaign Storytelling': {
    kind: 'pair',
    items: [
      { src: img('cases-pulse'), alt: 'Scream for Pulse case study page' },
      { src: img('cases-index'), alt: 'Case study index filtered by mechanic' },
    ],
    caption: 'Campaign-specific openings, one consistent story structure, filterable by mechanic.',
  },
  'Motion & Interaction': {
    kind: 'image',
    src: img('home-platform'),
    alt: 'Platform section — product tabs switch the live preview in place, under the feathered navigation',
    caption: 'Product tabs switch the preview in place, beneath the floating, feathered navigation.',
  },
  'AI & Visual Storytelling': {
    kind: 'pair',
    items: [
      { src: img('products-genstudio'), alt: 'GenStudio AI — a strip of real consumer creations' },
      { src: img('intelligence'), alt: 'The intelligence layer framed as a question brand managers ask' },
    ],
    caption: 'AI shown through what it makes and what it tells you — never a glowing brain.',
  },
  'Responsive Experience': {
    kind: 'phones',
    items: [
      { src: img('m-hero'), alt: 'Mobile hero — phone as the centrepiece', label: 'Hero' },
      { src: img('m-menu'), alt: 'Mobile menu as a rounded card', label: 'Menu' },
      { src: img('m-services'), alt: 'Stacked service cards with mechanic tags', label: 'Cards' },
      { src: img('m-method'), alt: 'Method timeline that fills as you scroll', label: 'Method' },
      { src: img('m-industries'), alt: 'Industries as stacked image cards', label: 'Industries' },
    ],
  },
  Outcome: {
    kind: 'image',
    src: img('hero-engaging'),
    alt: 'The Octech hero — We make campaigns engaging',
    bleed: true,
  },
};
