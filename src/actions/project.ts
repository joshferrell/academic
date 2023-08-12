import type { Entry, EntrySkeletonType } from "contentful";
import { notFound } from "next/navigation";

import fetchEntries from '~/actions/fetch-entry';
import { formatTags } from "~/actions/tags";
import { formatCollaboratorList } from "~/actions/collaborator";
import { formatPost } from '~/actions/post';
import { formatPresentation } from '~/actions/presentation';
import { sortGrants, formatGrant } from '~/actions/grant';
import { sortPublications } from '~/actions/publication';
import type { Project } from "~/actions/types";

export const formatProject = (
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
          alt: (entry.fields.featuredImage as any).fields.title,
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
    orderBy: "-fields.projectStartDate",
    filter: {
      "fields.promote": false,
    },
    select: [
      "sys.id",
      "fields.title",
      "fields.summary",
      "fields.tags",
      "fields.featuredImage",
      "fields.projectStartDate",
    ],
  });

  return entries.map(formatProject) as Project[];
};