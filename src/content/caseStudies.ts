import octechMd from '../../content/case-studies/octech.md?raw';
import playverraMd from '../../content/case-studies/playverra.md?raw';
import { images } from '@assets/assets';
import { cutAuthorOnly, dropDraftSections, stripMarkers } from './draftMarkers';
import { OCTECH_GLANCE, OCTECH_VISUALS } from './octechVisuals';
import { PLAYVERRA_COVER, PLAYVERRA_LOGO, PLAYVERRA_THUMB, PLAYVERRA_VISUALS } from './playverraVisuals';

// Internal notes in the Markdown ([NOTE — …], [NEEDS INPUT — …]) are never shown:
// the `case-study-drafts` plugin strips them at build time, and they're stripped
// again here so dev and production render the same clean page.

export type VisualImage = {
  src: string;
  alt: string;
  label?: string;
  text?: string;
  /** Crop a detail out of the source image: [x, y, w, h] in source pixels */
  crop?: [number, number, number, number];
  /** Source image size, needed for crops */
  size?: [number, number];
};

export type Swatch = { name: string; hex: string; role: string; ink: string };

export type CaseStudyVisual =
  | ({ kind: 'image'; caption?: string; bleed?: boolean } & VisualImage)
  | { kind: 'pair' | 'grid' | 'filmstrip' | 'phones' | 'stack'; items: VisualImage[]; caption?: string }
  | { kind: 'hero'; lead: string; items: VisualImage[] } // interactive replica of a rotating hero
  | { kind: 'tabs'; items: VisualImage[] } // tabbed viewer: label → screen + one-liner
  | { kind: 'chips'; groups: { label: string; items: string[] }[] }
  | { kind: 'cells'; items: { title: string; text: string }[] }
  | { kind: 'flow'; steps: { title: string; text: string }[] }
  | { kind: 'system' }
  // Device mockups; `journey` draws connectors between them
  | { kind: 'devices'; items: VisualImage[]; journey?: boolean }
  // One screen with callouts beside it
  | { kind: 'annotated'; image: VisualImage; notes: { title: string; text: string }[]; flip?: boolean }
  // Zoomed-in UI fragments with a title and line each
  | { kind: 'crops'; items: VisualImage[] }
  // Colour, type and real components cropped from the screens
  | {
      kind: 'palette';
      swatches: Swatch[];
      accents?: Swatch[];
      gradient?: [string, string];
      typeface: string;
      hierarchy?: { style: string; weight: string; use: string }[];
      components: VisualImage[];
    }
  // Before / after device pairs
  | { kind: 'compare'; pairs: { before: VisualImage; after: VisualImage; label: string }[] }
  // Logo redesign: old mark → new mark, lockup, and the splash it lives on
  | { kind: 'logo'; before: VisualImage; mark: VisualImage; lockup: VisualImage; inUse: VisualImage };

export type CaseStudySection = {
  title: string;
  /** Headline for the section — its first pull quote, lifted out of the body */
  statement?: string;
  body: string;
  visual?: CaseStudyVisual;
};

export type CaseStudy = {
  slug: string;
  /** Display name in the case study (brand casing, e.g. OCTECH) */
  name: string;
  /** Name on the home page work card, in normal case */
  title: string;
  tagline: string;
  intro: string;
  /** Cover image, or a visual (e.g. device mockups) in its place */
  cover: string;
  coverVisual?: CaseStudyVisual;
  /** Image for the work card on the home page (defaults to cover) */
  thumb?: string;
  /** Card tags on the home page */
  tags?: string;
  /** Brand mark shown above the title */
  logo?: string;
  /** Big one-line flow under the intro, e.g. PLAY → DISCOVER → EARN */
  motto?: string[];
  /** Closing statement before the contact card */
  closing?: { title: string; text: string };
  /** Per-study accent (text/lines) and fill; forces the dark theme */
  theme?: { accent: string; fill: string };
  glance?: { value: string; label: string }[];
  meta: { label: string; value: string; href?: string; draft?: boolean }[];
  sections: CaseStudySection[];
};

// Take the first `> ` block as the section statement (shown as its headline)
const liftStatement = (text: string) => {
  const lines = text.split('\n');
  const start = lines.findIndex((l) => l.startsWith('> '));
  if (start === -1) return { statement: undefined, rest: text };
  let end = start;
  while (end < lines.length && lines[end].startsWith('>')) end++;
  const statement = lines.slice(start, end).map((l) => l.replace(/^>\s?/, '')).join(' ').trim();
  return { statement, rest: [...lines.slice(0, start), ...lines.slice(end)].join('\n').trim() };
};


// Body = everything after the intro block (first `---`) and before the
// author-only list; split into `## ` sections.
const parseSections = (md: string, visuals: Record<string, CaseStudyVisual> = {}): CaseStudySection[] => {
  const body = cutAuthorOnly(md).split(/\n---\n/).slice(1).join('\n');
  const source = dropDraftSections(body);

  return source
    .split(/\n(?=## )/)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.startsWith('## '))
    .map((chunk) => {
      const [heading, ...rest] = chunk.split('\n');
      const text = rest.join('\n').trim();
      const title = heading.replace(/^## (\d+ — )?/, '').trim(); // no serial numbers on the site
      const { statement, rest: bodyText } = liftStatement(stripMarkers(text));
      return { title, statement, body: bodyText, visual: visuals[title] };
    });
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  octech: {
    slug: 'octech',
    name: 'OCTECH', // brand name is set in capitals, as in the logo
    title: 'Octech',
    tagline: 'Making consumer engagement feel tangible.',
    intro:
      'A complete digital experience for a consumer engagement technology company, bringing its capabilities, products, industries and campaign work into one coherent story.',
    cover: images.caseStudies.octech,
    glance: OCTECH_GLANCE,
    meta: [
      { label: 'Project', value: 'Octech corporate website' },
      { label: 'Role', value: 'Senior UI/UX Designer' },
      { label: 'Scope', value: 'UX strategy · IA · UI design · Design system · Interaction & motion · Visual direction' },
      { label: 'Platform', value: 'Responsive website, desktop to mobile' },
      { label: 'Live site', value: 'octech.in', href: 'https://octech.in/' },
    ],
    tags: 'Website / Product / UX/UI',
    sections: parseSections(octechMd, OCTECH_VISUALS),
  },

  playverra: {
    slug: 'playverra',
    name: 'PLAYVERRA',
    title: 'Playverra',
    tagline: 'Designing a play, discover & rewards ecosystem.',
    intro:
      'Playverra brings casual gaming, discovery, challenges and rewards together in one engaging mobile experience.',
    cover: PLAYVERRA_THUMB,
    coverVisual: PLAYVERRA_COVER,
    thumb: PLAYVERRA_THUMB,
    logo: PLAYVERRA_LOGO,
    tags: 'Mobile app / Brand / Product / UI',
    motto: ['Play', 'Discover', 'Earn'],
    closing: {
      title: 'Play. Discover. Earn.',
      text: 'A gaming experience designed to give users more reasons to come back.',
    },
    theme: { accent: '#7CFF00', fill: '#7CFF00' },
    meta: [
      { label: 'Project', value: 'Playverra mobile app' },
      { label: 'Role', value: 'Senior UI/UX Designer' },
      { label: 'Scope', value: 'Brand identity · Product design · UI design · Design system' },
      { label: 'Platform', value: 'Mobile app' },
      { label: 'Screens', value: 'Splash · Home · Discover · Play · Rewards · Profile' },
    ],
    sections: parseSections(playverraMd, PLAYVERRA_VISUALS),
  },
};
