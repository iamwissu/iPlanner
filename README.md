# Lesson Plan Desk

A zero-backend, installable PWA lesson planner for teachers. Pick a framework, tag interaction
patterns, insert ready-made activities, and export a polished PDF — all client-side.

## Run it locally
Just open `index.html` in a browser — no build step, no server required.
For the service worker (offline support) to register, serve it over `http://` rather than `file://`:
```
npx serve .
# or
python3 -m http.server 8080
```

## Deploy for free

### GitHub Pages
1. Push this folder's contents to a GitHub repo.
2. Repo → Settings → Pages → Deploy from branch → `main` / root.
3. Your app is live at `https://<username>.github.io/<repo>/`.

### Vercel
1. `npx vercel` from this folder, or drag-and-drop the folder at vercel.com/new.
2. No build settings needed — it's a static site.

## Files
- `index.html` — the entire app (markup, styles, logic)
- `manifest.json` — PWA manifest ("Add to Home Screen")
- `sw.js` — service worker, caches the app shell for offline use
- `icons/` — app icons (192, 512, and a maskable 512 variant)

## Notes
- All lesson data lives in the browser's `localStorage` — nothing is sent anywhere.
- Use **Export template (JSON)** to back up or share a plan with another teacher; **Import template
  (JSON)** loads it back in, on any device.
- **Export polished PDF** builds a clean, print-formatted sheet (two-column header, stage grid,
  colored interaction tags) and opens the browser print dialog — choose "Save as PDF" as the
  destination.
- Built with Tailwind's CDN build for simplicity (no bundler). For a production deployment at scale,
  swap in a compiled Tailwind build to drop the runtime warning in the console.
