import type { Entry, EntrySkeletonType } from 'contentful';
import { notFound } from 'next/navigation';

import fetchEntries from '~/actions/fetch-entry';
import { formatProject } from '~/actions/project';
import { formatTags } from '~/actions/tags';
import type { Post } from "~/actions/types";

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

export const formatPost = (x: Entry<EntrySkeletonType, undefined, string>): Post =>
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