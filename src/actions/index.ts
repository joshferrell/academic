import {
  createClient,
  EntrySkeletonType,
  type EntryFieldTypes,
  Entry,
} from "contentful";
import { notFound } from "next/navigation";

// @ts-ignore
import { Cite } from "@citation-js/core";
import "@citation-js/plugin-bibtex";
import "@citation-js/plugin-csl";

type Tag = {
  id: string;
  description?: string;
  title: string;
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
  underReview: boolean;
  tags: Tag[];
  projectList?: Project[];
  link?: string;
  publication: string;
  date?: string;
  authors: string[];
  publicationType: string;
};

export type Grant = {
  id: string;
  title: string;
  description: string;
  yearAwarded: string;
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

type Education = {
  title: string;
  university: string;
};

type Student = {
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

const fetchEntries = async (
  contentType: ContentType,
  options?: {
    featuredOnly?: boolean;
    limit?: number;
    orderBy?: string;
    select?: string[];
    singleId?: string;
    filter?: { [key: string]: string | boolean };
  }
) => {
  let entryOptions: any = {};
  if (options?.featuredOnly) entryOptions["fields.feature"] = true;
  if (options?.orderBy) entryOptions["order"] = options.orderBy;
  if (options?.limit) entryOptions["limit"] = options.limit;
  if (options?.select) entryOptions["select"] = options.select;
  if (options?.singleId) entryOptions["sys.id"] = options.singleId;
  if (options?.filter)
    entryOptions = Object.assign(entryOptions, options.filter);

  const client = createClient({
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN!,
    space: process.env.CONTENTFUL_SPACE_ID!,
  });

  const entries = await client.getEntries({
    content_type: contentType,
    ...entryOptions,
  });

  return entries.items;
};

const formatTags = (tagList: any): Tag[] => {
  if (!tagList) return [];
  return tagList
    .filter((x: any) => Boolean(x.fields))
    .map((x: any) => ({
      title: x.fields.title,
      id: x.sys.id,
    }));
};

const formatPublication = (
  entry: Entry<EntrySkeletonType, undefined, string>
): Publication => {
  const bibtex = entry.fields.bibtex as string;
  const citation = bibtex.split("\n").join("");
  const cite = new Cite(citation, { forceType: "@bibtex/text" })
    .format("bibliography", {
      format: "html",
      template: "apa",
      lang: "en-US",
    })
    .replace(
      entry.fields.title,
      `<a href="/publications/${entry.sys.id}">${entry.fields.title}</a>`
    );
  return {
    citationHTML: cite,
    title: entry.fields.title as string,
    id: entry.sys.id,
    abstract: entry.fields.abstract,
    link: entry.fields.linkToPublication,
    underReview: entry.fields.underReview,
    date: entry.fields.date
      ? new Date(entry.fields.date as string).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })
      : undefined,
    publicationType: entry.fields.publicationType,
    tags: formatTags(entry.fields.tags),
    publication: entry.fields.publication,
    authors: entry.fields.author,
  } as Publication;
};

export const fetchPublicationList = async (
  featuredOnly = false
): Promise<{
  [category: string]: Publication[];
}> => {
  const entries = await fetchEntries("publication", {
    featuredOnly,
    orderBy: "-fields.date",
    select: [
      "fields.publicationType",
      "fields.bibtex",
      "fields.title",
      "sys.id",
    ],
  });

  if (!entries) return {};

  return sortPublications(entries);
};

export const fetchPostList = async (limit = 5): Promise<Post[]> => {
  const entries = await fetchEntries("post", {
    orderBy: "-sys.updatedAt",
    limit,
    select: [
      "sys.id",
      "sys.updatedAt",
      "fields.title",
      "fields.description",
      "fields.tags",
      "fields.featuredImage",
    ],
  });
  if (!entries.length) return [];

  return entries.map(formatPost);
};

export const fetchPost = async (singleId: string): Promise<Post> => {
  const entries = await fetchEntries("post", { singleId, limit: 1 });

  if (!entries.length) notFound();

  const post = formatPost(entries[0]);
  let projectList = [];
  if (entries[0].fields.relatedProjects)
    projectList = (entries[0].fields.relatedProjects as any).map(formatProject);

  return Object.assign(post, { projectList });
};

export const fetchPublication = async (
  singleId: string
): Promise<Publication> => {
  const entries = await fetchEntries("publication", { singleId, limit: 1 });

  if (!entries.length) notFound();

  const publication = formatPublication(entries[0]);

  let projectList = [];
  if (entries[0].fields.projects)
    projectList = (entries[0].fields.projects as any).map(formatProject);

  return Object.assign(publication, { projectList });
};

const formatGrant = (
  entry: Entry<EntrySkeletonType, undefined, string>
): Grant =>
  ({
    title: entry.fields.title,
    description: entry.fields.descriptionGrantedBy,
    yearAwarded: (entry.fields.year as string).split("-")[0],
    awardLink: entry.fields.awardLink,
    id: entry.sys.id,
    project: entry.fields.project
      ? {
          title: (entry.fields.project as any).fields.title,
          id: (entry.fields.project as any).sys.id,
        }
      : undefined,
  } as Grant);

