export interface Project {
  title: string;
  location: string;
  cat: string;
  context: string;
  task?: string;
  solution?: string;
  material?: string;
  ecology?: string;
  economy?: string;
  special?: string;
}

export interface ContentSection {
  title: string;
  text: string;
}

export interface AkpData {
  hero: {
    title: string;
    claim: string;
    description: string;
    meta: string[];
  };
  philosophy: ContentSection[];
  leistungen: string[];
  projects: Project[];
  kompetenzen: ContentSection[];
}
