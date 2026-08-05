import React from 'react';
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

  return (
    <header className="bg-[var(--aws-header-bg)] border-b border-[#111827]">
      <div className="max-w-5xl mx-auto px-4 py-2 sm:px-6 lg:px-8 max-sm:px-3">
        <div className="flex items-center justify-between gap-3 overflow-x-auto whitespace-nowrap max-sm:gap-3 max-sm:py-1">
          <div className="flex items-center gap-3 flex-nowrap max-sm:gap-2">
            <h1 className="text-sm sm:text-base md:text-lg font-semibold tracking-tight text-[var(--aws-header-text)] leading-tight shrink-0 max-sm:text-[11px]">
              <span className="font-bold">AWS</span>
              <span className="text-[var(--aws-accent)]"> Fargate </span>
              <span>{messages?.header?.titleMain || 'Calculator'}</span>
            </h1>
            <nav aria-label="main links" className="flex items-center gap-3 text-[11px] leading-none text-[var(--aws-header-muted)] sm:text-xs shrink-0 max-sm:gap-2">
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

          <div className="flex items-center gap-3 shrink-0 max-sm:gap-2">
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
              buttonWidthClass="min-w-[72px] max-sm:min-w-[56px]"
              buttonHeightClass="h-8 max-sm:h-7"
              buttonTextClass="text-[11px] max-sm:text-[10px]"
              buttonPaddingClass="px-2 max-sm:px-1"
            />
            <RegionInput
              value={region}
              onChange={setRegion}
              t={messages}
              buttonWidthClass="min-w-[150px] max-sm:min-w-[116px]"
              buttonHeightClass="h-8 max-sm:h-7"
              buttonTextClass="text-[11px] max-sm:text-[10px]"
              buttonPaddingClass="px-2 max-sm:px-1"
            />
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
