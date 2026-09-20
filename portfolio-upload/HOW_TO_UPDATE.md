# How to update your portfolio

For local setup and GitHub Desktop publishing, read [WEBSITE_OWNER_GUIDE.md](WEBSITE_OWNER_GUIDE.md). This file covers the alternative of editing source directly in GitHub's browser interface.

**Easiest option on this computer:** use the form-based editor. Double-click `Open Portfolio Editor.cmd`. See [QUARTERLY_UPDATE_GUIDE.md](QUARTERLY_UPDATE_GUIDE.md) for photos, projects, jobs and map points. The steps below remain available for editing directly on GitHub.

You can edit content on GitHub in your web browser. You do not need to install VS Code.

## Start safely
1. Open https://github.com/VAbilakshan3/portfolio.
2. Use the branch menu (usually says `main`) to create a branch such as `content-update-september` from main. A branch is a private draft of the code, not a separate website. In a public repository its contents are still public.
3. Open `src`, then `content`, then `portfolio.json`. Click the pencil (Edit).
4. Make the changes described below. Click **Commit changes** and save to your draft branch.
5. Use the review steps below before merging. Changes on main can update your live website automatically.

## A few simple JSON rules
- Keep the field names, quotation marks, square brackets and curly brackets.
- Put text inside double quotes. Separate entries with commas, but do not put a comma after the last entry.
- To put quotation marks inside text, write `\"`.
- Paths start with `images/`, `projects/`, `certificates/` or `cv/`. Do not add `public/`, `/portfolio/` or a leading `/`.
- Leave an unavailable link as `""`. Only add real public HTTPS links.
- The build checks missing images, duplicate project names in URLs, and common content errors. A failed check means you should correct the draft before merging.

## 1. Change your professional title
Find `profile` and change `headline`, for example `"headline": "Surveyor & GIS Analyst"`.
This is your broad professional headline. Your official employment title is the `role` field in the current experience entry. Change that field only when your actual designation changes. The current-job caption is automatically taken from this entry.
Edit `profile.intro` and `about` when your professional summary changes.

## 2. Update employment
Find `experience`. Each item is one role, with `role`, `company`, `location`, `period`, `status`, `summary`, `compactBullets`, and optional `tools`.
For a new job, copy a complete role entry, put it first, and replace its information. Use `"status": "Current role"` for the new job. Change the previous job to `"Previous role"` and add its end date. Exactly one entry must have `Current role`.
`compactBullets` contains the responsibilities. Optional `workstreams` contains expandable groups with a title and bullets. Delete that whole field if it is not relevant.

## 3. Add a project
Find the `projects` list. Copy this entry into it, separated from the previous entry by a comma. Change the sample text before saving.

```json
{
  "slug": "my-new-project",
  "title": "My new project",
  "categoryLabel": "GIS",
  "categories": ["gis"],
  "status": "Completed work",
  "shortDescription": "One or two sentences explaining the work.",
  "fullDescription": "The project context, problem and objective.",
  "role": "What I personally did.",
  "methodology": ["First actual step.", "Second actual step."],
  "tools": ["QGIS"],
  "deliverables": "The outputs I produced.",
  "coverImage": "projects/my-new-project/cover.jpg",
  "coverAlt": "Describe what this real project image shows.",
  "images": [
    {
      "src": "projects/my-new-project/cover.jpg",
      "alt": "Describe the image for visitors who cannot see it.",
      "caption": "Explain the output or field activity shown."
    }
  ],
  "links": {"linkedin": "", "github": "", "live": ""}
}
```
The slug must be unique, lowercase, with hyphens instead of spaces. It becomes `#project/my-new-project`.
Choose one or more categories from `surveying`, `gis`, `web-gis`, `uav`, `remote-sensing`, `research`, `technical-exposure`.
An optional `results` field can hold a verified result. Do not invent a performance number.
If no publishable image exists, use `"coverImage": ""`, `"coverAlt": ""`, and `"images": []`. The website shows a clearly labeled overview card, not a fake map.

