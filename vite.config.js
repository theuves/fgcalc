import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { getLocaleFromPath } from './src/utils/i18n.js'
import { getSeo, renderSeoHead } from './src/utils/seo.js'

// https://vite.dev/config/
export default defineConfig(({ isPreview, mode }) => {
  const siteUrl = loadEnv(mode, resolve('.'), 'VITE_').VITE_SITE_URL
  return {
    appType: isPreview ? 'mpa' : 'spa',
    plugins: [react(), {
      name: 'localized-static-pages',
      apply: 'serve',
      configurePreviewServer(server) {
        server.middlewares.use((request, _response, next) => {
          const match = request.url.match(/^\/(pt|en|es)\/?(\?.*)?$/)
          if (match) request.url = `/${match[1]}/index.html${match[2] || ''}`
          next()
        })
        return () => {
          server.middlewares.use((request, response, next) => {
            if (/^\/(?:index\.html|(?:pt|en|es)\/index\.html|404\.html)(?:\?|$)/.test(request.url)) return next()
            readFile(resolve(server.config.root, server.config.build.outDir, '404.html'), 'utf8')
              .then((html) => {
                response.statusCode = 404
                response.setHeader('Content-Type', 'text/html; charset=utf-8')
                response.end(html)
              })
              .catch(next)
          })
        }
      },
      transformIndexHtml(html, context) {
        const locale = getLocaleFromPath((context.originalUrl || '/').split('?')[0])
        return html
          .replace('<html lang="pt-BR">', `<html lang="${getSeo(locale, siteUrl).language}">`)
          .replace('data-locale="pt"', `data-locale="${locale}"`)
          .replace('<!--seo-head-->', () => renderSeoHead(locale, siteUrl))
          .replace('<!--app-html-->', '')
      },
    }],
  }
})
