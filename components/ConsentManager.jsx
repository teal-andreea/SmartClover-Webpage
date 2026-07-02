import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useMemo, useRef, useState } from 'react';

const GA_ID = 'G-L7K8RBNW1L';
const STORAGE_KEY = 'smartclover_consent_v1';

const defaultConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  decided: false,
  updatedAt: null
};

const normalizeConsent = (value) => ({
  necessary: true,
  analytics: Boolean(value?.analytics),
  marketing: Boolean(value?.marketing),
  decided: Boolean(value?.decided),
  updatedAt: typeof value?.updatedAt === 'string' ? value.updatedAt : null
});

const ConsentManager = () => {
  const panelHeadingRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [consent, setConsent] = useState(defaultConsent);
  const [analyticsDraft, setAnalyticsDraft] = useState(false);
  const [marketingDraft, setMarketingDraft] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setIsBannerVisible(true);
      } else {
        const parsed = normalizeConsent(JSON.parse(raw));
        setConsent(parsed);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      setIsBannerVisible(true);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !isLoaded) {
      return;
    }

    window[`ga-disable-${GA_ID}`] = !consent.analytics;
  }, [consent.analytics, isLoaded]);

  useEffect(() => {
    setAnalyticsDraft(consent.analytics);
    setMarketingDraft(consent.marketing);
  }, [consent.analytics, consent.marketing]);

  useEffect(() => {
    if (isPanelOpen) {
      panelHeadingRef.current?.focus();
    }
  }, [isPanelOpen]);

  const saveConsent = (nextConsent, closePanel = true) => {
    const normalized = normalizeConsent({
      ...nextConsent,
      decided: true,
      updatedAt: new Date().toISOString()
    });

    setConsent(normalized);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }

    if (closePanel) {
      setIsBannerVisible(false);
      setIsPanelOpen(false);
    }
  };

  const openSettings = () => {
    setAnalyticsDraft(consent.analytics);
    setMarketingDraft(consent.marketing);
    setIsBannerVisible(false);
    setIsPanelOpen(true);
  };

  const shouldShowBanner = isLoaded && !consent.decided && isBannerVisible && !isPanelOpen;
  const shouldShowPanel = isPanelOpen;
  const shouldShowSettingsButton = isLoaded && !shouldShowBanner && !isPanelOpen;

  const consentSummary = useMemo(() => {
    if (!isLoaded || !consent.decided) {
      return 'Preferences not set';
    }

    if (consent.analytics) {
      return 'Analytics enabled';
    }

    return 'Analytics disabled';
  }, [consent.analytics, consent.decided, isLoaded]);

  return (
    <>
      {consent.analytics ? (
        <>
          <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="smartclover-ga" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      ) : null}

      {shouldShowSettingsButton ? (
        <button
          type="button"
          className="consent-settings-button"
          onClick={openSettings}
          aria-label={`Cookie settings (${consentSummary})`}
          title={`Cookie settings (${consentSummary})`}
        >
          <span className="consent-settings-label">Cookies</span>
          <span className="consent-settings-summary">({consentSummary})</span>
        </button>
      ) : null}

      {shouldShowBanner ? (
        <section className="consent-banner" aria-label="Cookie notice">
          <div className="consent-banner-copy">
            <h2>Cookie choices</h2>
            <p>We use necessary cookies for site function and optional analytics only with your consent.</p>
          </div>
          <div className="consent-banner-actions">
            <button
              type="button"
              className="button primary"
              onClick={() => saveConsent({ ...consent, analytics: true, marketing: false })}
            >
              Accept analytics
            </button>
            <button
              type="button"
              className="button secondary"
              onClick={() => saveConsent({ ...consent, analytics: false, marketing: false })}
            >
              Reject optional
            </button>
            <button type="button" className="button tertiary" onClick={openSettings}>
              Customize
            </button>
          </div>
        </section>
      ) : null}

      {shouldShowPanel ? (
        <section className="consent-panel" aria-label="Cookie and analytics preferences">
          <h2 ref={panelHeadingRef} tabIndex={-1}>Cookie and analytics preferences</h2>
          <p>
            We use strictly necessary cookies for site function. Optional analytics is enabled only after your explicit
            consent.
          </p>

          <div className="consent-option-list">
            <label className="consent-option">
              <span>
                <strong>Necessary cookies</strong>
                <small>Required for core website functionality and preference persistence.</small>
              </span>
              <input type="checkbox" checked disabled />
            </label>

            <label className="consent-option">
              <span>
                <strong>Analytics cookies</strong>
                <small>Usage metrics to improve performance and content quality.</small>
              </span>
              <input
                type="checkbox"
                checked={analyticsDraft}
                onChange={(event) => setAnalyticsDraft(event.target.checked)}
              />
            </label>

            <label className="consent-option">
              <span>
                <strong>Marketing cookies</strong>
                <small>Currently inactive; kept disabled unless marketing tooling is introduced.</small>
              </span>
              <input
                type="checkbox"
                checked={marketingDraft}
                onChange={(event) => setMarketingDraft(event.target.checked)}
              />
            </label>
          </div>

          <div className="consent-actions">
            <button
              type="button"
              className="button primary"
              onClick={() => saveConsent({ ...consent, analytics: true, marketing: false })}
            >
              Accept analytics
            </button>
            <button
              type="button"
              className="button secondary"
              onClick={() => saveConsent({ ...consent, analytics: false, marketing: false })}
            >
              Reject optional
            </button>
            <button
              type="button"
              className="button tertiary"
              onClick={() => saveConsent({ ...consent, analytics: analyticsDraft, marketing: marketingDraft })}
            >
              Save preferences
            </button>
          </div>

          <p className="consent-footnote">
            Details are in <Link href="/trust/privacy-policy">Privacy Policy</Link> and{' '}
            <Link href="/trust">Trust Center</Link>.
          </p>
        </section>
      ) : null}
    </>
  );
};

export default ConsentManager;
