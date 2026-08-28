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
  const romanianTealGuardPost = posts.find(
    (post) => post.slug === 'tealguard-intra-oficial-in-implementare-inteligenta-artificiala-suverana-oncologie-ginecologica'
  );

  assert.ok(nis2Post, 'expected NIS2COMPASS post metadata');
  assert.equal(romanianTealGuardPost, undefined, 'the Romanian translation should not be mixed into the English blog index');
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

test('TealGuard announcement renders the operator-approved article, project links, and visual set', dependencySkip, async () => {
  const { getPostData } = await loadPostsModule();
  const post = await getPostData('tealguard-financing-contract-signed-sovereign-ai-gynecologic-oncology');
  const exactExcerpt =
    "The financing contract is signed. TealGuard now advances from SmartClover's publicly accessible CerviGuard TRL 6 prototype toward a clinically validated, interoperable and production-ready TRL 9 platform for gynecologic oncology.";
  const articleImages = [
    {
      src: '/blog/cerviguard-trl6-dashboard.png',
      width: 1800,
      height: 1220,
      renderedInBody: false
    },
    {
      src: '/blog/cerviguard-trl6-workflow.png',
      width: 2200,
      height: 1420,
      renderedInBody: true
    },
    {
      src: '/blog/tealguard-deep-tech-architecture.png',
      width: 1857,
      height: 948,
      renderedInBody: true
    }
  ];

  assert.equal(post.topic, 'Project Announcement');
  assert.equal(post.excerpt, exactExcerpt);
  assert.equal(post.date, '2026-08-26');
  assert.equal(post.updated, '2026-08-28');
  assert.equal(post.modifiedDate, '2026-08-28');
  assert.equal(post.language, 'en');
  assert.equal(post.translation_group, 'tealguard-announcement');
  assert.equal(post.translation_en_slug, 'tealguard-financing-contract-signed-sovereign-ai-gynecologic-oncology');
  assert.equal(
    post.translation_ro_slug,
    'tealguard-intra-oficial-in-implementare-inteligenta-artificiala-suverana-oncologie-ginecologica'
  );
  assert.equal(post.author, 'Andreea Damian and the SmartClover team');
  assert.equal(post.tldr_project_website, 'https://tealguard.eu');
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
  assert.equal(post.heroImage, '/blog/cerviguard-trl6-dashboard.png');
  assert.equal(post.heroImageWidth, 1800);
  assert.equal(post.heroImageHeight, 1220);
  assert.equal(post.heroAlt, 'CerviGuard TRL 6 public pilot dashboard');
  assert.equal(
    post.contentHtml.includes('<h1 id="user-content-tealguard-is-officially-in-implementation-building-sovereign-ai-for-gynecologic-oncology">'),
    false,
    'the source title should render once through the article template'
  );
  assert.ok(post.contentHtml.startsWith('<p>On 19 August 2026'));
  assert.equal(
    post.contentHtml.includes('src="/blog/cerviguard-trl6-dashboard.png"'),
    false,
    'the article body should not repeat the supplied cover image already rendered by the template'
  );
  assert.ok(post.contentHtml.includes('src="/blog/cerviguard-trl6-workflow.png"'));
  assert.ok(post.contentHtml.includes('src="/blog/tealguard-deep-tech-architecture.png"'));
  assert.ok(post.contentHtml.includes('href="/blog/cerviguard-trl6-workflow.png"'));
  assert.ok(post.contentHtml.includes('href="/blog/tealguard-deep-tech-architecture.png"'));
  assert.ok(post.contentHtml.includes('https://cerviguard.link'));
  assert.equal(post.contentHtml.split('href="https://tealguard.eu"').length - 1, 1);
  assert.ok(post.contentHtml.includes('More information and project updates are available'));
  assert.ok(post.contentHtml.includes('https://www.who.int/initiatives/cervical-cancer-elimination-initiative'));
  assert.ok(post.contentHtml.includes('Development-status notice'));
  assert.equal(post.contentHtml.includes('/blog/images/evidence/'), false);

  for (const expected of articleImages) {
    const matchingMetadata = post.images.filter((image) => image.src === expected.src);
    assert.equal(matchingMetadata.length, 1, `expected one image metadata record for ${expected.src}`);
    assert.equal(matchingMetadata[0].width, expected.width);
    assert.equal(matchingMetadata[0].height, expected.height);
    assert.equal(matchingMetadata[0].type, 'png');
    assert.ok(matchingMetadata[0].alt, `expected meaningful alt text for ${expected.src}`);

    if (!expected.renderedInBody) {
      assert.equal(post.contentHtml.split(`src="${expected.src}"`).length - 1, 0);
      continue;
    }

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
    'public/blog/cerviguard-trl6-dashboard.png',
    'public/blog/cerviguard-trl6-workflow.png',
    'public/blog/tealguard-platform-modules.png',
    'public/blog/tealguard-deep-tech-architecture.png',
    'public/blog/tealguard-impact-roadmap.png',
    'public/images/tealguard/funding/eu-cofunded-ro.png',
    'public/images/tealguard/funding/guvernul-romaniei.png',
    'public/images/tealguard/funding/programul-sanatate.png',
    'public/images/og/tealguard-announcement_v1.png'
  ]) {
    assert.equal(existsSync(imagePath), true, `expected TealGuard publication asset: ${imagePath}`);
  }

  const articlePageSource = readFileSync('pages/blog/[slug].jsx', 'utf8');
  assert.ok(articlePageSource.includes('TEALGUARD_TRANSLATION_GROUP'));
  assert.ok(articlePageSource.includes('<TealGuardFundingStrip language={language} />'));
  assert.ok(articlePageSource.includes('className="article-mobile-toc"'));
  assert.ok(articlePageSource.includes('className="article-summary article-summary--main"'));
  assert.ok(articlePageSource.includes('id="article-tldr-heading">TL;DR</h2>'));
  assert.ok(articlePageSource.includes('post.tldr_project_website'));
  assert.ok(articlePageSource.includes('More information can be found on the official TealGuard project website'));
  assert.ok(articlePageSource.includes('Mai multe informații sunt disponibile pe site-ul oficial al proiectului TealGuard'));
  assert.ok(articlePageSource.includes('className="article-language-switcher"'));
  assert.ok(articlePageSource.includes('hrefLang={item.code}'));
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

  const cerviGuardPageSource = readFileSync('pages/cerviguard.jsx', 'utf8');
  const homePageSource = readFileSync('pages/index.jsx', 'utf8');
  const layoutSource = readFileSync('components/Layout.jsx', 'utf8');

  assert.ok(cerviGuardPageSource.includes('Visit the TealGuard project website'));
  assert.ok(cerviGuardPageSource.includes('/blog/tealguard-financing-contract-signed-sovereign-ai-gynecologic-oncology'));
  assert.ok(homePageSource.includes('Official project information, objectives, partners, evidence, and updates.'));
  assert.ok(layoutSource.includes("{ label: 'TealGuard project website', href: 'https://tealguard.eu', external: true }"));

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
    ['posts/tealguard-financing-contract-signed-sovereign-ai-gynecologic-oncology.md', '24f478c0cc97d3e493bfd37fd73ba5e064fd7cbe8b468a10de449802d6fffe5b'],
    ['public/blog/cerviguard-trl6-dashboard.png', 'bd4bd260e505b569af7fdcc97d38971fdd3e8cb281968b159c9fff85a94ddfa3'],
    ['public/blog/cerviguard-trl6-workflow.png', '2760f734f6177f13f2698773ca1e22029f11b65f3be893d3d01bea56a9e422f7'],
    ['public/blog/tealguard-platform-modules.png', 'd1d1c303b1d1af177e25550643e3992007ec3ecdf7a99dd9fd0358796503a6df'],
    ['public/blog/tealguard-deep-tech-architecture.png', '2325a92332959e2773182ff157e8f647a8fc961c05b8c603b0f7779fc3fbced6'],
    ['public/blog/tealguard-impact-roadmap.png', 'bccdccb8b0cdcfe4833099201f813c62c442607af623f0d75cd2372c5823f579'],
    ['public/images/tealguard/funding/eu-cofunded-ro.png', '93f8dd63d1bf7b6f6e2ed7ea137ff7484b10c76ed92ceb0ca76216000cf87320'],
    ['public/images/tealguard/funding/guvernul-romaniei.png', '86ea57e38b14642f75d5a9f9ee8d74d1e684cc89fb997875cb678bb53820ca42'],
    ['public/images/tealguard/funding/programul-sanatate.png', '52b9c70365dfba187fa9faeb06aa710f91fa0a08164abaf2025874b2ab3422d8'],
    ['public/images/og/tealguard-announcement_v1.png', '74b6816465268c41331f69b230d8a9302e611f386f088f7f8b436df47e6c6a6f']
  ]);

  for (const [filePath, expectedHash] of expectedHashes) {
    const actualHash = createHash('sha256').update(readFileSync(filePath)).digest('hex');
    assert.equal(actualHash, expectedHash, `expected approved TealGuard publication artifact: ${filePath}`);
  }
});

