import Link from 'next/link';
import PageSeo from '../../components/PageSeo';

const dataCategories = [
  {
    category: 'Contact and qualification data',
    examples: 'Name, role, organization, use case, timeline, compliance requirements',
    purpose: 'Pre-sales qualification, response routing, and onboarding preparation'
  },
  {
    category: 'Operational support data',
    examples: 'Support messages, issue context, communication records',
    purpose: 'Service support and incident follow-up'
  },
  {
    category: 'Analytics preference and event data',
    examples: 'Consent status, optional website usage metrics',
    purpose: 'Site performance and content improvement after consent'
  }
];

const retentionRows = [
  {
    dataType: 'Contact submission records',
    retention: '24 months (unless legal obligation requires longer)',
    note: 'Subject to periodic review and secure deletion workflow'
  },
  {
    dataType: 'Consent decision log',
    retention: '24 months',
    note: 'Maintains traceability of consent choices'
  },
  {
    dataType: 'Analytics event data (optional)',
    retention: '14 months',
    note: 'Collected only when analytics consent is granted'
  },
  {
    dataType: 'Preference state',
    retention: '12 months (renewed on update)',
    note: 'Stores user cookie preference for convenience'
  }
];

const PrivacyPolicy = () => (
  <>
    <PageSeo
      title="Privacy Policy | SmartClover Trust Center"
      description="Draft privacy policy baseline for SmartClover trust center, including data categories, lawful basis framing, retention schedule, and rights contact channel."
      path="/trust/privacy-policy"
    />

    <header className="page-header">
      <span className="tagline">Trust Center</span>
      <h1>Privacy Policy (Draft for legal review)</h1>
      <p>
        This page provides the current privacy-policy baseline for procurement and legal review. Final legal wording and contractual
        role allocation are confirmed during legal approval and onboarding.
      </p>
    </header>

    <section className="surface-card" aria-labelledby="privacy-status-heading">
      <div className="status-badge-list" id="privacy-status-heading">
        <span className="status-badge">Document status: Draft for legal review</span>
        <span className="status-badge">Privacy baseline updated: 2026-02-17</span>
        <span className="status-badge">Page reviewed: 2026-07-01</span>
        <span className="status-badge">Owner: Legal + Privacy</span>
      </div>
      <p>
        Privacy questions and data-subject requests can be routed through the{' '}
        <Link href="/contact/privacy#inquiry-form">dedicated privacy request path</Link>.
      </p>
    </section>

    <section className="surface-card" aria-labelledby="categories-heading">
      <div className="section-heading">
        <h2 id="categories-heading">Data categories and purpose mapping</h2>
      </div>
      <div className="table-scroll">
        <table className="info-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Examples</th>
              <th>Primary purpose</th>
            </tr>
          </thead>
          <tbody>
            {dataCategories.map((row) => (
              <tr key={row.category}>
                <td>{row.category}</td>
                <td>{row.examples}</td>
                <td>{row.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <section className="surface-card" aria-labelledby="basis-heading">
      <div className="section-heading">
        <h2 id="basis-heading">Lawful basis baseline</h2>
      </div>
      <ul>
        <li>Necessary cookies: required for provision of requested site functionality.</li>
        <li>Analytics cookies: processed only after explicit user consent.</li>
        <li>Marketing cookies: processed only after explicit user consent (currently inactive by default).</li>
      </ul>
    </section>

    <section className="surface-card" aria-labelledby="retention-heading">
      <div className="section-heading">
        <h2 id="retention-heading">Retention schedule (draft baseline)</h2>
      </div>
      <div className="table-scroll">
        <table className="info-table">
          <thead>
            <tr>
              <th>Data type</th>
              <th>Retention baseline</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {retentionRows.map((row) => (
              <tr key={row.dataType}>
                <td>{row.dataType}</td>
                <td>{row.retention}</td>
                <td>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <section className="surface-card" aria-labelledby="rights-heading">
      <div className="section-heading">
        <h2 id="rights-heading">Data subject rights and requests</h2>
      </div>
      <p>
        Data-subject requests (access, correction, deletion, objection, and portability where applicable) can be
        submitted through the privacy contact channel. Request handling is documented and tracked for accountability.
      </p>
      <div className="cta-links">
        <Link href="/trust/data-processing" className="button secondary">
          Data Processing Posture
        </Link>
        <Link href="/contact/privacy#inquiry-form" className="button primary">
          Open Privacy Request Path
        </Link>
      </div>
    </section>
  </>
);

export default PrivacyPolicy;
