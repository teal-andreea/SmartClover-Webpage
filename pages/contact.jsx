import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import PageSeo, { siteUrl } from '../components/PageSeo';

const inquiryPaths = [
  {
    label: 'Book demo / Request pilot',
    title: 'Book demo / Request pilot',
    description: 'Best for clinics, hospitals, and operators evaluating CerviGuard or related deployment fit.'
  },
  {
    label: 'Research partnership',
    title: 'Research partnership',
    description: 'Best for research institutions, prevention programmes, and co-development conversations.'
  },
  {
    label: 'Investor inquiry',
    title: 'Investor inquiry',
    description: 'Best for investors, accelerators, and strategic backers evaluating SmartClover\'s platform, governance, and public product evidence.'
  },
  {
    label: 'General contact',
    title: 'General contact',
    description: 'Best for broader outreach that does not fit the primary paths above.'
  },
  {
    label: 'Privacy or data-subject request',
    title: 'Privacy or data-subject request',
    description: 'Best for privacy questions, data-subject requests, or rights-related contact.'
  }
];

export const privacyInquiryLabel = 'Privacy or data-subject request';

const roleOptions = [
  'Clinical lead',
  'Operations lead',
  'IT or security lead',
  'Procurement lead',
  'Research lead',
  'Investor',
  'Other'
];

const orgTypeOptions = [
  'Hospital or clinic',
  'Public health organisation',
  'Research institution',
  'Technology partner',
  'Investor or accelerator',
  'Other'
];

const deploymentOptions = [
  'Managed SaaS',
  'Private SaaS',
  'Hybrid or on-edge',
  'Not decided yet'
];

const timelineOptions = ['0-3 months', '3-6 months', '6-12 months', '12+ months', 'Exploratory only'];

const nextSteps = [
  {
    title: '1. Qualification review',
    description: 'We review the request, confirm fit, and route it to the right commercial, research, or trust-review path.'
  },
  {
    title: '2. Human follow-up',
    description: 'Qualified inbound requests receive a human reply with the next proposed action, usually within one business day.'
  },
  {
    title: '3. Demo, review, or scoped discussion',
    description: 'The next step becomes a demo, pilot discussion, research call, or investor conversation depending on the request type.'
  }
];

const trustLinks = [
  {
    title: 'Trust center',
    description: 'Security, privacy, incident response, and data-processing orientation.',
    href: '/trust'
  },
  {
    title: 'Pricing',
    description: 'Pricing structure, packaging, and procurement approach.',
    href: '/pricing'
  },
  {
    title: 'How to buy',
    description: 'Qualification, contracting, and activation flow.',
    href: '/how-to-buy'
  }
];

const createInitialFormState = (inquiryType = inquiryPaths[0].label) => ({
  inquiryType,
  fullName: '',
  email: '',
  organization: '',
  role: roleOptions[0],
  organizationType: orgTypeOptions[0],
  useCase: '',
  deploymentPreference: deploymentOptions[0],
  timeline: timelineOptions[0],
  complianceRequirements: '',
  consentAccepted: false,
  website: ''
});

const contactEmailParts = ['andreea', 'smartclover.ro'];

const getContactEmail = () => contactEmailParts.join('@');

const getServerRenderedMailtoUrl = () =>
  `mailto:${contactEmailParts.map(encodeURIComponent).join('%40')}`;

const cleanMailtoField = (value, maxLength = 500) =>
  String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);

const buildMailtoUrl = (recipient, subject, lines) => {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(lines.join('\n'));
  return `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`;
};

