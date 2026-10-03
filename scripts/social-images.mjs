// Creates editable SVG sources. Export each at 1200 × 630 as public/og-{locale}.png.
import { mkdir, writeFile } from 'node:fs/promises';
import { escapeHtml } from '../src/utils/seo.js';

const copy = {
  pt: { title: 'Calculadora de custos', subtitle: 'AWS Fargate e Fargate Spot', labels: ['Região', 'vCPU e memória', 'Tarefas e duração'], caption: 'Planeje seus custos em nuvem.' },
  en: { title: 'AWS Fargate pricing', subtitle: 'Fargate and Fargate Spot calculator', labels: ['AWS region', 'vCPU and memory', 'Tasks and runtime'], caption: 'Plan your cloud compute costs.' },
  es: { title: 'Calculadora de costos', subtitle: 'AWS Fargate y Fargate Spot', labels: ['Región AWS', 'vCPU y memoria', 'Tareas y duración'], caption: 'Planifica tus costos en la nube.' },
};
await mkdir('assets/social', { recursive: true });
for (const [locale, text] of Object.entries(copy)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#102b46"/>
  <path d="M850 0h350v630H610Z" fill="#153550"/>
  <g stroke="#33506e" stroke-width="1" opacity=".5"><path d="M770 120h430M730 220h470M680 320h520M620 420h580M580 520h620"/><path d="M850 0v630M990 0v630M1130 0v630"/></g>
  <path d="M760 500C800 440 830 470 870 390S950 360 990 280S1070 290 1110 200" fill="none" stroke="#7c9cff" stroke-width="5"/>
  <circle cx="1110" cy="200" r="8" fill="#7c9cff"/>
  <g transform="translate(64 55) scale(.62)" fill="#7c9cff">
    <path d="M49 28H27Q25 28 23.6 29.4L13.4 39.6Q12 41 12 43V85Q12 87 13.4 88.4L23.6 98.6Q25 100 27 100H49V82H34Q30 82 30 78V50Q30 46 34 46H49Z"/>
    <path d="M49 28H27Q25 28 23.6 29.4L13.4 39.6Q12 41 12 43V85Q12 87 13.4 88.4L23.6 98.6Q25 100 27 100H49V82H34Q30 82 30 78V50Q30 46 34 46H49Z" transform="translate(128 0) scale(-1 1)"/>
    <path d="M59 16H69Q73 16 73 20V108Q73 112 69 112H59Q55 112 55 108V20Q55 16 59 16Z"/>
  </g>
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="164" y="105" fill="#d8e3f1" font-size="25" font-weight="700">Fidalgo IT Solutions</text>
    <text x="72" y="242" fill="#ffffff" font-size="58" font-weight="700">${escapeHtml(text.title)}</text>
    <text x="74" y="302" fill="#b9caff" font-size="35">${escapeHtml(text.subtitle)}</text>
    ${text.labels.map((label, index) => `<rect x="74" y="${350 + index * 48}" width="6" height="6" rx="3" fill="#7c9cff"/><text x="96" y="${363 + index * 48}" fill="#d8e3f1" font-size="23">${escapeHtml(label)}</text>`).join('\n    ')}
    <text x="74" y="560" fill="#aebfd2" font-size="22">${escapeHtml(text.caption)}</text>
  </g>
</svg>`;
  await writeFile(`assets/social/og-${locale}.svg`, svg);
}
