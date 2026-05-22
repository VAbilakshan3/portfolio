import { withBase } from "./profileData";

// Edit this file to update jobs, internships, fellowships, dates, proof links,
// and LinkedIn highlight links. Leave optional link fields as empty strings
// until you have the exact public URL.
export const experiences = [
  {
    role: "Surveyor",
    company: "Riyan Private Limited",
    location: "Maldives",
    period: "May 2026 - Present",
    status: "Current role",
    summary:
      "Currently working as a Surveyor at Riyan Private Limited, Maldives, with a professional direction across surveying, GIS, LIS, Web GIS, spatial databases, and field-to-map workflows.",
    compactBullets: [
      "Supports surveying work connected to land demarcation, GNSS support, and field-to-map workflows.",
      "Applies a Surveying Sciences and GIS background to practical survey and planning support tasks.",
      "Continues building professional experience across surveying, GIS analysis, LIS, and Web GIS direction."
    ],
    linkedinPostUrl: "",
    linkedinLabel: "Related LinkedIn Highlight"
  },
  {
    role: "Planning Intern (Surveyor & GIS Analyst)",
    company: "Riyan Private Limited",
    location: "Maldives",
    period: "Dec 2025 - March 2026",
    status: "Past experience",
    proofUrl: withBase("downloads/riyan-internship-completion-letter.pdf"),
    linkedinPostUrl: "",
    linkedinLabel: "Riyan internship completion post",
    summary:
      "Worked across LIS development, Web GIS publishing, land-use mapping, GNSS field support, land demarcation, coastal sediment analysis, drone-output review, and survey-related planning deliverables.",
    compactBullets: [
      "Built and organized LIS layers from CAD, shapefile, imagery, and attribute data.",
      "Published Web Maps, Web Scenes, pop-ups, symbology, and Experience Builder outputs in ArcGIS Online.",
      "Supported PostGIS and GeoServer workflows for open-source LIS delivery.",
      "Assisted GNSS field setup, land demarcation, land-use mapping, heat maps, and survey documentation."
    ],
    workstreams: [
      {
        title: "Land Information System (LIS) using Esri Products",
        bullets: [
          "Prepared and organized project geospatial data, including shapefiles, CAD-based inputs, and attribute information, for LIS development and land-use mapping workflows.",
          "Converted CAD files into GIS-ready layers and created and edited point, polyline, and polygon features under required land-use categories in ArcGIS Pro.",
          "Developed web-based LIS views by publishing datasets through ArcGIS Online and configuring Web Maps, Web Scenes, and Experience Builder components for interactive access.",
          "Supported layer organization, symbology, pop-up configuration, and 3D map preparation to present land-use and planning information more effectively."
        ]
      },
      {
        title: "Open-Source LIS using QGIS, PostGIS, and GeoServer",
        bullets: [
          "Maintained consistent data structure, layer organization, and project outputs while transitioning LIS workflows from Esri platforms to open-source tools.",
          "Organized project files and QGIS layers, connected QGIS with PostgreSQL through pgAdmin, enabled PostGIS, and imported prepared layers into the spatial database.",
          "Structured portal-ready datasets and supported GeoServer publication workflows by preparing layers and creating basic WMS and WFS services for required data.",
          "Assisted Web GIS portal development using Leaflet, HTML, CSS, and JavaScript, including layer controls, legend visibility, and measurement tool integration."
        ]
      },
      {
        title: "Land Demarcation & GNSS Field Support",
        bullets: [
          "Reviewed approved plans, carried out site reconnaissance, and checked demarcation areas before field implementation for residential, tourism, and agriculture zones.",
          "Assisted GNSS-based field setup, observations, boundary reference checking, and block demarcation activities during on-site land demarcation work.",
          "Maintained field notes, daily progress records, and supporting documentation to ensure smooth continuation of field tasks and office reporting.",
          "Supported field completion reporting using reference photographs and drone imagery to communicate site status and completed works clearly."
        ]
      },
      {
        title: "Coastal / Sediment Analysis",
        bullets: [
          "Supported coastal sediment laboratory work for beach nourishment and coastal protection studies by identifying, labeling, and organizing sand samples.",
          "Carried out sample washing, drying, weighing, and initial preparation tasks while maintaining sample tracking records and laboratory documentation.",
          "Assisted sieve analysis using multiple sieve sizes and recorded retained material values for grain-size distribution assessment.",
          "Contributed to documentation used to evaluate suitable sand material for coastal protection and construction-related applications."
        ]
      },
      {
        title: "GIS Outputs, Heat Maps, Harbor Digitization & Drone Exposure",
        bullets: [
          "Produced and revised Resilient Schools heat maps by rechecking mapped point alignment, correcting layout issues, and updating outputs based on in-charge feedback.",
          "Prepared school sketches, open area versus built-up support layers, and time-based heat map outputs for multiple schools and reporting needs.",
          "Supported harbor digitization and GIS feature editing by creating, updating, and structuring spatial layers for planning and presentation purposes.",
          "Gained exposure to Pix4D Mapper workflows and reviewed orthomosaic, point cloud, DTM, and DSM outputs to understand drone image processing deliverables."
        ]
      }
    ]
  },
  {
    role: "GeoAI for Disaster Resilience - Undergraduate Fellowship",
    company: "ADRIMP",
    location: "Sri Lanka",
    period: "Feb 2026 - May 2026",
    status: "Fellowship",
    linkedinPostUrl: "",
    linkedinLabel: "GeoAI fellowship acceptance post",
    summary:
      "Applied GeoAI, spatial analytics, and risk-modeling concepts to support disaster resilience and risk-reduction planning.",
    compactBullets: [
      "Applied GeoAI, spatial analytics, and risk-modeling concepts for disaster resilience.",
      "Worked with geospatial datasets, hazard mapping approaches, and emergency preparedness frameworks.",
      "Strengthened resilience-oriented spatial interpretation and risk-reduction planning knowledge."
    ]
  },
  {
    role: "Management Assistant (IT) - Internship",
    company: "Institute of Medical Sciences",
    location: "Manipay",
    period: "Mar 2021 - Aug 2021",
    status: "Past experience",
    proofUrl: withBase("downloads/management-assistant-it-experience-letter.pdf"),
    summary:
      "Provided IT support and assisted with database-related tasks to help maintain smooth organizational operations.",
    compactBullets: [
      "Provided IT support for organizational operations.",
      "Assisted database-related tasks and administrative technology workflows."
    ]
  }
];
