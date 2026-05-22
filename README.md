# Abilakshan Vadivel Portfolio

Modern personal portfolio website for **Abilakshan Vadivel**, a **Surveyor | GIS Analyst** with a B.Sc. (Hons) in Surveying Sciences specializing in GIS.

The portfolio is designed for recruiters, HR managers, GIS companies, surveying companies, urban planning firms, and Web GIS/LIS employers.

## Built With

- React
- Vite
- Tailwind CSS
- Lucide React icons

## Portfolio Focus

- Surveying and GIS Analyst profile
- Land Information System (LIS) development
- Web GIS and interactive map publishing
- Spatial database workflows with PostgreSQL/PostGIS
- GeoServer, WMS, and WFS publishing
- GNSS-based field support and land demarcation
- Remote sensing, drone survey exposure, GeoAI, and disaster resilience
- Recruiter-focused hero, sticky CTA, trust strip, and visual project case studies
- Dark mode as the default theme with saved localStorage preference
- Project filtering with normalized category keys
- GitHub Pages-compatible public asset paths

## Main Sections

- Hero with CV, LinkedIn, project, and contact actions
- Sticky recruiter CTA for CV, LinkedIn, email, and projects
- What I Bring section for Field Surveying, GIS & Spatial Analysis, and LIS/Web GIS
- Recruiter trust strip with university, experience, fellowship, tools, memberships, and proof points
- About Me with CV-based professional summary
- Professional CV preview with open and download fallback actions
- Experience, including current Surveyor role, Riyan internship, ADRIMP fellowship, and IT internship
- Visual case-study projects with thumbnails, tools, outputs, dedicated detail pages, galleries, and optional links
- Key Skills grouped by GIS, Surveying, Web GIS, Database, Remote Sensing, and Programming
- Technical Profile from the CV
- Credentials, certificates, memberships, documents, and experience letters
- Education
- Leadership and extracurricular activities
- References summary
- Contact and footer links
- SEO metadata and share-preview tags

## Project Structure

```text
.
|-- public/
|   |-- certificates/
|   |-- cv/
|   |   `-- abilakshan-vadivel-cv.pdf
|   |-- downloads/
|   |-- images/
|   `-- projects/
|       `-- project-folder-name/
|           |-- cover.jpg
|           |-- 01.jpg
|           `-- 02.jpg
|-- src/
|   |-- components/
|   |-- data/
|   |   |-- certificatesData.js
|   |   |-- experienceData.js
|   |   |-- navigationData.js
|   |   |-- profileData.js
|   |   `-- projectsData.js
|   |-- App.jsx
|   |-- main.jsx
|   `-- styles.css
|-- UPDATE_GUIDE.md
|-- index.html
|-- package.json
|-- tailwind.config.js
`-- postcss.config.js
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the local site:

```text
http://localhost:5173
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Editing Portfolio Content

Most content updates should happen in data files only:

```text
src/data/profileData.js
src/data/experienceData.js
src/data/projectsData.js
src/data/certificatesData.js
src/data/navigationData.js
```

Update these files to edit:

- Name and professional title
- Hero tagline
- Contact details
- CV link
- Work experience and proof links
- Project cards, filters, image galleries, and optional LinkedIn/GitHub/live links
- Technical profile
- Skills
- Certifications and document links
- Memberships
- Education
- Leadership highlights
- References summary
- Navigation menu items
- Target roles

## Updating The CV

Replace this file only:

```text
public/cv/abilakshan-vadivel-cv.pdf
```

The website buttons and preview point to that single file.

## Updating Certificates And Letters

Certificates are stored in:

```text
public/certificates/
```

Experience letters are stored in:

```text
public/downloads/
```

After adding a file, update:

```text
src/data/certificatesData.js
```

## Updating Project Images

Project images are stored in:

```text
public/projects/project-folder-name/
```

Use lowercase hyphenated folder and file names. Each project can have:

```text
cover.jpg
01.jpg
02.jpg
03.jpg
```

Then update the matching project object in:

```text
src/data/projectsData.js
```

All public paths use `import.meta.env.BASE_URL`, so they work locally and under the GitHub Pages `/portfolio/` path.

## Deployment Notes

The Vite base path is configured for GitHub Pages under:

```text
/portfolio/
```

Before deploying:

```bash
npm run build
```

Then deploy the generated:

```text
dist/
```

## Recommended Next Improvements

- Add exact public LinkedIn post URLs in `src/data/experienceData.js` and `src/data/projectsData.js`.
- Add live demo links for Web GIS and LIS projects when available.
- Add deeper project galleries with more screenshots and captions.
- Add a custom Open Graph preview image for social sharing.
- Optimize large images before production deployment.
