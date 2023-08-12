import { MetadataRoute } from 'next';
import fetchEntries from '~/actions/fetch-entry';
import { ContentType } from '~/actions/types';

const dynamicContent: { [x: string]: ContentType } = {
    projects: 'project',
    events: 'event',
    publications: 'publication',
    posts: 'post',
    tags: 'tags',
}

const fetchDynamicContent = async (path: string, type: ContentType) => {
    const content = await fetchEntries(type, {
        select: ['sys.id', 'sys.updatedAt'],
        orderBy: '-sys.updatedAt'
    });

    if (!content.length) return [];

    const basePage = {
        url: `/${path}`,
        lastModified: new Date(content[0].sys.updatedAt)
    };

    return content.map(({ sys }) => ({
        url: `/${path}/${sys.id}`,
        lastModified: new Date(sys.updatedAt)
    })).concat([basePage]);
}

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
    const hostName = process.env.HOST_NAME!;

    const promiseList = await Promise.all(
        Object.entries(dynamicContent).map(([path, type]) => fetchDynamicContent(path, type))
    );

    return [
        { url: '/', lastModified: new Date() },
        { url: '/about', lastModified: new Date() },
        { url: '/teaching', lastModified: new Date() },
        { url: '/grants', lastModified: new Date() }
    ].concat(promiseList.flat(1)).map(({ url, lastModified }) => ({
        url: hostName.replace(/\/$/, '') + url,
        lastModified
    }));
}

export default sitemap;