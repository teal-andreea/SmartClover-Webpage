import Image from 'next/image';
import Link from 'next/link';
import DiligenceLinksSection from '../components/DiligenceLinksSection';
import PageSeo from '../components/PageSeo';

const researchPrinciples = [
  {
    title: 'CerviGuard-led product work',
    description:
      'CerviGuard is the product we lead with: a live workspace where cervical-screening teams run case intake and AI-assisted review under clinician sign-off.'
  },
  {
    title: 'Permissioned cloud-on-edge deployment',
    description:
      'Deployment conversations can include tenant boundaries, encryption controls, edge/on-prem execution, and traceable release records.'
  },
  {
    title: 'Healthcare cybersecurity and resilience',
    description:
      'Security/resilience engagements are scoped for healthcare environments and can involve authorized/certified personnel, partner security products, and engineering support where approved.'
  }
];

const productTracks = [
  {
    title: 'CerviGuard: screening workflow product',
    description:
      'CerviGuard gives cervical-screening teams one traceable path from a new case to a signed-off follow-up decision.'
  },
  {
    title: 'DataGems: synthetic-data research track',
    description:
      'DataGems supports controlled synthetic-data research workflows that stay separate from CerviGuard commercial claims.'
  }
];

const platformCapabilities = [
  {
    status: 'Flagship product',
    title: 'CerviGuard for cervical-screening teams',
    points: [
      'Draft MDR Class I self-assessment material with clinician-led oversight',
      'Secure workflow operations for case intake, triage, and follow-up',
      'Deployment options scoped through RFQ and security/legal review'
    ]
  },
  {
    status: 'Live product',
    title: 'DataGems synthetic-data research',
    points: [
      'Controlled synthetic-data workflows for research planning',
      'Research status kept separate from clinical-product claims',
      'Partner and publication discussions scoped through research review'
    ]
  },
  {
    status: 'Platform capability',
    title: 'Permissioned cloud-on-edge deployment',
    points: [
      'Cloud-on-edge and on-prem execution options for healthcare AI workloads',
      'End-to-end encrypted sensitive flows within approved deployment models',
      'Immutable anchoring and traceable deployment records for audit and security review'
    ]
  },
  {
    status: 'Platform capability',
    title: 'Cybersecurity and resilience R&D',
    points: [
      'Healthcare-focused assessment, hardening, and resilience planning',
      'Delivery with authorized/certified personnel and partner security products within approved scopes',
      'Automated monitoring, documentation, and remediation support, always under authorized human review.'
    ]
  }
];

const Research = () => (
  <>
    <PageSeo
      title="Research | SmartClover"
      description="SmartClover applied research across CerviGuard, DataGems, permissioned cloud-on-edge infrastructure, and healthcare cybersecurity and resilience."
      path="/research"
    />

    <header className="page-header">
      <span className="tagline">Research</span>
      <h1>Healthcare AI products and applied research</h1>
      <p>
        SmartClover develops CerviGuard and DataGems and advances current and future products through applied research,
        permissioned cloud-on-edge infrastructure, and cybersecurity and resilience R&amp;D for regulated healthcare
        deployments.
      </p>
      <div className="cta-links">
        <Link href="/cerviguard" className="button primary">
          Explore CerviGuard
        </Link>
        <Link href="/pricing" className="button secondary">
          Pricing and Packaging
        </Link>
        <Link href="/proof" className="button secondary">
          Proof and Milestones
        </Link>
      </div>
    </header>

    <section className="surface-card" aria-labelledby="services-directions-heading">
      <div className="section-heading">
        <h2 id="services-directions-heading">Product and research tracks</h2>
      </div>
      <div className="feature-grid two-up">
        {productTracks.map((track) => (
          <article key={track.title} className="feature">
            <h3 className="feature-title">{track.title}</h3>
            <p className="feature-description">{track.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card flagship-highlight" aria-labelledby="services-flagship-heading">
      <div className="section-heading">
        <span className="flagship-kicker">Flagship Product</span>
        <h2 id="services-flagship-heading">CerviGuard is the operational starting point</h2>
      </div>
      <p>
        CerviGuard is delivered as SmartClover&apos;s primary healthcare product. The live product at{' '}
        <a href="https://cerviguard.link" target="_blank" rel="noopener noreferrer">
          cerviguard.link
        </a>{' '}
        and the public repository at{' '}
        <a href="https://github.com/SmartCloverAI/CerviGuard" target="_blank" rel="noopener noreferrer">
          SmartCloverAI/CerviGuard
        </a>{' '}
        provide implementation context for clinical and procurement teams.
      </p>
      <div className="cta-links">
        <Link href="/regulatory" className="button secondary">
          Regulatory Baseline
        </Link>
        <Link href="/trust" className="button secondary">
          Trust Center
        </Link>
        <Link href="/how-to-buy" className="button tertiary">
          Procurement Path
        </Link>
      </div>
    </section>

    <section className="surface-card" aria-labelledby="services-principles-heading">
      <div className="section-heading">
        <h2 id="services-principles-heading">Operating principles</h2>
      </div>
      <div className="feature-grid three-up">
        {researchPrinciples.map((item) => (
          <article key={item.title} className="feature">
            <h3 className="feature-title">{item.title}</h3>
            <p className="feature-description">{item.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card" aria-labelledby="services-modules-heading">
      <div className="section-heading">
        <h2 id="services-modules-heading">What you can engage today</h2>
      </div>
      <div className="service-programs">
        {platformCapabilities.map((capability) => (
          <article key={capability.title} className="service-program">
            <p className="kicker">{capability.status}</p>
            <h3>{capability.title}</h3>
            <ul>
              {capability.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card spotlight" aria-labelledby="services-rollout-heading">
      <div className="spotlight-content">
        <h2 id="services-rollout-heading">How rollouts are activated</h2>
        <p>
          Rollouts progress through qualification, legal/security review, environment readiness, and operational handoff.
          This process aligns commercial scope with governance requirements before production activation.
        </p>
        <div className="cta-links">
          <Link href="/how-to-buy" className="button secondary">
            30/60/90 Onboarding Flow
          </Link>
          <Link href="/contact" className="button primary">
            Start Qualification
          </Link>
        </div>
      </div>
      <div className="spotlight-media">
        <Image
          src="/images/diagrams/rollout-onboarding-flow_v2.png"
          alt="Rollout flow from qualification and security and legal review through environment readiness and 30/60/90 activation to operational handoff."
          width={1600}
          height={620}
          sizes="(max-width: 879px) 100vw, 46vw"
        />
      </div>
    </section>

    <DiligenceLinksSection
      headingId="services-diligence-links"
      description="Scope, evidence, and next steps for a research or product-deployment programme."
    />
  </>
);

export default Research;
