import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');
const publicDirectory = path.join(process.cwd(), 'public');
const defaultAuthor = 'SmartClover';
const defaultHeroImage = '/images/og/brand-card_v1.png';
const defaultTopic = 'Clinical Evidence';
const htmlHeadingPrefix = 'user-content-';
const wordsPerMinute = 220;
const imageDimensionsCache = new Map();

const postEditorialDefaults = {
  'cerviguard-remote-screening-foundations': {
    topic: 'Clinical Evidence',
    tags: ['CerviGuard', 'screening workflows']
  },
  'cybersecurity-healthcare-ledger': {
    topic: 'Cybersecurity Evidence',
    tags: ['cybersecurity', 'healthcare resilience'],
    heroImage: '/images/diagrams/healthcare-cyber-resilience-loop_v2.png',
    heroAlt: 'Healthcare cybersecurity loop: assess risks, harden access, configure partner products, automate monitoring and evidence collection, remediate, review and improve.'
  },
  'datagems-synthetic-data-workflows': {
    topic: 'Research Data',
    tags: ['DataGems', 'synthetic data']
  },
  'healthcare-ai-research': {
    topic: 'Clinical Evidence',
    tags: ['research', 'clinical review'],
    heroImage: '/images/diagrams/research-evidence-flow_v2.png',
    heroAlt: 'Research flow from question to source-linked evidence, clinical review, and a published citable record.'
  },
  'nis2compass-verifiable-cybersecurity-proof': {
    topic: 'Cybersecurity Evidence',
    tags: ['NIS2COMPASS', 'cybersecurity evidence']
  },
  'on-prem-ledger-ci-cd': {
    topic: 'Deployment Evidence',
    tags: ['permissioned deployment', 'cloud-on-edge'],
    heroImage: '/images/diagrams/cloud-on-edge-boundary_v2.png',
    heroAlt: 'Cloud-on-edge deployment: healthcare data and AI workers stay inside the approved boundary; cloud coordination is control-plane only; immutable anchoring records deployment evidence.'
  },
  'smartclover-purpleray-acquisition': {
    topic: 'Cybersecurity Evidence'
  },
  'tealguard-financing-contract-signed-sovereign-ai-gynecologic-oncology': {
    topic: 'Project Announcement',
    seoImage: '/images/og/tealguard-announcement_v1.png',
    seoImageAlt: 'TealGuard project announcement with the official funding identities and four-module platform diagram'
  }
};

const figureCaptionDefaults = {
  '/blog/images/evidence-flow-imagegen.png':
    'Security activity becomes reviewable evidence through capture, Evidence Graph structuring, human review, and evidence-pack assembly.',
  '/blog/images/collaboration-flow-imagegen.png':
    '<a href="https://www.nis2compass.eu">NIS2COMPASS</a> combines compliance architecture, SmartClover engineering, and CYberSynchrony validation into public-safe project outputs.'
};

const normalizeWhitespace = (value) => String(value || '').replace(/\s+/g, ' ').trim();

const truncateText = (value, maxLength = 240) => {
  const normalized = normalizeWhitespace(value);

  if (normalized.length <= maxLength) {
    return normalized;
  }

  const shortened = normalized.slice(0, maxLength - 3).replace(/\s+\S*$/, '').trim();
  return `${shortened || normalized.slice(0, maxLength - 3)}...`;
};

const stripMarkdownSyntax = (value) =>
  normalizeWhitespace(
    String(value || '')
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/~~~[\s\S]*?~~~/g, ' ')
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/<\/?[^>]+>/g, ' ')
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/^>\s?/gm, '')
      .replace(/[*_~]/g, '')
  );

const getWordCount = (content) => {
  const words = stripMarkdownSyntax(content).match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g);
  return words ? words.length : 0;
};

const getReadingTime = (content) => {
  const wordCount = getWordCount(content);
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  return {
    wordCount,
    readingTimeMinutes: minutes,
    readingTime: `${minutes} min read`
  };
};

const firstPresentString = (...values) => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return '';
};

