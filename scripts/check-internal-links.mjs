/**
 * Reachability audit over the *prerendered* HTML in `.next/server/app`.
 *
 * Only server-rendered `<a href>` counts for crawler discovery, so this reads
 * the static HTML Next.js emitted at build time rather than a hydrated DOM.
 *
 * Run after `npm run build`:  node scripts/check-internal-links.mjs
 */

import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const APP_DIR = '.next/server/app'

const ROUTES = [
  '/', '/kontakt', '/interior-design-homestyling', '/estimat', '/blogg',
  '/nybygg-oslo', '/renovering-oslo', '/bad-renovering-oslo',
  '/kjokken-renovering-oslo', '/snekker-oslo', '/maling-oslo',
  '/vvs-rorlegger-oslo', '/tilbygg-oslo', '/vinduer-dorer-oslo',
  '/fasade-renovering-oslo', '/gulv-parkett-oslo', '/energioppgradering-oslo',
  '/renovering-frogner', '/renovering-baerum', '/renovering-holmenkollen',
  '/renovering-majorstuen', '/renovering-asker', '/renovering-nordstrand',
  '/blogg/hva-koster-baderomsrenovering-oslo-2026',
  '/blogg/hva-koster-nybygg-oslo-2026',
  '/blogg/hva-koster-renovering-leilighet-oslo',
  '/blogg/tilbygg-eller-flytte',
  '/blogg/velge-totalentreprenor-oslo',
]

async function htmlFiles(dir, acc = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) await htmlFiles(p, acc)
    else if (e.name.endsWith('.html')) acc.push(p)
  }
  return acc
}

/** `<a href="/x">anchor</a>` pairs, tags stripped from the anchor text. */
function anchors(html) {
  const out = []
  const re = /<a\b[^>]*\bhref="(\/[^"#]*)"[^>]*>([\s\S]*?)<\/a>/g
  let m
  while ((m = re.exec(html))) {
    const text = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    out.push({ href: m[1].replace(/\/$/, '') || '/', text })
  }
  return out
}

const files = await htmlFiles(APP_DIR)
const perPage = new Map()
const inbound = new Map(ROUTES.map((r) => [r, new Set()]))
const anchorsByTarget = new Map(ROUTES.map((r) => [r, []]))

for (const f of files) {
  const route =
    '/' + f.slice(APP_DIR.length + 1).replace(/\.html$/, '').replace(/^index$/, '')
  const found = anchors(await readFile(f, 'utf8'))
  perPage.set(route.replace(/\/$/, '') || '/', new Set(found.map((a) => a.href)))
  for (const a of found) {
    if (inbound.has(a.href)) {
      inbound.get(a.href).add(route)
      if (a.text) anchorsByTarget.get(a.href).push(a.text)
    }
  }
}

/* A crawler starts at `/` and follows links, so inbound>0 is not enough: a
   cluster that only links to itself is still undiscoverable. Walk it. */
const crawled = new Set(['/'])
const queue = ['/']
while (queue.length) {
  for (const href of perPage.get(queue.shift()) ?? []) {
    if (inbound.has(href) && !crawled.has(href)) {
      crawled.add(href)
      queue.push(href)
    }
  }
}

const orphans = ROUTES.filter((r) => !crawled.has(r))

console.log(`prerendered HTML files scanned: ${files.length}`)
console.log(`routes audited: ${ROUTES.length}`)
console.log(`reachable by crawl from / via server-rendered <a href>: ${crawled.size}/${ROUTES.length}\n`)

console.log('inbound link count per route (pages that link to it):')
for (const r of ROUTES) {
  const n = inbound.get(r).size
  console.log(`  ${n === 0 && r !== '/' ? 'ORPHAN' : String(n).padStart(6)}  ${r}`)
}

console.log('\ndistinct internal targets in each sampled page:')
for (const r of ['/', '/nybygg-oslo', '/blogg/hva-koster-nybygg-oslo-2026']) {
  const s = perPage.get(r)
  console.log(`  ${r} -> ${s ? s.size : 'n/a'}`)
}

if (process.env.SHOW_ANCHORS) {
  console.log('\nanchor text received by priority pages:')
  for (const r of ['/renovering-baerum', '/kjokken-renovering-oslo']) {
    console.log(`  ${r}`)
    for (const t of [...new Set(anchorsByTarget.get(r))]) console.log(`      "${t}"`)
  }
}

if (orphans.length) {
  console.log(`\nSTILL ORPHANED (${orphans.length}):`)
  for (const o of orphans) console.log(`  ${o}`)
}
