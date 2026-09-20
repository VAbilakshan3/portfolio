# Your portfolio: setup, editing and GitHub publishing

This guide is for Abilakshan Vadivel's existing portfolio. You can manage normal content through forms without editing code. Keep this guide with the project.

## 1. Understand where everything lives

| Part | Location | What it does |
| --- | --- | --- |
| Your working folder | `C:\Surveyor\my\Portfolio\portfolio-review` | Contains the editable website, photos, documents and editor |
| Local content editor | http://127.0.0.1:4174/ | Forms that save changes to your working folder |
| Local website preview | http://127.0.0.1:4173/portfolio/ | Shows the last successful local build |
| GitHub repository | https://github.com/VAbilakshan3/portfolio | Stores the published source and its history |
| Public website | https://vabilakshan3.github.io/portfolio/ | The website visitors see |

Your normal process is:

**Edit locally → Save → Build preview → Check → Commit and push → Merge into main → GitHub publishes.**

Saving or building locally does not change the public website. GitHub Pages hosts the finished website, so visitors do not need your computer to be switched on. The editor runs only on your computer; it is not an online admin panel. GitHub Pages cannot run this editor's Node.js server. Editing from any device through a private online dashboard would require a separately configured CMS or backend.

## 2. Open it on this computer now

1. In File Explorer, open `C:\Surveyor\my\Portfolio\portfolio-review`.
2. Double-click **Open Portfolio Editor.cmd**.
3. Your browser opens the editor at http://127.0.0.1:4174/ . If it briefly fails to connect, wait a moment and refresh.
4. Select the section you want to edit and make your changes.
5. Click **Save changes**, then **Build preview**. Wait for the success message.
6. Click **Open portfolio**. Refresh the preview tab to see the latest build.

This computer already has the dependencies installed. You do not need to reinstall them for ordinary updates. Always use the `portfolio-review` folder, not the older `portfolio-main` folder or the ZIP itself. Do not open `index.html` directly from File Explorer; this application needs its local web server.

The launcher starts background processes. Closing the browser tab does not stop them. A Windows restart stops them; double-click the launcher to start again. The manual method in section 4 lets you stop each server with Ctrl+C.

## 3. One-time setup on another Windows computer

Install:

1. **Node.js LTS**, including npm, from https://nodejs.org/en/download/ . Use Node 22.12 or newer compatible LTS. Restart your terminal after installation.
2. **GitHub Desktop** from https://desktop.github.com/ . Sign in to your GitHub account.
3. Optional: **Visual Studio Code**, only if you want to change layout or styles. It is not required for the content forms.

After this upgrade has been published to GitHub:

1. In GitHub Desktop choose **File → Clone repository → URL**.
2. Enter `https://github.com/VAbilakshan3/portfolio.git` and select a local folder.
3. Click **Clone**. Select `main` and use **Fetch origin**, then **Pull origin** if offered.
4. Open the cloned folder in File Explorer, right-click in the folder and choose **Open in Terminal**.
5. Run these commands one at a time:

```powershell
node --version
npm --version
npm ci
npm run build
```

6. When the build succeeds, double-click **Open Portfolio Editor.cmd** in that folder.

Before the upgrade is published, cloning GitHub gives you the old website. To use the new version immediately, copy the full current working folder or extract `portfolio-upgraded-review.zip`, then run the same install/build commands in the folder containing `package.json`. The ZIP excludes dependencies, the generated build, local backups and Git history. For publishing from another computer, prefer cloning the repository and copying the upgraded source into that clone, preserving the clone's `.git` folder. Copy hidden files such as `.github`, `.gitignore` and `.editorconfig` too.

If PowerShell blocks `npm.ps1`, use `npm.cmd` instead of `npm` in these commands; you do not need to change your computer's execution policy. Initial installation needs internet access.

## 4. Run manually, if preferred

Open a terminal in the project folder. On this computer:

```powershell
cd "C:\Surveyor\my\Portfolio\portfolio-review"
npm run edit
```

Keep that terminal open and visit http://127.0.0.1:4174/ . In a second terminal in the same folder:

