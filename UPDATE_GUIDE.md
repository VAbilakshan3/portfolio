# Portfolio Update Guide

This portfolio is content-driven. Most future updates should only require editing files in `src/data/` and adding files inside `public/`.

## Update The CV

Replace this file with the latest PDF:

```text
public/cv/abilakshan-vadivel-cv.pdf
```

Keep the same filename. The site will automatically use it for all CV buttons and the CV preview.

## Update Current Position

Edit:

```text
src/data/profileData.js
src/data/experienceData.js
```

Update the hero positioning in `profileData.js`, then update the current role object in `experienceData.js`.

## Add A New Project

1. Create a lowercase hyphenated folder:

```text
public/projects/new-project-folder/
```

2. Add project images:

```text
public/projects/new-project-folder/cover.jpg
public/projects/new-project-folder/01.jpg
public/projects/new-project-folder/02.jpg
```

3. Add a new object inside:

```text
src/data/projectsData.js
```

The project card will automatically open as a dedicated detail page at:

```text
#project/new-project-folder
```

Use this pattern:

```js
{
  slug: "new-project-folder",
  title: "New Project Title",
  category: "gis",
  categoryLabel: "GIS",
  categories: ["gis"],
  highlight: "ArcGIS Pro",
  shortDescription: "Short recruiter-friendly summary.",
  fullDescription: "Longer project explanation for the detail modal.",
  tools: ["ArcGIS Pro", "QGIS"],
  bullets: [
    "Prepared spatial data.",
    "Created mapping outputs.",
    "Supported analysis and reporting."
  ],
  output: "Short project output or result.",
  coverImage: projectImage("new-project-folder", "cover.jpg"),
  coverAlt: "Helpful image description",
  images: [
    {
      src: projectImage("new-project-folder", "01.jpg"),
      alt: "Helpful image description",
      caption: "Short image caption."
    }
  ],
  links: {
    linkedin: "",
    linkedinLabel: "View LinkedIn Post",
    github: "",
    live: ""
  }
}
```

## Add More Images To An Existing Project

1. Add the image to the project folder:

```text
public/projects/project-folder-name/03.jpg
```

2. Add one more image object to the project `images` array in:

```text
src/data/projectsData.js
```

Example:

```js
{
  src: projectImage("project-folder-name", "03.jpg"),
  alt: "New project output",
  caption: "Updated project output added later."
}
```

## Add Certificates

1. Add the PDF or image file to:

```text
public/certificates/
```

2. Add a new certificate entry in:

```text
src/data/certificatesData.js
```

Example:

```js
{
  name: "Certificate Name",
  url: withBase("certificates/certificate-file-name.pdf")
}
```

## Update Navigation

Edit:

```text
src/data/navigationData.js
```

The `id` value must match the section id in the React page.

## GitHub Update Workflow

After editing content or uploading files:

```bash
npm run build
git add .
git commit -m "Update portfolio content"
git push origin main
```

GitHub Pages will update after the deployment action finishes.
