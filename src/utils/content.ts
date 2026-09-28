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
    title: 'UX & Product',
    blurb: 'End-to-end product design, from first flow to shipped interface.',
    items: ['Product Design', 'User Flows', 'Prototyping', 'Web & Apps'],
  },
  {
    title: 'Interaction',
    blurb: 'Motion and micro-interactions that make interfaces feel alive.',
    items: ['Motion', 'Micro-interactions', 'UI Systems'],
  },
  {
    title: 'Experience + AI',
    blurb: 'Using AI to explore faster and prototype experimental interfaces.',
    items: ['AI-assisted Design', 'Rapid Exploration', 'Experimental Interfaces'],
  },
];

export const SELECTED_WORK = [
  { id: 1, title: 'Coca-Cola Foodmarks', tags: ['Web', 'Campaign'], img: images.myWork.cocaCola },
  { id: 2, title: 'IPL Interactive Game', tags: ['Game', 'Interaction'], img: images.myWork.ipl },
  { id: 3, title: 'Classmate Digital Catalogue', tags: ['Design', 'Branding'], img: images.myWork.classmate },
  { id: 4, title: 'NextEd', tags: ['EdTech', 'Product'], img: images.myWork.nextEd },
];

export const CAROUSEL_WORK = [
  { img: images.workCarousel.zentra, label: 'Zentra' },
  { img: images.workCarousel.magicClub, label: 'Magic Club' },
  { img: images.workCarousel.octech, label: 'Octech' },
  { img: images.workCarousel.analyticsGenie, label: 'Analytics Genie' },
  { img: images.workCarousel.coreArea, label: 'Core Area' },
  { img: images.workCarousel.deMuis, label: 'De Muis' },
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
