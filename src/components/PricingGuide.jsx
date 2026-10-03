import { SEO_CONTENT } from '../utils/seoContent.js';

export default function PricingGuide({ locale, awsPricingUrl }) {
  const content = SEO_CONTENT[locale];
  return (
    <>
      <section id="pricing-guide" className="pricing-guide" aria-labelledby="pricing-guide-title">
        <h2 id="pricing-guide-title">{content.guideTitle}</h2>
        <p>{content.guideIntro}</p>
        <ol>{content.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        <h3>{content.formulaTitle}</h3>
        <p className="pricing-formula">{content.formula}</p>
        <p>{content.assumptions}</p>
        <p>{content.example}</p>
        <h3>{content.sourcesTitle}</h3>
        <p>{content.sources}</p>
        <p>{content.limits}</p>
        <ul className="pricing-sources">
          <li><a href={awsPricingUrl} target="_blank" rel="noopener noreferrer">{content.pricingLink}</a></li>
          <li><a href="https://github.com/theuves/fgcalc/blob/master/src/utils/data.js" target="_blank" rel="noopener noreferrer">{content.dataLink}</a></li>
          <li><a href="https://www.exchangerate-api.com/docs/free" target="_blank" rel="noopener noreferrer">{content.exchangeLink}</a></li>
        </ul>
      </section>
      <section id="faq" className="faq-section" aria-labelledby="faq-title">
        <h2 id="faq-title">{content.faqTitle}</h2>
        <div className="faq-list">
          {content.faq.map(({ question, answer }) => (
            <details className="faq-item" key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
