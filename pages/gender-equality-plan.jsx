import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { remark } from 'remark';
import html from 'remark-html';
import PageSeo, { siteUrl } from '../components/PageSeo';

const documentPath = path.join(process.cwd(), 'docs', 'GENDER_EQUALITY_PLAN_2026_2028.md');

export const getStaticProps = async () => {
  const fileContents = fs.readFileSync(documentPath, 'utf8');
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);

  return {
    props: {
      document: {
        ...data,
        contentHtml: processedContent.toString()
      }
    }
  };
};

const GenderEqualityPlan = ({ document }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: document.title,
    url: `${siteUrl}${document.canonicalPath}`,
    description: document.description,
    inLanguage: 'en',
    datePublished: document.effectiveDate,
    dateModified: document.effectiveDate,
    publisher: {
      '@type': 'Organization',
      name: 'SmartClover',
      url: siteUrl
    },
    creator: {
      '@type': 'Person',
      name: document.signatoryName,
      jobTitle: document.signatoryTitle
    }
  };

  return (
    <>
      <PageSeo
        title={`${document.title} | SmartClover`}
        description={document.description}
        path={document.canonicalPath}
        jsonLd={jsonLd}
      />

      <header className="page-header">
        <span className="tagline">Governance</span>
        <h1>{document.title}</h1>
        <p>
          SmartClover publishes this Gender Equality Plan as a public management commitment covering governance,
          monitoring, training, inclusive recruitment, work-life balance, and measures against gender-based violence and
          sexual harassment.
        </p>
      </header>

      <section className="surface-card" aria-labelledby="gep-status-heading">
        <div className="status-badge-list" id="gep-status-heading">
          <span className="status-badge">Document status: {document.status}</span>
          <span className="status-badge">Plan period: {document.planPeriod}</span>
          <span className="status-badge">Approved by: {document.signatoryName}, {document.signatoryTitle}</span>
        </div>
        <p>
          Canonical route: <strong>{document.canonicalPath}</strong>. Short route: <strong>{document.shortPath}</strong>.
          The downloadable PDF below is generated from the same source document used by this page.
        </p>
        <div className="cta-links">
          <a href={document.pdfPath} className="button secondary" target="_blank" rel="noopener noreferrer">
            Download GEP PDF
          </a>
          <Link href="/trust" className="button tertiary">
            Open Trust Center
          </Link>
          <Link href="/about" className="button tertiary">
            Review Company Context
          </Link>
        </div>
      </section>

      <article className="surface-card">
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{
            __html: document.contentHtml
          }}
        />
      </article>
    </>
  );
};

export default GenderEqualityPlan;
