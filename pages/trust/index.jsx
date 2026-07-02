import Link from 'next/link';
import PageSeo from '../../components/PageSeo';

const trustRoutes = [
  {
    href: '/trust/privacy-policy',
    title: 'Privacy Policy',
    cta: 'Open privacy policy',
    description: 'Data categories, lawful basis, retention, and data-subject rights workflow.'
  },
  {
    href: '/trust/terms-of-service',
    title: 'Terms of Service',
    cta: 'Open Terms of Service',
    description: 'Service boundaries, customer obligations, support model, and liability framing.'
  },
  {
    href: '/trust/data-processing',
    title: 'Data Processing',
    cta: 'Open data processing',
    description: 'GDPR role model by deployment mode and processor/controller posture notes.'
  },
  {
    href: '/trust/security',
    title: 'Security Overview',
    cta: 'Open security overview',
    description: 'Permissioned access, encryption, traceability, and disclosure boundaries.'
  },
  {
    href: '/trust/incident-response',
    title: 'Incident Response',
    cta: 'Open incident response',
    description: 'Severity model, response lifecycle, and corrective-action governance.'
  },
  {
    href: '/gender-equality-plan',
    title: 'Gender Equality Plan',
    cta: 'Open Gender Equality Plan',
    description: 'Public GEP covering governance, monitoring, training, inclusive recruitment, and anti-harassment measures.'
  }
];

const reviewAreas = [
  {
    href: '/proof',
    title: 'Product proof',
    cta: 'Review product proof',
    description:
      'CerviGuard live workspace, public implementation context, screenshots, draft MDR artifact, and KPI publication limits.'
  },
  {
    href: '/regulatory',
    title: 'Regulatory posture',
    cta: 'Review regulatory posture',
    description:
      'Draft MDR Class I self-assessment context, intended-use boundaries, pending identifiers, and publication limits.'
  },
  {
    href: '/trust/security',
    title: 'Security, privacy, and data processing',
    cta: 'Review trust controls',
    description:
      'Security baseline, privacy policy, data-processing role model, retention notes, and RFQ-specific responsibility split.'
  },
  {
    href: '/trust/incident-response',
    title: 'Incident response',
    cta: 'Review response plan',
    description:
      'Severity model, response lifecycle, corrective-action flow, and communication boundaries for review conversations.'
  },
  {
    href: '/cloud-architecture',
    title: 'Permissioned cloud-on-edge architecture',
    cta: 'Review architecture',
    description:
      'Provider-neutral deployment boundary, deployment-specific encryption controls, local/edge responsibilities, and traceable deployment records.'
  },
  {
    href: '/cybersecurity',
    title: 'Healthcare cybersecurity and resilience',
    cta: 'Review resilience services',
    description:
      'Healthcare-focused security assessment, partner-product context, and engineering workflows under authorized oversight.'
  },
  {
    href: '/services',
    title: 'Services and RFQ path',
    cta: 'Review services',
    description:
      'CerviGuard product context, DataGems research workflow scope, cloud/cybersecurity services, and qualification next steps.'
  }
];

const proofMapNodes = [
  'CerviGuard product artifacts',
  'Draft regulatory material',
  'Security and privacy baseline',
  'Cloud-on-edge boundary',
  'Review or RFQ conversation'
];

const verifyTodayLinks = [
  { href: '/proof', title: 'Product proof', cta: 'Open product proof' },
  { href: '/regulatory', title: 'Draft regulatory material', cta: 'Open regulatory posture' },
  { href: '/trust/security', title: 'Security baseline', cta: 'Open security baseline' },
  { href: '/trust/incident-response', title: 'Incident response plan', cta: 'Open incident response' },
  { href: '/gender-equality-plan', title: 'Gender Equality Plan', cta: 'Open Gender Equality Plan' }
];

