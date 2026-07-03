import Image from 'next/image';
import Link from 'next/link';
import PageSeo from '../components/PageSeo';

const timeline = [
  {
    period: '2019-2020',
    event: 'First CerviGuard pilot phase',
    evidence:
      'Historical pilot context is summarized here; current public proof starts with the live CerviGuard workspace and product screenshots below.'
  },
  {
    period: '2022',
    event: 'Research and project track consolidation',
    evidence: 'Multiple projects and research tracks were finalized before broader platform expansion.'
  },
  {
    period: '2024',
    event: 'Company launch and platform preparation',
    evidence: 'Company launch and online product transition are represented by the current public product route, live workspace, and repository links.'
  },
  {
    period: '2025',
    event: 'Public product evidence expanded',
    evidence:
      'SmartClover expanded public product evidence through CerviGuard screenshots, product routes, and supporting trust pages.'
  }
];

const kpiDefinitions = [
  {
    name: 'Case review turnaround improvement',
    numerator: 'Cases completed inside target review window post-deployment',
    denominator: 'All eligible cases in selected cohort',
    window: 'Pending publication',
    method: 'Pre/post cohort comparison with fixed inclusion criteria',
    caveat: 'Workflow mix can vary by site'
  },
  {
    name: 'Follow-up adherence uplift',
    numerator: 'Cases with completed follow-up within defined interval',
    denominator: 'Cases assigned follow-up action',
    window: 'Pending publication',
    method: 'Operational follow-up completion tracking',
    caveat: 'External care-path variability applies'
  },
  {
    name: 'AI-assisted triage agreement rate',
    numerator: 'Cases where AI support category aligns with clinician final category',
    denominator: 'Cases containing both AI output and clinician adjudication',
    window: 'Pending publication',
    method: 'Blinded adjudication and reconciliation rules',
    caveat: 'Not a standalone diagnostic-accuracy claim'
  }
];

const evidenceStatus = [
  {
    label: 'Verified public evidence',
    detail: 'CerviGuard live surface, product screenshots, public repository, model/profile hub, and product route.'
  },
  {
    label: 'Qualified public evidence',
    detail: 'Draft regulatory material, security baseline pages, and methodology notes that require dated context.'
  },
  {
    label: 'Evidence gaps',
    detail: 'Clinical outcome percentages, commercial traction metrics, and final regulatory identifiers are not published yet.'
  },
  {
    label: 'Pending metrics',
    detail: 'KPI values remain withheld until cohort definitions, denominator rules, and reporting windows are finalized.'
  }
];

const verifyTodayLinks = [
  {
    href: 'https://cerviguard.link',
    title: 'Live CerviGuard workspace',
    description: 'Open the live workspace at cerviguard.link.'
  },
  {
    href: 'https://github.com/SmartCloverAI/CerviGuard',
    title: 'GitHub repository',
    description: 'Read the public implementation source.'
  },
  {
    href: '/docs/CerviGuard_MDR_Class_I_Self_Assessment_Draft.pdf',
    title: 'Draft MDR Class I self-assessment',
    description: 'Download the draft regulatory PDF.'
  }
];

const verifiedProductProof = [
  {
    href: 'https://cerviguard.link',
    title: 'Live CerviGuard workspace',
    description: 'Current product surface available for demo and product-review conversations.'
  },
  {
    href: 'https://github.com/SmartCloverAI/CerviGuard',
    title: 'Public implementation repository',
    description: 'Source-level context for the CerviGuard workflow product.'
  },
  {
    href: '/cerviguard',
    title: 'Product screenshot gallery',
    description: 'Public-safe screenshots showing dashboard and case-intake workflow surfaces.'
  },
  {
    href: '/docs/CerviGuard_MDR_Class_I_Self_Assessment_Draft.pdf',
    title: 'Draft MDR Class I self-assessment',
    description: 'Draft regulatory-positioning artifact; not a final approval claim.'
  }
];

