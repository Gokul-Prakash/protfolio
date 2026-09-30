import octechMd from '../../content/case-studies/octech.md?raw';
import { images } from '@assets/assets';
import { cutAuthorOnly, dropDraftSections, stripMarkers } from './draftMarkers';
import { OCTECH_GLANCE, OCTECH_VISUALS } from './octechVisuals';

// Internal notes in the Markdown ([NOTE — …], [NEEDS INPUT — …]) are never shown:
// the `case-study-drafts` plugin strips them at build time, and they're stripped
// again here so dev and production render the same clean page.

export type VisualImage = { src: string; alt: string; label?: string; text?: string };

export type CaseStudyVisual =
  | ({ kind: 'image'; caption?: string; bleed?: boolean } & VisualImage)
  | { kind: 'pair' | 'grid' | 'filmstrip' | 'phones' | 'stack'; items: VisualImage[]; caption?: string }
  | { kind: 'hero'; lead: string; items: VisualImage[] } // interactive replica of a rotating hero
  | { kind: 'tabs'; items: VisualImage[] } // tabbed viewer: label → screen + one-liner
  | { kind: 'chips'; groups: { label: string; items: string[] }[] }
  | { kind: 'cells'; items: { title: string; text: string }[] }
  | { kind: 'flow'; steps: { title: string; text: string }[] }
  | { kind: 'system' };

export type CaseStudySection = {
  title: string;
  /** Headline for the section — its first pull quote, lifted out of the body */
  statement?: string;
  body: string;
  visual?: CaseStudyVisual;
};

export type CaseStudy = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  cover: string;
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
    sections: parseSections(octechMd, OCTECH_VISUALS),
  },
};
