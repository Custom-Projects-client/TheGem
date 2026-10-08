# Agency Dark – Angular version

Angular 21 conversion of the "Agency Dark" (TheGem) WordPress site.
27 pages · standalone components · no backend needed.

---

## 1. One-time setup (no Angular needed beforehand)

1. **Install Node.js (LTS)** → https://nodejs.org  
   - Need version **20.19+, 22.12+ or 24+**. Check: `node -v`
2. **Install VS Code** (recommended editor) → https://code.visualstudio.com  
   - Add the extension **Angular Language Service**.
3. **Unzip** this project, open the folder in VS Code.
4. Open the terminal in VS Code (`Ctrl + \``) and run:

```bash
npm install        # downloads dependencies (1–3 min, once)
npm start          # starts the dev server
```

5. Open **http://localhost:4200** – done.

> You do **not** need to install Angular globally. `npm start` uses the copy in `node_modules`.  
> Stop the server: `Ctrl + C`.

---

## 2. Daily workflow

| Goal | Command |
|---|---|
| Run with live reload | `npm start` |
| Run on another port | `npx ng serve --port 4300` |
| Production build (→ `dist/`) | `npm run build` |
| Create a new page | `npx ng generate component pages/my-page` |

- Save a file → browser reloads automatically.
- Errors show in the terminal **and** the browser.

---

## 3. Folder map

```
src/
├─ index.html            ← fonts + theme CSS links, <body>
├─ styles.css            ← YOUR global CSS (wins over theme)
└─ app/
   ├─ app.routes.ts      ← URL → page list (add pages here)
   ├─ app.html / app.ts  ← frame: header + page + footer
   ├─ core/site-data.ts  ← menu items + social links
   ├─ layout/
   │  ├─ header/         ← logo + hamburger menu
   │  ├─ footer/         ← footer (3 blocks)
   │  └─ scroll-top/     ← back-to-top button
   ├─ shared/
   │  ├─ contact-form/   ← the contact form
   │  ├─ directives/     ← counters, skill bars/rings, slider, lightbox…
   │  └─ page-imports.ts ← what every page can use
   └─ pages/             ← one folder per page (.html = content)
public/
├─ assets/css/theme.css        ← theme styles (don't edit)
├─ assets/css/page-styles.css  ← per-section spacing/colours
└─ assets/uploads/…            ← all images + videos
```

---

## 4. How to make common changes

### Change text / an image on a page
1. Open `src/app/pages/<page>/<page>.html`.
2. `Ctrl + F` the text → edit → save.
3. Image: put the file in `public/assets/uploads/`, then set  
   `src="assets/uploads/my-photo.jpg"`.

| Page | File |
|---|---|
| Home | `pages/home/home.html` |
| About / Team / Clients | `pages/about-us`, `our-team`, `our-clients` |
| Services | `pages/services`, `pages/service-page` |
| Works list / details | `pages/works`, `pages/work-details/*` |
| Blog list / posts | `pages/blog`, `pages/blog-posts/*` |
| Contact | `pages/contact-us` |

### Change the menu
- Edit `src/app/core/site-data.ts` → `MENU` (label + link + optional `children`).

### Change social links
- Same file → `SOCIALS` (replace `'#'` with your URLs).

### Change footer text / address / links
- `src/app/layout/footer/footer.html`.

### Change colours, fonts, spacing
- Global: add rules to `src/styles.css`, e.g.
  ```css
  .site-header { background: #000; }
  ```
- One section: find its `vc_custom_…` class in the page html → edit that rule in  
  `public/assets/css/page-styles.css`.
- Tip: right-click an element in Chrome → **Inspect** to find its class.

### Add a new page
```bash
npx ng generate component pages/pricing
```
1. Put your html in `src/app/pages/pricing/pricing.html`.
2. In `pricing.ts` add `imports: PAGE_IMPORTS` (copy from any other page).
3. Add to `app.routes.ts`:
   ```ts
   { path: 'pricing', title: 'Pricing', loadComponent: () => import('./pages/pricing/pricing').then(m => m.Pricing) },
   ```
4. Add to `MENU` in `site-data.ts`.

### Internal links
- Use `routerLink="/about-us"` (not `href`) → no page reload.
- External: normal `href="https://…"`.

### Contact form → real email/API
- `src/app/shared/contact-form/contact-form.ts` → `submit()` has a `TODO`.
- Send `this.form.getRawValue()` with `HttpClient`, or use a service like Formspree / EmailJS.
- Newsletter box in the footer works the same way (`footer.ts`).

### Google Map in the footer
- `footer.html` → `<iframe src="https://www.google.com/maps/…">` → paste your own embed URL.

### Animations & hover effects
- **Reveal on scroll:** any `.lazy-loading` box animates its `.lazy-loading-item` children.
  - Effect = `data-ll-effect="fading | move-up | clip | drop-bottom | drop-right | slide-right"` on the item.
  - Remove the `lazy-loading` class from a box → no animation for it.
- **Portfolio / gallery / blog items:** fly up one by one (class `item-animation-move-up` on the container).
- **Button hover colours:** `data-hover-in="color:#fff;background-color:#00bcd4"` (+ optional `data-hover-out`).
- **Service boxes (icon + box + title recolour on hover):** colours come from `data-hover-icon-color`, `data-hover-box-color`, `data-hover-title-color`, `data-hover-description-color`, `data-hover-border-color` on the `.quickfinder` box.
- **Parallax speed:** `SPEED` in `directives/parallax.ts`.
- Users with "reduce motion" enabled in their OS get no animation (accessibility).
- Other hover effects (portfolio overlay, menu, icons) are pure CSS in `theme.css`.

---

## 5. Publish the site

```bash
npm run build
```
- Upload everything inside `dist/agency-dark-angular/browser/` to Netlify, Vercel, Firebase Hosting, GitHub Pages, etc.
- Set **"all URLs → index.html"** (SPA fallback) on the host, otherwise refreshing `/about-us` gives 404.
- Netlify: add file `public/_redirects` with `/* /index.html 200`.

---

## 6. What was converted (and what changed)

| Original (WordPress) | Angular version |
|---|---|
| PHP/WP pages | Standalone components + router |
| jQuery menu/slider/counters | Angular code (`header`, `shared/directives`) |
| Contact Form 7 | Angular reactive form |
| Theme + plugin CSS (82 files) | Merged into one `theme.css` |
| Lightbox (Fancybox) | `directives/lightbox.ts` |
| Scroll-reveal animations | `directives/lazy-group.ts` |
| Grid items fly-in | `directives/item-animation.ts` |
| Button hover colour swap | `directives/hover-style.ts` |
| Service boxes hover (icon/box/title recolour) | `directives/quickfinder.ts` |
| Hero parallax | `directives/parallax.ts` |

**Not carried over** (needs a WordPress backend):
- Search box, "Load more" buttons, Recent Tweets widget.
- Category / tag / author archive pages (their links go to `/blog`).
- ThemeForest "Buy now" demo overlay (vendor promo).
- Comment forms on posts are static (no saving).

---

## 7. Troubleshooting

| Problem | Fix |
|---|---|
| `npm: command not found` | Install Node.js, then **restart** VS Code/terminal |
| `npm install` errors | Delete `node_modules` + `package-lock.json`, run again |
| Port 4200 busy | `npx ng serve --port 4300` |
| Fonts look plain | Needs internet (Google Fonts) |
| Page 404 after refresh (hosted) | Add SPA fallback (see §5) |
| Change not showing | Hard refresh `Ctrl + Shift + R` |
