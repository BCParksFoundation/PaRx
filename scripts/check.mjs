import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const files = ["home.html", "home_FR.html"];
let failed = false;

for (const file of files) {
  const html = await readFile(resolve(root, file), "utf8");
  const problems = [];
  if (!html.includes("data-parx-form")) problems.push("missing data-parx-form");
  if (!html.includes("data-mapbox-autocomplete")) problems.push("missing Mapbox autocomplete hook");
  if (/method="POST",/.test(html)) problems.push("invalid comma after form method");
  if (/<\/link>/.test(html)) problems.push("invalid closing link tag");
  if (!/class="[^"]*show-(?:en|fr)/.test(html)) problems.push("missing language visibility class");
  if (!/type="submit"[^>]+disabled/.test(html)) problems.push("reCAPTCHA submit is not initially disabled");
  if (/name="retURL" value="(?!https:\/\/)/.test(html)) problems.push("retURL is not an absolute HTTPS URL");
  if (problems.length) {
    failed = true;
    console.error(`${file}: ${problems.join(", ")}`);
  }
}

const en = await readFile(resolve(root, "home.html"), "utf8");
const fr = await readFile(resolve(root, "home_FR.html"), "utf8");
const fieldNames = html => [...html.matchAll(/(?<![-\w])name=["']([^"']+)["']/g)].map(match => match[1]).sort();
const enNames = fieldNames(en).join("\n");
const frNames = fieldNames(fr).join("\n");
if (enNames !== frNames) {
  failed = true;
  console.error("English and French Salesforce field names do not match.");
}

if (failed) process.exit(1);
console.log("Form structure checks passed.");
