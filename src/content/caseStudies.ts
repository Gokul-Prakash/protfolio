import octechMd from '../../content/case-studies/octech.md?raw';
import { images } from '@assets/assets';
import { MARKER, cutAuthorOnly, dropDraftSections, stripMarkers } from './draftMarkers';

// Dev shows draft markers as highlighted chips. Production builds receive the
// Markdown already cleaned by the `case-study-drafts` plugin in vite.config.ts;
// the runtime clean-up below is a second safety net.
export const SHOW_DRAFTS = import.meta.env.DEV;

export type CaseStudySection = { title: string; body: string };

export type CaseStudy = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  cover: string;
  meta: { label: string; value: string; href?: string; draft?: boolean }[];
  contribution: { text: string; draft?: boolean };
  sections: CaseStudySection[];
};

const toChips = (text: string) => text.replace(MARKER, (m) => '`' + m.slice(1, -1) + '`');

// Body = everything after the intro block (first `---`) and before the
// author-only list; split into `## ` sections.
const parseSections = (md: string): CaseStudySection[] => {
  const body = cutAuthorOnly(md).split(/\n---\n/).slice(1).join('\n');
  const source = SHOW_DRAFTS ? body : dropDraftSections(body);

  return source
    .split(/\n(?=## )/)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.startsWith('## '))
    .map((chunk) => {
      const [heading, ...rest] = chunk.split('\n');
      const text = rest.join('\n').trim();
      return {
        title: heading.replace(/^## (\d+ — )?/, '').trim(), // no serial numbers on the site
        body: SHOW_DRAFTS ? toChips(text) : stripMarkers(text),
      };
    });
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  octech: {
    slug: 'octech',
    name: 'Octech',
    tagline: 'Making consumer engagement feel tangible.',
    intro:
      'A new digital experience for a consumer engagement technology company — bringing its products, capabilities and campaign work into one place that enterprise brands can actually navigate.',
    cover: images.caseStudies.octech,
    meta: [
      { label: 'Role', value: 'Senior UI/UX Designer' },
      { label: 'Scope', value: 'UX strategy · UI design · Design system · Interaction design · Visual direction' },
      { label: 'Category', value: 'Brand Experience · Website · Product Design · UX/UI' },
      { label: 'Live site', value: 'octech.in', href: 'https://octech.in/' },
      // Placeholders — dev only (dropped from production builds). Replace with real values.
      ...(SHOW_DRAFTS
        ? [
            { label: 'Timeline', value: 'NEEDS INPUT', draft: true },
            { label: 'Team', value: 'NEEDS INPUT', draft: true },
          ]
        : []),
    ],
    contribution: {
      text: 'Led the UX/UI design, visual direction, interaction design and design system for the website, working with the wider design, content and engineering team on implementation.',
      draft: true, // wording still to be confirmed — see the NOTE in the Markdown source
    },
    sections: parseSections(octechMd),
  },
};
