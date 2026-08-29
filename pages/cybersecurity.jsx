import Image from 'next/image';
import Link from 'next/link';
import PageSeo from '../components/PageSeo';

const Cybersecurity = () => (
  <>
    <PageSeo
      title="Healthcare Cybersecurity | SmartClover"
      description="SmartClover cybersecurity and resilience services for healthcare organizations, delivered with authorized/certified personnel, partner products, and engineering workflows within scoped engagements."
      path="/cybersecurity"
      image="/images/diagrams/healthcare-cyber-resilience-loop_v2.png"
    />

    <header className="page-header">
      <span className="tagline">Healthcare Cybersecurity</span>
      <h1>Cybersecurity and resilience R&amp;D for healthcare organizations</h1>
      <p>
        SmartClover supports healthcare teams that need security assessment, deployment hardening, resilience planning,
        and operational follow-through around AI-enabled workflows. Scoped engagements can involve authorized/certified
        personnel, partner security products, and engineering workflows matched to the environment.
      </p>
    </header>

    <section className="surface-card" aria-labelledby="cybersecurity-status-heading">
      <div className="status-badge-list" id="cybersecurity-status-heading">
        <span className="status-badge">Document status: Draft for security/service review</span>
        <span className="status-badge">Service baseline updated: 2026-07-01</span>
        <span className="status-badge">Page reviewed: 2026-07-01</span>
        <span className="status-badge">Owner: Security + Delivery</span>
      </div>
      <p>
        Service scope, partner controls, personnel responsibilities, and evidence records are confirmed per engagement
        before operational work starts.
      </p>
    </section>

    <section className="surface-card">
      <h2>Healthcare security scope</h2>
      <p>
        Sensitive patient data, connected medical devices, and critical infrastructure make healthcare environments
        difficult to secure. Security investment has to account for privacy, clinical continuity, and operational
        resilience at the same time.
      </p>
      <p>
        We keep this work connected to real deployment boundaries: who can access systems, where sensitive flows run,
        which partner controls are in scope, and how response procedures remain reviewable by authorized teams.
      </p>
    </section>

    <section className="surface-card visual-card" aria-labelledby="cyber-resilience-loop-heading">
      <div className="section-heading">
        <h2 id="cyber-resilience-loop-heading">Service loop</h2>
      </div>
      <figure className="content-visual">
        <Image
          src="/images/diagrams/healthcare-cyber-resilience-loop_v2.png"
          alt="Healthcare cybersecurity loop: assess risks, harden access, configure partner products, automate monitoring and evidence collection, remediate, review and improve."
          width={1600}
          height={740}
          sizes="(max-width: 960px) 100vw, 900px"
        />
        <figcaption>
          Engagements stay practical: assess the environment, harden access paths, configure partner controls, support
          monitoring and documentation, remediate findings, and review evidence with authorized human oversight.
        </figcaption>
      </figure>
    </section>

    <section className="surface-card">
      <h2>What the service can include</h2>
      <ul>
        <li>Healthcare-focused security assessment and resilience planning.</li>
        <li>Partner security product selection, configuration support, and workflow integration.</li>
        <li>Automated monitoring, documentation, and remediation support, always under authorized human review.</li>
        <li>Risk review for cloud-on-edge, SaaS/PaaS, and tenant-boundary deployment models.</li>
        <li>Operational playbooks that keep authorized human review in the response path.</li>
      </ul>
      <p>
        AI-assisted security work does not replace cybersecurity experts. It is useful only when teams can inspect the
        signal, understand the context, and decide what action is justified.
      </p>
    </section>

    <section className="surface-card">
      <h2>Integrated with deployment and product work</h2>
      <p>
        Security controls are part of SmartClover product operations, including access control, data boundaries,
        traceability, and incident handling. Deployment planning follows &quot;your AI, your Data&quot; and &quot;your App, your
        Data&quot; principles so healthcare workloads can be scoped around permissioned cloud-on-edge infrastructure,
        encryption controls, resilience requirements, and traceable deployment records.
      </p>
      <div className="cta-links">
        <Link href="/cloud-architecture" className="button secondary">
          Review Cloud Architecture
        </Link>
        <Link href="/trust/security" className="button secondary">
          Security Baseline
        </Link>
        <Link href="/contact" className="button primary">
          Discuss Security Scope
        </Link>
      </div>
    </section>
  </>
);

export default Cybersecurity;
