import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { validateContent } from "../scripts/validate-content.mjs";
const run = promisify(execFile),
  root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORTFOLIO_EDITOR_PORT || 4174),
  origin = `http://127.0.0.1:${port}`,
  token = crypto.randomBytes(32).toString("hex");
const contentPath = path.join(root, "src/content/portfolio.json"),
  publicRoot = path.join(root, "public"),
  backups = path.join(root, ".editor-backups");
const hash = (b) => crypto.createHash("sha256").update(b).digest("hex");
const stamp = () =>
  new Date().toISOString().replace(/[:.]/g, "-") +
  "-" +
  crypto.randomBytes(3).toString("hex");
function publicFile(value) {
  if (
    typeof value !== "string" ||
    value.includes("..") ||
    value.includes("\\") ||
    value.startsWith("/") ||
    value.includes(":")
  )
    throw Error("Invalid public file path");
  const resolved = path.resolve(publicRoot, value);
  if (!resolved.startsWith(publicRoot + path.sep))
    throw Error("Invalid public path");
  return resolved;
}
function validate(d) {
  return validateContent(d, {
    exists: (p) => fs.existsSync(publicFile(p)),
    read: (p) => fs.readFileSync(publicFile(p)),
  });
}
function backup(file, name) {
  fs.mkdirSync(backups, { recursive: true });
  fs.copyFileSync(file, path.join(backups, stamp() + "-" + name));
}
function json(res, status, value) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  res.end(JSON.stringify(value));
}
async function body(req, max = 20 * 1024 * 1024) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > max) throw Error("File exceeds the 20 MB limit");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
function serve(res, file) {
  if (!fs.existsSync(file)) {
    json(res, 404, { error: "Not found" });
    return;
  }
  const ext = path.extname(file).toLowerCase();
  const mime =
    {
      ".html": "text/html; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".webp": "image/webp",
      ".svg": "image/svg+xml",
      ".pdf": "application/pdf",
    }[ext] || "application/octet-stream";
  res.writeHead(200, {
    "Content-Type": mime,
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  fs.createReadStream(file).pipe(res);
}
let busy = false;
const server = http.createServer(async (req, res) => {
  try {
    if (req.headers.host !== `127.0.0.1:${port}`) {
      json(res, 403, { error: "Local editor only" });
      return;
    }
    const url = new URL(req.url, origin);
    if (req.method === "GET" && url.pathname === "/api/health") {
      json(res, 200, { app: "portfolio-editor" });
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/content") {
      const bytes = fs.readFileSync(contentPath);
      json(res, 200, {
        content: JSON.parse(bytes.toString("utf8").replace(/^\uFEFF/, "")),
        revision: hash(bytes),
        token,
      });
      return;
    }
    if (req.method === "POST") {
      if (
        req.headers.origin !== origin ||
        req.headers["x-editor-token"] !== token
      ) {
        json(res, 403, { error: "Open the editor locally to save changes" });
        return;
      }
      if (busy) {
        json(res, 409, {
          error: "An update is already running. Please retry.",
        });
        return;
      }
      busy = true;
      try {
        if (url.pathname === "/api/save") {
          const input = JSON.parse(
            (await body(req, 5 * 1024 * 1024)).toString("utf8"),
          );
          const before = fs.readFileSync(contentPath);
          if (input.revision !== hash(before)) {
            json(res, 409, {
              error:
                "Files changed since this editor was opened. Export your draft, then reload before saving.",
            });
            return;
          }
          validate(input.content);
          backup(contentPath, "portfolio.json");
          const bytes = JSON.stringify(input.content, null, 2) + "\n";
          const temp = contentPath + ".tmp";
          fs.writeFileSync(temp, bytes, "utf8");
          fs.renameSync(temp, contentPath);
          json(res, 200, {
            revision: hash(Buffer.from(bytes)),
            message: "Saved to portfolio files. A backup was created.",
          });
          return;
        }
        if (url.pathname === "/api/upload") {
          const filename = url.searchParams.get("name") || "file",
            folder = url.searchParams.get("folder") || "images/uploads",
            ext = path.extname(filename).toLowerCase();
          if (![".jpg", ".jpeg", ".png", ".webp", ".pdf"].includes(ext))
            throw Error("Upload JPG, PNG, WebP or PDF");
          if (
            !/^(images\/uploads|certificates|downloads|cv|projects\/[a-z0-9-]+)$/.test(
              folder,
            )
          )
            throw Error("Invalid upload folder");
          const bytes = await body(req);
          const valid =
            ext === ".pdf"
              ? bytes.subarray(0, 5).toString() === "%PDF-"
              : ext === ".png"
                ? bytes
                    .subarray(0, 8)
                    .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
                : ext === ".webp"
                  ? bytes.subarray(0, 4).toString() === "RIFF" &&
                    bytes.subarray(8, 12).toString() === "WEBP"
                  : bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
          if (!valid)
            throw Error("File contents do not match the selected type");
          if (folder === "cv" && ext !== ".pdf")
            throw Error("The main CV must be a PDF");
          const safe =
            path
              .basename(filename, ext)
              .normalize("NFKD")
              .replace(/[^a-zA-Z0-9-]/g, "-")
              .replace(/-+/g, "-")
              .slice(0, 65) || "upload";
          const relative =
            folder === "cv"
              ? "cv/Abilakshan Vadivel.pdf"
              : `${folder}/${safe}-${crypto.randomBytes(4).toString("hex")}${ext}`;
          const target = publicFile(relative);
          fs.mkdirSync(path.dirname(target), { recursive: true });
          if (fs.existsSync(target)) backup(target, path.basename(target));
          fs.writeFileSync(target, bytes);
          json(res, 200, {
            path: relative,
            message:
              "File uploaded locally. Save your content changes to keep its link.",
          });
          return;
        }
        if (url.pathname === "/api/build") {
          validate(JSON.parse(fs.readFileSync(contentPath, "utf8")));
          const result = await run(
            process.execPath,
            [path.join(root, "node_modules/vite/bin/vite.js"), "build"],
            {
              cwd: root,
              timeout: 120000,
              maxBuffer: 1024 * 1024,
              windowsHide: true,
            },
          );
          json(res, 200, {
            message:
              "Preview rebuilt. Refresh your portfolio tab to see saved changes.",
            output: result.stdout.slice(-3000),
            preview: "http://127.0.0.1:4173/portfolio/",
          });
          return;
        }
        json(res, 404, { error: "Unknown action" });
        return;
      } finally {
        busy = false;
      }
    }
    if (req.method !== "GET") {
      json(res, 405, { error: "Method not allowed" });
      return;
    }
    const files = {
      "/": "tools/editor/index.html",
      "/editor.js": "tools/editor/editor.js",
      "/editor.css": "tools/editor/editor.css",
      "/vendor/leaflet.js": "node_modules/leaflet/dist/leaflet.js",
      "/vendor/leaflet.css": "node_modules/leaflet/dist/leaflet.css",
    };
    if (files[url.pathname]) {
      serve(res, path.join(root, files[url.pathname]));
      return;
    }
    if (url.pathname.startsWith("/asset/")) {
      serve(res, publicFile(decodeURIComponent(url.pathname.slice(7))));
      return;
    }
    if (
      url.pathname.startsWith("/vendor/images/") &&
      /^[a-z-]+\.png$/.test(path.basename(url.pathname))
    ) {
      serve(
        res,
        path.join(
          root,
          "node_modules/leaflet/dist/images",
          path.basename(url.pathname),
        ),
      );
      return;
    }
    json(res, 404, { error: "Not found" });
  } catch (error) {
    json(res, 400, { error: error.message });
  }
});
server.listen(port, "127.0.0.1", () =>
  console.log(
    `Portfolio editor: ${origin}\nSaves locally; never publishes. Backups: ${backups}`,
  ),
);
server.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