const buildClientFallbackMailtoUrl = (payload) => {
  const inquiryType = cleanMailtoField(payload.inquiryType, 140) || 'General contact';
  const organization = cleanMailtoField(payload.organization, 180) || 'Organization not provided';
  const fullName = cleanMailtoField(payload.fullName, 140);
  const isPrivacyPayload = payload.inquiryType === privacyInquiryLabel;
  const subject = isPrivacyPayload
    ? `SmartClover privacy request - ${fullName || 'Name not provided'}`
    : `SmartClover inquiry - ${inquiryType} - ${organization}`;

  const privacyLines = [
    `Inquiry type: ${inquiryType}`,
    `Full name: ${fullName}`,
    `Email: ${cleanMailtoField(payload.email, 180)}`,
    `Organization: ${organization}`,
    `Privacy request details: ${cleanMailtoField(payload.useCase, 2000)}`,
    `Additional context: ${cleanMailtoField(payload.complianceRequirements, 2000)}`,
    `Consent accepted: ${payload.consentAccepted ? 'yes' : 'no'}`
  ];

  const commercialLines = [
    `Inquiry type: ${inquiryType}`,
    `Full name: ${fullName}`,
    `Email: ${cleanMailtoField(payload.email, 180)}`,
    `Organization: ${organization}`,
    `Role: ${cleanMailtoField(payload.role, 140)}`,
    `Organization type: ${cleanMailtoField(payload.organizationType, 140)}`,
    `Use case: ${cleanMailtoField(payload.useCase, 2000)}`,
    `Deployment preference: ${cleanMailtoField(payload.deploymentPreference, 140)}`,
    `Timeline: ${cleanMailtoField(payload.timeline, 80)}`,
    `Compliance requirements: ${cleanMailtoField(payload.complianceRequirements, 2000)}`,
    `Consent accepted: ${payload.consentAccepted ? 'yes' : 'no'}`
  ];

  return buildMailtoUrl(getContactEmail(), subject, isPrivacyPayload ? privacyLines : commercialLines);
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact SmartClover',
  url: `${siteUrl}/contact`,
  description:
    'SmartClover contact page for demo requests, pilot discussions, research partnerships, investor inquiries, and general outreach.',
  mainEntity: {
    '@type': 'Organization',
    name: 'SmartClover',
    url: siteUrl
  }
};

