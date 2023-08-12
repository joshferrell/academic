import type { Entry, EntrySkeletonType } from "contentful";

import type { Collaborator } from "~/actions/types";

export const formatCollaborator = (
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

export const formatCollaboratorList = (x: any): Collaborator[] => {
  if (!x || !x.length) return [];
  if (!x[0] || !x[0].fields) return [];
  return x.map(formatCollaborator);
};