import React, { useEffect, useState } from 'react';
import RegionInput from './RegionInput';
import CurrencyInput from './CurrencyInput';
import { LOCALE_LABELS } from '../../utils/i18n';

export default function Header({
  region,
  setRegion,
  currency,
  setCurrency,
  currencyList,
  isLoadingRates,
  locale,
  t,
  onLocaleChange,
}) {
  const messages = t || {};
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleLocaleChange = (localeCode) => {
    setIsMobileMenuOpen(false);
    onLocaleChange(localeCode);
  };

  return (
    <header className="bg-[var(--aws-header-bg)] border-b border-[#111827]">
      <div className="max-w-5xl mx-auto px-4 py-2 sm:px-6 lg:px-8 max-sm:px-3">
        <div className="flex items-center justify-between gap-3 whitespace-nowrap max-sm:flex-col max-sm:items-stretch max-sm:gap-2 max-sm:py-1">
          <div className="flex items-center gap-3 flex-nowrap max-sm:justify-between max-sm:gap-2">
            <h1 className="text-sm sm:text-base md:text-lg font-semibold tracking-tight text-[var(--aws-header-text)] leading-tight shrink-0 max-sm:text-[11px]">
              <a
                href={`/${locale || 'en'}`}
                className="inline-block hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aws-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--aws-header-bg)]"
              >
                <span className="font-bold">AWS</span>
                <span className="text-[var(--aws-accent)]"> Fargate </span>
                <span>Calculator</span>
              </a>
            </h1>
            <button
              type="button"
              className="hidden max-sm:inline-flex h-8 w-8 items-center justify-center border border-[#3d4758] text-[var(--aws-header-text)] hover:bg-[#2b3647] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aws-accent)]"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-header-menu"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden="true" className="flex flex-col gap-1">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
            </button>
            <nav aria-label="main links" className="flex items-center gap-3 text-[11px] leading-none text-[var(--aws-header-muted)] sm:text-xs shrink-0 max-sm:hidden max-sm:gap-2">
              <a
                href={`/${locale || 'en'}`}
                className="hover:text-[var(--aws-header-text)]"
                aria-label={messages?.header?.links?.home || 'Home'}
              >
                {messages?.header?.links?.home || 'home'}
              </a>
              <a
                href="https://github.com/theuves/fgcalc"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--aws-header-text)]"
                aria-label={messages?.header?.links?.repo || 'Source code on GitHub'}
              >
                {messages?.header?.links?.repo || 'repo'}
              </a>
              <a
                href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-capacity-types.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--aws-header-text)]"
                aria-label={messages?.header?.links?.docs || 'AWS Fargate capacity types documentation'}
              >
                {messages?.header?.links?.docs || 'docs'}
              </a>
            </nav>
          </div>

          <div className="flex items-center justify-end gap-3 shrink-0 max-sm:hidden">
            <nav aria-label="language" className="flex items-center gap-1 text-[11px] leading-none text-[var(--aws-header-muted)] sm:text-xs">
              {Object.keys(LOCALE_LABELS).map((localeCode) => (
                <a
                  key={localeCode}
                  href={`/${localeCode}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onLocaleChange(localeCode);
                  }}
                  className={`px-1 py-1 rounded-sm ${
                    locale === localeCode
                      ? 'text-[var(--aws-header-text)] font-semibold'
                      : 'hover:text-[var(--aws-header-text)]'
                  }`}
                  aria-current={locale === localeCode ? 'page' : undefined}
                  aria-label={LOCALE_LABELS[localeCode]}
                >
                  {localeCode}
                </a>
              ))}
            </nav>

            <CurrencyInput
              value={currency}
              onChange={setCurrency}
              currencyList={currencyList}
              t={messages}
              locale={locale}
              buttonWidthClass="min-w-[72px] max-sm:min-w-[54px]"
              buttonHeightClass="h-8 max-sm:h-7"
              buttonTextClass="text-[11px] max-sm:text-[10px]"
              buttonPaddingClass="px-2 max-sm:px-1"
            />
            <RegionInput
              value={region}
              onChange={setRegion}
              t={messages}
              buttonWidthClass="min-w-[150px] max-sm:min-w-[112px]"
              buttonHeightClass="h-8 max-sm:h-7"
              buttonTextClass="text-[11px] max-sm:text-[10px]"
              buttonPaddingClass="px-2 max-sm:px-1"
            />
          </div>
        </div>

        <div
          id="mobile-header-menu"
          className={`${isMobileMenuOpen ? 'flex' : 'hidden'} sm:hidden mt-2 flex-col gap-3 border-t border-[#3d4758] pt-3`}
        >
          <nav aria-label="main links" className="flex items-center gap-4 text-xs text-[var(--aws-header-muted)]">
            <a href={`/${locale || 'en'}`} className="hover:text-[var(--aws-header-text)]">
              {messages?.header?.links?.home || 'home'}
            </a>
            <a
              href="https://github.com/theuves/fgcalc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--aws-header-text)]"
            >
              {messages?.header?.links?.repo || 'repo'}
            </a>
            <a
              href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-capacity-types.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--aws-header-text)]"
            >
              {messages?.header?.links?.docs || 'docs'}
            </a>
          </nav>

          <div className="flex flex-col items-stretch gap-2">
            <nav aria-label="language" className="flex items-center gap-1 text-xs text-[var(--aws-header-muted)]">
              {Object.keys(LOCALE_LABELS).map((localeCode) => (
                <a
                  key={localeCode}
                  href={`/${localeCode}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleLocaleChange(localeCode);
                  }}
                  className={`px-1 py-1 rounded-sm ${
                    locale === localeCode
                      ? 'text-[var(--aws-header-text)] font-semibold'
                      : 'hover:text-[var(--aws-header-text)]'
                  }`}
                  aria-current={locale === localeCode ? 'page' : undefined}
                  aria-label={LOCALE_LABELS[localeCode]}
                >
                  {localeCode}
                </a>
              ))}
            </nav>

            <div className="flex flex-col items-stretch gap-2">
              <CurrencyInput
                value={currency}
                onChange={setCurrency}
                currencyList={currencyList}
                t={messages}
                locale={locale}
                buttonWidthClass="w-full min-w-0"
                buttonHeightClass="h-7"
                buttonTextClass="text-[10px]"
                buttonPaddingClass="px-1"
              />
              <RegionInput
                value={region}
                onChange={setRegion}
                t={messages}
                buttonWidthClass="w-full min-w-0"
                buttonHeightClass="h-7"
                buttonTextClass="text-[10px]"
                buttonPaddingClass="px-1"
              />
            </div>
          </div>
        </div>

        {isLoadingRates && (
          <p className="text-xs text-[var(--aws-header-muted)] mt-1 flex items-center" role="status" aria-live="polite">
            <svg className="animate-spin h-3 w-3 mr-2 text-[var(--aws-accent)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {messages?.header?.updatingRates || 'Updating exchange rates...'}
          </p>
        )}
      </div>
    </header>
  );
}
