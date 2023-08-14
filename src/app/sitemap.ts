import { MetadataRoute } from 'next';
import fetchEntries from '~/actions/fetch-entry';
import { ContentType } from '~/actions/types';

type DynamicContent = {
    path: string;
    type: ContentType;
    hasListing: boolean;
}

const dynamicContent: DynamicContent[] = [
    { path: 'projects', type: 'project', hasListing: true },
    { path: 'events', type: 'event', hasListing: true },
    { path: 'publications', type: 'publication', hasListing: true },
    { path: 'posts', type: 'post', hasListing: true },
    { path: 'tags', type: 'tags', hasListing: true },
    { path: 'courses', type: 'class', hasListing: true },
    { path: 'teaching', type: 'teaching', hasListing: false }
];

const fetchDynamicContent = async ({ path, type, hasListing }: DynamicContent) => {
    const content = await fetchEntries(type, {
        select: ['sys.id', 'sys.updatedAt'],
        orderBy: '-sys.updatedAt'
    });

    if (!content.length) return [];
    const contentList = content.map(({ sys }) => ({
        url: `/${path}/${sys.id}`,
        lastModified: new Date(sys.updatedAt)
    }))

    if (hasListing) {
        contentList.push({
            url: `/${path}`,
            lastModified: new Date(content[0].sys.updatedAt)
        })
    }

    return contentList;
}

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
    const hostName = process.env.HOST_NAME!;

    const promiseList = await Promise.all(
        dynamicContent.map(fetchDynamicContent)
    );

    return [
        { url: '/', lastModified: new Date() },
        { url: '/about', lastModified: new Date() },
        { url: '/grants', lastModified: new Date() }
    ].concat(promiseList.flat(1)).map(({ url, lastModified }) => ({
        url: hostName.replace(/\/$/, '') + url,
        lastModified
    }));
}

export default sitemap;