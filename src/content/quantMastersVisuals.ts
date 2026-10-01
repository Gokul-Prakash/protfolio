import type { CaseStudyVisual, VisualImage } from './caseStudies';

// Quant Masters screens from the design file: student portal exports resized to
// 1600w, landing page sections at 1800–2000w, and a composed work-card thumb
const shots = import.meta.glob('../assets/images/Case-Studies/quant-masters/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const img = (name: string) => {
  const src = shots[`../assets/images/Case-Studies/quant-masters/${name}.webp`];
  if (!src) throw new Error(`Missing case-study image: ${name}`);
  return src;
};

// Exported portal screens are 1600 wide; heights vary per screen
const W = 1600;
const SIZES: Record<string, number> = {
  overview: 1436,
  practice: 1284,
  test: 1018,
  results: 1608,
  analytics: 1739,
  leaderboard: 1318,
  ibps: 1358,
  'weekly-challenges': 1396,
  'company-papers': 1040,
  'company-interviews': 1359,
  'interview-prep': 1399,
  'session-notes': 1406,
  'technical-notes': 1665,
};

const screen = (name: string, label: string, alt: string, text?: string): VisualImage & { name: string } => ({
  name,
  src: img(name),
  alt,
  label,
  text,
  size: [W, SIZES[name]],
});

const s = {
  overview: screen('overview', 'Dashboard', 'Quant Masters dashboard: weekly KPIs, performance trend, accuracy by topic, recent tests and study activity'),
  practice: screen('practice', 'Trial Papers', 'Trial Papers: continue-last-attempt banner above test cards with status tags'),
  test: screen('test', 'Test', 'Test interface: one question with options, and a question palette showing answered, incorrect and current states'),
  results: screen('results', 'My Results', 'My Results: KPIs, performance trend, accuracy by topic and personalised insights'),
  analytics: screen('analytics', 'Analytics', 'Analytics: topic breakdown, strength vs weakness, insight cards and Practice Now'),
  leaderboard: screen('leaderboard', 'Leaderboard', 'Leaderboard: top three podium, your ranking with progress to the next rank, and the rankings table', 'Your rank, and exactly how far it is to the next one.'),
  ibps: screen('ibps', 'IBPS', 'IBPS Preparation: overall progress, mastery streak and mock tests', 'A structured exam path: progress against peers, a mastery streak and the next mock.'),
  weekly: screen('weekly-challenges', 'Weekly Challenges', 'Weekly Challenges: live challenge banner, your progress, leaderboard preview and previous challenges', 'A live, time-boxed contest with a leaderboard preview and past results.'),
  papers: screen('company-papers', 'Company Papers', 'Company Papers: company, role and difficulty filters above test cards'),
  interviews: screen('company-interviews', 'Company Interviews', 'Company Interviews: company filter chips and interview experience videos', 'Real interview experiences, filtered by company and tagged by round.'),
  prep: screen('interview-prep', 'Interview Prep', 'Interview Prep: resume HR round questions, preparation categories and expert video tips', 'Pick up the round you left, then work through HR, technical and aptitude.'),
  session: screen('session-notes', 'Session Notes', 'Session Notes: continue learning card and categories with progress', 'Notes from live and recorded sessions, each with its own progress.'),
  technical: screen('technical-notes', 'Technical Notes', 'Technical Notes: subject selector, subject pills and a numbered curriculum', 'Branch-wise notes, organised as a curriculum of modules and topics.'),
};

const landing = {
  hero: { src: img('landing-hero'), alt: 'Quant Masters landing page hero: “Turn Practice into Placement Success” above the dashboard in a laptop frame' },
  programs: { src: img('landing-programs'), alt: 'Landing page: Programs Built for Placement Success, with Aptitude, Coding, Mock Tests and Interview Prep cards', label: 'Landing · Programs' },
  ecosystem: { src: img('landing-ecosystem'), alt: 'Landing page: Our Proven Ecosystem, Learn → Practice → Analyze → Crack It', label: 'Landing · Ecosystem' },
};

