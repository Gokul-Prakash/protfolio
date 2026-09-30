import { images } from '@assets/assets';

// Tools shown in the Toolbox section. `size` scales the bubble relative to the
// base radius so the pile reads as organic rather than a uniform grid.
// `themed` marks monochrome logos that follow the theme via --logo-filter.
export type Tool = {
  name: string;
  size: number;
  logo: string;
  themed?: boolean;
};

const logos = images.toolbox;

export const TOOLS: Tool[] = [
  { name: 'Figma', size: 1.25, logo: logos.figma },
  { name: 'Photoshop', size: 1.1, logo: logos.photoshop },
  { name: 'Illustrator', size: 1, logo: logos.illustrator },
  { name: 'Animate', size: 0.85, logo: logos.animate },
  { name: 'After Effects', size: 1.05, logo: logos.afterEffects },
  { name: 'Blender', size: 1.15, logo: logos.blender },
  { name: 'Maya', size: 0.9, logo: logos.maya },
  { name: 'Lottie', size: 0.85, logo: logos.lottie },
  { name: 'HTML', size: 0.95, logo: logos.html },
  { name: 'CSS', size: 0.95, logo: logos.css },
  { name: 'ChatGPT', size: 1.1, logo: logos.chatGPT, themed: true },
  { name: 'Adobe Firefly', size: 0.9, logo: logos.firefly },
];
