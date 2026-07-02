import Image from 'next/image';
import Link from 'next/link';
import DiligenceLinksSection from '../components/DiligenceLinksSection';
import PageSeo, { siteUrl } from '../components/PageSeo';
import RepoIconLinks from '../components/RepoIconLinks';

const pageTitle = 'CerviGuard | SmartClover Healthcare AI Platform';
const pageDescription =
  'CerviGuard is SmartClover\'s live cervical-screening workflow product for structured intake, AI-assisted review, and clinician-led follow-up, with draft MDR Class I self-assessment material published for review.';

const featurePillars = [
  {
    title: 'Clinical workflow',
    description:
      'Structured case intake, triage prioritization, and follow-up tracking keep screening operations consistent across distributed teams.'
  },
  {
    title: 'Draft MDR Class I self-assessment',
    description:
      'SmartClover publishes a draft MDR Class I self-assessment while keeping CerviGuard positioned as clinician-led support, not autonomous diagnosis.'
  },
  {
    title: 'Flexible delivery',
    description:
      'CerviGuard runs as a managed SaaS workspace, a private SaaS environment, or a PaaS/API integration.'
  }
];

const aiHealthcareDirections = [
  {
    title: 'Clinical analytics platform',
    description:
      'CerviGuard is the clinical analytics product for screening workflows, triage support, and follow-up.'
  },
  {
    title: 'Prevention communication and research tools',
    description:
      'Related SmartClover work extends into prevention communication, questionnaire design, and aggregated-data analysis for research teams.'
  }
];

const screenshotGallery = [
  {
    title: 'Operational dashboard',
    description:
      'The workspace overview where teams see the current case queue at a glance.',
    src: '/images/cerviguard/cerviguard-dashboard-stats_v2.png',
    alt: 'CerviGuard workspace stats strip: completed analyses, healthy patients, mid-risk and high-risk alerts.',
    width: 1228,
    height: 281
  },
  {
    title: 'New case onboarding',
    description:
      'De-identified cervical image upload and notes are captured through a guided intake flow with privacy guardrails.',
    src: '/images/cerviguard/cerviguard-add-case_v2.png',
    alt: 'CerviGuard add-case form for uploading a de-identified cervical image with clinical notes.',
    width: 933,
    height: 516
  },
  {
    title: 'Workspace sign-in',
    description:
      'The public entry to the live workspace at cerviguard.link.',
    src: '/images/cerviguard/cerviguard-login_v3.png',
    alt: 'CerviGuard sign-in page at cerviguard.link, the entry to the live workspace.',
    width: 1600,
    height: 867
  }
];

const workflowSteps = [
  {
    title: '1. Intake',
    description: 'Teams upload de-identified imagery and contextual notes through a secure case-entry workflow.'
  },
  {
    title: '2. AI processing',
    description:
      'CerviGuard records AI-assisted image signals and traceable metadata for clinical review.'
  },
  {
    title: '3. Clinical review',
    description:
      'Clinicians inspect predictions, confidence ranges, and image context before confirming next actions.'
  },
  {
    title: '4. Follow-up operations',
    description: 'Case status and history remain visible for triage queues, escalation, and longitudinal coordination.'
  }
];

const deploymentModes = [
  {
    title: 'Managed SaaS Workspace',
    description: 'SmartClover operates the platform as a managed SaaS product with secured pilot onboarding.'
  },
  {
    title: 'Private SaaS Environment',
    description:
      'Healthcare organizations can run isolated deployments with residency, policy, and governance controls.'
  },
  {
    title: 'PaaS and API Extensions',
    description:
      'Engineering teams can integrate CerviGuard workflows through PaaS interfaces and APIs.'
  }
];

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CerviGuard',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  url: `${siteUrl}/cerviguard`,
  creator: {
    '@type': 'Organization',
    name: 'SmartClover',
    url: siteUrl
  },
  description: pageDescription,
  featureList: [
    'Draft MDR Class I self-assessment material published for review',
    'Secure authentication and role-based access',
    'De-identified cervical image case intake',
    'AI-assisted image-signal review',
    'Case tracking and follow-up workflows',
    'Traceable metadata and clinician review checkpoints'
  ],
  screenshot: screenshotGallery.map((shot) => `${siteUrl}${shot.src}`),
  offers: deploymentModes.map((mode) => ({
    '@type': 'Offer',
    description: mode.description
  }))
};

