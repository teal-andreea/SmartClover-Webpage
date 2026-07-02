import Link from 'next/link';
import PageSeo from '../../components/PageSeo';

const clauses = [
  {
    title: 'Service scope and permitted use',
    detail: 'Service scope is defined per package and RFQ. Unsupported use outside agreed scope is excluded by default.'
  },
  {
    title: 'Customer obligations and account security',
    detail: 'Customers maintain authorized-user governance and secure credential handling in line with agreed operating procedures.'
  },
  {
    title: 'Support and response-time commitments',
    detail: 'Response-time targets are defined in onboarding and contract artifacts, including severity-based escalation paths.'
  },
  {
    title: 'Liability and warranty boundaries',
    detail: 'Contract-specific limitations, liability terms, and disclaimer language are established in formal agreements.'
  },
  {
    title: 'Change management and termination',
    detail: 'Release governance, material-change communication, and termination conditions are contractually documented.'
  }
];

const TermsOfService = () => (
  <>
    <PageSeo
      title="Terms of Service | SmartClover Trust Center"
      description="Draft terms-of-service baseline for SmartClover healthcare SaaS/PaaS products, covering service scope, obligations, response posture, and contractual boundaries."
      path="/trust/terms-of-service"
    />

    <header className="page-header">
      <span className="tagline">Trust Center</span>
      <h1>Terms of Service (Draft baseline)</h1>
      <p>
        This public page summarizes the current terms baseline used for procurement and legal review. It is not a substitute for
        signed contractual documents.
      </p>
    </header>

    <section className="surface-card" aria-labelledby="terms-status-heading">
      <div className="status-badge-list" id="terms-status-heading">
        <span className="status-badge">Document status: Draft for legal review</span>
        <span className="status-badge">Terms baseline updated: 2026-02-17</span>
        <span className="status-badge">Page reviewed: 2026-07-01</span>
        <span className="status-badge">Owner: Legal</span>
      </div>
      <p>
        Final enforceable terms are provided in RFQ-linked agreements. This page provides orientation for procurement and
        legal review teams.
      </p>
    </section>

    <section className="surface-card" aria-labelledby="terms-clauses-heading">
      <div className="section-heading">
        <h2 id="terms-clauses-heading">Baseline clause structure</h2>
      </div>
      <div className="feature-grid two-up">
        {clauses.map((clause) => (
          <article key={clause.title} className="feature">
            <h3 className="feature-title">{clause.title}</h3>
            <p className="feature-description">{clause.detail}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card" aria-labelledby="terms-limits-heading">
      <div className="section-heading">
        <h2 id="terms-limits-heading">Limitations of this public summary</h2>
      </div>
      <ul>
        <li>No numeric commercial terms are published on this page.</li>
        <li>Deployment-specific security and regulatory controls are finalized per contract scope.</li>
        <li>Legal text remains draft until formal legal approval and publication release.</li>
      </ul>
      <div className="cta-links">
        <Link href="/pricing" className="button secondary">
          Review Commercial Model
        </Link>
        <Link href="/how-to-buy" className="button secondary">
          Procurement Workflow
        </Link>
        <Link href="/contact" className="button primary">
          Request Contract Discussion
        </Link>
      </div>
    </section>
  </>
);

export default TermsOfService;
