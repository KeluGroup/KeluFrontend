import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir   = path.resolve(__dirname, '../dist')
const serverDir = path.resolve(__dirname, '../dist/server')

const ROUTES = [
  '/',
  '/about',
  '/products',
  '/services',
  '/contact',
  '/faq',
  '/privacy',
  '/terms',
  '/cookies',
]

async function prerender() {
  const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')
  const { render } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)

  for (const route of ROUTES) {
    const { html: appHtml } = await render(route)
    const fullHtml = template.replace('<!--app-html-->', appHtml)

    const outPath =
      route === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, route.slice(1), 'index.html')

    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, fullHtml, 'utf-8')
    console.log(`  ✓ ${route}`)
  }

  // Remove the server bundle — not needed in final deploy
  fs.rmSync(serverDir, { recursive: true, force: true })
  console.log('\nSSG build complete.')
}

prerender().catch(err => { console.error(err); process.exit(1) })
