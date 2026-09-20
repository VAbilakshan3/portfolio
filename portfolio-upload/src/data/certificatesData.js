import { withBase } from "./profileData";

// Edit this file when adding certificates, memberships, CV, or proof documents.
// Put certificate files in public/certificates/ and proof letters in public/downloads/.
// The CV should always be replaced at public/cv/abilakshan-vadivel-cv.pdf.
export const documents = [
  { label: "Download CV", url: withBase("cv/abilakshan-vadivel-cv.pdf"), type: "Professional CV" },
  { label: "Sports Representation and Captaincy Confirmation", url: withBase("certificates/sports-representation-captaincy-confirmation.pdf"), type: "University Confirmation" },
  { label: "Tamil Cultural Society Leadership Confirmation", url: withBase("certificates/tamil-cultural-society-leadership-confirmation.pdf"), type: "University Confirmation" },
  { label: "Riyan Internship Completion Letter", url: withBase("downloads/riyan-internship-completion-letter.pdf"), type: "Experience Letter" },
  { label: "Management Assistant IT Experience Letter", url: withBase("downloads/management-assistant-it-experience-letter.pdf"), type: "Experience Letter" }
];

export const memberships = [
  "Royal Institution of Chartered Surveyors (RICS) - Professional Number (Student): 0994438",
  "Geo Mappers",
  "ISPRS Student Consortium"
];

export const certificates = [
  { name: "Sports Representation and Captaincy Confirmation - Physical Education Unit, Sabaragamuwa University of Sri Lanka", url: withBase("certificates/sports-representation-captaincy-confirmation.pdf") },
  { name: "Tamil Cultural Society Membership and Leadership Confirmation - Sabaragamuwa University of Sri Lanka", url: withBase("certificates/tamil-cultural-society-leadership-confirmation.pdf") },
  { name: "Spatial Data Science: The New Frontier in Analytics - MOOC", url: withBase("certificates/spatial-data-science-certificate.pdf") },
  { name: "Creating an ArcGIS StoryMaps Briefing", url: withBase("certificates/arcgis-storymaps-briefing-certificate.pdf") },
  { name: "Make an Impact with Modern Geo Apps - MOOC", url: withBase("certificates/modern-geo-apps-certificate.pdf") },
  { name: "Introduction to Regression Analysis Using ArcGIS Pro", url: withBase("certificates/introduction-to-regression-analysis-arcgis-pro-certificate.pdf") },
  { name: "Going Places with Spatial Analysis - MOOC", url: withBase("certificates/going-places-with-spatial-analysis-certificate.pdf") },
  { name: "Building a Regression Model Using ArcGIS Pro", url: withBase("certificates/building-regression-model-arcgis-pro-certificate.pdf") },
  { name: "GIS for Climate Action - MOOC", url: withBase("certificates/gis-for-climate-action-certificate.pdf") },
  { name: "Python for Beginners", url: withBase("certificates/python-for-beginners-certificate.pdf") },
  { name: "Cartography - MOOC", url: withBase("certificates/cartography-certificate.pdf") },
  { name: "Foundations of Project Management", url: withBase("certificates/foundations-of-project-management-certificate.pdf") },
  { name: "Telling Stories with GIS Maps", url: withBase("certificates/telling-stories-with-gis-maps-certificate.pdf") },
  { name: "Full Stack Web Development - Uki Coding School", url: withBase("certificates/uki-certificate.pdf") },
  { name: "Uki Coding School Transcript", url: withBase("certificates/uki-transcript.pdf") },
  { name: "ARSET Certificate - SARs", url: withBase("certificates/arset-certificate-sars-247.pdf") },
  { name: "ISPRS Student Consortium Membership", url: withBase("certificates/isprs-membership.pdf") }
];
