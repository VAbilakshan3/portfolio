# Quarterly updates: no code editing needed

For the complete setup and self-service GitHub publishing instructions, start with [WEBSITE_OWNER_GUIDE.md](WEBSITE_OWNER_GUIDE.md).

## Open your editor
On this computer, open the `portfolio-review` folder and double-click **Open Portfolio Editor.cmd**. It starts the editor and local website preview in the background. You do not need VS Code or a terminal.

While the editor is running, its address is http://127.0.0.1:4174/ . The portfolio preview is http://127.0.0.1:4173/portfolio/ . These addresses work only on your computer.

The editor saves real files in this project. It does not change the live website. Keep this folder so you can reopen it every three months.

## The three buttons you need
1. **Save changes** writes your entries into the portfolio content file. It creates a dated backup first.
2. **Build preview** builds your saved content into the local website. If you have unsaved edits, it saves them first. Wait for the success message.
3. **Open portfolio** opens the preview. Refresh that tab if it was already open.

After reviewing the preview, follow the GitHub Desktop publishing steps in [WEBSITE_OWNER_GUIDE.md](WEBSITE_OWNER_GUIDE.md). You can publish yourself, or ask Codex for assistance. Nothing is pushed or deployed by the editor.

## Add a project and its photos
1. Select **Projects & photos** in the left menu.
2. Click **Add entry**.
3. Enter a title and a unique URL name, such as `gulhi-coastal-survey-2026-09`.
4. Fill in the short description, background, your role, methodology, tools and deliverables. Write each methodology step and tool on a separate line.
5. Tick the relevant categories, such as Surveying, UAV or GIS.
6. Under **Images**, click **Upload one or more photos**. Select your photographs together. They are copied into the project automatically; no path typing is needed.
7. The first uploaded image becomes the cover if none is set. Edit each image description and caption so visitors know what it shows. Change the cover with the **Project cover photo** upload field if needed.
8. Add any real live-demo, LinkedIn or GitHub links. Leave missing links blank.
9. Click **Save changes**, then **Build preview**.

Use JPG, PNG or WebP photos. Keep individual files below 20 MB. For a fast website, resize very large photos to around 1600 pixels before uploading when practical. The editor retains the uploaded file; it does not silently alter your maps or photographs.

## Add a new island visit to the map
1. First create the project if you want a case-study link.
2. Select **Map locations & island visits**, then **Add entry**.
3. Enter a unique location ID, for example `thulusdhoo-survey-2026-12`.
4. Give it a title such as `Topographic survey - Thulusdhoo` and enter the island name in **Place**.
5. Choose **Field visit**, **Project** or **Office**.
6. Click **Choose point on satellite map**. Zoom to the island, click your chosen spot, then click **Use this point**. You may also type decimal latitude and longitude directly.
7. Enter the month or period and a short description of the actual work.
8. Tick the project and/or employment role to link from the popup.
9. Set **Location accuracy note** honestly: for example `Approximate island location` or `Project location supplied by me`. Use a general island location when that is all you want to share.
10. Upload location photos if useful. The first photo appears in the popup; use the linked project gallery for the complete photo collection.
11. Save and build the preview. Click the point to check its popup.

Each visit can be a separate entry with its own month and title. Multiple projects may share a location. The searchable location list lets visitors select each entry even if map markers overlap.

The initial Riyan pin is an approximate Malé city location, not the exact office building. Both the internship and current Surveyor role are linked. Gulhi is an approximate island point associated with the coastal-analysis project in your CV. You can refine either point using the editor.

## Change your experience
Select **Experience** and click the role you want to edit. Update the title, company, location, period, summary or responsibilities.
To add a job, click **Add entry** and fill the form. Change your old role from `Current role` to `Previous role`, add its end date, then mark the new role `Current role`. The editor requires exactly one current role. Save all these changes together.
The head-office caption on the website automatically follows the current role. Link a role to a place in **Map locations & island visits**.

## Other updates
- **Profile**: name, headline, introduction, location and portrait.
- **About me**: your longer introduction.
- **Skills & instruments**: edit or add an expandable group; one item per line.
- **Research & publications**: keep Submitted, Accepted for presentation, Presented and Published distinct.
- **Certificates / Letters & documents**: upload the PDF and enter its name. The website shows one title link that opens the file in a new tab.
- **Education, awards, memberships and leadership**: select the section and edit its fields or add an entry.
- **Contact details**: email, telephone, LinkedIn and GitHub.
- **Main PDF CV**: upload your replacement PDF. It always replaces `Abilakshan Vadivel.pdf` and backs up the previous file. No extra CV editions are added.

## Backups and recovery
Each save creates a dated copy in `.editor-backups` in this project folder. A replacement CV is backed up there too. These backups are excluded from Git and the delivered source ZIP.
**Export content backup** downloads your current content as a JSON file. **Import backup** loads it into the editor as a draft; click Save only when you want to apply it. Content backups do not contain photos, so also keep a copy of the complete project folder.
Uploads are copied into the project immediately. Deleting an entry does not delete its source photos or PDF files; this avoids accidental loss. If you cancel an upload's entry before saving, the file may remain unused in the public folder. Review unused files before publishing.
If another window edits the file, a save is rejected to avoid overwriting its changes. Export your draft, reload the editor, then reapply the intended edits.

## Publish after review
This local editor is not a public admin page and contains no GitHub credentials. It is deliberately excluded from the deployed website.
Use GitHub Desktop to commit and push your changes to an update branch, open a pull request, check validation and merge into main when ready. The full first-release and quarterly instructions are in [WEBSITE_OWNER_GUIDE.md](WEBSITE_OWNER_GUIDE.md).
You can also use GitHub's web interface: update `src/content/portfolio.json`, upload the new files in `public/` to the same draft branch, review a pull request, then merge it to main when ready. The existing Pages Action deploys the merged content. Full GitHub instructions remain in `HOW_TO_UPDATE.md`.

## If you move to another computer
The local editor needs Node.js and the project's installed dependencies. Ask Codex to set up the copied project, or install Node.js and run `npm ci` once. No server or paid CMS is needed. Esri imagery requires an internet connection; if it cannot load, visitors can still use the text location list and project links.
