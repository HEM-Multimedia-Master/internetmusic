---
status: published
---


URL curation is the practice of designing stable, legible, machine-parseable, and semantically consistent URLs so that (a) humans can predict and cite them, (b) search engines can crawl and canonicalize them efficiently, and (c) generative systems can retrieve the right “canonical” page and its structured metadata with minimal ambiguity. This is an information architecture problem with concrete implementation rules (routing, redirects, canonicalization, sitemaps, structured data, and AI-crawler controls).

# 2. State of the art: constraints that drive modern URL design
## 2.1 Canonicalization pressure (duplicates kill clarity)
Modern sites generate duplicates via tracking params, trailing slash variants, case variants, language variants, archives, pagination, faceted search, and preview URLs. Google and Bing explicitly recommend consolidating duplicates via canonical URLs and related methods.
## 2.2 URL readability and tokenization
- Google explicitly recommends separating words with hyphens; 
- lowercase and stable tokens reduce accidental duplication.
## 2.3 Standards baseline (URI syntax, reserved characters)
The IETF’s generic URI syntax defines reserved characters and the parsing model. Design that violates percent-encoding or delimiter expectations tends to break sharing/crawling.
## 2.4 “GEO” (generative model indexing) is emerging, not standardized
There is no single official “GEO” standard comparable to Google’s Search Central. The main current pattern is: provide highly extractable, well-structured canonical pages + structured data + explicit AI-crawler controls; optionally add an llms.txt file as a curated entrypoint for LLM consumption (proposed standard; adoption uneven).

# 3. Exact URL rules you can implement now
## 3.1 Global invariants (apply to everything)
1. One resource → one canonical URL.
- Pick one trailing-slash convention and enforce it with 301 redirects + internal links + sitemap consistency.
2. Lowercase paths.
- Enforce lowercase at routing level; redirect mixed-case to lowercase.
3. Hyphenated slugs, not underscores.
- Use - to separate words. 
4. Avoid unstable tokens.
- Do not encode dates unless the date is intrinsic (news, events); do not include session IDs; avoid mutable category names in the primary path when possible.
5. Minimize query parameters for public content.
- If parameters are necessary (filters, sort), canonicalize to the base URL and block/index-control parameterized variants.
6. Never change published URLs without redirects.
- If you must change, keep 301 redirects indefinitely (or at least for years).
7. Keep path depth reasonable.
- Use at most 2–4 path segments for primary content (humans + crawlers).
8. Always expose canonical, sitemap, and structured data.
- link rel="canonical", sitemap.xml, robots.txt, JSON-LD for key types.

## 3.2 Newspaper / magazine (high-churn editorial)
Recommended pattern:
- Articles: /news/<section>/<yyyy>/<mm>/<dd>/<slug>/ or /news/<section>/<slug>-<shortid>/
 - Sections: /news/<section>/
- /people/<author-slug>/

    Rules:
- Use date in the path only if editorial semantics depend on it (news often does); otherwise prefer a stable ID to survive corrections/reclassification.
- Pagination: /news/<section>/page/2/ with rel="prev/next" (and ensure canonical points to each page, not page 1).
- If you run faceted pages (tags, topics), treat them as index pages with strict canonicalization and no parameter sprawl.

## 3.3 Books, longform, “reference objects”
Recommended pattern:
- Work: /books/<work-slug>/
- Edition: /books/<work-slug>/ed/<year-or-isbn>/
- Chapter/section: /books/<work-slug>/ch/<n>-<slug>/
    Rules:
- Separate the abstract work from editions/translations; keep stable “work” URL even if new editions appear.
- Use fragment identifiers for within-page anchors: /books/<work>/ch/3/#definition-1 (anchors are cheap and citation-friendly).
## 3.4 Databases, catalogs, graphs (entities as first-class resources)
Recommended pattern:
- Entity: /id/<type>/<opaque-id>/ (canonical, stable forever)
- Human-friendly alias: /wiki/<type>/<slug>/ (redirects or canonical-to-opaque)
    Rules:
