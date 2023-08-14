
import type { Entry, EntrySkeletonType } from "contentful";

import type { Course } from '~/actions/types';
import { formatTags } from "./tags";
import fetchEntries from "./fetch-entry";
import { notFound } from "next/navigation";
import { formatFeedback } from "./feedback";

export const formatCourse = (x: Entry<EntrySkeletonType, undefined, string>): Course => ({
    id: x.sys.id,
    title: x.fields.title,
    classNumber: x.fields.classNumber,
    role: x.fields.role,
    time: x.fields.time,
    summary: x.fields.summary,
    feedback: x.fields.feedback ? (x.fields.feedback as any).map(formatFeedback) : undefined,
    location: x.fields.location,
    size: x.fields.classSize,
    courseTag: x.fields.courseTag,
    description: x.fields.description || undefined,
    syllabus: x.fields.syllabus ? `https://${(x.fields.syllabus as any).fields.file.url}` : undefined,
    tags: formatTags(x.fields.tags),
    planned: x.fields.planned
} as Course)

export const fetchCourse = async (singleId: string): Promise<Course> => {
    const entry = await fetchEntries('class', { limit: 1, singleId });

    if (!entry.length) notFound();

    return formatCourse(entry[0]);
}

export const fetchCourseList = async (
    limit = 5,
    onlyFeatured = false
): Promise<Course[]> => {
    const filter = onlyFeatured ? { 'fields.feature': true } : undefined;

    const entries = await fetchEntries('class', {
        select: [
            'sys.id',
            'fields.title',
            'fields.summary',
            'fields.feature',
            'fields.courseTag',
        ],
        orderBy: '-fields.startDate',
        limit,
        filter
    });

    return entries.map(formatCourse);
}