import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const requireFromProject = createRequire(new URL('../package.json', import.meta.url));
const blogDependencies = ['gray-matter', 'remark', 'remark-html'];

const getMissingDependencies = () =>
  blogDependencies.filter((dependency) => {
    try {
      requireFromProject.resolve(dependency);
      return false;
    } catch {
      return true;
    }
  });

const missingDependencies = getMissingDependencies();
const dependencySkip = missingDependencies.length
  ? { skip: `missing installed package(s): ${missingDependencies.join(', ')}` }
  : {};

const resolveDependencyUrl = (dependency) => pathToFileURL(requireFromProject.resolve(dependency)).href;

const loadPostsModule = async () => {
  const source = readFileSync('lib/posts.js', 'utf8')
    .replace("import fs from 'fs';", "import fs from 'node:fs';")
    .replace("import path from 'path';", "import path from 'node:path';")
    .replace("import matter from 'gray-matter';", `import matter from '${resolveDependencyUrl('gray-matter')}';`)
    .replace("import { remark } from 'remark';", `import { remark } from '${resolveDependencyUrl('remark')}';`)
    .replace("import html from 'remark-html';", `import html from '${resolveDependencyUrl('remark-html')}';`);
  const tempDirectory = mkdtempSync(join(tmpdir(), 'smartclover-blog-editorial-'));
  const modulePath = join(tempDirectory, 'posts.mjs');

  writeFileSync(modulePath, source);

  return import(pathToFileURL(modulePath).href);
};

test('blog data layer source exposes the Stage 2 metadata and rendering hooks', () => {
  const source = readFileSync('lib/posts.js', 'utf8');

  for (const requiredFragment of [
    'summary,',
    'topic: inferTopic',
    'tags: normalizeList',
    'author: firstPresentString',
    'partner: firstPresentString',
    'heroImage,',
    'heroAlt,',
    'heroCaption,',
    'readingTime:',
    'href: `/blog/${slug}`',
    'contentHtml,',
    'toc,',
    'relatedPosts: getRelatedPosts(metadata)',
    "loading: 'lazy'",
    "decoding: 'async'",
    'hProperties:',
    'resolveArticleImagePath'
  ]) {
    assert.equal(source.includes(requiredFragment), true, `lib/posts.js should include ${requiredFragment}`);
  }

  assert.equal(
    source.includes('getFirstContentSummary'),
    false,
    'summaries should come from explicit metadata, not body-derived fallback text'
  );
  assert.equal(source.includes('postEditorialDefaults'), true, 'topic and thumbnail defaults should be explicit by slug');
  assert.equal(source.includes('htmlHeadingPrefix'), true, 'TOC ids should account for rendered heading prefixes');

  assert.equal(
    source.includes('content,\n        ...data'),
    false,
    'getSortedPostsData should not retain the legacy raw Markdown body return shape'
  );
});

test('getSortedPostsData returns normalized listing-safe metadata', dependencySkip, async () => {
  const { getSortedPostsData } = await loadPostsModule();
  const posts = getSortedPostsData();

  assert.ok(posts.length >= 1, 'expected Markdown posts to be loaded');

  for (const post of posts) {
    assert.equal(Object.hasOwn(post, 'content'), false, `${post.slug} should not expose Markdown body content`);
    assert.equal(Object.hasOwn(post, 'contentHtml'), false, `${post.slug} should not expose rendered body content`);
    assert.equal(post.href, `/blog/${post.slug}`);
    assert.equal(typeof post.summary, 'string');
    assert.ok(post.summary.length > 0, `${post.slug} should have a summary`);
    assert.equal(typeof post.topic, 'string');
    assert.ok(post.topic.length > 0, `${post.slug} should have a topic`);
    assert.equal(Array.isArray(post.tags), true, `${post.slug} tags should be normalized to an array`);
    assert.equal(typeof post.author, 'string');
    assert.ok(post.author.length > 0, `${post.slug} should have an author`);
    assert.equal(typeof post.heroImage, 'string');
    assert.ok(post.heroImage.startsWith('/'), `${post.slug} should use a site-local hero image fallback`);
    assert.equal(typeof post.heroAlt, 'string');
    assert.ok(post.heroAlt.length > 0, `${post.slug} should have hero alt text`);
    assert.equal(typeof post.heroCaption, 'string');
    assert.match(post.readingTime, /^\d+ min read$/);
  }

  const nis2Post = posts.find((post) => post.slug === 'nis2compass-verifiable-cybersecurity-proof');

  assert.ok(nis2Post, 'expected NIS2COMPASS post metadata');
  assert.equal(nis2Post.partner, 'AI STM Learning SRL');
  assert.equal(nis2Post.heroImage, '/blog/images/nis2compass-blog-hero-auditor-evidence-variant-3.png');
  assert.equal(nis2Post.heroImageWidth, 1600);
  assert.equal(nis2Post.heroImageHeight, 1524);
});