const Contact = ({
  initialInquiryType = inquiryPaths[0].label,
  seoPath = '/contact',
  seoTitle = 'Contact SmartClover | Demo, Research, And Investor Inquiries',
  seoDescription = 'Contact SmartClover through a structured intake for demo requests, research partnerships, investor conversations, and product evaluation.'
}) => {
  const [form, setForm] = useState(() => createInitialFormState(initialInquiryType));
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');
  const [mailtoUrl, setMailtoUrl] = useState('');
  const [directMailtoUrl, setDirectMailtoUrl] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setDirectMailtoUrl(`mailto:${getContactEmail()}`);
    setIsHydrated(true);

    if (typeof window !== 'undefined') {
      const inquiry = new URLSearchParams(window.location.search).get('inquiry');

      if (inquiry === 'privacy') {
        setForm((current) => ({ ...current, inquiryType: privacyInquiryLabel }));
      }
    }
  }, []);

  const isPrivacyInquiry = form.inquiryType === privacyInquiryLabel;

  const canSubmit = useMemo(() => {
    if (isPrivacyInquiry) {
      return Boolean(
        form.inquiryType.trim() &&
          form.fullName.trim() &&
          form.email.trim() &&
          form.useCase.trim() &&
          form.consentAccepted
      );
    }

    return Boolean(
      form.inquiryType.trim() &&
      form.fullName.trim() &&
      form.email.trim() &&
      form.organization.trim() &&
      form.useCase.trim() &&
      form.complianceRequirements.trim() &&
      form.consentAccepted
    );
  }, [form, isPrivacyInquiry]);

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const chooseInquiryPath = (value) => {
    updateField('inquiryType', value);
    setFeedback('');
    setStatus('idle');

    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    setStatus('submitting');
    setFeedback('');
    setMailtoUrl('');

    const submissionPayload = isPrivacyInquiry
      ? {
          ...form,
          role: '',
          organizationType: '',
          deploymentPreference: '',
          timeline: '',
          complianceRequirements: form.complianceRequirements.trim()
        }
      : form;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionPayload)
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Unable to submit request.');
      }

      if (payload?.relayStatus === 'manual') {
        setStatus('manual');
        setFeedback(
          payload?.message ||
            'Automatic routing is not confirmed. Please open the email fallback to complete manual routing.'
        );
        setMailtoUrl(payload?.mailtoUrl || buildClientFallbackMailtoUrl(submissionPayload));
        return;
      }

      setStatus('success');
      setFeedback(payload?.message || 'Inquiry submitted.');
      setMailtoUrl(payload?.mailtoUrl || '');
      setForm(createInitialFormState(initialInquiryType));
    } catch (error) {
      setStatus('error');
      setFeedback(error.message || 'Unexpected error. Use the optional pre-filled email fallback to complete manual routing.');
      setMailtoUrl(buildClientFallbackMailtoUrl(submissionPayload));
    }
  };

  return (
    <>
      <PageSeo
        title={seoTitle}
        description={seoDescription}
        path={seoPath}
        jsonLd={contactSchema}
      />

      <section className="hero-shell" aria-labelledby="contact-hero-title">
        <div className="contact-hero-grid">
          <div className="hero-panel">
            <div className="hero-kicker-row">
              <span className="tagline">Contact SmartClover</span>
              <span className="proof-pill">
                <strong>Primary CTA</strong> Book demo
              </span>
            </div>
            <div className="hero-copy">
              <h1 id="contact-hero-title" className="hero-title">
                One contact hub for demos, pilots, research, and investor conversations.
              </h1>
              <p>
                SmartClover routes public inbound requests through one structured hub. The main path is a product demo
                or pilot; research, investor, and general inquiries stay explicit.
              </p>
            </div>
            <ul className="hero-evidence-list">
              <li>
                <strong>Primary route:</strong>
                book a demo or request a pilot for CerviGuard and related deployment fit.
              </li>
              <li>
                <strong>Secondary routes:</strong>
                research partnership and investor conversations are handled through the same structured intake.
              </li>
              <li>
                <strong>Trust reinforcement:</strong>
                pricing, how-to-buy, and trust routes remain reachable from the same page.
              </li>
            </ul>
          </div>

          <div className="detail-panel">
            <div className="section-heading">
              <h2>Choose the right inquiry path first</h2>
              <p>Picking the right path helps SmartClover route the first reply and next step correctly.</p>
            </div>
            <div className="path-grid">
              {inquiryPaths.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`path-card${form.inquiryType === item.label ? ' is-active' : ''}`}
                  aria-pressed={form.inquiryType === item.label}
                  onClick={() => chooseInquiryPath(item.label)}
                >
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="contact-layout" aria-labelledby="inquiry-form-heading">
        <div id="inquiry-form" className="contact-form-shell">
          <div className="section-heading">
            <h2 id="inquiry-form-heading">Structured inquiry form</h2>
            <p>
              Provide enough detail for routing, trust review, and follow-up. The selected inquiry path stays editable
              inside the form.
            </p>
          </div>

          <form
            action="/api/contact"
            method="post"
            onSubmit={onSubmit}
            className="contact-form"
            noValidate
            aria-describedby={feedback ? 'contact-form-feedback' : undefined}
          >
            <div className="field-grid">
              <label className="field-span-2">
                Inquiry type *
                <select
                  name="inquiryType"
                  value={form.inquiryType}
                  onChange={(event) => updateField('inquiryType', event.target.value)}
                  required
                >
                  {inquiryPaths.map((item) => (
                    <option key={item.label} value={item.label}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Full name *
                <input
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={(event) => updateField('fullName', event.target.value)}
                  required
                />
              </label>

              <label>
                Email *
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  required
                />
              </label>

              <label>
                Organization {isPrivacyInquiry ? '(optional)' : '*'}
                <input
                  name="organization"
                  type="text"
                  value={form.organization}
                  onChange={(event) => updateField('organization', event.target.value)}
                  required={!isPrivacyInquiry}
                />
              </label>

              {!isPrivacyInquiry ? (
                <>
                  <label>
                    Role *
                    <select
                      name="role"
                      value={form.role}
                      onChange={(event) => updateField('role', event.target.value)}
                    >
                      {roleOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Organization type *
                    <select
                      name="organizationType"
                      value={form.organizationType}
                      onChange={(event) => updateField('organizationType', event.target.value)}
                    >
                      {orgTypeOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Deployment preference *
                    <select
                      name="deploymentPreference"
                      value={form.deploymentPreference}
                      onChange={(event) => updateField('deploymentPreference', event.target.value)}
                    >
                      {deploymentOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Target timeline *
                    <select
                      name="timeline"
                      value={form.timeline}
                      onChange={(event) => updateField('timeline', event.target.value)}
                    >
                      {timelineOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              ) : null}

              <label className="field-span-2">
                {isPrivacyInquiry ? 'Privacy question or request details *' : 'Primary use case or conversation goal *'}
                <textarea
                  name="useCase"
                  value={form.useCase}
                  onChange={(event) => updateField('useCase', event.target.value)}
                  rows={4}
                  required
                />
                <span className="field-hint">
                  {isPrivacyInquiry
                    ? 'Do not include sensitive clinical, credential, or unnecessary personal data in this form.'
                    : 'Example: cervical screening pilot scope, data-governance fit, research collaboration idea, or investor review focus.'}
                </span>
              </label>

              <label className="field-span-2">
                {isPrivacyInquiry ? 'Additional privacy context (optional)' : 'Trust, compliance, or security requirements *'}
                <textarea
                  name="complianceRequirements"
                  value={form.complianceRequirements}
                  onChange={(event) => updateField('complianceRequirements', event.target.value)}
                  rows={4}
                  required={!isPrivacyInquiry}
                />
              </label>
            </div>

            <label className="hidden-field" aria-hidden="true">
              Leave this field blank
              <input
                name="website"
                type="text"
                autoComplete="off"
                tabIndex={-1}
                value={form.website}
                onChange={(event) => updateField('website', event.target.value)}
              />
            </label>

            <label className="checkbox-row">
              <input
                name="consentAccepted"
                type="checkbox"
                value="true"
                checked={form.consentAccepted}
                onChange={(event) => updateField('consentAccepted', event.target.checked)}
              />
              <span>
                I confirm that SmartClover may use this information to reply to this inquiry and route the next step.
              </span>
            </label>

            <div className="hero-action-row">
              <button
                type="submit"
                className="button primary"
                disabled={isHydrated && (!canSubmit || status === 'submitting')}
              >
                {status === 'submitting' ? 'Submitting...' : 'Send inquiry'}
              </button>
              <a
                href={directMailtoUrl || getServerRenderedMailtoUrl()}
                className="button secondary"
                aria-label="Email SmartClover instead"
              >
                Email instead
              </a>
            </div>

            {feedback ? (
              <p
                id="contact-form-feedback"
                className={`form-feedback ${status === 'success' ? 'success' : status === 'manual' ? 'warning' : 'error'}`}
                role={status === 'error' ? 'alert' : 'status'}
                aria-live={status === 'error' ? 'assertive' : 'polite'}
                aria-atomic="true"
              >
                {feedback}
              </p>
            ) : null}

            {mailtoUrl ? (
              <a href={mailtoUrl} className="button tertiary">
                {status === 'success' ? 'Open pre-filled email fallback' : 'Open email fallback to complete routing'}
              </a>
            ) : null}
          </form>
        </div>

        <div className="contact-side-stack">
          <aside className="contact-side-card" aria-labelledby="contact-response-heading">
            <h3 id="contact-response-heading">What happens next</h3>
            <ol className="contact-next-steps">
              {nextSteps.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span> {item.description}</span>
                </li>
              ))}
            </ol>
            <p className="small-note">
              Response expectation: qualified inbound requests should usually receive a human reply within one business
              day.
            </p>
          </aside>

          <aside className="contact-side-card" aria-labelledby="contact-trust-links-heading">
            <h3 id="contact-trust-links-heading">Useful routes before or after contact</h3>
            <div className="trust-grid">
              {trustLinks.map((item) => (
                <article key={item.title} className="trust-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link href={item.href} className="button tertiary">
                    Open
                  </Link>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default Contact;
