import Image from 'next/image';
import Link from 'next/link';
import DiligenceLinksSection from '../components/DiligenceLinksSection';
import PageSeo from '../components/PageSeo';

const portfolioTracks = [
  {
    status: 'Flagship product',
    title: 'CerviGuard clinical platform',
    description:
      'Cervical-screening workflow product with draft MDR Class I self-assessment material and clinician-reviewed AI outputs.'
  },
  {
    status: 'Live product',
    title: 'DataGems synthetic-data workspace',
    description:
      'Synthetic-data research workspace for schema drafting, configured generation jobs, peer-level status, and JSON/CSV exports.'
  },
  {
    status: 'Platform capability',
    title: 'Privacy-preserving cloud-on-edge deployment',
    description:
      'Product deployments support tenant boundaries, encryption controls, edge/on-premise execution, and traceable release records.'
  },
  {
    status: 'Approved R&D programme',
    title: 'TealGuard: CerviGuard from TRL 6 toward TRL 9',
    description:
      'Led by HIPERDIA/Affidea with SmartClover as the AI and software R&D partner, TealGuard develops ColVisionAI, NavigatorAI, Follow-upAI, and EcoAI for multi-site validation and productization.'
  }
];

const healthcareDirections = [
  {
    title: 'Clinical analytics products',
    description:
      'Imaging and structured-data inferential/predictive analytics for screening, triage support, and follow-up coordination.'
  },
  {
    title: 'Research and communication tools',
    description:
      'Tools for prevention communication, qualitative questionnaire design, synthetic-data research, and aggregated insight analysis.'
  }
];

const dataGemsHighlights = [
  {
    title: 'Distributed generation workflow',
    description:
      'DataGems can run configured generation jobs across distributed nodes in scoped research environments, with reviewable job status and exports.'
  },
  {
    title: 'Internal and external inference options',
    description:
      'DataGems can use its internal inference path or saved external inference profiles when a scoped research workflow needs a different model.'
  }
];

const dataGemsShots = [
  {
    src: '/images/datagems/datagems-job-form_v2.png',
    width: 883,
    height: 506,
    alt: 'DataGems create-a-generation-job form with schema-first workflow.',
    title: 'Generation job setup',
    description: 'Job drafting flow with schema guidance, instruction fields, and configured generation controls.'
  },
  {
    src: '/images/datagems/datagems-dashboard_v2.png',
    width: 883,
    height: 410,
    alt: 'DataGems dashboard with job and record counters, shown with public-safe sample data.',
    title: 'Dashboard metrics',
    description: 'Operational overview for generated records, running jobs, failure counts, and last job timing.'
  }
];

const cerviGuardProofLinks = [
  {
    href: 'https://cerviguard.link',
    title: 'Live CerviGuard workspace',
    description: 'The authenticated live workspace, shown with public-safe sample data.'
  },
  {
    href: 'https://github.com/SmartCloverAI/CerviGuard',
    title: 'Public implementation repository',
    description: 'Source-level context for product reviewers and technical partners.'
  },
  {
    href: '/docs/CerviGuard_MDR_Class_I_Self_Assessment_Draft.pdf',
    title: 'Draft MDR Class I self-assessment',
    description: 'Regulatory-positioning material published as a draft review artifact.'
  },
  {
    href: '/proof',
    title: 'Product evidence baseline',
    description: 'Current milestones, evidence limits, and pending KPI publication context.'
  }
];

const cerviGuardProofShots = [
  {
    src: '/images/cerviguard/cerviguard-case-history_v1.png',
    width: 1600,
    height: 1114,
    alt: 'CerviGuard case history table with pseudonymous case IDs, analysis status, and TZ and lesion classifications.',
    title: 'Case history',
    description: 'Every submitted case with its analysis status and classification, from the demo workspace.'
  },
  {
    src: '/images/cerviguard/cerviguard-add-case_v3.png',
    width: 864,
    height: 528,
    alt: 'CerviGuard add-case form for uploading a de-identified cervical image with clinical notes.',
    title: 'Case intake',
    description: 'Guided intake flow for de-identified cervical-screening material and review notes.'
  },
  {
    src: '/images/diagrams/cerviguard-workflow-flow_v2.png',
    width: 1600,
    height: 620,
    alt: 'CerviGuard workflow from structured case intake through AI-assisted and clinician review to triage and follow-up tracking.',
    title: 'Workflow model',
    description: 'From a new case through AI-assisted review to the clinician sign-off and follow-up plan.'
  }
];

