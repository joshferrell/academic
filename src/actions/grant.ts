import type { Entry, EntrySkeletonType } from 'contentful';

import fetchEntries from '~/actions/fetch-entry';
import type { Grant, Sidebar } from "~/actions/types";

export const formatGrant = (
  entry: Entry<EntrySkeletonType, undefined, string>
): Grant =>
  ({
    title: entry.fields.title,
    description: entry.fields.descriptionGrantedBy,
    yearAwarded: (entry.fields.year as string).split("-")[0],
    endYear: entry.fields.endYear ? (entry.fields.endYear as string).split('-')[0] : undefined,
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
      "fields.endYear",
      "fields.awardLink",
      "sys.id",
      "fields.project",
    ],
  });

  return entries.map(formatGrant);
};

export const sortGrants = (grantList: Grant[]): { [year: string]: Grant[] } =>
  grantList.reduce<{ [year: string]: Grant[] }>((acc, curr) => {
    const currentYear = acc[curr.yearAwarded];
    if (!currentYear) return Object.assign(acc, { [curr.yearAwarded]: [curr] });
    return Object.assign(acc, {
      [curr.yearAwarded]: currentYear.concat([curr]),
    });
  }, {});

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