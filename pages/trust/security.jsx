import Link from 'next/link';
import PageSeo from '../../components/PageSeo';

const controls = [
  {
    title: 'Permissioned access',
    detail: 'Role-based authorization governs who can access workflows, environments, and high-impact operations.'
  },
  {
    title: 'Encryption controls',
    detail: 'Sensitive flows use encryption controls across transit and approved storage boundaries.'
  },
  {
    title: 'Data-boundary control',
    detail: 'Clinical payload storage is scoped by tenant and deployment model.'
  },
  {
    title: 'Traceable event records',
    detail: 'Operational events are recorded so teams can investigate changes and support review.'
  },
  {
    title: 'Vulnerability and patch process',
    detail: 'Security issues are triaged, prioritized, and tracked through controlled remediation workflows.'
  }
];

const Security = () => (
  <>
    <PageSeo
      title="Security | SmartClover Trust Center"
      description="Draft SmartClover security baseline covering access control, encryption controls, data boundaries, and traceable event records without certification claims."
      path="/trust/security"
      image="/images/diagrams/cloud-on-edge-boundary_v2.png"
    />

    <header className="page-header">
      <span className="tagline">Trust Center</span>
      <h1>Security overview (Draft baseline)</h1>
      <p>
        This page provides a high-level security summary for procurement and security review. It intentionally avoids
        unsupported certification claims.
      </p>
    </header>

    <section className="surface-card" aria-labelledby="security-status-heading">
      <div className="status-badge-list" id="security-status-heading">
        <span className="status-badge">Document status: Draft for security/legal review</span>
        <span className="status-badge">Baseline updated: 2026-02-17</span>
        <span className="status-badge">Page reviewed: 2026-07-01</span>
        <span className="status-badge">Owner: Security + Legal</span>
      </div>
      <blockquote>
        SmartClover describes permissioned access, encryption controls, and traceable event records as the current
        public security baseline. This statement is not a certification claim.
      </blockquote>
    </section>

    <section className="surface-card" aria-labelledby="control-heading">
      <div className="section-heading">
        <h2 id="control-heading">Security control baseline</h2>
      </div>
      <div className="feature-grid two-up">
        {controls.map((control) => (
          <article key={control.title} className="feature">
            <h3 className="feature-title">{control.title}</h3>
            <p className="feature-description">{control.detail}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card" aria-labelledby="security-limit-heading">
      <div className="section-heading">
        <h2 id="security-limit-heading">Disclosure limitations</h2>
      </div>
      <ul>
        <li>Detailed topology, key-management internals, and sensitive architecture specifics are not publicly disclosed.</li>
        <li>Control implementation detail is shared under procurement and security review channels.</li>
        <li>Regulatory or certification conclusions are not implied unless formally published with evidence.</li>
      </ul>
      <div className="cta-links">
        <Link href="/cloud-architecture" className="button secondary">
          Cloud and Boundary Model
        </Link>
        <Link href="/trust/incident-response" className="button secondary">
          Incident Process
        </Link>
        <Link href="/contact" className="button primary">
          Request Security Review
        </Link>
      </div>
    </section>
  </>
);

export default Security;
