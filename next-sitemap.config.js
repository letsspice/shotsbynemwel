/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://shotsbynemwel.netlify.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: 'public',
  transform: async (config, url) => {
    // Keep defaults; can adjust priority for key sections
    return {
      loc: url,
      changefreq: 'weekly',
      priority: url === '/' ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: [],
    };
  },
};
