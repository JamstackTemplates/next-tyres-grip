# Roadgrip Tyres & Wheels

A static Next.js and Tailwind CSS site for a fictitious Flemington tyre workshop in the Jamstacks gallery. The tyre and wheel brands, catalogue, prices and business contact details are sample data.

## Preview

Use Node 24 or later.

```sh
npm ci
npm run dev
```

For Pages-equivalent preview, run `npm run build` followed by `npm start`.

| Route | Content |
| --- | --- |
| `/` | Fitted prices, workshop hours, fitting process, featured tyres and directions |
| `/tyres/` | Sidewall decoder, reference tables, category filters and tyre ranges |
| `/wheels/` | Alloy and steel wheel catalogue, fitment guide and wheel services |
| `/services/` | Alignment guide, service prices and estimated times |
| `/fleet/` | Account tiers, scheduled checks and account terms |
| `/contact/` | Quote, service and fleet enquiries, workshop details and map |
| `/404.html` | Static error page |

## Edit the site

| File | Owns |
| --- | --- |
| `app/page.tsx`, `app/<route>/page.tsx` | Page headings, explanatory copy, calls to action and section order |
| `content/business.ts` | Public name, wordmark, introduction, contact details, address, landmark, hours and shared enquiry wording |
| `content/brands.ts` | Brand origins, tiers, notes and stocked category IDs, plus category labels |
| `content/tyres.ts` | Tyre range IDs, brand links, sizes, stock, featured ranges, fitted prices, warranty, wet grip and noise |
| `content/wheels.ts` | Wheel diameter, width, PCD, offset, spoke count, finish, stock and prices |
| `content/services.ts` | Docket jobs, prices, units, estimated minutes and inclusions |
| `content/fleet.ts` | Contiguous tier ranges, check intervals and inclusions |
| `content/sidewall.ts` | Sample size, decoder segments and load and speed reference tables |
| `site.config.json` | Public name, description, domain, business time zone and Jamstacks integration |
| `app/tailwind.input.css`, `components/workshop-art.tsx` | Workshop palettes, theme mappings, textures, motion and inline illustrations |
| `lib/structured-data.ts`, `app/sitemap.ts` | Content-derived TireShop JSON-LD and public routes |

Change tyre and wheel availability by editing `inStock` and the advertised starting price by editing `priceFrom`. For example, find `kestrel-velox-3` in `content/tyres.ts`. Set `inStock: false` and `priceFrom: 329`, then run `npm run check`. The Performance filter still includes Velox 3 and shows **from $329** and **Order in, 2–3 days**. The Home price uses the lowest in-stock tyre price. The shipped sample uses $139.

All prices are whole AUD dollars including GST. Tyres include fitting and balancing, wheels are priced per wheel, and services use each job's `priceUnit`. The safety check can use `price: 0` to show **Free**. Fleet pricing is quoted privately. Keep collection IDs unique and URL-safe. A tyre's `brandId` and `category` must correspond to its brand entry. The content tests report the item and field that need attention.

Edit opening hours in `content/business.ts`. Every weekday needs one record. Use 24-hour `HH:MM` times for same-day service intervals, or omit both times for a closed day. `site.config.json` sets `Australia/Melbourne`. The browser updates the badge every minute using that zone. The static export shows a schedule summary. Update both `business.name` and `site.config.json.name` when renaming the business.

The typefaces are self-hosted through Fontsource. Krona One, Albert Sans and Azeret Mono use the SIL Open Font License, supplied with their npm packages. The display, body and specification styles are mapped in `app/tailwind.input.css`. The header toggle cycles between the system preference and explicit themes.

## Contact and public configuration

Set the public Jamstacks site ID in `site.config.json` or `JAMSTACKS_SITE`. Contact then renders the hosted support form with one bootstrap. The hosted runtime owns the name, email and message fields and delivers or reports the result. The email remains visible in both configurations. Entering or leaving Contact performs a full document navigation to initialize the runtime on each visit. Enquiries receive a quote or proposed time by reply.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Public site ID. Blank uses the file default, which is empty in the gallery sample |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | Public CDN base. Defaults to `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname override for canonical metadata |
| `SITE_TIME_ZONE` | IANA time zone override |
| `PAGES_BASE_PATH` | Project path such as `/preview` |
| `PAGES_BASE_URL` | Actual deployed origin and project path for canonical metadata |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Opt-in for a localhost CDN during local testing. GitHub Actions rejects it |

`.env.example` lists public settings for local work. Keep credentials outside the configuration and browser bundle. Normal builds and tests are independent of the planning and gallery folders.

## Checks

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Repeat the project-path build with a public test `JAMSTACKS_SITE` to verify the configured Contact host, its single bootstrap, the persistent email, assets and canonical URLs. Use a configured test site and backend to verify real form delivery. See [VALIDATION.md](VALIDATION.md) for this implementation’s verification results.

## GitHub Pages and gallery assets

Use GitHub Actions as the Pages source. `.github/workflows/pages.yml` checks pull requests and publishes main or manual runs. The workflow preserves the `provisioning_id` dispatch input and correlated run name. Its custom domain comes from the `SITE_DOMAIN` repository variable, `site.config.json` or the JamstackTemplates default. With a configured `PAGES_ADMIN_TOKEN`, it can configure the domain and enforce HTTPS after certificate issuance. Without it, configure the domain and HTTPS in Pages settings. Manage DNS separately. Gallery CNAME records point to `jamstacktemplates.github.io`.

The map embed requires `frame-src https://www.google.com` if the host enforces a CSP. Allow the configured Jamstacks script, asset and API origins when enabling the form. Static export does not set host response headers.

The site icon is `app/icon.svg`. The 1200×630 social image is `public/og.png`. Gallery capture metadata and screenshots are removable source assets in `jamstacks/`. After a fresh normal build, regenerate them using the capture instructions in [jamstacks/README.md](jamstacks/README.md), then run `node --test jamstacks/config.test.mjs` separately. After review, remove the initial `plan/` and `.claude/skills/` folders before publishing the gallery template.
