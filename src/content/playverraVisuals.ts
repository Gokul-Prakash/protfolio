import type { CaseStudyVisual, VisualImage } from './caseStudies';
import pvLogo from '@assets/images/Case-Studies/playverra/pv-logo.svg';
import pvMark from '@assets/images/Case-Studies/playverra/pv-mark.svg';

// Playverra screens from the design file: latest (880×1912, @2x) and the older
// version (720×1600), plus a montage still for the work card
const shots = import.meta.glob('../assets/images/Case-Studies/playverra/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const img = (name: string) => {
  const src = shots[`../assets/images/Case-Studies/playverra/${name}.webp`];
  if (!src) throw new Error(`Missing case-study image: ${name}`);
  return src;
};

// Mark only (no wordmark) for the case study header, next to the big title
export const PLAYVERRA_LOGO = pvMark;

const LATEST: [number, number] = [880, 1912];
const OLDER: [number, number] = [720, 1600];

const screen = {
  splash: { src: img('splash-screen'), alt: 'Playverra splash screen with the new PV mark and “Level up your game”', label: 'Splash' },
  home: { src: img('home-screen'), alt: 'Playverra Home: streak, points, live activity and the Continue Playing carousel', label: 'Home' },
  discover: { src: img('discover-screen'), alt: 'Playverra Discover: search, category pills and Trending Now game cards', label: 'Discover' },
  play: { src: img('play-game-reels'), alt: 'Playverra Watch & Play: Fish Catcher reel with Play Now', label: 'Play' },
  rewards: { src: img('rewards'), alt: 'Playverra Claim Rewards: gift cards and vouchers priced in points', label: 'Rewards' },
  profile: { src: img('profile'), alt: 'Playverra Profile: points, redeem rewards and play stats', label: 'Profile' },
} satisfies Record<string, VisualImage>;

const older = {
  splash: { src: img('old-splash'), alt: 'Earlier Playverra splash: lightning bolt and PLAY VERRA on purple', label: 'Splash' },
  home: { src: img('old-home'), alt: 'Earlier Playverra Home: purple gradient, gem balance and a featured game', label: 'Home' },
  play: { src: img('old-game-preview'), alt: 'Earlier Playverra game preview with a Play Now card', label: 'Game preview' },
  rewards: { src: img('old-coupons'), alt: 'Earlier Playverra Coupons: coupons claimed with gems', label: 'Coupons' },
} satisfies Record<string, VisualImage>;

// A zoomed detail cut out of a latest screen. Boxes are given at 1x (440×956)
// and scaled to the @2x export.
const crop = (base: VisualImage, box: [number, number, number, number], label: string, text: string): VisualImage => ({
  ...base,
  crop: box.map((n) => n * 2) as [number, number, number, number],
  size: LATEST,
  label,
  text,
  alt: `${label}: detail from the ${base.label} screen`,
});

export const PLAYVERRA_THUMB = img('still-montage');

// Cover: the three core screens as device mockups
export const PLAYVERRA_COVER: CaseStudyVisual = {
  kind: 'devices',
  items: [screen.discover, screen.home, screen.play],
};

