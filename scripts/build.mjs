import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");

const read = file => readFile(resolve(root, file), "utf8");
const cleanGenerated = value => value.replace(/[ \t]+$/gm, "");
const cleanEmbed = html => html
  .replace(/<script src="https:\/\/www\.google\.com\/recaptcha\/api\.js"><\/script>\s*/g, "")
  .replace(/<META[^>]+>\s*/gi, "")
  .trim();

const english = cleanEmbed(await read("home.html"));
const french = cleanEmbed(await read("home_FR.html"));
const css = await read("home.css");
const js = await read("home.js");

await mkdir(resolve(dist, "webflow"), { recursive: true });
await mkdir(resolve(dist, "preview"), { recursive: true });

await writeFile(resolve(dist, "webflow/register-en.html"), cleanGenerated(`${english}\n`));
await writeFile(resolve(dist, "webflow/register-fr.html"), cleanGenerated(`${french}\n`));
await writeFile(resolve(dist, "webflow/forms.js"), js);

const preview = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PaRx registration forms preview</title>
  <style>
${css}

    body { margin: 0 auto; max-width: 960px; padding: 2rem; }
    .preview-language[hidden] { display: none; }
    .preview-toolbar { display: flex; gap: .5rem; margin-bottom: 2rem; }
  </style>
</head>
<body>
  <nav class="preview-toolbar" aria-label="Preview language">
    <button type="button" data-show-locale="en">English</button>
    <button type="button" data-show-locale="fr">Français</button>
  </nav>
  <main>
    <section class="preview-language" data-preview-locale="en">${english}</section>
    <section class="preview-language" data-preview-locale="fr" hidden>${french}</section>
  </main>
  <script>
${js}
  </script>
  <script>
    document.querySelectorAll('[data-show-locale]').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelectorAll('[data-preview-locale]').forEach(section => {
          section.hidden = section.dataset.previewLocale !== button.dataset.showLocale;
        });
      });
    });
  </script>
</body>
</html>`;

await writeFile(resolve(dist, "preview/index.html"), cleanGenerated(preview));

console.log("Built Webflow fragments and a self-contained bilingual preview in dist/.");
