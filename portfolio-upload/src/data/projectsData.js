import { withBase } from "./profileData";

// Edit this file to add, remove, or update projects without touching React code.
// To add images, place files in public/projects/project-folder-name/ and add
// their paths to the images array with the projectImage helper.
// Category keys must stay lowercase and hyphenated so filters remain reliable.
const projectImage = (slug, fileName) => withBase(`projects/${slug}/${fileName}`);

export const projectFilters = [
  { key: "all", label: "All" },
  { key: "surveying", label: "Surveying" },
  { key: "gis", label: "GIS" },
  { key: "web-gis-lis", label: "Web GIS / LIS" },
  { key: "geoai-research", label: "GeoAI / Research" },
  { key: "drone-remote-sensing", label: "Drone / Remote Sensing" },
  { key: "technical-exposure", label: "Technical Exposure" }
];

export const projects = [
  {
    slug: "land-information-system",
    order: 2,
    title: "Land Information System / Interactive Web GIS Project",
    category: "web-gis-lis",
    categoryLabel: "Web GIS / LIS",
    categories: ["web-gis-lis", "gis"],
    highlight: "ArcGIS Online",
    shortDescription:
      "Prepared and managed LIS workflows using ArcGIS Pro, ArcGIS Online, Web Maps, Web Scenes, and Experience Builder.",
    fullDescription:
      "This project focused on preparing and organizing shapefiles, satellite imagery, drone imagery, and CAD data within a common GIS workflow. It included web-layer publishing, symbology configuration, attribute management, pop-up setup, and interactive map preparation for LIS visualization.",
    tools: ["ArcGIS Pro", "ArcGIS Online", "Web Maps", "Web Scenes", "Experience Builder"],
    bullets: [
      "Prepared and organized shapefiles, satellite imagery, drone imagery, and CAD data.",
      "Configured layer symbology, labels, attribute tables, and pop-ups.",
      "Supported web-layer publishing and interactive LIS map preparation."
    ],
    output:
      "Supported LIS implementation using ArcGIS-based workflows and interactive Web GIS views.",
    coverImage: projectImage("land-information-system", "cover.jpg"),
    coverAlt: "ArcGIS Experience Builder interface for land information filtering",
    images: [
      {
        src: projectImage("land-information-system", "01.jpg"),
        alt: "LIS land use plan output",
        caption: "Land use plan prepared as part of the LIS workflow."
      },
      {
        src: projectImage("land-information-system", "02.jpg"),
        alt: "ArcGIS Pro land use mapping workspace",
        caption: "ArcGIS Pro layer organization and land-use mapping workspace."
      },
      {
        src: projectImage("land-information-system", "03.jpg"),
        alt: "Web map attribute popup",
        caption: "Web map attribute pop-up and parcel information view."
      },
      {
        src: projectImage("land-information-system", "04.jpg"),
        alt: "CAD-to-GIS land use editing workspace",
        caption: "CAD-to-GIS conversion and feature editing workflow."
      },
      {
        src: projectImage("land-information-system", "05.jpg"),
        alt: "LIS map viewer screenshot",
        caption: "Interactive map viewer prepared for LIS visualization."
      }
    ],
    links: {
      linkedin: "",
      linkedinLabel: "Related LinkedIn Highlight",
      github: "",
      live: ""
    }
  },
  {
    slug: "open-source-lis-geoserver",
    order: 4,
    title: "Open-Source LIS & GeoServer Publishing",
    category: "web-gis-lis",
    categoryLabel: "Web GIS / LIS",
    categories: ["web-gis-lis", "gis"],
    highlight: "PostGIS",
    shortDescription:
      "Supported open-source LIS workflows using QGIS, PostgreSQL/PostGIS, GeoServer, and WMS/WFS services.",
    fullDescription:
      "This work maintained structured LIS outputs while shifting workflows from Esri platforms into an open-source GIS stack. It included QGIS project organization, PostgreSQL/PostGIS setup through pgAdmin, GeoServer publishing support, and basic WMS/WFS service preparation.",
    tools: ["QGIS", "PostgreSQL", "PostGIS", "GeoServer", "WMS/WFS"],
    bullets: [
      "Connected QGIS with PostgreSQL through pgAdmin and enabled PostGIS.",
      "Imported prepared layers into a spatial database.",
      "Prepared layers and created basic WMS/WFS services for required data."
    ],
    output:
      "Structured portal-ready datasets and supported GeoServer publication workflows for open-source LIS delivery.",
    coverImage: projectImage("open-source-lis-geoserver", "cover.jpg"),
    coverAlt: "GIS map viewer with updated attribute information",
    images: [
      {
        src: projectImage("open-source-lis-geoserver", "01.jpg"),
        alt: "GIS attribute update workflow",
        caption: "GIS layer and attribute preparation for LIS workflows."
      },
      {
        src: projectImage("open-source-lis-geoserver", "02.jpg"),
        alt: "Open-source GIS map interface",
        caption: "Open-source GIS layer organization and publishing support."
      }
    ],
    links: {
      linkedin: "",
      linkedinLabel: "Related LinkedIn Highlight",
      github: "",
      live: ""
    }
  },
  {
    slug: "land-demarcation-gnss-field-support",
    order: 1,
    title: "Land Demarcation & GNSS Field Support",
    category: "surveying",
    categoryLabel: "Surveying",
    categories: ["surveying"],
    highlight: "Land Demarcation",
    shortDescription:
      "Assisted field work for land demarcation, GNSS observations, boundary reference checking, and survey documentation.",
    fullDescription:
      "This surveying work involved reviewing approved plans, carrying out site reconnaissance, checking demarcation areas, assisting GNSS-based field setup, maintaining field records, and supporting field completion reporting through photographs and drone imagery.",
    tools: ["GNSS", "Boundary Checking", "Field Notes", "Drone Imagery"],
    bullets: [
      "Reviewed approved plans and checked demarcation areas before field implementation.",
      "Assisted GNSS-based field setup, observations, and boundary reference checking.",
      "Maintained field notes, daily progress records, and supporting documentation."
    ],
    output:
      "Supported land demarcation work for residential, tourism, and agriculture zone field activities.",
    coverImage: projectImage("land-demarcation-gnss-field-support", "cover.jpg"),
    coverAlt: "Field surveying and land demarcation visual",
    images: [
      {
        src: projectImage("land-demarcation-gnss-field-support", "01.jpg"),
        alt: "GNSS handheld field controller",
        caption: "GNSS handheld controller used for field support and demarcation checks."
      },
      {
        src: projectImage("land-demarcation-gnss-field-support", "02.jpg"),
        alt: "Drone view of demarcation field area",
        caption: "Drone view used to communicate field condition and site context."
      },
      {
        src: projectImage("land-demarcation-gnss-field-support", "03.jpg"),
        alt: "Aerial field documentation for land demarcation",
        caption: "Aerial documentation supporting land demarcation reporting."
      },
      {
        src: projectImage("land-demarcation-gnss-field-support", "04.jpg"),
        alt: "Coastal site field documentation",
        caption: "Field completion view captured for site documentation."
      },
      {
        src: projectImage("land-demarcation-gnss-field-support", "05.jpg"),
        alt: "GNSS observation near coastal area",
        caption: "GNSS-based field observation in coastal survey conditions."
      },
      {
        src: projectImage("land-demarcation-gnss-field-support", "06.jpg"),
        alt: "Surveying near sea wall",
        caption: "Survey field support and coastal site observation."
      }
    ],
    links: {
      linkedin: "",
      linkedinLabel: "Land demarcation Maldives post",
      github: "",
      live: ""
    }
  },
  {
    slug: "survey-camp-karagasthalawa",
    order: 5,
    title: "Survey Camp | Karagasthalawa Maha Vidyalaya, Belihuloya",
    category: "surveying",
    categoryLabel: "Surveying",
    categories: ["surveying"],
    highlight: "GNSS",
    shortDescription:
      "Completed topographic and boundary survey tasks, established control points, and prepared site planning outputs.",
    fullDescription:
      "The university survey camp project included topographic survey, boundary survey, control point establishment using static GPS, field data collection, and preparation of site plans for future development planning.",
    tools: ["Static GPS", "Control Points", "Topographic Survey", "Boundary Survey"],
    bullets: [
      "Completed topographic and boundary surveys.",
      "Established control points using static GPS.",
      "Prepared site plans for future development."
    ],
    output: "Prepared survey outputs to support future development planning at the project site.",
    coverImage: projectImage("survey-camp-karagasthalawa", "cover.jpg"),
    coverAlt: "Survey camp fieldwork at Karagasthalawa Maha Vidyalaya",
    images: [
      {
        src: projectImage("survey-camp-karagasthalawa", "01.jpg"),
        alt: "Survey camp topographic contour plan",
        caption: "Topographic contour plan output from the university survey camp."
      },
      {
        src: projectImage("survey-camp-karagasthalawa", "02.jpg"),
        alt: "Survey camp detail survey plan",
        caption: "Detail survey plan prepared for the survey camp project."
      },
      {
        src: projectImage("survey-camp-karagasthalawa", "03.jpg"),
        alt: "Survey camp group photo",
        caption: "Survey camp team during the university field project."
      },
      {
        src: projectImage("survey-camp-karagasthalawa", "04.jpg"),
        alt: "GNSS observation during survey camp",
        caption: "GNSS observation and control support during fieldwork."
      },
      {
        src: projectImage("survey-camp-karagasthalawa", "05.jpg"),
        alt: "Survey camp proposed path design",
        caption: "Proposed design output prepared from survey camp data."
      },
      {
        src: projectImage("survey-camp-karagasthalawa", "06.jpg"),
        alt: "Survey camp detail plan output",
        caption: "Detail survey output prepared for project documentation."
      },
      {
        src: projectImage("survey-camp-karagasthalawa", "07.jpg"),
        alt: "Survey camp total station fieldwork",
        caption: "Total station fieldwork during the survey camp project."
      }
    ],
    links: {
      linkedin: "",
      linkedinLabel: "Related LinkedIn Highlight",
      github: "",
      live: ""
    }
  },
  {
    slug: "topographic-survey-control-establishment",
    order: 6,
    title: "Topographic Survey & Control Establishment",
    category: "surveying",
    categoryLabel: "Surveying",
    categories: ["surveying"],
    highlight: "Control Survey",
    shortDescription:
      "Participated in topographic survey and control establishment work for a water tank and sump project in Meesalai, Jaffna.",
    fullDescription:
      "This professional survey exposure involved establishing three primary control points and collecting field data to support contour plan preparation for water infrastructure survey work.",
    tools: ["Control Points", "Topographic Survey", "Contour Plan", "Field Data"],
    bullets: [
      "Participated in a professional topographic survey for a water tank and sump project.",
      "Established three primary control points.",
      "Collected field data for contour plan preparation."
    ],
    output: "Supported contour plan preparation for water infrastructure survey work.",
    coverImage: projectImage("topographic-survey-control-establishment", "cover.jpg"),
    coverAlt: "Survey control establishment fieldwork visual",
    images: [
      {
        src: projectImage("topographic-survey-control-establishment", "01.jpg"),
        alt: "Water tower project site",
        caption: "Water infrastructure site connected to topographic survey work."
      },
      {
        src: projectImage("topographic-survey-control-establishment", "02.jpg"),
        alt: "Water tower survey view",
        caption: "Site view used for water infrastructure survey context."
      },
      {
        src: projectImage("topographic-survey-control-establishment", "03.jpg"),
        alt: "Survey control observation near water tower",
        caption: "Control and survey observation support near the water tower site."
      },
      {
        src: projectImage("topographic-survey-control-establishment", "04.jpg"),
        alt: "Water infrastructure interior site",
        caption: "Interior site documentation for water infrastructure survey support."
      },
      {
        src: projectImage("topographic-survey-control-establishment", "05.jpg"),
        alt: "Ground control point detail",
        caption: "Ground point detail captured for control and survey records."
      },
      {
        src: projectImage("topographic-survey-control-establishment", "06.jpg"),
        alt: "Survey ground mark",
        caption: "Survey ground mark and field control detail."
      }
    ],
    links: {
      linkedin: "",
      linkedinLabel: "Water infrastructure control survey post",
      github: "",
      live: ""
    }
  },
  {
    slug: "geoai-spatial-feature-detection-research",
    order: 7,
    title: "GeoAI Spatial Feature Detection Research",
    category: "geoai-research",
    categoryLabel: "GeoAI / Research",
    categories: ["geoai-research", "drone-remote-sensing"],
    highlight: "GeoAI",
    shortDescription:
      "Final-year research focused on GeoAI-based spatial feature detection using geotagged data and Sentinel-2 imagery.",
    fullDescription:
      "The final-year undergraduate research focused on GeoAI-based spatial feature detection using geotagged data and multi-temporal Sentinel-2 imagery. The completed model workflow used DeepLabV3+ and reported 73% accuracy in the final model results.",
    tools: ["GeoAI", "Sentinel-2", "DeepLabV3+", "Remote Sensing"],
    bullets: [
      "Used geotagged data and multi-temporal Sentinel-2 imagery.",
      "Applied DeepLabV3+ modelling.",
      "Reported 73% accuracy in the completed final model results."
    ],
    output:
      "Completed GeoAI-focused research work connected to spatial feature detection and disaster resilience direction.",
    coverImage: projectImage("geoai-spatial-feature-detection-research", "cover.jpg"),
    coverAlt: "3D GIS scene used as geospatial project visual",
    images: [
      {
        src: projectImage("geoai-spatial-feature-detection-research", "01.jpg"),
        alt: "GeoAI research study area map",
        caption: "Study area map for the GeoAI spatial feature detection research."
      },
      {
        src: projectImage("geoai-spatial-feature-detection-research", "02.jpg"),
        alt: "GeoAI research methodology diagram",
        caption: "Research workflow and methodology diagram."
      },
      {
        src: projectImage("geoai-spatial-feature-detection-research", "03.jpg"),
        alt: "GeoAI sample segmentation output",
        caption: "Sample segmentation outputs from the research workflow."
      },
      {
        src: projectImage("geoai-spatial-feature-detection-research", "04.jpg"),
        alt: "Predicted bushfire affected area output",
        caption: "Predicted affected-area output generated from the model workflow."
      },
      {
        src: projectImage("geoai-spatial-feature-detection-research", "05.jpg"),
        alt: "Geotagged tree point distribution map",
        caption: "Spatial distribution of geotagged reference points used in the study."
      }
    ],
    links: {
      linkedin: "",
      linkedinLabel: "Final-year GeoAI bushfire research post",
      github: "",
      live: ""
    }
  },
  {
    slug: "landslide-vulnerability-mapping",
    order: 8,
    title: "Landslide Vulnerability Mapping",
    category: "gis",
    categoryLabel: "GIS",
    categories: ["gis", "geoai-research"],
    highlight: "AHP",
    shortDescription:
      "Produced a landslide vulnerability map for Matale District using GIS-based spatial analysis and AHP.",
    fullDescription:
      "This GIS analysis project focused on landslide vulnerability mapping for Matale District using GIS-based spatial analysis and the Analytical Hierarchy Process (AHP) to support risk-aware spatial planning.",
    tools: ["GIS Analysis", "AHP", "Hazard Mapping", "Matale District"],
    bullets: [
      "Produced a landslide vulnerability map for Matale District.",
      "Used GIS-based spatial analysis and the Analytical Hierarchy Process.",
      "Prepared vulnerability mapping output for risk-aware planning support."
    ],
    output: "Created vulnerability mapping output to support risk-aware spatial planning.",
    coverImage: projectImage("landslide-vulnerability-mapping", "cover.jpg"),
    coverAlt: "GIS terrain and 3D mapping visual for spatial analysis project",
    images: [
      {
        src: projectImage("landslide-vulnerability-mapping", "01.jpg"),
        alt: "AHP model creation diagram",
        caption: "AHP model structure used for landslide vulnerability mapping."
      },
      {
        src: projectImage("landslide-vulnerability-mapping", "02.jpg"),
        alt: "Land cover map of Matale District",
        caption: "Land cover factor map prepared for Matale District."
      },
      {
        src: projectImage("landslide-vulnerability-mapping", "03.jpg"),
        alt: "Rainfall map of Matale District",
        caption: "Rainfall factor map used in the vulnerability analysis."
      },
      {
        src: projectImage("landslide-vulnerability-mapping", "04.jpg"),
        alt: "Slope map of Matale District",
        caption: "Slope factor map used in the spatial analysis workflow."
      },
      {
        src: projectImage("landslide-vulnerability-mapping", "05.jpg"),
        alt: "AHP workflow diagram",
        caption: "AHP workflow for producing the final vulnerability map."
      },
      {
        src: projectImage("landslide-vulnerability-mapping", "06.jpg"),
        alt: "Aspect map of Matale District",
        caption: "Aspect factor map prepared as part of the GIS analysis."
      }
    ],
    links: {
      linkedin: "",
      linkedinLabel: "Landslide vulnerability mapping post",
      github: "",
      live: ""
    }
  },
  {
    slug: "additional-gis-software-dashboard-work",
    order: 9,
    title: "Additional GIS Software & Dashboard Work",
    category: "gis",
    categoryLabel: "GIS",
    categories: ["gis", "web-gis-lis"],
    highlight: "GIS Software",
    shortDescription:
      "Created interactive GIS communication and visualization outputs including StoryMap and dashboard-style work.",
    fullDescription:
      "Additional GIS work included creating an interactive StoryMap to visualize the impacts of the 2019-2020 Australian bushfires and developing a dynamic dashboard for real-time weather visualization and monitoring.",
    tools: ["StoryMap", "Dashboard", "Weather Visualization", "GIS Maps"],
    bullets: [
      "Created an interactive StoryMap to visualize the impacts of the 2019-2020 Australian bushfires.",
      "Developed a dynamic dashboard for real-time weather visualization and monitoring.",
      "Built interactive GIS communication outputs and real-time visualization practice."
    ],
    output: "Built interactive GIS communication outputs and real-time visualization practice.",
    coverImage: projectImage("additional-gis-software-dashboard-work", "cover.jpg"),
    coverAlt: "GIS software and map viewer visual",
    images: [
      {
        src: projectImage("additional-gis-software-dashboard-work", "01.jpg"),
        alt: "Survey image prepared for GIS visualization",
        caption: "Survey image prepared as part of GIS visualization and presentation work."
      },
      {
        src: projectImage("additional-gis-software-dashboard-work", "02.jpg"),
        alt: "Google Earth Pro map image",
        caption: "Google Earth Pro imagery used for spatial context and visualization."
      },
      {
        src: projectImage("additional-gis-software-dashboard-work", "03.jpg"),
        alt: "Before land reclamation map",
        caption: "Before land reclamation map view prepared for comparison."
      },
      {
        src: projectImage("additional-gis-software-dashboard-work", "04.jpg"),
        alt: "GIS attribute table",
        caption: "Attribute table review and GIS data organization."
      },
      {
        src: projectImage("additional-gis-software-dashboard-work", "05.jpg"),
        alt: "Land use plan output",
        caption: "Land use plan output prepared for GIS communication."
      },
      {
        src: projectImage("additional-gis-software-dashboard-work", "06.jpg"),
        alt: "GIS visualization on laptop",
        caption: "GIS visualization review and presentation workflow."
      }
    ],
    links: {
      linkedin: "",
      linkedinLabel: "Python GIS extractor post",
      github: "",
      live: ""
    }
  },
  {
    slug: "advanced-surveying-technology-workshops",
    order: 3,
    title: "Advanced Surveying Technology Workshops",
    category: "technical-exposure",
    categoryLabel: "Technical Exposure",
    categories: ["technical-exposure", "drone-remote-sensing", "surveying"],
    highlight: "Drone / TLS / GPR",
    shortDescription:
      "Gained technical exposure to drone LiDAR, multispectral drone workflows, TLS, and GPR.",
    fullDescription:
      "Advanced surveying technology workshop exposure strengthened awareness of modern field data capture methods, including drone LiDAR, multispectral drone workflows, Terrestrial Laser Scanning (TLS), and Ground Penetrating Radar (GPR).",
    tools: ["Drone LiDAR", "Multispectral Drone", "TLS", "GPR"],
    bullets: [
      "Gained exposure to drone LiDAR and multispectral workflows.",
      "Gained workshop exposure to Terrestrial Laser Scanning and Ground Penetrating Radar.",
      "Strengthened awareness of modern surveying technologies and field data capture methods."
    ],
    output:
      "Strengthened technical exposure to advanced surveying technologies and drone/remote sensing workflows.",
    coverImage: projectImage("advanced-surveying-technology-workshops", "cover.jpg"),
    coverAlt: "Advanced surveying technology training visual",
    images: [
      {
        src: projectImage("advanced-surveying-technology-workshops", "01.jpg"),
        alt: "Drone platform for surveying technology exposure",
        caption: "Drone platform used during advanced surveying technology exposure."
      },
      {
        src: projectImage("advanced-surveying-technology-workshops", "02.jpg"),
        alt: "Drone controller view",
        caption: "Drone controller and field operation exposure."
      },
      {
        src: projectImage("advanced-surveying-technology-workshops", "03.jpg"),
        alt: "GNSS equipment exposure",
        caption: "GNSS equipment exposure connected to modern field data capture."
      },
      {
        src: projectImage("advanced-surveying-technology-workshops", "04.jpg"),
        alt: "Drone equipment case",
        caption: "Drone equipment preparation and field workflow exposure."
      },
      {
        src: projectImage("advanced-surveying-technology-workshops", "05.jpg"),
        alt: "Drone field handling",
        caption: "Drone field handling and technical training exposure."
      },
      {
        src: projectImage("advanced-surveying-technology-workshops", "06.jpg"),
        alt: "Terrestrial laser scanner setup",
        caption: "Terrestrial Laser Scanner setup during technical exposure."
      },
      {
        src: projectImage("advanced-surveying-technology-workshops", "07.jpg"),
        alt: "Ground penetrating radar output",
        caption: "Ground Penetrating Radar output reviewed during training exposure."
      },
      {
        src: projectImage("advanced-surveying-technology-workshops", "08.jpg"),
        alt: "Technical workshop laptop workflow",
        caption: "Technical workshop workflow and data review."
      },
      {
        src: projectImage("advanced-surveying-technology-workshops", "09.jpg"),
        alt: "Surveying technology equipment handling",
        caption: "Modern surveying technology equipment handling."
      },
      {
        src: projectImage("advanced-surveying-technology-workshops", "10.jpg"),
        alt: "Workshop group reviewing equipment",
        caption: "Workshop group reviewing equipment and field workflow."
      },
      {
        src: projectImage("advanced-surveying-technology-workshops", "11.jpg"),
        alt: "Field scanning equipment setup",
        caption: "Field scanning equipment setup during technical exposure."
      }
    ],
    links: {
      linkedin: "",
      linkedinLabel: "Drone/TLS/GPR related posts",
      github: "",
      live: ""
    }
  }
];
