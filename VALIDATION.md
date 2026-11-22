# Local verification

Verified in `JamstackTemplates/next-tyres-grip`:

- `npm run check` passes all 37 Node tests (including business details, tyre/wheel/service/fleet/sidewall content, TireShop JSON-LD, embed status and Melbourne local opening hours across AEDT/AEST transitions), TypeScript typegen/typecheck and Next.js static export build.
- Project-path build passes with `PAGES_BASE_PATH=/preview`, `PAGES_BASE_URL=https://owner.github.io/preview` and both unconfigured and configured `JAMSTACKS_SITE`.
- Gallery metadata and light/dark homepage screenshots in `jamstacks/` pass `node --test jamstacks/config.test.mjs`, and `public/og.png` renders the 1200×630 social card with clean UTF-8 typography.
- Remote deployment and live form message delivery require a deployed environment and configured Jamstacks site backend.