```powershell
npm run build
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

Visit http://127.0.0.1:4173/portfolio/ . Press **Ctrl+C** in each terminal when finished. Use either the launcher or these manual commands; starting both can cause a port-in-use message.

For editing website code with automatic browser refresh, use this instead of the preview command:

```powershell
npm run dev -- --host 127.0.0.1
```

Open the URL printed by Vite with `/portfolio/` appended, normally http://127.0.0.1:5173/portfolio/ . Development view refreshes as source files change; production preview needs **Build preview** after content changes.

## 5. Customize your content using forms

### Add a project with photographs

1. Choose **Projects & photos → Add entry**.
2. Enter the project title and a unique URL name, such as `island-survey-2026-12`.
3. Complete the description, your role, methodology, tools, deliverables and categories.
4. Click **Upload one or more photos** and select your files. The first becomes the cover if no cover exists.
5. Add useful photo captions and image descriptions. Change the cover through its separate upload field if required.
6. Add project links if available. Save and build, then open the project in the preview.

Use JPG, PNG or WebP, under 20 MB per upload. Around 1600 pixels on the long edge is practical for most photographs. Uploads are copied into the working folder; keep those copied files with the project.

### Add an island or field visit to the satellite map

1. Create its project first if you want the popup to link to a case study.
2. Choose **Map locations & island visits → Add entry**.
3. Enter a unique ID, title, island/place, type and month or date range.
4. Click **Choose point on satellite map**, locate the island, click the spot, then **Use this point**. Alternatively enter decimal latitude and longitude.
5. Describe the work and select the relevant project and employment role.
6. Enter the location accuracy note, such as `Approximate island location`.
7. Optionally upload photos. The first appears in the popup; the linked project can hold the full gallery.
8. Save, build and check the marker and popup.

Repeat for each visit. The current Malé office pin links your internship and employee roles; its position is approximate. Esri satellite imagery and labels require internet access.

### Update other sections

| You want to change | Editor section and action |
| --- | --- |
| Name, headline, introduction or portrait | Profile |
| Longer biography | About me |
| Job or responsibilities | Experience; edit a role or Add entry |
| Start a new job | Mark old job Previous role, add end date, then mark new job Current role; save together |
| Skills or instruments | Skills & instruments; add/edit an expandable group |
| Degree, awards or memberships | Select the matching section |
| Research | Research & publications; update its actual status |
| Certificate or letter | Certificates / Letters & documents; upload PDF and enter its title |
| Main CV | Main PDF CV; upload replacement PDF |
| Email, phone or social links | Contact details |

Exactly one employment role must be marked Current role. The main CV upload replaces the existing CV, keeping one edition and backing up the previous file. Document titles continue to open files in a new tab.

For more examples and backup details, read [QUARTERLY_UPDATE_GUIDE.md](QUARTERLY_UPDATE_GUIDE.md).

## 6. Connect this existing folder to GitHub Desktop

Do this once on this computer:

1. Install/open GitHub Desktop and sign in as the account with access to your repository.
2. Choose **File → Add local repository**.
3. Select `C:\Surveyor\my\Portfolio\portfolio-review` and click **Add repository**.
4. Confirm the repository is `portfolio`. Its existing remote is `https://github.com/VAbilakshan3/portfolio.git`.
5. The current draft branch is `upgrade/portfolio-review`. Keep this branch for the first upgraded release.

Do not create a second repository over this folder or replace the existing remote. The folder already has Git history. GitHub Desktop will show many changed files for the initial upgrade; later content updates will be much smaller.

## 7. Publish this upgraded version for the first time

These are instructions for you to perform when ready; preparing this guide has not published anything.

