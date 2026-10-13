import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { getLocaleFromPath, loadLocale } from './utils/locales.js'
import { SHARE_QUERY_KEYS } from './utils/shareEstimate.js'

const root = document.getElementById('root')
const initialLocale = window.location.pathname === '/'
  ? getLocaleFromPath('/', navigator.languages?.length ? navigator.languages : [navigator.language])
  : root.dataset.locale || getLocaleFromPath(window.location.pathname)
const initialTranslation = await loadLocale(initialLocale)
const hasSharedEstimate = SHARE_QUERY_KEYS.some((key) => new URLSearchParams(window.location.search).has(key))
const page = (
  <StrictMode>
    <App initialLocale={initialLocale} initialTranslation={initialTranslation} initialSearch={window.location.search} />
  </StrictMode>
)

// Shared configurations need a fresh render; static pages hydrate their HTML.
if (root.hasChildNodes() && !hasSharedEstimate && root.dataset.locale === initialLocale) {
  hydrateRoot(root, page)
} else {
  createRoot(root).render(page)
}