- Use opaque IDs for canonical stability; slugs are presentation.
- If slugs change, keep redirects from old slugs to the canonical ID URL.
- Expose content negotiation if you can: HTML for browsers; JSON for machines (Accept: application/json).
## 3.5 Wikis (collaborative mutable titles)
Recommended pattern:
- Canonical by ID: /w/<page-id>/
- Display by title: /w/<title>/ (redirect to ID or canonical-to-ID)
    Rules:
- Never make title the only identifier; titles change.
- Provide a permanent “cite this page” box with canonical URL + revision URL: /w/<page-id>?rev=<hash>
# 4. Technologies and implementation primitives
## 4.1 Web frameworks commonly used for curated URLs
- Static/SSG: Astro, Eleventy, Hugo, Jekyll (good for stable permalinks, fast pages)
- Hybrid SSR/SSG: Next.js, Nuxt, SvelteKit (good for structured data, localized routes, entity pages)
- Headless CMS routing: Contentful, Strapi, Sanity (good if you enforce canonical rules centrally)
## 4.2 Search plumbing (SEO)
- Canonicalization: rel="canonical" + 301 redirects.
- Sitemaps: generate sitemap.xml and keep it aligned with canonical URLs.
- Structured data: schema.org JSON-LD for Article/Book/CreativeWork/Event/MusicComposition.
## 4.3 Generative indexing controls (GEO)
- AI crawler control via robots.txt and user agents (OpenAI documents GPTBot/OAI-SearchBot).
- llms.txt as a curated “AI entrypoint” (proposal; treat as optional, not a guarantee).
# 5. JavaScript examples you can paste into production
## 5.1 Slugify (unicode-safe baseline)
```
export function slugify(input) {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")      // strip diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")          // collapse to hyphens
    .replace(/^-+|-+$/g, "")              // trim hyphens
    .replace(/-{2,}/g, "-");              // de-dupe hyphens
}
```
## 5.2 Canonical URL + trailing-slash policy (Express middleware)
```
import express from "express";
const app = express();
// choose ONE policy:
const TRAILING_SLASH_FOR_COLLECTIONS = true;
function toLowercasePath(req, res, next) {
  const u = new URL(req.protocol + "://" + req.get("host") + req.originalUrl);
  if (u.pathname !== u.pathname.toLowerCase()) {
    u.pathname = u.pathname.toLowerCase();
    return res.redirect(301, u.pathname + u.search);
  }
  next();
}
function normalizeTrailingSlash(req, res, next) {
  const u = new URL(req.protocol + "://" + req.get("host") + req.originalUrl);
  const isFileLike = /\.[a-z0-9]+$/i.test(u.pathname);
  const isRoot = u.pathname === "/";
  if (isRoot || isFileLike) return next();
  const looksLikeCollection = u.pathname.split("/").filter(Boolean).length === 1;
  const shouldHaveSlash = TRAILING_SLASH_FOR_COLLECTIONS && looksLikeCollection;
  if (shouldHaveSlash && !u.pathname.endsWith("/")) {
    return res.redirect(301, u.pathname + "/" + u.search);
  }
  if (!shouldHaveSlash && u.pathname.endsWith("/")) {
    u.pathname = u.pathname.replace(/\/+$/, "");
    return res.redirect(301, u.pathname + u.search);
  }
  next();
}
app.use(toLowercasePath);
app.use(normalizeTrailingSlash);
// render page with canonical link (SSR template, simplified)
function canonicalHref(req) {
  const u = new URL(req.protocol + "://" + req.get("host") + req.originalUrl);
  u.search = ""; // drop tracking params from canonical
  return u.toString();
}
```
## 5.3 Stable entity URLs (DB-first) + slug redirects

