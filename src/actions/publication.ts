import type { Entry, EntrySkeletonType } from 'contentful';
import { notFound } from 'next/navigation';

// @ts-ignore no types in library
import { Cite } from "@citation-js/core";
import "@citation-js/plugin-bibtex";
import "@citation-js/plugin-csl";

import fetchEntries from '~/actions/fetch-entry';
import { formatTags } from '~/actions/tags';
import { formatProject } from '~/actions/project';
import type { Publication } from "~/actions/types";

const formatPublication = (
  entry: Entry<EntrySkeletonType, undefined, string>
): Publication => {
  const regexPattern = (entry.fields.title as string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape special characters
  const bibtex = entry.fields.bibtex as string;
  const citation = bibtex.split("\n").join("");
  const cite = new Cite(citation, { forceType: "@bibtex/text" })
    .format("bibliography", {
      format: "html",
      template: "apa",
      lang: "en-US",
    })
    .replace(
      new RegExp(regexPattern, 'gi'),
      `<a href="/publications/${entry.sys.id}">${entry.fields.title}</a>`
    );
  return {
    citationHTML: cite,
    title: entry.fields.title as string,
    id: entry.sys.id,
    abstract: entry.fields.abstract,
    link: entry.fields.linkToPublication,

    status: entry.fields.status,
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