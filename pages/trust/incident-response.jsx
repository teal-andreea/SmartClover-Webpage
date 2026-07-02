import Link from 'next/link';
import PageSeo from '../../components/PageSeo';

const severityRows = [
  {
    level: 'Severity 1',
    description: 'Potential high-impact service or security incident with urgent triage requirement.'
  },
  {
    level: 'Severity 2',
    description: 'Material operational issue requiring prioritized response and coordinated containment.'
  },
  {
    level: 'Severity 3',
    description: 'Lower-impact issue managed through scheduled remediation and follow-up.'
  }
];

const lifecycle = [
  'Detection and initial triage with severity assignment.',
  'Containment actions and customer coordination.',
  'Eradication and recovery with traceable execution records.',
  'Post-incident review, root-cause analysis, and corrective-action tracking.'
];

const IncidentResponse = () => (
  <>
    <PageSeo
      title="Incident Response | SmartClover Trust Center"
      description="Draft SmartClover incident-response baseline covering severity model, response lifecycle, and post-incident corrective governance."
      path="/trust/incident-response"
      image="/images/diagrams/healthcare-cyber-resilience-loop_v2.png"
    />

    <header className="page-header">
      <span className="tagline">Trust Center</span>
      <h1>Incident response baseline (Draft)</h1>
      <p>
        SmartClover follows a severity-based incident process with traceable response actions and post-incident
        corrective governance.
      </p>
    </header>

    <section className="surface-card" aria-labelledby="incident-status-heading">
      <div className="status-badge-list" id="incident-status-heading">
        <span className="status-badge">Document status: Draft for security/operations review</span>
        <span className="status-badge">Incident baseline updated: 2026-02-17</span>
        <span className="status-badge">Page reviewed: 2026-07-01</span>
        <span className="status-badge">Owner: Security + Operations</span>
      </div>
      <p>
        Notification timelines and contractual obligations are defined per environment tier and agreement scope.
      </p>
    </section>

    <section className="surface-card" aria-labelledby="severity-heading">
      <div className="section-heading">
        <h2 id="severity-heading">Severity model</h2>
      </div>
      <div className="table-scroll">
        <table className="info-table">
          <thead>
            <tr>
              <th>Level</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {severityRows.map((row) => (
              <tr key={row.level}>
                <td>{row.level}</td>
                <td>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <section className="surface-card" aria-labelledby="lifecycle-heading">
      <div className="section-heading">
        <h2 id="lifecycle-heading">Incident lifecycle</h2>
      </div>
      <ol className="ordered-list">
        {lifecycle.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div className="cta-links">
        <Link href="/trust/security" className="button secondary">
          Security Baseline
        </Link>
        <Link href="/contact" className="button primary">
          Report a Concern
        </Link>
      </div>
    </section>
  </>
);

export default IncidentResponse;
