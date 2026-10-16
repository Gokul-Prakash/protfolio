// Playground experiments, laid out as a bento grid — animations are animated WebP (converted from the
// original GIFs, alpha kept), stills are WebP
const media = import.meta.glob('../assets/images/Playground/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const img = (name: string) => {
  const src = media[`../assets/images/Playground/${name}.webp`];
  if (!src) throw new Error(`Missing playground image: ${name}`);
  return src;
};

export type PlaygroundMedia = {
  src: string;
  alt: string;
  label?: string;
  /** In a cycling tile: how long this one stays on screen, in ms */
  hold?: number;
};

export type PlaygroundTile = {
  title: string;
  tags: string;
  /** Desktop bento span on the 12-col grid: [columns, rows]. Tiles are listed
   *  in placement order; the spans are sized so the grid closes without gaps. */
  span: [number, number];
  /** Tablet (2-col): take both columns */
  wide?: boolean;
  /** Stage aspect ratio once the bento stacks (tablet & phone), e.g. '16 / 9' */
  ratio: string;
  /** cover fills the stage (renders, photos); contain keeps the whole frame (cut-outs) */
  fit?: 'cover' | 'contain';
  /** Media carries its own black background: stage turns black to match */
  dark?: boolean;
  /** Media take turns on one stage (crossfade) instead of sitting side by side */
  cycle?: boolean;
  /** Several media play side by side (or in turn, with `cycle`), each with its label */
  media: PlaygroundMedia[];
};

// Desktop layout (12 cols):
//   rows 1–4    Environments 6×4             · Dhoomketu 3×4         · Jaggu 3×4
//   rows 5–7    Aliens 4×3     · Run loop 2×6 · Game 3×3              · New task 3×3
//   rows 8–10   Zombie 4×3     ·   ↑          · Search 3×3            · Pencil sketch 3×3
export const PLAYGROUND: PlaygroundTile[] = [
  {
    title: 'Environments',
    tags: '3D / Environment',
    span: [6, 4],
    wide: true,
    ratio: '16 / 9',
    fit: 'cover',
    cycle: true,
    media: [
      { src: img('env-forest'), alt: 'Stylised 3D forest path with tall trees and rocks', label: 'Forest', hold: 3500 },
      { src: img('env-desert'), alt: 'Stylised 3D desert trail with dry trees and stones', label: 'Desert', hold: 3500 },
    ],
  },
  {
    title: 'Dhoomketu',
    tags: '2D / Animation',
    span: [3, 4],
    ratio: '3 / 4',
    dark: true,
    media: [{ src: img('dhoomketu'), alt: 'Dhoomketu 2D animation: a boy cycling away' }],
  },
  {
    title: 'Jaggu',
    tags: '2D / Character / Animation cycles',
    span: [3, 4],
    ratio: '3 / 4',
    cycle: true,
    // Holds are whole loops of each cycle: idle 2.4s ×1, jump 1.2s ×2, run 0.8s ×3
    media: [
      { src: img('jaggu-idle'), alt: 'Jaggu the monkey, idle animation', label: 'Idle', hold: 2400 },
      { src: img('jaggu-jump'), alt: 'Jaggu the monkey, jump animation', label: 'Jump', hold: 2400 },
      { src: img('jaggu-run'), alt: 'Jaggu the monkey, run cycle', label: 'Run', hold: 2400 },
    ],
  },
  {
    title: 'Aliens',
    tags: 'Motion / Title design',
    span: [4, 3],
    wide: true,
    ratio: '16 / 9',
    fit: 'cover',
    media: [{ src: img('aliens-title'), alt: 'ALIENS title animation in red on deep navy' }],
  },
  {
    title: 'Run loop',
    tags: 'AI / Motion',
    span: [2, 6],
    ratio: '3 / 4',
    media: [{ src: img('spiderman-run'), alt: 'AI-generated Spider-Man run loop' }],
  },
  {
    title: 'Game',
    tags: 'Motion / Title design',
    span: [3, 3],
    wide: true,
    ratio: '16 / 9',
    media: [{ src: img('game-title'), alt: 'GAME title animation in glossy gold' }],
  },
  {
    title: 'New task',
    tags: 'UI / Micro-interaction',
    span: [3, 3],
    ratio: '3 / 4',
    media: [{ src: img('new-task'), alt: 'A New button expanding into a task interaction' }],
  },
  {
    title: 'Zombie',
    tags: 'SFX makeup / VFX',
    span: [4, 3],
    ratio: '8 / 9',
    fit: 'cover',
    media: [{ src: img('sfx-makeup'), alt: 'Zombie SFX makeup on a green screen' }],
  },
  {
    title: 'Search',
    tags: 'UI / Micro-interaction',
    span: [3, 3],
    wide: true,
    ratio: '16 / 9',
    media: [{ src: img('search-ui'), alt: 'A search field animating open with a toggle' }],
  },
  {
    title: 'Pencil sketch',
    tags: 'Illustration',
    span: [3, 3],
    ratio: '8 / 9',
    fit: 'cover',
    media: [{ src: img('pencil-sketch'), alt: 'Pencil line sketch of a man seated at a table' }],
  },
];
