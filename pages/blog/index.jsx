/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import PageSeo, { siteUrl } from '../../components/PageSeo';
import { getSortedPostsData } from '../../lib/posts';

const DEFAULT_BLOG_IMAGE = '/images/og/brand-card_v1.png';
const DEFAULT_IMAGE_WIDTH = 1600;
const DEFAULT_IMAGE_HEIGHT = 1000;

export const getStaticProps = () => {
  const posts = getSortedPostsData();
  return {
    props: {
      posts
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

  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
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

const normalizeImagePath = (value) => {
  if (!value) {
    return '';
  }

  if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/')) {
    return value;
  }

  return `/blog/${value}`;
};

const extractFirstMarkdownImage = (content = '') => {
  const match = content.match(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/);

  if (!match) {
    return null;
  }

  return {
    alt: match[1],
    src: normalizeImagePath(match[2])
  };
};

const getPostSummary = (post) => post.summary || post.excerpt || post.subtitle || '';

const getPostHref = (post) => post.href || `/blog/${post.slug}`;

const getPostImage = (post) => {
  const contentImage = extractFirstMarkdownImage(post.content);
  const src = normalizeImagePath(post.heroImage || post.hero_image) || contentImage?.src || '';

  if (!src) {
    return null;
  }

  return {
    src,
    alt: post.heroAlt || post.hero_alt || contentImage?.alt || `${post.title} article visual`,
    width: post.heroImageWidth || DEFAULT_IMAGE_WIDTH,
    height: post.heroImageHeight || DEFAULT_IMAGE_HEIGHT
  };
};

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

const getReadingTime = (post) => {
  if (post.readingTime) {
    return post.readingTime;
  }

  const text = [post.summary, post.excerpt, post.subtitle, post.content]
    .filter(Boolean)
    .join(' ')
    .replace(/<[^>]+>/g, ' ');
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  if (!wordCount) {
    return '';
  }

  return `${Math.max(1, Math.ceil(wordCount / 220))} min read`;
};

const BlogImage = ({ image, title, priority = false }) => {
  if (!image?.src) {
    return null;
  }

  if (image.src.startsWith('http://') || image.src.startsWith('https://')) {
    return <img src={image.src} alt={image.alt || `${title} article visual`} loading={priority ? 'eager' : 'lazy'} />;
  }

  return (
    <Image
      src={image.src}
      alt={image.alt || `${title} article visual`}
      width={image.width || DEFAULT_IMAGE_WIDTH}
      height={image.height || DEFAULT_IMAGE_HEIGHT}
      sizes={priority ? '(min-width: 880px) 460px, 100vw' : '(min-width: 880px) 31vw, 100vw'}
      priority={priority}
    />
  );
};

const Blog = ({ posts }) => {
  const [featuredPost, ...latestPosts] = posts;
  const featuredImage = featuredPost ? getPostImage(featuredPost) : null;
  const seoImage = featuredImage?.src || DEFAULT_BLOG_IMAGE;
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'SmartClover Blog',
    description:
      'Editorial notes from SmartClover on clinical evidence, healthcare AI workflows, research data preparation, deployment boundaries, and cybersecurity evidence.',
    url: `${siteUrl}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'SmartClover',
      url: siteUrl
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${siteUrl}${getPostHref(post)}`,
      datePublished: post.date,
      dateModified: post.updated || post.modifiedDate || post.date,
      articleSection: getTopic(post)
    }))
  };

  return (
    <>
      <PageSeo
        title="SmartClover Blog | Clinical Evidence and Product Notes"
        description="Clinical evidence, product notes, research workflows, deployment boundaries, and cybersecurity evidence from the SmartClover team."
        path="/blog"
        image={seoImage}
        jsonLd={blogJsonLd}
      />

      <div className="blog-hero">
        <div className="blog-hero-grid">
          <div>
            <span className="blog-topic">SmartClover Journal</span>
            <h1>Clinical evidence and product notes</h1>
            <p>
              Articles on cervical-screening workflows, research data preparation, healthcare deployment boundaries,
              and security evidence that can be reviewed by clinical, technical, and partner teams.
            </p>
          </div>

          {featuredPost && (
            <article className="blog-featured" aria-labelledby="blog-featured-heading">
              <Link href={getPostHref(featuredPost)} className="blog-featured-card">
                {featuredImage && (
                  <div className="blog-featured-media">
                    <BlogImage image={featuredImage} title={featuredPost.title} priority />
                  </div>
                )}
                <div className="blog-featured-body">
                  <div className="blog-card-meta">
                    <span className="blog-topic">{getTopic(featuredPost)}</span>
                    {formatDate(featuredPost.date) && <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>}
                    {getReadingTime(featuredPost) && <span>{getReadingTime(featuredPost)}</span>}
                  </div>
                  <h2 id="blog-featured-heading">{featuredPost.title}</h2>
                  {getPostSummary(featuredPost) && <p>{getPostSummary(featuredPost)}</p>}
                </div>
              </Link>
            </article>
          )}
        </div>
      </div>

      <section className="blog-list-section" aria-labelledby="blog-latest-heading">
        <div className="blog-card-meta">
          <span className="blog-topic">Latest</span>
          <h2 id="blog-latest-heading">Latest articles</h2>
        </div>

        <div className="blog-card-grid">
          {latestPosts.map((post) => {
            const image = getPostImage(post);
            const summary = getPostSummary(post);

            return (
              <article key={post.slug} className="blog-card">
                {image && (
                  <Link href={getPostHref(post)} className="blog-card-media">
                    <BlogImage image={image} title={post.title} />
                  </Link>
                )}
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span className="blog-topic">{getTopic(post)}</span>
                    {formatDate(post.date) && <time dateTime={post.date}>{formatDate(post.date)}</time>}
                  </div>
                  <h3>
                    <Link href={getPostHref(post)}>{post.title}</Link>
                  </h3>
                  {summary && <p>{summary}</p>}
                  {getReadingTime(post) && <span className="blog-card-meta">{getReadingTime(post)}</span>}
                </div>
              </article>
            );
            })}
        </div>
      </section>
    </>
  );
};

export default Blog;
