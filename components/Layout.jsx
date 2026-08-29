import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import versionData from '../version.json';
import ConsentManager from './ConsentManager';
import ServedBy from './ServedByComponent';

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'CerviGuard', href: '/cerviguard' },
  { label: 'Products', href: '/products' },
  { label: 'Research', href: '/research' },
  { label: 'Trust', href: '/trust' },
  { label: 'Blog', href: '/blog' }
];

const footerGroups = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'CerviGuard', href: '/cerviguard' },
      { label: 'Products', href: '/products' },
      { label: 'Research', href: '/research' },
      { label: 'Blog', href: '/blog' }
    ]
  },
  {
    title: 'Review',
    links: [
      { label: 'Trust', href: '/trust' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'How to Buy', href: '/how-to-buy' },
      { label: 'Proof', href: '/proof' },
      { label: 'Regulatory', href: '/regulatory' }
    ]
  },
  {
    title: 'Public resources',
    links: [
      { label: 'CerviGuard live product', href: 'https://cerviguard.link', external: true },
      { label: 'TealGuard project website', href: 'https://tealguard.eu', external: true },
      { label: 'CerviGuard GitHub', href: 'https://github.com/SmartCloverAI/CerviGuard', external: true },
      { label: 'SmartClover Hugging Face', href: 'https://huggingface.co/smartclover', external: true },
      { label: 'Gender Equality Plan', href: '/gender-equality-plan' },
      { label: 'GEP PDF', href: '/docs/SmartClover_Gender_Equality_Plan_2026_2028.pdf', external: true },
      { label: 'Contact SmartClover', href: '/contact' }
    ]
  }
];

const Layout = ({ children, hostId = 'unknown' }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const productsRoutes = ['/products', '/pricing', '/how-to-buy'];
  const researchRoutes = ['/research', '/cloud-architecture', '/decentralized', '/cybersecurity'];
  const aboutRoutes = ['/about', '/values'];
  const trustRoutes = ['/trust', '/proof', '/regulatory'];

  const isLinkActive = (href) => {
    if (href === '/blog') {
      return router.pathname.startsWith(href);
    }

    if (href === '/about') {
      return aboutRoutes.some((route) => router.pathname === route || router.pathname.startsWith(`${route}/`));
    }

    if (href === '/products') {
      return productsRoutes.some((route) => router.pathname === route || router.pathname.startsWith(`${route}/`));
    }

    if (href === '/research') {
      return researchRoutes.some((route) => router.pathname === route || router.pathname.startsWith(`${route}/`));
    }

    if (href === '/trust') {
      return trustRoutes.some((route) => router.pathname === route || router.pathname.startsWith(`${route}/`));
    }

    return router.pathname === href;
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.asPath]);

  return (
    <>
      <div className="site-shell">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <header className="site-header">
          <nav className="nav-shell" aria-label="Primary">
            <div className="nav-inner">
              <div className="nav-header">
                <Link href="/" className="nav-brand" aria-label="SmartClover home">
                  <Image src="/smartclover-logo_v2.png" alt="SmartClover logo" width={48} height={48} className="nav-logo" />
                  <span className="nav-brand-block">
                    <span className="nav-brand-text">SmartClover</span>
                    <span className="nav-brand-subtitle">Healthcare AI for screening workflows and research</span>
                  </span>
                </Link>
                <button
                  type="button"
                  className="nav-toggle"
                  aria-expanded={isMenuOpen}
                  aria-controls="primary-navigation"
                  aria-label="Toggle navigation menu"
                  onClick={() => setIsMenuOpen((open) => !open)}
                >
                  <span className="nav-toggle-icon" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className="nav-toggle-text">{isMenuOpen ? 'Close' : 'Menu'}</span>
                </button>
              </div>
              <div id="primary-navigation" className={`nav-links${isMenuOpen ? ' open' : ''}`}>
                {navLinks.map((link) => {
                  const isActive = isLinkActive(link.href);
                  const isCurrentPage = router.pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`nav-link${isActive ? ' active' : ''}`}
                      aria-current={isCurrentPage ? 'page' : undefined}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Link href="/contact#inquiry-form" className="button primary nav-cta" onClick={() => setIsMenuOpen(false)}>
                  Book demo
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <main id="main-content" tabIndex={-1}>{children}</main>

        <footer className="site-footer">
          <div className="site-footer-panel">
            <div className="site-footer-top">
              <div className="site-footer-intro">
                <span className="tagline">SmartClover</span>
                <h2>Healthcare AI for screening workflows and research.</h2>
                <p>
                  CerviGuard leads our product work for cervical-screening teams. DataGems supports synthetic-data
                  research workflows. Trust, pricing, buying, and contact pages provide direct access to product,
                  governance, and commercial information.
                </p>
                <div className="cta-links">
                  <Link href="/contact#inquiry-form" className="button primary">
                    Book demo
                  </Link>
                  <Link href="/trust" className="button secondary">
                    Open trust center
                  </Link>
                </div>
              </div>
              <div className="site-footer-grid">
                {footerGroups.map((group) => (
                  <div key={group.title} className="site-footer-group">
                    <h3>{group.title}</h3>
                    <ul className="list-reset">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          {link.external ? (
                            <a href={link.href} target="_blank" rel="noopener noreferrer">
                              {link.label}
                            </a>
                          ) : (
                            <Link href={link.href}>{link.label}</Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="site-footer-bottom">
              <ServedBy hostId={hostId} />
              <p className="site-footer-meta">
                © {new Date().getFullYear()} SmartClover. v{versionData.version}
                <span>Clinical software and healthcare AI research</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
      <ConsentManager />
    </>
  );
};

export default Layout;
