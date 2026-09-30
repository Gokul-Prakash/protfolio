import octechMd from '../../content/case-studies/octech.md?raw';
import { images } from '@assets/assets';
import { MARKER, cutAuthorOnly, dropDraftSections, stripMarkers } from './draftMarkers';
import { OCTECH_GLANCE, OCTECH_VISUALS } from './octechVisuals';

// Dev shows draft markers as highlighted chips. Production builds receive the
// Markdown already cleaned by the `case-study-drafts` plugin in vite.config.ts;
// the runtime clean-up below is a second safety net.
export const SHOW_DRAFTS = import.meta.env.DEV;

export type VisualImage = { src: string; alt: string; label?: string };

export type CaseStudyVisual =
  | ({ kind: 'image'; caption?: string; bleed?: boolean } & VisualImage)
  | { kind: 'pair' | 'grid' | 'filmstrip' | 'phones' | 'stack'; items: VisualImage[]; caption?: string }
  | { kind: 'flow'; steps: { title: string; text: string }[] }
  | { kind: 'system' };

export type CaseStudySection = { title: string; body: string; visual?: CaseStudyVisual };

export type CaseStudy = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  cover: string;
  glance?: { value: string; label: string }[];
  meta: { label: string; value: string; href?: string; draft?: boolean }[];
  contribution: { text: string; draft?: boolean };
  sections: CaseStudySection[];
};

const toChips = (text: string) => text.replace(MARKER, (m) => '`' + m.slice(1, -1) + '`');

// Body = everything after the intro block (first `---`) and before the
// author-only list; split into `## ` sections.
const parseSections = (md: string, visuals: Record<string, CaseStudyVisual> = {}): CaseStudySection[] => {
  const body = cutAuthorOnly(md).split(/\n---\n/).slice(1).join('\n');
  const source = SHOW_DRAFTS ? body : dropDraftSections(body);

  return source
    .split(/\n(?=## )/)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.startsWith('## '))
    .map((chunk) => {
      const [heading, ...rest] = chunk.split('\n');
      const text = rest.join('\n').trim();
      const title = heading.replace(/^## (\d+ — )?/, '').trim(); // no serial numbers on the site
      return { title, body: SHOW_DRAFTS ? toChips(text) : stripMarkers(text), visual: visuals[title] };
    });
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  octech: {
    slug: 'octech',
    name: 'Octech',
    tagline: 'Making consumer engagement feel tangible.',
    intro:
      'A complete digital experience for a consumer engagement technology company — bringing its capabilities, products, industries and campaign work into one coherent story.',
    cover: images.caseStudies.octech,
    glance: OCTECH_GLANCE,
    meta: [
      { label: 'Project', value: 'Octech corporate website' },
      { label: 'Role', value: 'Senior UI/UX Designer' },
      { label: 'Scope', value: 'UX strategy · IA · UI design · Design system · Interaction & motion · Visual direction' },
      { label: 'Platform', value: 'Responsive website — desktop to mobile' },
      { label: 'Live site', value: 'octech.in', href: 'https://octech.in/' },
    ],
    contribution: {
      text: 'I designed the website from the ground up — structure, visual language, components, page templates and the interaction layer — working alongside the engineering team who built it.',
    },
    sections: parseSections(octechMd, OCTECH_VISUALS),
  },
};
