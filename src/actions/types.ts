import { type EntryFieldTypes } from 'contentful';

export type Tag = {
  id: string;
  description?: string;
  title: string;
};

export type TagPage = Tag & {
  projectList: Project[];
  eventList: Presentation[];
  publicationList?: { [category: string]: Publication[] };
  postList: Post[];
};

export type SocialIcon = "Linkedin" | "Mail" | "Calendar";

export type Collaborator = {
  name: string;
  href: string;
  institution: string;
  profilePhoto: string;
  description: string;
};

export type Publication = {
  id: string;
  title: string;
  citationHTML: string;
  abstract?: EntryFieldTypes.RichText;
  status: string;
  tags: Tag[];
  projectList?: Project[];
  link?: string;
  publication?: string;
  date?: string;
  authors: string[];
  publicationType: string;
};

export type Grant = {
  id: string;
  title: string;
  description: string;
  yearAwarded: string;
  endYear?: string;
  awardLink?: string;
  project?: { title: string; id: string };
};

export type Project = {
  id: string;
  name: string;
  tags: Tag[];
  img: { src: string; alt: string };
  summary: string;
  isPromoted: boolean;
  abstract?: EntryFieldTypes.RichText;
  grantList?: { [year: string]: Grant[] };
  presentationList?: Presentation[];
  publicationList?: { [category: string]: Publication[] };
  postList: Post[];
  activeAssistants: Collaborator[];
  pastAssistants: Collaborator[];
  primaryCollaborators: Collaborator[];
};

export type Post = {
  id: string;
  title: string;
  date: string;
  description: string;
  img?: { src: string; alt: string };
  content: EntryFieldTypes.RichText;
  tags: Tag[];
  projectList?: Project[];
};

export type Presentation = {
  id: string;
  title: string;
  presenters: string[];
  location: string;
  timeISO: string;
  briefSummary: string;
  date: string;
  time: string;
  img?: { src: string; alt: string };
  description: EntryFieldTypes.RichText;
  recording?: string;
  projectList?: Project[];
  tags: Tag[];
  event: {
    title: string;
    url?: string;
  };
};

export type Sidebar = {
  title: string;
  content: EntryFieldTypes.RichText;
  link?: {
    href: string;
    text: string;
  };
};

export type Education = {
  title: string;
  university: string;
};

export type Student = {
  name: string;
  role: string;
  email: string;
  profilePhoto: string;
  interests?: string[];
  education?: Education[];
  social: {
    icon: SocialIcon;
    link: string;
    title: string;
    description: string;
  }[];
  bio: EntryFieldTypes.RichText;
  cv?: string;
  briefBio: string;
  summary: string;
};

export type Teaching = {
  title: string;
  content: EntryFieldTypes.RichText;
  mentees: Collaborator[];
};

export type ContentType =
  | "project"
  | "student"
  | "focusContent"
  | "teaching"
  | "tags"
  | "publication"
  | "grants-and-awards"
  | "post"
  | "event";