const CerviGuard = () => (
  <>
    <PageSeo
      title={pageTitle}
      description={pageDescription}
      path="/cerviguard"
      image="/images/cerviguard/cerviguard-login_v3.png"
      keywords="CerviGuard, healthcare AI platform, cervical screening software, SaaS healthcare, PaaS healthcare"
      jsonLd={softwareSchema}
    />

    <header className="page-header">
      <span className="tagline">CerviGuard</span>
      <h1>CerviGuard: AI-supported cervical screening for clinical teams</h1>
      <p>
        CerviGuard is SmartClover&apos;s live product for cervical-screening teams that need structured intake,
        AI-assisted analysis, and clinician-led follow-up. The public regulatory material is a draft MDR Class I
        self-assessment, not a final approval claim.
      </p>
    </header>

    <section className="surface-card flagship-highlight cerviguard-hero" aria-labelledby="cerviguard-hero-heading">
      <div className="cerviguard-hero-copy">
        <span className="flagship-kicker">Flagship Healthcare Product</span>
        <h2 id="cerviguard-hero-heading">Built for secure cervical screening operations</h2>
        <p>
          The live product surface at{' '}
          <a href="https://cerviguard.link" target="_blank" rel="noopener noreferrer">
            cerviguard.link
          </a>{' '}
          shows a workflow from secure login to AI-assisted case review and follow-up management.
        </p>
        <div className="key-points">
          <span>Draft MDR Class I material frames CerviGuard as clinician-led support, not an autonomous decision maker.</span>
          <span>Clinicians review AI outputs before confirming follow-up actions.</span>
          <span>Role-based access and case traceability support accountable operations in regulated settings.</span>
          <span>Product delivery supports SaaS and PaaS models with deployment-specific data controls.</span>
        </div>
        <div className="cta-links">
          <a href="https://cerviguard.link" className="button primary" target="_blank" rel="noopener noreferrer">
            Open Live Product
          </a>
          <a
            href="/docs/CerviGuard_MDR_Class_I_Self_Assessment_Draft.pdf"
            className="button secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download MDR Draft PDF
          </a>
          <RepoIconLinks githubHref="https://github.com/SmartCloverAI/CerviGuard" labelPrefix="CerviGuard repository links" />
          <Link href="/contact" className="button tertiary">
            Request Product Demo
          </Link>
          <Link href="/regulatory" className="button tertiary">
            Regulatory Baseline
          </Link>
        </div>
      </div>
      <div className="cerviguard-hero-media">
        <Image
          src="/images/cerviguard/cerviguard-dashboard-stats_v2.png"
          alt="CerviGuard workspace stats strip: completed analyses, healthy patients, mid-risk and high-risk alerts."
          width={1228}
          height={281}
          sizes="(max-width: 879px) 100vw, 48vw"
          priority
        />
      </div>
    </section>

    <section className="surface-card cerviguard-gallery" aria-labelledby="cerviguard-gallery-heading">
      <div className="section-heading">
        <h2 id="cerviguard-gallery-heading">Inside the live application</h2>
        <p>
          Screens below use demo data and show public-safe workflow surfaces without patient-identifying details.
        </p>
      </div>
      <div className="cerviguard-shot-grid">
        {screenshotGallery.map((shot) => (
          <article key={shot.src} className="cerviguard-shot-card">
            <div className="cerviguard-shot-media product-visual-frame">
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes="(max-width: 879px) 100vw, 46vw"
              />
            </div>
            <div className="cerviguard-shot-meta">
              <h3>{shot.title}</h3>
              <p>{shot.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card" aria-labelledby="cerviguard-directions-heading">
      <div className="section-heading">
        <h2 id="cerviguard-directions-heading">How CerviGuard fits within the SmartClover portfolio</h2>
        <p>
          CerviGuard is the primary clinical product line, while related SmartClover work extends into prevention
          communication and research workflows.
        </p>
      </div>
      <div className="feature-grid two-up">
        {aiHealthcareDirections.map((direction) => (
          <article key={direction.title} className="feature">
            <h3 className="feature-title">{direction.title}</h3>
            <p className="feature-description">{direction.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card" aria-labelledby="cerviguard-pillars-heading">
      <div className="section-heading">
        <h2 id="cerviguard-pillars-heading">Platform highlights</h2>
        <p>CerviGuard combines clear case screens, AI result review, and deployment flexibility for healthcare teams.</p>
      </div>
      <div className="feature-grid three-up">
        {featurePillars.map((item) => (
          <article key={item.title} className="feature">
            <h3 className="feature-title">{item.title}</h3>
            <p className="feature-description">{item.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card" aria-labelledby="cerviguard-workflow-heading">
      <div className="section-heading">
        <h2 id="cerviguard-workflow-heading">Workflow from case intake to clinical follow-up</h2>
        <p>Every stage is structured for operational clarity, clinician review, and case follow-up.</p>
      </div>
      <div className="workflow-visual-frame">
        <Image
          src="/images/diagrams/cerviguard-workflow-flow_v2.png"
          alt="CerviGuard workflow from structured case intake through AI-assisted and clinician review to triage and follow-up tracking."
          width={1600}
          height={620}
          sizes="(max-width: 879px) 100vw, 72vw"
        />
      </div>
      <div className="cerviguard-flow-grid">
        {workflowSteps.map((step) => (
          <article key={step.title} className="cerviguard-flow-step">
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card" aria-labelledby="cerviguard-deployment-heading">
      <div className="section-heading">
        <h2 id="cerviguard-deployment-heading">Deployment options: managed SaaS, private SaaS, or PaaS</h2>
        <p>
          SmartClover offers CerviGuard as a product with deployment options, so teams can start with a defined
          workflow and add integrations only when scope is clear.
        </p>
      </div>
      <div className="feature-grid three-up">
        {deploymentModes.map((mode) => (
          <article key={mode.title} className="feature">
            <h3 className="feature-title">{mode.title}</h3>
            <p className="feature-description">{mode.description}</p>
          </article>
        ))}
      </div>
      <div className="cta-links">
        <Link href="/pricing" className="button secondary">
          Pricing and Packaging
        </Link>
        <Link href="/how-to-buy" className="button secondary">
          How to Buy
        </Link>
        <Link href="/proof" className="button secondary">
          Proof Timeline
        </Link>
      </div>
    </section>

    <DiligenceLinksSection
      headingId="cerviguard-diligence-links"
      description="Use these routes to review pricing, buying steps, proof, regulatory context, and trust material around CerviGuard."
    />

    <section className="surface-card spotlight closing" aria-labelledby="cerviguard-cta-heading">
      <div className="spotlight-content">
        <h2 id="cerviguard-cta-heading">Need CerviGuard for your screening program?</h2>
        <p>
          SmartClover can deliver CerviGuard as a managed SaaS workspace, a private deployment, or a PaaS-integrated
          product track aligned with your healthcare operations.
        </p>
        <div className="cta-links">
          <Link href="/contact" className="button primary">
            Talk to Product Team
          </Link>
          <Link href="/products" className="button secondary">
            Review Product Portfolio
          </Link>
          <RepoIconLinks githubHref="https://github.com/SmartCloverAI/CerviGuard" labelPrefix="Technical repository links" />
        </div>
      </div>
    </section>
  </>
);

export default CerviGuard;
