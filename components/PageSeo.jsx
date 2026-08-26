import Head from 'next/head';

export const siteUrl = 'https://smartclover.ro';

const defaultRobots = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
const defaultImage = '/images/og/brand-card_v1.png';

const toJsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

const normalizePath = (path) => {
  if (!path || path === '/') {
    return '/';
  }

  return path.startsWith('/') ? path : `/${path}`;
};

const normalizeUrl = (pathOrUrl) => {
  if (!pathOrUrl) {
    return `${siteUrl}${defaultImage}`;
  }

  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }

  return `${siteUrl}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
};

const PageSeo = ({
  title,
  description,
  path = '/',
  image = defaultImage,
  imageAlt,
  type = 'website',
  robots = defaultRobots,
  keywords,
  author = 'SmartClover',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  jsonLd = []
}) => {
  const normalizedPath = normalizePath(path);
  const canonicalUrl = `${siteUrl}${normalizedPath}`;
  const imageUrl = normalizeUrl(image);
  const scripts = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  const tagList = Array.isArray(tags) ? tags : [tags];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta name="author" content={author} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="theme-color" content="#0f766e" />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:site_name" content="SmartClover" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {type === 'article' && author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      {tagList.filter(Boolean).map((tag) => (
        <meta key={`${title}-article-tag-${tag}`} property="article:tag" content={tag} />
      ))}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
      {scripts.filter(Boolean).map((item, index) => (
        <script key={`${title}-jsonld-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(item) }} />
      ))}
    </Head>
  );
};

export default PageSeo;
