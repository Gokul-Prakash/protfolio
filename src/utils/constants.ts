import type { NavItem, Project } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Project One',
    description: 'A sample project showcasing React and TypeScript.',
    tags: ['React', 'TypeScript', 'Framer Motion'],
  },
  {
    id: '2',
    title: 'Project Two',
    description: 'Another project with modern web technologies.',
    tags: ['React', 'SCSS', 'Vite'],
  },
];
