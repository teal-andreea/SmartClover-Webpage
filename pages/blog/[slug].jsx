/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import PageSeo, { siteUrl } from '../../components/PageSeo';
import { getAllPostSlugs, getPostData, getSortedPostsData } from '../../lib/posts';

const DEFAULT_ARTICLE_IMAGE = '/images/og/brand-card_v1.png';
const DEFAULT_IMAGE_WIDTH = 1600;
const DEFAULT_IMAGE_HEIGHT = 1000;
const NIS2_COMPASS_URL = 'https://www.nis2compass.eu';
const TEALGUARD_ANNOUNCEMENT_SLUG = 'tealguard-financing-contract-signed-sovereign-ai-gynecologic-oncology';

export const getStaticPaths = () => ({
  paths: getAllPostSlugs(),
  fallback: false
});

export const getStaticProps = async ({ params }) => {
  const post = await getPostData(params.slug);
  const allPosts = getSortedPostsData();

  return {
    props: {
      post,
      relatedPosts: getRelatedPosts(post, allPosts)
    }
  };
};

const formatDate = (value) => {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
};

const normalizeList = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const normalizeTextItems = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  return [String(value).trim()].filter(Boolean);
};

const normalizeImagePath = (value) => {
  if (!value) {
    return '';
  }

  if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/')) {
    return value;
  }

  return `/blog/${value}`;
};

const getPostHref = (post) => post.href || `/blog/${post.slug}`;

const stripTags = (value = '') => value.replace(/<[^>]+>/g, ' ');

const decodeHtmlEntities = (value = '') =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const getWordCount = (value = '') => stripTags(value).trim().split(/\s+/).filter(Boolean).length;

const slugifyHeading = (value = '') => {
  const slug = decodeHtmlEntities(stripTags(value))
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return slug || 'section';
};

const createUniqueId = (baseId, seenIds) => {
  const count = seenIds.get(baseId) || 0;
  seenIds.set(baseId, count + 1);
  return count === 0 ? baseId : `${baseId}-${count + 1}`;
};

