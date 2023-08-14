
import type { Entry, EntrySkeletonType } from "contentful";

import type { Feedback } from '~/actions/types';

export const formatFeedback = (x: Entry<EntrySkeletonType, undefined, string>): Feedback => ({
    id: x.sys.id,
    title: x.fields.title,
    subtitle: x.fields.subtitle,
    feedback: x.fields.feedback,
    highlight: x.fields.highlight,
    photo: x.fields.image
      ? {
          src: `https:${(x.fields.image as any).fields.file.url}`,
          alt: (x.fields.image as any).fields.description,
        }
      : undefined,
    feature: Boolean(x.fields.feature)
} as Feedback);