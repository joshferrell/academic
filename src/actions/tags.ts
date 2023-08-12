import { notFound } from 'next/navigation';

import fetchEntries from '~/actions/fetch-entry';
import { formatProject } from '~/actions/project';
import { formatPresentation } from '~/actions/presentation';
import { formatPost } from '~/actions/post';
import { sortPublications } from '~/actions/publication';
import type { Tag, TagPage } from '~/actions/types';

export const formatTags = (tagList: any): Tag[] => {
  if (!tagList) return [];
  return tagList
    .filter((x: any) => Boolean(x.fields))
    .map((x: any) => ({
      title: x.fields.title,
      id: x.sys.id,
    }));
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