```js
// canonical: /id/work/9f2c1a8e
// alias:     /work/the-book-of-xyz  -> 301 to canonical
import express from "express";
import { slugify } from "./slugify.js";
const app = express();
// pretend DB
const works = new Map([
  ["9f2c1a8e", { id: "9f2c1a8e", title: "The Book of XYZ" }],
]);
app.get("/work/:slug", (req, res) => {
  const slug = req.params.slug;
  const hit = [...works.values()].find(w => slugify(w.title) === slug);
  if (!hit) return res.status(404).send("Not found");
  return res.redirect(301, `/id/work/${hit.id}`);
});
app.get("/id/work/:id", (req, res) => {
  const w = works.get(req.params.id);
  if (!w) return res.status(404).send("Not found");
  const canonical = `${req.protocol}://${req.get("host")}/id/work/${w.id}`;
  res.type("html").send(`<!doctype html>
<html><head>
<link rel="canonical" href="${canonical}">
<title>${w.title}</title>
</head><body>
<h1>${w.title}</h1>
</body></html>`);
});
```


## 5.4 JSON-LD for composer documentation (MusicComposition + Event)

```js
export function musicCompositionJsonLd({ url, title, composerName, year, durationISO, iswc, scoreUrl, recordings = [] }) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicComposition",
    "@id": url,
    "name": title,
    "composer": { "@type": "Person", "name": composerName },
    ...(year ? { "dateCreated": String(year) } : {}),
    ...(durationISO ? { "timeRequired": durationISO } : {}),
    ...(iswc ? { "iswcCode": iswc } : {}),
    ...(scoreUrl ? { "encoding": [{ "@type": "MediaObject", "contentUrl": scoreUrl, "encodingFormat": "application/pdf" }] } : {}),
    ...(recordings.length ? {
      "recordedAs": recordings.map(r => ({
        "@type": "MusicRecording",
        "name": r.title || `${title} (recording)`,
        "url": r.url,
        ...(r.audioUrl ? { "audio": { "@type": "AudioObject", "contentUrl": r.audioUrl } } : {})
      }))
    } : {})
  };
}
export function performanceEventJsonLd({ url, name, startDateISO, locationName, locationAddress, performers = [], workUrl }) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": url,
    "name": name,
    "startDate": startDateISO,
    "location": {
      "@type": "Place",
      "name": locationName,
      ...(locationAddress ? { "address": locationAddress } : {})
    },
    ...(performers.length ? { "performer": performers.map(p => ({ "@type": "Person", "name": p })) } : {}),
    ...(workUrl ? { "workPerformed": { "@type": "MusicComposition", "@id": workUrl } } : {})
  };
}
```
(Use schema.org types directly; MusicComposition/MusicRecording examples exist in schema.org’s documentation.)
## 5.5 Minimal sitemap generator (canonical-only)
```
export function sitemapXml({ baseUrl, urls }) {
  // urls: [{ loc, lastmodISO }]
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const body = urls.map(u => {
    const loc = esc(new URL(u.loc, baseUrl).toString());
    const lastmod = u.lastmodISO ? `<lastmod>${esc(u.lastmodISO)}</lastmod>` : "";
    return `<url><loc>${loc}</loc>${lastmod}</url>`;
  }).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}
