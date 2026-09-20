# Test results

Test date: 17 September 2026. Local production preview at `http://127.0.0.1:4173/portfolio/`.

## Build and dependencies
- Initial `npm ci` used the supplied lockfile successfully.
- Compatible dependency fixes were applied after the audit identified 8 advisories; follow-up audit: **0 vulnerabilities**.
- Clean `npm ci` from the updated lockfile passed: 132 packages installed, 133 audited, 0 vulnerabilities.
- `npm run build` passed, including the new content validator. Vite 7.3.6, React 19.
- Content validator passed: 13 projects, 78 asset references, unique slugs, current-job count, required project fields, HTTPS links, real PDF and preserved Pages base.
- No original test suite was configured. A content validation script and a PR build workflow were added.
- Existing `.github/workflows/deploy.yml` and `vite.config.js` are unchanged.
- `git diff --check` passed.

## Browser checks passed
Tested with local Chrome 152.0.7977.84 using Playwright against the production build.

- Homepage and all 13 project cards render.
- All seven project filters return the expected entries.
- All 13 case-study direct links render with their expected gallery counts.
- Back to work link and browser back/forward navigation work.
- Gallery opens, advances with ArrowRight, contains keyboard Tab focus, closes with Escape and returns focus to its launch button.
- A focus-containment issue found during testing was fixed and the suite passed on rerun.
- Career timeline expands.
- Phone navigation opens, selects a section and closes correctly.
- Light/dark theme switching and saved preference survive reload.
- No horizontal overflow at 320, 375, 390, 430, 768, 1024 and 1440 pixels on the homepage and a case-study page.
- Phone gallery has no horizontal overflow; controls and map render correctly.
- Normal-motion hero animation completes and decorative contours animate.
- Reduced-motion disables decorative animation.
- Invalid and malformed project URLs recover safely.
- No browser console errors or uncaught exceptions during the interaction suite.

## Assets and CV
- Every referenced portrait, project image, certificate and PDF returns HTTP 200 with a non-HTML response beneath `/portfolio/`.
- CV response downloads as exactly **Abilakshan Vadivel.pdf**.
- SHA-256 comparison confirms the downloaded CV is byte-for-byte identical to the supplied September PDF.
- All three CV pages were rendered and visually inspected before the obsolete CV was removed.
- Preview iframe uses `/portfolio/cv/Abilakshan%20Vadivel.pdf` and provides an open-in-new-tab fallback.
- Contact email and telephone targets are correct; external profile targets use HTTPS.
- Original project assets are preserved. The referenced project WebP copies total 12,110,806 bytes versus 18,455,818 bytes for the corresponding originals: **34.4% smaller**. Images are loaded lazily except the portrait.
- Production JS is approximately 255 kB / 78 kB gzip; CSS approximately 28 kB / 7 kB gzip. No external font, animation or 3D library is loaded.

## Visual review
Inspected rendered screenshots of desktop dark/light homepages, phone dark/light homepages, desktop/phone project listings, professional experience, credentials, contact, research case study and phone image viewer. Additional screenshots cover About, skills and research.
Review screenshots are outside the public build in the sibling `../audit/` directory.

## Limits
- Phone and tablet dimensions were emulated in Chrome; this is not physical iPhone/Android testing. Safari, Firefox and native device PDF viewers were not tested.
- No formal screen-reader or full WCAG certification audit was performed. Keyboard focus, semantic controls, labels and reduced-motion behavior were checked.
- External profiles, paper acceptance and live project destinations were not authenticated; email/phone actions were inspected without sending messages or placing calls.
- No Lighthouse score or search-engine indexing claim is made. Hash-routed project pages share the site's static social metadata.
- GitHub Actions and live Pages deployment have not been run for these changes. Approval is still required before publishing.

## Restored document library
Compared the live rendered site's links with the local upgrade. All 19 original supporting documents (17 certificates/confirmations and two experience letters) now have View and Download controls. The rebuilt content check passes with 84 asset references. All 19 PDFs returned valid PDF data; each download was tested in an isolated Chrome context and produced the correct filename. The 390px layout has no horizontal overflow. The live site was not modified.


## Newly supplied documents added
Added six PDF supporting documents and two DOCX CV editions. All eight copies match their supplied originals by SHA-256. Production build passed with 92 asset references. All 27 library entries were tested for HTTP 200, correct PDF/DOCX file signatures, byte-for-byte asset responses, download filenames and no horizontal overflow at 390px. PDF View links match their download targets; DOCX entries offer Download only. The main PDF CV remains unchanged. No deployment was performed.


## Single-link document library
Build passed. All 27 entries have exactly one title/row link with target=_blank and noopener; no forced-download attribute or separate buttons remain. Clicking a PDF opened its correct URL in a new tab. Phone layout has no horizontal overflow. DOCX handling depends on browser support.


## Expandable skills and single CV — 20 September 2026
Production build passed. All nine skill/instrument groups expand by click and collapse by keyboard Enter. Instrument content displays correctly; desktop and mobile have no horizontal overflow. No DOCX links remain and dist/cv contains only Abilakshan Vadivel.pdf. Local preview restarted.

## Encoding, satellite map and local editor - 20 September 2026
- Production build passes with 13 projects, 90 standard asset references and two validated map locations. Leaflet 1.9.4 added; installation audit reported zero vulnerabilities.
- Repaired text checked in the rendered header, contact section, footer and content. Build validator now rejects the detected mojibake patterns. UTF-8 is specified in editor configuration and all content writes.
- Confirmed the map requests no tiles on initial homepage load; it loads near the viewport or when navigating to Map.
- Esri imagery and place-label tiles returned valid images, including all visible tiles at the Malé office zoom. Popups show title, place, dates, description, precision and project/experience links.
- Office popup links both Riyan roles. Gulhi popup opens its project case study. Filters, search, marker selection and mobile overflow checks passed. Desktop/mobile map and editor screenshots were inspected.
- Editor renders all content sections. The location picker selects coordinates by map click.
- Real photo upload, local content save, reload persistence and backup creation passed.
- Created a temporary project through the form, uploaded two photos, checked automatic cover selection, saved and verified the actual JSON/files. Exported a backup, imported the original data, restored it, and successfully rebuilt via the editor button. Temporary data/photos were removed; final build contains the original 13 projects.
- Invalid coordinates, stale-revision saves and invalid write tokens were rejected. The editor binds to localhost, validates Host/Origin and paths, accepts checked image/PDF signatures, and backs up before replacement.
- Editor source and backups are absent from the static build. The one required main PDF CV and 25 document links remain unchanged. No deploy/push occurred.
- Basemap availability depends on Esri and internet connectivity. The accessible location list still provides descriptions and links when tiles fail. Initial coordinates are approximate place locations, not surveyed positions.