const buildTocFromHtml = (contentHtml = '') => {
  const seenIds = new Map();
  const toc = [];
  const html = contentHtml.replace(/<h([23])([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, innerHtml) => {
    const existingId = attrs.match(/\sid=["']([^"']+)["']/i)?.[1];
    const title = decodeHtmlEntities(stripTags(innerHtml)).trim();

    if (!title) {
      return match;
    }

    const id = existingId || createUniqueId(slugifyHeading(title), seenIds);
    toc.push({
      id,
      title,
      level: Number(level)
    });

    if (existingId) {
      return match;
    }

    return `<h${level}${attrs} id="${id}">${innerHtml}</h${level}>`;
  });

  return {
    html,
    toc
  };
};

const normalizeToc = (toc) =>
  normalizeList(toc).map((item) => {
    if (typeof item === 'string') {
      return {
        id: slugifyHeading(item),
        title: item,
        level: 2
      };
    }

    return {
      id: item.id || slugifyHeading(item.title || item.label || item.text),
      title: item.title || item.label || item.text,
      level: Number(item.level || item.depth) || 2
    };
  });

const getTopic = (post) => {
  if (post.topic) {
    return post.topic;
  }

  const searchable = `${post.title || ''} ${post.slug || ''} ${normalizeList(post.tags).join(' ')}`.toLowerCase();

  if (searchable.includes('cerviguard') || searchable.includes('screening') || searchable.includes('clinical')) {
    return 'Clinical Evidence';
  }

  if (searchable.includes('datagems') || searchable.includes('synthetic') || searchable.includes('research')) {
    return 'Research Workflows';
  }

  if (searchable.includes('nis2') || searchable.includes('cybersecurity') || searchable.includes('security')) {
    return 'Cybersecurity Evidence';
  }

  if (searchable.includes('deploy') || searchable.includes('cloud') || searchable.includes('edge')) {
    return 'Deployment Evidence';
  }

  return 'Editorial';
};

const getDescription = (post) => {
  const description = post.excerpt || post.summary || post.subtitle;

  return (
    description ||
    'SmartClover article on clinical evidence, healthcare AI workflows, research data preparation, deployment boundaries, and cybersecurity evidence.'
  );
};

const getSummaryPoints = (post) => {
  const rawItems = [post.excerpt, post.summary, post.subtitle].flatMap((item) => normalizeTextItems(item));
  const seen = new Set();

  return rawItems.filter((item) => {
    const key = item.toLowerCase().replace(/(?:\.{3}|…)+$/, '').trim();

    if ([...seen].some((existingKey) => existingKey.startsWith(key) || key.startsWith(existingKey))) {
      return false;
    }

    seen.add(key);
    return true;
  });
};

const getReadingTime = (post) => {
  if (post.readingTime) {
    return post.readingTime;
  }

  const wordCount = getWordCount(post.contentHtml);

  if (!wordCount) {
    return '';
  }

  return `${Math.max(1, Math.ceil(wordCount / 220))} min read`;
};

const getPostImage = (post) => {
  const src = normalizeImagePath(post.heroImage || post.hero_image);

  if (!src) {
    return null;
  }

  return {
    src,
    alt: post.heroAlt || post.hero_alt || `${post.title} article visual`,
    caption: post.heroCaption || post.hero_caption || '',
    width: post.heroImageWidth || DEFAULT_IMAGE_WIDTH,
    height: post.heroImageHeight || DEFAULT_IMAGE_HEIGHT
  };
};

const getSeoImage = (post) =>
  normalizeImagePath(post.seoImage || post.seo_image || post.ogImage || post.og_image) ||
  getPostImage(post)?.src ||
  DEFAULT_ARTICLE_IMAGE;

const normalizeRelatedPost = (item, allPosts) => {
  if (!item) {
    return null;
  }

  if (typeof item === 'string') {
    const match = allPosts.find((post) => post.slug === item || getPostHref(post) === item);
    return match || null;
  }

  if (item.slug) {
    const match = allPosts.find((post) => post.slug === item.slug);
    return {
      ...match,
      ...item
    };
  }

  return item.href && item.title ? item : null;
};

const getRelatedPosts = (post, allPosts) => {
  const explicit = normalizeList(post.relatedPosts || post.related_posts)
    .map((item) => normalizeRelatedPost(item, allPosts))
    .filter(Boolean);

  if (explicit.length > 0) {
    return explicit.slice(0, 3);
  }

  const postTags = normalizeList(post.tags).map((tag) => tag.toLowerCase());
  const postTopic = getTopic(post);

  const related = allPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const candidateTags = normalizeList(candidate.tags).map((tag) => tag.toLowerCase());
      const tagScore = candidateTags.filter((tag) => postTags.includes(tag)).length;
      const topicScore = getTopic(candidate) === postTopic ? 1 : 0;

      return {
        post: candidate,
        score: tagScore + topicScore
      };
    })
    .sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score;
      }

      return String(b.post.date || '').localeCompare(String(a.post.date || ''));
    })
    .map((item) => item.post);

  return related.slice(0, 3);
};

const getArticleJsonLd = (post) => {
  const tags = normalizeList(post.tags);
  const image = getSeoImage(post);
  const normalizedImage = image.startsWith('http://') || image.startsWith('https://') ? image : `${siteUrl}${image}`;
  const article = {
    '@context': 'https://schema.org',
    '@type': ['Article', 'BlogPosting'],
    headline: post.title,
    description: getDescription(post),
    url: `${siteUrl}${getPostHref(post)}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}${getPostHref(post)}`
    },
    datePublished: post.date || post.publishedDate,
    dateModified: post.updated || post.modifiedDate || post.date,
    image: normalizedImage,
    author:
      post.slug === TEALGUARD_ANNOUNCEMENT_SLUG
        ? [
            {
              '@type': 'Person',
              name: 'Andreea Damian'
            },
            {
              '@type': 'Organization',
              name: 'SmartClover'
            }
          ]
        : {
            '@type': post.authorType || 'Organization',
            name: post.author || 'SmartClover'
          },
    publisher: {
      '@type': 'Organization',
      name: 'SmartClover',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/smartclover-logo_v2.png`
      }
    },
    articleSection: getTopic(post),
    keywords: tags.length > 0 ? tags.join(', ') : undefined
  };

  if (post.partner) {
    article.contributor = {
      '@type': 'Organization',
      name: post.partner
    };
  }

  return article;
};

const renderLinkedTitle = (title) => {
  if (!title.includes('NIS2COMPASS')) {
    return title;
  }

  const parts = title.split('NIS2COMPASS');

  return parts.flatMap((part, index) => {
    if (index === 0) {
      return part;
    }

    return [
      <a key={`nis2compass-title-link-${index}`} href={NIS2_COMPASS_URL} target="_blank" rel="noopener noreferrer">
        NIS2COMPASS
      </a>,
      part
    ];
  });
};

const ArticleHeroImage = ({ image, title, zoomable = false }) => {
  if (!image?.src) {
    return null;
  }

  if (image.src.startsWith('http://') || image.src.startsWith('https://')) {
    return (
      <figure className="article-hero-media">
        <img src={image.src} alt={image.alt || `${title} article visual`} />
        {image.caption && <figcaption>{image.caption}</figcaption>}
      </figure>
    );
  }

  const imageElement = (
    <Image
      src={image.src}
      alt={image.alt || `${title} article visual`}
      width={image.width || DEFAULT_IMAGE_WIDTH}
      height={image.height || DEFAULT_IMAGE_HEIGHT}
      sizes="(min-width: 1180px) 500px, (min-width: 880px) 42vw, 100vw"
      priority
    />
  );

  return (
    <figure className="article-hero-media">
      {zoomable ? (
        <a
          className="article-hero-image-link"
          href={image.src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open full-size ${title} visual in a new tab`}
        >
          {imageElement}
        </a>
      ) : (
        imageElement
      )}
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
  );
};

