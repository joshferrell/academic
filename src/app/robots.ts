import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const hostName = process.env.HOST_NAME!;

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${hostName}/sitemap.xml`,
    }
}