test('getPostData adds heading ids, toc entries, image attributes, and related candidates', dependencySkip, async () => {
  const { getPostData } = await loadPostsModule();
  const post = await getPostData('nis2compass-verifiable-cybersecurity-proof');

  assert.equal(post.summary, post.subtitle);
  assert.equal(post.modifiedDate, '2026-06-30');
  assert.ok(post.contentHtml.includes('<h2 id="user-content-why-this-matters-now">Why This Matters Now</h2>'));
  assert.ok(post.contentHtml.includes('<h2 id="user-content-what-nis2compass-is-building">What <a href="https://www.nis2compass.eu">NIS2COMPASS</a> Is Building</h2>'));
  assert.equal(post.heroImage, '/blog/images/nis2compass-blog-hero-auditor-evidence-variant-3.png');
  assert.equal(
    post.contentHtml.includes('src="/blog/images/nis2compass-blog-hero-auditor-evidence-variant-3.png"'),
    false,
    'the article body should not repeat the hero image already rendered by the template'
  );
  assert.ok(post.contentHtml.includes('loading="lazy"'));
  assert.ok(post.contentHtml.includes('decoding="async"'));
  assert.ok(post.contentHtml.includes('width="1600"'));
  assert.ok(post.contentHtml.includes('height="900"'));
  assert.deepEqual(
    post.toc.slice(0, 3).map(({ id, depth, text }) => ({ id, depth, text })),
    [
      { id: 'user-content-why-this-matters-now', depth: 2, text: 'Why This Matters Now' },
      { id: 'user-content-what-nis2compass-is-building', depth: 2, text: 'What NIS2COMPASS Is Building' },
      {
        id: 'user-content-the-partnership-smartclover-and-ai-stm-learning',
        depth: 2,
        text: 'The Partnership: SmartClover And AI STM Learning'
      }
    ]
  );

  const heroImage = post.images.find((image) => image.src === '/blog/images/nis2compass-blog-hero-auditor-evidence-variant-3.png');

  assert.ok(heroImage, 'expected rendered image metadata for the NIS2COMPASS hero diagram');
  assert.equal(heroImage.width, 1600);
  assert.equal(heroImage.height, 1524);
  assert.equal(heroImage.type, 'png');
  assert.equal(Array.isArray(post.relatedPosts), true);

  for (const relatedPost of post.relatedPosts) {
    assert.equal(Object.hasOwn(relatedPost, 'content'), false, 'related posts should not expose Markdown body content');
    assert.equal(Object.hasOwn(relatedPost, 'contentHtml'), false, 'related posts should not expose rendered body content');
  }
});