const normalizeList = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeWhitespace(item)).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => normalizeWhitespace(item))
      .filter(Boolean);
  }

  return [];
};

const normalizeDate = (value) => {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === 'string') {
    return value.trim();
  }

  return '';
};

const inferTopic = ({ slug, data, content }) => {
  if (postEditorialDefaults[slug]?.topic) {
    return postEditorialDefaults[slug].topic;
  }

  if (typeof data.topic === 'string' && data.topic.trim()) {
    return data.topic.trim();
  }

  const source = `${data.title || ''} ${data.excerpt || ''} ${data.subtitle || ''} ${content || ''}`.toLowerCase();

  if (source.includes('datagems') || source.includes('synthetic data')) {
    return 'Research Data';
  }

  if (source.includes('nis2') || source.includes('cybersecurity') || source.includes('security')) {
    return 'Cybersecurity Evidence';
  }

  if (source.includes('deployment') || source.includes('cloud-on-edge') || source.includes('ledger')) {
    return 'Deployment Evidence';
  }

  return defaultTopic;
};

const splitUrlSuffix = (value) => {
  const queryIndex = value.indexOf('?');
  const hashIndex = value.indexOf('#');
  const suffixIndex = [queryIndex, hashIndex].filter((index) => index >= 0).sort((a, b) => a - b)[0];

  if (suffixIndex === undefined) {
    return {
      pathname: value,
      suffix: ''
    };
  }

  return {
    pathname: value.slice(0, suffixIndex),
    suffix: value.slice(suffixIndex)
  };
};

const hasUnsafePathSegment = (pathname) => {
  try {
    return decodeURIComponent(pathname)
      .split('/')
      .some((segment) => segment === '..' || segment.includes('\\') || /[\0-\x1f]/.test(segment));
  } catch {
    return true;
  }
};

export const resolveArticleImagePath = (value) => {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed) || trimmed.startsWith('//')) {
    return '';
  }

  const { pathname, suffix } = splitUrlSuffix(trimmed);

  if (hasUnsafePathSegment(pathname)) {
    return '';
  }

  if (pathname.startsWith('/')) {
    const normalized = path.posix.normalize(pathname);
    return `${normalized}${suffix}`;
  }

  const normalized = path.posix.normalize(pathname.replace(/^\.\//, ''));

  if (!normalized || normalized === '.' || normalized === '..' || normalized.startsWith('../') || path.posix.isAbsolute(normalized)) {
    return '';
  }

  return `/blog/${normalized}${suffix}`;
};

const getPublicImagePath = (src) => {
  if (typeof src !== 'string' || !src.startsWith('/')) {
    return null;
  }

  const { pathname } = splitUrlSuffix(src);

  if (!pathname || hasUnsafePathSegment(pathname)) {
    return null;
  }

  let decodedPathname;

  try {
    decodedPathname = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  const imagePath = path.resolve(publicDirectory, decodedPathname.replace(/^\/+/, ''));

  if (imagePath !== publicDirectory && !imagePath.startsWith(`${publicDirectory}${path.sep}`)) {
    return null;
  }

  return imagePath;
};

const readPngDimensions = (buffer) => {
  if (buffer.length < 24 || buffer.toString('hex', 0, 8) !== '89504e470d0a1a0a') {
    return null;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
    type: 'png'
  };
};

const isJpegStartOfFrame = (marker) =>
  (marker >= 0xc0 && marker <= 0xc3) ||
  (marker >= 0xc5 && marker <= 0xc7) ||
  (marker >= 0xc9 && marker <= 0xcb) ||
  (marker >= 0xcd && marker <= 0xcf);

const readJpegDimensions = (buffer) => {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return null;
  }

  let offset = 2;

  while (offset < buffer.length) {
    while (buffer[offset] === 0xff) {
      offset += 1;
    }

    const marker = buffer[offset];
    offset += 1;

    if (marker === 0xd9 || marker === 0xda || offset + 2 > buffer.length) {
      break;
    }

    const segmentLength = buffer.readUInt16BE(offset);

    if (segmentLength < 2 || offset + segmentLength > buffer.length) {
      break;
    }

    if (isJpegStartOfFrame(marker) && offset + 7 <= buffer.length) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
        type: 'jpeg'
      };
    }

    offset += segmentLength;
  }

  return null;
};

