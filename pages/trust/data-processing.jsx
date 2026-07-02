import Link from 'next/link';
import PageSeo from '../../components/PageSeo';

const roleRows = [
  {
    mode: 'SmartClover managed SaaS',
    posture: 'Mixed controller/processor model by processing purpose',
    notes: 'Role allocation must be explicitly documented contractually per data flow.'
  },
  {
    mode: 'Customer-managed private deployment',
    posture: 'SmartClover acts as processor/support provider for defined instructions',
    notes: 'Customer typically remains primary controller for core processing activities.'
  },
  {
    mode: 'Hybrid or on-edge deployment',
    posture: 'Mixed model with annex-level role allocation',
    notes: 'No implicit role assumptions; each flow requires explicit assignment.'
  }
];

const dpaClauses = [
  'Role allocation matrix by deployment mode and processing purpose.',
  'Documented instruction handling and confidentiality obligations.',
  'Subprocessor transparency with notification process.',
  'Security baseline covering access, encryption, and audit traceability.',
  'Breach notification and cooperation commitments.'
];

const DataProcessing = () => (
  <>
    <PageSeo
      title="Data Processing | SmartClover Trust Center"
      description="Draft SmartClover data-processing posture with GDPR role model by deployment mode and baseline DPA structure for enterprise procurement review."
      path="/trust/data-processing"
    />

    <header className="page-header">
      <span className="tagline">Trust Center</span>
      <h1>Data processing posture (Draft baseline)</h1>
      <p>
        This page outlines the current GDPR role-model baseline and DPA structure used for procurement discussions.
        Final role allocation is always defined in contract artifacts.
      </p>
    </header>

    <section className="surface-card" aria-labelledby="dpa-status-heading">
      <div className="status-badge-list" id="dpa-status-heading">
        <span className="status-badge">Document status: Draft for legal/privacy review</span>
        <span className="status-badge">Data-processing baseline updated: 2026-02-17</span>
        <span className="status-badge">Page reviewed: 2026-07-01</span>
        <span className="status-badge">Owner: Legal + Privacy</span>
      </div>
      <p>
        This summary is publication-safe orientation content and not a full DPA agreement.
      </p>
    </section>

    <section className="surface-card" aria-labelledby="role-model-heading">
      <div className="section-heading">
        <h2 id="role-model-heading">GDPR role model by deployment mode</h2>
      </div>
      <div className="table-scroll">
        <table className="info-table">
          <thead>
            <tr>
              <th>Deployment mode</th>
              <th>Role posture</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {roleRows.map((row) => (
              <tr key={row.mode}>
                <td>{row.mode}</td>
                <td>{row.posture}</td>
                <td>{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <section className="surface-card" aria-labelledby="dpa-structure-heading">
      <div className="section-heading">
        <h2 id="dpa-structure-heading">DPA structure baseline</h2>
      </div>
      <ul>
        {dpaClauses.map((clause) => (
          <li key={clause}>{clause}</li>
        ))}
      </ul>
      <div className="cta-links">
        <Link href="/trust/privacy-policy" className="button secondary">
          Privacy Policy Baseline
        </Link>
        <Link href="/trust/security" className="button secondary">
          Security Baseline
        </Link>
        <Link href="/contact" className="button primary">
          Request DPA Discussion
        </Link>
      </div>
    </section>
  </>
);

export default DataProcessing;
