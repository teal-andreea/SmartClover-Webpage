import Link from 'next/link';
import PageSeo from '../components/PageSeo';

const personas = [
  {
    title: 'Clinical or Program Lead',
    focus: 'Care workflow fit, pilot scope, and measurable operational outcomes.'
  },
  {
    title: 'IT and Security Lead',
    focus: 'Deployment model, access controls, data boundaries, and review checkpoints.'
  },
  {
    title: 'Procurement and Legal Lead',
    focus: 'RFQ scope, contracting envelope, privacy role allocation, and commercial governance.'
  }
];

const onboardingPhases = [
  {
    period: 'Day 0-30',
    title: 'Qualification and Scope Definition',
    outcomes: [
      'Use case and organization qualification brief',
      'Deployment mode decision record (managed SaaS, private SaaS, or hybrid/on-edge)',
      'RFQ scoping package and quotation prerequisites'
    ]
  },
  {
    period: 'Day 31-60',
    title: 'Contracting and Environment Preparation',
    outcomes: [
      'Commercial terms and legal review summary',
      'Privacy/DPA posture alignment and security dossier preparation',
      'Environment readiness checklist and access provisioning'
    ]
  },
  {
    period: 'Day 61-90',
    title: 'Activation and Operational Readiness',
    outcomes: [
      'Go-live readiness review with role ownership',
      'User onboarding, SOP handoff, and governance checkpoints',
      'Pilot-to-scale decision gate with documented outcome'
    ]
  }
];

const reviewCheckpoints = [
  'NDA and confidentiality controls confirmed',
  'GDPR role allocation documented per deployment model',
  'Security controls reviewed (access, encryption, traceability, incident handling)',
  'Regulatory framing aligned to intended use and MDR positioning',
  'Contract and RFQ package finalized with authorized sign-off'
];

const HowToBuy = () => (
  <>
    <PageSeo
      title="How to Buy | SmartClover"
      description="SmartClover procurement and onboarding flow for healthcare SaaS/PaaS adoption, including buyer personas and structured 30/60/90 activation path."
      path="/how-to-buy"
      image="/images/diagrams/rollout-onboarding-flow_v2.png"
    />

    <header className="page-header">
      <span className="tagline">How to Buy</span>
      <h1>Procurement and onboarding flow for SmartClover products</h1>
      <p>
        SmartClover uses a structured path from first conversation to activation for healthcare organizations.
        Commercial issuance is RFQ-based and paired with security, legal, and governance checkpoints.
      </p>
    </header>

    <section className="surface-card" aria-labelledby="status-heading">
      <div className="status-badge-list" id="status-heading">
        <span className="status-badge">Document status: Draft operating baseline</span>
        <span className="status-badge">Last updated: 2026-02-17</span>
        <span className="status-badge">Owner: Commercial + Operations</span>
      </div>
      <p>
        This public flow is the current operating model. Contract-specific responsibilities and timing are confirmed in
        each RFQ package.
      </p>
    </section>

    <section className="surface-card" aria-labelledby="personas-heading">
      <div className="section-heading">
        <h2 id="personas-heading">Primary buyer personas</h2>
      </div>
      <div className="feature-grid three-up">
        {personas.map((persona) => (
          <article key={persona.title} className="feature">
            <h3 className="feature-title">{persona.title}</h3>
            <p className="feature-description">{persona.focus}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card" aria-labelledby="timeline-heading">
      <div className="section-heading">
        <h2 id="timeline-heading">30/60/90 onboarding path</h2>
      </div>
      <div className="feature-grid three-up">
        {onboardingPhases.map((phase) => (
          <article key={phase.period} className="feature feature-list-card">
            <p className="kicker">{phase.period}</p>
            <h3 className="feature-title">{phase.title}</h3>
            <ul>
              {phase.outcomes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card" aria-labelledby="checkpoints-heading">
      <div className="section-heading">
        <h2 id="checkpoints-heading">Security, legal, and procurement checkpoints</h2>
      </div>
      <ul>
        {reviewCheckpoints.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="cta-links">
        <Link href="/pricing" className="button secondary">
          View Packaging Model
        </Link>
        <Link href="/trust" className="button secondary">
          Open Trust Center
        </Link>
        <Link href="/contact" className="button primary">
          Start Qualification
        </Link>
      </div>
    </section>
  </>
);

export default HowToBuy;