const readImageDimensions = (src) => {
  if (imageDimensionsCache.has(src)) {
    return imageDimensionsCache.get(src);
  }

  const imagePath = getPublicImagePath(src);

  if (!imagePath || !fs.existsSync(imagePath) || !fs.statSync(imagePath).isFile()) {
    imageDimensionsCache.set(src, null);
    return null;
  }

  const buffer = fs.readFileSync(imagePath);
  const dimensions = readPngDimensions(buffer) || readJpegDimensions(buffer);

  imageDimensionsCache.set(src, dimensions);
  return dimensions;
};

const getImageMetadata = (src, alt = '', caption = '') => {
  const dimensions = readImageDimensions(src);

  return {
    src,
    alt: normalizeWhitespace(alt),
    caption: normalizeWhitespace(caption),
    width: dimensions?.width || null,
    height: dimensions?.height || null,
    type: dimensions?.type || null
  };
};

const extractMarkdownImages = (content) => {
  const images = [];
  const imagePattern = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+["'][^)]+["'])?\)(?:\s*\n\*([^*\n]+)\*)?/g;
  let match;

  while ((match = imagePattern.exec(content)) !== null) {
    const resolvedSrc = resolveArticleImagePath(match[2]);

    if (!resolvedSrc) {
      continue;
    }

    images.push(getImageMetadata(resolvedSrc, match[1], match[3]));
  }

  return images;
};

const extractNodeText = (node) => {
  if (!node || typeof node !== 'object') {
    return '';
  }

  if (typeof node.value === 'string') {
    return node.value;
  }

  if (typeof node.alt === 'string') {
    return node.alt;
  }

  if (!Array.isArray(node.children)) {
    return '';
  }

  return node.children.map(extractNodeText).join('');
};

const slugifyHeading = (value) => {
  const slug = normalizeWhitespace(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || 'section';
};

const getUniqueSlug = (value, counts) => {
  const baseSlug = slugifyHeading(value);
  const count = counts.get(baseSlug) || 0;
  counts.set(baseSlug, count + 1);

  return count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;
};

const getRenderedHeadingId = (id) => `${htmlHeadingPrefix}${id}`;

const editorialMarkdownPlugin = ({ toc = [], images = [] } = {}) => {
  const headingCounts = new Map();

  const visit = (node) => {
    if (!node || typeof node !== 'object') {
      return;
    }

    if (node.type === 'heading') {
      const text = normalizeWhitespace(extractNodeText(node));
      const id = getUniqueSlug(text, headingCounts);

      node.data = {
        ...node.data,
        hProperties: {
          ...node.data?.hProperties,
          id
        }
      };

      if (node.depth >= 2 && node.depth <= 4) {
        toc.push({
          id: getRenderedHeadingId(id),
          depth: node.depth,
          text
        });
      }
    }

    if (node.type === 'image') {
      const resolvedSrc = resolveArticleImagePath(node.url);

      if (resolvedSrc !== null) {
        node.url = resolvedSrc;
      }

      const metadata = getImageMetadata(node.url, node.alt);
      const hProperties = {
        ...node.data?.hProperties,
        loading: 'lazy',
        decoding: 'async'
      };

      if (metadata.width && metadata.height) {
        hProperties.width = metadata.width;
        hProperties.height = metadata.height;
      }

      node.data = {
        ...node.data,
        hProperties
      };

      images.push(metadata);
    }

    if (node.type === 'link' && Array.isArray(node.children) && node.children.some((child) => child.type === 'image')) {
      const resolvedUrl = resolveArticleImagePath(node.url);

      if (resolvedUrl !== null) {
        node.url = resolvedUrl;
      }
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(visit);
    }
  };

  return (tree) => {
    visit(tree);
  };
};

const readPostSource = (fileName) => {
  const slug = fileName.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    data,
    content
  };
};

const addImageRuntimeAttributes = (contentHtml) =>
  contentHtml.replace(/<img\b([^>]*)>/g, (match, attrs) => {
    let nextAttrs = attrs;

    if (!/\sloading=/.test(nextAttrs)) {
      nextAttrs += ' loading="lazy"';
    }

    if (!/\sdecoding=/.test(nextAttrs)) {
      nextAttrs += ' decoding="async"';
    }

    return `<img${nextAttrs}>`;
  });

const addDefaultFigureCaptions = (contentHtml) =>
  contentHtml.replace(/<figure class="article-figure">([\s\S]*?<img [^>]*src="([^"]+)"[\s\S]*?)<\/figure>/g, (match, body, src) => {
    if (match.includes('<figcaption>') || !figureCaptionDefaults[src]) {
      return match;
    }

    return `<figure class="article-figure">${body}<figcaption>${figureCaptionDefaults[src]}</figcaption></figure>`;
  });

