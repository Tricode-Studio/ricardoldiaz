import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'

const distDir = path.resolve('dist')
const templatePath = path.join(distDir, 'index.html')

const routes = [
  { pathname: '/', outputPath: path.join(distDir, 'index.html') },
  { pathname: '/historia', outputPath: path.join(distDir, 'historia', 'index.html') },
]

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function buildHeadMarkup(pathname, site) {
  const route = site.getRouteSeo(pathname)
  const canonicalUrl = new URL(route.canonicalPath, `${site.SITE_URL}/`).toString()
  const structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': site.buildStructuredData(pathname),
  })

  return [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    '<meta name="keywords" content="escritorio rural Uruguay, negocios rurales, remates ganaderos, comercialización de ganado, intermediación agropecuaria, venta de hacienda, venta de campos, exportación ganadera Uruguay, asesoría agropecuaria, Lote 21, Trinidad Flores" />',
    `<meta name="author" content="${escapeHtml(site.SITE_NAME)}" />`,
    '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />',
    '<meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />',
    `<link rel="canonical" href="${canonicalUrl}" />`,
    `<link rel="alternate" hreflang="es-UY" href="${canonicalUrl}" />`,
    `<meta property="og:type" content="${route.type ?? 'website'}" />`,
    '<meta property="og:locale" content="es_UY" />',
    `<meta property="og:site_name" content="${escapeHtml(site.SITE_NAME)}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:url" content="${canonicalUrl}" />`,
    `<meta property="og:image" content="${site.DEFAULT_OG_IMAGE}" />`,
    `<meta property="og:image:secure_url" content="${site.DEFAULT_OG_IMAGE}" />`,
    `<meta property="og:image:width" content="${site.DEFAULT_OG_IMAGE_WIDTH}" />`,
    `<meta property="og:image:height" content="${site.DEFAULT_OG_IMAGE_HEIGHT}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(site.DEFAULT_OG_IMAGE_ALT)}" />`,
    '<meta name="twitter:card" content="summary" />',
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${site.DEFAULT_OG_IMAGE}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(site.DEFAULT_OG_IMAGE_ALT)}" />`,
    `<script id="route-jsonld" type="application/ld+json">${structuredData.replaceAll('<', '\\u003c')}</script>`,
  ].join('\n    ')
}

async function renderRoute(template, pathname, AppComponent, site, MemoryRouterComponent) {
  const appHtml = renderToString(
    React.createElement(
      MemoryRouterComponent,
      { initialEntries: [pathname] },
      React.createElement(AppComponent),
    ),
  )

  return template
    .replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/, `<!-- SEO:START -->\n    ${buildHeadMarkup(pathname, site)}\n    <!-- SEO:END -->`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
}

async function main() {
  const vite = await createServer({
    appType: 'custom',
    server: { middlewareMode: true },
    ssr: {
      noExternal: ['react-router', 'react-router-dom'],
    },
  })

  try {
    const template = await readFile(templatePath, 'utf8')
    const { default: App } = await vite.ssrLoadModule('/src/App.tsx')
    const site = await vite.ssrLoadModule('/src/seo/site.ts')
    const router = await vite.ssrLoadModule('react-router')

    for (const route of routes) {
      const html = await renderRoute(template, route.pathname, App, site, router.MemoryRouter)
      await mkdir(path.dirname(route.outputPath), { recursive: true })
      await writeFile(route.outputPath, html, 'utf8')
    }
  } finally {
    await vite.close()
  }
}

await main()
