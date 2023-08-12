import type {
  EntrySkeletonType,
  Entry
} from "contentful";
import { notFound } from "next/navigation";

import fetchEntries from '~/actions/fetch-entry';
import { formatProject } from "~/actions/project";
import { formatTags } from "~/actions/tags";
import type { Presentation} from '~/actions/types';

export const formatPresentation = (
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






