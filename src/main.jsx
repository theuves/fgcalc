import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { getLocaleFromPath } from './utils/i18n.js'
import { SHARE_QUERY_KEYS } from './utils/shareEstimate.js'

const root = document.getElementById('root')
const hasSharedEstimate = SHARE_QUERY_KEYS.some((key) => new URLSearchParams(window.location.search).has(key))
const page = (
  <StrictMode>
    <App initialLocale={root.dataset.locale || getLocaleFromPath(window.location.pathname)} initialSearch={window.location.search} />
  </StrictMode>
)

// Shared configurations need a fresh render; static pages hydrate their HTML.
if (root.hasChildNodes() && !hasSharedEstimate) {
  hydrateRoot(root, page)
} else {
  createRoot(root).render(page)
}