export const fetchGrantList = async (limit = 5): Promise<Grant[]> => {
  const entries = await fetchEntries("grants-and-awards", {
    orderBy: "-fields.year",
    limit,
    select: [
      "fields.title",
      "fields.descriptionGrantedBy",
      "fields.year",
      "fields.awardLink",
      "sys.id",
      "fields.project",
    ],
  });

  return entries.map(formatGrant);
};

const formatProject = (
  entry: Entry<EntrySkeletonType, undefined, string>
): Project =>
  ({
    id: entry.sys.id,
    name: entry.fields.title,
    summary: entry.fields.summary,
    tags: formatTags(entry.fields.tags),
    abstract: entry.fields.abstract,
    isPromoted: entry.fields.promote,
    primaryCollaborators: formatCollaboratorList(
      entry.fields.primaryCollaborators
    ),
    pastAssistants: formatCollaboratorList(entry.fields.pastAssitants),
    activeAssistants: formatCollaboratorList(entry.fields.activeAssistants),
    img: entry.fields.featuredImage
      ? {
          src: `https:${(entry.fields.featuredImage as any).fields.file.url}`,
          alt: (entry.fields.featuredImage as any).fields.description,
        }
      : undefined,
  } as Project);

export const fetchProject = async (id: string): Promise<Project> => {
  const entries = await fetchEntries("project", {
    singleId: id,
  });

  if (!entries.length) notFound();

  const [grantList, presentationList, publicationList, postList] =
    await Promise.all([
      fetchEntries("grants-and-awards", {
        filter: { "fields.project.sys.id": id },
        orderBy: "-fields.year",
      }).then((x) => {
        const grantList = x.map(formatGrant);
        return sortGrants(grantList);
      }),
      fetchEntries("event", {
        filter: { "fields.projects.sys.id": id },
        orderBy: "-fields.date",
      }).then((x) => x.map(formatPresentation)),
      fetchEntries("publication", {
        filter: { "fields.projects.sys.id": id },
      }).then((x) => sortPublications(x)),
      fetchEntries("post", {
        filter: { "fields.relatedProjects.sys.id": id },
      }).then((x) => x.map(formatPost)),
    ]);

  const project = formatProject(entries[0]);
  return Object.assign(project, {
    grantList,
    presentationList,
    publicationList,
    postList,
  });
};

type TagPage = Tag & {
  projectList: Project[];
  eventList: Presentation[];
  publicationList?: { [category: string]: Publication[] };
  postList: Post[];
};

export const fetchTag = async (id: string): Promise<TagPage> => {
  const entries = await fetchEntries("tags", {
    singleId: id,
  });

  if (!entries.length) notFound();
  const entry = entries[0];

  const [projectList, eventList, publicationList, postList] = await Promise.all(
    [
      fetchEntries("project", {
        filter: { "fields.tags.sys.id": id },
      }).then((x) => x.map(formatProject)),
      fetchEntries("event", {
        filter: { "fields.tags.sys.id": id },
        orderBy: "-fields.date",
      }).then((x) => x.map(formatPresentation)),
      fetchEntries("publication", {
        filter: { "fields.tags.sys.id": id },
      }).then((x) => sortPublications(x)),
      fetchEntries("post", {
        filter: { "fields.tags.sys.id": id },
      }).then((x) => x.map(formatPost)),
    ]
  );

  return {
    id: entry.sys.id,
    title: entry.fields.title as string,
    description: entry.fields.description as string,
    projectList,
    postList,
    publicationList,
    eventList,
  };
};

export const fetchFeaturedProject = async (): Promise<Project | undefined> => {
  const entries = await fetchEntries("project", {
    select: [
      "sys.id",
      "fields.title",
      "fields.featuredImage",
      "fields.summary",
      "fields.tags",
    ],
    filter: { "fields.promote": true },
  });

  if (!entries.length) return undefined;

  return formatProject(entries[0]);
};

export const fetchProjectList = async (
  featuredOnly = false
): Promise<Project[]> => {
  const entries = await fetchEntries("project", {
    featuredOnly,
    filter: {
      "fields.promote": false,
    },
    select: [
      "sys.id",
      "fields.title",
      "fields.summary",
      "fields.tags",
      "fields.featuredImage",
    ],
  });

  return entries.map(formatProject) as Project[];
};

const formatCollaborator = (
  x: Entry<EntrySkeletonType, undefined, string>
): Collaborator =>
  ({
    name: x.fields.name,
    href: x.fields.profileLink,
    description: x.fields.description,
    institution: x.fields.institution,
    profilePhoto: x.fields.profilePhoto
      ? `https:${(x.fields.profilePhoto as any).fields.file.url}`
      : undefined,
  } as Collaborator);