const renderArticleFigures = (contentHtml) => {
  const withInlineCaptionFigures = contentHtml.replace(
    /<p>\s*((?:<a [^>]+>\s*)?<img [^>]+>\s*(?:<\/a>)?)\s*<em>([\s\S]*?)<\/em>\s*<\/p>/g,
    '<figure class="article-figure">$1<figcaption>$2</figcaption></figure>'
  );
  const withCaptionFigures = withInlineCaptionFigures.replace(
    /<p>\s*((?:<a [^>]+>\s*)?<img [^>]+>\s*(?:<\/a>)?)\s*<\/p>\s*<p><em>([\s\S]*?)<\/em><\/p>/g,
    '<figure class="article-figure">$1<figcaption>$2</figcaption></figure>'
  );

  const withFigures = withCaptionFigures.replace(
    /<p>\s*((?:<a [^>]+>\s*)?<img [^>]+>\s*(?:<\/a>)?)\s*<\/p>/g,
    '<figure class="article-figure">$1</figure>'
  );

  return addDefaultFigureCaptions(withFigures);
};

const removeDuplicateHeroFigure = (contentHtml, heroImage) => {
  if (!heroImage) {
    return contentHtml;
  }

  const escapedHeroImage = heroImage.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const duplicateFigurePattern = new RegExp(
    `<figure class="article-figure">\\s*(?:<a [^>]*>\\s*)?<img [^>]*src="${escapedHeroImage}"[\\s\\S]*?<\\/figure>\\s*`
  );
  const duplicateParagraphPattern = new RegExp(
    `<p>\\s*(?:<a [^>]*>\\s*)?<img [^>]*src="${escapedHeroImage}"[\\s\\S]*?<\\/p>\\s*`
  );

  return contentHtml.replace(duplicateFigurePattern, '').replace(duplicateParagraphPattern, '');
};

const removeDuplicateTitleHeading = (contentHtml, title) =>
  contentHtml.replace(/^\s*<h1\b[^>]*>([\s\S]*?)<\/h1>\s*/i, (match, headingHtml) => {
    const headingText = normalizeWhitespace(headingHtml.replace(/<[^>]+>/g, ''));
    return headingText === normalizeWhitespace(title) ? '' : match;
  });

const linkFiguresToFullSizeImages = (contentHtml) =>
  contentHtml.replace(
    /(<figure class="article-figure">\s*)(<img\b[^>]*\bsrc="([^"]+)"[^>]*>)/g,
    '$1<a class="article-figure-link" href="$3" target="_blank" rel="noopener noreferrer" aria-label="Open full-size figure in a new tab">$2</a>'
  );

const getPostFileNames = () =>
  fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .sort();

const getPostFilePath = (slug) => {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    throw new Error(`Invalid blog post slug: ${slug}`);
  }

  return path.join(postsDirectory, `${slug}.md`);
};