// Zoomed detail cut out of a portal screen. Boxes are measured on a preview of
// the screen `preview` px wide and scaled to the 1600w export.
const crop = (
  base: VisualImage & { name: string },
  box: [number, number, number, number],
  label: string,
  text: string,
  preview = 1400
): VisualImage => ({
  ...base,
  crop: box.map((n) => Math.round((n * W) / preview)) as [number, number, number, number],
  label,
  text,
  alt: `${label}: detail from the ${base.label} screen`,
});

export const QM_THUMB = img('thumb');

export const QM_COVER: CaseStudyVisual = { kind: 'image', ...landing.hero };

// What the portal holds, as presented by the design — not results
export const QM_GLANCE = [
  { value: '18', label: 'Destinations in the student portal' },
  { value: '6', label: 'Navigation areas' },
  { value: '13', label: 'Portal screens shown here' },
  { value: '1', label: 'Shared design system' },
];

export const QM_VISUALS: Record<string, CaseStudyVisual> = {
  'The Challenge': {
    kind: 'flow',
    columns: 7,
    steps: [
      { title: 'Learn', text: 'Notes' },
      { title: 'Practise', text: 'Trial papers' },
      { title: 'Test', text: 'Mocks' },
      { title: 'Analyse', text: 'Results' },
      { title: 'Improve', text: 'Weak areas' },
      { title: 'Prepare', text: 'Interviews' },
      { title: 'Perform', text: 'Placement' },
    ],
  },
  'Understanding the Existing Product': {
    kind: 'cells',
    items: [
      { title: 'Content heavy', text: 'Information was available, but the hierarchy made discovery harder.' },
      { title: 'Fragmented', text: 'Learning, testing and preparation lived in separate experiences.' },
      { title: 'Low actionability', text: 'Performance data didn’t always translate into a clear next step.' },
      { title: 'Limited personalisation', text: 'The experience didn’t answer “what should I do next?”' },
    ],
  },
  'The New Direction': {
    kind: 'stack',
    items: [landing.programs, landing.ecosystem],
  },
  'Design System': {
    kind: 'palette',
    typeface: 'DM Sans',
    sample: 'Practise. Analyse. Perform.',
    gradient: ['#013FE0', '#6042EE'],
    swatches: [
      { name: 'Quant Blue', hex: '#3657FF', role: 'Primary actions & current state', ink: '#FFFFFF' },
      { name: 'Ink', hex: '#111111', role: 'Headings & key figures', ink: '#FFFFFF' },
      { name: 'Blue Tint', hex: '#EEF2FF', role: 'Active navigation & highlights', ink: '#111111' },
      { name: 'Surface', hex: '#FFFFFF', role: 'Cards and page background', ink: '#111111' },
    ],
    accents: [
      { name: 'Midnight', hex: '#0F172A', role: 'Dark landing surfaces', ink: '#FFFFFF' },
      { name: 'Violet', hex: '#6042EE', role: 'Gradient end', ink: '#FFFFFF' },
      { name: 'Slate', hex: '#6B7280', role: 'Secondary text', ink: '#FFFFFF' },
      { name: 'Green', hex: '#22C55E', role: 'Answered, gains', ink: '#111111' },
      { name: 'Red', hex: '#EF4444', role: 'Incorrect, drops', ink: '#FFFFFF' },
      { name: 'Amber', hex: '#F59E0B', role: 'In progress, needs focus', ink: '#111111' },
    ],
    components: [
      crop(s.overview, [311, 185, 200, 130], 'Stat card', 'Metric, icon and its change this week.'),
      crop(s.practice, [311, 465, 345, 255], 'Test card', 'Status first, then title, topic and meta.'),
      crop(s.test, [1040, 200, 318, 260], 'Palette states', 'Answered, incorrect and current, at a glance.'),
      crop(s.practice, [322, 128, 560, 210], 'Resume banner', 'The gradient, kept for what’s in progress.'),
      crop(s.analytics, [468, 1032, 165, 240], 'Insight card', 'A finding with a suggestion underneath.', 1288),
      crop(s.overview, [20, 110, 250, 300], 'Navigation', 'Labelled groups; the current page in blue.'),
    ],
  },
  'The Student Experience': {
    kind: 'chips',
    groups: [
      { label: 'Practice & tests', items: ['Trial Papers', 'Mock Tests', 'Section Tests', 'Chapter Tests'] },
      { label: 'Performance', items: ['My Results', 'Analytics', 'Leaderboard'] },
      { label: 'Competitive exams', items: ['IBPS', 'AFCAT', 'Weekly Challenges'] },
      { label: 'Interviews & media', items: ['Company Interviews', 'Testimonials'] },
      { label: 'Company prep', items: ['Company Papers', 'Interview Prep'] },
      { label: 'Learning resources', items: ['Session Notes', 'Technical Notes', 'Verbal Notes'] },
    ],
  },
  Dashboard: {
    kind: 'annotated',
    wide: true,
    image: s.overview,
    notes: [
      { title: 'Next action first', text: 'A greeting and Take Mock Test sit above every number.' },
      { title: 'Weekly deltas', text: 'Each KPI shows its change this week, so a number has a direction.' },
      { title: 'Trend over time', text: 'Accuracy and percentile plotted together across the week.' },
      { title: 'Accuracy by topic', text: 'Four subjects at a glance, with a route into detailed analytics.' },
      { title: 'Recent tests', text: 'Score, accuracy and percentile for every attempt, in one table.' },
      { title: 'Study activity', text: 'A heatmap and a 7-day streak make consistency visible.' },
    ],
  },
  'Test Discovery': {
    kind: 'annotated',
    wide: true,
    image: s.practice,
    notes: [
      { title: 'Continue last attempt', text: 'Time left, questions attempted and one Resume Test action.' },
      { title: 'Status on every card', text: 'Not started, In progress or Completed, read before the title.' },
      { title: 'Decision metadata', text: 'Topic, duration and question count on each card.' },
      { title: 'Filters beside the list', text: 'Difficulty and sort sit with the tests they act on.' },
    ],
  },
  'The Assessment Experience': {
    kind: 'annotated',
    wide: true,
    image: s.test,
    notes: [
      { title: 'One question', text: 'Question, topic and progress; options as large, lettered targets.' },
      { title: 'Question palette', text: 'Every question’s state in a persistent side list.' },
      { title: 'Time, always visible', text: 'The countdown in the header, minutes remaining in the palette.' },
      { title: 'Calm controls', text: 'Mark for review, Previous and Next, with Submit Test set apart.' },
    ],
  },
  'From Performance to Action': {
    kind: 'annotated',
    wide: true,
    image: s.analytics,
    notes: [
      { title: 'Topic breakdown', text: 'Five subjects as bars, so the gaps are obvious.' },
      { title: 'Strength vs weakness', text: 'What’s working and what isn’t, named side by side.' },
      { title: 'Insight cards', text: 'Performance, weak area, behaviour and consistency, each with a suggestion.' },
      { title: 'Practice Now', text: 'The analysis ends in one action: a personalised practice set.' },
    ],
  },
  'Competitive Preparation': {
    kind: 'tabs',
    items: [s.ibps, s.weekly, s.leaderboard],
  },
  'Interview Preparation': {
    kind: 'tabs',
    items: [s.interviews, s.prep, s.session, s.technical],
  },
  'Structuring Technical Notes': {
    kind: 'annotated',
    wide: true,
    image: s.technical,
    notes: [
      { title: 'Branch selector', text: 'Sets the context: Computer Science, ECE, EEE and more.' },
      { title: 'Subject pills', text: 'Switch between subjects within a branch in one tap.' },
      { title: 'Numbered modules', text: 'Each with its topic count and study time, collapsible.' },
      { title: 'Topic states', text: 'Done, in progress or not started, with Review or Open Topic.' },
    ],
  },
  'Company Discovery': {
    kind: 'annotated',
    wide: true,
    image: s.papers,
    notes: [
      { title: 'Structured filters', text: 'Company, role and difficulty, combined instead of scanned.' },
      { title: 'Status badges', text: 'New, In progress or Completed, top right on every card.' },
      { title: 'State-aware actions', text: 'Start Test, Resume or Retake Test, depending on progress.' },
      { title: 'Load more', text: 'The list grows on demand rather than as one long wall.' },
    ],
  },
  'The Complete Portal': {
    kind: 'grid',
    items: [
      s.overview,
      s.practice,
      s.test,
      s.results,
      s.analytics,
      s.ibps,
      s.weekly,
      s.leaderboard,
      s.interviews,
      s.papers,
      s.prep,
      s.technical,
    ],
  },
};
