import Image from 'next/image';
import Link from 'next/link';
import PageSeo from '../components/PageSeo';

const serviceMap = [
  {
    domain: 'Compute and orchestration',
    baseline: 'Permissioned cloud-on-edge and on-prem workers with hybrid coordination components.',
    deploymentRationale:
      'Cloud coordination is scoped to orchestration, release control, observability, and operational governance.'
  },
  {
    domain: 'Data and storage boundaries',
    baseline: 'Clinical payload data remains tenant-local with deployment-specific encryption controls.',
    deploymentRationale:
      'Control-plane metadata may use managed storage patterns without centralizing clinical payload data.'
  },
  {
    domain: 'AI and model operations',
    baseline: 'AI-assisted workflows run within authorized boundaries with human approval gates.',
    deploymentRationale:
      'Model lifecycle coordination is enabled only where the contract and deployment boundary approve it.'
  },
  {
    domain: 'Security and identity',
    baseline: 'Role-based access, encryption control, and policy-constrained service communication.',
    deploymentRationale:
      'Identity, key, and policy controls are selected per environment and reviewed during onboarding.'
  },
  {
    domain: 'Observability and audit',
    baseline: 'Append-only operational traces with traceable deployment records for review.',
    deploymentRationale:
      'Operational telemetry supports reliability review, security review, and release traceability.'
  }
];

const reliabilityRows = [
  {
    area: 'Availability posture',
    note: 'Resilience is built through distributed node design and tenant-boundary execution.'
  },
  {
    area: 'SLO/SLA model',
    note: 'Targets are defined per package and environment tier in RFQ and onboarding artifacts.'
  },
  {
    area: 'Backup and recovery',
    note: 'Backup and recovery controls are tenant-scoped, encryption-protected, and contract-defined.'
  },
  {
    area: 'Incident handling',
    note: 'Severity-based incident flow with traceable lifecycle and corrective-action tracking.'
  }
];

const costDrivers = [
  'Edge-local execution reduces repeated high-volume clinical data transfer overhead.',
  'Tenant-local clinical payload handling limits central storage growth pressure.',
  'Hybrid cloud components are scoped to coordination, governance, and observability.',
  'Capacity planning is tied to RFQ-defined workload envelopes and deployment tier.'
];

const CloudArchitecture = () => (
  <>
    <PageSeo
      title="Cloud Architecture | SmartClover"
      description="SmartClover cloud architecture baseline for permissioned cloud-on-edge product deployment, tenancy boundaries, encryption, reliability posture, and traceable release records."
      path="/cloud-architecture"
      image="/images/diagrams/cloud-on-edge-boundary_v2.png"
    />

    <header className="page-header">
      <span className="tagline">Cloud Architecture</span>
      <h1>Permissioned cloud-on-edge deployment for healthcare AI products</h1>
      <p>
        SmartClover product deployments support tenant-designated edge and on-premise execution with hybrid cloud
        coordination. The model keeps healthcare data boundaries explicit while cloud components support orchestration,
        observability, and release control.
      </p>
    </header>

    <section className="surface-card" aria-labelledby="cloud-status-heading">
      <div className="status-badge-list" id="cloud-status-heading">
        <span className="status-badge">Document status: Draft for architecture/security review</span>
        <span className="status-badge">Architecture baseline updated: 2026-05-11</span>
        <span className="status-badge">Page reviewed: 2026-07-01</span>
        <span className="status-badge">Owner: Architecture + Security</span>
      </div>
      <blockquote>
        SmartClover uses a permissioned cloud-on-edge architecture: clinical workloads run in authorized edge/on-prem
        boundaries, sensitive flows use deployment-specific encryption controls, architecture is designed to limit
        unnecessary centralization of clinical payload data, and deployment records remain traceable for review.
      </blockquote>
    </section>

    <section className="surface-card visual-card" aria-labelledby="cloud-boundaries-heading">
      <div className="section-heading">
        <h2 id="cloud-boundaries-heading">Deployment boundaries</h2>
      </div>
      <figure className="content-visual">
        <Image
          src="/images/diagrams/cloud-on-edge-boundary_v2.png"
          alt="Cloud-on-edge deployment: healthcare data and AI workers stay inside the approved boundary; cloud coordination is control-plane only; immutable anchoring records deployment evidence."
          width={1600}
          height={960}
          sizes="(max-width: 960px) 100vw, 900px"
        />
        <figcaption>
          Provider-neutral cloud-on-edge boundary diagram: healthcare users, permissioned edge workers, cloud
          coordination, and traceable deployment records in one view.
        </figcaption>
      </figure>
    </section>

    <section className="surface-card" aria-labelledby="service-map-heading">
      <div className="section-heading">
        <h2 id="service-map-heading">Service map (public baseline)</h2>
      </div>
      <div className="table-scroll">
        <table className="info-table">
          <thead>
            <tr>
              <th>Domain</th>
              <th>Current architecture baseline</th>
              <th>Deployment rationale</th>
            </tr>
          </thead>
          <tbody>
            {serviceMap.map((item) => (
              <tr key={item.domain}>
                <td>{item.domain}</td>
                <td>{item.baseline}</td>
                <td>{item.deploymentRationale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <section className="surface-card" aria-labelledby="tenancy-heading">
      <div className="section-heading">
        <h2 id="tenancy-heading">Tenancy and data-boundary model</h2>
      </div>
      <ul>
        <li>Tenant isolation uses permissioned boundaries and policy-constrained access paths.</li>
        <li>Data residency follows tenant-selected deployment boundaries (on-edge/on-prem or approved hybrid segment).</li>
        <li>No default cross-tenant clinical data sharing is enabled.</li>
        <li>Clinical payload storage remains local to authorized tenant boundaries.</li>
      </ul>
    </section>

    <section className="surface-card" aria-labelledby="reliability-heading">
      <div className="section-heading">
        <h2 id="reliability-heading">Reliability and recovery posture</h2>
      </div>
      <div className="table-scroll">
        <table className="info-table">
          <thead>
            <tr>
              <th>Control area</th>
              <th>Public statement</th>
            </tr>
          </thead>
          <tbody>
            {reliabilityRows.map((row) => (
              <tr key={row.area}>
                <td>{row.area}</td>
                <td>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <section className="surface-card" aria-labelledby="cost-heading">
      <div className="section-heading">
        <h2 id="cost-heading">Cost-performance rationale</h2>
      </div>
      <ul>
        {costDrivers.map((driver) => (
          <li key={driver}>{driver}</li>
        ))}
      </ul>
      <div className="cta-links">
        <Link href="/decentralized" className="button secondary">
          Cloud-On-Edge Context
        </Link>
        <Link href="/trust/security" className="button secondary">
          Security Baseline
        </Link>
        <Link href="/contact" className="button primary">
          Discuss Deployment Fit
        </Link>
      </div>
    </section>
  </>
);

export default CloudArchitecture;
