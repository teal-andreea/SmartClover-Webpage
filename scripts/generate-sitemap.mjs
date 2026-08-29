import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const SITE_URL = 'https://smartclover.ro';

export const staticRoutes = [
  '/',
  '/about',
  '/cerviguard',
  '/products',
  '/research',
  '/pricing',
  '/how-to-buy',
  '/proof',
  '/regulatory',
  '/cloud-architecture',
  '/cybersecurity',
  '/decentralized',
  '/values',
  '/trust',
  '/trust/privacy-policy',
  '/trust/terms-of-service',
  '/trust/data-processing',
  '/trust/security',
  '/trust/incident-response',
  '/gender-equality-plan',
  '/blog',
  '/docs/api',
  '/contact',
  '/contact/privacy'
];

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const toUrl = (route) => `${SITE_URL}${route === '/' ? '/' : route}`;

const getFrontMatterValue = (source, key) => {
  const match = source.match(/^---\n([\s\S]*?)\n---/);

  if (!match) {
    return '';
  }

  const frontMatter = match[1];
  const line = frontMatter
    .split('\n')
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${key}:`));

  if (!line) {
    return '';
  }

  return line
    .slice(key.length + 1)
    .trim()
    .replace(/^["']|["']$/g, '');
};

export const getPostEntries = (rootDir = process.cwd()) => {
  const postsDir = path.join(rootDir, 'posts');

  return fs
    .readdirSync(postsDir)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const source = fs.readFileSync(path.join(postsDir, fileName), 'utf8');

      return {
        route: `/blog/${slug}`,
        lastmod: getFrontMatterValue(source, 'updated') || getFrontMatterValue(source, 'date')
      };
    })
    .sort((a, b) => a.route.localeCompare(b.route));
};

export const getSitemapEntries = (rootDir = process.cwd()) => [
  ...staticRoutes.map((route) => ({ route })),
  ...getPostEntries(rootDir)
];

export const buildSitemap = ({ rootDir = process.cwd() } = {}) => {
  const urls = getSitemapEntries(rootDir)
    .map((entry) => {
      const lastmod = entry.lastmod ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : '';

      return `  <url>\n    <loc>${escapeXml(toUrl(entry.route))}</loc>${lastmod}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

export const writeSitemap = (rootDir = process.cwd()) => {
  const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, buildSitemap({ rootDir }));
  return sitemapPath;
};

const currentFile = fileURLToPath(import.meta.url);

if (process.argv[1] && path.resolve(process.argv[1]) === currentFile) {
  writeSitemap(process.cwd());
}
