/* Configuration types */

export type SiteConfig = {
  pages: PageConfig[];
};

export type PageConfig = {
  title: string;
  path: string;
  component: string;
};
