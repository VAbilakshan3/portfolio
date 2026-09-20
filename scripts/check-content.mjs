import fs from "node:fs";
import { validateContent } from "./validate-content.mjs";
const d = JSON.parse(
  fs.readFileSync("src/content/portfolio.json", "utf8").replace(/^\uFEFF/, ""),
);
const result = validateContent(d, {
  exists: (p) => fs.existsSync("public/" + p),
  read: (p) => fs.readFileSync("public/" + p),
});
for (const file of ["src/App.jsx", "src/components/WorkMap.jsx"]) {
  const s = fs.readFileSync(file, "utf8");
  if (
    /(?:\u00c2[\u0080-\u00bf]|\u00e2[\u0080-\u00ff\u2000-\u2122]|\ufffd)/u.test(
      s,
    )
  )
    throw new Error("Broken encoding in " + file);
}
console.log("PASS: content, map locations, assets and UTF-8 text", result);