export const PLAYVERRA_VISUALS: Record<string, CaseStudyVisual> = {
  Evolution: {
    kind: 'compare',
    pairs: [
      { before: older.home, after: screen.home, label: 'Home' },
      { before: older.play, after: screen.play, label: 'Play' },
      { before: older.rewards, after: screen.rewards, label: 'Rewards' },
      { before: older.splash, after: screen.splash, label: 'Splash' },
    ],
  },
  'Brand Identity & Logo Redesign': {
    kind: 'logo',
    before: { ...older.splash, crop: [50, 610, 620, 400], size: OLDER, alt: 'Previous Playverra logo: lightning bolt with PLAY VERRA' },
    mark: { src: pvLogo, alt: 'New Playverra logo: P mark with a lime check, and the PLAYVERRA wordmark' },
    lockup: { ...screen.splash, crop: [40, 470, 800, 780], size: LATEST, alt: 'Playverra lockup: mark, wordmark and “Level up your game”' },
    inUse: screen.splash,
  },
  'Design Principles': {
    kind: 'crops',
    items: [
      crop(screen.play, [14, 680, 412, 140], 'Play first', 'Gameplay stays the primary focus. Play Now is always the loudest action.'),
      crop(screen.discover, [14, 142, 426, 48], 'Curated discovery', 'Games surface through contextual collections, not an endless list.'),
      crop(screen.home, [50, 125, 340, 62], 'Reward the habit', 'Streaks and points give players a reason to come back tomorrow.'),
      crop(screen.home, [0, 330, 440, 420], 'Depth & motion', 'Layered carousels make discovery feel interactive.'),
      crop(screen.home, [0, 845, 440, 80], 'One consistent system', 'The same language scales from navigation to the smallest badge.'),
    ],
  },
  'Reimagining Home': {
    kind: 'annotated',
    image: screen.home,
    notes: [
      { title: 'Identity & points', text: 'A greeting and the live points balance, always one glance away.' },
      { title: 'Streak nudge', text: '“You’re on a 7-day streak”, with +50 points for keeping it.' },
      { title: 'Live activity', text: 'Players online and games played today make the platform feel alive.' },
      { title: 'Continue Playing', text: 'A layered carousel that returns players to games already started.' },
      { title: 'Daily Challenge', text: 'A countdown challenge that gives a simple recurring reason to play.' },
    ],
  },
  'Game Discovery': {
    kind: 'annotated',
    image: screen.discover,
    flip: true,
    notes: [
      { title: 'Search', text: 'Type-ahead search is the fastest way to a known game.' },
      { title: 'Category pills', text: 'All, Trending, Multiplayer, Arcade… narrow the catalogue in one tap.' },
      { title: 'Trending Now', text: 'A curated shelf instead of an alphabetical wall.' },
      { title: 'Decision metadata', text: 'Genre, online or offline, session length and rating on every card.' },
    ],
  },
  'Game Reels': {
    kind: 'annotated',
    image: screen.play,
    notes: [
      { title: 'Artwork & trailer', text: 'The game leads, full screen, with a tap-to-play trailer and mute.' },
      { title: 'Game information', text: 'Title, genre and rating, set directly under the artwork.' },
      { title: 'Play Now', text: 'The single dominant action, in the lime gradient.' },
      { title: 'Save · Played · Share', text: 'Secondary actions, grouped and quieter, including social proof.' },
    ],
  },
  'Challenges & Playverra Points': {
    kind: 'flow',
    steps: [
      { title: 'Play', text: 'Any game, any session' },
      { title: 'Complete challenges', text: 'Daily goals and streaks' },
      { title: 'Earn points', text: 'One currency: Playverra Points' },
      { title: 'Redeem rewards', text: 'Gift cards, vouchers, coupons' },
    ],
  },
  Rewards: {
    kind: 'annotated',
    image: screen.rewards,
    flip: true,
    notes: [
      { title: 'Points balance', text: 'The balance sits top right, so every price reads against it.' },
      { title: 'Filters', text: 'All, Vouchers and Coupons keep the list focused.' },
      { title: 'Ticket cards', text: 'Brand, what it’s good for and its cost in points, at a glance.' },
      { title: 'Claim', text: 'One warm action per reward, with the remaining stock underneath.' },
    ],
  },
  Profile: {
    kind: 'annotated',
    image: screen.profile,
    notes: [
      { title: 'Identity', text: 'Name, handle, streak badge and member-since date.' },
      { title: 'Playverra Points', text: 'The balance as the hero, with Redeem Rewards straight underneath.' },
      { title: 'Play stats', text: 'Games played, current streak, favourites and saved games.' },
    ],
  },
  'Visual Language': {
    kind: 'cells',
    items: [
      { title: 'Dark-first', text: 'An almost-black navy, not pure black: immersive, with contrast for colourful art.' },
      { title: 'Vibrant action', text: 'Lime signals interaction: play, continue, claim, redeem, active.' },
      { title: 'Game-first content', text: 'Artwork is the primary asset; the UI is a controlled frame around it.' },
      { title: 'Layered depth', text: 'Overlapping cards show continuity instead of heavy decoration.' },
      { title: 'Reward language', text: 'Yellow, orange, coral and magenta mark value and promotions.' },
      { title: 'Atmosphere, not clutter', text: 'Angular shapes, soft gradients and a low lime glow add depth.' },
      { title: 'Playful motion', text: 'Scale, parallax and subtle press states: responsive, never cinematic.' },
      { title: 'Rounded iconography', text: 'Minimal outline icons that fill or turn lime when active.' },
    ],
  },
  'Design System': {
    kind: 'palette',
    typeface: 'Outfit',
    gradient: ['#7CFF00', '#19C866'],
    swatches: [
      { name: 'Playverra Lime', hex: '#7CFF00', role: 'Primary actions & active states', ink: '#04060C' },
      { name: 'Midnight', hex: '#04060C', role: 'Primary app background', ink: '#FFFFFF' },
      { name: 'Card Surface', hex: '#121826', role: 'Cards, panels and controls', ink: '#FFFFFF' },
      { name: 'Elevated Surface', hex: '#182033', role: 'Active and elevated components', ink: '#FFFFFF' },
    ],
    accents: [
      { name: 'Deep Navy', hex: '#080B12', role: 'Secondary backgrounds', ink: '#FFFFFF' },
      { name: 'Border', hex: '#273247', role: 'Boundaries', ink: '#FFFFFF' },
      { name: 'Muted Blue Grey', hex: '#96A3BA', role: 'Secondary text', ink: '#04060C' },
      { name: 'Green', hex: '#19C866', role: 'Gradient end', ink: '#04060C' },
      { name: 'Yellow', hex: '#FFD400', role: 'Ratings & points', ink: '#04060C' },
      { name: 'Orange', hex: '#FF8A3D', role: 'Reward emphasis', ink: '#04060C' },
      { name: 'Coral Red', hex: '#FF4B4B', role: 'Alerts', ink: '#04060C' },
      { name: 'Magenta', hex: '#FF2E91', role: 'New & promo', ink: '#04060C' },
      { name: 'Purple', hex: '#6D35FF', role: 'Game accents', ink: '#FFFFFF' },
    ],
    hierarchy: [
      { style: 'Display', weight: '700', use: 'Hero moments, large numbers' },
      { style: 'H1', weight: '700', use: 'Screen titles' },
      { style: 'H2', weight: '600–700', use: 'Section headings' },
      { style: 'Card title', weight: '600', use: 'Game & reward titles' },
      { style: 'Body', weight: '400', use: 'Descriptions' },
      { style: 'UI label', weight: '500–600', use: 'Navigation, filters, metadata' },
      { style: 'CTA', weight: '700', use: 'Primary actions' },
    ],
    components: [
      crop(screen.discover, [14, 268, 202, 300], 'Game card', 'Artwork, title and decision metadata.'),
      crop(screen.rewards, [16, 196, 408, 104], 'Reward card', 'Ticket shape with points cost and Claim.'),
      crop(screen.profile, [16, 442, 408, 184], 'Points card', 'Balance with the primary Redeem action.'),
      crop(screen.discover, [14, 142, 426, 48], 'Filter pills', 'Active state in lime, the rest on dark surface.'),
      crop(screen.home, [270, 78, 105, 36], 'Point indicator', 'The balance, wherever you are.'),
      crop(screen.home, [0, 845, 440, 80], 'Navigation', 'Muted when inactive; the current tab turns lime.'),
    ],
  },
  'The Experience': {
    kind: 'devices',
    journey: true,
    items: [screen.splash, screen.home, screen.discover, screen.play, screen.rewards, screen.profile],
  },
};
