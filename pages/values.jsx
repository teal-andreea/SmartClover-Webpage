import PageSeo from '../components/PageSeo';

const Values = () => (
  <>
    <PageSeo
      title="Our Values | SmartClover"
      description="Creativity, digitalization, and responsible AI shape how SmartClover scopes products, reviews claims, and runs platform operations."
      path="/values"
    />

    <header className="page-header">
      <span className="tagline">Values</span>
      <h1>The values behind what we build</h1>
      <p>
        Creativity, digitalization, and responsible AI for good shape how SmartClover scopes products, reviews claims,
        and manages platform operations.
      </p>
    </header>

    <section className="surface-card">
      <h2>Creativity</h2>
      <p>
        SmartClover explores new ideas with a clear operating boundary. Healthcare tools, research workflows, and
        creative education concepts are tested responsibly before they are presented as products.
      </p>
    </section>

    <section className="surface-card">
      <h2>Digitalization</h2>
      <p>
        Digital workflows should reduce administrative burden without weakening data integrity, accessibility, or
        long-term maintainability.
      </p>
    </section>

    <section className="surface-card">
      <h2>Clinician-led AI for good</h2>
      <p>
        Clinicians, researchers, and operators remain responsible for high-impact decisions. SmartClover uses AI to
        support expert review, with impact judged by usefulness, transparency, and trust.
      </p>
    </section>
  </>
);

export default Values;
