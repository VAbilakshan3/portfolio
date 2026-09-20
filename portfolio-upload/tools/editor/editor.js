const $ = (id) => document.getElementById(id);
let data,
  revision,
  token,
  section = "projects",
  index = 0,
  dirty = false,
  working = false,
  pickerMap,
  pickerMarker,
  picked,
  pointTarget;
const labels = {
  profile: "Profile",
  about: "About me",
  contact: "Contact details",
  cv: "Main PDF CV",
  experience: "Experience",
  education: "Education",
  skills: "Skills & instruments",
  projects: "Projects & photos",
  mapLocations: "Map locations & island visits",
  publications: "Research & publications",
  awards: "Awards",
  certificates: "Certificates",
  documents: "Letters & documents",
  memberships: "Memberships",
  leadership: "Leadership",
};
const templates = {
  projects: {
    slug: "new-project",
    title: "New project",
    categoryLabel: "Surveying",
    categories: ["surveying"],
    status: "Completed work",
    shortDescription: "",
    fullDescription: "",
    role: "",
    methodology: [""],
    tools: [""],
    deliverables: "",
    coverImage: "",
    coverAlt: "",
    images: [],
    links: { linkedin: "", github: "", live: "" },
  },
  experience: {
    role: "",
    company: "",
    location: "",
    period: "",
    status: "Previous role",
    summary: "",
    compactBullets: [""],
    tools: [],
  },
  education: { degree: "", specialization: "", institution: "", details: "" },
  skills: { title: "", skills: [] },
  mapLocations: {
    id: "new-location",
    title: "",
    place: "",
    kind: "Field visit",
    latitude: 0,
    longitude: 0,
    period: "",
    description: "",
    projectSlugs: [],
    experienceIndexes: [],
    photos: [],
    precision: "Approximate island location.",
    coordinateSource: "",
  },
  publications: {
    title: "",
    venue: "",
    status: "Submitted",
    description: "",
    url: "",
  },
  awards: { title: "", year: "", description: "" },
  certificates: { name: "", url: "" },
  documents: { name: "", url: "", type: "Reference letter" },
};
const fieldNames = {
  slug: "Project URL name (lowercase, hyphens)",
  shortDescription: "Short description for project card",
  fullDescription: "Background, problem & objective",
  role: "My role / designation",
  compactBullets: "Responsibilities (one per line)",
  methodology: "Methodology (one step per line)",
  deliverables: "Deliverables",
  coverImage: "Project cover photo",
  coverAlt: "Cover photo description",
  src: "Photo file",
  alt: "Photo description for accessibility",
  caption: "Photo caption",
  projectSlugs: "Linked projects",
  experienceIndexes: "Linked experience",
  precision: "Location accuracy note",
  coordinateSource: "Coordinate source link (optional)",
  id: "Unique location ID",
  period: "Date or period",
  image: "Profile photograph",
  path: "Main PDF CV",
  filename: "CV download filename",
};
function title(x) {
  return x.title || x.name || x.role || x.degree || x.place || "Untitled entry";
}
function text(tag, value, cls) {
  const el = document.createElement(tag);
  el.textContent = value;
  if (cls) el.className = cls;
  return el;
}
function message(value, error = false) {
  $("status").textContent = value;
  $("status").classList.toggle("error", error);
}
function changed() {
  dirty = true;
  $("dirty").textContent = "Unsaved changes";
}
function get(path) {
  return path.reduce((obj, key) => obj[key], data);
}
function set(path, value) {
  const parent = get(path.slice(0, -1)),
    key = path.at(-1),
    old = parent[key];
  parent[key] = value;
  if (section === "projects" && key === "slug") {
    for (const l of data.mapLocations)
      l.projectSlugs = l.projectSlugs.map((s) => (s === old ? value : s));
  }
  changed();
}
async function api(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { "X-Editor-Token": token, ...options.headers },
  });
  const result = await response.json();
  if (!response.ok) throw Error(result.error || "Action failed");
  return result;
}
function button(label, action) {
  const b = text("button", label);
  b.type = "button";
  b.onclick = action;
  return b;
}
function pathUrl(p) {
  return "/asset/" + p.split("/").map(encodeURIComponent).join("/");
}
function markBusy(value) {
  working = value;
  for (const id of ["save", "build", "add", "remove", "import"])
    $(id).disabled = value;
}
async function save() {
  markBusy(true);
  try {
    const result = await api("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: data, revision }),
    });
    revision = result.revision;
    dirty = false;
    $("dirty").textContent = "Saved to files";
    message(result.message);
    return true;
  } catch (e) {
    message(e.message, true);
    return false;
  } finally {
    markBusy(false);
  }
}
async function upload(file, folder) {
  const result = await api(
    "/api/upload?" + new URLSearchParams({ name: file.name, folder }),
    {
      method: "POST",
      headers: { "Content-Type": "application/octet-stream" },
      body: file,
    },
  );
  return result.path;
}
function photoFolder() {
  return section === "projects"
    ? "projects/" + (data.projects[index].slug || "new-project")
    : "images/uploads";
}
function uploadControl(container, path, folder) {
  const label = text("label", "Upload file", "upload");
  const input = document.createElement("input");
  input.type = "file";
  input.accept = folder === "cv" ? ".pdf" : ".jpg,.jpeg,.png,.webp,.pdf";
  label.append(input);
  input.onchange = async () => {
    if (!input.files[0]) return;
    markBusy(true);
    try {
      const url = await upload(input.files[0], folder);
      set(path, url);
      message(
        folder === "cv"
          ? "Main CV replaced locally. The previous PDF was backed up."
          : "File uploaded locally. Save changes to keep this link.",
      );
      renderForm();
    } catch (e) {
      message(e.message, true);
    } finally {
      markBusy(false);
    }
  };
  container.append(label);
}
function choices(container, path, options) {
  const group = document.createElement("div");
  group.className = "check-list";
  for (const [value, label] of options) {
    const row = document.createElement("label"),
      input = document.createElement("input");
    input.type = "checkbox";
    input.checked = get(path).includes(value);
    input.onchange = () =>
      set(
        path,
        input.checked
          ? [...get(path), value]
          : get(path).filter((x) => x !== value),
      );
    row.append(input, text("span", label));
    group.append(row);
  }
  container.append(group);
}
function field(container, key, value, path) {
  const wrap = document.createElement("div");
  wrap.className = "field";
  const label = document.createElement("label");
  label.append(
    text(
      "span",
      fieldNames[key] ||
        key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()),
    ),
  );
  wrap.append(label);
  container.append(wrap);
  if (Array.isArray(value)) {
    if (key === "projectSlugs") {
      choices(
        wrap,
        path,
        data.projects.map((p) => [p.slug, p.title]),
      );
      return;
    }
    if (key === "experienceIndexes") {
      choices(
        wrap,
        path,
        data.experience.map((e, i) => [i, e.role + " - " + e.company]),
      );
      return;
    }
    if (key === "categories") {
      choices(
        wrap,
        path,
        [
          "surveying",
          "gis",
          "web-gis",
          "uav",
          "remote-sensing",
          "research",
          "technical-exposure",
        ].map((x) => [x, x]),
      );
      return;
    }
    const objectArray =
      ["images", "photos", "workstreams"].includes(key) ||
      value.some((x) => x && typeof x === "object");
    if (!objectArray) {
      const input = document.createElement("textarea");
      input.value = value.join("\n");
      input.oninput = () =>
        set(
          path,
          input.value.split("\n").filter((x) => x.trim()),
        );
      label.append(input);
      wrap.append(text("small", "One item per line."));
      return;
    }
    value.forEach((item, i) => {
      const block = document.createElement("div");
      block.className = "array-item";
      const head = document.createElement("div");
      head.className = "edit-heading";
      head.append(
        text(
          "h3",
          `${key === "workstreams" ? "Workstream" : "Photo"} ${i + 1}`,
        ),
        button("Remove", () => {
          get(path).splice(i, 1);
          changed();
          renderForm();
        }),
      );
      block.append(head);
      renderObject(block, item, [...path, i]);
      wrap.append(block);
    });
    wrap.append(
      button(
        "+ Add " + (key === "workstreams" ? "workstream" : "photo entry"),
        () => {
          get(path).push(
            key === "workstreams"
              ? { title: "", bullets: [] }
              : { src: "", alt: "", caption: "" },
          );
          changed();
          renderForm();
        },
      ),
    );
    if (["images", "photos"].includes(key)) {
      const input = document.createElement("input");
      input.type = "file";
      input.multiple = true;
      input.accept = ".jpg,.jpeg,.png,.webp";
      const uploadLabel = text("label", "Upload one or more photos", "upload");
      uploadLabel.append(input);
      wrap.append(uploadLabel);
      input.onchange = async () => {
        markBusy(true);
        try {
          for (const f of input.files) {
            const src = await upload(f, photoFolder());
            const description = f.name
              .replace(/\.[^.]+$/, "")
              .replace(/[-_]/g, " ");
            get(path).push({ src, alt: description, caption: description });
            if (section === "projects" && !data.projects[index].coverImage) {
              data.projects[index].coverImage = src;
              data.projects[index].coverAlt = description;
            }
          }
          changed();
          renderForm();
          message(
            "Photos uploaded. Edit their descriptions and captions, then Save changes.",
          );
        } catch (e) {
          message(e.message, true);
        } finally {
          markBusy(false);
        }
      };
    }
    return;
  }
  if (value !== null && typeof value === "object") {
    const group = document.createElement("fieldset");
    group.className = "nested";
    group.append(text("legend", key));
    wrap.replaceChildren(group);
    renderObject(group, value, path);
    return;
  }
  let input;
  const selections =
    key === "kind"
      ? ["Office", "Project", "Field visit"]
      : key === "status" && section === "experience"
        ? ["Current role", "Previous role", "Past experience", "Fellowship"]
        : key === "status" && section === "publications"
          ? ["Submitted", "Accepted for presentation", "Presented", "Published"]
          : null;
  if (selections) {
    input = document.createElement("select");
    for (const item of new Set([value, ...selections])) {
      const option = text("option", item);
      option.value = item;
      input.append(option);
    }
    input.value = value;
  } else {
    input = document.createElement(
      typeof value === "string" &&
        (value.length > 100 ||
          [
            "description",
            "summary",
            "intro",
            "about",
            "fullDescription",
            "shortDescription",
            "deliverables",
            "precision",
            "results",
          ].includes(key))
        ? "textarea"
        : "input",
    );
    if (input.tagName === "INPUT")
      input.type = typeof value === "number" ? "number" : "text";
    input.value = value ?? "";
    if (typeof value === "number") input.step = "any";
  }
  input.oninput = () =>
    set(
      path,
      typeof value === "number"
        ? input.value === ""
          ? null
          : Number(input.value)
        : input.value,
    );
  label.append(input);
  if (section === "cv" && ["path", "filename"].includes(key))
    input.readOnly = true;
  const assetField =
    ["coverImage", "image", "src"].includes(key) ||
    (key === "url" && ["certificates", "documents"].includes(section)) ||
    (section === "cv" && key === "path");
  if (assetField) {
    const folder =
      section === "cv"
        ? "cv"
        : section === "certificates"
          ? "certificates"
          : section === "documents"
            ? "downloads"
            : photoFolder();
    uploadControl(wrap, path, folder);
    if (value) {
      const a = text("a", "Open current file");
      a.href = pathUrl(value);
      a.target = "_blank";
      a.rel = "noopener";
      wrap.append(a);
      if (/\.(png|jpe?g|webp)$/i.test(value)) {
        const img = document.createElement("img");
        img.src = pathUrl(value);
        img.alt = "Uploaded image preview";
        wrap.append(img);
      }
    }
  }
  if (key === "latitude") {
    wrap.append(
      button("Choose point on satellite map", () =>
        openPicker(get(path.slice(0, -1))),
      ),
    );
  }
  if (key === "slug" || key === "id")
    wrap.append(
      text(
        "small",
        "Use a unique lowercase name with hyphens, for example gulhi-survey-2026-09.",
      ),
    );
}
function renderObject(parent, obj, path) {
  for (const [key, value] of Object.entries(obj))
    field(parent, key, value, [...path, key]);
}
function renderForm() {
  const form = $("form");
  form.replaceChildren();
  const value = data[section];
  $("heading").textContent = Array.isArray(value)
    ? title(value[index] || {})
    : labels[section];
  $("remove").hidden = !Array.isArray(value) || !value.length;
  if (Array.isArray(value)) {
    if (!value.length) {
      form.append(text("p", "No entries yet. Click Add entry to begin."));
      return;
    }
    if (typeof value[index] === "object")
      renderObject(form, value[index], [section, index]);
    else field(form, "text", value[index], [section, index]);
  } else if (typeof value === "object") renderObject(form, value, [section]);
  else field(form, section, value, [section]);
}
function render() {
  const list = $("items");
  list.replaceChildren();
  const value = data[section];
  $("add").hidden = !Array.isArray(value);
  if (Array.isArray(value)) {
    value.forEach((entry, i) => {
      const b = button(typeof entry === "object" ? title(entry) : entry, () => {
        index = i;
        render();
      });
      b.classList.toggle("selected", index === i);
      list.append(b);
    });
  }
  renderForm();
}
$("section").onchange = (e) => {
  section = e.target.value;
  index = 0;
  render();
};
$("add").onclick = () => {
  const fresh = structuredClone(templates[section] || "New entry");
  if (fresh.slug) fresh.slug += "-" + Date.now().toString(36);
  if (fresh.id) fresh.id += "-" + Date.now().toString(36);
  data[section].push(fresh);
  index = data[section].length - 1;
  changed();
  render();
};
$("remove").onclick = () => {
  if (
    !confirm(
      "Remove this entry? This takes effect in the files when you Save changes.",
    )
  )
    return;
  if (section === "projects") {
    const slug = data.projects[index].slug;
    for (const l of data.mapLocations)
      l.projectSlugs = l.projectSlugs.filter((s) => s !== slug);
  }
  if (section === "experience") {
    for (const l of data.mapLocations)
      l.experienceIndexes = l.experienceIndexes
        .filter((i) => i !== index)
        .map((i) => (i > index ? i - 1 : i));
  }
  data[section].splice(index, 1);
  index = Math.max(0, index - 1);
  changed();
  render();
};
$("save").onclick = save;
$("build").onclick = async () => {
  if (dirty && !(await save())) return;
  markBusy(true);
  message("Building preview...");
  try {
    const result = await api("/api/build", { method: "POST" });
    message(result.message);
  } catch (e) {
    message(e.message, true);
  } finally {
    markBusy(false);
  }
};
$("export").onclick = () => {
  const blob = new Blob([JSON.stringify(data, null, 2) + "\n"], {
      type: "application/json;charset=utf-8",
    }),
    url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download =
    "portfolio-backup-" + new Date().toISOString().slice(0, 10) + ".json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
$("import").onchange = async (e) => {
  try {
    const next = JSON.parse(await e.target.files[0].text());
    if (
      !next.profile ||
      !Array.isArray(next.projects) ||
      !Array.isArray(next.experience) ||
      !Array.isArray(next.mapLocations)
    )
      throw Error("Choose a portfolio content backup exported by this editor.");
    if (
      !confirm(
        "Replace the editor draft with this backup? Files will not change until Save.",
      )
    )
      return;
    data = next;
    index = 0;
    changed();
    render();
    message("Backup imported into the draft. Save changes to apply it.");
  } catch (error) {
    message(error.message, true);
  } finally {
    e.target.value = "";
  }
};
function openPicker(target) {
  pointTarget = target;
  picked = [target.latitude || 4.17, target.longitude || 73.51];
  $("picker").showModal();
  if (!pickerMap) {
    pickerMap = L.map("picker-map", { scrollWheelZoom: true });
    L.tileLayer(
      "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,
        attribution:
          "Imagery &copy; Esri, Earthstar Geographics, Maxar, GIS User Community",
      },
    ).addTo(pickerMap);
    L.tileLayer(
      "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19, attribution: "Labels &copy; Esri, HERE, Garmin" },
    ).addTo(pickerMap);
    pickerMap.on("click", (e) => {
      picked = [+e.latlng.lat.toFixed(6), +e.latlng.lng.toFixed(6)];
      showPoint();
    });
  }
  pickerMap.invalidateSize();
  pickerMap.setView(picked, target.latitude ? 13 : 7);
  showPoint();
}
function showPoint() {
  if (pickerMarker) pickerMarker.remove();
  pickerMarker = L.circleMarker(picked, {
    radius: 8,
    color: "#fff",
    fillColor: "#00bfa5",
    fillOpacity: 1,
  }).addTo(pickerMap);
  $("picked").textContent = `Latitude: ${picked[0]} | Longitude: ${picked[1]}`;
}
$("close-picker").onclick = () => $("picker").close();
$("use-point").onclick = () => {
  pointTarget.latitude = picked[0];
  pointTarget.longitude = picked[1];
  changed();
  $("picker").close();
  renderForm();
};
window.addEventListener("beforeunload", (e) => {
  if (dirty) {
    e.preventDefault();
    e.returnValue = "";
  }
});
try {
  const loaded = await api("/api/content");
  data = loaded.content;
  revision = loaded.revision;
  token = loaded.token;
  for (const key of Object.keys(data)) {
    const option = text("option", labels[key] || key);
    option.value = key;
    $("section").append(option);
  }
  $("section").value = section;
  render();
  $("dirty").textContent = "Loaded saved content";
  message("Ready. Select a section, make changes, then Save changes.");
} catch (e) {
  message(e.message, true);
}