const formatCollaboratorList = (x: any): Collaborator[] => {
  if (!x || !x.length) return [];
  if (!x[0] || !x[0].fields) return [];
  return x.map(formatCollaborator);
};

const formatPost = (x: Entry<EntrySkeletonType, undefined, string>): Post =>
  ({
    id: x.sys.id,
    title: x.fields.title as string,
    description: x.fields.description as string,
    tags: formatTags(x.fields.tags),
    img: x.fields.featuredImage
      ? {
          src: `https:${(x.fields.featuredImage as any).fields.file.url}`,
          alt: (x.fields.featuredImage as any).fields.description,
        }
      : undefined,
    content: x.fields.postContent,
  } as Post);

const formatPresentation = (
  x: Entry<EntrySkeletonType, undefined, string>
): Presentation =>
  ({
    id: x.sys.id,
    title: x.fields.title as string,
    location: x.fields.location,
    briefSummary: x.fields.summary,
    presenters: x.fields.presenters,
    date: new Date(x.fields.date as string).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: new Date(x.fields.date as string).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    }),
    timeISO: x.fields.date,
    description: x.fields.description,
    recording: x.fields.recording,
    tags: formatTags(x.fields.tags),
    event: {
      title: x.fields.eventName,
      url: x.fields.eventUrl,
    },
    img: x.fields.image
      ? {
          src: `https:${(x.fields.image as any).fields.file.url}`,
          alt: (x.fields.image as any).fields.description,
        }
      : undefined,
  } as Presentation);

export const fetchPresentationList = async (
  limit = 5
): Promise<Presentation[]> => {
  const entries = await fetchEntries("event", {
    orderBy: "-fields.date",
    limit,
    select: [
      "sys.id",
      "fields.title",
      "fields.summary",
      "fields.date",
      "fields.description",
      "fields.tags",
      "fields.eventName",
      "fields.image",
      "fields.eventUrl",
    ],
  });

  return entries.map(formatPresentation);
};

export const fetchPresentation = async (
  singleId: string
): Promise<Presentation> => {
  const entry = await fetchEntries("event", { limit: 1, singleId });

  if (!entry.length) notFound();

  const presentation = formatPresentation(entry[0]);
  let projectList = [];

  if (entry[0].fields.projects)
    projectList = (entry[0].fields.projects as any).map(formatProject);

  return Object.assign(presentation, { projectList });
};

export const fetchSidebar = async (): Promise<Sidebar | null> => {
  const entries = await fetchEntries("focusContent", { limit: 1 });
  if (!entries.length) return null;

  const [sidebar] = entries;
  const hasButton = sidebar.fields.buttonText && sidebar.fields.buttonLink;

  return {
    title: sidebar.fields.title,
    content: sidebar.fields.content,
    link: hasButton
      ? {
          text: sidebar.fields.buttonText,
          href: sidebar.fields.buttonLink,
        }
      : undefined,
  } as any;
};

export const fetchStudent = async (): Promise<Student> => {
  const [student] = await fetchEntries("student", { limit: 1 });

  return {
    name: student.fields.name,
    role: student.fields.role,
    email: student.fields.email,
    interests: student.fields.interests,

    // @ts-ignore typing here with contentful is strange with assets
    profilePhoto: `https:${student.fields.profilePhoto.fields.file.url}`,
    // @ts-ignore typing here with contentful is strange with assets
    cv: student.fields.cv
      ? `https://${(student.fields.cv as any).fields.file.url}`
      : undefined,
    social: student.fields.social,
    education: student.fields.education
      ? (student.fields.education as any).map((x: any) => ({
          title: x.fields.title,
          university: x.fields.university,
        }))
      : [],
    bio: student.fields.bio,
    summary: student.fields.summary,
    briefBio: student.fields.briefBio,
  } as Student;
};

export const fetchTeaching = async (): Promise<Teaching> => {
  const [experience] = await fetchEntries("teaching", { limit: 1 });

  return {
    title: experience.fields.title,
    content: experience.fields.content,
    mentees: formatCollaboratorList(experience.fields.mentorship),
  } as Teaching;
};

export const sortGrants = (grantList: Grant[]): { [year: string]: Grant[] } =>
  grantList.reduce<{ [year: string]: Grant[] }>((acc, curr) => {
    const currentYear = acc[curr.yearAwarded];
    if (!currentYear) return Object.assign(acc, { [curr.yearAwarded]: [curr] });
    return Object.assign(acc, {
      [curr.yearAwarded]: currentYear.concat([curr]),
    });
  }, {});

export const sortPublications = (
  entries: Entry<EntrySkeletonType, undefined, string>[]
): { [category: string]: Publication[] } =>
  entries.reduce<{ [category: string]: Publication[] }>((acc, curr) => {
    const category = curr.fields.publicationType as string;
    const publication = formatPublication(curr);
    if (!acc[category]) {
      return Object.assign(acc, { [category]: [publication] });
    } else {
      return Object.assign(acc, {
        [category]: acc[category].concat([publication]),
      });
    }
  }, {} as { [category: string]: Publication[] });
