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
      { src: img('solutions'), alt: 'Solutions page: outcome-led programmes, not one-off campaigns', label: 'Solutions' },
      { src: img('intelligence'), alt: 'Intelligence page: “Your campaign is live. Do you actually know what’s happening inside it?”', label: 'Intelligence' },
    ],
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
      { src: img('hero-playable'), alt: 'We make brands playable: cricket stadium, team-select screen', label: 'brands playable.' },
      { src: img('hero-rewarding'), alt: 'We make loyalty rewarding: loyalty app on a violet field', label: 'loyalty rewarding.' },
      { src: img('hero-engaging'), alt: 'We make campaigns engaging: Diwali spin-the-wheel', label: 'campaigns engaging.' },
      { src: img('hero-actionable'), alt: 'We make data actionable: campaign screens on amber', label: 'data actionable.' },
      { src: img('hero-personalised'), alt: 'We make AI personalised: AI character experience', label: 'AI personalised.' },
    ],
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
  },
  'Campaigns & Industries': {
    kind: 'pair',
    items: [
      { src: img('home-capabilities'), alt: 'Horizontally scrolling campaign cards', label: 'Capabilities · horizontal scroll' },
      { src: img('home-industries'), alt: 'Industries as image columns that open on hover', label: 'Industries · hover to open' },
    ],
  },
  'Responsive Experience': {
    kind: 'phones',
    items: [
      { src: img('m-hero'), alt: 'Mobile hero with the phone as the centrepiece', label: 'Hero' },
      { src: img('m-menu'), alt: 'Mobile menu as a rounded card', label: 'Menu' },
      { src: img('m-services'), alt: 'Stacked service cards with mechanic tags', label: 'Cards' },
      { src: img('m-method'), alt: 'Method timeline that fills as you scroll', label: 'Method' },
      { src: img('m-industries'), alt: 'Industries as stacked image cards', label: 'Industries' },
    ],
  },
  Outcome: {
    kind: 'image',
    src: img('hero-engaging'),
    alt: 'The Octech hero: We make campaigns engaging',
    bleed: true,
  },
};
