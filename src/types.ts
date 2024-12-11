/* Configuration types */

export type SiteConfig = {
  pages: PageConfig[];
};

export type PageConfig = {
  title: string;
  path: string;
  component: string;
};

/* Components */
export type Appointment = {
  _id: string;
  title: string;
  calendarId: string;
  userId: string;
  description?: string;
  date: string;
  dateCreated?: string;
  isConfirmed?: boolean;
  isCancelled?: boolean;
};