test('TealGuard announcement renders its approved evidence-backed visual set', dependencySkip, async () => {
  const { getPostData } = await loadPostsModule();
  const post = await getPostData('tealguard-financing-contract-signed-sovereign-ai-gynecologic-oncology');
  const exactExcerpt =
    'The TealGuard financing contract is signed. Over the next 36 months, HIPERDIA and SmartClover will develop and test a sovereign AI platform for gynecologic oncology, starting from the TRL 6 position recorded for CerviGuard in the project dossier. Integration, prospective validation and TRL 9 operation are programme targets, not achieved results.';
  const evidenceImages = [
    {
      src: '/images/evidence/cerviguard/2026-08-28/cerviguard-structured-intake-demo_v1.png',
      width: 1440,
      height: 960
    },
    {
      src: '/images/evidence/cerviguard/2026-08-28/cerviguard-clinician-review-demo_v1.png',
      width: 1200,
      height: 1257
    }
  ];

  assert.equal(post.topic, 'Project Announcement');
  assert.equal(post.excerpt, exactExcerpt);
  assert.equal(post.date, '2026-08-26');
  assert.equal(post.updated, '2026-08-28');
  assert.equal(post.modifiedDate, '2026-08-28');
  assert.equal(post.author, 'Andreea Damian and the SmartClover team');
  assert.equal(post.seoImage, '/images/og/tealguard-announcement_v1.png');
  assert.deepEqual(post.tags, [
    'TealGuard',
    'Artificial Intelligence',
    'Deep Tech',
    "Women's Health",
    'Gynecologic Oncology',
    'STEP',
    'Digital Health'
  ]);
  assert.equal(post.heroImage, '/blog/tealguard-platform-modules.png');
  assert.equal(post.heroImageWidth, 1698);
  assert.equal(post.heroImageHeight, 948);
  assert.equal(
    post.contentHtml.includes('<h1 id="user-content-tealguard-is-officially-in-implementation-building-sovereign-ai-for-gynecologic-oncology">'),
    false,
    'the source title should render once through the article template'
  );
  assert.ok(post.contentHtml.startsWith('<p>On 19 August 2026'));
  assert.ok(post.contentHtml.includes('src="/blog/tealguard-deep-tech-architecture.png"'));
  assert.ok(post.contentHtml.includes('src="/blog/tealguard-impact-roadmap.png"'));
  assert.ok(post.contentHtml.includes('href="/blog/tealguard-deep-tech-architecture.png"'));
  assert.ok(post.contentHtml.includes('href="/blog/tealguard-impact-roadmap.png"'));
  assert.ok(post.contentHtml.includes('TRL6_CerviGuard.docx'));
  assert.ok(post.contentHtml.includes('https://tealguard.eu/en/baseline'));
  assert.ok(post.contentHtml.includes('https://tealguard.eu/evidence/cerviguard-baseline-manifest_v1.json'));
  assert.ok(post.contentHtml.includes('https://cerviguard.link/login'));
  assert.equal(post.contentHtml.includes('/blog/images/evidence/'), false);

  for (const expected of evidenceImages) {
    const matchingMetadata = post.images.filter((image) => image.src === expected.src);
    assert.equal(matchingMetadata.length, 1, `expected one image metadata record for ${expected.src}`);
    assert.equal(matchingMetadata[0].width, expected.width);
    assert.equal(matchingMetadata[0].height, expected.height);
    assert.equal(matchingMetadata[0].type, 'png');
    assert.ok(matchingMetadata[0].alt, `expected meaningful alt text for ${expected.src}`);
    assert.equal(post.contentHtml.split(`src="${expected.src}"`).length - 1, 1);
    assert.ok(
      post.contentHtml.includes(
        `<a class="article-figure-link" href="${expected.src}" target="_blank" rel="noopener noreferrer"`
      ),
      `expected full-size image link for ${expected.src}`
    );

    const srcIndex = post.contentHtml.indexOf(`src="${expected.src}"`);
    const imageTag = post.contentHtml.slice(post.contentHtml.lastIndexOf('<img', srcIndex), post.contentHtml.indexOf('>', srcIndex) + 1);
    assert.ok(imageTag.includes('loading="lazy"'), `expected lazy loading for ${expected.src}`);
    assert.ok(imageTag.includes('decoding="async"'), `expected async decoding for ${expected.src}`);
  }

  for (const imagePath of [
    'public/blog/tealguard-platform-modules.png',
    'public/blog/tealguard-deep-tech-architecture.png',
    'public/blog/tealguard-impact-roadmap.png',
    'public/images/tealguard/funding/eu-cofunded-ro.png',
    'public/images/tealguard/funding/guvernul-romaniei.png',
    'public/images/tealguard/funding/programul-sanatate.png',
    'public/images/og/tealguard-announcement_v1.png',
    'public/images/evidence/cerviguard/2026-08-28/cerviguard-structured-intake-demo_v1.png',
    'public/images/evidence/cerviguard/2026-08-28/cerviguard-clinician-review-demo_v1.png'
  ]) {
    assert.equal(existsSync(imagePath), true, `expected TealGuard publication asset: ${imagePath}`);
  }

  const articlePageSource = readFileSync('pages/blog/[slug].jsx', 'utf8');
  assert.ok(articlePageSource.includes('TEALGUARD_ANNOUNCEMENT_SLUG'));
  assert.ok(articlePageSource.includes('<TealGuardFundingStrip />'));
  assert.ok(articlePageSource.includes('className="article-mobile-toc"'));
  assert.ok(articlePageSource.includes('className="article-summary article-summary--main"'));
  assert.ok(articlePageSource.includes('id="article-tldr-heading">TL;DR</h2>'));
  assert.ok(articlePageSource.includes('!isTealGuardAnnouncement && summaryPoints.length > 0'));
  assert.ok(articlePageSource.includes('description && !isTealGuardAnnouncement'));
  assert.ok(
    articlePageSource.indexOf('className="article-summary article-summary--main"') <
      articlePageSource.indexOf('className="article-mobile-toc"'),
    'TealGuard TL;DR should precede the compact mobile contents disclosure'
  );
  assert.ok(articlePageSource.includes('European Regional Development Fund'));
  assert.ok(articlePageSource.includes('unoptimized'));
  assert.ok(articlePageSource.includes('post.excerpt || post.summary'));

  const articleStyles = readFileSync('styles/refactor.css', 'utf8');
  assert.ok(
    articleStyles.includes('.tealguard-article .article-layout.has-toc .article-sidebar'),
    'TealGuard should hide the narrow desktop contents rail when its article layout collapses'
  );
  assert.ok(
    articleStyles.includes('.tealguard-article .article-mobile-toc'),
    'TealGuard should expose the compact contents disclosure in the collapsed article layout'
  );

  const expectedHashes = new Map([
    ['posts/tealguard-financing-contract-signed-sovereign-ai-gynecologic-oncology.md', '9603837e2c44ddced0e70519867d052d4441ba6fc20afb178c115a46a9eeabd7'],
    ['public/blog/tealguard-platform-modules.png', 'd1d1c303b1d1af177e25550643e3992007ec3ecdf7a99dd9fd0358796503a6df'],
    ['public/blog/tealguard-deep-tech-architecture.png', '2325a92332959e2773182ff157e8f647a8fc961c05b8c603b0f7779fc3fbced6'],
    ['public/blog/tealguard-impact-roadmap.png', 'bccdccb8b0cdcfe4833099201f813c62c442607af623f0d75cd2372c5823f579'],
    ['public/images/tealguard/funding/eu-cofunded-ro.png', '93f8dd63d1bf7b6f6e2ed7ea137ff7484b10c76ed92ceb0ca76216000cf87320'],
    ['public/images/tealguard/funding/guvernul-romaniei.png', '86ea57e38b14642f75d5a9f9ee8d74d1e684cc89fb997875cb678bb53820ca42'],
    ['public/images/tealguard/funding/programul-sanatate.png', '52b9c70365dfba187fa9faeb06aa710f91fa0a08164abaf2025874b2ab3422d8'],
    ['public/images/og/tealguard-announcement_v1.png', '74b6816465268c41331f69b230d8a9302e611f386f088f7f8b436df47e6c6a6f'],
    ['public/images/evidence/cerviguard/2026-08-28/cerviguard-structured-intake-demo_v1.png', 'bc54263ff8847227e30feff84f6c2368ce711a8ed32e5062a5920b9c202a5d09'],
    ['public/images/evidence/cerviguard/2026-08-28/cerviguard-clinician-review-demo_v1.png', '451a5f6adfb5f60a24cd651517dd45790de3bd0b56a9b40210c8fafb451e4155']
  ]);

  for (const [filePath, expectedHash] of expectedHashes) {
    const actualHash = createHash('sha256').update(readFileSync(filePath)).digest('hex');
    assert.equal(actualHash, expectedHash, `expected approved TealGuard publication artifact: ${filePath}`);
  }
});

test('resolveArticleImagePath keeps local image paths explicit and rejects unsafe destinations', dependencySkip, async () => {
  const { resolveArticleImagePath } = await loadPostsModule();

  assert.equal(resolveArticleImagePath('images/example.png'), '/blog/images/example.png');
  assert.equal(resolveArticleImagePath('./images/example.png?size=small#preview'), '/blog/images/example.png?size=small#preview');
  assert.equal(resolveArticleImagePath('/images/blog/example.png'), '/images/blog/example.png');
  assert.equal(resolveArticleImagePath('https://example.com/example.png'), 'https://example.com/example.png');
  assert.equal(resolveArticleImagePath('../private/example.png'), '');
  assert.equal(resolveArticleImagePath('javascript:alert(1)'), '');
});