const Proof = () => (
  <>
    <PageSeo
      title="Proof | SmartClover"
      description="SmartClover proof page with product timeline, pilot methodology notes, and KPI disclosure template with publication limits."
      path="/proof"
      image="/images/cerviguard/cerviguard-dashboard-live_v1.png"
    />

    <header className="page-header">
      <span className="tagline">Proof</span>
      <h1>Evidence baseline for product review</h1>
      <p>
        This page provides the current public evidence set: product timeline, pilot context, and KPI framework.
        Numeric KPI publication remains gated until cohort definitions and reporting windows are finalized.
      </p>
    </header>

    <section className="surface-card" aria-labelledby="proof-verify-today-heading">
      <div className="section-heading">
        <h2 id="proof-verify-today-heading">What you can verify today</h2>
      </div>
      <div className="proof-link-grid">
        {verifyTodayLinks.map((item) => {
          const isExternal = item.href.startsWith('http');

          return (
            <a
              key={item.href}
              href={item.href}
              className="proof-link-card"
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
            >
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </a>
          );
        })}
      </div>
    </section>

    <section className="surface-card" aria-labelledby="proof-status-heading">
      <div className="status-badge-list" id="proof-status-heading">
        <span className="status-badge">Document status: Current public baseline</span>
        <span className="status-badge">Evidence baseline updated: 2026-02-17</span>
        <span className="status-badge">Page reviewed: 2026-07-01</span>
        <span className="status-badge">Owner: Product + Commercial + Data</span>
      </div>
      <p>
        Reported outcomes are cohort-specific, method-bounded, and include explicit limitations. KPI percentages will not
        be published without denominator and date-window context.
      </p>
    </section>

    <section className="surface-card product-proof-lead" aria-labelledby="verified-product-proof-heading">
      <div className="section-heading">
        <span className="flagship-kicker">Verified product proof</span>
        <h2 id="verified-product-proof-heading">CerviGuard artifacts visitors can inspect today</h2>
        <p>
          The current public proof set starts with CerviGuard: live workspace access, public implementation context,
          product screenshots, and the draft MDR self-assessment.
        </p>
      </div>

      <div className="product-proof-grid">
        <div className="visual-frame product-visual-frame">
          <Image
            src="/images/cerviguard/cerviguard-analysis-panel_v1.png"
            alt="CerviGuard AI analysis output: transformation-zone type and lesion classification with per-class confidence bars."
            width={736}
            height={934}
            sizes="(max-width: 879px) 100vw, 44vw"
            priority
          />
        </div>
        <div className="proof-link-grid">
          {verifiedProductProof.map((item) => {
            const isExternal = item.href.startsWith('http');

            return (
              <a
                key={item.href}
                href={item.href}
                className="proof-link-card"
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
              >
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>

    <section className="surface-card" aria-labelledby="evidence-status-heading">
      <div className="section-heading">
        <h2 id="evidence-status-heading">Evidence status</h2>
      </div>
      <div className="feature-grid two-up">
        {evidenceStatus.map((item) => (
          <article key={item.label} className="feature">
            <h3 className="feature-title">{item.label}</h3>
            <p className="feature-description">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card" aria-labelledby="timeline-heading">
      <div className="section-heading">
        <h2 id="timeline-heading">Public milestone timeline</h2>
      </div>
      <div className="feature-grid two-up">
        {timeline.map((item) => (
          <article key={item.period} className="feature">
            <p className="kicker">{item.period}</p>
            <h3 className="feature-title">{item.event}</h3>
            <p className="feature-description">{item.evidence}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card" aria-labelledby="methodology-heading">
      <div className="section-heading">
        <h2 id="methodology-heading">Pilot context and methodology notes</h2>
      </div>
      <ul>
        <li>Pilot evidence is currently published through milestone and methodology summaries.</li>
        <li>Outcome publication requires fixed cohort windows and approved numerator/denominator definitions.</li>
        <li>Clinicians review AI outputs before confirming follow-up actions.</li>
      </ul>
    </section>

    <section className="surface-card" aria-labelledby="kpi-heading">
      <div className="section-heading">
        <h2 id="kpi-heading">KPI framework (values pending publication)</h2>
      </div>
      <div className="table-scroll">
        <table className="info-table">
          <thead>
            <tr>
              <th>KPI name</th>
              <th>Numerator</th>
              <th>Denominator</th>
              <th>Cohort window</th>
              <th>Method</th>
              <th>Caveat</th>
            </tr>
          </thead>
          <tbody>
            {kpiDefinitions.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.numerator}</td>
                <td>{item.denominator}</td>
                <td>{item.window}</td>
                <td>{item.method}</td>
                <td>{item.caveat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cta-links">
        <Link href="/pricing" className="button secondary">
          Commercial Model
        </Link>
        <Link href="/regulatory" className="button secondary">
          Regulatory Layer
        </Link>
        <Link href="/contact" className="button primary">
          Discuss Evidence and Scope
        </Link>
      </div>
    </section>
  </>
);

export default Proof;