export const normalizePostMetadata = ({ slug, data, content }) => {
  const editorialDefaults = postEditorialDefaults[slug] || {};
  const mergedData = {
    ...editorialDefaults,
    ...data
  };
  const title = firstPresentString(data.title, slug);
  const date = normalizeDate(data.date);
  const updated = normalizeDate(data.updated);
  const summary = truncateText(firstPresentString(mergedData.summary, mergedData.excerpt, mergedData.subtitle));
  const markdownImages = extractMarkdownImages(content);
  const heroImage =
    resolveArticleImagePath(firstPresentString(mergedData.heroImage, mergedData.hero_image, mergedData.cover_image)) ||
    markdownImages[0]?.src ||
    defaultHeroImage;
  const heroMarkdownImage = markdownImages.find((image) => image.src === heroImage);
  const heroAlt = firstPresentString(mergedData.heroAlt, mergedData.hero_alt, heroMarkdownImage?.alt, title);
  const heroCaption = firstPresentString(mergedData.heroCaption, mergedData.hero_caption, heroMarkdownImage?.caption);
  const heroMetadata = getImageMetadata(heroImage, heroAlt);
  const readingMetadata = getReadingTime(content);

  return {
    ...mergedData,
    slug,
    href: `/blog/${slug}`,
    title,
    date,
    updated,
    publishedDate: date,
    modifiedDate: updated || date,
    summary,
    excerpt: firstPresentString(mergedData.excerpt, mergedData.subtitle, summary),
    topic: inferTopic({ slug, data: mergedData, content }),
    tags: normalizeList(mergedData.tags),
    author: firstPresentString(mergedData.author, defaultAuthor),
    partner: firstPresentString(mergedData.partner),
    heroImage,
    hero_image: heroImage,
    heroAlt,
    hero_alt: heroAlt,
    heroCaption,
    hero_caption: heroCaption,
    heroImageWidth: heroMetadata.width,
    heroImageHeight: heroMetadata.height,
    heroImageType: heroMetadata.type,
    ...readingMetadata
  };
};

const getAllPostsData = () =>
  getPostFileNames().map((fileName) => {
    const postSource = readPostSource(fileName);
    return normalizePostMetadata(postSource);
  });

const sortPostsByDateDescending = (posts) =>
  posts.sort((a, b) => {
    const dateComparison = String(b.date).localeCompare(String(a.date));
    return dateComparison || a.title.localeCompare(b.title);
  });

export const getSortedPostsData = () =>
  sortPostsByDateDescending(getAllPostsData().filter((post) => post.exclude_from_index !== true));

export const getAllPostSlugs = () =>
  getPostFileNames().map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, '')
    }
  }));

const scoreRelatedPost = (post, candidate) => {
  const sharedTags = post.tags.filter((tag) => candidate.tags.includes(tag)).length;
  const topicScore = post.topic && post.topic === candidate.topic ? 3 : 0;
  const partnerScore = post.partner && post.partner === candidate.partner ? 1 : 0;
  const tagScore = sharedTags * 2;

  return topicScore + partnerScore + tagScore;
};

const getRelatedPosts = (post, limit = 3) =>
  getSortedPostsData()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      score: scoreRelatedPost(post, candidate)
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || String(b.candidate.date).localeCompare(String(a.candidate.date)))
    .slice(0, limit)
    .map(({ candidate }) => candidate);

export const getPostData = async (slug) => {
  const fullPath = getPostFilePath(slug);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const toc = [];
  const images = [];
  const processedContent = await remark()
    .use(editorialMarkdownPlugin, { toc, images })
    .use(html)
    .process(content);
  const metadata = normalizePostMetadata({ slug, data, content });
  const renderedContent = removeDuplicateHeroFigure(
    renderArticleFigures(addImageRuntimeAttributes(processedContent.toString())),
    metadata.heroImage
  );
  const linkedContent =
    metadata.translation_group === 'tealguard-announcement' ? linkFiguresToFullSizeImages(renderedContent) : renderedContent;
  const contentHtml = removeDuplicateTitleHeading(linkedContent, metadata.title);

  return {
    ...metadata,
    contentHtml,
    toc,
    images,
    relatedPosts: getRelatedPosts(metadata)
  };
};
