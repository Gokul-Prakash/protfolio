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
  // Everything the site had to hold together, as presented on octech.in
  'The Challenge': {
    kind: 'chips',
    groups: [
      { label: 'Programmes', items: ['Consumer & Trade Promotions', 'Brand Activations', 'Loyalty & Repeat Purchase'] },
      { label: 'Platforms', items: ['Playverra', 'PromoGenie'] },
      { label: 'Intelligence', items: ['Analytics & Measurement', 'Fraud Detection', 'Personalisation', 'Agentic Integrations'] },
      {
        label: 'AI modules',
        items: [
          'AI Experience Studio',
          'AI Engagement Engine',
          'AI Conversion & Rewards Engine',
          'AI Intelligence Layer',
          'Personal Creative Generator',
          'User Content Creator',
          'AI Gamification Layer',
          'Fraud & Safety Shield',
          'Smart Reward Picker',
        ],
      },
      { label: 'Trust', items: ['ISO 27001:2022', 'DPDP Act 2023', 'MACH-ready', 'SLA-backed operations'] },
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
    kind: 'hero',
    lead: 'We make',
    items: [
      { src: img('hero-playable'), alt: 'We make brands playable: cricket stadium, team-select screen', label: 'brands playable.' },
      { src: img('hero-rewarding'), alt: 'We make loyalty rewarding: loyalty app on a violet field', label: 'loyalty rewarding.' },
      { src: img('hero-engaging'), alt: 'We make campaigns engaging: Diwali spin-the-wheel', label: 'campaigns engaging.' },
      { src: img('hero-actionable'), alt: 'We make data actionable: campaign screens on amber', label: 'data actionable.' },
      { src: img('hero-personalised'), alt: 'We make AI personalised: AI character experience', label: 'AI personalised.' },
    ],
  },
  'Making Complex Products Understandable': {
    kind: 'tabs',
    items: [
      { src: img('products-promogenie'), alt: 'PromoGenie product page', label: 'PromoGenie', text: 'A no-code platform to create, run and scale promotional journeys.' },
      { src: img('products-analyticsgenie'), alt: 'AnalyticsGenie product page', label: 'AnalyticsGenie', text: 'One live dashboard for media spend and promotion performance.' },
      { src: img('products-academygenie'), alt: 'AcademyGenie product page', label: 'AcademyGenie', text: 'Engagement mechanics applied to learning, so people finish the course.' },
      { src: img('products-playverra'), alt: 'Playverra product page', label: 'Playverra', text: 'The platform that runs campaigns, games, loyalty and rewards.' },
      { src: img('products-genstudio'), alt: 'GenStudio AI product page', label: 'GenStudio AI', text: 'Consumer co-creation with moderation, compliance and rewards built in.' },
      { src: img('products-smartclaim'), alt: 'SmartClaim AI product page', label: 'SmartClaim AI', text: 'From submitted claim to approved reward, with fraud checks at every step.' },
      { src: img('products-shelfvision'), alt: 'ShelfVision AI product page', label: 'ShelfVision AI', text: 'Computer vision that reads a shelf for stock, placement and compliance.' },
      { src: img('products-xqr'), alt: 'XQR product page', label: 'XQR', text: 'Printed QR codes that stay measurable and editable after print.' },
    ],
  },
  'Campaigns & Industries': {
    kind: 'pair',
    items: [
      { src: img('home-capabilities'), alt: 'Horizontally scrolling campaign cards', label: 'Capabilities · horizontal scroll' },
      { src: img('home-industries'), alt: 'Industries as image columns that open on hover', label: 'Industries · hover to open' },
    ],
  },
  'Motion & Interaction': {
    kind: 'chips',
    groups: [
      {
        label: 'Interactions',
        items: [
          '3D smartphone hero',
          'Typed transitions',
          'Environment changes',
          'Custom cursor',
          'Feathered navigation',
          'Horizontal capability scroll',
          'Hover-to-open industries',
          'Scroll-filled method timeline',
          'In-place product tabs',
          'Smooth scrolling',
        ],
      },
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
    kind: 'cells',
    items: [
      { title: 'A clearer ecosystem', text: 'Programmes, platforms, intelligence, industries and proof each have a place, and the pages connect.' },
      { title: 'Stronger product stories', text: 'Every product answers the same two questions: what is the problem, and how does it work.' },
      { title: 'One visual language', text: 'One typeface, one red and a consistent label system across 50+ pages.' },
      { title: 'A livelier brand', text: 'Visitors experience the work through the hero, scroll and hover, not just read about it.' },
    ],
  },
};
