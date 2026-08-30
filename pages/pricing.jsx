import Link from 'next/link';
import PageSeo from '../components/PageSeo';

const packages = [
  {
    name: 'Pilot Package',
    fit: 'Single-site or early multi-site validation with defined workflow scope.',
    includes: [
      'Core CerviGuard workspace access and onboarding guidance',
      'Initial governance and deployment planning session',
      'Qualification-to-pilot support with documented checkpoints'
    ],
    excludes: [
      'Large-scale multi-region rollout governance',
      'Integrations outside the agreed product scope'
    ]
  },
  {
    name: 'Production Package',
    fit: 'Operational rollout for organizations moving from pilot to active clinical use.',
    includes: [
      'Managed product operations and release cadence',
      'Security and compliance review checkpoints per deployment tier',
      'Structured support for adoption and operational reporting'
    ],
    excludes: [
      'Cross-enterprise contract harmonization beyond defined entities',
      'Work unrelated to SmartClover products or approved R&D programmes'
    ]
  },
  {
    name: 'Enterprise Package',
    fit: 'Multi-entity programmes with governance, security, and procurement complexity.',
    includes: [
      'Multi-team deployment governance and architecture alignment',
      'Contractual operating envelope for scale, resilience, and support',
      'Optional module planning for roadmap-aligned expansion'
    ],
    excludes: [
      'Unscoped work outside a defined product or R&D programme',
      'Public list pricing or unscoped commitments'
    ]
  }
];

const Pricing = () => (
  <>
    <PageSeo
      title="Pricing and Packaging | SmartClover"
      description="SmartClover pricing and packaging overview for B2B healthcare platform adoption, including pilot, production, and enterprise package boundaries with RFQ-only commercial policy."
      path="/pricing"
    />

    <header className="page-header">
      <span className="tagline">Pricing and Packaging</span>
      <h1>Quote-based pricing for SmartClover healthcare products</h1>
      <p>
        SmartClover operates a quote-based B2B model. Packages define delivery boundaries, onboarding scope, and
        operating responsibilities before any commercial commitment is issued.
      </p>
    </header>

    <section className="surface-card" aria-labelledby="pricing-model-heading">
      <div className="section-heading">
        <h2 id="pricing-model-heading">Commercial model summary</h2>
      </div>
      <p>
        Commercial fees are provided through a Request for Quotation (RFQ) process after scope definition. Each quotation
        is tied to a SmartClover software subscription or licence and may include product-specific onboarding, integration,
        deployment, and optional modules.
      </p>
      <p>
        SmartClover does not publish numeric list prices. Quotations are issued after the team confirms scope,
        deployment mode, governance requirements, and contractual boundaries.
      </p>
    </section>

    <section className="surface-card" aria-labelledby="package-heading">
      <div className="section-heading">
        <h2 id="package-heading">Package architecture</h2>
        <p>Each package is scoped by product functionality, deployment complexity, and governance obligations.</p>
      </div>
      <div className="feature-grid three-up">
        {packages.map((item) => (
          <article key={item.name} className="feature feature-list-card">
            <h3 className="feature-title">{item.name}</h3>
            <p className="feature-description">{item.fit}</p>
            <h4>Includes</h4>
            <ul>
              {item.includes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <h4>Out of scope by default</h4>
            <ul>
              {item.excludes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card" aria-labelledby="pricing-process-heading">
      <div className="section-heading">
        <h2 id="pricing-process-heading">How quotation issuance works</h2>
      </div>
      <ol className="ordered-list">
        <li>Qualification confirms use case, organization profile, and deployment preference.</li>
        <li>Scope definition aligns security, legal, and regulatory checkpoints.</li>
        <li>SmartClover issues a formal RFQ response and quotation package.</li>
        <li>Procurement and onboarding milestones are activated through the agreed package.</li>
      </ol>
      <div className="cta-links">
        <Link href="/how-to-buy" className="button secondary">
          Review Procurement Path
        </Link>
        <Link href="/contact" className="button primary">
          Start RFQ Qualification
        </Link>
        <Link href="/proof" className="button tertiary">
          Review Evidence Layer
        </Link>
      </div>
    </section>
  </>
);

export default Pricing;
