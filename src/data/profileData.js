// Edit this file for profile-wide content such as identity, contact details,
// hero copy, skills, education, leadership, and references.
// Public asset paths should use withBase("folder/file.ext") so they work in
// local development and on GitHub Pages under /portfolio/.
export const withBase = (path) => `${import.meta.env.BASE_URL}${path}`;

export const profile = {
  name: "Abilakshan Vadivel",
  title: "Surveyor | GIS Analyst",
  headline: "Surveying Sciences graduate specialized in GIS with field-to-map and LIS/Web GIS direction",
  tagline:
    "Surveyor and GIS Analyst profile with practical experience in land demarcation, GNSS-based field support, spatial data preparation, LIS development, Web GIS, GeoAI, and drone survey workflows.",
  location: "Maldives | Sri Lanka",
  profileImage: withBase("images/profile-photo.png"),
  cvUrl: withBase("cv/abilakshan-vadivel-cv.pdf"),
  contact: {
    email: "abilakshan3@gmail.com",
    phone: "+94 77 193 2546",
    linkedin: "https://www.linkedin.com/in/abilakshan-vadivel/",
    github: "https://github.com/abilakshan"
  },
  professionalInterests: ["Surveying", "GIS Analysis", "Drone Survey", "Hydrographic Surveying", "Web GIS", "GeoAI"],
  positioning: {
    label: "Recruiter-ready geospatial profile",
    headline: "Surveyor | GIS Analyst",
    summary:
      "Currently working as a Surveyor at Riyan Private Limited, Maldives, with a GIS-specialized Surveying Sciences background across field-to-map workflows, land information systems, Web GIS, spatial databases, and planning support.",
    currentStatus: "Current: Surveyor at Riyan Private Limited, Maldives",
    availability: "Open to Surveyor, GIS Analyst, Drone Survey, Hydrographic Surveying, Web GIS, and Planning/GIS support roles",
    targetSummary: "Surveying, GIS, Drone Survey, Hydrographic Surveying, Web GIS",
    location: "Maldives | Sri Lanka"
  },
  heroStats: [
    { value: "Surveyor", label: "Current Role" },
    { value: "Riyan Private Limited, Maldives", label: "Current Company" },
    { value: "Surveying | GIS | Drone | Hydro | Web GIS", label: "Focus Areas" }
  ],
  quickFacts: [
    { label: "Current", value: "Surveyor at Riyan Private Limited, Maldives" },
    { label: "Profile", value: "Surveyor | GIS Analyst" },
    { label: "Targets", value: "Surveying, GIS, Drone Survey, Hydrographic Surveying, Web GIS, Planning/GIS" },
    { label: "Proof", value: "CV, certificates, experience letters, project screenshots" }
  ],
  whatIBring: [
    {
      title: "Field Surveying",
      summary: "Boundary, topographic, engineering survey exposure with GNSS-based field data collection, control establishment, and land demarcation support.",
      tools: ["GNSS", "Total Station", "Auto Level", "Theodolite"]
    },
    {
      title: "GIS & Spatial Analysis",
      summary: "Spatial data cleaning, CAD-to-GIS conversion, thematic mapping, hazard mapping, heat maps, and GIS outputs for planning workflows.",
      tools: ["ArcGIS Pro", "QGIS", "AHP", "Remote Sensing"]
    },
    {
      title: "LIS & Web GIS Development",
      summary: "Land information workflows with ArcGIS Online, PostGIS, GeoServer, WMS/WFS, Leaflet, React, and MapLibre.",
      tools: ["PostGIS", "GeoServer", "Leaflet", "React"]
    }
  ],
  trustSignals: [
    "B.Sc. (Hons) Surveying Sciences - GIS specialization",
    "Current Surveyor at Riyan Private Limited, Maldives",
    "Planning Intern experience at Riyan Private Limited, Maldives",
    "GeoAI for Disaster Resilience Undergraduate Fellowship",
    "RICS Student Member, Geo Mappers, ISPRS Student Consortium"
  ],
  about:
    "I am Abilakshan Vadivel, a Surveyor and GIS Analyst profile currently working as a Surveyor at Riyan Private Limited, Maldives. I bring a GIS-specialized Surveying Sciences background with the ability to support both field surveying operations and office-based GIS, mapping, and data management tasks. My experience includes CAD-to-GIS conversion, land information system development, thematic map production, geospatial database preparation, GNSS field support, and Web GIS layer publishing using both Esri and open-source GIS tools.",
  recruiterHighlights: [
    "Prepared and organized project geospatial data including shapefiles, CAD-based inputs, satellite imagery, drone imagery, and attribute information.",
    "Converted CAD files into GIS-ready layers and created point, polyline, and polygon features under required land-use categories.",
    "Published datasets through ArcGIS Online and configured Web Maps, Web Scenes, pop-ups, symbology, 3D maps, and Experience Builder components.",
    "Supported GeoServer publication workflows, WMS/WFS services, Leaflet web portals, heat maps, harbor digitization, and drone-output review."
  ],
  technicalProfile: [
    {
      title: "Surveying & GIS Skills",
      items: [
        "Boundary Surveying",
        "Topographic Surveying",
        "Engineering Surveying",
        "GNSS-based Field Data Collection",
        "CAD-to-GIS Conversion",
        "Spatial Data Cleaning & Digitizing",
        "Spatial Analysis",
        "Thematic Mapping",
        "Land Information Systems",
        "Web GIS Layer Preparation",
        "WMS/WFS Publishing"
      ]
    },
    {
      title: "Software",
      items: [
        "ArcGIS Pro",
        "ArcGIS Online",
        "ArcGIS Experience Builder",
        "QGIS",
        "PostgreSQL",
        "PostGIS",
        "GeoServer",
        "Leaflet",
        "React",
        "MapLibre",
        "AutoCAD",
        "Civil 3D",
        "CloudCompare",
        "Pix4D Mapper",
        "Google Earth Engine",
        "VS Code",
        "MS Office"
      ]
    },
    {
      title: "Instrument Exposure",
      items: [
        "GNSS/GPS Receivers",
        "Total Station",
        "Auto Level",
        "Theodolite",
        "Drone Platforms",
        "Terrestrial Laser Scanner (TLS)",
        "Ground Penetrating Radar (GPR)"
      ]
    }
  ],
  skillGroups: [
    {
      title: "GIS",
      skills: ["ArcGIS Pro", "ArcGIS Online", "ArcGIS Experience Builder", "QGIS", "Spatial Analysis", "Thematic Mapping", "Digitizing", "Land Information Systems"]
    },
    {
      title: "Surveying",
      skills: ["Boundary Surveying", "Topographic Surveying", "Engineering Surveying", "GNSS Field Data", "Total Station", "Auto Level", "Theodolite", "Land Demarcation"]
    },
    {
      title: "Web GIS",
      skills: ["Web Maps", "Web Scenes", "WMS/WFS Publishing", "GeoServer", "Leaflet", "React", "MapLibre", "Measurement Tools"]
    },
    {
      title: "Database",
      skills: ["PostgreSQL", "PostGIS", "pgAdmin", "Spatial Database Preparation", "Attribute Management", "GIS Data QA", "Layer Organization"]
    },
    {
      title: "Remote Sensing",
      skills: ["Google Earth Engine", "Sentinel-2", "Pix4D Mapper", "CloudCompare", "Drone Platforms", "GeoAI", "Hazard Mapping", "Disaster Resilience"]
    },
    {
      title: "Programming",
      skills: ["JavaScript", "HTML", "CSS", "React", "NodeJS", "MongoDB", "R Geostatistics", "VS Code"]
    }
  ],
  education: [
    {
      degree: "B.Sc. (Hons) in Surveying Sciences",
      specialization: "Specializing in GIS",
      institution: "Sabaragamuwa University of Sri Lanka",
      details: "Completed academic requirements | GPA: 3.5 / 4.00  | Faculty of Geomatics"
    },
    {
      degree: "Full Stack Web Development",
      specialization: "ReactJS, NodeJS, and MongoDB fundamentals",
      institution: "Uki Coding School - Online Cohort",
      details: "Jun 2020 - Nov 2020"
    },
    {
      degree: "G.C.E. Advanced Level - Physical Science",
      specialization: "Results: 2B, 1C",
      institution: "St. John's College, Jaffna",
      details: "2019"
    }
  ],
  leadership: [
    "Tamil Cultural Society active member (2022-2025), Programme Coordinator (2022), Media Coordinator (2023), Faculty of Geomatics Representative (2024)",
    "University Badminton Team Member (2022-2025), Vice Captain (2025)",
    "University Table Tennis Team Member (2022-2025), Runners-Up (2022)",
    "Inter-Faculty Tournament 2025: Table Tennis Champion, Football Runners-up, Carrom Second Runners-up, 4x100m Relay Second Runners-up",
    "School Badminton Team Captain (2017), Member (2012-2018)",
    "School Volleyball Team Captain (2018), Member (2017-2018)",
    "School Cricket Team Member (2011-2018)",
    "School Prefect (2016-2018)",
    "Best Cricket Team in Northern Province (2017)",
    "All-Island School Cricket Under-13 Runners-Up (2013)"
  ],
  references: [
    {
      name: "Prof. RMKGSPB Koswatte",
      role: "Professor, Department of Remote Sensing & GIS",
      organization: "Faculty of Geomatics, Sabaragamuwa University of Sri Lanka"
    },
    {
      name: "Kuganan Vigneswaran",
      role: "Engineering Surveyor",
      organization: "BCE Surveying Pvt Ltd, Bunbury, Western Australia, Australia"
    }
  ],
  targetRoles: ["Surveyor", "GIS Analyst", "Drone Survey", "Hydrographic Surveying", "Web GIS Developer", "Planning/GIS Assistant"]
};