const Products = () => (
  <>
    <PageSeo
      title="Products | SmartClover"
      description="SmartClover develops CerviGuard and DataGems, with TealGuard and NIS2COMPASS advancing clinical AI, synthetic data, privacy-preserving deployment, cybersecurity, and future products."
      path="/products"
      image="/images/cerviguard/cerviguard-dashboard-live_v1.png"
    />

    <header className="page-header">
      <span className="tagline">Products</span>
      <h1>Product portfolio led by CerviGuard</h1>
      <p>
        SmartClover develops and owns two proprietary software products: CerviGuard and DataGems. Applied research through
        TealGuard and NIS2COMPASS advances clinical AI, synthetic data, privacy-preserving deployment, cybersecurity, and
        future products.
      </p>
      <div className="cta-links">
        <Link href="/cerviguard" className="button primary">
          Open CerviGuard
        </Link>
        <Link href="#products-more-links" className="button secondary">
          Review product routes
        </Link>
        <Link href="/contact" className="button tertiary">
          Contact
        </Link>
      </div>
    </header>

    <section className="surface-card product-proof-lead" aria-labelledby="products-cerviguard-proof-heading">
      <div className="section-heading">
        <span className="flagship-kicker">Flagship product proof</span>
        <h2 id="products-cerviguard-proof-heading">CerviGuard leads the product portfolio</h2>
        <p>
          CerviGuard is the product path buyers should inspect first: a live workspace, current workflow screenshots,
          a public implementation repository, and draft regulatory material are available before qualification.
        </p>
      </div>

      <div className="product-proof-grid">
        <div className="visual-frame product-visual-frame">
          <Image
            src="/images/cerviguard/cerviguard-dashboard-live_v1.png"
            alt="CerviGuard dashboard with completed-analysis counters and the recent-cases queue from the demo workspace."
            width={1600}
            height={890}
            sizes="(max-width: 879px) 100vw, 44vw"
            priority
          />
        </div>
        <div className="proof-link-grid">
          {cerviGuardProofLinks.map((item) => {
            const isExternal = item.href.startsWith('http');

            return (
              <a
                key={item.href}
                href={item.href}
                className="proof-link-card"
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
              >
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="product-shot-grid">
        {cerviGuardProofShots.map((shot) => (
          <article key={shot.src} className="product-shot-card">
            <div className="product-shot-media product-visual-frame">
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes="(max-width: 879px) 100vw, 31vw"
              />
            </div>
            <div className="product-shot-meta">
              <h3>{shot.title}</h3>
              <p>{shot.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card" aria-labelledby="products-directions-heading">
      <div className="section-heading">
        <h2 id="products-directions-heading">Two directions in our healthcare AI work</h2>
      </div>
      <div className="feature-grid two-up">
        {healthcareDirections.map((direction) => (
          <article key={direction.title} className="feature">
            <h3 className="feature-title">{direction.title}</h3>
            <p className="feature-description">{direction.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card flagship-highlight" aria-labelledby="products-portfolio-heading">
      <div className="section-heading">
        <span className="flagship-kicker">Offer map</span>
        <h2 id="products-portfolio-heading">Products and applied R&amp;D programmes</h2>
      </div>
      <div className="service-programs">
        {portfolioTracks.map((track) => (
          <article key={track.title} className="service-program">
            <p className="kicker">{track.status}</p>
            <h3>{track.title}</h3>
            <p>{track.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card datagems-spotlight" aria-labelledby="products-datagems-heading">
      <div className="section-heading">
        <span className="flagship-kicker">Live product</span>
        <h2 id="products-datagems-heading">DataGems research track in practice</h2>
        <p>
          DataGems helps research and data teams shape synthetic-data workflows, test schemas, track generation jobs,
          and export reviewable results across distributed environments. We discuss inference configuration, job design,
          and output review with research and data partners.
        </p>
      </div>
      <div className="cta-links">
        <a href="https://datagems.app" className="button primary" target="_blank" rel="noopener noreferrer">
          Open DataGems
        </a>
        <a
          href="https://github.com/SmartCloverAI/DataGems"
          className="icon-link-button"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open DataGems GitHub repository"
          title="Open DataGems GitHub repository"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.24.49-2.71-1.08-2.71-1.08-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.8.06 1.23.82 1.23.82.72 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.79-.2-3.67-.89-3.67-3.96 0-.87.31-1.58.82-2.13-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.81a7.6 7.6 0 0 1 4 0c1.53-1.02 2.2-.81 2.2-.81.44 1.1.16 1.92.08 2.12.51.55.82 1.26.82 2.13 0 3.08-1.89 3.76-3.69 3.96.29.25.55.74.55 1.5l-.01 2.22c0 .21.14.45.55.38A8 8 0 0 0 8 0Z" />
          </svg>
        </a>
      </div>
      <div className="feature-grid two-up datagems-card-grid">
        {dataGemsHighlights.map((item) => (
          <article key={item.title} className="feature">
            <h3 className="feature-title">{item.title}</h3>
            <p className="feature-description">{item.description}</p>
          </article>
        ))}
      </div>
      <div className="datagems-shot-grid">
        {dataGemsShots.map((shot) => (
          <article key={shot.src} className="datagems-shot-card">
            <div className="datagems-shot-media">
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes="(max-width: 879px) 100vw, 46vw"
              />
            </div>
            <div className="datagems-shot-meta">
              <h3>{shot.title}</h3>
              <p>{shot.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>

    <DiligenceLinksSection
      headingId="products-more-links"
      heading="Commercial and trust routes"
      description="Pricing, procurement, evidence, and trust context for the products above."
    />
  </>
);

export default Products;