const TrustCenter = () => (
  <>
    <PageSeo
      title="Trust Center | SmartClover"
      description="SmartClover diligence center for healthcare AI product proof, regulatory posture, security, privacy, cloud-on-edge architecture, and review routes."
      path="/trust"
    />

    <header className="page-header">
      <span className="tagline">Healthcare AI diligence center</span>
      <h1>Trust center for product, regulatory, and security review</h1>
      <p>
        Start here when reviewing SmartClover for product proof, regulatory posture, security, privacy, data processing,
        architecture, and healthcare cybersecurity scope. Draft labels remain visible where final review is still in
        progress.
      </p>
    </header>

    <section className="surface-card" aria-labelledby="trust-verify-heading">
      <div className="section-heading">
        <h2 id="trust-verify-heading">What you can verify today</h2>
        <p>Direct links to the pages and documents this center already covers.</p>
      </div>
      <div className="feature-grid three-up">
        <article className="feature">
          <h3 className="feature-title">One-page review brief</h3>
          <a href="/docs/SmartClover_1pagepitchdeck.pdf" className="button secondary" target="_blank" rel="noopener noreferrer">
            Open review brief (PDF)
          </a>
        </article>
        {verifyTodayLinks.map((item) => (
          <article key={`${item.href}-verify`} className="feature">
            <h3 className="feature-title">{item.title}</h3>
            <Link href={item.href} className="button secondary" aria-label={item.cta}>
              {item.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card" aria-labelledby="trust-status-heading">
      <div className="status-badge-list" id="trust-status-heading">
        <span className="status-badge">Document status: Draft set for legal/privacy/security review</span>
        <span className="status-badge">Policy draft set updated: 2026-02-17</span>
        <span className="status-badge">Page reviewed: 2026-07-01</span>
        <span className="status-badge">Owner: Legal + Privacy + Security</span>
      </div>
      <p>
        Detailed pages cover the underlying proof, regulatory, security, and policy material. Final policy text and
        contractual roles are confirmed during RFQ onboarding.
      </p>
    </section>

    <section className="surface-card trust-review-panel" aria-labelledby="trust-review-heading">
      <div className="section-heading">
        <h2 id="trust-review-heading">What reviewers can check from this center</h2>
        <p>
          The review path starts with product proof, then moves into regulatory posture, trust controls, deployment
          boundaries, permissioned cloud-on-edge architecture, healthcare cybersecurity and resilience, incident
          response, and contact routing. Use the policy routes for security, privacy, and data processing details before
          RFQ-specific responsibility mapping.
        </p>
      </div>
      <div className="feature-grid three-up">
        <article className="feature">
          <h3 className="feature-title">One-page review brief</h3>
          <p className="feature-description">
            A compact PDF summary for first-pass commercial, investor, and procurement review.
          </p>
          <a href="/docs/SmartClover_1pagepitchdeck.pdf" className="button secondary" target="_blank" rel="noopener noreferrer">
            Download review brief
          </a>
        </article>
        {reviewAreas.map((route) => (
          <article key={route.href} className="feature">
            <h3 className="feature-title">{route.title}</h3>
            <p className="feature-description">{route.description}</p>
            <Link href={route.href} className="button secondary" aria-label={route.cta}>
              {route.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card trust-proof-map" aria-labelledby="trust-proof-map-heading">
      <div className="section-heading">
        <h2 id="trust-proof-map-heading">Review flow before a qualification call</h2>
        <p>
          The proof map keeps CerviGuard artifacts, draft regulatory material, trust controls, architecture boundaries,
          and the contact path in one sequence.
        </p>
      </div>
      <div className="trust-proof-rail" aria-label="SmartClover review flow">
        {proofMapNodes.map((node, index) => (
          <div key={node} className="trust-proof-node">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{node}</strong>
          </div>
        ))}
      </div>
      <div className="cta-links">
        <Link href="/proof" className="button secondary">
          Product Proof
        </Link>
        <Link href="/regulatory" className="button secondary">
          Regulatory Posture
        </Link>
        <Link href="/contact#inquiry-form" className="button primary">
          Ask Trust Questions
        </Link>
      </div>
    </section>

    <section className="surface-card" aria-labelledby="trust-docs-heading">
      <div className="section-heading">
        <h2 id="trust-docs-heading">Policy and control documents</h2>
        <p>
          These baseline pages support privacy, terms, data-processing, security, incident-response, and public GEP
          review. Draft pages are labeled as draft.
        </p>
      </div>
      <div className="feature-grid three-up">
        {trustRoutes.map((route) => (
          <article key={route.href} className="feature">
            <h3 className="feature-title">{route.title}</h3>
            <p className="feature-description">{route.description}</p>
            <Link href={route.href} className="button secondary" aria-label={route.cta}>
              {route.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card" aria-labelledby="consent-heading">
      <div className="section-heading">
        <h2 id="consent-heading">Analytics and consent transparency</h2>
      </div>
      <p>
        SmartClover only enables optional analytics after explicit user consent. Preferences can be changed at any time
        through the site-level cookie settings control.
      </p>
      <div className="cta-links">
        <Link href="/trust/privacy-policy" className="button secondary">
          Review Privacy Policy
        </Link>
        <Link href="/contact" className="button primary">
          Ask Trust Questions
        </Link>
      </div>
    </section>
  </>
);

export default TrustCenter;
