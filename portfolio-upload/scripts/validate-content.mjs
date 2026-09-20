import assert from "node:assert/strict";
export function validateContent(d, { exists, read }) {
  const paths = [
    d.profile.image,
    d.cv.path,
    ...d.certificates.map((x) => x.url),
    ...d.documents.map((x) => x.url),
  ];
  assert.equal(d.cv.filename, "Abilakshan Vadivel.pdf");
  assert.equal(d.cv.path, "cv/Abilakshan Vadivel.pdf");
  assert.equal(
    d.experience.filter((x) => x.status === "Current role").length,
    1,
    "Exactly one current job is required",
  );
  const slugs = new Set();
  const categories = new Set([
    "surveying",
    "gis",
    "web-gis",
    "uav",
    "remote-sensing",
    "research",
    "technical-exposure",
  ]);
  for (const p of d.projects) {
    assert.match(p.slug, /^[a-z0-9-]+$/);
    assert(!slugs.has(p.slug), "Duplicate project slug");
    slugs.add(p.slug);
    for (const key of [
      "title",
      "shortDescription",
      "fullDescription",
      "role",
      "deliverables",
      "status",
    ])
      assert(p[key]?.trim(), `${p.slug}: ${key} is required`);
    assert(p.categories.length);
    assert(p.categories.every((x) => categories.has(x)));
    assert(p.methodology.length);
    assert(p.tools.length);
    if (p.coverImage) {
      paths.push(p.coverImage);
      assert(p.coverAlt);
    }
    for (const im of p.images) {
      paths.push(im.src);
      assert(im.alt && im.caption);
    }
    for (const [key, url] of Object.entries(p.links || {})) {
      if (["github", "linkedin", "live"].includes(key) && url)
        assert.match(url, /^https:\/\//);
    }
  }
  for (const path of paths) {
    assert(
      !path.startsWith("/") && !path.includes(".."),
      "Use public-relative paths",
    );
    assert(exists(path), `Missing asset: ${path}`);
  }
  for (const url of [
    d.contact.linkedin,
    d.contact.github,
    ...d.publications.map((x) => x.url).filter(Boolean),
  ])
    assert.match(url, /^https:\/\//);
  assert(read(d.cv.path).subarray(0, 5).toString() === "%PDF-");

  const locationIds = new Set();
  for (const loc of d.mapLocations || []) {
    assert(loc.id && !locationIds.has(loc.id), "Location IDs must be unique");
    locationIds.add(loc.id);
    assert(
      loc.title && loc.place && loc.description && loc.precision,
      "Map points need a title, place, description and precision note",
    );
    assert(
      ["Office", "Project", "Field visit"].includes(loc.kind),
      "Invalid map point kind",
    );
    assert(
      Number.isFinite(loc.latitude) && Math.abs(loc.latitude) <= 90,
      "Latitude must be between -90 and 90",
    );
    assert(
      Number.isFinite(loc.longitude) && Math.abs(loc.longitude) <= 180,
      "Longitude must be between -180 and 180",
    );
    for (const slug of loc.projectSlugs)
      assert(slugs.has(slug), "Unknown project linked from map: " + slug);
    for (const index of loc.experienceIndexes)
      assert(
        Number.isInteger(index) && d.experience[index],
        "Unknown experience linked from map",
      );
    for (const photo of loc.photos) {
      assert(
        photo.alt && photo.caption,
        "Map photos need alt text and a caption",
      );
      assert(exists(photo.src), "Missing map photo: " + photo.src);
    }
  }
  assert(
    !/(?:\u00c2[\u0080-\u00bf]|\u00e2[\u0080-\u00ff\u2000-\u2122]|\ufffd)/u.test(
      JSON.stringify(d),
    ),
    "Broken text encoding detected",
  );
  return {
    projects: d.projects.length,
    assets: paths.length,
    locations: (d.mapLocations || []).length,
  };
}
