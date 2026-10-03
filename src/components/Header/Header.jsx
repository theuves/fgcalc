import React, { useEffect, useRef } from 'react';
import { LOCALE_LABELS } from '../../utils/i18n';
import BrandMark from '../BrandMark';
import ArrowUpRight from '../ArrowUpRight';
import { SEO_CONTENT } from '../../utils/seoContent';

const FLAG_IMAGES = {
  pt: '/flags/br.svg',
  en: '/flags/us.svg',
  es: '/flags/es.svg',
};

function LanguageSelector({ locale, label, onLocaleChange }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) menuRef.current.open = false;
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape' && menuRef.current?.open) {
        menuRef.current.open = false;
        menuRef.current.querySelector('summary')?.focus();
      }
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  const selectLocale = (event, code) => {
    // Keep ordinary links crawlable and support opening a language in a new tab.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (menuRef.current) menuRef.current.open = false;
    onLocaleChange(code);
  };

  return (
    <details className="language-menu" ref={menuRef}>
      <summary className="language-trigger" aria-label={`${label}: ${LOCALE_LABELS[locale]}`}>
        <img className="language-flag" src={FLAG_IMAGES[locale]} alt="" width="24" height="18" />
        <span className="language-name">{LOCALE_LABELS[locale]}</span>
        <span className="language-code">{locale.toUpperCase()}</span>
        <svg className="language-chevron" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 6 5 5 5-5" /></svg>
      </summary>
      <div className="language-options" role="group" aria-label={label}>
        {Object.entries(LOCALE_LABELS).map(([code, name]) => (
          <a className={`language-option${locale === code ? ' is-current' : ''}`} href={`/${code}`} hrefLang={code} key={code} lang={code} aria-current={locale === code ? 'page' : undefined} onClick={(event) => selectLocale(event, code)}>
            <img className="language-flag" src={FLAG_IMAGES[code]} alt="" width="24" height="18" loading="lazy" />
            <span>{name}</span>
            <span className="language-option-code">{code.toUpperCase()}</span>
          </a>
        ))}
      </div>
    </details>
  );
}

export default function Header({ locale, t, onLocaleChange }) {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div className="header-identity">
          <a className="brand-mark-link" href={`/${locale}`} aria-label={SEO_CONTENT[locale].heading}><BrandMark className="brand-mark" /></a>
          <div className="brand-copy">
            <a className="brand-title-link" href={`/${locale}`}><h1 className="brand-title">{SEO_CONTENT[locale].heading}</h1></a>
            <a className="brand-byline" href={`https://www.fidalgoitsolutions.com.br/${locale === 'pt' ? 'pt' : 'en'}`} target="_blank" rel="noopener noreferrer">{t.ui.headerByline}</a>
          </div>
        </div>
        <div className="header-actions">
          <LanguageSelector locale={locale} label={t.header.languageLabel} onLocaleChange={onLocaleChange} />
          <a className="header-cta" href="mailto:contato@fidalgoitsolutions.com.br" aria-label={t.ui.headerCta}>
            <span className="header-cta-label">{t.ui.headerCta}</span><ArrowUpRight className="header-cta-arrow" />
          </a>
        </div>
      </div>
    </header>
  );
}
