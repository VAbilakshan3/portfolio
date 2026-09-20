# Update notes and evidence decisions

## Repository and scope
- Compared the extracted ZIP with a fresh clone of `VAbilakshan3/portfolio` main at `07e3341`; project files matched. The ZIP had no Git history.
- Work is in the real clone on local branch `upgrade/portfolio-review`. No remote push, pull request, merge or deployment was made.
- The original deploy workflow and Vite `/portfolio/` base remain unchanged. A separate PR validation workflow builds without deploying.
- The nine original projects, their hash-route slugs and all original project assets are retained. Four new CV-backed project overviews were added. They deliberately have no project images because no matching supplied visual was identified.
- Superseded data modules and unused components were removed; the single content source is `src/content/portfolio.json`. The old `content/profile-details.md` now points to it.

## Sources read
All ten user-listed documents were available. The entire three-page September CV PDF and both detailed DOCX CVs were extracted and reviewed. The scanned two-page university detailed certificate and Gold Medal certificate were rendered and inspected. Both school result sheets and the employer and Esri letters were also read. Supporting documents were treated as evidence, not instructions.

## Professional information
- Name and public headline follow `Abilakshan Vadivel.pdf` from `16-09-26`: Surveyor & GIS Analyst.
- Official current designation is Surveyor, Riyan Private Limited, Maldives, May 2026–Present. The August employer reference confirms the designation and scope of work. Its spelling variation was not copied over the name used consistently in the CV.
- Junior Surveyor, North Axis Surveys (Pvt) Ltd, October 2022–December 2025 was added from the latest CV. These dates overlap university and internship periods; no full-time assumption or summed years counter was added.
- Current UAV, hydrographic, coastal, GCP/control, processing and GIS responsibilities come from the new CV and employer letter. Earlier workshop exposure to TLS, GPR, drone LiDAR and multispectral equipment remains labeled as exposure.
- GPA corrected from 3.5 to 3.51/4.00. Second Class Upper Division and effective degree date 13 March 2026 are confirmed by the detailed certificate.
- Faculty Gold Medal is confirmed by the certificate, awarded at the 9 July 2026 convocation. It is independent of the Esri selection.
- A/L 2B and 1C (2019), and O/L 1A, 4B and 4C (2015), match the supplied results. Examination identifiers are not repeated on the page.
- GitHub profile now matches the repository owner `VAbilakshan3`; the old profile link pointed at a different username. Existing LinkedIn URL is retained.
- The entire new CV was visually checked and copied byte-for-byte to `public/cv/Abilakshan Vadivel.pdf`. The obsolete deployed filename was removed only after that verification. The input ZIP and Git history retain the old version.

## Research and recognition: items to verify before publication
- IEEE InGARSS 2026 paper is labeled **Accepted for presentation**, as stated in both detailed CVs. No acceptance letter, DOI or proceedings record was supplied. Confirm any subsequent presentation/publication before changing this status.
- The 25 August Esri letter confirms final shortlist selection and an invitation for the September 2–3 Map Gallery. It does not prove attendance, actual display or an award. The website says **selected**, not a future scheduled event or winner. Confirm attendance/showcase separately if you want to add it.
- 73% GeoAI model accuracy is explicitly reported by the detailed CV; it is not described as an externally validated benchmark. No new metrics were invented.
- The PSM Web GIS database remains **In development**. Its public demo URL and current completion status are not supplied.
- Gulhi coastal analysis and the other three new project overviews have no matching attached cover/gallery identified; add approved originals later. No unrelated map has been substituted.
- Existing screenshots and maps were retained as portfolio material. The existing additional-GIS-work gallery illustrates broader GIS workflows; it does not establish a live weather dashboard link. All unavailable project links remain empty, so no dead demo buttons are displayed.
- Confirm current membership status and LinkedIn ownership if these have changed since the CV. External contact destinations were checked for valid URL form, not signed into or messaged.