```
Keep the sitemap aligned with the preferred canonical URLs (including trailing slash choice).
# 6. Application patterns by site type
## 6.1 Blog
- Canonical: /blog/<slug>/
- Stable archive indexes: /blog/, /blog/tag/<tag>/, /blog/<yyyy>/<mm>/
- Rules:
    - Avoid /blog/<yyyy>/<mm>/<slug>/ unless date is essential; date-in-path makes “evergreen” updates awkward.
    - If you change title/slug: keep old URL as 301 to new canonical; do not recycle old slugs for new posts.
## 6.2 Databases / knowledge graphs
- Canonical IDs: /id/<type>/<id>/ (immutable)
- Views: /view/<type>/<slug>/ (redirect)
- Provide machine export: /id/<type>/<id>.json or content negotiation.
- Provide change history or revisions if citations matter.
## 6.3 Wikis
- Canonical: /w/<id>/ plus revision variant: /w/<id>?rev=<hash>
- Display aliases: /w/<title>/ redirects to /w/<id>/
- Internal links always point to canonical IDs.
# 7. Special section: artistic portfolios and composer documentation
## 7.1 URL model for works, materials, and context
Use a three-layer model: work → realizations → documents.
- Work (abstract): /works/<work-id>/ (canonical by ID), alias /works/<slug>/ redirect
- Score: /works/<work-id>/score/ (or a direct file URL under that)
- Audio/Video: /works/<work-id>/media/<asset-id>/
- Performances (events): /events/<event-id>/ and link back to the work(s)
- Writings (theory/notes): /texts/<text-id>/
    This mirrors library/catalog logic and prevents link rot when titles change.
## 7.2 Metadata that materially improves discoverability (SEO + GEO)
1. JSON-LD on every Work and Event page:
- Work: MusicComposition (+ CreativeWork fields)
- Performance: Event with workPerformed referencing the Work URL
2. A single “works index” that is machine-friendly:
- /works/ as an HTML page with a plain list (no infinite scroll)
- Include an Atom/RSS feed for new works/events (helps aggregators and some AI tooling)
3. A curated llms.txt (optional) pointing to:
- /works/, /events/, /texts/, and a “Start here” page
4. Stable citation blocks on each page:
- canonical URL
- last updated date
- suggested citation format
## 7.3 Concrete file layout recommendation
- Human pages: /works/<id>/
- Immutable media: /assets/<sha256>/<filename> (content-addressed, cacheable forever)
- Link from the Work page to these immutable assets.
    This prevents “portfolio drift” when you reorganize folders.
# 8. GEO: what to do (pragmatic, non-speculative)
Implement these in priority order:
1. Canonical stability + redirects (foundation for everything).
2. Structured data for your primary objects (Article/Book/CreativeWork/MusicComposition/Event).
3. Clean sitemaps containing only canonical, indexable URLs.
4. Robots policy for AI crawlers you do/don’t want (OpenAI documents its bots and robots.txt handling).
5. Optional: llms.txt as a curated index for LLMs, treated as “best-effort” (proposal, not guaranteed).
# 9. Minimal checklist (copy into your repo)
- All internal links use the preferred canonical form (case + slash).
- 301 redirects cover: case variants, slash variants, legacy slugs, legacy paths.
- rel="canonical" present on every indexable page.
- sitemap.xml contains only canonical URLs; updated automatically.
- Noindex (or canonical-to-base) for parameterized filter pages.
- JSON-LD on pages that represent real entities (works, events, articles, people).
- Immutable assets have content-addressed URLs; human pages link to them.
- robots.txt explicitly includes or excludes AI crawlers you care about.
```
@misc{IETF_RFC3986_2005,
  author = {{Internet Engineering Task Force}},
  title = {RFC 3986: Uniform Resource Identifier (URI): Generic Syntax},
  year = {2005},
  note = {Updated reference listing available 2026-01-16 via rfcinfo.com},
  howpublished = {IETF RFC},
}
@misc{Google_URLStructure_2026,
  author = {{Google Search Central}},
  title = {URL structure: Best practices for Google Search},
  year = {2026},
  howpublished = {Web documentation},
}
@misc{Google_Canonical_2026,
  author = {{Google Search Central}},
  title = {How to specify a canonical URL with rel="canonical" and other methods},
  year = {2026},
  howpublished = {Web documentation},
}
@misc{Google_SlashOrNot_2010,
  author = {{Google Search Central Blog}},
  title = {To slash or not to slash},
  year = {2010},
  howpublished = {Web log},
}
@misc{Bing_WebmasterGuidelines_2026,
  author = {{Microsoft Bing}},
  title = {Bing Webmaster Guidelines},
  year = {2026},
  howpublished = {Web documentation},
}
@misc{SchemaOrg_MusicComposition_2026,
  author = {{Schema.org}},
  title = {MusicComposition},
  year = {2026},
  howpublished = {Web documentation},
}
@misc{SchemaOrg_MusicRecording_2026,
  author = {{Schema.org}},
  title = {MusicRecording},
  year = {2026},
  howpublished = {Web documentation},
}
@misc{SchemaOrg_Article_2026,
  author = {{Schema.org}},
  title = {Article},
  year = {2026},
  howpublished = {Web documentation},
}
@misc{OpenAI_Crawlers_2026,
  author = {{OpenAI}},
  title = {Overview of OpenAI Crawlers},
  year = {2026},
  howpublished = {Web documentation},
}
@misc{OpenAI_PublishersFAQ_2026,
  author = {{OpenAI Help Center}},
  title = {Publishers and Developers - FAQ},
  year = {2026},
  howpublished = {Web documentation},
}
@misc{Howard_llms_txt_discussion_2025_2026,
  author = {{Search Engine Land} and {Yotpo} and {Publii}},
  title = {llms.txt proposal and implementation discussions},
  year = {2025},
  howpublished = {Industry articles},
}
```