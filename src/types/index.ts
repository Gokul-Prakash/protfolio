export interface NavItem {
  label: string;
  path: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  repo?: string;
  image?: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon?: string;
}

export type Theme = 'light' | 'dark';
