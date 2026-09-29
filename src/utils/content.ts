import { images } from '@assets/assets';

// ── Single source for portfolio copy & links ────────────────────────────────

export const EMAIL = 'hello@gokul.design';
export const RESUME_URL = '/resume.pdf'; // drop the file in /public

export const NAV_LINKS = [
  { label: 'Work', path: '/#work' },
  { label: 'Playground', path: '/playground' },
  { label: 'Contact', path: '/contact' },
];

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'Dribbble', href: '#' },
];

export const SKILLS = [
  {
    title: 'UX / Product',
    items: ['Flows', 'Interfaces', 'Dashboards', 'Web / Apps', 'Prototypes'],
  },
  {
    title: 'Visual Design',
    items: ['Branding', 'Campaigns', 'Typography', 'Art Direction'],
  },
  {
    title: 'Interaction',
    items: ['Motion', 'Micro-interactions', 'Gamification'],
  },
  {
    title: 'Digital Experiences',
    items: ['Microsites', 'Interactive Campaigns', 'Loyalty Experiences'],
  },
  {
    title: 'AI',
    items: ['AI-assisted Exploration', 'Rapid Prototyping', 'Experimental Interfaces'],
  },
];

export const SELECTED_WORK = [
  { id: 1, title: 'Coca-Cola Foodmarks', tags: ['Web', 'Campaign'], img: images.myWork.cocaCola },
  { id: 2, title: 'IPL Interactive Game', tags: ['Game', 'Interaction'], img: images.myWork.ipl },
  { id: 3, title: 'Classmate Digital Catalogue', tags: ['Design', 'Branding'], img: images.myWork.classmate },
  { id: 4, title: 'NextEd', tags: ['EdTech', 'Product'], img: images.myWork.nextEd },
];

// Recent projects list (hover accordion under the hero).
// Optional fields only render when set.
// TODO: role / timeline / year / team / href below are PLACEHOLDERS — replace with real details.
// href: '#' shows the "Jump to project" button without navigating anywhere.
export type RecentProject = {
  img: string;
  label: string;
  role?: string;
  timeline?: string;
  year?: string;
  team?: string;
  href?: string;
};

export const CAROUSEL_WORK: RecentProject[] = [
  { img: images.workCarousel.zentra, label: 'Zentra', role: 'Product · UX · UI', timeline: '6 Months', year: '2025', team: 'In-House', href: '#' },
  { img: images.workCarousel.magicClub, label: 'Magic Club', role: 'Product · Gamification', timeline: '4 Months', year: '2025', team: 'Agency', href: '#' },
  { img: images.workCarousel.octech, label: 'Octech', role: 'Brand · Web · Motion', timeline: '3 Months', year: '2024', team: 'In-House', href: '#' },
  { img: images.workCarousel.analyticsGenie, label: 'Analytics Genie', role: 'Product · Web · AI', timeline: '5 Months', year: '2024', team: 'Startup', href: '#' },
  { img: images.workCarousel.coreArea, label: 'Core Area', role: 'Product · Dashboards', timeline: '4 Months', year: '2024', team: 'Client', href: '#' },
  { img: images.workCarousel.deMuis, label: 'De Muis', role: 'App · UX · UI', timeline: '2 Months', year: '2023', team: 'Freelance', href: '#' },
];

export const FAN_IMAGES = [
  images.thingsIHelpBuild.image1,
  images.thingsIHelpBuild.image2,
  images.thingsIHelpBuild.image3,
  images.thingsIHelpBuild.image4,
  images.thingsIHelpBuild.image5,
  images.thingsIHelpBuild.image6,
  images.thingsIHelpBuild.image7,
  images.thingsIHelpBuild.image8,
];
