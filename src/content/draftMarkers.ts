// Draft handling for case-study Markdown — shared by the page (dev view) and
// the Vite build (vite.config.ts), so author notes never reach the bundle.
//   [NEEDS INPUT — …]  facts still to be supplied
//   [NOTE — …]         research notes for the author, never public

export const MARKER = /\[(?:NEEDS INPUT|NOTE)[^\]]*\]/g;

/** Sections that are still only prompts — hidden until written */
export const DRAFT_ONLY_SECTIONS = ['Reflection'];

/** Everything from this heading on is for the author only */
export const AUTHOR_ONLY_FROM = '\n## Information I still need';

export const cutAuthorOnly = (md: string) => md.split(AUTHOR_ONLY_FROM)[0];

/** Remove markers; drop lines that only held a marker or a label left dangling by one */
export const stripMarkers = (text: string) =>
  text
    .split('\n')
    .flatMap((line) => {
      if (!line.match(MARKER)) return [line];
      const cleaned = line.replace(MARKER, '').replace(/\s+$/, '');
      if (/^\s*(>|-)?\s*(\*\*[^*]+:\*\*)?\s*$/.test(cleaned)) return [];
      return [cleaned];
    })
    .join('\n');

/** Drop `## <title>` sections listed in DRAFT_ONLY_SECTIONS (with or without a "01 — " prefix) */
export const dropDraftSections = (md: string) =>
  md
    .split(/\n(?=## )/)
    .filter((chunk) => {
      const title = chunk.match(/^## (?:\d+ — )?(.+)/)?.[1]?.trim();
      return !title || !DRAFT_ONLY_SECTIONS.includes(title);
    })
    .join('\n');

/** Production version of a case study: no author notes, no markers, no prompt-only sections */
export const toPublic = (md: string) => stripMarkers(dropDraftSections(cutAuthorOnly(md)));
