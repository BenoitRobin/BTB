# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The website for "Bouge Ton Bouble" (BTB), a brass band / fanfare festival. It's a SvelteKit site with almost no backend: a home route (`/`) rendered as a stack of section components, plus one photo page per past edition (`/editions/[slug]`), static content (partners, past bands, past editions) defined as TypeScript data, and a contact form posted to a SvelteKit form action that emails the message through Resend. The server code covers the contact form, Instagram (the page `load` that fetches the latest posts, and a cron route that keeps the access token alive) and for the past-edition photo galleries (pulled live from Lightroom).

## Commands

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run check` — sync SvelteKit types and type-check with `svelte-check` (run this after editing `.svelte` files or types)
- `npm run lint` — `prettier --check .` followed by `eslint .`
- `npm run format` — apply Prettier formatting

There is no test suite in this repo.

## Architecture

- **Single page, section components**: `src/routes/+page.svelte` just imports and stacks the section components in order (`Navbar`, `Hero`, `AnnouncementBanner`, `Instagram`, `AboutMe`, `PastEditions`, `PastBands`, `Partners`, `ContactForm`, `Footer`). To reorder or add a section, edit that file; each component is self-contained and manages its own `<section>`/layout.
- **`src/routes/+layout.svelte`**: loads global CSS (`layout.css`) and the Google Font (`Baloo 2`), sets the favicon. No layout chrome (nav/footer live inside `+page.svelte`, not the layout).
- **Content lives in `src/lib/data/*.ts`, not in components**: `editions.ts` (current + past festival editions, each with its Lightroom share/album ids and a fallback gallery URL), `partners.ts` (sponsor list, each with a local logo import and optional external URL), `pastBands.ts` (past performers with external links). When asked to add/update a partner, band, or edition, edit these typed data files rather than the components that render them.
- **Partner logos**: imported as ES modules from `src/lib/assets/partners/` and referenced from `partners.ts` — adding a partner means dropping the image in that folder and adding an entry with the corresponding import.
- **Marquee/scrolling pattern**: `AnnouncementBanner.svelte` and `Partners.svelte` both implement an infinite horizontal scroll the same way — render the content twice (`{#each [false, true] as hidden}`, second copy `aria-hidden`), animate `transform: translateX(...)` via CSS `@keyframes` on a `width: max-content` track, and disable the animation under `@media (prefers-reduced-motion: reduce)`. Follow this pattern for any new marquee-style content instead of introducing a JS-driven carousel.
- **Contact form**: `ContactForm.svelte` posts to the `contact` action in `src/routes/+page.server.ts` (`use:enhance`, works without JS). `src/lib/server/contact.ts` validates (type Fanfaron/Bénévole — the list is duplicated in the component —, name, email, message), drops honeypot (`website`) submissions with a fake success, and sends via Resend's REST API (`RESEND_API_KEY`, `CONTACT_TO`, optional `CONTACT_FROM`, default `onboarding@resend.dev`, which only delivers to the Resend account's own address until the domain is verified). Send failures return `fail(502)` and the form shows a fallback `mailto:` to `PUBLIC_CONTACT_EMAIL`.
- **Instagram (server)**: `src/routes/+page.server.ts` calls `getInstagramPosts` (`src/lib/server/instagram.ts`, Instagram API with Instagram Login) and sets a 1h CDN `cache-control`; on any failure it returns `[]` and `Instagram.svelte` shows only its video. The long-lived token (60 days) is read from Vercel Edge Config (`EDGE_CONFIG`, key `instagramAccessToken`), falling back to `INSTAGRAM_ACCESS_TOKEN` (`.env` locally). A weekly Vercel Cron (`vercel.json`) hits `src/routes/api/cron/instagram-token/+server.ts`, guarded by `CRON_SECRET`, which refreshes the token and writes it back to Edge Config via the Vercel API (`VERCEL_API_TOKEN`, optional `VERCEL_TEAM_ID`); crons only run on production deployments.
- **Past-edition galleries (`/editions/[slug]`)**: the only route besides `/`. `PastEditions.svelte` polaroids link to it; `src/routes/editions/[slug]/+page.server.ts` loads the photos with `getAlbumPhotos` (`src/lib/server/lightroom.ts`, the undocumented API behind `lightroom.adobe.com/shares`, public key `LightroomMobileWeb1`) and caches the page 1 day on the CDN, or redirects (307, uncached) to the album's `galleryUrl` on Lightroom when no photo could be loaded; `EditionGallery.svelte` renders the thumbnail grid and a native `<dialog>` viewer. Pages other than `/` include `Navbar`/`Footer` themselves, and navbar links point to `/#section` so they work from any route. To add an edition, get its space id from the share URL and its album id from the share page.
- Runes mode is force-enabled project-wide for non-`node_modules` Svelte files via `vite.config.ts`'s `compilerOptions.runes`, so components should use Svelte 5 runes (`$state`, `$props`, etc.), as already done in `ContactForm.svelte` and `+layout.svelte`.
- Styling is Tailwind CSS v4 via the `@tailwindcss/vite` plugin (no `tailwind.config.js` — v4 is CSS-config-driven through `src/routes/layout.css`, which Prettier's `tailwindStylesheet` setting also points to for class sorting).
- Path alias: use `$lib/...` for anything under `src/lib` (components, data, assets).
