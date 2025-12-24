import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const [serviceInfoEntries, blogPosts, pages, devices, apps] = await Promise.all([
    getCollection('service-info'),
    getCollection('blog').catch(() => []),
    getCollection('pages').catch(() => []),
    getCollection('devices').catch(() => []),
    getCollection('apps').catch(() => []),
  ]);

  const serviceInfo = serviceInfoEntries[0];
  const baseURL = serviceInfo?.data?.siteUrl || 'https://example.com';

  const staticPages = [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/pricing', priority: 0.9, changefreq: 'monthly' },
    { url: '/features', priority: 0.8, changefreq: 'monthly' },
    { url: '/faq', priority: 0.8, changefreq: 'monthly' },
    { url: '/contact', priority: 0.7, changefreq: 'monthly' },
    { url: '/blog', priority: 0.8, changefreq: 'weekly' },
    { url: '/privacy', priority: 0.4, changefreq: 'yearly' },
    { url: '/terms', priority: 0.4, changefreq: 'yearly' },
  ];

  const blogUrls = blogPosts.map(post => ({
    url: `/blog/${post.id}/`,
    priority: 0.7,
    changefreq: 'monthly' as const,
    lastmod: (post.data.updatedDate || post.data.pubDate).toISOString().split('T')[0],
  }));

  const pageUrls = pages.map(page => ({
    url: `/${page.data.slug}/`,
    priority: 0.6,
    changefreq: 'monthly' as const,
  }));

  const deviceUrls = devices.map(device => ({
    url: `/devices/${device.id}/`,
    priority: 0.7,
    changefreq: 'monthly' as const,
  }));

  const appUrls = apps.map(app => ({
    url: `/apps/${app.id}/`,
    priority: 0.7,
    changefreq: 'monthly' as const,
  }));

  const allUrls = [
    ...staticPages.map(p => ({ ...p, lastmod: new Date().toISOString().split('T')[0] })),
    ...blogUrls,
    ...pageUrls.map(p => ({ ...p, lastmod: new Date().toISOString().split('T')[0] })),
    ...deviceUrls.map(p => ({ ...p, lastmod: new Date().toISOString().split('T')[0] })),
    ...appUrls.map(p => ({ ...p, lastmod: new Date().toISOString().split('T')[0] })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allUrls
  .map(
    item => `  <url>
    <loc>${baseURL}${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