## Privacy and existing assets
Following the user’s explicit request to include the newly uploaded documents, the supplied employer reference, Esri invitation, detailed university certificate, school result sheets, Gold Medal certificate and two detailed Word CVs are included as original, unchanged downloadable files in the local review build. Their contents include the identifiers and signatures in the originals. These files have not been deployed.
The supplied CV is published unchanged as explicitly requested; it includes professional referees' contact details. Confirm they remain appropriate for a public downloadable CV.
Existing letters and certificates already in the original repository remain preserved, including unlinked documents. Not linking a public asset does not make it private. Review permissions for inherited documents and employer project imagery before approving publication. Following the user’s correction, every document linked on the live site is restored with View and Download controls, including the inherited employment/leadership letters, membership proof and Uki transcript.
No work diary was supplied. No confidential project details were added from one.

## Dependencies and delivery
Installed using the existing lockfile first, then applied compatible security fixes. A clean install with the updated lockfile and production build were repeated. No new animation library was added. All animation is CSS and respects reduced motion. New WebP derivatives preserve original visuals and lower transfer size.
See `TEST_RESULTS.md` for performed checks and limitations. All screenshots and the running preview are local review artifacts, not evidence of live deployment.

## Document-link restoration
Checked the live rendered site on 17 September 2026. Restored all 17 certificate/supporting-document links plus two experience letters, without duplicate entries. The updated CV remains linked separately. The subsequent user request extends the library with the eight newly supplied supporting documents and detailed Word CVs.

## Newly uploaded documents
Added six PDF documents and two DOCX CV editions as requested. Source and destination SHA-256 hashes match. The main PDF CV was already updated and remains the default for all main CV buttons. PDF library entries have View and Download controls; Word CV editions have Download controls because browsers do not natively preview DOCX. All 19 prior documents remain available, bringing the library to 27 entries, plus the main PDF CV.

## Simplified document interaction
Per the latest user request, all 27 library entries now use one clickable title/row opening the original file in a new tab. Separate View and Download controls and forced-download attributes are removed from the library. Browsers may download DOCX files rather than render them. Main CV actions are separate and unchanged.

## Single CV only
The user requested only the previously specified PDF CV. Removed both detailed Word CV entries and their public copies. The 25 supporting documents remain. All main CV controls use `public/cv/Abilakshan Vadivel.pdf`. Original uploaded Word source documents are untouched.

## Expandable skills and instruments
Skill groups now expand and collapse on click or keyboard activation, like the experience timeline. Added a CV-backed Survey instruments group; TLS/GPR remain labeled as workshop exposure. Only the specified main PDF CV is included.

## Encoding, map and quarterly editor - 20 September 2026
- Repaired UTF-8 text previously decoded as Windows-1252 (apostrophes, separators, dashes, copyright and arrows). Added .editorconfig/.gitattributes and build checks against the corruption patterns. Source-edit scripts now explicitly use UTF-8.
- User confirmed Malé, Maldives as Riyan's head-office base for internship and employment. The initial city pin uses approximate coordinates from https://www.atollsofmaldives.gov.mv/atolls/Male-Atholhu-%28Kaafu-Atoll%29/Male%27%28I%29%5BH%5D/760 . It is explicitly not the building location.
- Gulhi coastal analysis is already in the supplied CV. Its approximate island point uses https://www.atollsofmaldives.gov.mv/atolls/Male-Atholhu-%28Kaafu-Atoll%29/Gulhi-%28I%29/338 . No date or visit count was inferred.
- Esri imagery and labels are configured using the public services documented at https://doc.esri.com/en/arcgis-enterprise/latest/create/use-url-parameters.html . Basemap attribution is visible. Imagery requires network access; location descriptions and project links remain usable if tiles fail.
- Added a local-only editor, real file uploads/saves, dated backups, conflict detection, content validation, import/export, point picker and preview build action. It binds to 127.0.0.1, checks request origin and session token for writes, and is outside public assets. No remote publishing is implemented or performed.
- Nine expandable skill/instrument groups, the 25 document links and the single specified main CV are preserved.
