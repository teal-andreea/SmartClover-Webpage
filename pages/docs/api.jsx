import PageSeo from '../../components/PageSeo';

const exampleEmail = ['user', 'example.com'].join('@');

const apiSections = [
  {
    id: 'status-api',
    route: '/api/status',
    method: 'GET',
    description: 'Returns a lightweight health payload with the public website service status, current site version, and exposed public endpoints.',
    example: `curl https://smartclover.ro/api/status`
  },
  {
    id: 'host-id-api',
    route: '/api/host-id',
    method: 'GET',
    description: 'Returns the runtime host identifier shown in the SmartClover footer banner. This is intended for operational verification, not authentication.',
    example: `curl https://smartclover.ro/api/host-id`
  },
  {
    id: 'contact-api',
    route: '/api/contact',
    method: 'POST',
    description:
      'Accepts the same structured inquiry payload used by the public contact form for demo requests, pilot discussions, research partnerships, investor conversations, and general outreach.',
    example: `curl https://smartclover.ro/api/contact \\
  -X POST \\
  -H 'Content-Type: application/json' \\
  -d '{
    "inquiryType": "Book demo / Request pilot",
    "fullName": "Example User",
    "email": "${exampleEmail}",
    "organization": "Example Clinic",
    "role": "Clinical lead",
    "organizationType": "Hospital or clinic",
    "useCase": "Evaluate CerviGuard for pilot deployment.",
    "deploymentPreference": "Managed SaaS",
    "timeline": "3-6 months",
    "complianceRequirements": "Need GDPR-aligned handling and procurement review.",
    "consentAccepted": true,
    "website": ""
  }'`
  }
];

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const renderCloudflareSafeCode = (value) =>
  escapeHtml(value).replace(
    /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi,
    '<!--email_off-->$1<!--/email_off-->'
  );

const ApiDocsPage = () => (
  <>
    <PageSeo
      title="SmartClover API Docs | Public Website APIs"
      description="Reference for SmartClover's public website status, host-id, and contact-intake APIs."
      path="/docs/api"
    />

    <section className="hero-shell" aria-labelledby="api-docs-title">
      <div className="hero-grid">
        <div className="hero-panel">
          <div className="hero-kicker-row">
            <span className="tagline">Public API reference</span>
            <span className="proof-pill">
              <strong>OpenAPI</strong> published
            </span>
          </div>
          <div className="hero-copy">
            <h1 id="api-docs-title" className="hero-title">
              SmartClover exposes a small public website API surface for status, runtime identity, and structured contact intake.
            </h1>
            <p>
              This site does not currently publish protected APIs or OAuth discovery metadata. The public API surface is
              limited to operational inspection endpoints and structured contact intake.
            </p>
          </div>
          <div className="hero-action-row">
            <a href="/openapi.json" className="button primary">
              Open OpenAPI description
            </a>
            <a href="/.well-known/api-catalog" className="button secondary">
              Open API catalog
            </a>
          </div>
        </div>

        <div className="detail-panel">
          <div className="story-card">
            <p className="kicker">API scope</p>
            <h2>Public inspection only</h2>
            <p>
              The OpenAPI description documents the status, host-id, and contact endpoints. Product application APIs
              remain outside this public website surface.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="surface-card" aria-labelledby="api-docs-endpoints">
      <div className="section-heading">
        <h2 id="api-docs-endpoints">Endpoints</h2>
        <p>Use the OpenAPI description for machine consumption and the examples below for direct manual inspection.</p>
      </div>
      <div className="story-grid">
        {apiSections.map((section) => (
          <article key={section.route} id={section.id} className="story-card">
            <p className="kicker">
              {section.method} <code>{section.route}</code>
            </p>
            <p>{section.description}</p>
            <pre>
              <code dangerouslySetInnerHTML={{ __html: renderCloudflareSafeCode(section.example) }} />
            </pre>
          </article>
        ))}
      </div>
    </section>
  </>
);

export default ApiDocsPage;
