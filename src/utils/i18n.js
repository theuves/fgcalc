import { messages as en } from '../locales/en.js';
import { messages as pt } from '../locales/pt.js';
import { messages as es } from '../locales/es.js';
import { getLocaleFromPath } from './locales.js';
export { SUPPORTED_LOCALES, LOCALE_LABELS, getLocaleFromPath } from './locales.js';

export const t = { en, pt, es };
export const resolveLocaleMessages = (path) => t[getLocaleFromPath(path)];
