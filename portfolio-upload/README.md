# Abilakshan Vadivel portfolio

React + Vite portfolio, upgraded from the existing repository. The GitHub Pages URL and `/portfolio/` base are preserved.

**Start here:** [WEBSITE_OWNER_GUIDE.md](WEBSITE_OWNER_GUIDE.md) explains local setup, editing with forms, GitHub Desktop publishing, quarterly updates, backups and design customization step by step.

- Edit all professional content in `src/content/portfolio.json`.
- Read `HOW_TO_UPDATE.md` for beginner-friendly GitHub browser instructions.
- Read `UPDATE_NOTES.md` for evidence decisions and review items.
- Read `TEST_RESULTS.md` for the actual validation performed.

## Local development
Use Node 22.12+ (or a compatible later LTS) and npm.

```sh
npm ci
npm run check
npm run dev
```
Open the displayed address with `/portfolio/` appended.

```sh
npm run build
npm run preview -- --host 127.0.0.1
```
The build runs the content validator first. Static output is in `dist/`.

## Content and assets
- `src/content/portfolio.json`: profile, experience, skills, projects, education, research, recognition, certificates, contact and CV.
- `src/lib/assets.js`: encodes public paths and applies the Vite base.
- `src/App.jsx`: accessible homepage, hash-routed case studies and native-dialog galleries.
- `src/styles.css`: responsive dark/light design and reduced-motion support.
- `public/cv/Abilakshan Vadivel.pdf`: the supplied September 2026 CV.
- `public/projects/`: original visuals plus optimized WebP copies. No synthetic project images.
- `scripts/check-content.mjs`: validates project slugs, required content, asset paths, links and CV.
- `.github/workflows/check.yml`: review build, without deployment.
- `.github/workflows/deploy.yml`: original Pages deployment workflow, retained.

The public site is static. An optional localhost-only editor provides genuine file saves, uploads, backups, import/export and a map point picker. It stores no GitHub credentials and is not included in the Pages build.

## Deployment
Nothing has been pushed, merged or deployed as part of this local upgrade. Review first. Only an approved merge/push to main should trigger the existing Pages workflow. Do not trigger its manual deployment action on a draft branch.

## Form-based editing
Double-click `Open Portfolio Editor.cmd` on this computer, or run `npm run edit`. Open http://127.0.0.1:4174/. See `QUARTERLY_UPDATE_GUIDE.md`. Save writes local files; Build preview runs Vite. Neither action deploys.

## Work map
Leaflet displays Esri World Imagery and reference labels with attribution. Locations live in `mapLocations` in the same JSON content file. Popups link to projects and experience; no geocoding or map key is required for the configured public tile endpoints. Service availability is external.
