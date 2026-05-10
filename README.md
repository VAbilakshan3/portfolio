# Abilakshan Vadivel Portfolio

Modern personal portfolio website for **Abilakshan Vadivel**, a Surveyor and GIS Analyst with a B.Sc. (Hons) in Surveying Sciences specializing in GIS.

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
- Professional scroll reveal animations with reduced-motion support
- Recruiter-focused hero, sticky CTA, trust strip, and visual project case studies
- Dark mode as the default theme with saved localStorage preference
- Project filtering with normalized category keys

## Main Sections

- Hero with resume, LinkedIn, and contact actions
- Sticky recruiter CTA for CV, LinkedIn, email, and projects
- What I Bring section for Field Surveying, GIS & Spatial Analysis, and LIS/Web GIS
- Recruiter trust strip with university, internship, fellowship, tools, memberships, and proof points
- About Me with CV-based professional summary
- Technical Profile from the CV
- Key Skills grouped by GIS, Surveying, Web GIS, Database, Remote Sensing, and Programming
- Experience, including Riyan Private Limited, ADRIMP, and Management Assistant IT internship
- Visual case-study projects with thumbnails, tools, problem, actions, and output
- Credentials, certificates, memberships, documents, and experience letters
- Education
- Leadership and extracurricular activities
- References summary
- Contact and footer links
- SEO metadata and share-preview tags
- CV/resume preview cards with open and download fallback actions

## Project Structure

```text
.
|-- public/
|   |-- certificates/
|   |-- downloads/
|   `-- images/
|-- src/
|   |-- components/
|   |-- data/
|   |   `-- profileData.js
|   |-- App.jsx
|   |-- main.jsx
|   `-- styles.css
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

Most website content is stored in one file:

```text
src/data/profileData.js
```

Update this file to edit:

- Name and professional title
- Hero tagline
- Contact details
- Resume and CV links
- Technical profile
- Skills
- Work experience and project workstreams
- Surveying and GIS projects
- Featured project case studies
- Certifications and document links
- Memberships
- Education
- Leadership highlights
- References summary
- Target roles

## Updating Documents

Resume and CV files are stored in:

```text
public/downloads/
```

Certificates are stored in:

```text
public/certificates/
```

Experience letters are stored in:

```text
public/downloads/
```

If you replace any files, keep the same filenames or update the paths in:

```text
src/data/profileData.js
```

## Updating Images

Portfolio images are stored in:

```text
public/images/
```

Survey camp images are stored in:

```text
public/images/
```

For faster loading before deployment, compress large PNG/JPEG images or convert screenshots to optimized WebP files.

## Deployment Notes

Recommended deployment platforms:

- Vercel
- Netlify
- GitHub Pages

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

- Add real LinkedIn and GitHub profile URLs in `src/data/profileData.js`.
- Add live demo links for Web GIS and LIS projects.
- Add deeper project case studies with problem, tools, workflow, and outputs.
- Add a custom Open Graph preview image for social sharing.
- Optimize images before production deployment.
