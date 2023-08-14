import type { Entry, EntrySkeletonType } from 'contentful';

import fetchEntries from '~/actions/fetch-entry';
import { formatCollaboratorList } from '~/actions/collaborator';
import { Teaching } from '~/actions/types';
import { notFound, redirect } from 'next/navigation';

const formatTeaching = (entry: Entry<EntrySkeletonType, undefined, string>): Teaching => ({
  id: entry.sys.id,
  title: entry.fields.title,
  icon: entry.fields.icon,
  description: entry.fields.description,
  order: entry.fields.order,
  mentees: formatCollaboratorList(entry.fields.mentorship),
  content: entry.fields.content
} as Teaching);

export const fetchTeachingList = async (): Promise<Teaching[]> => {
  const entries = await fetchEntries('teaching', {
    select: [
      'sys.id',
      'fields.title',
      'fields.order',
      'fields.description',
      'fields.icon'
    ],
    orderBy: 'fields.order'
  })
  
  return entries.map(formatTeaching);
};

export const fetchTeaching = async (singleId: string): Promise<Teaching> => {
  const entryList = await fetchEntries('teaching', { singleId, limit: 1 });

  if (!entryList.length) notFound();

  return formatTeaching(entryList[0]);
}

export const fetchFirstTeaching = async (): Promise<string> => {
  const entries = await fetchEntries('teaching', {
    limit: 1,
    select: [
      'sys.id',
      'fields.order'
    ],
    orderBy: '-fields.order'
  });

  if (!entries.length) notFound();
  redirect(`/teaching/${entries[0].sys.id}`);
}