## 4. Upload project photographs
1. On the same draft branch, open `public/projects`.
2. For a new folder, choose **Add file → Create new file**. Enter `my-new-project/.gitkeep` and commit. This creates the folder.
3. Open that folder and choose **Add file → Upload files**. Drag in your photographs and commit to the same branch.
4. Add each filename to the project's `images` list using the example above. The card cover is set separately by `coverImage`.
5. Prefer JPG or WebP images, around 1600 pixels on the long side. Keep maps readable. Use your real work and check that it is cleared for public sharing.
The original image files are retained in this upgrade; optimized WebP copies are used by the site.

## 5. Add a publication
Find `publications` and add an item with `title`, `venue`, `status`, `description` and `url`.
Use the exact status: `Submitted`, `Accepted for presentation`, `Presented`, or `Published`. Acceptance does not mean publication. Add a DOI or paper link only when available.

```json
{"title": "Actual paper title", "venue": "Conference or journal", "status": "Published", "description": "Brief research summary.", "url": "https://example.org/actual-paper"}
```
Replace the example URL with the real link, or use an empty string.

## 6. Add a certificate or award
Upload a publishable certificate to `public/certificates` using **Add file → Upload files**. Under `certificates`, add:
```json
{"name": "Certificate name and issuer", "url": "certificates/my-certificate.pdf"}
```
For recognition without a public document, use `awards` with `title`, `year` and `description`.
Do not upload passports, private letters, signatures, internal data or transcripts containing identifiers. Public repository files can be downloaded even if the website does not link to them.

## 7. Update contact details
Change `email`, `phone`, `linkedin` or `github` in the `contact` object. All displayed contact links use these fields.
Change `profile.location` for the location under the portrait. Only publish contact details you want visitors to use.

## 8. Replace your CV
Open `public/cv` on your draft branch. Choose **Add file → Upload files** and upload your new PDF named exactly:

`Abilakshan Vadivel.pdf`

Confirm replacement of the same file. Keep the filename, spaces and capitalization. No code change is needed. View, preview, mobile and download links all use the `cv` object.
After deployment, the address will be:
https://vabilakshan3.github.io/portfolio/cv/Abilakshan%20Vadivel.pdf
The CV itself includes professional references; review the PDF before each public update.

## 9. Preview and review changes
For this delivered upgrade, use the provided local preview. It is separate from the live website.
For future GitHub edits:
1. Open a pull request from your draft branch into main. This is a request to review the changes, not a deployment.
2. Wait for **Validate portfolio changes** to pass. This checks the content and builds the website. It does not publish it.
3. Read the **Files changed** tab and check dates, names and links.
4. For a visual preview without installing desktop software, open the draft branch's **Code → Codespaces → Create codespace**. Codespaces availability and billing depend on your GitHub account.
5. In its browser terminal, run `npm ci`, then `npm run dev`. Open the forwarded port and append `/portfolio/` to its URL. Keep the forwarded port private. This opens a draft preview, not the public website.
6. Check both themes, phone layout, project pages and CV. Stop the Codespace when finished.
The build artifact in Actions contains the static website, but opening `index.html` directly from disk is not a reliable preview. It needs a web server.

## 10. Update the live website only when ready
Approve the content and preview first. Then merge the pull request into `main`.
The existing **Deploy to GitHub Pages** Action runs automatically on a push or merge to main. It installs the locked packages, checks content, builds the site and uploads the result to Pages.
In **Actions**, wait for the deployment to turn green. Then open https://vabilakshan3.github.io/portfolio/ and test the CV and images. A merged change is not proof that deployment succeeded.
Do not rename the repository or change the Vite `/portfolio/` base. Do not manually run the deployment workflow on a draft branch.
To undo a bad content update, revert its merge commit in GitHub and let Pages deploy the reverted version. Never force-push.

## Other content
`education`, `skills`, `memberships` and `leadership` are in the same JSON file. Existing entries are examples you can copy. For a full name or search-preview identity change, also update the static metadata in `index.html` and the social-preview image. Ordinary job and project updates only require the JSON file.

## Service, reference and experience letters
Existing publicly shared letters are in the `documents` list in `src/content/portfolio.json`. To add an approved letter, upload its PDF to `public/downloads` and add an entry with `name`, `url` (for example `downloads/my-letter.pdf`) and `type`. Each document title is a single clickable link that opens in a new tab. Certificates use the `certificates` list and behave the same way.

Only one CV is included: `public/cv/Abilakshan Vadivel.pdf`. Do not add separate GIS or Surveying CV editions.
