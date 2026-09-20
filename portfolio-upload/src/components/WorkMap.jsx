import React, { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { asset } from "../lib/assets";

const tileRoot = "https://services.arcgisonline.com/ArcGIS/rest/services/";
export default function WorkMap({ locations, projects, experience }) {
  const host = useRef(null),
    mapRef = useRef(null),
    markers = useRef(new Map());
  const [filter, setFilter] = useState("All"),
    [query, setQuery] = useState(""),
    [selected, setSelected] = useState(""),
    [tileError, setTileError] = useState(false),
    [loading, setLoading] = useState(true);
  const shown = useMemo(
    () =>
      locations.filter(
        (l) =>
          (filter === "All" || l.kind === filter) &&
          `${l.title} ${l.place} ${l.period}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [locations, filter, query],
  );
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const map = L.map(host.current, {
      scrollWheelZoom: false,
      zoomAnimation: !reduceMotion,
      fadeAnimation: !reduceMotion,
      markerZoomAnimation: !reduceMotion,
    }).setView([4.08, 73.51], 10);
    mapRef.current = map;
    const attribution =
      'Imagery &copy; <a href="https://www.esri.com/" target="_blank" rel="noopener">Esri</a>, Earthstar Geographics, Maxar, and the GIS User Community';
    const imagery = L.tileLayer(
      tileRoot + "World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { attribution, maxZoom: 19 },
    ).addTo(map);
    const labels = L.tileLayer(
      tileRoot +
        "Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Labels &copy; Esri, HERE, Garmin",
        maxZoom: 19,
        pane: "overlayPane",
      },
    ).addTo(map);
    L.control
      .layers(
        { "Satellite imagery": imagery },
        { "Place labels": labels },
        { collapsed: false },
      )
      .addTo(map);
    imagery.on("loading", () => setLoading(true));
    imagery.on("load", () => setLoading(false));
    let loaded = 0;
    imagery.on("tileload", () => {
      loaded++;
      setTileError(false);
    });
    imagery.on("tileerror", () => {
      if (!loaded) setTileError(true);
    });
    const resize = new ResizeObserver(() => map.invalidateSize());
    resize.observe(host.current);
    return () => {
      resize.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    for (const marker of markers.current.values()) marker.remove();
    markers.current.clear();
    for (const location of shown) {
      const box = document.createElement("div");
      box.className = "work-popup";
      const add = (tag, text) => {
        const el = document.createElement(tag);
        el.textContent = text;
        box.append(el);
        return el;
      };
      add("small", location.kind + " / " + location.place);
      add("h3", location.title);
      if (location.period) add("p", location.period);
      add("p", location.description);
      add("small", location.precision);
      for (const slug of location.projectSlugs || []) {
        const project = projects.find((p) => p.slug === slug);
        if (project) {
          const a = add("a", project.title + " →");
          a.href = "#project/" + slug;
        }
      }
      for (const index of location.experienceIndexes || []) {
        const job = experience[index];
        if (job) {
          const a = add("a", job.role + " · " + job.company);
          a.href = "#experience";
        }
      }
      if (location.photos?.length) {
        const photo = location.photos[0];
        const img = document.createElement("img");
        img.src = asset(photo.src);
        img.alt = photo.alt;
        img.loading = "lazy";
        box.append(img);
      }
      const marker = L.marker([location.latitude, location.longitude], {
        title: location.title,
        alt: location.title,
        icon: L.divIcon({
          className:
            "work-pin " + (location.kind === "Office" ? "office-pin" : ""),
          html: "<span></span>",
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        }),
      })
        .addTo(map)
        .bindPopup(box, { maxWidth: 310 });
      marker.on("click", () => setSelected(location.id));
      markers.current.set(location.id, marker);
    }
    if (shown.length)
      map.fitBounds(
        shown.map((l) => [l.latitude, l.longitude]),
        { padding: [45, 45], maxZoom: 12 },
      );
  }, [shown, projects, experience]);
  function focus(location) {
    setSelected(location.id);
    mapRef.current.setView([location.latitude, location.longitude], 14);
    markers.current.get(location.id)?.openPopup();
  }
  return (
    <div className="work-map-layout">
      <div className="map-sidebar">
        <label className="map-search">
          Find an island or project
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search locations..."
          />
        </label>
        <div className="filters">
          {["All", "Office", "Project", "Field visit"].map((kind) => (
            <button
              key={kind}
              aria-pressed={filter === kind}
              onClick={() => setFilter(kind)}
            >
              {kind}
            </button>
          ))}
        </div>
        <p className="result-count" aria-live="polite">
          {shown.length} {shown.length === 1 ? "location" : "locations"}
        </p>
        <div className="location-list">
          {shown.map((l) => (
            <button
              key={l.id}
              className={selected === l.id ? "selected" : ""}
              onClick={() => focus(l)}
            >
              <small>
                {l.kind} / {l.place}
              </small>
              <strong>{l.title}</strong>
              {l.period && <span>{l.period}</span>}
            </button>
          ))}
          {!shown.length && (
            <p>No matching locations. Try another filter or search.</p>
          )}
        </div>
        <p className="map-note">
          Pins show the location precision stated in each popup. They are not
          survey-control coordinates.
        </p>
      </div>
      <div>
        {loading && (
          <p className="map-message" role="status">
            Loading satellite imagery...
          </p>
        )}
        <div
          ref={host}
          className="work-map"
          role="region"
          aria-label="Satellite map of project and employment locations"
        />
        {tileError && (
          <p className="map-message" role="status">
            Imagery could not load. Check your connection; the location list and
            project links remain available.
          </p>
        )}
        <div className="map-list-links">
          {shown.map((l) => (
            <details key={l.id}>
              <summary>{l.title}</summary>
              <p>
                {l.description} {l.precision}
              </p>
              {l.projectSlugs.map((slug) => (
                <a key={slug} href={"#project/" + slug}>
                  Open project case study
                </a>
              ))}
              {l.experienceIndexes.length > 0 && (
                <a href="#experience">View employment experience</a>
              )}
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