1. In the editor, save and build. Review the preview on desktop and narrow/mobile width.
2. In GitHub Desktop, confirm `upgrade/portfolio-review` is selected.
3. In **Changes**, review the files. Include the intended source, documents, photos and guides. The existing ignore file excludes `node_modules`, `dist` and `.editor-backups`.
4. Enter a summary such as `Upgrade portfolio with editor and work map` and click **Commit to upgrade/portfolio-review**. This records the changes locally.
5. Click **Publish branch**, or **Push origin** if the branch already exists remotely. This uploads the draft; the configured automatic deployment runs on main.
6. Choose **Create Pull Request** / **Preview Pull Request** and open the request on GitHub. Set the base to `main` and compare branch to `upgrade/portfolio-review`.
7. Review **Files changed** and wait for **Validate portfolio changes** to pass. If it fails, read the failure, fix locally, build, commit and push to this same branch.
8. In your repository, open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**. Keep the existing workflow files; no replacement workflow is needed. GitHub documents this publishing-source option [here](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
9. When you are satisfied, **Merge pull request** into main and confirm. This is the step that releases the upgrade.
10. Open the repository's **Actions** tab. Wait for **Deploy to GitHub Pages** to succeed.
11. Visit https://vabilakshan3.github.io/portfolio/ . Check a project, photos, CV, document link and map popup. Refresh with Ctrl+F5 if an old version remains visible.
12. In GitHub Desktop switch to `main`, **Fetch origin**, then **Pull origin**. Your local main now contains the released version.

Do not manually run the deployment workflow on a draft branch. Keep the repository named `portfolio` and the Vite base `/portfolio/`; changing these requires adjusting paths and launcher URLs. If GitHub reports a merge conflict, resolve it before merging and rebuild the result; do not force-push to bypass it.

## 8. Your repeatable three-month update

1. Start GitHub Desktop. With no unfinished local edits, select `main`, Fetch origin and Pull origin if offered.
2. Choose **Branch → New branch** and name it, for example, `update-2026-12`. Create it from the updated main.
3. Open **Open Portfolio Editor.cmd**. Refresh an already-open editor tab after switching branches so it loads the current files.
4. Add your recent projects, field visits, photos, experience, certificates or replacement CV.
5. Save and build. Check names/dates, gallery photos, map points and links in the preview.
6. In GitHub Desktop, review Changes, enter a descriptive summary and commit to this update branch.
7. Publish branch / Push origin. Create a pull request to main.
8. Wait for validation, review, then merge when ready. Check the Pages deployment succeeds and inspect the live site.
9. Switch your local copy to main and pull the merged update. Keep a backup of the full working folder.

You do not need to upload the whole ZIP each quarter, reinstall Node, or recreate your website. GitHub Desktop sends changed files. These steps work monthly too.

## 9. Backups, mistakes and recovery

- **Before publishing:** use Export content backup in the editor and keep a copy of the project folder. JSON backup includes text and file paths, not the image/PDF bytes.
- **Undo an unsaved draft:** reload the editor, accepting that your unsaved edits will be lost.
- **Restore earlier content:** use Import backup, review the draft, then Save and Build. Dated automatic backups are in `.editor-backups`. Restore photo/PDF files from your full-folder backup if needed.
- **An upload you removed from a form:** the copied file may remain in `public`; deleting an entry does not delete its original file. Inspect unused files before publishing.
- **Undo a published update:** open the merged pull request on GitHub, use Revert when available, review and merge the resulting revert request. Wait for Pages to deploy the restored version. This preserves history.
- **Changing computers:** after publishing all intended changes, clone main on the new computer and follow section 3. Copy unpublished drafts/assets separately if you still need them.

## 10. Troubleshooting

| Symptom | What to do |
| --- | --- |
| Localhost cannot connect | Start the launcher; URLs work only while their local servers are running |
| Node or npm not found | Install Node LTS and reopen the terminal; check `node --version` |
| Dependency missing / Vite missing | Run `npm ci` from the folder containing package.json |
| Preview unavailable after extracting ZIP | Run `npm ci`, then `npm run build`, then start the launcher |
| Preview shows old content | Save, Build preview, wait for success and refresh the portfolio tab |
| Save reports a newer revision | Another tab or Git action changed the file; export your draft, reload and reapply the intended changes |
| Build fails | Read its first validation error; correct the missing field, duplicate ID, current-role count or file path |
| Port already in use | If your editor/preview already works, use it; otherwise close the relevant earlier manual server or restart Windows and open one project copy |
| Satellite tiles do not load | Check internet/service availability; location descriptions remain usable without tiles |
| Live site unchanged | Check that changes reached main and the Pages deployment succeeded; then Ctrl+F5 |
| Photos missing online | Ensure the uploaded files were committed as well as the content file; path capitalization must match |

## 11. Changing the website design later

The forms customize content and photographs. Layout, colors, fonts, new section types or new behavior require source changes:

| File | Purpose |
| --- | --- |
| `src/content/portfolio.json` | All central professional content, including map entries |
| `public/` | Photographs, documents and CV |
| `src/styles.css` | Colors, spacing, typography and responsive layout |
| `src/App.jsx` | Page structure and project views |
| `src/components/WorkMap.jsx` | Satellite map and popups |
| `index.html` | Static search/social metadata |
| `tools/editor/` | The local editing interface |
| `.github/workflows/` | Validation and publishing automation |

For design changes, create a branch, edit in VS Code, run the development server, then run `npm run build` before publishing. Keep files saved as UTF-8 to prevent the broken lettering you saw earlier. A repository rename/custom domain needs a separate path configuration update.

## Reference links

- [Node.js installation](https://nodejs.org/en/download/)
- [GitHub Desktop](https://desktop.github.com/)
- [Adding and cloning repositories](https://docs.github.com/en/desktop/adding-and-cloning-repositories)
- [GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

Guide prepared against this project's launcher, package scripts, editor and deployment configuration on 20 September 2026. GitHub button wording can vary slightly.