const ArticleMetaStrip = ({ post }) => {
  const publishedDate = post.date || post.publishedDate;
  const updatedDate = post.updated || post.modifiedDate;
  const metaItems = [
    { label: 'Author', value: post.author || 'SmartClover' },
    { label: 'Partner', value: post.partner },
    { label: 'Published', value: formatDate(publishedDate), dateTime: publishedDate },
    {
      label: 'Updated',
      value: updatedDate && updatedDate !== publishedDate ? formatDate(updatedDate) : '',
      dateTime: updatedDate
    },
    { label: 'Read time', value: getReadingTime(post) }
  ].filter((item) => item.value);

  return (
    <dl className="article-meta-strip" aria-label="Article details">
      {metaItems.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>
            {item.dateTime ? (
              <time dateTime={item.dateTime}>{item.value}</time>
            ) : (
              item.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
};

const TealGuardFundingStrip = () => (
  <aside className="article-funding-strip" aria-label="TealGuard project funding">
    <div className="article-funding-logos" aria-label="Funding programme identities">
      <Image
        className="funding-logo-eu"
        src="/images/tealguard/funding/eu-cofunded-ro.png"
        alt="Cofinanțat de Uniunea Europeană"
        width={234}
        height={50}
        priority
        unoptimized
      />
      <Image
        className="funding-logo-government"
        src="/images/tealguard/funding/guvernul-romaniei.png"
        alt="Guvernul României"
        width={49}
        height={49}
        priority
        unoptimized
      />
      <Image
        className="funding-logo-health"
        src="/images/tealguard/funding/programul-sanatate.png"
        alt="Programul Sănătate"
        width={136}
        height={51}
        priority
        unoptimized
      />
    </div>
    <p>
      The project is co-financed by the European Union through the European Regional Development Fund under
      the Health Programme 2021–2027.
    </p>
  </aside>
);

const BlogPost = ({ post, relatedPosts }) => {
  const description = getDescription(post);
  const seoTitle = `${post.title} | SmartClover Blog`;
  const heroImage = getPostImage(post);
  const summaryPoints = getSummaryPoints(post);
  const generatedToc = buildTocFromHtml(post.contentHtml);
  const explicitToc = normalizeToc(post.toc);
  const tocItems = explicitToc.length > 0 ? explicitToc : generatedToc.toc;
  const contentHtml = explicitToc.length > 0 ? post.contentHtml : generatedToc.html;
  const shouldShowToc = tocItems.length >= 3 && getWordCount(post.contentHtml) >= 900;
  const isTealGuardAnnouncement = post.slug === TEALGUARD_ANNOUNCEMENT_SLUG;
  const shouldShowSidebar = shouldShowToc || (!isTealGuardAnnouncement && summaryPoints.length > 0);

  return (
    <>
      <PageSeo
        title={seoTitle}
        description={description}
        path={getPostHref(post)}
        image={getSeoImage(post)}
        imageAlt={post.seoImageAlt || post.seo_image_alt || heroImage?.alt}
        type="article"
        author={post.author || 'SmartClover'}
        publishedTime={post.date || post.publishedDate}
        modifiedTime={post.updated || post.modifiedDate || post.date}
        section={getTopic(post)}
        tags={post.tags || []}
        jsonLd={getArticleJsonLd(post)}
      />

      <article className={isTealGuardAnnouncement ? 'article-shell tealguard-article' : 'article-shell'}>
        {isTealGuardAnnouncement && <TealGuardFundingStrip />}
        <header className="article-hero">
          <div className={heroImage ? 'article-hero-grid' : 'article-hero-copy'}>
            <div className="article-hero-copy">
              <span className="blog-topic">{getTopic(post)}</span>
              <h1>{renderLinkedTitle(post.title)}</h1>
              {description && !isTealGuardAnnouncement && <p className="article-dek">{description}</p>}
              <ArticleMetaStrip post={post} />
              {normalizeList(post.tags).length > 0 && (
                <ul className="article-tag-list" aria-label="Article tags">
                  {normalizeList(post.tags).map((tag) => (
                    <li key={`${post.slug}-${tag}`}>{tag}</li>
                  ))}
                </ul>
              )}
            </div>
            <ArticleHeroImage image={heroImage} title={post.title} zoomable={isTealGuardAnnouncement} />
          </div>
        </header>

        <div className={shouldShowToc ? 'article-layout has-toc' : 'article-layout'}>
          {shouldShowSidebar && (
            <aside className="article-sidebar">
              {!isTealGuardAnnouncement && summaryPoints.length > 0 && (
                <section className="article-summary" aria-labelledby="article-summary-heading">
                  <h2 id="article-summary-heading">{summaryPoints.length > 1 ? 'Key points' : 'Summary'}</h2>
                  <ul>
                    {summaryPoints.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}

              {shouldShowToc && (
                <nav className="article-toc" aria-labelledby="article-toc-heading">
                  <h2 id="article-toc-heading">Contents</h2>
                  <ol>
                    {tocItems.map((item) => (
                      <li key={item.id} className={item.level > 2 ? 'toc-level-3' : undefined}>
                        <a href={`#${item.id}`}>{item.title}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
            </aside>
          )}

          <div className="article-main">
            {isTealGuardAnnouncement && summaryPoints.length > 0 && (
              <section className="article-summary article-summary--main" aria-labelledby="article-tldr-heading">
                <h2 id="article-tldr-heading">TL;DR</h2>
                {summaryPoints.length === 1 ? (
                  <p>{summaryPoints[0]}</p>
                ) : (
                  <ul>
                    {summaryPoints.map((item) => (
                      <li key={`tldr-${item}`}>{item}</li>
                    ))}
                  </ul>
                )}
                {post.tldr_project_website && (
                  <p>
                    More information can be found on the official TealGuard project website:{' '}
                    <a href={post.tldr_project_website}>tealguard.eu</a>.
                  </p>
                )}
              </section>
            )}

            {shouldShowToc && (
              <details className="article-mobile-toc">
                <summary>Contents</summary>
                <ol>
                  {tocItems.map((item) => (
                    <li key={`mobile-${item.id}`} className={item.level > 2 ? 'toc-level-3' : undefined}>
                      <a href={`#${item.id}`}>{item.title}</a>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            <div
              className="article-content-card markdown-body"
              dangerouslySetInnerHTML={{
                __html: contentHtml
              }}
            />

            {relatedPosts.length > 0 && (
              <section className="article-related" aria-labelledby="article-related-heading">
                <h2 id="article-related-heading">Related reading</h2>
                <div className="article-related-grid">
                  {relatedPosts.map((relatedPost) => (
                    <article key={relatedPost.href || relatedPost.slug}>
                      <span className="blog-topic">{getTopic(relatedPost)}</span>
                      <h3>
                        <Link href={getPostHref(relatedPost)}>{relatedPost.title}</Link>
                      </h3>
                      {getDescription(relatedPost) && <p>{getDescription(relatedPost)}</p>}
                    </article>
                  ))}
                </div>
              </section>
            )}

            <div className="article-related">
              <Link href="/blog">Back to all posts</Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
