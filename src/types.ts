export interface Project {
  title: string;
  location: string;
  cat: string;
  context?: string;
  task?: string;
  solution?: string;
  material?: string;
  ecology?: string;
  economy?: string;
  special?: string;
}

export interface NavItem {
  label: string;
  id: string;
}
