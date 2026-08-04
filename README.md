# PaRx Salesforce forms

The editable source files remain at the repository root. `home.js` is shared by English and French forms and scopes all behaviour to each `form[data-parx-form]` element.

## Local workflow

```sh
npm run check
npm run build
npm run dev
```

`npm run build` creates:

- `dist/webflow/register-en.html` and `register-fr.html`: CSS-free Webflow embed fragments.
- `dist/webflow/forms.js`: the shared script for hosting as one versioned asset.
- `dist/preview/index.html`: a self-contained bilingual local preview with its CSS and JavaScript inlined.

## Mapbox autocomplete

Address inputs opt in with `data-mapbox-autocomplete`. Configure the public Mapbox token once per page using:

```html
<meta name="mapbox-token" content="pk…">
```

The request waits until at least three characters have been entered, is debounced by 300 ms, cancels any stale in-flight request, is restricted to Canadian addresses, and fills the city, postal-code and province fields when those Salesforce fields exist in the same form.

The shared script also loads Google's reCAPTCHA API once per page, updates every Salesforce `captcha_settings` timestamp independently, and exposes separate English and French completion callbacks. Do not add duplicate reCAPTCHA API or timestamp scripts to individual Webflow embeds.

When English and French forms share a Webflow page, include both fragments and load `forms.js` once after them. Toggle their existing `show-en` and `show-fr` classes from the site language control.