test('Romanian TealGuard announcement is complete, localized, and paired with the English article', dependencySkip, async () => {
  const { getAllPostSlugs, getPostData } = await loadPostsModule();
  const slug = 'tealguard-intra-oficial-in-implementare-inteligenta-artificiala-suverana-oncologie-ginecologica';
  const post = await getPostData(slug);
  const exactExcerpt =
    'Contractul de finanțare a fost semnat. TealGuard trece de la prototipul CerviGuard TRL 6, disponibil public, către o platformă TRL 9 pentru oncologie ginecologică, validată clinic, interoperabilă și pregătită pentru operare în producție.';

  assert.equal(post.title, 'TealGuard intră oficial în implementare: construim inteligență artificială suverană pentru oncologie ginecologică');
  assert.equal(post.language, 'ro');
  assert.equal(post.translation_group, 'tealguard-announcement');
  assert.equal(post.translation_en_slug, 'tealguard-financing-contract-signed-sovereign-ai-gynecologic-oncology');
  assert.equal(post.translation_ro_slug, slug);
  assert.equal(post.exclude_from_index, true);
  assert.equal(post.hide_related, true);
  assert.equal(post.topic, 'Anunț de proiect');
  assert.equal(post.author, 'Andreea Damian și echipa SmartClover');
  assert.equal(post.excerpt, exactExcerpt);
  assert.equal(post.date, '2026-08-26');
  assert.equal(post.updated, '2026-08-28');
  assert.equal(post.tldr_project_website, 'https://tealguard.eu');
  assert.ok(getAllPostSlugs().some((item) => item.params.slug === slug), 'the Romanian article route should be statically generated');

  assert.ok(post.contentHtml.startsWith('<p>La 19 august 2026'));
  assert.equal(post.contentHtml.includes('<h1'), false, 'the translated source title should render only through the page template');
  assert.ok(post.contentHtml.includes('TealGuard — Intelligent platform for personalised management in gynecologic oncology'));
  assert.ok(post.contentHtml.includes('HIPERDIA SA'));
  assert.ok(post.contentHtml.includes('SmartClover SRL'));
  assert.ok(post.contentHtml.includes('108809/19.08.2026'));
  assert.ok(post.contentHtml.includes('358561'));
  assert.ok(post.contentHtml.includes('17.618.140,27 RON'));
  assert.ok(post.contentHtml.includes('17.355.115,27 RON'));
  assert.ok(post.contentHtml.includes('11.297.237,07 RON'));
  assert.ok(post.contentHtml.includes('<strong>100–200 de femei</strong>'));
  assert.ok(post.contentHtml.includes('<strong>1.000 de femei asistate</strong>'));
  assert.ok(post.contentHtml.includes('<strong>patru aplicații edge</strong>'));
  assert.ok(post.contentHtml.includes('<strong>10 locuri de muncă echivalent normă întreagă</strong>'));
  assert.ok(post.contentHtml.includes('două seturi de date publice, două modele cu ponderi deschise și două publicații cu acces liber'));
  assert.ok(post.contentHtml.includes('Niciunul nu este prezentat aici ca dispozitiv medical certificat'));
  assert.ok(post.contentHtml.includes('nu înlocuiește sfatul medical profesionist'));
  assert.ok(post.contentHtml.includes('https://www.who.int/initiatives/cervical-cancer-elimination-initiative'));
  assert.ok(post.contentHtml.includes('href="https://tealguard.eu"'));

  for (const imagePath of [
    '/blog/cerviguard-trl6-dashboard.png',
    '/blog/cerviguard-trl6-workflow.png',
    '/blog/tealguard-deep-tech-architecture.png'
  ]) {
    assert.equal(post.images.filter((image) => image.src === imagePath).length, 1, `expected translated image metadata for ${imagePath}`);
  }

  assert.equal(post.contentHtml.includes('src="/blog/cerviguard-trl6-dashboard.png"'), false);
  assert.ok(post.contentHtml.includes('href="/blog/cerviguard-trl6-workflow.png"'));
  assert.ok(post.contentHtml.includes('href="/blog/tealguard-deep-tech-architecture.png"'));
  assert.ok(post.toc.some((item) => item.text === 'De ce există TealGuard'));
  assert.ok(post.toc.some((item) => item.text === 'Informații despre proiect și finanțare'));

  const pageSource = readFileSync('pages/blog/[slug].jsx', 'utf8');
  const seoSource = readFileSync('components/PageSeo.jsx', 'utf8');
  const documentSource = readFileSync('pages/_document.jsx', 'utf8');

  for (const localizedLabel of [
    'Blogul SmartClover',
    'Autor',
    'Publicat',
    'Actualizat',
    'Timp de lectură',
    'Cuprins',
    'Înapoi la noutățile TealGuard'
  ]) {
    assert.ok(pageSource.includes(localizedLabel), `expected Romanian article chrome: ${localizedLabel}`);
  }

  assert.ok(pageSource.includes("{ hrefLang: 'x-default', href: `/blog/${post.translation_en_slug}` }"));
  assert.ok(pageSource.includes('post.hide_related !== true'));
  assert.ok(seoSource.includes('og:locale'));
  assert.ok(seoSource.includes('hrefLang={alternate.hrefLang}'));
  assert.ok(documentSource.includes("post?.language === 'ro' ? 'ro' : 'en'"));

  const translationHash = createHash('sha256')
    .update(readFileSync(`posts/${slug}.md`))
    .digest('hex');
  assert.equal(translationHash, 'd0452aa9abb909a1900c729ab0fbc89ec2783a427b63d9e07bf7eed69debefe5');
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
